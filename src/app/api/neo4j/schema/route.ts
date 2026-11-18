import { NextResponse } from "next/server";
import { executeReadOnlyQuery } from "@/lib/neo4j";

export async function GET() {
  try {
    // 1. 노드 라벨 및 개수 조회
    const nodeCounts = await executeReadOnlyQuery(`
      MATCH (n)
      RETURN labels(n)[0] as label, count(n) as count
      ORDER BY count DESC
    `);

    // 2. 관계 유형 및 개수 조회
    const relCounts = await executeReadOnlyQuery(`
      MATCH ()-[r]->()
      RETURN type(r) as relationship, count(r) as count
      ORDER BY count DESC
    `);

    return NextResponse.json({
      success: true,
      nodes: nodeCounts,
      relationships: relCounts,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Neo4j 스키마 조회 실패" },
      { status: 500 }
    );
  }
}
