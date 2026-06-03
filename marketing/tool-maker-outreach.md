# Tool Maker Outreach Templates

목적: 등재된 30개 툴 제작자에게 "당신 툴이 VibeStack에 있어요" 알림.
**예상 결과:** 30명 중 ~5~10명이 X/사이트에서 자연 mention → 백링크 + 브랜드 노출 + 30개 `/tool/*` 페이지의 외부 신호.

**왜 효과적인가:** 사람은 자기 이름/회사 언급에 본능적으로 반응. 60초 메시지에 답할 확률이 cold outreach의 5~10배.

---

## 0. 사전 준비

### 컨택 리스트 생성

```bash
npm run extract:contacts
# → marketing/tool-contacts.csv 생성 (gitignored, 로컬만)
```

CSV 컬럼:
- `Best Contact` — 자동 선택된 1순위 연락처
- `Emails`, `Twitter/X`, `LinkedIn` — 풀 옵션
- `Contact Page`, `About Page` — 수동 fallback 위치

### 분류 (CSV 본 후)

| 분류 | 액션 |
|---|---|
| ✅ **이메일 있음** (~8개) | 이메일 우선 |
| 🐦 **X 핸들만** (~13개) | X DM |
| ❌ **둘 다 없음** (~9개) | 거의 OpenAI/Anthropic/Google 등 대기업. 스킵 가능 |

대기업(ChatGPT, Claude, Sora, Gemini, Perplexity, Midjourney, Devin, Galileo)은 outreach 무의미 — 답 안 옴. **건너뛰고 인디 메이커 ~20개에 집중.**

---

## 1. 이메일 템플릿 — 인디 메이커용

가장 응답률 높은 형식. 짧고, 자기소개 없고, 액션 명확.

### 1A. 일반 알림 (default)

**Subject:**
```
{{ToolName}} is on VibeStack — quick heads-up
```

**Body:**
```
Hi {{maker name or "team"}},

Heads-up — I added {{ToolName}} to VibeStack, a curated AI tool
directory I run: https://usevibestack.com/tool/{{slug}}

I wrote the description and pros/cons myself based on actually using
the tool. No sponsorship, no affiliate link, no ask from your side.

Two things, both optional:

1. If anything in the listing is wrong or out-of-date, reply and I'll
   fix it within a day.

2. If you ever want to update pricing/features in the listing, there's
   a re-submission form here: https://usevibestack.com/submit-tool

That's it. Building VibeStack as an indie maker (~30 tools, growing
slowly), so hoping to keep listings accurate as the space changes fast.

— David
usevibestack.com
@vibestack
```

**왜 효과적인가:**
- Subject가 자기 회사 이름으로 시작 — 열람률 ↑
- 첫 줄에 "no ask" 명시 — 마케팅 메일 거부감 우회
- 2개 옵션 다 받는 사람에게 이득 — fair exchange
- 마지막 줄에 자연스러운 링크 — 본인이 share할 때 활용

---

### 1B. 차별화 강조 (큰 회사라도 인디스러운 곳 — Linear, Framer, Vercel 등)

**Subject:**
```
{{ToolName}} ranked in our "10x Engineer Stack" — VibeStack
```

**Body:**
```
Hi {{name or "team"}},

We featured {{ToolName}} in our "{{stack name}}" on VibeStack —
a curated bundle that gets recommended to users in 60 seconds via
our 5-question quiz.

Link: https://usevibestack.com/stack/{{stack-slug}}
Your listing: https://usevibestack.com/tool/{{slug}}

A few of the "stacks" your tool appears in:
- {{Stack 1 name}}
- {{Stack 2 name}}

No ad placement, no affiliate. We curate based on real use only.

Two asks (both optional):
1. Anything wrong in the listing? Reply and I'll fix it same-day.
2. If you ever want to share or quote any of this, feel free — links
   above are dofollow.

Thanks for building {{ToolName}}.

— David Kim
usevibestack.com
```

**커스터마이즈 포인트:**
- `{{stack name}}` / `{{stack-slug}}`: 실제 등재된 스택 확인 후 (예: 10x Engineer, Product Designer)
- 마지막 "dofollow" 언급 = 메이커들이 본능적으로 알아보는 신호. SEO 의식 있는 곳일수록 share함.

---

### 1C. 짧은 버전 (모바일/바쁜 사람용)

**Subject:**
```
{{ToolName}} on VibeStack
```

**Body:**
```
Heads-up: just listed {{ToolName}} on VibeStack —
https://usevibestack.com/tool/{{slug}}

Wrote the listing myself based on real use. No affiliate, no ask.

Reply if anything's wrong and I'll fix today.

— David, usevibestack.com
```

(80어 미만. 응답률이 가장 높은 길이.)

---

## 2. X (Twitter) DM 템플릿

X에서는 더 캐주얼하게. 이모지 1개 정도 OK.

### 2A. 첫 DM

```
hey 👋 just added {{ToolName}} to VibeStack — a small curated AI
directory i run.

your listing: https://usevibestack.com/tool/{{slug}}

wrote it myself, no affiliate, just a heads-up. let me know if
anything's wrong & i'll fix it.
```

(280자 안)

### 2B. 큰 계정 (@vercel, @linear, @notion 등 — 답 잘 안 옴)

DM 대신 **공개 트윗으로 멘션** — 답 안 와도 알고리즘이 그쪽 팔로워에게 노출.

```
shoutout to @{{handle}} — {{ToolName}} is one of the 30 hand-picked
tools on VibeStack, and it shows up in our "{{stack}}" combo.

builders, if you haven't tried it yet:
https://usevibestack.com/tool/{{slug}}
```

또는 quote tweet 형태: 그 회사의 최신 launch 트윗을 quote하면서 listing 언급. 더 자연스러움.

---

## 3. LinkedIn 메시지 템플릿

이메일/X 둘 다 안 통할 때만 사용. LinkedIn은 응답률 낮지만 B2B 메이커 (Tabnine, CodeRabbit 류) 한정으로 효과.

### Connection request note (300자 한도)

```
Hi {{name}} — building VibeStack, an indie AI tool directory. Just
listed {{ToolName}}. Wanted to connect + heads-up. No ask — just a
respectful FYI from one builder to another.
```

### 연결 후 첫 메시지

```
Thanks for connecting!

Quick context: VibeStack (usevibestack.com) is a small curated AI tool
directory I run. I added {{ToolName}} a while back —
https://usevibestack.com/tool/{{slug}}

I wrote the listing based on real use, no sponsorship. Mentioning in
case you want to:
- check accuracy (reply with corrections, I'll fix same-day)
- update pricing/features (https://usevibestack.com/submit-tool)

That's it. Hoping to keep our directory accurate as the space evolves.

— David
```

---

## 4. 후속 (Follow-up)

이메일은 5일 후 1회만 follow up. 그 이상은 spam.

### Subject:
```
Re: {{ToolName}} on VibeStack — bumping
```

### Body:
```
Hey {{name}},

Bumping the below in case it landed in spam. Totally fine to ignore —
just wanted to make sure you got the heads-up that {{ToolName}} is
listed on VibeStack.

If everything in the listing looks right, no need to reply.

— David
```

---

## 5. 답변별 대응

### 답변 A: "Thanks for letting me know!" (가장 흔함)

```
Anytime. If you ever post about {{ToolName}} updates, feel free to
share the listing — it's a dofollow link and ranks well for "{{key
search term}}" already.

Either way, glad to keep it accurate.

— David
```

(자연스러운 share 유도. 강요 X.)

### 답변 B: "There's an error in the description" 

```
Got it, fixed. Updated copy is live at https://usevibestack.com/tool/{{slug}}

Let me know if I missed anything else — easier to ship corrections
in one batch.
```

(즉시 수정 → trust 생성 → 나중에 share 확률 ↑)

### 답변 C: "Can you add a feature/CTA we shipped?"

```
Sure. Sent you a quick form so I can pull the exact copy/screenshots:
https://usevibestack.com/submit-tool?slug={{slug}}

Or just reply with the changes here and I'll update directly.
```

### 답변 D: "We'd love a sponsored placement / featured spot"

```
Cool — we don't do paid rankings, but we do clearly-labeled sponsored
spots (separate from organic listings). Pricing: https://usevibestack.com/sponsor

Happy to share Stats: ~X visitors/mo on /tool/{{slug}}, demographics
70% indie devs.
```

(실제 traffic 수치 확인 후 교체. 트래픽 작아도 정직하게.)

### 답변 E: "Remove our listing please"

```
Done — removed from https://usevibestack.com/tool/{{slug}}. No hard
feelings. If you change your mind later, just reply here.

(I generally don't list tools whose makers don't want to be listed,
even though our descriptions are independent reviews.)
```

(즉시 처리. 다시는 listing 거부한 회사를 add하지 않음. 단, 정중하게.)

---

## 6. 발송 일정

**한 번에 다 보내지 말 것** — 답신 처리할 시간 필요.

| 일자 | 발송 대상 | 채널 |
|---|---|---|
| **Day 1 (월)** | 이메일 있는 8명 | 이메일 |
| **Day 1 (월) 저녁** | X 핸들 있는 ~13명 | X DM |
| **Day 3 (수)** | LinkedIn 컨택 가능한 ~5명 | LinkedIn |
| **Day 6 (토)** | 답 없는 곳 follow-up | 같은 채널 |
| **Day 14** | 두 번째 follow-up X — 끝 |

---

## 7. 측정

GSC `Performance → Pages` 에서 2주 후 확인:
- `/tool/*` 페이지 중 새로 impressions 늘어난 것 = 외부 share 받은 신호
- "tabnine vibestack" 같은 co-occurrence 검색이 등장하면 = 자연스러운 브랜드 mention 발생

도메인 권위 변화도 확인:
- Ahrefs / Moz 무료 도구로 referring domain 수 비교 (before/after)
- 새 referring domain이 listing된 툴들의 도메인이면 성공

---

## 8. 자동화 옵션 (선택)

수동으로 30개 보내기 귀찮으면:

- **Apollo.io / Hunter.io**: 이메일 자동 수집 + mail merge (무료 50/월)
- **Lemlist / Instantly**: cold email automation (월 $29~). 단, 너무 spammy하면 deliverability 낮아짐
- **Notion + Zapier**: CSV → Gmail draft 자동 생성

추천: **30명 정도면 그냥 수동.** 1시간이면 끝. 자동화 셋업이 더 오래 걸림.

---

## 9. 윤리 체크

이 outreach가 spam 라인 아닌 이유:
- ✅ 본인 회사/제품에 대한 정보 (관련성 100%)
- ✅ 사실 알림 (listing 존재)
- ✅ 답신 거부 시 즉시 unlist
- ✅ 명시적 ask 없음 (share 강요 X)
- ❌ 만약 "공유해주세요"가 핵심 ask면 spam에 가까워짐 — 그 톤은 피했음

CAN-SPAM / GDPR 관점에서 안전: B2B 비즈니스 정보, 단일 1회 발송, opt-out 즉시 처리.

---

## 다음 자산

이거 끝나면 Phase 1 핵심 5가지 (Phase 0 SEO 픽스 + 디렉토리 등록 + PH 런치 패키지 + X 트윗 + 메이커 outreach) 완료.

후속 가능:
- **(e)** Reddit r/SideProject, r/SaaS, r/AItools 톤별 자기소개 글 (디렉토리와 다른 채널)
- **(f)** Hacker News Show HN submit 가이드 (D+7쯤)
- **(h)** 등재된 툴 제작자에게서 자연 backlink 받았을 때 follow-up 감사 메일 + 추가 share 요청
- **(i)** 2주 후 데이터 회수 시 같이 분석할 측정 대시보드 템플릿
