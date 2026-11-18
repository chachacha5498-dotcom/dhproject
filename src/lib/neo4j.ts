import neo4j, { Driver, Session } from "neo4j-driver";

let driver: Driver | null = null;

export function getNeo4jDriver(): Driver {
  if (!driver) {
    const uri = process.env.NEO4J_URI;
    const username = process.env.NEO4J_USERNAME;
    const password = process.env.NEO4J_PASSWORD;

    if (!uri || !username || !password) {
      throw new Error("Neo4j 환경 변수가 설정되지 않았습니다. .env.local을 확인해 주세요.");
    }

    driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
      maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
      maxConnectionPoolSize: 50,
      connectionAcquisitionTimeout: 20000,
    });
  }
  return driver;
}

/**
 * 안전한 읽기 전용 Cypher 쿼리를 실행합니다.
 * 파괴적인 연산(DELETE, DROP, SET, CREATE 등)을 감지하여 차단합니다.
 */
export async function executeReadOnlyQuery<T = any>(
  cypher: string,
  params: Record<string, any> = {}
): Promise<T[]> {
  const destructivePattern = /\b(DELETE|DETACH\s+DELETE|DROP|REMOVE|CREATE|MERGE|SET)\b/i;
  if (destructivePattern.test(cypher)) {
    throw new Error(
      "보안 정책 위반: 데이터베이스 변경 및 삭제 쿼리(DELETE, DROP, CREATE 등)는 허용되지 않습니다."
    );
  }

  const currentDriver = getNeo4jDriver();
  const database = process.env.NEO4J_DATABASE || undefined;
  const session: Session = currentDriver.session({
    database,
    defaultAccessMode: neo4j.session.READ,
  });

  try {
    const result = await session.run(cypher, params);
    return result.records.map((record) => {
      const row: Record<string, any> = {};
      record.keys.forEach((key) => {
        const keyStr = String(key);
        const val = record.get(keyStr);
        // Neo4j Integer 변환 처리
        if (neo4j.isInt(val)) {
          row[keyStr] = val.toNumber();
        } else if (val && typeof val === "object" && "properties" in val) {
          row[keyStr] = val.properties;
        } else {
          row[keyStr] = val;
        }
      });
      return row as T;
    });
  } finally {
    await session.close();
  }
}
