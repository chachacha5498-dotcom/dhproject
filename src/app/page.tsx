"use client";

import { useState } from "react";
import { Send, Bot, User, Database, Sparkles, ChevronDown, ChevronRight, Terminal, BookOpen, Layers } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  cypher?: string;
  graphData?: any[];
}

const PRESET_QUESTIONS = [
  "해리가 다른 인물에게서 받은 사물은 무엇이며, 어떤 사건에서 사용되었나요?",
  "마법사의 돌을 지키는 장치는 무엇이며, 각각 어느 장소에 있나요?",
  "해리와 적대(라이벌) 관계인 인물은 누구이며, 어느 집단(기숙사)에 속하나요?",
  "가장 많은 사건에 참여한 상위 5명의 인물과 참가 사건 수는?",
  "해리 포터를 보호하는 인물들은 누구이며 함께 참여한 사건은?",
  "가장 많은 연관 관계를 가진 상위 5개 장소는 어디인가요?",
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요! 영화 <해리 포터와 마법사의 돌> 지식그래프(GraphRAG) Q&A 챗봇입니다.\n\nNeo4j에 구축된 115개의 노드(인물, 사건, 사물, 장소, 집단)와 14개 관계 데이터를 기반으로 오차 없이 정확한 그래프 증거를 제공합니다. 궁금한 내용을 물어보시거나 왼쪽의 추천 질문을 클릭해 보세요!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedCypherIndex, setExpandedCypherIndex] = useState<number | null>(null);

  const sendMessage = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend || loading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!questionText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.answer,
            cypher: data.cypher,
            graphData: data.graphData,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `오류가 발생했습니다: ${data.error || "답변을 불러오지 못했습니다."}`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `네트워크 오류가 발생했습니다: ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col p-4 shrink-0 overflow-y-auto">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
            ⚡
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">해리 포터 지식그래프</h1>
            <p className="text-xs text-slate-400">마법사의 돌 GraphRAG</p>
          </div>
        </div>

        {/* Database Status Card */}
        <div className="my-4 p-3 rounded-lg border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-300 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Neo4j Aura 상태
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">
              Connected
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-slate-400 font-mono">
            <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800/80">
              <div className="text-slate-500 text-[10px]">노드 총합</div>
              <div className="text-slate-200 font-semibold text-xs">115개</div>
            </div>
            <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800/80">
              <div className="text-slate-500 text-[10px]">관계 총합</div>
              <div className="text-slate-200 font-semibold text-xs">308개</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 space-y-0.5 pt-1">
            <div className="flex justify-between"><span>• 사건(event)</span><span className="font-mono">32</span></div>
            <div className="flex justify-between"><span>• 인물(person)</span><span className="font-mono">30</span></div>
            <div className="flex justify-between"><span>• 사물(object)</span><span className="font-mono">26</span></div>
            <div className="flex justify-between"><span>• 장소(place)</span><span className="font-mono">17</span></div>
            <div className="flex justify-between"><span>• 집단(group)</span><span className="font-mono">10</span></div>
          </div>
        </div>

        {/* Recommended Questions */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            기획서 핵심 질문 추천
          </div>
          <div className="space-y-1.5">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="w-full text-left text-xs p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/40 hover:bg-slate-800/60 hover:border-slate-700 transition-colors text-slate-300 disabled:opacity-50 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>디지털인문학응용 B팀</span>
          <span className="font-mono">Next.js 15</span>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-slate-950">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="font-semibold text-sm text-slate-200">
              지식그래프 기반 Grounded Q&A
            </h2>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Neo4j Live 연결됨
          </div>
        </header>

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-3xl ${
                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  m.role === "user"
                    ? "bg-amber-500 text-slate-950"
                    : "bg-slate-800 text-amber-400 border border-slate-700"
                }`}
              >
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  m.role === "user"
                    ? "bg-amber-500 text-slate-950 font-medium"
                    : "bg-slate-900 border border-slate-800 text-slate-200 shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {/* Cypher Query & Graph Evidence Collapsible (for assistant) */}
                {m.cypher && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() =>
                        setExpandedCypherIndex(expandedCypherIndex === idx ? null : idx)
                      }
                      className="flex items-center gap-1.5 text-[11px] text-amber-400/90 hover:text-amber-300 font-medium cursor-pointer transition-colors"
                    >
                      {expandedCypherIndex === idx ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                      <Terminal className="w-3.5 h-3.5" />
                      실행된 Cypher 쿼리 및 그래프 탐색 결과 ({m.graphData?.length || 0}건)
                    </button>

                    {expandedCypherIndex === idx && (
                      <div className="mt-2 space-y-2 text-[11px]">
                        <div>
                          <div className="text-slate-400 text-[10px] mb-1 font-semibold">Cypher Query:</div>
                          <pre className="p-2.5 rounded bg-slate-950 text-emerald-400 font-mono text-[10px] overflow-x-auto border border-slate-800">
                            {m.cypher}
                          </pre>
                        </div>
                        {m.graphData && m.graphData.length > 0 && (
                          <div>
                            <div className="text-slate-400 text-[10px] mb-1 font-semibold">Graph Result Preview:</div>
                            <pre className="p-2.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px] overflow-x-auto max-h-48 border border-slate-800">
                              {JSON.stringify(m.graphData, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-3xl mr-auto">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="rounded-2xl p-4 bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                지식그래프 탐색 및 응답 생성 중...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 max-w-4xl mx-auto"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="해리 포터와 마법사의 돌에 대해 질문해 보세요..."
              disabled={loading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 rounded-xl font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              질문하기
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
