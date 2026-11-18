디지털인문학 응용 (COLA173-19) · 2026학년도 2학기

**지식그래프 구축 프로젝트 기획서(10.14 발표)**

Knowledge Graph DB Project Proposal

| 문서번호 | 173-19-02 | 작성일자 | 2026년 9월 30일 |
| :---: | :---- | :---: | :---- |
| **팀 명** | B팀 | **제출처** | 디지털인문학응용 담당 교수 |
| **프로젝트명** | 영화 \<해리 포터와 마법사의 돌\> 지식그래프 구축 프로젝트 |  |  |
| **작성자** | 김나현, 장소희, 우서윤, 김민섭 |  |  |
| **발표자료(url)** |  |  |  |

*※ 본 기획서는 실제 기업·기관에서 사용하는 프로젝트 기획서 양식을 따릅니다. 회색 안내문(※)은 작성 후 삭제하십시오.*

*※ 분량은 본 양식 기준 3\~4쪽이며, 표의 빈칸은 필요에 따라 늘려 사용합니다. 기획서 양식은 자유롭게 변경 가능합니다.*

**Ⅰ. 기획 개요 (Executive Summary)**

*※ 전체 내용을 모르는 사람이 이 항목만 읽고도 무엇을 만드는지 알 수 있어야 합니다. 가장 마지막에 작성하십시오.*

| 추진 배경 | 《해리 포터와 마법사의 돌》에는 다양한 등장인물과 사건이 등장하며, 인물 간 관계와 사건의 연관성이 작품의 주요 서사를 형성한다. 이를 데이터베이스로 구축하여 작품 속 인물과 사건 정보를 체계적으로 정리하고자 한다.  |
| :---: | :---- |
| **프로젝트 목적** | \<해리 포터와 마법사의 돌\>에 등장하는 주요 인물, 호그와트 기숙사, 장소, 사건, 사물 간 관계를 Neo4j 기반 지식그래프로 구축한다. 이를 통해 인물 간 관계뿐 아니라 사건과 장소, 집단이 어떻게 연결되는지 파악하고, 작품의 서사 구조를 데이터 기반으로 분석하는 것을 목적으로 한다. |
| **대상 데이터** | 《해리 포터와 마법사의 돌》에 등장하는 인물·집단·장소·사건·사물 5개 클래스(노드 115개)와 그 사이의 14종 관계를 대상으로 한다. 인물 데이터에는 이름·학년·직책을, 사건 데이터에는 사건명·설명·대본 장면 번호를, 사물 데이터에는 종류·기능 정보를 포함한다. |
| **최종 산출물** | Neo4j 그래프 데이터베이스 · 시각화 결과 · 최종 결과 보고서 |
| **추진 기간** | 2026년 9월 \~ 12월 (10주) |

**Ⅱ. 대상 선정 및 범위 정의**

**1\. 대상 선정**

*※ 팀원이 충분히 알고 있는 대상을 선정합니다. 대상에 대한 이해도가 곧 데이터 품질입니다.*

| 선정 대상 | 영화 \<해리 포터\> |
| :---: | :---- |
| **선정 사유** | 〈해리 포터와 마법사의 돌〉은 대중적으로 널리 알려져 있어 팀 내 이해와 자료 검증이 비교적 용이하며, 인물·집단·장소·사건·사물 간 관계가 균형 있게 등장한다는 점에서 지식그래프 구축 대상에 적합하다. |
| **보유 역량** | 시리즈 시청 경험자 2명 |

**2\. 범위 정의 (Scope)**

*※ 무엇을 포함할지보다 무엇을 제외할지를 명확히 적는 것이 중요합니다. 범위가 열려 있으면 일정이 무너집니다.*

| 구분 | 내용 | 비고 |
| ----- | ----- | ----- |
| 포함 범위 | 1편 (해리 포터와 마법사의 돌) | 예) 드라마 인물 관계망 팀 : 시즌 1의 주요 인물 40명 |
| 제외 범위 | 영화 \<해리 포터\> 2\~7편 | 1회성 단역, 시즌 2 이후 인물, 배우 실제 신상  |
| 기준 시점 | 해리가 프리벳가 4번지에 맡겨지는 장면부터 학년 말 기차역 작별까지 |  |

**Ⅲ. 핵심 질문 (Key Questions)**

*※ 본 프로젝트의 성패는 아래 질문에 데이터로 답할 수 있는지로 평가됩니다.*

*※ 단순 조회로 답이 나오는 질문(예: "데뷔일은 언제인가")은 제외합니다. 두 개 이상의 관계를 따라가야 답이 나오는 질문을 작성하십시오.*

| No. | 핵심 질문 | 필요한 관계 유형 |
| :---: | ----- | ----- |
| 1 | 해리가 다른 인물에게서 받은 사물은 무엇이며, 그 사물은 어떤 사건에서 사용되었는가? | 소유, 전달, 사용 `GIVES (인물–사물), OWNS (인물–사물), USED_IN (사물–사건)` |
| 2 | 마법사의 돌을 지키는 장치는 무엇이며, 각각 어느 장소에 있고 어떤 사건에서 어떤 인물이 마주쳤는가? | 보호, 위치, 사용, 참여 `GUARDS (사물–사물), LOCATED_IN (사물–장소), USED_IN (사물–사건), PARTICIPATES_IN (인물–사건)` |
| 3 | 해리와 적대 관계인 인물은 누구이며, 각각 어느 집단에 속하는가? | 적대, 소속 RIVAL\_OF (인물–인물), BELONGS\_TO (인물–집단) |
| 4 | 가장 많은 사건에 참여한 상위 5명의 인물과 그 참가 사건 수는 얼마인가요?  | `참여 PARTICIPATES_IN (인물–사건)` |
| 6 | 해리 포터를 보호하는 인물들은 누구이며, 이들이 해리와 함께 참여한 사건은 무엇인가요? | `보호, 참여 PROTECTS` (인물–인물) `PARTICIPATES_IN` (인물–사건) |
| 7 | 라이벌 관계에 있는 두 인물이 동시에 참가한 사건, 해당 사건 발생 장소는 어디인가요? | `RIVAL_OF(인물-인물), PARTICIPATES_IN (인물–사건)`, OCCURED\_AT (사건- 장소) |
| 8 | 해리 포터와 드레이코 말포이가 함께 참여한 사건들은 무엇이며, 해당 사건들은 어느 장소에서 발생했나요? | RIVAL\_OF (인물–인물) PARTICIPATES\_IN (인물–사건) OCCURS\_AT (사건–장소) |
| 9 | 사건 발생, 사물 배치, 장소 포함 관계 등 가장 많은 연관 관계를 가지고 있는 상위 5개 장소는 어디인가요? | OCCURS\_AT (사건–장소), `LOCATED_IN (사물–장소)` |
| 10 | 해리 포터와 친구들이 함께 참여한 사건들은 어느 장소에 집중되어 있는가? | FRIEND\_OF (인물–인물) PARTICIPATES\_IN (인물–사건) OCCURS\_AT (사건–장소) |
| 11 | 누군가를 의심하는 관계가 함께 참여한 사건은 무엇인가요? | `SUSECT_OF(인물-인물), PARTICIPATES_IN (인물–사건)`,  |

**Ⅳ. 데이터 설계 (Data Model)**

**1\. 설계 근거 자료**

*※ 설계의 근거가 되는 실제 원문 자료가 있다면 거기서부터 시작합니다. 자료 사본에 명사는 굵은 글자 & 다른 색, 동사는 밑줄로 표시* 

| 이모네 벽장에서 생활하며 구박받던 해리. 11살 생일에 호그와트 마법학교 입학 초대장을 받는다. 거인 해그리드와 함께 떠난 마법 세계에서 론과 헤르미온느를 만나 모험을 시작한다. 부모님을 살해한 볼드모트가 마법사의 돌을 차지하는 것을 막아야 한다.  |
| :---- |
| **자료명: 해리포터 마법사의 돌 시놉시스 출처: 씨네21** |

**2\. 개체(Instance) 추출**

*※ 자료에 등장하는 고유명사(굵은 글자)를 **보이는 대로** 옮겨 적으십시오.* 

| 노드 | 설명 | 주요 속성 | 예상 건수 |
| ----- | ----- | ----- | ----- |
| 해리 포터 | 그리핀도르 기숙사 소속의 주인공. 마법사의 돌을 지키는 사건을 해결하는 중심 인물. | 기숙사(그리핀도르), 역할(주인공) | 1 |
| 론 위즐리 | 그리핀도르 기숙사 소속 학생. 해리의 친구로 사건 해결에 함께 참여한다. | 기숙사(그리핀도르), 역할(조력자) | 1 |
| 헤르미온느 그레인저 | 그리핀도르 기숙사 소속 학생. 뛰어난 지식으로 사건 해결을 돕는다. | 기숙사(그리핀도르), 역할(조력자) | 1 |
| 드레이코 말포이 | 슬리데린 기숙사 소속 학생. 해리와 적대 관계에 있는 인물. | 기숙사(슬리데린), 역할(적대자) | 1 |
| 세베루스 스네이프 | 슬리데린 기숙사 사감이자 교수. 겉으로는 의심 받지만 실제로는 돌을 지킨다. | 기숙사(슬리데린), 역할(보호자) | 1 |
| 볼드모트 | 마법사의 돌을 노리는 어둠의 마법사. | 기숙사(없음), 역할(최종 적대자) | 1 |
| 루베우스 해그리드 | 그리핀도르 출신의 사냥터지기. 해리에게 중요한 정보를 제공한다. | 기숙사(그리핀도르), 역할(조력자) | 1 |
| 합 계 | 노드 총 50\~100건 범위 내 설계 (권장) |  | 115 |

**3\. 클래스(Class) 정의**

*※ 노드 유형은 3\~5종을 권장합니다. 위에서 뽑은 개체를 비슷한 것끼리 묶고, 묶음에 이름을 붙입니다. 그 이름이 클래스입니다.* 

| 클래스명 | 포함 개체 | 범주화 기준 | 예상 건수 |
| :---: | ----- | ----- | ----- |
| 인물 | 해리 포터, 론 위즐리, 헤르미온느 그레인저, 드레이코 말포이, 네빌 롱바텀, 덤블도어, 스네이프, 퀴렐, 맥고나걸, 해그리드, 볼드모트 경,, 더즐리 가족 구성원 등  |  행위의 주체 (사람) | 30 |
| 집단 | 그리핀도르, 슬리데린, 래번클로, 후플푸프, 그리핀도르 퀴디치 팀, 슬리데린 퀴디치 팀, 포터 가족, 위즐리 가문, 더즐리 가족, 호그와트 교수진 | 여러 인물이 소속된 기숙사/팀/가문/교직원 | 10 |
| 장소 | 프리벳가 4번지, 다이애건 앨리, 그린고츠 은행, 713번 금고, 9와 4분의 3 승강장, 호그와트 급행열차, 호그와트, 3층 금지 복도, 플러피가 있는 방, 악마의 덫이 있는 공간, 날개 달린 열쇠의 방, 마법사 체스의 방, 최종 대결의 방, 해그리드의 오두막, 금지된 숲, 호그와트 도서관, 퀴디치 경기장 | 사건이 일어나거나 사물이 위치하는 물리적인 공간 | 17 |
| 사건 | 더즐리 가에 맡겨지는 해리, 동물원 유리 사건, 입학 편지 소동, 지팡이 고르기, 기숙사 배정식, 할로윈 트롤 침입, 첫 퀴디치 경기, 노버트 부화, 금지된 숲의 유니콘 피, 플러피·악마의 덫·날개 달린 열쇠·마법사 체스 관문, 퀴렐과의 대결, 기숙사 우승컵 시상, 역에서의 작별 등 | 특정 시점에 인물이 참여한 일 | 32 |
| 사물 | 마법사의 돌, 분류 모자, 투명 망토, 님부스 2000, 소망의 거울, 해리의 지팡이, 볼드모트의 지팡이, 헤드위그, 기억구슬, 플러피, 트랩도어, 악마의 덫, 날개 달린 열쇠들, 거대 마법사 체스판, 노버트, 유니콘의 피, 퀴렐의 터번, 기숙사 우승컵 등 | 인물이 소유/사용하는 물건 및 동식물 | 26 |
| 합 계 | 노드 총 50\~100건 범위 내 설계 (권장) |  | 115 |

**4\. 관계(Relationship) 정의**

*※ 자료에서 **밑줄 친 동사**를 출발점으로 삼습니다. "관련있다"와 같은 모호한 관계는 분석이 불가능합니다.*

| 관계명 | 시작 노드 | 도착 노드 | 의미 |
| ----- | ----- | ----- | ----- |
| BELONGS\_TO (소속되다)  | 인물 | 집단 | 인물이 특정 집단에 속한다  |
| FAMILY\_OF (가족이다)  | 인물 | 인물 | 혈연 관계이다 |
| FRIEND\_OF (친구이다)  | 인물 | 인물 | 친구 관계이다 |
| RIVAL\_OF (대립하다)  | 인물 | 인물 | 라이벌/적대적인 관계이다 |
| SERVES (섬기다)  | 인물 | 인물 | 다른 인물의 명령을 따른다  |
| PROTECTS (보호하다)  | 인물 | 인물 | 다른 인물을 지킨다 |
| SUSPECTS (의심하다)  | 인물 | 인물 | 다른 인물을 특정 사건의 범인으로 의심하다 |
| PARTICIPATES\_IN (참여하다)  | 인물/집단 | 사건 | 인물 또는 집단이 사건에 참여한다 |
| OCCURS\_AT (일어나다)  | 사건 | 장소 | 사건이 발생한 장소이다 |
| OWNS (소유하다)  | 인물 | 사물 | 인물이 사물을 소유하고 있다 |
| GIVES (주다)  | 인물 | 사물 | 인물이 다른 인물에게 사물을 준다 (속성 to에 받는 사람 기재) |
| USED\_IN (사용되다)  | 사물 | 사건 | 사물이 사건에서 사용/등장한다 |
| GUARDS (지키다)  | 사물 | 사물 | 장애물이 다른 사물을 지킨다 (예: 플러피→트랩도어, 각 관문→마법사의 돌) |
| LOCATED\_IN (위치하다)  | 장소/사물 | 장소 | 장소의 포함관계, 사물의 위치 |

**5\. 속성(Property) 정의**

*※ 위에서 관계로 쓰이지 않고 남은 정보만 속성이 됩니다.*

| 클래스 | 속성명 | 필수 여부 | 예시 |
| ----- | ----- | ----- | ----- |
| 공통 | name, class | 필수 | name: “해리 포터”, class: “person” |
| 인물 | name\_eng / type / role | 선택 | name\_eng: “Harry Potter”, type: “1학년 학생”, role: “그리핀도르 주장” |
| 집단 | name\_ko / type / reference | 선택 | name\_ko: “그리핀도르”, type: 기숙사 / 팀 / 가문 / 교직원 |
| 장소 | name\_ko / type / description / reference | 선택 | name\_ko: “최종 대결의 방”, type: “방” |
| 사건 | description / source | 선택 | description: “분류 모자가 학생들을 네 기숙사에 배정함”, source: “15–17” (대본 장면 번호) |
| 사물 | name\_ko / type / function / reference | 선택 | name\_ko: “투명 망토”, type: “마법 물품”, function: “착용자를 투명하게 함” |

**6\. 데이터 모델 개념도** 

*※ 노드와 관계를 도식으로 그려 첨부하거나, 아래 영역에 작성하십시오.*

| ![][image1] |
| :---- |

**Ⅴ. 데이터 확보 계획**

*※ 출처의 신뢰도와 접근 가능성을 함께 검토합니다. 수집이 불가능한 항목은 설계 단계에서 제외하는 것이 원칙입니다.*

| 수집 항목 | 출처 | 수집 방법 | 담당자 | 완료 예정 |
| ----- | ----- | ----- | ----- | ----- |
| 인물  | 해리포터와 마법사의 돌 대본 전문 |  | 우서윤 |  |
| 사물 및 집단 | 해리포터와 마법사의 돌 대본 전문 |  | 김민섭 |  |
| 장소 | 해리포터와 마법사의 돌 대본 전문 |  | 김나현 |  |
| 사건 | 해리포터와 마법사의 돌 대본 전문 |  | 장소희 |  |
|  |  |  |  |  |

**데이터 품질 기준**

| 정확성 | 2026.10.07  (   0   )% |
| :---: | :---- |
| **일관성** | 원문 대본 기준 표기  |
| **출처 표기** | 모든 노드에 출처 속성 기재 여부 :   □ 전체 기재    ■ 일부 기재 |

**Ⅵ. 추진 일정**

| 기간 | 추진 내용 | 산출물 | 책임자 |
| :---: | ----- | ----- | ----- |
| 6주 | 기획 및 데이터 모델 설계 | 기획서, 설계 초안 |  |
| 7주 | 중간 검토 (중간발표) | 설계 확정안 ([발표 ppt](https://docs.google.com/presentation/d/1CfqABzf0ei8vYJPzcBKVZDl7S2tDJTKmvUf1NAVoN_4/edit?usp=sharing)) |  |
| 8주 | 데이터 입력 | 1차 DB |  |
| 9주 | 질의 작성 및 검증 | Cypher 질의문 |  |
| 10주 | 시각화 | 시각화 결과물 |  |
| 11주 | 데이터 정제 | 품질 개선 DB |  |
| 12\~13주 | 산출물 정리 및 내부 검토 | 포트폴리오 |  |
| 15\~16주 | 최종 보고 | 발표자료, 결과 보고서 |  |

**Ⅶ. 팀 구성 및 역할 분담**

*※ 본 프로젝트의 역할은 고정 직책이 아니라 주차별 책임자(당번) 방식으로 운영합니다. 데이터 입력은 전원이 분담합니다.*

| 성명 | 소속 | 담당 업무 | 연락 방법 |
| ----- | ----- | ----- | ----- |
| 김나현 | 사회학과 |  |  |
| 김민섭 | 독어독문학과 |  |  |
| 우서윤 | 영어영문학과 |  |  |
| 장소희 | 서어서문학과 | 발표, 데이터 입력 | 카카오톡 |

**협업 방식**

| 정기 회의 | 요일 / 시간 / 장소 :  | 협업 도구 |  |
| :---: | :---- | :---: | :---- |
| **의사결정** | 설계 변경 시 결정 방식 :  |  |  |

**Ⅷ. 예상 위험요인 및 대응 방안**

*※ 실제 기획서에서 가장 중요하게 검토되는 항목입니다. 문제가 생길 지점을 미리 적는 것이 감점 요인이 아니라 평가 요인입니다.*

| 위험요인 | 발생 가능성 | 영향도 | 대응 방안 |
| ----- | ----- | ----- | ----- |
| 한국어 표기 불일치(레이븐클로/래번클로, 현자의 돌/마법사의 돌)로 중복 노드 발생 | 상 | 상 | 인물은 name을 한글로 쓰고 name\_eng를 병기한다. 집단·장소·사물은 name을 영문으로 쓰고 name\_ko를 병기한다. 사건은 영문 이름에 한글 설명을 붙인다. |
| 원작 소설·영화·위키 간 내용 차이로 영화에 없는 데이터가 섞임  | 중 | 중 | 사전에 협의한 영화 대본을 기준으로 작성 |

**Ⅸ. 기대효과**

| 학술적 효과 | 소설과 같은 복잡한 비정형 문학 텍스트에서 개체와 관계를 추출하여 표준 온톨로지 모델로 구체화하는 지식 모델링 프로세스를 검증한다. 문학 작품 분석에 네트워크 분석 기법(중심성 측정, 커뮤니티 감지 등)을 결합하여 정량적·데이터 기반의 인물 구도 및 서사 구조 분석 연구 가능성을 제시한다.  |
| :---: | :---- |
| **활용 가능성** | \<마법사의 돌\>을 기준으로 설계한 지식 그래프 스키마를 기반으로, 후속 편(\<비밀의 방\>, \<아즈카반의 죄수\> 등)이나 연계 되는 같은 시리즈의 데이터로 무제한 확장 가능한 범용 데이터 구조를 구축한다. 웹/앱 기반의 시각화 인터페이스와 연결하여 팬덤 커뮤니티, 콘텐트 플랫폼, 교육용 도구 등에서 사용자가 인물 간 세력 구도와 아이템·장소의 연관성을 직관적으로 탐색하는 콘텐츠로 확장할 수 있다.  |
| **팀 역량 강화** | 비정형 텍스트 수집 및 전처리부터 개체명 인식, 관계 추출, 그래프 DB(Neo4j 등) 적재까지 이어지는 데이터 엔지니어링 전 과정을 직접 설계하고 구현한다. 구조화된 지식그래프와 대형언어모델(LLM)을 결합하는 경험을 통해, LLM의 환각 현상을 억제하고 논리적 추론 성능을 극대화하는 AI 응용 기술력을 구축한다. 단순 관계형 데이터베이스의 한계를 넘어, 다대다 관계와 복잡하게 얽힌 서사 구조를 노드와 엣지로 추상화하고 체계화하는 차원 높은 데이터 모델링 감각을 습득할 수 있다   |

**Ⅹ. AI 도구 활용 계획**

*※ 본 교과목은 AI 활용을 권장하며, 활용 내역을 기록하는 것이 개인과제 평가 항목입니다.*

| 활용 단계 | 사용 도구 | 활용 목적 | 검증 방법 |
| :---: | ----- | ----- | ----- |
| 예: 온톨로지 설계  | ChatGPT | 노드 유형 후보를 10개 뽑게 하고 그중 4개를 골랐다  | 팀원 2인 교차 검토 |
| 예: Cypher 질의 작성  |  |  |  |
| 예: 발표자료  |  |  |  |

위와 같이 프로젝트 추진을 기획하여 제출합니다.

2026년         월         일

팀명                              팀원1                        (서명)

                                    팀원2                        (서명)

                                    팀원3                        (서명)

                                    팀원4                        (서명)

| 검토 의견 |   | 검 토 |   |
| :---: | :---- | :---: | :---- |

데이터 편찬 작업물: [(수) B팀\_해리포터](https://docs.google.com/spreadsheets/d/1vHrNym91EM1x_rFx4_dxxUPHEm3QUg7PTUeSED0ISws/edit?gid=2062235475#gid=2062235475)  


[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkEAAAEqCAYAAAAS34SpAABBHElEQVR4Xu3dB3gU1doHcEGv1/6J4lWxYLsXQUVAsaOAIEVFRKVD6Ij0Ik1UuoBUadKLSJPeEgIJHUI3IQESAgFCCS2hSQtwvrwnnGH2zGyym53ZnZ35/57nfWb2zGazu9md/efsmTN3MAAAAAAHukNuAAAAAHAChCAAAABwJIQgAAAAcCSEIAAAAHAkhCAAAABwJIQgAAAAcCSEIAAAAHAkhCAAAABwJIQgAAAAcCSEIAAAAHAkhCAAAABwJIQgAAAAcCSEIAAAAHAkhCAAAABwJIQgAAAAcCSEIAAAAHAkhCAAAABwJIQgAAAAcCSEIAAAAHAkhCAAAABwJIQgAAAAcCSEIAAAAHAkhCDIkevXLrHU5E3s6K4ZbNey5mzLnxXZ2jFFWfjAJ1hYv/9jq0cWZBsmfsB2zKnOEtf9wk4mLmcXTu+VbwYAACBgEIJA182b19npA5EstO/9mooY8jTbOP5NdnhjL/bPoWUs/VRUtnUyZgzbG9qUrR7x34zbeEBzmyuHPseu/nNSvhsAAACmQQgCxfkTMZpwsntJfU2gMbpSdo5k68cWcfm9O+fWlO8eAACAoRCCHOzmzRsuwSNm7teagBLICh/wqHLfLp87It99AAAAnyAEOdDlc4eVcLFjRgVN+LBaXTy0VLm/iev7yw8HAAAgRxCCHGTViJd5kFgzsoAmaARLXUhaqAQiAAAAXyAEOUD6lXM8NIQPeEQTKoK1jm4ewB/TyiHPyg8XAADAIwhBNkdBIWLIU5oQYZe6kLSIP8aE1T3khw4AAJAlhCAb42NoVrbWBAf71abMILQGQQgAADyHEGRD68e9xUOBNiwYV9EbZrJ8+fIpVeB/L/Gl2P5ygf8qRZdp2/xpgzS3Y2StGZU55gkAAMATCEE2s3VmZRYx+HYYMbvUwcfdurhsdgiiunZiA4IQAAB4BCHIZszuAVIXBZvG9b5WAk92IUhuM6tWDHocQQgAALKFEGQj/gxAF4+uY1dSNiiXxwztpglBooq+/qrfeoJErfj1MXblwnH5KQIAAFAgBNnEhVO7/RqCqIoULsQqliupXFaHoPitc1nkojEu2/wZgqjQGwQAAFlBCLIJ+sA/FTNWEwTMLApBbxYrzIb80oGXOgT1/OE7v3395a7oObl+9YL8VAEAAHAIQTbh714gKgpB6q+99EKQXPJtmFkrB+dj+9b0lJ8qAAAADiHIJgIRgqxeMfOqsfBf/yM/VQAAABxCkE0gBGlr6x+l2MZJH8pPFQAAAIcQZBMIQdqi5yQ1eaP8VAEAAHAIQTax+Y9ybOWgxzVBwMmFo8MAACArCEE24s/eoI0rprLGDWqzcuU+0WyzQp2MGcO2//WN/BQBAAAoEIJs5PyJXSx8wCOaQGBGhc0drayfT17Lvqj0GV9P3LmIlS1blq8fjw9nWyL/5OufVqzADscuY4d2LdXcltF1NWUteoEAACBbCEE2Qx/+dP4sORgYXWtDJ7HYTX+xpo3q8BBEbUP7d3W5jjoE/di5JV82rFdTc1tGFz0Hacmb5KcGAADABUKQDVEI2Dy1hCYcGFmtmzdke7fOZ59/VlEJQddObmJ7tsxjn3yS2RPUsH4tHpJonXqCju1dzi4eWae5LSMLEyQCAICnEIJsisLAkahfNCEhUCV6gswsesyJG/rLTwUAAIAuhCAbWzEon18HSweqwvo9hDFAAADgNYQgm7twai8PCOvHFtWEBzsUPbaIIc/IDxsAACBbCEEOcXJ/OA8M4QMe1QSJYKuLBxfzx4LeHwAA8AVCkAOJAJEY2U4TMKxaFw8tY6G/PMjv97a/vpYfEgAAgNcQghxs+YC8PFTQmBp/HFafk9o563MltO1e8b38EAAAAHIMIQi49RPeVcIG1cmY39m1k/4NRucPzGfrxxVT7sNKjPUBAAATIQSBxvHdc1nYra+eREUMeYqdiB7N/jkcqgkv3haFq9S909j26eVdfgfVhonvM3bzhnyXAAAADIcQBB6jM7JHTSvHwn99TBNePK2wfv/HIoc9zw5sGiLfPAAAgF8hBIGh2rVrx775BicuBQAA60MIAkNRAKJKSUmRNwEAAFgKQhAY5vDhw0oIQm8QAABYHUIQGEYdgKjGjh0rXwUAAMAyEILAEOnp6ZoQhN4gcIqLl66xt6pNYq9XHs9e+2JcjqpwRhX5cjwbOClKvnkAMAlCEBgO4QfsqnXfcFa0ygSX8PJh3Wls8frDLO7QBbb78EWfa/2uU6z/pG2akPRN23ks7fwV+S4BgA8QgsBwCEFgFz1GrlVCyJvfTGKR249rQou/amfiWdZtxHrl/lCv0e79p+W7DABeQAgCwyEEQTA7fuoCK1z5dg/M1vhUTSCxQnX9bZ1yHyfNj5YfBgB4ACEIDIcQBMFIBIpqHRZqAofV68eRG5T7n3L6ovzQAMANhCAwHEIQBJM2v6zg4aHlLxGacBFsNXHhHv5YStT5Q36YAKADIQgMhxAEwaDbsDU8MMxfc1ATJoK94g5d5I+teNVJ8sMGABWEIDAcQhBY3Rct/uLjfuTwYLcq3WA6D0MAoA8hCAyHEARWRqFg7Nw4TWAws/Lly6dpE7U9/mSW240oeszNe4bJTwWA4yEEgeEQgsCqKAw0+DFUExLMKHWwkddF0WV/hCAqeuzHT2HQNIAaQhAYDiEIrIhCwPaENE04MKvk4KPeRhMrqsOQvN2swldjAK4QgsBwCEFgNfTh/1Wb+ZpQYFYN/f0PHmx2JJzil9VBZ/Sk2Xw99uB5ftlfPUGiEIQAbkMIAsMhBIHV0Ae/HAbMLAo17Tp3V8KNOuQ89dRTLtf1dwiiAeGl6/8pP0UAjoQQBIZDCAIr+bDOH2zHvrOaMGBWUaAJWxvN1weNnKy0ydcR67sOnGXDfp+muR0zC71BAJkQgsBwCEFgJf7uBdKrrEJQIAohCCATQhAYDiEIrMQKIahnv+EulyOj9mpK/hkzq/e4zezGjZvyUwXgOAhBYDiEILASK4Qgq9XUJXsRggAYQhCYACEIrAQhSFul6k9nN5GBABCCwHgIQWAlCEHawpgggEwIQWA4hCCwEvrah04kKgcBs4omQpwXup6XvM0K9WdYAkIQwC0IQWA4hCCwGvrQHzb9b00gMKNikzInQaQaM/kvvly+LvOQ+dbtOvPloOETWN+BI/j6wN/G8ZJvx6xCAAK4DSEIDIcQBFZz6Uq6374WoxBUpkwZ9k3V6kpb2bJlWbly5fj6F198ybfT+mefV9L8vJlVMuRP1nXIKvnpAXAshCAwHEIQWBUFodiDFzThwMhS9wRRzV26lm2JO8rKl6+gtIkQ9Olnn2t+3qxq++sq9la1SfJTAuBoCEFgOIQgsKqOAyNN7xGic4K179SNF10WS6qm37Viq7ckKG2du/Xky9p162tux8iq3WkxvgYD0IEQBIZDCAKro0CwISbz5KZ2Lur1osfaqk+4/BQAAEMIAhMgBEEwoHBQpMoETXCwS0VsO84f40+/rZEfOgDcghAEhkMIAqui16a6vv6mKg8KZn9F5s+avHgPfzxvVZ0kP3wAkCAEgeEQgsCqJk+erAlCHTt2ZM17LefBodhXEzWhIlhq9Y4TSqADAM8gBIHhEILAqnr16uUSgGrUqOGy/fr1m0qQqNRijiZoWK12JJ5V7u+s0D0ujwUAsocQBNy1a9fkJgBbiI2N5YFn8eLF/PK8efP45b59+0rXdHXx0jVWMmSaEjJa9F2pCSH+rg27TrGiVSbcDj5hu5X7m5iYyKpVq6Z6BACQHYQgsLT9+/fLTQAeWbhwIQ878fHx8iaveysPHj3rEj7oa7PG3cM0IcXomrF8H3uv5lTl91Jt2HlEvnsuqHdr+fLlcjMA6EAIghy7fPmy3OTixIkTLpevXr3qctmdGzduKOt6H2AA7ly4cIEHnKioKHmT4ZKOnGXfdg91CSjqeqvaZFax2WxWv9sy1qTHctay70rWun8ka/hTKKvWYSGr1HyO5mfUVavjQrZ8fc7/CWjQoAGbNm2a3AwAKghBoHHz5k2WlpYmN7uoVKkSDyv33nsvv/zSSy/x5R13ZL6k7rnnHr4cMGAAX1JXvTviZ+j3jh07ll25coU9/vjjvA0hCDxBry8KP/RVV6DRuKKko2fZhh3J7I9Fu1jrvuGsRocF7IPa1KMzllVoMpM1+GEJ6zQoki1dk8j+3nuCnTmb9T8UORUXF+d1rxeAkyAEgYv69euz/PnzK5dLly7N1qxxnWekaNGiynpoaChf1q1blw0cOFAJNDJqnzVrltzMycGJ0HmWCEIQuLN7927+AT9jxgx5kyWJwdiBsG/fvoD9bgAr0//EAsd7+OGH5SYFdbMLQ4cO5UsakFmlShVNCMqdO7eynp6e7vJVlyB+Rv07n3rqKb5ECAJZWFgY/0DfuHGjvMnSRAhq1KiRvMlvGjduzBYsWCA3gweop/r48ePs9OnTjio6sMDOEILAReXKlflXUZcuXeKXCxUqxEtev/vuu1mJEiXYxIkT+WVxVIoINM8++yyrU6cOy5s3L7/8wAMPsFKlSvF1mTo40frzzz/PkpKS+GWEICBnz57lAaJ3797ypqBQtWpVJQRZoUemffv2bO7cuXIzgC4Kf3aFEAR+FxISwqtFixbyJg2EIGdLSEjgoSGYB/jS9BPqAEQ1fPhw+Wp+d+DAAX5fqIcDsoYpROwLIQgsDSHIeeioQ/pwbt68ubwp6FmhF0h28eJFfr+uX78ub4Jb9EIQ9Zar25988kn2ww8/sJSUFH6ZerVpck7x9ecTTzzBl126dOE96bQUl8U6/UzJkiVdxmUKosdcLF977TXNtn/9619sypQpfJ3GbhYpUsRlDOeLL77IrysPW4iOjuZFunfv7rLN7hCCwBB6Ownh1KlTchNLTU2Vm3QhBDmD6C2hr1DtzIohSA1hSJ/e/k0dgsRRsEQOGITGQxJxfRoeIPzzzz+8iPjZkydPKtsFsW3Xrl18qQ5BNDVErly52J9//qmEIKJ3MArNIUVDDkjnzp2lrfr3386c9WjBEK+++qrcpBlITW9QKpqvRbypaHzQCy+8wNfFMjsIQfZGX8XQB2+HDh3kTbZk9RBEWrduzaZPny43O1p2IUg9+7heiKD9Y0xMDCtcuDC/rA5BauJnz58/L225vW3btm18/Y033nDZ9u9//5s999xzLiGIepxEaPIUeoIAskA7R+runT9/vtJG/8UsWbKEH/mlN8OzePOqx0EgBDlbvXr1HNnrEAwhSGjbti3r06eP3OxI2YUgMmrUKL4U+zkx5cd9992nzF/13nvv8WVWIYjeE3pBSh2CCPX8qInwI5bh4eHqzQrqlcpqHBhCEIAbogdo7dq1fEkzQNPRZPQ9tLqE8ePH8yVCEBDa+dJRUnb/yisrwRSCCL3H6T7rTW3hJHohyGz0nNPvFZWdVatW8eXUqVNdN3ipZ8+ecpOtIQSB19555x2Xy8eOHVNKeP/99/k5jOgIFBGCqJfo6NGj/D8dhCDnCAkJcWSvj55gC0EC9XoE6303gtNDoJ0hBIHp9Lp2EYLsT8yNA7cF+/NBRzrhTPXOs3fvXrnJNrSfTgAWghAUXGgcCX3Qnzt3Tt4ELPhDkEDjRqin12noXGx///23o0pvkLadIASBpekdKgrW49SBzt6ySwgS7PZ4wHkQgoCjQas0O+/BgwctU4cOHZLvJljI4MGD+YegOMUJZM+OoYGODqXH5cngXQCrQQgCw9lxR28kGixuR55OgOlkdn1v6E2NEQh2HrsC5kAIAsPZdUdvFBxp4lx2fG/QbMVWcuXKFbkJwC2EIDCcHXf0AEaw43uDpr2wkrS0NLkpaJ05c4YfHLJlyxY+SDk5OZmfWw+MgxAEhrPjjt5sv/76Kxs9erQyC+z999+v9BjRFAMjRozgE1HSdcR1xc+RBx98kJ96gs7TJqYkGDZsGKtSpQrbt28fvyxum3723Xff5Us61xAtxe3RtPstWrTg62oTJkzgS3Hbr7zyinozeMiO7w11CFqxYgWfsfjpp59W2mrXrs0ef/xxvk6vn8WLF/Ovz+SpM4YOHcpfh6K9bNmybMiQIS7XEcTJSOn6tC5evySYQxDN8kyvEaoePXrw55Pev9TbRgeJUBiiWftr1qzJr0MnGcaYPN8gBIHh7LijN5sIM3TWZ0IBKHfu3HxdfCiIpfqIOfo5efp8cT3xNQXd5p133unyH2TdunX5kkIQDUAXg9Dl2xJECNq9ezf79ttvEYJyyI7vDXUIEuGE0Ae6+vUkjxnTC0HkmWee4Uv5fIQyEe4LFCjg0h5sIYimGqhevbrc7BUKnvTawsEk3kMIAsPZcUdvNgozNAmdOMR85syZrFSpUnydPiyop0eQQ5D8YSIuf/XVV+znn3/m63TOIrpNcTZrdQiSUWiSu9xFCKIu+S5durCiRYu6bAfP2PG9oQ5BIsAQOl+W+rVJX+2oya9bCkFz5sxxafvxxx9dLpNChQrx17L4+WANQXQ0rq/hRxYZGWnL15iZEILAcHgTek/0BJF7771XteX2h4X4r1oOQaRChQp8pzpjxgxNT5Ca2KYOQfQhRjV58mS2YMECfg4i+WfVIYjIH2DgGTu+N9QhiM5Af/bsWZeJFKnH5ssvv+TrefPm5YfUN2vWjF8+ffo0a9KkCV8XPUH02qITfNLZz/XmCXv++ef5ctGiRXwZbCGIenmNDj8y6nWjr8wge9iTgeHsuKN3IvowEQXGsON7wx8Do715LXpynUDZunUrHyPlL3Z8vRkNIQgMhzcegD47vjf8EYK8YdUQRKcaoR4uf6PXHKblcA8hCAxnxx09gBHs+N5ACMoefT0oxuMFAh05CvoQgsBwdtzRWxGNB+rUqRNLSUlRxujQ6UYeffRRvi7GTBCx/bHHHuPL//73v/x64rrgH3Z8b3gSgv744w9lTFuePHn4kgbgDxo0iK+L1ycdUSaIIyXF65QOl6fbyY7VQhD1/tD7MtDs+NozAkIQGA5vNv+gQcqvvvoqXxcfIlOnTuXLVq1auYSgEiVK8KUIQQg/gWHH90Z2IWjHjh18uW7dOr4UIUigr2rE63fp0qVKuwhBBQsWVNqCMQRZ6W9upftiFQhBYDi80fyDPjDov8wlS5YoHyLTpk3jS5pETYQg9dFlFIKio6M1IUg+GgzMYcf3RnYhiKivU6ZMGdUWxqeF0AtBFPAp0MghKLvXqpVCkPooOSvo2bOn3OR4CEFgODvu6K2IPjhCQ0N5iQ+RWbNm8ZmliQhBdBjy66+/zo4cOeLSE0Q/U7FixYCOVXAaO743PAlB9FoUJXqCaPnRRx/xdfH6pTmA6Dmi17HoCaJtDz30EGvQoEHQ9QT9/vvvclPANWzYUG5yNIQgMJwdd/RWpJ6rR2/eHvXXYYIIQRAYdnxveBKC5J5Hmd7rV4QgtWAKQVadvdmOr0FfaF95AD7CmwxAnx3fG56EIH+ySgiy6t+aZoOnSVUhE0IQGM6qb36rwJwdzmXH98b58+flpoCST/kSKCEhIXKTZdjxdZhTCEFgOLzBsiefRynYXbt2jZ9cFbJm1/cGffUT6HBPA6xpugiroNODWFXVqlXlJsdCCALD2XVHbwY6QSQdQXLlyhV5E9gQ3hvmoR4gen4vXrwobwLJL7/8Ijc5FkIQGA47+qx9//33/DkSZ4wH58B7w3w0bQQ9z3RUZKAcOHBAbrKU7du3y02OhRAEhsOOXmvjxo38edm2bZu8CRwE7w3/CtTzvWXLFrnJUrKba8lJEILAcIHa8VjRiBEj+PNx6tQpeRM4EN4b/lezZk3WrFkzudlUdLZ4K7PaYPZAQgiyAPqgpIFqtINUF7V17dpVvrrlOX1Hf+zYMf4cWHGiNAgsp783Aon2p9WqVZObTREfHy83WcrevXvlJsdCCAoQEXSmT58ub9Kg0yLQm5eun5SUJG+2HKfu6MPCwvhj37Rpk7wJgHPqe8NK6G9g9uBps2/fV+L0OoAQ5Fd0wkt6A547d07e5BVxFESdOnXkTZbgpB394sWL+eO16uywYC1Oem9YmRg87eu+OFi1bNlSbnIshCA/oTecGV2ktWvXttyO1Wr3xwypqan8cdL8OACecsJ7I5iMHTuWn5PMDJGRkXKTZeB1eFuWIcjug6fMCCWydu3a8TN6m030Dllhwjq7vsHoq0h6bMuXL5c3AXjEru+NYEf/TDZt2lRu9gkNyLYqvA5vcxuCEhIS5CZbMnOSulWrVvn9vDqJiYmsVq1acrNf2e0NtnTpUv6YgmE8Flib3d4bdkLzdtHfx6jDx636t6avAvVOruxUbkMQjV+xmg8//FApEV7U3+nKczMcPHjQ5bIeo17wMnoDBPIcNsnJyax69epys19Y9c3vDRrYSI9j8ODB8iaAHLPDe8Pu6PQf9Hfav3+/vMkrCxYskJssoWHDhnKTo+UoBJUpU4YvKTnfeeedfL1Pnz58mSdPHrZ69WrluvRiKl68uHJZECHmrrvukrbcVqlSJZfLdIoB+lD6z3/+49I+aNAgvqQQ9PbbbyvtgQpB/vj6y1PR0dGscePGcrOpgnlHT0fh/frrr3IzgCGC+b3hRPT3yuqzMDt//fUXvw1aWgVeg648DkGtWrXiJcILTQZFISguLo4vxUy4cgiiMTFDhgxRLpOrV68q688++yxf0m337dtXaSclS5bky4oVKypt1MMhpKen86XocdELQdmNgjcjBMmPI9DEkRD+4s/fZRS6z9m9VgB8FYzvDaejqS9y0ntCf2tRERER8uaA2bFjh9zkaB6HIOGOOzJ/hJbi3Ef333+/2xDkDn0wE3F7anT2XbodGV1XlPC///2PlS5dmq+LEETbn3jiiYD0BFl5J0d/F3/cP3/8Dl9RlzcNhmzdurW8CcA0wfDeAH3r16/XHWIgt1FHgToAUe3Zs8flOoHy888/y02Op00gt7gLQd9++y1f0h9afQJIOQTJYUX25ptvZrk9JwI9JohOjHnp0iW52XKM2BGnZzzO5A0bWOy06Szi+05sUZ0QNqviZ2zS2++yMa8VYX9+/AmbU+VrFtq0Gds0YCDbHxrGTltgR0BjyOjx4yzKEAhGvPcgsORQQ5f1JkhVh6AjR47Im3XtP36ALd68hP22aDhr8ltT9s0v1VjpLmXYm63fYu+2f5991r0Sq/VrbfbDlG5s8sopbHP8ZnbqnOen5MHrT8ttCnEXguzGyBA0ZswYucmyJkyYkOU8FjfS09n+sOVsXEagkWtGRsBZWrce2zNxMjud8ea/uHt3tnVwwUK2tV9/NqdSZTa+cFHNbU4tUZJdOHZMvhuG6dSpk2UnlwTnwIeQfci9PXrE6ZBSUlL45QMZIafBkIascPMiLlWs1ZusSp+vWPcZP7PQv5ewPSmx2Vb0kZ1s3IqxrNXYlqxUl481t0k1JnSs8q3L6NGj2ZkzZ9R3DxhCkGEhaPjw4XKT5Y0fP55FRUUpl4/v2KkJJ5t79dEEGqMrae48trBaTZffG/ad74PLacxYvXr1WIsWLeRNAAHh7sMSgg/17qhDUKNGjeSr8ADyYf2PXIJJ+Z8rsvCYUE2oMbq6TO3Ce4/Uv3vx5sXyXXQ8y4egF198kS/F4Yo0loPOyC1K5u1XbEaFoBo1ashNlnfj+nWX4LG2UxdNQAlk/fHBR8p9O+PFvFU0SRn9BwZgNQhB9iH3BFF1796drY/boISOjzqXYnHHYjQBJVA1edUk5b693qIou8kye4mczG1iyC4EiUPiKXT8+eefLtsqV67Ml1WqVOFLGjukF07ovEu0jQY3k5CQEJftU6dO5YfD01JvzgZxm7ly5eJHq1FA0vs9WTEiBA0dOlTpcgwGqYmJSriIbNNWEz6sVqc3brrdMzV4qPxwFLQTCvREkeAM9H6ncSG0nzS71EfTgnV069aNtW/fns80XbduXfZOo3eVgPHb0mGaAGK1qtz7S+X+Xk137mvMbWKgN58anUJDnEaDgouYcVKEoB9++IHNnz9fuT6FFhGCBPk25cBC/8GrT9VBoWbZsmX894kQROuiHnzwQd5GM/qSESNGaG6T3HfffXKTwogQFCz/3U0r9TEPEnMqfakJGsFSpzduVALR9StX+BxI8tEZAHazd+9euQks4MbNG0qQ+Dt5uyZoBEvRwGt6DA2H+ndOOSvQJoZb5MAiE2FDryeIUCBRhyC9sCEHFrkniIiBXHo9QQLNIC3mGxK3WaBAAZY/f35WqlQp9VU19O6Xt6x+Es3Jb7/HQ0Pqlq2aUBHMNe2jUvxxAfhTIHp9/X36HcieCD9yoAjmWrt3FX9MZX74RH64tpXjECSIEPTvf/+bl5oIQdTeq1cvl22EdibUSyOCi14IOnnypNyUJTlYZcfXEDRv3jy5yVIoJNDYGjlA2KXStm3jj3FTvwHyQwcwhRyCxNf5NDcZGThwIHvggQf4On1V8tBDD/EitMxq9uBnnnlGbuIQgqyjbEZAoKAQc2SnJkTYpYq0KMYfoxO4TQyehiBv0dw9VOKQwUDzNQRZ9auw9b378nBwMS5OExzMqq2LFmna/FXLGzdFrxD4hRyCnnzySb4UX7vHxsYq22isiNqBAwf4kr7m1/Pwww/r/iOHEGQNFAz6zu2jCQ1mVdzRGBa5faWm3V9Fj3dLvOv8e3ajfbfdYlYIsho7hqCZFT7NDEA6YcHIerVQIZYvXz62ZeFCfpnWxTZal2t0376a2zCyZn/6OYIQmC67EDRjxgzlnIoUgijUvPbaa/yyCEEFCxbkSxmFID0IQYFHgaDrtK6aoGBkyfvMLQlRrFrtqrrXk9vMKnrcQxf+Jj8dtmHJELQ74wPt9ddfl5sVdFQZ0RuL06RJE7kpS76GoKy6tgNhcUgDv3z91bZxY7ZtyRK+Tm/I5E2bNCGoYIEC7PVXX+XljxBEdSHjv3AEITCTHILU4yPV6Gsxdz1B7o74EiGIjnhVQwgKLH8e8UX7ykKvFuLrFIJEIBLb18eu5Zdjj0ZrftaseqN1cTZzzSz5abEFj0PQihUr+CGBhN7s8hv+hRdeUNbdfdVFZ4z/6aeflBO4hYeH89sVaKexJOODdfbs2S63r17/4IMP+H9cjzzyiHIyV9rR0M6FSpzh3lO+hKBVq1axEydOyM0B5Y8eIKpGNWuyE9u28XV6Q27P+LupQ1Aga8p7HyAIgWnkEEQncKZ9FB3NSvLmzavss0RPkDoode7cWflZmQhB4rYEhKDAoVNXfNGrsiYYmFXq0EMhqEr1KhnLTfzy9gNb+LY+Q3r7tTeIioLgtXRtx0Ow8zgEEfHfizqU3HPPPXy5fPly1q9fP76uF4I++ugjZV38vPxGF2huILpOfHw8PycZhaI1a9Yo22mmThpASCGoRIkSLv9tUQiSA1pWfAlBdK4wK/FXABIl3qw/tWmjXKbl2ZgYtob+ZhlFbd3btVMuy7dhVk1+53124fhx+SkC8JkcgvwBISgwVu5c6bcjwGKSd7oEG1pXfx3WqXtHVqJkCZefoessjJyvuS0zaufh7bYcLO02LeiFIOrJISJkUIDo0KEDi4iIYEWKFFHa9UIQzQEkZBeC1D1B8hFj4mfuvvtul54gwZ89QVYaD5SakOD3ELRw/HgWOXOmclndEyQCkrp+vhWW/FXoDQIzIAQ5B33or9odoQkEZtb0RdPYG8XfYAUKFmBVa3+j2U7l714gUfS1mN1mmfYqBAnqrl0ivr+mUHLx4kUeRD799FPl+gJdn+b0SU1N5Zc9CUFZ9eqIEKTm1BBEH/gHFyzQBAEzi3rjKpQurWmnkgNQoELQVR/+vgB6sgtBb731lrJO+1HaF9LJK/V88cUXcpPuPg8hKDD81QukrudfeF5Zjz60Qwk88v5UXfJtmFl26w3SvttuySoEeWrKlClKWZWdQpAcAswuCkHymzE+MpJvk9tFybdhZs35/AsW3qqN/FQB+MRdCBLhRR2C5s6dy5fu/uETIUh9mwhB1pCUksR+nvGTJgSYXQULvRywgONJIQTZDEKQfWtVu/ZsUvF35KcKwCeehKDChQvz9TZtMkO4uEzWrVvHKyEhwW0Iom1qCEH+t2H3RrZp/3pNCHB6IQQZiM7/RXr27CltyTxSzB8Qguxb1BO0sLbrIcoAvtILQWPHjuVLCjDqniCaxmPWrFn8YA4Z3Y4IQTSM4NSpU6x///7oCbKIPYf3sJ+m/6gJAU4vx4YgmtxLTA9Ph6i//fbbfJ3esDQRGJ0r7LvvvuNtdLg8df/SdcT16HtxccJToXv37vxMzI8//ji/3KJFC16E5gk6fvw4mzBhAi+zIATZt+g5Obx+vfxUAfhELwSpqUMQHeGaFYwJsrbibd7WhACnl2ND0HPPPaesv/rqq8qOQD2A+ZVXXuHrXbp04SGIriOuN3HixMwfvoWONKOBzbT96aefVtrFofQiBKnp7Rx8ZZcQtLheAzblnfc1QcDJhaPDwAzZhSAzIAQFRiAGRqtr9/FdmrZAVq/ZvdjstbPlpymouU0VcggiVatW5UsKQQIFk9y5c/N16voVOwi9gYBiWnlC2ykEUW3YsIG3bdmyhSUnJ/N1vRBkBl9CUL169eSmgDKzN4iOuvv6yy/Zhbg4Nuv33zXbPampv/2maTOrYkaOZn3ffZ8HVao6derwmcjdzdQLYGUIQYFBIejDjh9pwoBZRaHn66pfs3LlyvHLIQ1DNNcJZNmtF4h4FILo+2o6U3yxYsX4ZTpXzuDBg/m66J3Jnz8/X4ozyVPIoetQDR8+nAcd9VnmxVET5Nlnn1XWhaxOm2EkX0KQ1Y56S03cz8a/XkwTCHytts2auVyuUL48O7p5M19v37w5S46KYud27WJly5Zlx7ZuZSG1arFhvXvz7dR2PKMtZds2NmbAAN5G6xSq6DaqVK6s+X2+1om1a7PsBaKwToGoYcOGSkiiuaZGjhwpXxVAlxjP6C/nz5+Xm8BP6IN/d4p/emTknh8KQd+1bsZ2Jm1ja/9exZq2aMo2x2fOHv3JJ5+wjt2+19yGWUXPQ5ux7eSnJ+h5FIIC4ffff5ebTOFLCDp27Bjbvn273BxQ9OF/PiOQyMHAl/quUSOXy3JPEAWaEX378iVdTouJYWUz1s9kvIZ2R0Qo16OeoLCMME3XEyFI/l1GFD0HJ3fdPpO3N+hUKCIYUdG4NQA91GtN+0lvaufOnZq27AoCi77d8NfXYhSCmjZvwtbsXMUvi54g2l/26N+d1alXR7mu2I/Kt2FGRcRlzpxtR5YNQf7iSwgi6pmwrYJCwLzKVTThwJeqXKkSDz+Ja9a4hCARgNQh6NOKFVnt6tV5CKK2gxs28PZa1arxZUx4OA9EZoQgeuzXdSbR9BX9J/5bxn0W4ah169byVQCyZaVxhOC5tAtpfglCck9Q1erfsPLly7O10at4CKqXEYpW74xksUeieXt4VJjmNoyuEt9/aNsARBCCfAxBVt2pTS9TztQxQlarqF69+eO9qTMWzUw0n0uvXr2UcEQ9SQDuWHV/AZ6hMDAn6i9NULBr0ePtNaO3/DTYisch6OWXX2ZvvPGGsk4l0FFh4lB4sY2K5rxQX7dWrVqsZMmSfIyRaKezsFO73glWSfHixfkyJibGpWQizDz22GO8CA20zo6vIcjKX5dM/eBDRwQhGgeV1Rggfzp9+jQfA0cfdtRLKL+PwNkQgoIfBYP3v3c9kakdix5ns5GZ097YmcchSE2ElJdeeolP6y0sWrSIL8U8GXRyVUF9ZJggBhd269bNpV0vBNH3sjR4leYRooGtpFmzZqxAgQJ8XS/M+CMEBQMKCFQXYmM1ASKYa1W7DvxxXcsI1VZGr13RW9SyZUvdc955ig442Lt3Lx/YbWadOXNG/tVgAIQge0g4ksBDQoWfK2rCQzBX9JEd/HHZ+esvmcchiObyUc8JJNbvv/9+5TpNmzblS3UIGjVqFIvN+PDVm+NHhCDasau30zr9Pio6Wzyh2xDatm3Ll3FxcXxJA5T1woy/QpAc4qzo+PYdPDBMfOMtTZgItjqxJvPoL6v0/nhr+fLl/MOwevXqfN2q0tPT5SbwEUKQvbzT7l0eGEYvH6UJFMFWlXt/mflYluqf7NeutMnkFjkEqYnAcvbsWXbp0iW+rt5h6vUE0X+W8uypFIIuX77M5245dOiQ0k5HUKjLHfrqYfz48XxdhBn6L1nMUeSvEBRsOzYRIKJ6Zh7GHgxFh72PL1yU3++V7W6/ruzg3Llz7Pvvv+evIzFnlh5/985ktQ+AnAm2fQVoDRs2TBkDKKpM3bJKD8rWpChNwLBqtRzbkt/nIi2LsavpzpxDLUchSEbnxfG0i19vfg1q02v3hl6Y8VcISklJYX/99ZfcbHkTir7JQ8X4Im+wsxl/bzl4WKGWhtS/Hdp+HSQ/BNuhYE89nbRjnTx5smZbVrLbrkf8E6MnOjpabgIfIQTZgxyCxN81fEe4Eoaa/95cEzqsUJFxK9n7HT7IHNvUoQS7lp45vMSpDAlBwcyIEETEbNpWR7137dq1c3nz0uHfi0MaKGGDas+UqYbPN5RdHQkN4yc9Fffhz48/cfyHBoUUGkdEz8Pq1avlzYpvv/2WL2vUqMGXFKA6duzI18XJO8VJPtu3b8+Xel9RqyEEGc/pr2e7oHF+6n2oevJfgcJFkRbFlFD0drt32eo9EZpQYnb1m/uLch+ovhuVeX5OyOR2L4gQ5B0jerPMRl9Hyv+96O2UE5eFKl89iZry7gdsz8RJ7OS6dZrw4m1RuEqaN58trRvi8juoltRvpDk3k959dCI6y7ielStXyk38gIF7772X1a5dm0/BT6iHiXosRQj6/PPP2fTp09U/5gIhyHh4LQc/OpqZThYu9p90OTsUiJpnhA91GKFqNroZW7JjoSa45KS2Jm1mY1eM4V9tqX/Hm63fYmNDx8l3CW7xOATRDnT06MwBU/369eNLMWFchQoVlPlRmjdvrozToXWqBQsW8Ms9e/bkXx2JdirSqFEjl/OE0VgiOsEqUZ9qQ6CjwvTQ1wHvvPMOr3UZH9aeMCoEkWDZwWUVgLJyMiO8hLdqw6Z+8JEmvHhaE98ozv76ogqLmzFTvvks0ZGH3t5fu8nq6y4xbcS2bdv48pFHHuGhl3p7KAwROnDh8OHDbNKkSeLHOHc9QghBxnP6aziY0d9OfWqdadOmGfL3HLd8PPu8xxesaMs3NCHJ0/qoUylW+9c6LCklSb55yIb+3o9pQ5CaOIfYPffcI21hLCwsjC8pHat3ruIoL+GZZ57hS/XgaRkdOSNCUFRUlHIbIgTRvEV0ZJigDlKBCEHEiDeFWWh+Jrp/M2fOzFEIsgK6zxEREXKzI2QVgmjaCHq/iekjxHi4f/75h82aNYuvi6M3H330Ub4cMWIE/xm5501ACDJeML7nnEx87UUH8IA9eRyCaIyBCDVyCKpWrZoyD9Brr73mcig9/UdK1GeeJyIEEZpcrk2bNsplGn3/0EMP8XUKQeojz2gOEwpBoaGh/DLNHSRYIQTRucTcfagEEj0fYmoBQmOYgvWEoRTiaCJOp8kqBJkBIch4CEHBo0GDBi6fS2BPHocgtTvvvJMvxddcRCRl0RNE5Ll/iPhPVYQg8RVbxYoVM6/IMq+bJ08efpZ20RM0Z84cZbvoCaIZp8WgT0KDSOm/XuryD1QIIlbb0Vnt/hjFro/LHYSg4Oe012wwovm75OlcwL48DkEUeNQDM9XjCiZMmKCEIPXgYAolVOLw+V27dilz+Ki7F2lkvbveE3UIorENVO7GBKkFMgQRK+zs6M3cuHFjudlW6HmmeXacACEo+FlhvwD6OnfuzOrVqyc3g825DUF65+eyIxonY5ZA7fDonFV09IJTUO9ioJ5rf3IXgsqWLetymXpq6Z8N+seCduykcOHCLHfu3HwpZnl/7rnn+FfPVBMnTlTfBIcQZDwnvE6DTUhICFu2bJncDA7hNgSZGQ6cxJ87PZrvx5+/z2rosS9evFhutg13IYjOp1eqVCnlsvpraHGCX5qV/dlnn+Xr6hAkIAT5h5Pfn1ZDp3Siv4e7byHAGdyGIOHgwYMsKSnJdpWcnCw/VNPQIG4zzy9GA57r168vNzsW7djoQ99u9EJQWloa69u3L18XM0zT18vqIgsXLuRLOpErQlDgIAQFHg2nwN8BhGxDEBjjxIkT/I1n1ISK9CFPwadhw4b4T0YHPTd0JKGd6IUgQhMiymicHp1HT6Dr5M+fn6+rQxAdhfnVV18hBPkJPnwDhw7aoedfjEsFIAhBAUBzI9GgZTqc3ht0tBy9ibt06SJvAh1ijg+77PTchSA9cghSEyFIzV0Iov+axaSo4DuEIP/78ccfg+a0RuB/CEEBlJiYyHeKVDTfEb1ZaQI7OvJu6NChSrctFf0XY5cPc3+j59YOwdGbEGQEdU8QDbQXM7xDziEE+ZddvxoH4yAEgWPYqVfIH+gUN7LNmzfz59FdLxNkDSHIfDSOlZ5ns6Y/AXtBCAJHEacOCWY0sH/fvn2mFfVQqmdpd4eOPKOvdT25LmQK9teezKr/VFj1foH1IASBI9GH0ZgxY+RmyIGuXbvaflJOo9gtBNG0HFak14sJoAchCByNPpR27NghN0MO0NgLej737Nkjb4Jb7BaCrHpkKsYBgacQgsDxaLZYTJdvHDo9jt0+7I1it+dFHYIeffRR1RbGT3Eknz9Svkwefvhhdvfdd/MlDcanJRWhk3TT9fS+3qKja2l6BzH2p0SJEso2hCDwFEIQwC0DBw7k8y6BcehD3ynndvOEU0KQOuzUqFHD5TJ56qmnXC5Xq1aNL+W5qXr06MGXuXLlcmknIgR98skn/DJCEOQEQhCAiphbiM5HBsagGdPpOcUAameGoCJFiignwhbuuusuvhQ/rw5BmzZt4kVECCpdujRfqokQROiAB4QgyAmEIAAdV65cwQRrBqMQRCFA/m/fSZwSgn766Sdlna7TqVMn5bJoI3RSX5JdT9Azzzzj0k7UIahOnToIQZAjCEEAWaCu/JkzZ8rN4AMaOE1hwKqDas1k5xAkW7FihctcPRSCL1++rLqGeRCCwFMIQQAeaNq0KevXr5/cDD6gD0QKBfHx8fIm23JSCAokhCDwFEIQgBfoLOx9+vSRm8FHFA7Gjx8vN9sOQpB/IASBpxCCALyUlpaGgb4mOHbsGB+HZdUPViM4NQS98sorrECBAnw9T548Srs4/Yp6IHVqaipf0oBq2R9//CE36UIIAk8hBAH4gD7Utm7dKjeDD8QA6piYGHlT0HNqCFLLLgQJIgQVLFhQaUMIAqNpX3kA4JXIyEh+pnowFn3gNWnSRG4Oak4NQRERESw8PJyvq0NQpUqV+FKEoOLFi/PlwoULeRsd8SWHoA4dOiiX3UEIAk8hBAEY5PTp0/xD7syZM/Im8MGcOXOUQ6iDnVNDkJoIQSL4lClTRlmnGaIHDBjALl26pPQEPfLII+zjjz/m10FPEBgNIQjAYLSjbt68udwMPqIAISbRC1YIQa49QUJWX4epIQSB0bSvPAAwBPUI0YfeqVOn5E3gA3pON27cKDcHBYQg/0AIAk8hBAGYbMKECRgzZDCawDIYz/NmtxCkd2JTK/jnn3/kJgBdCEEAfkJjW+hDEOclMw7NLVSvXj252bLsFoL8NQO0t9ATBJ5CCAIIAPownDFjhtwMOTRy5Eh+/iirs1sICuavJgEIQhCAn+zbt48lJCS41JIlS1hsbKymPdjq4MGD8sP1u+vXr/MPZVpalV1C0OjRo23zWMDZEIIAwFZoxmGaedqKgj04hISE2Ga6AgCCEARgsnPnzslNtnX27Fm5KWAocFhtgGywhiCaEDRY7ztAVhCCAExmVDAoVqyYsn7x4kV26NAhvj59+nS+fOedd3iRK1eusDfffFO5PqG5WER1796dt6l/5vz58+qr54jVJoqkQehW+oos2IJE69atg+4+A3gDIQjAZEaEoBdffJEv6eStYvnwww/z9Vy5cinXEx599FG5ifvqq6/cHtFjxxAk0KBpKxxFFiyBIj4+HkcygiMgBAGYzIgQRChgUIghFII+//xzvh4aGsqXopeHHD9+nN13332ZP6gjMTFRbmIHDhzwefI7q4YggT7Yad6mQLF6CKLXgNXvI4CREIIATGZUCCK5c+fmS9EjdOTIEfVmjSlTpvBlXFwcr8cee0xZJ3RSy06dOrHatWvbuidIbdu2baxp06Zys19YOWDQfROBGsApEIIATGZECKK5WKiXp3///vyyCEHqcy6pe4IaN26sez6mJ598Um5SOCUECfSh7++5mqwWgi5cuMDv07Fjx+RNAI6g3UsCgKGMCEHBIphCkEAh4MSJE8rlH374gY0aNUp1DeNYJQStXLmS1ahRQ24GcByEIACTIQRZ308//cQiIiL4OgUVs8KKWbfrKRoUT/chJiZG3gTgSAhBACbzNARlN74nO/TfvUyvTQ99LZKV5ORkuUlXsIYgQQQgb8fH3Lh+g8VtO8xG9VjKar03MEfV5qtxLCoinh0/nCrfvM+io6MDHsAArAghCMBknoYgOjJHjOP517/+5bJt8+bNLpfVFixYwJfyGKCSJUtq2twpXbq0y2VxSL7gabjx9HpWtH79epcQ5C403Lxxk00auFITYqg6VJvIJg2IZDvXJLFjiWc9qu2rktj0YWtZz6YzWd0PB2tus3fzWSxpb4p8NzwiTiVCA+ABQMuzPSQA5JinIYi4C0F0glBRdOZ0tebNm/Ml/ezhw4c1g6WFmjVrsrx58/ISypcvz5dRUVGsT58+fP3GjRusX79+fOmtYA5BcgASFbf9sEso+e6z0ZogY3aN+jnU5T60+OL3jL+P++kMaIwT3XfM8wOQNYQgAJN5E4L09OjRg+XJk8elBJo5mnp8iAg87du3Z507d2a7du3KtidIvt127dqxwYMH822nTp1yuS7NQp2dYA5BamdOp7qEjtXzYzXBJFCVtOska11lnHLfdm7Y73LfacAzhWUAyF7We0gA8Jm3IWj48OFyk9vzj4neGpr3Rx14jh49ypfuZo7Wo/75nB46HswhiOaJFMEi5KMhmvBh1Vr6xzblfqccv32UGwBkDyEIwGSehiBxfisx34/8tZao+++/X2lXc3d9T6mv+8QTT7D33ntPmZzR069VgjUEfV9zIg8RrSqP1YSMYKn9u04qYSirr8oA4DbP95AAkCPuenFk6enpcpNleHrfUlONP7LJTPVKDuGh4dDu05pQEcwlwhAAZA0hCAAcZ8bINTwkJOxI0QQIOxXCEEDWEIIA/IDG7tAEdXYu+jqPTk5KRyVVr16dH3JuRUv+3MKDgRwYzKzwxes0bf6qMT3CEIQA3EAIAgBTzZs3TzncvGvXrvyItkChMNC47HBNUDCj8uXL53Z9/MipStHlo4lpmp83sg7GnUIQAtCBEAQAfrVz505Wp04dpcdo5syZ8lVMMar7UtaozG+agGBWycFHvf7yywWV8kcIojqSkIYgBCBBCAIAS6AZs2lOJNFrRJNA0mk/vJ20kX5W/ipu+I+L/f4VmBx8qJLiUljF8p/rlvzzZhTNTl3ng0Euzw2AkyEEAYBlpaWlsdWrV/MJAEU4atu2LR97RCcD1aOe7VmgAHQkPlUTCsyq/PmfYy8XKMga1G3CL1MA2rUlkR1JSGWrwzbzojaxTiXfhllFz8XeaN/OUwdgFwhBABDUaGbrpUuX8vFG6gAkqlqF5mzGcP8NTBa9PmJ9ytiZLr1CbVt+71K0jcKRfDtmVXJ85mzYAIAQBAA2kpCQoAlB/v4abMHMUE2b3ldj6vJnCKJCCALIhBAEALaxfft2Hnxmz56ttPk7BOlVdiGobw//3scBbeaym5hVGgAhCADszQohyGq1fukedv26dwPOAewIIQgAbA0hSFv9Ws/F+cUAGEIQANgcQpC2MCYIIBNCEADY2uTBESxy7i5NEPBHHUk4o2kLdB3dhxAEICAEAYDt+bM3KGn3CXYwo2h95RLPD83/a9pCTZsZRc/Fsunb5KcIwJEQggDA9rqGTPFLEPr008+U9Tat2vMQlLjrKCtXrhxv27J2FytTpgyfOJEu07o4PN4fIehAzEn0AgGoIAQBgCN0qj2Ztao8VhMMjKwfu3ZX1gf0HaL0BG1eE8OXFIK6d+vFNkbuYPE7D7v8rD9CEAIQgCuEIABwDAoBTcqN0IQDI6tf70Gsd/d+fJ1C0KE9J3mPD12mEFS+fHl2MKONLlN7dFQCX//6q280t2Vk0WO/djVdfkoAHA0hCAAcZXCnBX75akwuCj6JMUc17WZX2PSd/PGmX7suPxUAjocQBACOc+niVR4MutWfpgkNtqlbR4F1qD5RfvgAcAtCEAA40s2bmV+PUR3ea71D2X2pll+M4Y8r7dRF+WEDgApCEAA4XuNPhvPQMG3Iak2gCJY6kpCmhLorl6/JDxEAdCAEAQBkuHo5ndV+PzNEDP9hiSZkWLX2bD2qhJ/oqCT5YQFAFhCCAAAkN2/ezAhEg5RwkbAjRRM+AlXU4zOud7hy38b9EibffQDwEEIQAEAWpgyOVAIH1fg+KzTBxOxav2QPq/PBYOU+tKw8ho9pAgDfIAQBAGTj8uXLbNq0acrl1lXGugQjKuo5GvXzMrZr42GWFHtKE2TcFc3iHLPhMFs4aQur/cHt3idRTSuMYKsWxvDfu379evbNN9+whg0bKvcFAHIOIQgAIBsUPLJy7ep1NqjjfPZ9jYmaEONp1Ss5hPVsNpNFLoyWb16xYsUKfl+oWrduLW8GAC8hBAEAZGPcuHFyU0DMmzdPCUGiACDnEIIAALJAg6StYurUqQhBAAZCCAIAyIKVgsawYcMQfgAMhBAEAJCFWrVqyU0Bc/Hi7RmgT58+rdoCADmBEAQAkIXk5GS5yRLq1asnNwGAlxCCAADcOH78uNxkGfhKDMB3CEEAAG5YubelZs2achMAeAkhCADADSv3tqSlpbHY2Fi5GQC8gBAEAOCGlUPQjRs3WK9eveRmAPACQhAAgBtWDkGkSZMmchMAeAEhCADADauHoLp168pNAOAFhCAAADesHoJq1KghNwGAFxCCAADcsHoIaty4sdwEAF5ACAIAcMPqIahLly5yEwB4ASEIAMANK4egEydOsHPnzsnNAOAFhCAAADdCQkLkJsuoU6eO3AQAXkIIAgAIQlbupQIIFghBAABZGD58uNxkCaNGjZKbAMBLCEEAAFmoXr263BRwU6dOlZsAIAcQggAAskCnp7h586bcHFD4KgzAGAhBAADZsFLosNJ9AQh2CEEAAB6wQvj4+++/WXp6utwMADmEEAQA4AH6WmzZsmVys99cvXrVEkEMwE4QggAAPLRv3z5Ws2ZNudl0165dY506dZKbAcBHCEEAAF44cOAA69Wrl9xsGvp96AECMAdCEABADlAwoa+ozESH5+PUGADmQQgCAMihZs2asQYNGsjNPjt06BAPWTQOCQDMgxAEAOCjwYMH89CSkpIib/JKtWrVeAGAfyAEAQAYZPv27TwMUdFYnuxQaBo5ciS/focOHeTNAGAyhCAAABPRuKHNmzez/v37s1atWrF58+ax1NRU+WoAEAAIQQAAAOBICEEAAJLLly/z2ZmDpQAgZxCCAABUYmNj5SbLi4+Pl5sAwAMIQQAAKuhZAXAOhCAAABW9EJQvXz5299138/U77tDuNsU2GvBcuHBh5Tq0zJ07N2vSpAm/nDdvXlaoUCHl5zp27MgnRKTauHEjGzRoEG+ny+JQ+QIFCvBljx49eBG9+wAA3sM7CQBARQ5BcuCQL9+8eZMNHz6cr8tHfYnrjho1ii/z58+v2qolQhDp3LkzX4oQpCbfBwDIGbyTAABU3IUgEUbkAHLXXXcp6xSCKlasyPr06cMvy9clxYoVc7lMvUMff/wxX1eHoNmzZ/MlQhCAefBOAgBQkUPQgw8+6HI5V65cfBkVFcWXIsB89913Sk/QPffcw5cirLz99tt8KcTExPBl8eLFeU8SVenSpZUQpA456vD13HPP8dmpEYIAjIF3EgCAihyCyN69e9mlS5eUyzR+J6e2bNkiNynUPUECeoIAzIN3EgCAil4IAgB7QggCAFCJi4uTmyxvz549chMAeAAhCABAcv78ec2szFatYJzcEcAqEIIAAADAkRCCAAAAwJEQggAAAMCREIIAAADAkRCCAAAAwJEQggAAAMCREIIAAADAkRCCAAAAwJEQggAAAMCREIIAAADAkRCCAAAAwJH+H6d6Ts9WzseJAAAAAElFTkSuQmCC>