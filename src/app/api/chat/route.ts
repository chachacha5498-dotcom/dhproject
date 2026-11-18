import { NextRequest, NextResponse } from "next/server";
import { executeReadOnlyQuery } from "@/lib/neo4j";

const GRAPH_SCHEMA = [
  "노드 클래스(Labels) 및 속성:",
  "1. person: { name: string, role?: string, house?: string, grade?: string }",
  "2. group: { name: string, type?: string, description?: string }",
  "3. place: { name: string, type?: string, description?: string }",
  "4. event: { name: string, description?: string, scene_number?: string }",
  "5. object: { name: string, function?: string, type?: string }",
  "",
  "관계 유형(Relationship Types):",
  "- (person)-[:PARTICIPATES_IN]->(event)",
  "- (person)-[:BELONGS_TO]->(group)",
  "- (person)-[:FAMILY_OF]->(person)",
  "- (person)-[:FRIEND_OF]->(person)",
  "- (person)-[:RIVAL_OF]->(person)",
  "- (person)-[:PROTECTS]->(person)",
  "- (person)-[:SUSPECTS]->(person)",
  "- (person)-[:OWNS]->(object)",
  "- (person)-[:GIVES]->(object)",
  "- (person)-[:SERVES]->(person|group)",
  "- (object)-[:USED_IN]->(event)",
  "- (object)-[:LOCATED_IN]->(place)",
  "- (object)-[:GUARDS]->(object)",
  "- (event)-[:OCCURS_AT]->(place)"
].join("\n");

async function generateCypher(question: string, apiKey?: string): Promise<string> {
  const q = question.toLowerCase();

  if (apiKey) {
    try {
      const promptText = 
        "당신은 Neo4j Cypher 쿼리 작성 전문가입니다.\n" +
        "아래 지식그래프 스키마를 바탕으로, 사용자의 질문에 답하기 위한 정확하고 안전한 READ-ONLY Cypher 쿼리 1개만 작성하세요.\n" +
        "절대로 마크다운 코드블록이나 부연 설명을 쓰지 말고 오직 Cypher 쿼리 문자열만 반환하세요.\n" +
        "오직 MATCH, OPTIONAL MATCH, WHERE, WITH, RETURN, ORDER BY, LIMIT 문만 사용할 수 있습니다.\n\n" +
        "[스키마]\n" + GRAPH_SCHEMA + "\n\n" +
        "사용자 질문: " + question + "\n" +
        "Cypher 쿼리:";

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.1, maxOutputTokens: 500 }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) {
          return text.replace(/```cypher/gi, "").replace(/```/g, "").trim();
        }
      }
    } catch (e) {
      console.warn("Gemini Text-to-Cypher fallback used:", e);
    }
  }

  // 룰베이스 폴백
  if (q.includes("받은") || (q.includes("사물") && q.includes("사건"))) {
    return [
      "MATCH (p:person {name: '해리 포터'})-[g:GIVES|OWNS]->(o:object)",
      "OPTIONAL MATCH (o)-[u:USED_IN]->(e:event)",
      "RETURN p.name as person, o.name as object, type(g) as relation, e.name as used_in_event",
      "LIMIT 20"
    ].join("\n");
  } else if (q.includes("마법사의 돌") && (q.includes("지키") || q.includes("장치"))) {
    return [
      "MATCH (guard:object)-[:GUARDS]->(stone:object {name: '마법사의 돌'})",
      "OPTIONAL MATCH (guard)-[:LOCATED_IN]->(pl:place)",
      "OPTIONAL MATCH (guard)-[:USED_IN]->(ev:event)",
      "OPTIONAL MATCH (p:person)-[:PARTICIPATES_IN]->(ev)",
      "RETURN guard.name as guard_object, pl.name as place, ev.name as event, collect(DISTINCT p.name) as participants"
    ].join("\n");
  } else if (q.includes("적대") || q.includes("라이벌") || q.includes("말포이")) {
    return [
      "MATCH (p1:person)-[:RIVAL_OF]->(p2:person)",
      "OPTIONAL MATCH (p1)-[:BELONGS_TO]->(g1:group)",
      "OPTIONAL MATCH (p2)-[:BELONGS_TO]->(g2:group)",
      "RETURN p1.name as person1, g1.name as group1, p2.name as person2, g2.name as group2"
    ].join("\n");
  } else if (q.includes("가장 많은 사건") || (q.includes("참여") && q.includes("상위"))) {
    return [
      "MATCH (p:person)-[:PARTICIPATES_IN]->(e:event)",
      "RETURN p.name as person, count(e) as event_count, collect(e.name)[0..5] as sample_events",
      "ORDER BY event_count DESC",
      "LIMIT 5"
    ].join("\n");
  } else if (q.includes("보호")) {
    return [
      "MATCH (protector:person)-[:PROTECTS]->(target:person {name: '해리 포터'})",
      "OPTIONAL MATCH (protector)-[:PARTICIPATES_IN]->(e:event)<-[:PARTICIPATES_IN]-(target)",
      "RETURN protector.name as protector, target.name as target, collect(DISTINCT e.name) as shared_events"
    ].join("\n");
  } else if (q.includes("장소") && (q.includes("상위") || q.includes("많"))) {
    return [
      "MATCH (pl:place)",
      "OPTIONAL MATCH (ev:event)-[:OCCURS_AT]->(pl)",
      "OPTIONAL MATCH (obj:object)-[:LOCATED_IN]->(pl)",
      "RETURN pl.name as place, count(DISTINCT ev) as event_count, count(DISTINCT obj) as object_count, (count(DISTINCT ev) + count(DISTINCT obj)) as total_connections",
      "ORDER BY total_connections DESC",
      "LIMIT 5"
    ].join("\n");
  } else {
    const cleanQ = question.replace(/'/g, "");
    return [
      "MATCH (n)",
      `WHERE n.name CONTAINS '${cleanQ}' OR '${cleanQ}' CONTAINS n.name`,
      "OPTIONAL MATCH (n)-[r]-(m)",
      "RETURN labels(n)[0] as entity_type, n.name as entity_name, type(r) as relationship, labels(m)[0] as related_type, m.name as related_name",
      "LIMIT 25"
    ].join("\n");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "메시지가 비어있습니다." }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Text-to-Cypher 변환
    const cypher = await generateCypher(message, geminiKey);

    // 2. Neo4j 안전한 읽기 전용 쿼리 실행
    let graphData: any[] = [];
    try {
      graphData = await executeReadOnlyQuery(cypher);
    } catch (dbError: any) {
      console.error("Neo4j 쿼리 실행 실패:", dbError);
      return NextResponse.json({
        answer: `그래프 쿼리 실행 중 오류가 발생했습니다: ${dbError.message}`,
        cypher,
        graphData: [],
      });
    }

    // 3. 지식그래프 검색 결과 기반 Grounded 답변 생성
    let answer = "";
    if (geminiKey) {
      try {
        const llmPrompt = 
          "당신은 영화 <해리 포터와 마법사의 돌> 지식그래프 기반 전문 AI 챗봇입니다.\n" +
          "반드시 아래의 지식그래프 탐색 결과(Graph Context)에만 엄격하게 근거하여 답변하세요.\n" +
          "그래프에 없는 정보는 절대 지어내지 마시고, 그래프에 명시된 노드와 관계를 인용하여 명확하고 친절한 한국어로 답변하세요.\n\n" +
          "[사용자 질문]\n" + message + "\n\n" +
          "[실행된 Cypher 쿼리]\n" + cypher + "\n\n" +
          "[지식그래프 탐색 결과]\n" + JSON.stringify(graphData, null, 2);

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: llmPrompt }] }],
              generationConfig: { temperature: 0.2, maxOutputTokens: 1000 }
            })
          }
        );
        if (res.ok) {
          const data = await res.json();
          answer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        }
      } catch (llmErr) {
        console.warn("LLM 답변 생성 실패:", llmErr);
      }
    }

    // LLM 키가 없거나 실패한 경우, 그래프 결과를 바탕으로 직접 정형화된 응답 포맷팅
    if (!answer) {
      if (graphData.length === 0) {
        answer = "지식그래프에서 해당 질문과 일치하는 노드 및 관계 데이터를 찾지 못했습니다.";
      } else {
        const rowsPreview = graphData
          .slice(0, 5)
          .map((row, idx) => `• ${idx + 1}. ` + Object.entries(row).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join(" | "))
          .join("\n");
        answer = `지식그래프 탐색 결과 총 ${graphData.length}건의 데이터를 확인했습니다.\n\n${rowsPreview}${graphData.length > 5 ? `\n• ...외 ${graphData.length - 5}건` : ""}\n\n*(더 자연스러운 AI 요약 생성을 원하시면 .env.local 파일에 GEMINI_API_KEY를 등록해 주세요.)*`;
      }
    }

    return NextResponse.json({
      answer,
      cypher,
      graphData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "서버 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
