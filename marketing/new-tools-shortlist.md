# 신규 20개 툴 후보 — 30 → 50 (대기업/메이저 브랜드 중심)

선정 기준: **검색량 + 브랜드 인지도 우선.** 카테고리 갭(Coding 16 /
Productivity 1 / Management 1)도 동시에 메움. 모두 2026년 중반 실존 + 메이저.

**검토 방법:** 각 행 `keep?`에 ✅/❌/🤔. 실사용 의견 있으면 ⭐.

목표 최종 분포 (50): Coding 18 · Productivity 8 · Design 8 · Assistance 7 · Management 6 · Other 3

---

## Productivity (+7) — 가장 시급 + 대기업

| keep? | slug | 이름 | 모회사 | 사이트 | 추가 이유 |
|---|---|---|---|---|---|
| | `microsoft-365-copilot` | Microsoft 365 Copilot | Microsoft | microsoft.com/microsoft-365/copilot | Office 전체 AI. 거대 검색량 |
| | `grammarly` | Grammarly | Grammarly | grammarly.com | AI 글쓰기 표준. 초거대 검색량 |
| | `gamma` | Gamma | Gamma | gamma.app | AI 프레젠테이션 카테고리 대표 |
| | `otter-ai` | Otter.ai | Otter | otter.ai | AI 회의록 표준 |
| | `zoom-ai-companion` | Zoom AI Companion | Zoom | zoom.com/ai-companion | Zoom 내장 AI. 거대 사용자 기반 |
| | `slack-ai` | Slack AI | Salesforce | slack.com/features/ai | 팀 협업 AI. 검색량 큼 |
| | `coda` | Coda | Coda | coda.io | AI 내장 문서/DB 올인원 |

대안: Notion(이미 있음), Google Workspace AI, Dropbox Dash, Box AI, Mem

---

## Management (+5) — 대기업 PM

| keep? | slug | 이름 | 모회사 | 사이트 | 추가 이유 |
|---|---|---|---|---|---|
| | `jira` | Jira | Atlassian | atlassian.com/software/jira | Atlassian Intelligence. 초거대 검색량 |
| | `asana` | Asana | Asana | asana.com | 엔터프라이즈 PM + AI |
| | `monday` | Monday.com | monday.com | monday.com | Work OS + AI. 광고 노출 많아 인지도 큼 |
| | `clickup` | ClickUp | ClickUp | clickup.com | AI 올인원. Linear 대안 검색 흡수 |
| | `airtable` | Airtable | Airtable | airtable.com | AI 내장 DB/앱빌더. 거대 검색량 |

대안: Smartsheet, Trello(Atlassian), Microsoft Planner, Wrike, Basecamp

---

## Design (+3) — 대기업 디자인

| keep? | slug | 이름 | 모회사 | 사이트 | 추가 이유 |
|---|---|---|---|---|---|
| | `figma-ai` | Figma | Figma | figma.com | 디자인 표준 + Figma AI/Make. 빠지면 갭 |
| | `canva` | Canva | Canva | canva.com | Magic Studio. 비-디자이너 초거대 검색량 |
| | `adobe-firefly` | Adobe Firefly | Adobe | adobe.com/products/firefly | Adobe 생성형 AI. 브랜드 파워 |

대안: Adobe Express, Microsoft Designer, Ideogram, Leonardo.ai

---

## Assistance (+2) — 빅테크 LLM 보강

| keep? | slug | 이름 | 모회사 | 사이트 | 추가 이유 |
|---|---|---|---|---|---|
| ❌ | `gemini` | Gemini | Google | gemini.google.com | 제외 — gemini-code-assist 이미 있음 |
| ✅ | `microsoft-copilot` | Microsoft Copilot | Microsoft | copilot.microsoft.com | 소비자용 AI 어시스턴트. 거대 |
| ✅ | `grok` | Grok | xAI | grok.com | xAI. "vs ChatGPT" 비교 트래픽 |

대안: Meta AI, DeepSeek, Mistral Le Chat, Poe

---

## Coding (+1) — 대기업만 최소 추가

| keep? | slug | 이름 | 모회사 | 사이트 | 추가 이유 |
|---|---|---|---|---|---|
| 🤔 | `claude-code` | Claude Code | Anthropic | claude.com/claude-code | 보류 — claude(챗봇)와 별개 제품. 나중에 코딩 보강 시 |
| ✅ | `amazon-q-developer` | Amazon Q Developer | AWS | aws.amazon.com/q/developer | AWS 코딩 AI. 엔터프라이즈 검색량 |

대안: JetBrains AI, Google Gemini Code Assist(이미 있음), Sourcegraph Cody(이미 있음)

---

## 합계 점검 (확정: 18개 추가 = 48개)

| 카테고리 | 현재 | +추가 | 최종 |
|---|---|---|---|
| Coding | 16 | +1 | 17 |
| Productivity | 1 | +7 | 8 |
| Design | 5 | +3 | 8 |
| Assistance | 4 | +2 | 6 |
| Management | 1 | +5 | 6 |
| Other | 3 | +0 | 3 |
| **합계** | **30** | **+18** | **48** |

> Gemini 제외(중복), Claude Code 보류(claude와 별개지만 다음 라운드).
> 50까지 남은 2개는 차근차근 — 코딩 보강 라운드에서 Claude Code +
> 1개 더 추가 예정.

---

## ⚠️ 대기업 중심의 트레이드오프 (알고 가자)

| 장점 | 단점 |
|---|---|
| 검색량 큼 — "jira ai", "canva ai", "grammarly vs X" 등 롱테일 풍부 | 비교/리뷰 콘텐츠 경쟁이 치열 (대기업 공식 페이지 + 거대 미디어와 SERP 경쟁) |
| 브랜드 인지도 → 사용자가 "아는 이름" 보면 신뢰 | "큐레이션된 인디 디렉토리" 톤이 옅어짐 — 어디서나 보는 리스트가 될 risk |
| "X vs Y" 비교 페이지에서 대기업 조합이 검색량 견인 | 대기업은 outreach 답 안 옴 (백링크 농사 효과 ↓) |

**상쇄책:** 대기업 툴이라도 **콘텐츠 깊이로 차별화** — 공식 페이지가 안 하는
"솔직한 cons", "누구한테 안 맞나", "실제 가격 함정", "더 싼 대안 링크"를
넣으면 SERP에서 차별점 생김. 단계 3(콘텐츠)에서 이 각도로 작성.

---

## 검토 후 다음 단계

1. `keep?` 표시 → 빠지는 자리 대안에서 교체
2. 최종 20개 확정 → DB 입력 데이터 작성 → 단계 1(인프라) → 단계 3(콘텐츠)
