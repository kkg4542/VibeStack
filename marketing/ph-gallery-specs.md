# Product Hunt Gallery Images — Design Specs

8장 갤러리 이미지의 상세 디자인 스펙. Canva/Figma에서 그대로 작업 가능하도록 카피/레이아웃/컬러까지 명시.

---

## 공통 규격

| 항목 | 값 |
|---|---|
| 해상도 | **1270 × 760 px** (PH 표준) |
| 권장 작업 해상도 | 2540 × 1520 px (2x 레티나, 다운스케일) |
| 형식 | PNG (스크린샷 포함) 또는 JPG (텍스트 단독) |
| 파일 크기 | <2MB 각 |
| 안전 영역 | 가장자리 60px 패딩 (PH 카드에서 잘릴 수 있음) |

## 브랜드 컬러 (CSS hex)

```
Primary       #6366F1  (Indigo 500)    — CTA, 강조
Primary Dark  #4F46E5  (Indigo 600)    — hover, accent line
Secondary     #8B5CF6  (Purple 500)    — 그라데이션 페어
Background    #0F172A  (Slate 900)     — 다크 배경 메인
Surface       #1E293B  (Slate 800)     — 카드 배경
Text Primary  #F8FAFC  (Slate 50)      — 메인 텍스트
Text Muted    #94A3B8  (Slate 400)     — 보조 텍스트
Accent Green  #10B981  (Emerald 500)   — "Curated" 뱃지
Accent Pink   #EC4899  (Pink 500)      — "New" 뱃지 (선택)
```

## 권장 폰트

- 헤딩: **Inter Bold** 또는 **Inter Black** (사이트랑 동일)
- 본문: **Inter Regular / Medium**
- 코드/모노: **JetBrains Mono** (소스 인용 시)

---

## 이미지 1 — Hero (메인 카드)

**역할:** PH 피드에서 가장 먼저 보이는 카드. 클릭 유발이 유일한 목적. 텍스트 적게, 큰 한 줄, 시각적 임팩트.

**레이아웃:**
```
┌────────────────────────────────────────────┐
│                                            │
│  [로고]                                    │
│                                            │
│   The curated AI toolkit                   │  ← 큰 헤드라인
│   builders actually use.                   │     (white, 80px)
│                                            │
│   30+ hand-picked tools • 6 ready-made     │  ← 서브헤드
│   stacks • Honest comparisons              │     (muted, 28px)
│                                            │
│                                            │
│    [usevibestack.com]                      │  ← 작게, 인디고
│                                            │
│              [툴 아이콘 그리드 우측 페이드]    │  ← 우측에 깔린 배경
└────────────────────────────────────────────┘
```

**카피 (정확):**
- 헤드라인: `Find your AI stack in 60 seconds.`
- 서브: `5 questions · 30+ vetted tools · 6 ready-made stacks · Free`
- 푸터: `usevibestack.com`

> **참고:** 위 카피는 사이트 hero("FIND YOUR AI STACK IN 60 Seconds")와
> 동일. PH 클릭 → 사이트 도착 시 같은 메시지 보이도록 정렬. 디자인은
> 사이트 hero의 그라데이션 텍스트(블루→핑크) 그대로 가져가도 좋음 —
> "60 seconds" 부분에 인디고→핑크 그라데이션.

**시각 요소:**
- 배경: `#0F172A` → `#1E1B4B` 대각선 그라데이션 (top-left → bottom-right)
- 우측 30% 영역에 **툴 아이콘 그리드** (Cursor, Claude, v0, Linear, Notion, Framer 로고) — 30% 투명도로 깔기
- 좌측에 부드러운 그라데이션 블러로 텍스트 가독성 확보
- 헤드라인 단어 "actually" 또는 "curated"만 `#6366F1` 인디고로 강조

**디자이너 노트:** 이게 가장 중요한 한 장. PH 피드에서 썸네일로 보이는 카드. 텍스트 안 보이는 만큼 적게. 만약 헤드라인이 길어 보이면 "AI toolkit builders use."로 줄여도 됨.

---

## 이미지 2 — Ranking Page (베스트 페이지 시각화)

**역할:** "어떤 정보를 얻을 수 있는가" 첫 증거. 가장 검색량 높은 사용 케이스(`/best/coding`)를 보여줌.

**레이아웃:**
```
┌────────────────────────────────────────────┐
│                                            │
│  ◤ Real-world tested rankings             │  ← 좌측 상단 태글라인
│                                            │     (Primary, 24px)
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │                                      │ │
│  │   [usevibestack.com/best/coding      │ │  ← 실제 페이지 스크린샷
│  │    페이지 스크린샷 — Top 10 리스트]    │ │     (1100×600 정도)
│  │                                      │ │
│  │   #1 Cursor    ★★★★★               │ │
│  │   #2 Claude    ★★★★★               │ │
│  │   #3 Copilot   ★★★★☆               │ │
│  │   ...                                │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  No SEO spam · No paid placements         │  ← 푸터 강조 메시지
└────────────────────────────────────────────┘
```

**카피:**
- 좌상단: `Real-world tested rankings`
- 푸터: `No SEO spam · No paid placements`

**캡처 방법:**
1. https://usevibestack.com/best/coding 접속
2. Dark mode 확인 (이미 default dark)
3. 브라우저 1440×900, 스크롤바 숨김 (Chrome DevTools → device mode)
4. 스크린샷: Cmd+Shift+4 → 영역 선택 (브라우저 chrome 제외)
5. 모서리 16px 라운드, `#1E293B` 1px 보더

**시각 요소:**
- 배경: `#0F172A` 단색
- 스크린샷에 부드러운 drop shadow (`rgba(99, 102, 241, 0.15)`, blur 40px, y 20px) — 인디고 글로우
- 좌상단 태글라인 옆에 작은 ✓ 아이콘 (`#10B981`)

---

## 이미지 3 — Head-to-Head Compare (차별화 핵심)

**역할:** "이게 왜 다른가" 가장 강력한 차별점. 비교 페이지가 VibeStack의 SEO + UX 무기.

**레이아웃:**
```
┌────────────────────────────────────────────┐
│                                            │
│  Compare any two. Pick with confidence.   │  ← 헤드라인 (white, 48px)
│                                            │
│  ┌─────────────────┐  vs  ┌──────────────┐│
│  │ [Cursor 로고]    │      │[Windsurf 로고]││  ← 좌우 분할 비교 UI
│  │                 │      │              ││
│  │ Cursor          │      │ Windsurf     ││
│  │ $20/mo          │      │ $15/mo       ││
│  │ ✓ Composer      │      │ ✓ Cascade    ││
│  │ ✓ Tab autocompl │      │ ✓ Supercompl ││
│  │ ✗ Free tier     │      │ ✓ Free tier  ││
│  │                 │      │              ││
│  └─────────────────┘      └──────────────┘│
│                                            │
│  130+ comparisons · Updated weekly         │
└────────────────────────────────────────────┘
```

**카피:**
- 헤드라인: `Compare any two. Pick with confidence.`
- 푸터: `130+ comparisons · Updated weekly` (정확한 숫자로 교체)

**시각 요소:**
- 카드 배경: `#1E293B`
- 카드 보더: `#334155` 1px
- "vs" 텍스트: 중앙 크게, `#8B5CF6` 보라색 그라데이션, 48px Bold
- ✓ 마크: `#10B981`
- ✗ 마크: `#EF4444` (red 500)
- 좌측 Cursor 카드는 살짝 위로 (오프셋 -12px), 우측 Windsurf는 살짝 아래 — 비교 동선 시각화

**대안:** 실제 `/compare/cursor-vs-windsurf` 페이지 스크린샷 + 좌상단 헤드라인 오버레이로 가도 됨. 더 진정성 있어 보임.

---

## 이미지 4 — Stacks (브랜드 차별점)

**역할:** VibeStack의 **이름이자 핵심 컨셉**. 다른 디렉토리에 없는 unique selling point.

**레이아웃:**
```
┌────────────────────────────────────────────┐
│                                            │
│  Not just tools. Stacks.                  │  ← 헤드라인 (white, 56px)
│                                            │     "Stacks" = Primary 강조
│                                            │
│  Curated combos of tools that work        │
│  better together than apart.              │  ← 서브 (muted, 24px)
│                                            │
│  ┌────────────────────────────────────┐   │
│  │  ⚡ 10x Engineer Stack             │   │  ← 스택 카드 1
│  │  [Cursor] [Linear] [Vercel] [Claude]│   │     (툴 로고 가로 4개)
│  │  $145/mo · 1.2k devs               │   │
│  └────────────────────────────────────┘   │
│  ┌────────────────────────────────────┐   │
│  │  🎨 Product Designer Stack         │   │  ← 스택 카드 2
│  │  [Figma] [v0] [Framer] [Midjourney]│   │
│  │  $89/mo · 850 designers            │   │
│  └────────────────────────────────────┘   │
│                                            │
│       6 stacks · Save your own            │
└────────────────────────────────────────────┘
```

**카피:**
- 헤드라인: `Not just tools. Stacks.` ("Stacks"만 `#6366F1`)
- 서브: `Curated combos of tools that work better together than apart.`
- 스택 1: `⚡ 10x Engineer Stack` — `Cursor · Linear · Vercel · Claude` — `$145/mo · 1.2k devs`
- 스택 2: `🎨 Product Designer Stack` — `Figma · v0 · Framer · Midjourney` — `$89/mo · 850 designers`
- 푸터: `6 stacks · Save your own`

**숫자 정확도:** `1.2k devs`, `850 designers`, `$145/mo` — 실제 [/lib/stacks.ts](../lib/stacks.ts)의 `usedBy`, `totalPrice` 값과 일치하는지 확인 후 교체. 거짓 수치는 신뢰 깨짐.

**시각 요소:**
- 스택 카드 배경: `#1E293B` → `#312E81` 좌→우 그라데이션 (보랏빛 깊이감)
- 툴 로고: 32px, 흰 배경 원형 컨테이너 안에
- 이모지는 폰트 이모지 사용 (시스템 emoji 그대로)

---

## 이미지 5 — Tool Detail (콘텐츠 깊이 증명)

**역할:** "툴 페이지가 다른 디렉토리보다 깊다"는 증명. 그냥 링크만 있는 게 아니라 실제 정보가 있다.

**레이아웃:**

실제 `/tool/cursor` 페이지 스크린샷을 풀로. 좌상단에 작은 오버레이만:

```
┌────────────────────────────────────────────┐
│ ◤ Deep, honest, tool pages                │  ← 좌상단만 (Primary, 20px)
│                                            │
│ [전체가 /tool/cursor 페이지 스크린샷]        │
│  - 헤더 (Cursor 로고 + 가격 + CTA)          │
│  - Pros/Cons 섹션                          │
│  - Features 리스트                          │
│  - Pricing 표                              │
│                                            │
│                                            │
└────────────────────────────────────────────┘
```

**카피:**
- 오버레이: `Deep, honest tool pages` (구분선 ◤ + 텍스트)

**캡처 방법:**
1. https://usevibestack.com/tool/cursor 접속
2. 스크롤하면서 가장 정보 밀도 높은 부분 캡처 (Pros/Cons + Features가 한 화면에 나오게)
3. 1270×760에 맞게 크롭
4. 좌상단 텍스트 레이어로 오버레이

**시각 요소:**
- 스크린샷 풀블리드 (full bleed, 가장자리까지)
- 좌상단 오버레이 텍스트 뒤에 `rgba(15, 23, 42, 0.7)` 블러 박스로 가독성 확보

---

## 이미지 6 — Categories Overview (카테고리 다양성)

**역할:** "내 분야에도 있다"를 보여줌. 코딩만 다루는 게 아니라는 폭 시각화.

**레이아웃:**
```
┌────────────────────────────────────────────┐
│                                            │
│  Whatever you're building.                │  ← 헤드라인 (white, 48px)
│                                            │
│  ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ 💻   │ │ 🎨   │ │ 🧠   │               │  ← 3x2 카테고리 그리드
│  │Coding│ │Design│ │Assist│               │
│  │ 18   │ │  9   │ │  7   │               │     숫자 = 실제 tool count
│  └──────┘ └──────┘ └──────┘               │
│  ┌──────┐ ┌──────┐ ┌──────┐               │
│  │ ⚡   │ │ 📋   │ │ ✨   │               │
│  │Prod. │ │Manage│ │Other │               │
│  │  8   │ │  5   │ │  3   │               │
│  └──────┘ └──────┘ └──────┘               │
│                                            │
│        30+ tools across 6 categories       │
└────────────────────────────────────────────┘
```

**카피:**
- 헤드라인: `Whatever you're building.`
- 카테고리: `Coding`, `Design`, `Assistance`, `Productivity`, `Management`, `Other`
- 푸터: `30+ tools · 6 categories · 21 free options`

(`21 free options`는 `/tools` 페이지 실제 표시 수치)

**숫자 정확도:** 각 카테고리 tool 개수는 실제 DB 값과 맞춰야 함. 모르면 푸터의 `30+`만 살리고 개별 숫자는 빼도 됨.

**시각 요소:**
- 카테고리 카드: `#1E293B` 배경, hover 효과처럼 살짝 떠 있는 느낌 (drop shadow)
- 이모지 80px 크게
- 카테고리명 24px Bold
- 카운트 18px Muted

---

## 이미지 7 — Mobile / Cross-Platform

**역할:** "어디서든 쓸 수 있다" — PWA 설치 가능 + 모바일 반응형.

**레이아웃:**
```
┌────────────────────────────────────────────┐
│                                            │
│  Read anywhere. Install if you want.      │  ← 헤드라인 (white, 42px)
│                                            │
│   ┌──────────────┐    ┌────────────────┐  │
│   │              │    │                │  │
│   │  [iPhone 목업 │    │  [데스크톱 목업  │  │
│   │   - 홈 스크린 │    │   - 비교 페이지]│  │
│   │   - PWA 아이콘]│    │                │  │
│   │              │    │                │  │
│   └──────────────┘    └────────────────┘  │
│                                            │
│   Mobile · Desktop · PWA · Offline-ready  │
│                                            │
└────────────────────────────────────────────┘
```

**카피:**
- 헤드라인: `Read anywhere. Install if you want.`
- 푸터: `Mobile · Desktop · PWA · Offline-ready`

**시각 요소:**
- iPhone 프레임은 Figma Community 무료 목업 사용 (검색: "iPhone 15 mockup free")
- 두 디바이스가 살짝 겹치게 배치 (depth 연출)
- 배경에 부드러운 라디얼 그라데이션 (`#6366F1` 20% 중심에서 fade out)

**캡처 소스:**
- 모바일: 실제 핸드폰에서 usevibestack.com 접속해서 스크린샷, 또는 Chrome DevTools mobile emulator (iPhone 14 Pro)
- 데스크톱: `/compare/cursor-vs-windsurf` (앞서 만든 이미지 3 재활용)

---

## 이미지 8 — Manifesto / Closing

**역할:** 마지막 카드. 감정적 어필 + CTA. PH 갤러리 마지막 장은 종종 "왜 이걸 만들었나" 메시지.

**레이아웃:**
```
┌────────────────────────────────────────────┐
│                                            │
│                                            │
│        Stop bookmarking AI tools.         │  ← 헤드라인 (white, 56px)
│        Start stacking them.               │     ("Stop" = muted strikethrough)
│                                            │     ("stacking" = Primary)
│                                            │
│                                            │
│         [usevibestack.com →]               │  ← CTA 버튼 모양
│                                            │     (Primary fill, white text)
│                                            │
│                                            │
│       Built by an indie maker, free       │  ← 푸터 (muted, 18px)
│       forever for browsing.                │
│                                            │
└────────────────────────────────────────────┘
```

**카피:**
- 헤드라인 (2줄): `Stop bookmarking AI tools.` + `Start stacking them.`
  - "Stop bookmarking AI tools" → strikethrough 효과 + muted color (`#64748B`)
  - "Start stacking them" → white, "stacking"만 `#6366F1`
- CTA: `usevibestack.com →`
- 푸터: `Built by an indie maker, free forever for browsing.`

**시각 요소:**
- 배경: `#0F172A` 단색 또는 매우 미묘한 노이즈 텍스처
- CTA "버튼"은 인터랙티브하지 않지만 실제 버튼처럼 보이게: `#6366F1` 배경, white 텍스트, 16px radius, drop shadow
- 중앙 정렬, 여백 넉넉히 (manifesto 느낌)

---

## 갤러리 순서 결정 (PH 업로드 시)

| # | 이미지 | 이유 |
|---|---|---|
| 1 | **Hero** | 썸네일 카드 — 클릭 유발 최우선 |
| 2 | **Stacks** | 유일한 차별점 먼저 보여주기 |
| 3 | **Compare** | 가장 실용적 가치 |
| 4 | **Ranking** | "신뢰할 수 있는 데이터" 증명 |
| 5 | **Tool Detail** | 깊이 증명 |
| 6 | **Categories** | 폭 증명 |
| 7 | **Mobile** | 접근성 |
| 8 | **Manifesto** | 마지막 감정 한 방 |

---

## 작업 우선순위 (시간 제약 시)

다 못 만들면 이 순서로:

**필수 (최소 4장):**
1. Hero
2. Stacks
3. Compare
4. Manifesto

**있으면 좋음 (다음 4장):**
5. Ranking
6. Tool Detail
7. Categories
8. Mobile

8장 풀로 채우면 알고리즘이 "정성 들임" 신호로 봄. 4장만 있어도 가능.

---

## 캡처 자동화 팁

Playwright 이미 깔려 있으니 ([playwright.config.ts](../playwright.config.ts)), 일관된 해상도 스크린샷을 자동화 가능:

```bash
# 한 번에 모든 페이지 1440x900 다크모드 스크린샷
npx playwright codegen https://usevibestack.com --viewport-size=1440,900 --color-scheme=dark
```

또는 간단한 스크립트:

```ts
// scripts/ph-screenshots.ts
import { chromium } from 'playwright';

const PAGES = [
  '/', '/best/coding', '/compare/cursor-vs-windsurf-ide',
  '/stack/10x-engineer', '/tool/cursor', '/categories/coding',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  for (const path of PAGES) {
    await page.goto(`https://usevibestack.com${path}`);
    await page.waitForLoadState('networkidle');
    const slug = path.replace(/\//g, '-') || 'home';
    await page.screenshot({ path: `marketing/ph-screenshots/${slug}.png`, fullPage: false });
  }
  await browser.close();
})();
```

원하면 이 스크립트 만들어줄게.

---

## 다음 단계

이 스펙 가지고 Canva/Figma에서 작업. 헷갈리는 거 있으면 알려줘.

추가로 만들어줄 수 있는 것:
- **(a)** 위 Playwright 캡처 스크립트 — 일관된 스크린샷 자동 생성
- **(b)** 이미지 1~3 Figma 파일 (구조 잡힌 템플릿) — 본인이 텍스트만 바꾸면 됨
- **(c)** 이전 패키지의 (c) X 트윗 스레드로 넘어가기
- **(d)** 이전 패키지의 (b) 사전 알림 DM/이메일 템플릿으로 넘어가기
