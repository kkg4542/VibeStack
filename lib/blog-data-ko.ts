import { BlogPost } from "./blog-types";

/**
 * Companion posts for @vibestack.ai Instagram reels — Korean (`lang: "ko"`),
 * plus the occasional English reel (no `lang`). Newest first. The reel promises
 * a guide ("댓글에 '카드' 남기면 DM으로 보내드려요"); the DM links here.
 * Set `reel.url` once the reel is live — the embed then replaces the hero image.
 */
export const postsKo: BlogPost[] = [
  {
    slug: "gemini-notebook-make-me-a-site",
    lang: "ko",
    title: "Gemini Notebook \"make me a site\": 쌓아 둔 자료로 사이트 만드는 법",
    excerpt:
      "릴스에서 소개한 Gemini Notebook의 \"make me a site\" 기능 정리본. 따라 하는 4단계, 공유할 때 알아 둘 점, 아직 안 보일 때 확인할 것을 공식 안내 기준으로 적었어요.",
    date: "Nov 23, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "3 min read",
    image: "/images/blog/gemini-notebook-make-me-a-site.png",
    // No tags: tag matching would drop an English "Our Gemini review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DgFOpzrsibC/" },
    content: `
      <p>릴스에서 말씀드린 정리본이에요. Google이 11월 16일에 발표한 Gemini Notebook의 새 기능으로, 노트북에 넣어 둔 소스로 눌러 보는 사이트를 만들어 줘요. 이 기능은 이미 카드뉴스로도 소개했고, 이 글은 그 영상판 정리본이에요.</p>

      <h2>무엇을 해 주나요</h2>
      <p>Gemini Notebook 채팅에 <code>make me a site</code>와 만들고 싶은 것을 적으면 노트북의 소스로 상호작용 가능한 사이트를 만들어 줘요. 구글이 든 예시는 세 가지예요.</p>
      <ul>
        <li>시험 대비 시각 자료(주기율표, 역사 연표)</li>
        <li>데이터를 훑어보는 대시보드(분기 매출 등)</li>
        <li>할 일·마감을 정리하는 프로젝트 트래커</li>
      </ul>

      <h2>따라 하는 법: 4단계</h2>
      <ol>
        <li><strong>노트북 열기</strong> — notebook.google.com에서 열어요(편집 권한이 필요해요).</li>
        <li><strong>소스 올리기</strong> — 사이트에 쓰고 싶은 자료를 넣어요.</li>
        <li><strong>채팅에 요청</strong> — <code>make me a site</code>와 원하는 것을 설명해요.</li>
        <li><strong>열어 보기</strong> — Studio 패널에서 사이트 옆 ⋮ → <code>Open in new tab</code>.</li>
      </ol>
      <p>영상 속 요청 문장은 저희가 만든 예시예요. 가진 자료 하나로 먼저 해 보세요.</p>

      <h2>알아 둘 점</h2>
      <ul>
        <li><strong>지금은 웹만 돼요.</strong> 모바일 앱은 곧 나온다고 안내돼 있어요.</li>
        <li><strong>순차 배포 중이라 아직 안 보일 수 있어요.</strong></li>
        <li><strong>18세 이상</strong>이 쓸 수 있고, 사용 한도가 있어요.</li>
        <li><strong>공유받는 사람도 노트북 접근 권한</strong>이 있어야 해요. 공유 링크는 <code>Copy link to artifact</code>로 받아요.</li>
        <li><strong>공개 공유</strong>는 개인 계정의 노트북 소유자·편집자만 할 수 있어요.</li>
      </ul>

      <h2>출처 (확인일 2026.11.23)</h2>
      <ul>
        <li><a href="https://blog.google/innovation-and-ai/products/gemini-notebook/interactive-sites/" target="_blank" rel="noopener noreferrer">Google 블로그, Turn Gemini Notebook sources into interactive sites</a> (2026.11.16)</li>
        <li><a href="https://workspaceupdates.googleblog.com/2026/11/transform-your-notes-and-research-into-dynamic-tools-with-Gemini-Notebook.html" target="_blank" rel="noopener noreferrer">Google Workspace Updates, Transform your notes and research into dynamic tools with Gemini Notebook</a> (2026.11)</li>
        <li>Gemini Notebook 고객센터(사용 한도, 공유 권한 안내)</li>
      </ul>
    `,
  },
  {
    slug: "card-news-automation-guide",
    lang: "ko",
    title: "카드뉴스 만드는 순서: 클로드 코드로 카드 7장 만들기",
    excerpt:
      "vibestack.ai가 카드뉴스 7장을 만들 때 실제로 거치는 8단계. 헤드리스 크롬 캡처 명령, 카드 HTML 뼈대, 클로드 코드 지시문 예시, 게시 전 점검 체크리스트를 정리했어요.",
    date: "Nov 21, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "5 min read",
    image: "/images/blog/card-news-automation-guide.png",
    // No tags: tag matching would drop an English "Our Claude review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DgAE2znsod5/" },
    content: `
      <p>릴스에서 말씀드린 정리본이에요. 카드뉴스 7장을 만들 때 저희가 실제로 거치는 순서를 그대로 적었어요. 같은 내용을 PDF로도 받을 수 있어요.</p>
      <p><a href="/guides/card-news-guide.pdf" target="_blank" rel="noopener">정리본 PDF 받기 (4쪽)</a></p>

      <h2>전체 흐름: 8단계</h2>
      <ol>
        <li><strong>주제 고르기</strong> — 이미 다룬 주제와 겹치지 않는지 콘텐츠 일정표로 확인해요.</li>
        <li><strong>사실 확인</strong> — 공식 발표·고객센터 원문으로 다시 봐요. 확인 못 한 내용은 빼요.</li>
        <li><strong>카드 7장 구성</strong> — 1 표지 · 2~6 본문(장마다 메시지 하나) · 7 체크리스트+출처.</li>
        <li><strong>카드마다 HTML 작성</strong> — 색·글꼴·상단 바·푸터는 템플릿 하나로 고정해요.</li>
        <li><strong>헤드리스 크롬으로 1080×1350 캡처</strong> — 화면 없이 크롬을 돌려 장마다 PNG로 저장해요.</li>
        <li><strong>간격·글자 잘림 점검</strong> — 본문 끝↔푸터 간격은 코드로 재고, 잘림은 이미지를 눈으로 봐요.</li>
        <li><strong>검수</strong> — 만든 AI가 아닌 다른 AI가 1차·2차로 다시 보고, 마지막은 사람이 봐요.</li>
        <li><strong>사람 승인 후 게시</strong> — 올리기 직전에서 멈추고, 사람이 "게시해"라고 해야 올려요.</li>
      </ol>

      <h2>캡처: 카드 한 장을 1080×1350 PNG로</h2>
      <pre><code>chrome --headless --hide-scrollbars \\
  --virtual-time-budget=5000 \\
  --window-size=1080,1350 \\
  --screenshot=card-01.png \\
  file:///작업폴더/card-01.html</code></pre>
      <p>저희 생성 스크립트의 캡처 줄에서 경로만 바꿨어요. <code>chrome</code>은 크롬 실행 파일 경로예요. <code>--disable-gpu</code>는 문서상 Windows에서만 필요해요.</p>

      <h2>간격 재기: 본문 끝과 푸터 사이를 숫자로</h2>
      <pre><code>chrome --headless --virtual-time-budget=5000 \\
  --window-size=1080,1350 \\
  --dump-dom file:///작업폴더/_chk.html</code></pre>
      <p>점검용 사본에 짧은 스크립트를 넣어 본문 마지막 요소 아래와 푸터 위 사이 거리를 body 속성에 적고, 출력된 DOM에서 숫자를 읽어요. 음수면 푸터 침범, 150px가 넘으면 빈 공간이라 여백을 고쳐요.</p>

      <h2>카드 HTML 뼈대 (줄인 예시)</h2>
      <pre><code>&lt;body style="width:1080px;height:1350px;overflow:hidden"&gt;
  &lt;div class="bar"&gt;&lt;/div&gt;            &lt;!-- 상단 오렌지 바 --&gt;
  &lt;div class="mast"&gt;VIBESTACK · 02/07&lt;/div&gt;
  &lt;h1 class="hd"&gt;한 장에 메시지 하나&lt;/h1&gt;
  &lt;div class="line"&gt;본문 한 줄&lt;/div&gt;
  &lt;div class="foot"&gt;@vibestack.ai · 출처&lt;/div&gt;
&lt;/body&gt;</code></pre>

      <h2>클로드 코드에게는 이렇게 시켜요</h2>
      <blockquote><p>주제는 ○○ 새 기능이야. 먼저 공식 발표와 고객센터 원문으로 사실을 확인하고 출처 URL과 날짜를 적어 줘. 카드 7장(1 표지, 2~6 본문 장마다 메시지 하나, 7 체크리스트+출처)으로 구성안을 먼저 보여 줘. 내가 승인하면 카드마다 HTML을 만들고 헤드리스 크롬으로 1080×1350 PNG를 캡처해 줘. 본문 끝과 푸터 사이 간격을 재서 음수면 고쳐 줘. 캡션은 2200자, 스레드 글은 500자 이하로. 게시는 하지 마.</p></blockquote>
      <p>vibestack이 만든 예시 문장이에요. 실제 지시문을 그대로 옮긴 건 아니에요.</p>

      <h2>넘기기 전에 이것만 점검해요</h2>
      <ul>
        <li><strong>글자 잘림</strong> — 7장을 한 장에 모은 이미지로 줄 끝·마지막 줄이 잘린 데 없는지 봐요.</li>
        <li><strong>푸터 침범</strong> — 본문 끝↔푸터 간격이 0px 이상인지 숫자로 확인해요.</li>
        <li><strong>간격</strong> — 150px 넘게 비면 여백을 키워요. 체크리스트 끝↔출처는 30~60px.</li>
        <li><strong>출처 문구</strong> — 공식 문서 이름과 날짜가 마지막 카드와 캡션에 있나요? 지어낸 예시는 '예시'라고 밝혔나요?</li>
        <li><strong>캡션 2200자 · 스레드 500자 이하</strong> — 눈대중 말고 파일 글자 수를 코드로 세요.</li>
      </ul>

      <h2>시작 전에 꼭 알아 두세요</h2>
      <ul>
        <li><strong>'문장 하나'로 끝나지 않아요.</strong> 먼저 클로드 코드 설치·로그인(무료 플랜 미포함, 유료 또는 Console 계정), 크롬, 파이썬, 브랜드 템플릿을 갖춰요. 지시문은 그다음이에요.</li>
        <li><strong>'코딩 없이'는 아니에요.</strong> 코드는 AI가 쓰지만 HTML·파이썬이 실제로 돌아가요. 오류가 나면 결과를 보고 다시 시켜요.</li>
        <li><strong>검수 단계가 따로 있어요.</strong> 코드가 재는 건 간격뿐이에요. 글자 잘림은 이미지로, 사실은 원문과 다시 대조해요.</li>
        <li><strong>게시는 사람이 승인해요.</strong> 댓글 답글·DM도 같아요.</li>
        <li><strong>내 컴퓨터에서 돌아가요.</strong> 작업하는 동안 컴퓨터가 켜져 있어야 해요. 이용료는 쓰는 요금제에 따라 달라요.</li>
      </ul>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://developer.chrome.com/docs/automation-and-testing/headless-chrome-shell" target="_blank" rel="noopener noreferrer">Chrome for Developers, Headless Chrome shell</a> — <code>--headless</code>, <code>--screenshot</code>, <code>--window-size</code>, <code>--print-to-pdf</code>, <code>--dump-dom</code>. <code>--disable-gpu</code>는 Windows에서만 필요.</li>
        <li><a href="https://developer.chrome.com/docs/automation-and-testing/headless" target="_blank" rel="noopener noreferrer">Chrome for Developers, Chrome Headless mode</a></li>
        <li><a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer">Claude Code Docs, Advanced setup</a> — Pro·Max·Team·Enterprise·Console 등 계정 필요, 무료 플랜 미포함.</li>
      </ul>
      <p><code>--hide-scrollbars</code>, <code>--virtual-time-budget</code>는 위 문서에 없어요. 저희 코드에서 써 보고 결과로 확인했어요.</p>
    `,
  },
  {
    slug: "ai-morning-briefing-assistant",
    lang: "ko",
    title: "AI 아침 비서 세팅: 매일 9시 텔레그램 브리핑 받기",
    excerpt:
      "릴스에서 말씀드린 AI 아침 비서 세팅 정리본(6쪽)을 글로 옮겼어요. Hermes Agent 설치, 텔레그램 연결, 메일·캘린더 연결, 문장 하나로 예약하기, 보내기 전에 꼭 묻게 하는 규칙까지 정리했어요.",
    date: "Nov 18, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "6 min read",
    image: "/images/blog/ai-morning-briefing-assistant.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/Df47dHlsHQ4/" },
    content: `
      <p>릴스에서 말씀드린 AI 아침 비서 세팅 정리본(6쪽)을 글로 옮겼어요. 매일 아침 9시에 오늘 일정, 꼭 봐야 할 메일, 오늘 할 일이 텔레그램으로 오게 하는 방법이에요. 릴스 속 인물과 목소리는 AI로 만들었고, 화면 속 메일·일정은 예시 데이터예요.</p>

      <h2>시작 전에 알아 둘 것</h2>
      <ul>
        <li><strong>'문장 하나'는 마지막 단계예요.</strong> 릴스에서는 "제가 코딩한 건 하나도 없어요"라고 했지만, 그 전에 설치와 계정 연결을 한 번 해야 해요. 터미널 명령을 칠 수도 있고, 구글 연결은 Google Cloud에서 프로젝트를 만드는 과정이 들어가요. 처음에는 30분에서 1시간쯤 걸려요.</li>
        <li><strong>컴퓨터가 켜져 있어야 해요.</strong> 공식 문서에 따르면 예약 작업은 Hermes 게이트웨이 안에서 돌아서, 게이트웨이가 꺼져 있으면 실행되지 않아요. 내 컴퓨터에서 돌린다면 그 시간에 컴퓨터와 Hermes가 켜져 있어야 해요.</li>
        <li><strong>프로그램은 무료, 모델은 유료예요.</strong> Hermes Agent는 MIT 라이선스 오픈소스예요. 다만 AI 모델 이용료는 쓰는 모델 제공사의 요금을 따라요.</li>
        <li><strong>보내기는 사람이 승인해요.</strong> 초안은 AI가 쓰고, 보내기는 내가 "보내"라고 해야 해요. 아래 5단계에 규칙을 적어 두었어요.</li>
      </ul>

      <h2>1~2단계: Hermes Agent 설치하고 텔레그램 연결하기</h2>
      <h3>1단계: Hermes Agent 설치</h3>
      <p>Hermes Agent는 Nous Research가 만든 오픈소스 AI 에이전트예요. 내 컴퓨터에서 돌아가고, 텔레그램 같은 메신저로 대화할 수 있어요.</p>
      <ul>
        <li><strong>쉬운 방법(맥·윈도우)</strong>: 공식 사이트에서 Hermes Desktop 설치 파일을 받아 실행해요.</li>
        <li><strong>터미널 방법(맥·리눅스)</strong>: 아래 명령을 실행해요.</li>
      </ul>
      <pre><code>curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash</code></pre>
      <p>설치가 끝나면 설정 마법사로 쓸 AI 모델을 골라요.</p>
      <pre><code>hermes setup</code></pre>
      <p>이미 쓰는 AI 서비스가 있으면 그 계정이나 API 키를 연결하면 돼요. 공식 퀵스타트도 일반 대화가 되는지 먼저 확인하고, 그다음에 메신저·예약 작업을 붙이라고 안내해요.</p>

      <h3>2단계: 텔레그램 연결</h3>
      <p>비서와 대화하고 브리핑을 받을 창구예요.</p>
      <ol>
        <li>Hermes 데스크톱 앱(또는 대시보드)에서 <strong>Messaging → Telegram</strong>을 열어요.</li>
        <li><strong>Create with QR</strong> 버튼을 눌러요.</li>
        <li>휴대폰 텔레그램으로 QR을 찍으면 내 전용 봇이 만들어져요. 공식 문서에 따르면 Hermes가 내 텔레그램 사용자 ID를 찾아 허용 사용자로 저장하고, 게이트웨이를 다시 시작해요.</li>
      </ol>
      <p>연결되면 텔레그램에서 봇에게 "안녕"이라고 보내 보세요. 답이 오면 성공이에요.</p>
      <ul>
        <li><strong>봇 토큰은 비밀번호와 같아요.</strong> 누구에게도 보내지 마세요. 공식 문서는 토큰이 새면 @BotFather에서 <code>/revoke</code>로 바로 폐기하라고 안내해요.</li>
        <li><strong>허용 사용자를 확인하세요.</strong> 내 계정만 봇을 쓸 수 있어야 해요. QR 방식은 자동으로 설정돼요.</li>
        <li>봇을 직접 만들고 싶으면 텔레그램에서 @BotFather에게 <code>/newbot</code>을 보내 토큰을 받는 방법도 있어요.</li>
      </ul>

      <h2>3단계: 메일·캘린더 연결하기</h2>
      <p>이 단계가 가장 오래 걸려요. 한 번만 하면 돼요.</p>
      <h3>Gmail + Google 캘린더</h3>
      <p>비서에게 이렇게 말하면 단계별로 안내해 줘요.</p>
      <pre><code>구글 워크스페이스 연결 설정해줘</code></pre>
      <p>공식 문서 기준으로 이런 순서예요. Google Cloud 프로젝트를 만들고 Gmail·Calendar 등 API를 켜요. 그다음 OAuth 인증 정보(데스크톱 앱 유형)를 만들고, Hermes가 준 주소를 브라우저에서 열어 승인해요. 그 뒤로는 토큰이 자동으로 갱신돼요.</p>
      <h3>메일만 필요하다면</h3>
      <p>himalaya 스킬과 Gmail 앱 비밀번호를 쓰면 훨씬 간단해요. Google Cloud 프로젝트가 필요 없어요.</p>
      <pre><code>himalaya로 내 Gmail 연결해줘</code></pre>
      <p>참고로 Hermes 공식 가이드 중 에이전트에게 메일함을 맡기는 글은 개인 메일함 대신 에이전트 전용 계정을 만들라고 권해요. 개인 메일을 연결한다면 아래 권한 규칙을 더 엄격하게 지키세요.</p>
      <ul>
        <li><strong>권한은 좁게.</strong> 처음에는 읽기만 맡기세요.</li>
        <li><strong>비밀번호는 채팅창에 붙여 넣지 마세요.</strong> 안내하는 설정 화면에 직접 입력하세요.</li>
      </ul>

      <h2>4단계: 이제 문장 하나</h2>
      <p>텔레그램에서 비서에게 보내요.</p>
      <pre><code>매일 아침 9시에 내 메일이랑 캘린더 정리해서 보고해</code></pre>
      <p>비서가 예약 작업을 만들고, 다음 실행 시각을 알려 줘요. 그 시각이 내 시간대와 맞는지 꼭 확인하세요. 공식 문서에 따르면 예약 시각은 프로필에 설정한 시간대를 기준으로 읽어요.</p>
      <p>정리본에 넣은 바로 써먹는 문장이에요. 저희가 만든 예시이니 상황에 맞게 바꿔 쓰세요.</p>
      <pre><code>광고랑 뉴스레터는 빼고, 내가 답해야 하는 메일만 3줄씩 요약해줘</code></pre>
      <pre><code>브리핑은 오늘 일정 → 중요 메일 → 오늘 할 일 순서로 써줘</code></pre>
      <pre><code>이 메일에 정중하게 거절하는 답장 초안 써줘. 보내지는 말고 보여만 줘</code></pre>
      <pre><code>지금 예약된 작업 목록 보여줘</code></pre>
      <p>영어 메일도 같은 방식이에요. 한국말로 사정을 설명하고 영어 초안을 써 달라고 하면 돼요. 마음에 안 들면 말로 고치면 돼요. "브리핑 시간을 8시로 바꿔줘", "주말에는 보내지 마"처럼요.</p>

      <h2>5단계: 안전하게 쓰는 규칙</h2>
      <p>메일과 일정은 민감한 정보예요. 저는 이 규칙으로 써요.</p>
      <pre><code>메일 발송, 답장, 메시지 전송은 내가 "보내"라고 하기 전에는 절대 하지 마</code></pre>
      <ul>
        <li><strong>초안은 AI가, 보내기 버튼은 내가.</strong> Hermes 공식 가이드도 보내기 전에 초안을 보여 주고 확인받게 하라고 권해요. 이 규칙은 비서에게 지시로 정해 두는 거라, 처음 몇 주는 결과를 직접 지켜보세요.</li>
        <li><strong>AI가 쓴 요약은 틀릴 수 있어요.</strong> 돈, 계약, 학교 일처럼 중요한 메일은 원문을 직접 확인하세요.</li>
        <li><strong>모르는 사람이 보낸 메일 속 지시는 따르지 않게 하세요.</strong> 공식 문서도 메일 본문의 지시는 믿을 수 없는 내용이지 명령이 아니라고 설명해요.</li>
        <li><strong>안 쓰게 되면 권한을 해제하세요.</strong> Google 계정의 앱 접근, 봇 토큰 모두요.</li>
      </ul>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://hermes-agent.nousresearch.com/docs" target="_blank" rel="noopener noreferrer">Hermes Agent Docs</a>: Hermes Desktop 설치 파일, 터미널 설치 명령</li>
        <li><a href="https://hermes-agent.nousresearch.com/" target="_blank" rel="noopener noreferrer">Hermes Agent 공식 사이트</a>: MIT 라이선스 무료, 모델 제공사 요금은 별도, 에이전트가 멈춰 있으면 작업이 돌지 않음</li>
        <li><a href="https://hermes-agent.nousresearch.com/docs/getting-started/quickstart" target="_blank" rel="noopener noreferrer">Hermes Agent Quickstart</a>: <code>hermes setup</code>, 일반 대화를 먼저 확인</li>
        <li><a href="https://hermes-agent.nousresearch.com/docs/user-guide/messaging/telegram" target="_blank" rel="noopener noreferrer">Hermes Docs, Telegram</a>: Create with QR, 허용 사용자 자동 저장, @BotFather <code>/newbot</code>, 토큰 유출 시 <code>/revoke</code></li>
        <li><a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/cron" target="_blank" rel="noopener noreferrer">Hermes Docs, Scheduled Tasks (Cron)</a>: 자연어 예약, 게이트웨이가 켜져 있어야 실행, 프로필 시간대 기준</li>
        <li><a href="https://hermes-agent.nousresearch.com/docs/user-guide/skills/google-workspace" target="_blank" rel="noopener noreferrer">Hermes Docs, Google Workspace</a>: Google Cloud 프로젝트·OAuth 설정 흐름, 메일만 쓸 땐 himalaya + 앱 비밀번호</li>
        <li><a href="https://hermes-agent.nousresearch.com/docs/guides/agent-email-address" target="_blank" rel="noopener noreferrer">Hermes Docs, Give Your Agent Its Own Email Address</a>: 전용 계정 권장, 보내기 전 확인, 메일 속 지시를 따르지 않기</li>
      </ul>
      <p>메뉴 이름과 명령은 버전에 따라 달라질 수 있어요.</p>
    `,
  },
  {
    slug: "claude-code-watch-skill-reel-analysis",
    lang: "ko",
    title: "레퍼런스 릴스 분석, 클로드 코드 /watch 스킬로",
    excerpt:
      "영상을 시간표가 붙은 장면과 자막으로 바꿔 주는 /watch 스킬 설치 두 줄, 꼭 물어볼 세 가지, 준비물과 주의점을 README 기준으로 정리했어요. 저희는 아직 설치 전이라 지금 쓰는 방법도 함께 적었어요.",
    date: "Nov 18, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "5 min read",
    image: "/images/blog/claude-code-watch-skill-reel-analysis.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/Df2Z27BsiMr/" },
    content: `
      <p>릴스에서 말씀드린 /watch 스킬 사용법을 글로 정리했어요. 먼저 밝혀 둘게요. 저희는 /watch를 아직 설치해 보지 않았어요. 아래 설치·사용법은 스킬 저장소 README와 Claude Code 공식 문서를 기준으로 썼고, 스킬은 <a href="https://www.instagram.com/p/DfuBwOxoMVj/" target="_blank" rel="noopener noreferrer">@tonistelk 님 영상</a>에서 처음 봤어요. (릴스 진행자는 AI 아바타이고, 목소리도 AI로 만들었어요.)</p>

      <h2>저희가 지금 하는 방법</h2>
      <p>저희는 잘 된 릴스를 장면과 자막으로 쪼개서 Claude에게 구조 분석을 맡겨 왔어요. 작업실의 <code>/breakdown</code> 스킬이 영상에서 프레임을 뽑고(ffmpeg), 자막을 추출한 다음(Whisper), 훅·전개·마무리로 나눠요. 이 쪼개기를 대신 해 주는 공개 스킬이 /watch예요.</p>

      <h2>/watch가 하는 일</h2>
      <p>README에 따르면 영상 URL이나 로컬 파일을 시간표가 붙은 프레임과 자막으로 바꿔 Claude에게 넘겨요. 영상에 자막이 있으면 그걸 먼저 쓰고, 자막이 없으면 음성 받아쓰기를 따로 켤 수 있어요.</p>
      <ul>
        <li><strong>Gemini 엔진</strong>: Google AI Studio 키(무료로 발급)를 넣으면 영상 전체를 Google 모델이 보고 시간표가 붙은 답을 돌려줘요. 로컬 파일은 Google에 올라갔다가 답을 받은 뒤 지워진다고 적혀 있어요.</li>
        <li><strong>로컬 엔진</strong>: 키가 없거나 비공개 영상이면 <code>--engine local</code>을 쓰세요. 내 컴퓨터에서 ffmpeg와 yt-dlp로 프레임과 자막을 뽑고, Google에는 연결하지 않아요.</li>
      </ul>
      <p>캡션에서 "링크만 주면"이라고 했는데, 정확히는 사이트마다 달라요. README는 URL 접근이 영상 출처와 세션의 네트워크 권한에 따라 다르다고 해요. 로그인이 필요한 영상은 쿠키를 직접 지정해야 하고, 인스타그램 링크가 된다고 따로 적혀 있지는 않아요. 안 되면 영상 파일을 받아서 넘기세요.</p>

      <h2>설치: Claude Code에서 두 줄</h2>
      <p>터미널에서 <code>claude</code>로 Claude Code를 연 다음, 세션 안에서 한 줄씩 입력해요.</p>
      <pre><code>/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video</code></pre>
      <ul>
        <li>공식 문서에 따르면 <code>/plugin install</code>은 바로 설치하지 않아요. 먼저 플러그인이 무엇을 추가하는지 보여 주고, 설치 범위(내 모든 프로젝트, 이 저장소의 모든 협업자, 이 저장소에서 나만)를 고르게 해요. 플러그인은 훅과 MCP 서버를 실행할 수 있으니 이 화면을 읽고 설치하세요.</li>
        <li>설치 후 안 보이면 새 세션을 열고, <code>/watch</code>를 입력한 뒤 자동완성에서 <code>/watch:watch</code>를 고르세요.</li>
        <li><strong>쓸 수 있는 곳</strong>: 데스크톱 앱의 Code 탭(Customize → Plugins에서 저장소 URL로 추가), VS Code의 Claude Code, 터미널의 Claude Code. README는 Claude 채팅창과 Cowork에서는 작동하지 않는다고 적어 두었어요.</li>
      </ul>

      <h2>준비물과 비용</h2>
      <ul>
        <li><strong>프로그램</strong>: Python 3.10 이상, FFmpeg/ffprobe, 최신 yt-dlp. 스킬에 포함되어 있지 않아요. 맥에서는 <code>brew install python ffmpeg yt-dlp</code>로 설치할 수 있어요. 빠진 게 있으면 스킬에 들어 있는 <code>setup.py</code>로 점검하라고 안내해요.</li>
        <li><strong>API 키</strong>: 첫 실행에는 필요 없어요(로컬 엔진, 자막만). Gemini 엔진을 쓰려면 <code>GEMINI_API_KEY</code>가 필요해요. 음성 받아쓰기는 로컬 WhisperX(키 없음, 디스크 3GB·메모리 8GB 이상 권장), Groq, OpenAI 중에 골라요. Groq·OpenAI는 각각 키가 필요해요. 키는 <code>~/.config/watch/.env</code>에 두고, 공개된 곳에 올리지 마세요.</li>
        <li><strong>비용</strong>: 스킬은 MIT 라이선스 오픈소스예요. 다만 Claude Code 사용량은 쓰는 요금제대로 들고, Groq·OpenAI 받아쓰기도 각자 요금이 있어요. 프레임을 많이 뽑을수록 Claude가 읽을 이미지가 늘어나요(README의 <code>--detail</code>, <code>--max-frames</code> 옵션으로 줄일 수 있어요).</li>
      </ul>

      <h2>물어볼 건 세 가지</h2>
      <p>레퍼런스를 볼 때 이 세 가지만 물어보면 충분해요. 첫 3초에 뭘 했나, 어디서 장면이 바뀌나, 마지막에 뭘 시키나. 아래는 저희가 만든 예시 문장이에요.</p>
      <pre><code>watch 스킬로 이 릴스를 봐 줘: [릴스 링크 또는 파일 경로]

아래 세 가지에 답해 줘. 시각은 초 단위로 적어 줘.
1. 첫 3초에 뭘 했나: 화면, 자막, 첫 문장
2. 어디서 장면이 바뀌나: 바뀌는 시각과 무엇에서 무엇으로 바뀌는지
3. 마지막에 뭘 시키나: 마지막 요청(CTA) 문장 그대로

답은 reference-notes.md 맨 아래에 릴스 링크와 오늘 날짜를 붙여 추가해 줘.</code></pre>
      <p>답을 한 파일에 모아 두면 다음 대본의 뼈대가 돼요. 몇 편 쌓이면 "첫 3초에 자주 쓰인 방법"이나 "CTA 유형"을 Claude에게 다시 묶어 달라고 할 수 있어요. 구조만 빌리고, 남의 문장과 화면 구성은 그대로 가져오지 마세요.</p>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://www.instagram.com/p/DfuBwOxoMVj/" target="_blank" rel="noopener noreferrer">@tonistelk 인스타그램 영상</a>: /watch 스킬을 처음 본 곳</li>
        <li><a href="https://github.com/bradautomates/claude-video" target="_blank" rel="noopener noreferrer">bradautomates/claude-video README</a>: 설치 명령, <code>/watch:watch</code>, 쓸 수 있는 곳(채팅창·Cowork 미지원), Gemini/로컬 엔진, 준비물(Python 3.10+, FFmpeg, yt-dlp), 받아쓰기 백엔드와 키, MIT 라이선스</li>
        <li><a href="https://code.claude.com/docs/en/discover-plugins" target="_blank" rel="noopener noreferrer">Claude Code Docs, Install and manage plugins</a>: <code>/plugin install</code>은 상세 화면과 범위 선택부터, 다른 마켓플레이스는 먼저 추가, 훅·MCP 서버 실행 가능성</li>
      </ul>
    `,
  },
  {
    slug: "claude-code-instagram-workshop",
    lang: "ko",
    title: "클로드 코드로 돌리는 인스타 작업실: 다섯 단계와 규칙",
    excerpt:
      "매일 아침 7시 수집부터 분석, 대본 5개, 카드뉴스·영상, 사람 검수까지. 저희 인스타 작업실의 다섯 단계와 폴더 구조, CLAUDE.md에 적어 둔 규칙을 실제 파일 기준으로 정리했어요.",
    date: "Nov 17, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "5 min read",
    image: "/images/blog/claude-code-instagram-workshop.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/Df0lhAxM239/" },
    content: `
      <p>릴스에서 말씀드린 작업실 구조도를 글로 정리했어요. 레퍼런스 수집부터 대본, 카드뉴스, 영상까지는 Claude Code가 하고, 게시는 사람이 해요. 릴스 진행자는 AI 아바타이고, 목소리는 운영자 목소리를 복제해 만들었어요.</p>

      <h2>한 편이 만들어지는 다섯 단계</h2>
      <p>각 단계는 앞 단계가 남긴 파일을 읽고, 다음 단계가 쓸 파일을 남겨요. 제 맥에서만 도는 로컬 웹 화면(Creator Studio)에서 버튼을 누르면, 뒤에서는 Claude Code가 일해요.</p>
      <ol>
        <li><strong>고르기: 매일 아침 7시 자동 수집.</strong> 정해 둔 벤치마크 계정에서 최근 릴스를 모아요(수집은 Apify를 써요). 조회수를 그 계정 게시물의 중앙값과 비교해서, 평소보다 잘 된 영상이 위로 오게 정렬해요. 결과는 <code>data/references/날짜.json</code>에 남아요.</li>
        <li><strong>분석: <code>/breakdown</code>.</strong> 고른 영상에서 프레임과 자막을 뽑아 훅, 전개, 마무리 구조로 나눠요. 댓글 반응까지 보고 왜 잘 됐는지 가설을 써요. 결과는 <code>data/references/코드/breakdown.json</code>이에요.</li>
        <li><strong>대본: <code>/remix</code>.</strong> 분석한 구조에 제 주제를 얹어 대본 5개를 써요. 구조만 빌리고 내용은 제 경험으로 채울지, 영상이 소개한 방법을 출처를 밝혀 제 말로 다시 쓸지 매번 골라요. 결과는 <code>drafts/날짜-주제/script.json</code>이에요.</li>
        <li><strong>만들기: <code>/cardnews</code> 또는 영상.</strong> 고른 대본을 1080×1350 카드뉴스 PNG로 렌더링하거나 세로 영상으로 만들어요. 영상은 코드로 편집하고(Remotion 프로젝트), 진행자 컷은 Higgsfield로 만든 AI 아바타예요. 결과는 <code>output/날짜-주제/</code>에 남아요.</li>
        <li><strong>내보내기: 사람 검수.</strong> 모든 결과물은 <code>review</code> 상태로 끝나요. 제가 보고 "검수를 마쳤습니다"를 체크하면, 브라우저 에이전트가 인스타그램 공유 직전 화면까지 준비해요. <strong>공유 버튼은 제가 눌러요.</strong></li>
      </ol>

      <h3>"매일 7시 자동"은 어디까지인가요</h3>
      <p>자동으로 도는 건 1단계 수집뿐이에요. Creator Studio 설정에서 매일 07:00 실행을 켜 두었고(2026-11-16), 수집만 하도록 정해 두었어요. 실행 기록을 보면 11월 17일·18일·19일 아침 7시 무렵에 수집 파일이 생겼어요. 이 스케줄은 crontab이 아니라 Studio 서버 안에서 돌아요. 그래서 맥과 Studio가 켜져 있어야 하고, 늦게 켜지면 그날 밤 11시 전까지 따라 실행해요. 분석부터는 제가 버튼으로 시작해요.</p>
      <p>해시태그 수집은 지금 비워 두었어요. 저희가 쓰는 무료 플랜에서는 해시태그로 최신 게시물 한 페이지만 걸려서, 반응이 거의 없는 글만 모였거든요(설정 파일에 남긴 메모 기준이고, Apify 공식 문서로는 확인하지 못했어요). 지금은 계정 목록 위주로 모아요.</p>

      <h2>Claude에게 정해 둔 규칙 (CLAUDE.md)</h2>
      <p>프로젝트 폴더의 <code>CLAUDE.md</code>에 적어 두면 Claude Code가 세션을 시작할 때마다 읽어요. 실제 파일에 있는 규칙 중 핵심만 옮기면 이래요.</p>
      <ul>
        <li><strong>사람 검수 전에는 절대 발행하지 않는다.</strong> 결과물 상태는 항상 <code>review</code>로 끝낸다.</li>
        <li><strong>기능·가격·버전은 웹에서 최신으로 확인하고 출처를 남긴다.</strong> 확인 못 한 내용은 쓰지 않는다. 추측 금지.</li>
        <li><strong>해 보지 않은 걸 해 봤다고 쓰지 않는다.</strong> 남의 영상에서 본 방법은 "이 영상에서 본 방법"이라고 쓰고 원작자(@계정·링크)를 남긴다.</li>
        <li><strong>남의 화면 구성을 그대로 가져오지 않는다.</strong> 화면 캡처·편집을 그대로 쓰는 건 금지해요.</li>
        <li><strong>톤은 차분하게.</strong> 과장·공포 마케팅 금지, 존댓말.</li>
      </ul>
      <p>알아 둘 점이 있어요. 공식 문서에 따르면 Claude는 CLAUDE.md를 강제 설정이 아니라 맥락으로 다뤄요. 어떤 동작을 반드시 막아야 하면 PreToolUse 훅을 쓰라고 안내해요. 그래서 저희는 규칙에만 기대지 않아요. 마지막 공유 버튼은 사람이 누르게 해 두었어요.</p>

      <h2>폴더 구조</h2>
      <pre><code>insta-studio/
├─ CLAUDE.md                # 계정 소개, 콘텐츠 기둥, 절대 원칙
├─ .claude/skills/
│  ├─ breakdown/            # ② 구조 분해
│  ├─ remix/                # ③ 대본 5개
│  └─ cardnews/             # ④ 카드 렌더링
├─ config/sources.json      # 수집할 계정·기준
├─ scripts/collect.js       # ① 수집
├─ data/references/         # 모은 레퍼런스와 분석 결과
├─ drafts/                  # 대본
├─ output/                  # 완성 카드·영상·캡션
├─ studio/                  # 로컬 웹 화면 (내 맥에서만)
└─ video/                   # 영상 편집 코드</code></pre>
      <p>스킬은 <code>.claude/skills/이름/SKILL.md</code>로 두면 폴더 이름이 명령이 돼요. 그래서 <code>/breakdown</code>, <code>/remix</code>, <code>/cardnews</code>로 불러요. Studio 화면의 버튼은 뒤에서 <code>claude -p</code>(대화 없이 실행하는 모드)로 이 스킬을 돌려요. 예를 들면 <code>claude -p "/breakdown 코드"</code>처럼요. 그래서 스킬 안에 "인자로 실행됐으면 사람에게 묻지 말고, 확인이 필요한 점은 파일에 적고 끝까지 진행한다"는 규칙을 넣어 두었어요.</p>

      <h2>따라 만든다면 이 순서로</h2>
      <ol>
        <li><strong>CLAUDE.md부터.</strong> 내 계정이 무슨 이야기를 하는지, 하면 안 되는 것이 무엇인지 적어요.</li>
        <li><strong>스킬 하나.</strong> "이 릴스를 훅·전개·마무리로 나눠 줘"처럼 매번 하는 부탁을 스킬로 저장해요.</li>
        <li><strong>대본 스킬.</strong> 분석 결과를 내 주제로 바꾸는 부탁을 두 번째 스킬로 만들어요.</li>
        <li><strong>수집은 그다음.</strong> 처음엔 링크를 직접 붙여 넣어도 충분해요.</li>
        <li><strong>화면은 마지막.</strong> 터미널 명령이 귀찮아질 때 만들면 돼요. 저는 첫 게시물에 명령을 10번 넘게 치고 나서 만들었어요.</li>
      </ol>

      <h2>시작 전에 알아 둘 것</h2>
      <ul>
        <li><strong>'자동으로 다 됨'은 아니에요.</strong> 자동으로 도는 건 아침 수집뿐이고, 대본 고르기와 검수, 게시는 사람이 해요.</li>
        <li><strong>준비물이 있어요.</strong> Claude Code, Node.js 패키지 설치, 프레임 추출용 ffmpeg, 자막 추출용 Whisper, 수집용 Apify 계정과 토큰이 필요해요. 토큰은 <code>.env</code>에 두고, Claude Code 권한 설정에서 이 파일은 읽지 못하게 막아 두었어요.</li>
        <li><strong>비용이 따로 들어요.</strong> Apify Instagram Scraper는 결과 수만큼 과금돼요(스토어 페이지 기준 1,000건당 1.50달러부터). Claude Code 사용량, AI 아바타 생성 비용도 따로예요.</li>
        <li><strong>내 컴퓨터에서 돌아요.</strong> 수집 스케줄과 작업 화면 모두 맥과 Studio가 켜져 있어야 해요.</li>
      </ul>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener noreferrer">Claude Code Docs, How Claude remembers your project</a>: CLAUDE.md는 세션마다 읽힘, 강제 설정이 아닌 맥락, 반드시 막을 동작은 PreToolUse 훅</li>
        <li><a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer">Claude Code Docs, Extend Claude with skills</a>: SKILL.md, <code>/스킬이름</code>으로 호출, 폴더 이름이 명령</li>
        <li><a href="https://code.claude.com/docs/en/headless" target="_blank" rel="noopener noreferrer">Claude Code Docs, Run Claude Code programmatically</a>: <code>claude -p</code> 비대화형 실행, <code>--allowedTools</code>, <code>--output-format</code></li>
        <li><a href="https://apify.com/apify/instagram-scraper" target="_blank" rel="noopener noreferrer">Apify Store, Instagram Scraper</a>: 공개 게시물·릴스 수집, 1,000건당 1.50달러부터</li>
      </ul>
    `,
  },
  {
    slug: "claude-code-token-saving-5",
    lang: "ko",
    title: "클로드 코드 토큰 아끼는 기능 5개 (5번 정체 공개)",
    excerpt:
      "릴스에서 ???로 가린 5번은 /context예요. /clear, /compact, /model, 계획 모드(Shift+Tab 또는 /plan)까지 언제 무엇을 쓰는지 공식 문서와 대조해서 정리했어요.",
    date: "Nov 16, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "4 min read",
    image: "/images/blog/claude-code-token-saving-5.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DfyiU5HMR4H/" },
    content: `
      <p>릴스에서 말씀드린 토큰 아끼는 기능 5개를 글로 정리했어요. 릴스에서 ???로 가렸던 5번은 <code>/context</code>예요. 5번으로 토큰이 어디서 새는지 먼저 보고, 1~4번으로 막으면 돼요. (릴스 진행자는 AI 아바타예요.)</p>

      <h2>먼저 5번: /context로 어디서 새는지 보기</h2>
      <p><code>/context</code>는 지금 컨텍스트 사용량을 색깔 칸으로 보여 줘요. 공식 문서에 따르면 컨텍스트를 많이 차지하는 도구, 커진 메모리 파일, 용량 경고에 대한 줄이는 방법도 함께 보여 줘요.</p>
      <p>제 세션에서 쳐 보니 컨텍스트 윈도우 1M 중 228.7k를 쓰고 있었고, 그중 158.7k(약 70%)가 대화 기록(Messages)이었어요. 대화 기록이 제일 크면 아래 1번이나 2번이 답이에요. 숫자는 제 세션 값이고, 세션마다 달라요.</p>
      <p>한도가 빨리 닳는다고 느껴질 때 제일 먼저 쳐 보세요. 구독 요금제(Pro·Max·Ultra·Team·Enterprise)라면 <code>/usage</code>에서도 스킬·서브에이전트·MCP 서버별 사용 비중과 줄이는 방법을 보여 줘요.</p>

      <h2>1·2번: 대화 기록 줄이기 (/clear, /compact)</h2>
      <h3>1. /clear: 다른 작업으로 넘어갈 땐 대화부터 비우기</h3>
      <p>빈 컨텍스트로 새 대화를 시작해요. 공식 문서는 관련 없는 작업으로 넘어갈 때 쓰라고 안내해요. 이전 대화가 남아 있으면 메시지를 보낼 때마다 그만큼 토큰을 쓰기 때문이에요. 문서에는 새로 시작할 때 <code>/clear</code> 자체는 비용이 들지 않는다고 나와 있어요.</p>
      <p>나중에 이어 보고 싶으면 이름을 붙여 두세요. <code>/clear 이름</code>처럼 쓰면 이전 대화에 이름이 붙고, <code>/resume</code> 목록에서 찾을 수 있어요. 비우기 전에 <code>/rename</code>으로 이름을 바꿔 두는 방법도 있어요.</p>

      <h3>2. /compact: 대화가 길어지면 요약해서 공간 확보</h3>
      <p>지금까지의 대화를 요약해서 컨텍스트를 비워요. 같은 작업을 이어 가야 할 때 <code>/clear</code> 대신 써요. 요약할 때 무엇을 남길지 지시도 붙일 수 있어요. 아래는 저희가 만든 예시예요.</p>
      <pre><code>/compact 수정한 파일과 남은 할 일 위주로</code></pre>
      <p>제 세션에서는 419.4k 토큰이 줄었어요. 다만 공식 문서에 따르면 <code>/compact</code>는 요약할 대화를 한 번 다 읽기 때문에, 컨텍스트가 클 때는 압축 자체도 큰 요청이에요. 이어 갈 필요가 없으면 <code>/clear</code>가 더 싸요.</p>

      <h2>3. /model: 쉬운 작업은 가벼운 모델로</h2>
      <p>인자 없이 <code>/model</code>을 치면 모델 선택창이 열려요. 고른 모델은 다음 세션의 기본값으로도 저장돼요. 이번 세션에만 쓰려면 목록에서 해당 줄에 놓고 <code>s</code>를 누르면 돼요.</p>
      <ul>
        <li>공식 문서 기준으로 대부분의 코딩은 Sonnet으로 충분하고 Opus보다 싸요. Opus는 복잡한 설계 결정이나 여러 단계 추론에 아껴 쓰라고 안내해요.</li>
        <li>아주 단순한 서브에이전트 작업은 서브에이전트 설정에서 <code>model: haiku</code>를 지정할 수 있어요.</li>
        <li>모델 설정 문서에는 계획 모드에서는 <code>opus</code>를, 실행할 때는 <code>sonnet</code>을 쓰는 <code>opusplan</code> 별칭도 있어요.</li>
      </ul>

      <h2>4. 계획 모드: Shift+Tab 또는 /plan</h2>
      <p>릴스에서 "/plan (Shift+Tab)"이라고 한 기능이에요. 둘 다 공식 문서에 있어요. 계획 모드에서는 Claude가 파일을 읽고 조사해서 계획만 쓰고, 소스는 고치지 않아요. 계획을 승인해야 수정이 시작돼요. 방향이 틀린 채로 고쳤다가 다시 하는 비용을 줄여 줘요.</p>
      <ul>
        <li><strong>Shift+Tab</strong>: 권한 모드를 차례로 바꿔요. 몇 번 눌러서 상태 표시줄에 <code>⏸ plan mode on</code>이 보이면 계획 모드예요.</li>
        <li><strong>/plan</strong>: 할 일을 바로 붙여서 계획 모드로 시작해요. 아래는 예시예요.</li>
      </ul>
      <pre><code>/plan 로그인 버그 고치기</code></pre>
      <p>계획을 승인하는 화면에서 Shift+Tab을 누르면 그대로 승인돼요. 계획 모드를 빠져나가려면 먼저 Esc를 누르세요.</p>

      <h2>순서로 쓰면 이렇게</h2>
      <ol>
        <li>한도가 빨리 닳으면 <code>/context</code>로 어디가 큰지 확인</li>
        <li>대화 기록이 크고 같은 작업을 이어 간다면 <code>/compact</code>, 새 작업이면 <code>/clear</code></li>
        <li>단순한 작업은 <code>/model</code>로 가벼운 모델</li>
        <li>큰 기능은 Shift+Tab이나 <code>/plan</code>으로 계획부터</li>
      </ol>
      <p>위 기능들은 한도를 늘려 주는 게 아니라, 같은 한도 안에서 토큰을 덜 쓰게 도와줘요.</p>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://code.claude.com/docs/en/costs" target="_blank" rel="noopener noreferrer">Claude Code Docs, Manage costs effectively</a>: /clear·/compact 사용 시점, /compact가 큰 요청이라는 점, 모델 고르기, Shift+Tab 계획 모드, /context, /usage 사용량 분석</li>
        <li><a href="https://code.claude.com/docs/en/commands" target="_blank" rel="noopener noreferrer">Claude Code Docs, Commands</a>: <code>/clear [name]</code>, <code>/compact [instructions]</code>, <code>/context</code>, <code>/model</code>(<code>s</code>로 이번 세션만), <code>/plan [description]</code>, <code>/rename</code>, <code>/resume</code></li>
        <li><a href="https://code.claude.com/docs/en/permission-modes" target="_blank" rel="noopener noreferrer">Claude Code Docs, Choose a permission mode</a>: 계획 모드 동작, Shift+Tab 순환, <code>⏸ plan mode on</code> 표시, 승인 화면에서의 Shift+Tab</li>
        <li><a href="https://code.claude.com/docs/en/model-config" target="_blank" rel="noopener noreferrer">Claude Code Docs, Model configuration</a>: 모델 별칭(sonnet·opus·haiku·opusplan)</li>
      </ul>
      <p>158.7k·228.7k·419.4k는 공식 수치가 아니라 저희 세션에서 나온 값이에요.</p>
    `,
  },
  {
    slug: "claude-higgsfield-ai-avatar-reel",
    title: "How I Made an AI Avatar Reel with Claude + Higgsfield",
    excerpt:
      "The four steps from the Reel, the full prompt people asked for in the comments, and an honest note on what was done outside the connector: an ElevenLabs voice and a local ffmpeg edit.",
    date: "Nov 15, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "5 min read",
    image: "/images/blog/claude-higgsfield-ai-avatar-reel.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DfwRWEcscwn/" },
    content: `
      <p>This is the written version of the Reel where an AI host explains how she was made. Yes, she's AI. So is the voice. Below are the four steps, the prompt people asked for by commenting "REELS", and what the process really looked like.</p>

      <h2>What you need first</h2>
      <ul>
        <li><strong>A Claude account.</strong> Custom connectors work on Claude, Cowork and Claude Desktop, including the Free plan, but Free is limited to one custom connector.</li>
        <li><strong>A paid Higgsfield subscription.</strong> Higgsfield's help center says an active paid subscription is required to connect, and every generation through the connector uses credits at standard rates. Unlimited plans and free generations only apply on higgsfield.ai itself.</li>
        <li><strong>A way to run ffmpeg for the edit.</strong> We ran the edit on our own Mac. If you use Claude Code, Higgsfield recommends connecting through its CLI instead of the connector URL.</li>
        <li><strong>One clear photo of your character.</strong> Front-facing, good light.</li>
      </ul>

      <h2>The four steps from the Reel</h2>
      <ol>
        <li><strong>In Claude, open Connectors and add Higgsfield.</strong> Claude's help center puts this under <code>Customize &gt; Connectors</code>: click Add, choose Custom, then Web, name it Higgsfield and paste <code>https://mcp.higgsfield.ai/mcp</code>. Higgsfield's own guide calls the path Settings → Connectors → Add custom connector, so the label may differ depending on your app version. Click Connect and sign in to Higgsfield in the window that opens.</li>
        <li><strong>Save one photo as your character.</strong> One image works as a reference. Higgsfield's Soul ID is a different feature: it trains a reusable identity from 20 or more photos and needs a paid plan. Our host isn't a real person. She started as a generated portrait, plus an angles sheet and an upper-body shot.</li>
        <li><strong>Give Claude your topic in one prompt.</strong> The full prompt is below.</li>
        <li><strong>Claude writes the script, makes the clips and edits them.</strong> I review the cut before posting.</li>
      </ol>
      <p>To check the connection, start a new chat and ask "What is my Higgsfield credit balance?" If Claude answers without calling a Higgsfield tool, make sure the connector is switched on for that chat (the "+" menu, then Connectors).</p>

      <h2>The prompt</h2>
      <p>This is the prompt from the DM, unchanged. Fill in the [brackets].</p>
      <pre><code>You're my short-form video producer. Make one 30–40 second vertical Reel (1080x1920) with an AI avatar host, using the Higgsfield connector.

Topic: [your topic, e.g. "3 ways I use Claude to plan my week"]
Audience: [who it's for]
Character: use the photo I attached as the host. Keep the same face, hair and outfit in every clip.
Voice: [describe the voice, e.g. "calm, friendly female, American English"]

Steps:
1. Write the script first and show it to me. Structure: a hook that lands in the first 2 seconds, 3 short steps, one result line, then a CTA. Keep every line under 12 words. No hype words.
2. Wait for my OK on the script.
3. Generate the talking clips with Higgsfield: one clip for the hook, one for the steps, one for the CTA. Lip-sync to the voice. Tell me the credit cost before you generate.
4. Edit with ffmpeg: cut silences longer than 0.4s, add word-chunk captions (large, centered, lower third), a slow zoom on the hook, and hard cuts between clips. Don't end on a black frame.
5. Export reel.mp4 and give me a caption with 3–5 hashtags.

Before you finish, check the video: list each scene with its start time and tell me anything that looks off (face drift, mouth out of sync, captions covering the face).</code></pre>
      <p><strong>One fix for the photo.</strong> Higgsfield's help center says Higgsfield can't read an image you only attach to the Claude chat. Tell Claude you have a photo to use as the character reference, and it opens Higgsfield's upload window. Upload the photo there and wait for the upload to be confirmed before anything is generated.</p>
      <p><strong>Being upfront:</strong> I cleaned this prompt up from how I made the Reel. I haven't yet run it word for word from start to finish.</p>

      <h2>How this Reel was actually made</h2>
      <p>The caption says Claude wrote it, made the clips and edited them. Here are the details:</p>
      <ul>
        <li><strong>Character and talking clips:</strong> made in Claude through the Higgsfield connector. That gave us three talking clips: a hook, a desk scene and a CTA.</li>
        <li><strong>Voice:</strong> an ElevenLabs voice, not Higgsfield. Higgsfield lists voiceover and voice cloning among its connector features, but I haven't tried them.</li>
        <li><strong>Edit:</strong> it didn't happen inside Higgsfield. It ran on my Mac as ffmpeg commands inside small Python scripts. One script tightened the gaps in the voiceover. One built the screen segment with word-by-word captions. The last one trimmed the clips, added captions, a slow zoom on the hook and a result card, joined everything with short transitions and set the final loudness.</li>
        <li><strong>The Claude screens in the Reel</strong> are illustrations we drew for the video, not screen recordings.</li>
        <li><strong>Review:</strong> I reviewed the final cut before posting.</li>
      </ul>

      <h2>Tips before you post</h2>
      <ul>
        <li><strong>Approve the script before anything is generated.</strong> That's where you save credits. Higgsfield has no built-in credit cap, so it suggests telling the agent up front: "Before generating anything, tell me the credit cost and wait for my confirmation." That's an instruction in the chat, not a hard limit.</li>
        <li><strong>Check your balance first.</strong> Ask "What is my current Higgsfield credit balance?" before you start.</li>
        <li><strong>Label it as AI.</strong> Instagram requires a label on photorealistic video and realistic-sounding audio that was generated or altered with AI. Turn on "Add AI label" before you share.</li>
        <li><strong>Use only faces you're allowed to use.</strong> Higgsfield asks that you upload only photos of yourself or of someone who has given permission.</li>
        <li><strong>Watch the whole cut.</strong> Look for face drift, lips out of sync and captions covering the face, the same things the prompt asks Claude to report.</li>
      </ul>

      <h2>Sources (checked Nov 19, 2026)</h2>
      <ul>
        <li><a href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" target="_blank" rel="noopener noreferrer">Claude Help Center, Use connectors to extend Claude's capabilities</a>: Customize &gt; Connectors, adding a custom connector, the per-chat toggle, the Free plan limit of one custom connector.</li>
        <li><a href="https://higgsfield.ai/creator-hub/help-center/integrations/how-do-i-connect-higgsfield-to-ai-agent" target="_blank" rel="noopener noreferrer">Higgsfield Help Center, How do I connect Higgsfield to Claude, ChatGPT, or another AI agent?</a>: MCP URL, paid subscription required, CLI for Claude Code, reference upload window, credit approval tip.</li>
        <li><a href="https://higgsfield.ai/creator-hub/help-center/integrations/what-is-higgsfield-mcp" target="_blank" rel="noopener noreferrer">Higgsfield Help Center, What is Higgsfield MCP?</a>: generations through MCP always use credits, and OAuth means no API key.</li>
        <li><a href="https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-create-and-use-a-soul-id-character" target="_blank" rel="noopener noreferrer">Higgsfield Help Center, How do I create and use a Soul ID character?</a>: 20 to 80 photos, paid plan, permission to use someone's likeness.</li>
        <li><a href="https://help.instagram.com/761121959519495" target="_blank" rel="noopener noreferrer">Instagram Help Center, Label AI content on Instagram</a></li>
      </ul>
    `,
  },
  {
    slug: "skillspector-skill-safety-check",
    lang: "ko",
    title: "스킬 설치 전 점검: NVIDIA SkillSpector로 위험 점수 보기",
    excerpt:
      "릴스 5번 도구의 정체는 NVIDIA SkillSpector예요. 설치·실행 방법, 무엇을 검사하는지, 0~100 점수의 뜻과 한계, Claude Code 공식 문서가 안내하는 설치 전 확인 순서를 정리했어요.",
    date: "Nov 15, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "6 min read",
    image: "/images/blog/skillspector-skill-safety-check.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DfuvmKsMS3A/" },
    content: `
      <p>릴스에서 "처음에 말한 위험을 막아 주는 도구"라고 한 5번의 정체와, 스킬을 설치하기 전에 무엇을 확인하면 좋은지 정리했어요. 5번은 NVIDIA가 공개한 스킬 검사기 <strong>SkillSpector</strong>예요.</p>
      <p>저희는 SkillSpector를 아직 직접 써 보지 않았어요. 아래 내용은 저장소 README와 Claude Code 공식 문서를 열어 확인한 것만 옮겼어요.</p>
      <p>릴스의 1~4번은 한 줄씩만 적을게요.</p>
      <ol>
        <li><strong>FreeLLMAPI</strong> — 여러 무료 AI 모델을 한 주소로 묶고, 한도에 걸리면 다음 모델로 넘겨 줘요.</li>
        <li><strong>animate</strong> — 코드로 짧은 애니메이션을 그려 MP4로 뽑아 줘요.</li>
        <li><strong>Ponytail</strong> — 코드를 덜 쓰게 해서 토큰을 줄여요. JetBrains 측정에서는 비용이 10.3% 줄었어요.</li>
        <li><strong>Agent-Reach</strong> — 유료 API 없이 SNS·커뮤니티 글을 읽어 오는 CLI예요.</li>
      </ol>
      <p>설치 방법과 알고 쓸 점은 <a href="/blog/claude-code-tools-5">Claude Code에 붙여 볼 도구 5가지</a>에 정리했어요.</p>

      <h2>왜 스킬을 아무거나 설치하면 안 될까</h2>
      <ul>
        <li><strong>SkillSpector README가 인용한 연구</strong> — 주요 마켓플레이스 스킬 42,447개 중 분석한 31,132개에서 26.1%가 취약점을 하나 이상 갖고 있었고, 5.2%는 악의적 의도가 의심됐어요. 실행 가능한 스크립트가 있는 스킬은 취약할 가능성이 2.12배 높았다고 해요(Liu et al., 2026).</li>
        <li><strong>Claude Code 공식 문서</strong> — 설치한 플러그인은 내 사용자 권한으로 내 컴퓨터에서 임의의 코드를 실행할 수 있다고 적혀 있어요. 훅은 내 전체 사용자 권한으로 실행되는 셸 명령이고, 훅과 MCP 서버 프로세스는 샌드박스 밖에서 돌아가요. 권한 규칙과 샌드박스는 Claude의 도구 호출에만 적용되고, 플러그인이 스스로 실행하는 코드에는 적용되지 않아요.</li>
        <li><strong>스킬 자체도 명령을 실행할 수 있어요</strong> — 스킬 문서에 따르면 SKILL.md 안의 <code>!</code> 뒤에 명령을 적은 문법은 스킬 내용이 Claude에게 전달되기 전에 셸 명령을 실행해요. 머리말의 <code>allowed-tools</code>는 그 스킬이 실행되는 턴 동안 적힌 도구를 승인 없이 쓰게 해요.</li>
      </ul>
      <p>Claude Code는 플러그인 설치 전에 이런 경고를 보여 줘요(원문 그대로).</p>
      <blockquote><p>Plugins can run code on your computer, with access to your files and shell. Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change. See each plugin's homepage for more information.</p></blockquote>
      <p>정리하면, 플러그인은 내 파일과 셸에 접근해 코드를 실행할 수 있으니 믿을 수 있는지 확인하고 설치하라는 경고예요.</p>

      <h2>SkillSpector 설치와 실행</h2>
      <h3>설치</h3>
      <p>README는 Python 3.12 또는 3.13을 쓰라고 안내해요. 더 새 버전에서는 YARA 의존성을 직접 빌드해야 해서 실패할 수 있다고 적혀 있어요.</p>
      <pre><code># uv로 CLI만 설치
uv tool install --python 3.13 git+https://github.com/NVIDIA/skillspector.git
# 나중에 업데이트: uv tool update skillspector

# pipx를 쓸 때
pipx install --python python3.13 git+https://github.com/NVIDIA/skillspector.git</code></pre>
      <p>Python 없이 Docker로 돌리는 방법도 있어요. 저장소의 Dockerfile로 이미지를 직접 빌드해요.</p>
      <pre><code>docker build -t skillspector .
docker run --rm -v "$PWD:/scan" skillspector scan ./my-skill/ --no-llm</code></pre>

      <h3>실행: 설치하기 전에 먼저 스캔</h3>
      <pre><code># 내려받은 스킬 폴더
skillspector scan ./my-skill/

# SKILL.md 파일 하나
skillspector scan ./SKILL.md

# Git 저장소 주소
skillspector scan https://github.com/user/my-skill

# zip 파일
skillspector scan ./my-skill.zip

# LLM 검토 없이 정적 분석만 (빠르고, 파일 내용을 외부로 보내지 않음)
skillspector scan ./my-skill/ --no-llm

# 결과를 JSON으로 저장
skillspector scan ./my-skill/ --format json --output report.json</code></pre>
      <ul>
        <li><strong>LLM 검토는 기본으로 켜져 있어요</strong> — 켜져 있으면 검사 대상 파일 내용을 설정한 LLM 제공사로 보내요. 제공사는 <code>SKILLSPECTOR_PROVIDER</code>로 골라요(OpenAI, Anthropic, Ollama 등). <code>claude_cli</code>를 고르면 API 키 없이 로컬 <code>claude</code> 로그인 세션을 써요.</li>
        <li><strong>외부로 나가는 정보</strong> — 의존성 취약점 확인(SC4)은 <code>--no-llm</code>이어도 패키지 이름과 버전을 OSV.dev에 조회해요. 파일 내용은 보내지 않아요.</li>
        <li><strong>종료 코드</strong> — 0은 점수 50 이하(SAFE 또는 CAUTION), 1은 50 초과 등 기준에 걸림, 2는 오류예요. 기본값에서는 SAFE와 CAUTION이 둘 다 0이라, 더 엄격하게 하려면 <code>--fail-on-findings</code>를 붙여요.</li>
      </ul>

      <h2>무엇을 검사하고, 점수는 어떻게 읽나</h2>
      <h3>검사 대상</h3>
      <p>README 기준으로 17개 분류, 71개 취약 패턴을 봐요. 프롬프트 주입, 데이터 유출, 권한 상승, 공급망(의존성), 과도한 권한 행사, 출력 처리, 시스템 프롬프트 노출, 메모리 오염, 도구 오용, 폭주 에이전트, 거부 우회, 트리거 남용, 위험한 코드(AST), 오염 데이터 흐름 추적, YARA 시그니처, MCP 최소 권한, MCP 도구 오염이에요.</p>
      <ol>
        <li><strong>1단계 정적 분석</strong> — 정규식 패턴, 파이썬 AST로 exec·eval·subprocess 같은 위험 호출 찾기, OSV.dev로 의존성 CVE 조회. README는 놓치는 게 적은 대신 오탐이 어느 정도 있다고 밝혀요.</li>
        <li><strong>2단계 LLM 의미 분석(선택)</strong> — 맥락과 의도를 평가해요. 1단계에서 나온 결과는 LLM이 동의하든 안 하든 보고서에 그대로 남아요.</li>
      </ol>
      <p>README 예시 보고서에는 환경 변수를 모으는 코드(E2)와 외부 서버로 보내는 코드(E1)가 함께 잡혀 "자격 증명 유출"로 판단하는 사례가 나와요.</p>

      <h3>0~100 점수 읽는 법</h3>
      <p>발견한 문제마다 점수를 더해요. CRITICAL +50, HIGH +25, MEDIUM +10, LOW +5이고, 실행 가능한 스크립트가 있으면 1.3배를 곱해요. README의 구간표는 이래요.</p>
      <ul>
        <li><strong>0~20</strong> — LOW · SAFE</li>
        <li><strong>21~50</strong> — MEDIUM · CAUTION</li>
        <li><strong>51~80</strong> — HIGH · DO NOT INSTALL</li>
        <li><strong>81~100</strong> — CRITICAL · DO NOT INSTALL</li>
      </ul>
      <p>설치 관문으로 쓸 때 README가 권하는 대응은 SAFE는 허용, CAUTION은 사용자에게 경고·확인, DO_NOT_INSTALL은 차단이에요. 얼마나 엄격하게 막을지는 쓰는 쪽이 정할 문제라고 적혀 있어요.</p>

      <h2>한계: 점수가 낮아도 안전 보장은 아니에요</h2>
      <ul>
        <li>README는 SkillSpector를 "샌드박스가 아니라 여러 겹 방어 중 하나"라고 설명해요. 설치 전에 위험한 패턴을 알려 줄 뿐, 그래도 설치한 스킬을 격리하지는 않아요.</li>
        <li>스킬 코드를 실행하지 않는 정적 분석이라 실행 중 동작은 보지 못해요.</li>
        <li>영어가 아닌 내용의 패턴은 놓칠 수 있어요. 이미지 속 글자, 컴파일되거나 암호화된 코드도 분석하지 못해요.</li>
        <li>OSV.dev에 연결이 안 되면 의존성 검사는 작은 내장 목록으로 대신해요.</li>
        <li>LLM 검토 결과는 설정한 모델과 프롬프트에 따라 달라지고, 특정 정확도를 보장하지 않는다고 적혀 있어요. 정적 분석만 한 낮은 점수를 전체 검사의 깨끗한 결과로 착각하지 않도록 MCP 서버 결과에는 검사 방식이 함께 표시돼요.</li>
      </ul>

      <h2>스킬·플러그인 설치 전 확인 순서</h2>
      <p>Claude Code 공식 문서의 "설치 전 플러그인 검토" 단계에 SkillSpector 스캔을 더해 순서로 묶었어요. 순서는 저희가 정리한 예시예요.</p>
      <ol>
        <li><strong>출처 확인</strong> — 셸에서 <code>claude plugin marketplace list</code>로 각 마켓플레이스를 어디서 추가했는지 봐요. 문서는 마켓플레이스 이름이 누가 목록을 내는지 알려 줄 뿐, 각 플러그인이 무엇을 하는지는 알려 주지 않는다고 해요.</li>
        <li><strong>상세 화면 읽기</strong> — 세션에서 <code>/plugin</code>을 열고 플러그인을 고르면 <strong>Will install</strong>에 명령·에이전트·스킬·훅·MCP 서버가 나와요.</li>
        <li><strong>소스 직접 읽기</strong> — 상세 화면은 훅이 있다는 것만 보여 주고 무엇을 실행하는지는 안 보여 줘요. 플러그인 폴더의 <code>hooks/hooks.json</code>, <code>.mcp.json</code>, <code>bin/</code> 안 파일을 읽어요.</li>
        <li><strong>구성 목록 뽑기</strong> — 저장소를 받아 <code>claude --plugin-dir &lt;plugin directory&gt; plugin details &lt;plugin name&gt;</code>를 실행하면 세션을 열지 않고 구성 목록을 출력해요.</li>
        <li><strong>SkillSpector로 스캔</strong> — 받은 폴더나 저장소 주소를 <code>skillspector scan</code>으로 검사하고 점수 구간을 봐요.</li>
        <li><strong>업데이트도 염두에</strong> — 문서에 따르면 마켓플레이스 자동 업데이트가 켜져 있으면 검토한 파일이 나중에 바뀔 수 있어요.</li>
      </ol>
      <p>믿을 수 없게 된 플러그인은 <code>claude plugin uninstall &lt;plugin&gt;</code>에 설치했던 <code>--scope</code>를 붙여 지워요. 문서는 지운 뒤에도 캐시 파일이 14일 동안 남는다고 안내해요. 스킬의 셸 명령 실행 자체를 막고 싶다면 settings에 <code>"disableSkillShellExecution": true</code>를 두는 방법도 문서에 있어요(기본 제공·관리형 스킬은 해당 안 됨).</p>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://github.com/NVIDIA/skillspector" target="_blank" rel="noopener noreferrer">NVIDIA/SkillSpector README</a> — 개요·연구 수치, 설치(uv·pipx·Docker), 실행 명령, 71개 패턴·17개 분류, 2단계 분석, 점수 계산·구간, 종료 코드, 권장 대응, 신뢰 모델·데이터 전송, 한계. 라이선스 Apache-2.0.</li>
        <li><a href="https://code.claude.com/docs/en/plugins/security" target="_blank" rel="noopener noreferrer">Claude Code Docs, Plugin security and trust</a> — 플러그인이 할 수 있는 일, 설치 전 검토 4단계, 설치 전 경고 원문, 제거 방법.</li>
        <li><a href="https://code.claude.com/docs/en/discover-plugins" target="_blank" rel="noopener noreferrer">Claude Code Docs, Install and manage plugins</a> — 설치 전 상세 화면을 읽으라는 안내.</li>
        <li><a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer">Claude Code Docs, Extend Claude with skills</a> — 동적 명령 실행, <code>allowed-tools</code>, <code>disableSkillShellExecution</code>.</li>
        <li><a href="https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/" target="_blank" rel="noopener noreferrer">JetBrains AI Blog, Ponytail 측정</a> — 비용 −10.3%.</li>
      </ul>
    `,
  },
  {
    slug: "claude-code-tools-5",
    lang: "ko",
    title: "Claude Code에 붙여 볼 도구 5가지: 비용·영상·절약·조사·보안",
    excerpt:
      "@nick_saraev 영상에서 본 도구들을 용도별로 정리했어요. FreeLLMAPI, animate, Ponytail, Agent-Reach, SkillSpector가 하는 일과 저장소에 적힌 설치 방법, 알고 쓸 점을 모았어요. 저희는 아직 직접 써 보지 않았어요.",
    date: "Nov 14, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "6 min read",
    image: "/images/blog/claude-code-tools-5.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DftltQzsUsa/" },
    content: `
      <p>릴스에서 소개한 Claude Code 도구 5가지를 글로 풀었어요. 비용·영상·절약·조사·보안 용도별로 하나씩이에요.</p>
      <p><a href="https://www.instagram.com/p/DfPuiYyP4Hy/" target="_blank" rel="noopener noreferrer">@nick_saraev 님 영상</a>에서 본 도구들이고, 저희는 아직 직접 써 보지 않았어요. 아래 내용은 각 저장소 README와 공개 측정 자료를 열어 확인한 것만 옮겼어요. 숫자는 저장소에 적힌 시점 기준이라 바뀔 수 있어요.</p>

      <p><strong>먼저, 플러그인 설치는 두 줄이에요.</strong> Claude Code 플러그인은 <code>/plugin marketplace add</code>로 저장소(마켓플레이스)를 등록한 뒤 <code>/plugin install 이름@마켓</code>으로 설치해요. CLI 도구는 각 저장소 안내를 따르세요.</p>
      <ul>
        <li>공식 문서에 따르면 세션 안에서 <code>/plugin install</code>을 실행하면 바로 설치되지 않고, 플러그인 상세 화면을 열어 내용을 보고 설치 범위를 고르게 해요.</li>
        <li>문서는 플러그인이 훅과 MCP 서버를 실행할 수 있으니 설치 전에 이 화면을 읽으라고 안내해요.</li>
      </ul>

      <h2>1. FreeLLMAPI (비용) — 무료 모델을 한 주소로</h2>
      <p>여러 무료 모델을 한 주소로 묶고, 한도에 걸리면 다음 모델로 자동으로 넘겨 줘요. README 설명으로는 여러 제공사의 무료 사용량을 OpenAI 호환 <code>/v1</code> 주소 하나 뒤에 모으고, 한 제공사가 한도에 걸리면 다음 제공사로 넘기며, 키별 사용량을 추적해 무료 한도 안에 머물게 해요. 제공사 키는 암호화해 저장해요.</p>
      <ul>
        <li><strong>규모</strong> — README에는 제공사 87곳, 무료 모델 엔드포인트 1,313개, 월 약 101억 토큰이라고 적혀 있어요(확인일 기준).</li>
        <li><strong>Claude Code 연결</strong> — Anthropic Messages API 형식(<code>/v1/messages</code>)도 지원해서 Claude Code를 연결할 수 있다고 해요.</li>
        <li><strong>직접 띄우는 서버</strong> — 내 컴퓨터나 서버에 설치해서 쓰는 방식이에요. Node 20 이상, 빠른 설치는 Docker가 필요해요. macOS·Windows 데스크톱 앱도 있어요.</li>
      </ul>
      <pre><code># README의 빠른 설치 (Docker 필요)
curl -fsSL https://freellmapi.co/install.sh | bash

# README의 Claude Code 설정 명령
npx freellmapi setup-claude --url http://localhost:3001 --api-key &lt;unified-key&gt;</code></pre>
      <p>설치 후 <code>http://localhost:3001</code>에서 제공사 키를 넣고, 화면에 나오는 통합 키를 위 명령에 넣어요. README도 bash로 바로 실행하기 전에 스크립트를 먼저 읽어 볼 수 있게 링크를 걸어 두었어요.</p>
      <p><strong>알고 쓸 점</strong>: README의 고지에 따르면 개인 실험·학습용이고 실서비스용이 아니에요. 최상위 모델은 없고, 응답 속도가 들쑥날쑥하며, 보장 수준(SLA)이 없어요. 각 제공사 약관은 이 도구를 거쳐도 그대로 적용돼요. 모델 목록을 당일 받아 보는 유료 옵션(연 19달러)이 있고, 무료 설치는 월 단위 목록을 받아요. 라이선스는 MIT예요.</p>

      <h2>2. animate (영상) — 코드로 그리는 짧은 애니메이션</h2>
      <p>코드로 짧은 애니메이션을 그려 MP4로 뽑아 주는 플러그인이에요. 기본 스타일은 7가지예요. README 설명으로는 캔버스 하나에 그림과 소리를 코드로 만들고, 헤드리스 브라우저와 ffmpeg으로 MP4를 렌더링해요.</p>
      <ul>
        <li><strong>기본 스타일 7가지</strong> — cut paper, crosshatch, riso, sketchbook, math, pixel, isometric. 레퍼런스(영상·이미지·웹페이지)를 주면 맞춰 새 스타일을 만드는 절차도 있어요.</li>
        <li><strong>진행 방식</strong> — 질문 몇 개 → 스토리 확인 → 룩 확인 → 스토리보드 확인을 거친 뒤에 애니메이션을 만들어요. 승인 단계가 세 번 있어요.</li>
        <li><strong>필요한 것</strong> — Claude Code, Node 18 이상, Playwright와 Chromium, PATH에 잡힌 ffmpeg. 내레이션을 넣으려면 Python과 faster-whisper가 필요하고, 목소리는 선택으로 ElevenLabs 커넥터를 써요.</li>
      </ul>
      <pre><code>npm i -g playwright &amp;&amp; npx playwright install chromium

/plugin marketplace add cth9191/animate
/plugin install animate@animate</code></pre>
      <p>README의 사용 예시는 <code>/animate a 45-second history of the bicycle, cut paper</code>처럼 주제·길이·스타일을 한 줄로 적는 형태예요. 라이선스는 MIT예요.</p>

      <h2>3. Ponytail (절약) — 코드를 덜 쓰게 하는 규칙</h2>
      <p>코드를 덜 쓰게 해서 토큰과 비용을 줄여요. README 설명으로는 코드를 쓰기 전에 "꼭 필요한가 → 이미 코드베이스에 있나 → 표준 라이브러리로 되나 → … → 그때 최소한만" 순서로 따져요. 검증·오류 처리·보안·접근성은 줄이지 않는 게 규칙이라고 밝혀요.</p>
      <ul>
        <li><strong>공식 수치(Ponytail 5, README)</strong> — 코드 −53%, 시간 −41%, 비용 −26%, 토큰 −45%. Claude Code에서 39개 작업, Opus 5.5, 작업마다 5회 돌린 결과예요.</li>
        <li><strong>JetBrains 측정</strong> — JetBrains가 80개 작업을 짝지어 비교한 결과 코드 −15%, 비용 −10.3%, 시간 −11%였어요. 측정 당시 광고 수치(코드 −54%, 비용 −20% 등)의 대략 4분의 1에서 절반 수준이었다고 적었어요. 공식 수치보다 작았던 거예요. 품질 차이는 발견되지 않았고, 80쌍으로는 큰 차이만 배제할 수 있다고 덧붙였어요.</li>
        <li><strong>측정 버전 차이</strong> — JetBrains 측정(2026년 7월)은 v4.8.4 기준이고, README 수치는 그 뒤에 나온 Ponytail 5 기준이에요.</li>
        <li><strong>설치 방식이 중요해요</strong> — JetBrains 측정에서 SKILL.md만 넣어 둔 상태로는 10번 중 한 번도 스스로 켜지지 않았어요. 세션 시작 훅으로 규칙을 넣어 주는 플러그인 설치 방식이어야 효과가 있었다고 해요.</li>
      </ul>
      <pre><code>/plugin marketplace add DietrichGebert/ponytail

/plugin install ponytail@ponytail</code></pre>
      <p>README는 두 명령을 따로따로 보내라고 안내해요. 또 GitHub의 <code>DietrichGebert/ponytail</code>나 npm의 <code>@dietrichgebert/ponytail</code>에서만 받으라고 적어 두었어요. 라이선스는 MIT예요.</p>

      <h2>4. Agent-Reach (조사) — 여러 플랫폼 글을 읽어 오는 CLI</h2>
      <p>X·Reddit·YouTube 글을 유료 API 없이 읽어 오는 CLI예요. 일부 플랫폼은 로그인 쿠키가 필요해요. README에는 GitHub, YouTube, Bilibili, 샤오홍슈 등도 함께 적혀 있어요.</p>
      <ul>
        <li><strong>로그인이 필요한 곳</strong> — README 표 기준으로 YouTube·GitHub·웹은 로그인 없이 되고(YouTube 음성 변환은 Groq나 OpenAI 키 필요), Reddit은 선택 채널이며 로그인이 필요해요. X(twitter)·Instagram·Facebook은 실험 단계이고 로그인이 필요하며, 반크롤링이 엄격해 언제든 안 될 수 있다고 적혀 있어요.</li>
        <li><strong>로그인 방식</strong> — 처음 쓰는 사이트는 내 Chrome에 있는 그 사이트 로그인을 전용 브라우저로 복사해 써요. 비밀번호는 읽지 않는다고 해요. 복사되는 건 보통 주 계정이라, 플랫폼이 자동 접근 계정을 제한할 수 있으니 부계정을 쓰라고 권해요.</li>
        <li><strong>읽기 전용</strong> — 검색과 읽기만 하고 글쓰기·댓글·좋아요·메시지는 하지 않는다고 해요.</li>
      </ul>
      <pre><code>Install Agent Reach: https://raw.githubusercontent.com/Panniantong/Agent-Reach/main/docs/install.md</code></pre>
      <p>README는 위 문장을 에이전트에게 보내면 설치·업데이트를 알아서 한다고 안내해요. PyPI에 있는 <code>agent-reach</code> 패키지는 이 프로젝트가 아니니 그쪽으로 설치하지 말라는 경고도 있어요. 쓰기 전에 각 플랫폼 이용약관을 먼저 확인하세요. 라이선스는 MIT예요.</p>

      <h2>5. SkillSpector (보안) — 설치 전에 스킬 검사</h2>
      <p>NVIDIA가 공개한 스킬 검사기예요. 설치 전에 스킬을 훑어 0~100 위험 점수를 매겨요. README에 따르면 정적 분석에 선택형 LLM 검토를 더한 2단계 방식이고, 검사 대상 스킬의 코드는 실행하지 않아요.</p>
      <pre><code>uv tool install --python 3.13 git+https://github.com/NVIDIA/skillspector.git

skillspector scan ./my-skill/</code></pre>
      <p>점수 구간의 뜻, LLM 검토를 끄는 옵션, 한계는 <a href="/blog/skillspector-skill-safety-check">스킬 설치 전 점검: SkillSpector</a>에 따로 정리했어요. 라이선스는 Apache-2.0이에요.</p>
      <p>먼저 써 볼 번호를 릴스 댓글로 남겨 주세요. 많이 나온 것부터 써 보고 결과를 따로 올릴게요.</p>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://www.instagram.com/p/DfPuiYyP4Hy/" target="_blank" rel="noopener noreferrer">@nick_saraev 인스타그램 영상</a> — 도구 목록의 원 출처.</li>
        <li><a href="https://github.com/tashfeenahmed/freellmapi" target="_blank" rel="noopener noreferrer">tashfeenahmed/freellmapi README</a> — 기능, 규모, 빠른 설치, setup-claude, 고지·한계, 라이선스.</li>
        <li><a href="https://github.com/cth9191/animate" target="_blank" rel="noopener noreferrer">cth9191/animate README</a> — 스타일 7가지, 진행 방식, 필요 환경, 설치 명령, 라이선스.</li>
        <li><a href="https://github.com/DietrichGebert/ponytail" target="_blank" rel="noopener noreferrer">DietrichGebert/ponytail README</a> — 작동 방식, Ponytail 5 수치, 설치 명령, 라이선스.</li>
        <li><a href="https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/" target="_blank" rel="noopener noreferrer">JetBrains AI Blog, Ponytail Skill for Claude Code: Does It Really Cut Agent Code by 54%? (2026.07.28)</a> — 80개 작업, 비용 −10.3%, 광고 대비 크기, 자동 활성화 0회.</li>
        <li><a href="https://github.com/Panniantong/Agent-Reach" target="_blank" rel="noopener noreferrer">Panniantong/Agent-Reach README</a>, <a href="https://github.com/Panniantong/Agent-Reach/blob/main/docs/README_en.md" target="_blank" rel="noopener noreferrer">영문 README</a> — 플랫폼 표, 로그인 방식, 읽기 전용, 설치 문장, PyPI 경고.</li>
        <li><a href="https://github.com/NVIDIA/skillspector" target="_blank" rel="noopener noreferrer">NVIDIA/SkillSpector README</a> — 설치·스캔 명령, 0~100 점수, 2단계 분석.</li>
        <li><a href="https://code.claude.com/docs/en/discover-plugins" target="_blank" rel="noopener noreferrer">Claude Code Docs, Install and manage plugins</a> — <code>/plugin install</code> 상세 화면, 설치 전 확인 안내.</li>
      </ul>
    `,
  },
  {
    slug: "claude-code-settings-5",
    lang: "ko",
    title: "인스타 자동화 만들며 정착한 Claude Code 설정 5가지",
    excerpt:
      "CLAUDE.md, 스킬, MCP 등록 범위는 매일 쓰고 있고, 권한 허용 목록과 claude -p는 아직 안 써 봤어요. 다섯 가지를 쓰는 법과 공식 문서 예시로 정리했어요.",
    date: "Nov 14, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "5 min read",
    image: "/images/blog/claude-code-settings-5.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DfsmlNfsiF7/" },
    content: `
      <p>릴스에서 말씀드린 Claude Code 설정 5가지를 글로 정리했어요. 같은 내용을 <a href="https://www.instagram.com/vibestack.ai/reel/Dfq7FONseH3/" target="_blank" rel="noopener noreferrer">슬라이드 영상으로도 올렸어요</a>. 이 글은 두 릴스의 공통 정리본이에요.</p>
      <p>Claude Code를 기본값 그대로 쓰면 매번 같은 설명을 반복하게 돼요. 인스타 콘텐츠 자동화를 Claude Code로 만들면서 정착한 설정이에요. 릴스에서는 앞의 3개는 매일 쓰고, 뒤의 2개는 아직 안 써 봤다고 말씀드렸어요. 이 글을 쓰며 작업 폴더를 다시 확인해 보니 4·5번도 일부는 이미 쓰고 있어서, 해당 항목에 바로잡아 적었어요.</p>

      <h2>1. CLAUDE.md — 프로젝트 기준을 파일로 (매일 쓰는 중)</h2>
      <p>프로젝트 기준을 CLAUDE.md에 적어 두면 세션을 열 때마다 읽고 시작해요. 공식 문서에도 Claude가 세션을 시작할 때마다 이 파일을 읽는다고 나와 있어요.</p>
      <ul>
        <li><strong>초안은 /init으로</strong> — <code>/init</code>을 실행하면 Claude가 코드를 살펴보고 빌드 명령, 테스트 방법, 프로젝트 규칙을 담은 CLAUDE.md 초안을 만들어요. 이미 파일이 있으면 덮어쓰지 않고 개선안을 제안해요.</li>
        <li><strong>직접 추가할 것</strong> — 저는 초안에 톤과 금지 규칙을 직접 적어 둬요. 문서도 Claude가 혼자 알아낼 수 없는 지시를 덧붙이라고 해요. 저희 CLAUDE.md에는 "직접 해본 것만 '내가 해봤다'고 말한다", "과장·공포 마케팅 금지" 같은 원칙이 들어 있어요.</li>
        <li><strong>파일 위치</strong> — 팀과 공유할 프로젝트 기준은 <code>./CLAUDE.md</code>나 <code>./.claude/CLAUDE.md</code>, 모든 프로젝트에 적용할 내 취향은 <code>~/.claude/CLAUDE.md</code>, 버전 관리에 넣지 않을 개인 설정은 <code>./CLAUDE.local.md</code>예요.</li>
      </ul>
      <p>문서는 CLAUDE.md를 강제 설정이 아니라 맥락으로 다룬다고 밝혀요. 여러 단계로 된 절차는 CLAUDE.md보다 스킬로 옮기라고 권해요. 그게 다음 설정이에요.</p>

      <h2>2. 스킬 — 반복하던 지시문을 명령어 하나로 (매일 쓰는 중)</h2>
      <p>매일 반복하던 지시문을 <code>/breakdown</code>, <code>/remix</code> 같은 명령어 하나로 바꿨어요. 저희 작업 폴더에서 실제로 쓰는 스킬이에요.</p>
      <ul>
        <li><code>/breakdown</code> — 수집한 레퍼런스 릴스를 후킹·본문·CTA 구조로 분해해요.</li>
        <li><code>/remix</code> — 분해한 구조를 저희 계정 주제로 바꿔 대본 5안을 만들어요.</li>
      </ul>
      <p>만드는 법은 간단해요. 폴더를 하나 만들고 그 안에 <code>SKILL.md</code>를 둬요. 문서에 따르면 SKILL.md는 두 부분으로 돼 있어요. <code>---</code> 사이의 YAML 머리말(언제 쓸지 알려 주는 <code>description</code>)과, 스킬이 실행될 때 따를 지시문이에요. 폴더 이름이 그대로 명령어가 돼요.</p>
      <pre><code>.claude/skills/breakdown/SKILL.md   # 이 프로젝트에서만 → /breakdown
~/.claude/skills/&lt;이름&gt;/SKILL.md    # 내 모든 프로젝트에서</code></pre>
      <p>저희 스킬은 프로젝트 폴더의 <code>.claude/skills/</code> 아래에 있어요. 문서는 CLAUDE.md와 달리 스킬 본문은 쓸 때만 불러오기 때문에 긴 참고 자료를 넣어도 평소엔 부담이 거의 없다고 설명해요.</p>

      <h2>3. MCP 등록 범위 — 기본(local)은 등록한 폴더에서만 (해결함)</h2>
      <p>기본(local) 범위로 등록하면 등록한 폴더에서만 보여요. 저는 홈 폴더에서 Notion MCP를 등록했다가 프로젝트에서 안 보여서, <code>--scope user</code>로 다시 등록해 해결했어요.</p>
      <pre><code>claude mcp remove notion
claude mcp add --scope user --transport http notion https://mcp.notion.com/mcp</code></pre>
      <p>local·project·user 범위 차이와 다시 설치하기 전에 확인할 것은 <a href="/blog/claude-code-mcp-scope-fix">MCP 연결했는데 안 보일 때</a>에 따로 정리했어요.</p>

      <h2>4. 권한 허용 목록 — settings.json의 allow (바로잡음: 이미 쓰고 있어요)</h2>
      <p>settings.json의 <code>allow</code>에 규칙을 두면 정한 명령을 승인 없이 실행할 수 있어요. 릴스에서는 '아직 안 써 봄'이라고 했는데, 다시 확인해 보니 저희 작업 폴더의 <code>.claude/settings.json</code>에 이미 규칙이 들어 있었어요. 일부만 옮기면 이래요.</p>
      <pre><code>"permissions": {
  "allow": [
    "Bash(npm run collect*)",
    "Bash(ffprobe *)",
    "Edit(./drafts/**)"
  ],
  "deny": [
    "Read(./.env)"
  ]
}</code></pre>
      <p>수집 명령과 영상 정보 확인은 묻지 않고 실행하고, 토큰이 든 <code>.env</code> 파일은 읽지 못하게 막아 둔 설정이에요. 아래는 공식 문서 예시예요.</p>
      <pre><code>{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)"
    ],
    "deny": [
      "Bash(git push *)"
    ]
  }
}</code></pre>
      <p>문서 예시 설명: npm 스크립트와 git commit은 묻지 않고 실행하고, <code>git push</code>로 시작하는 명령은 거부해요.</p>
      <ul>
        <li><strong>규칙 형식</strong> — <code>Tool</code> 또는 <code>Tool(지정자)</code>. <code>Bash(npm run build)</code>는 그 명령 하나만, <code>Bash(npm run *)</code>는 <code>npm run</code>으로 시작하는 명령 전체와 맞아요. <code>*</code>는 하위 명령 뒤에 두라고 해요.</li>
        <li><strong>평가 순서</strong> — deny → ask → allow 순서로 보고, 먼저 맞는 규칙이 결과를 정해요. 넓은 deny 규칙에 걸리면 더 좁은 allow 규칙이 있어도 막혀요.</li>
        <li><strong>확인 방법</strong> — Claude Code 안에서 <code>/permissions</code>를 열면 모든 규칙과 그 규칙이 들어 있는 settings.json 파일을 볼 수 있어요.</li>
        <li><strong>프로젝트 설정</strong> — 프로젝트의 <code>.claude/settings.json</code>에 있는 allow 규칙은 그 폴더의 작업 공간 신뢰 창을 수락한 뒤에 적용돼요.</li>
        <li>문서는 CLAUDE.md에 쓴 지시는 Claude가 시도하는 일에 영향을 줄 뿐, 허용 여부는 바꾸지 않는다고 해요. 권한은 이 규칙이나 권한 모드로 정해요.</li>
      </ul>

      <h2>5. claude -p — 대화 없이 실행 (예약 실행은 아직)</h2>
      <p><code>claude -p</code>는 대화 없이 실행되는 모드라 cron 같은 스케줄러에 걸 수 있어요. 정확히 말하면, 저희 작업실 화면의 버튼이 뒤에서 <code>claude -p "/breakdown …"</code>처럼 스킬을 돌리는 데는 이미 쓰고 있어요. cron 같은 예약 실행에 걸어 보지 않은 거예요. 아래는 공식 문서 예시예요.</p>
      <pre><code># 질문 하나를 던지고 답을 출력
claude -p "What does the auth module do?"

# 쓸 도구를 미리 허용해서 묻지 않고 진행
claude -p "Run the test suite and fix any failures" \\
  --allowedTools "Bash,Read,Edit"</code></pre>
      <ul>
        <li>성공하면 종료 코드 0, 실패하면 0이 아닌 코드로 끝나서 스크립트에서 결과에 따라 갈라 쓸 수 있어요.</li>
        <li>대화형 세션이 아니라 승인 창에 답할 사람이 없어요. 문서에 따르면 승인이 필요한 호출은 따로 허용해 두지 않으면 거부돼요. 그래서 <code>--allowedTools</code>나 4번의 allow 규칙과 같이 써요.</li>
        <li>예약 작업처럼 아무도 승인 창에 답할 수 없을 때는 <code>--permission-prompts none</code>을 쓰라고 안내해요(v2.1.259 이상).</li>
        <li>주의할 점: <code>-p</code> 세션은 작업 공간 신뢰 창과 서버별 승인 창을 띄우지 않아요. 프로젝트의 <code>.claude/settings.json</code> 훅과 <code>.mcp.json</code> 서버도 그대로 불러와요. 믿을 수 있는 폴더에서만 돌리세요.</li>
      </ul>
      <p>cron 등록 방법 자체는 Claude Code 문서가 아니라 운영체제 기능이라 여기서는 다루지 않았어요.</p>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener noreferrer">Claude Code Docs, How Claude remembers your project</a> — 세션 시작 때 CLAUDE.md 읽기, <code>/init</code> 초안 생성, 파일 위치별 범위.</li>
        <li><a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer">Claude Code Docs, Extend Claude with skills</a> — SKILL.md 구조, 폴더 이름이 명령어, 개인·프로젝트 스킬 위치.</li>
        <li><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener noreferrer">Claude Code Docs, Connect Claude Code to tools via MCP</a> — local 기본값, 범위별 불러오는 곳.</li>
        <li><a href="https://code.claude.com/docs/en/permissions" target="_blank" rel="noopener noreferrer">Claude Code Docs, Configure permissions</a> — allow/ask/deny, 규칙 문법과 와일드카드, 예시 설정, <code>/permissions</code>, 작업 공간 신뢰.</li>
        <li><a href="https://code.claude.com/docs/en/headless" target="_blank" rel="noopener noreferrer">Claude Code Docs, Run Claude Code programmatically</a> — <code>claude -p</code>, <code>--allowedTools</code>, 종료 코드, <code>--permission-prompts none</code>, 신뢰 창 없음.</li>
      </ul>
    `,
  },
  {
    slug: "claude-photo-check-3-prompts",
    lang: "ko",
    title: "프롬프트 3개로 하는 '내 사진 정리': 찾고, 모으고, 내리기",
    excerpt:
      "내 사진이 어디에 올라가 있는지 Claude in Chrome으로 점검하는 프롬프트 3개를 정리했어요. 준비 조건, 알아둘 한계, 삭제 요청을 어디로 보내야 하는지까지 공식 도움말 기준으로 적었어요.",
    date: "Nov 13, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "4 min read",
    image: "/images/blog/claude-photo-check-3-prompts.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DfrF3AVsXGy/" },
    content: `
      <p>릴스에서 소개한 '프롬프트 3개로 하는 내 사진 정리'를 글로 정리했어요. 찾고(특징 정리), 모으고(링크 수집), 내리기(삭제 요청서) 순서예요.</p>
      <p>이 순서는 <a href="https://www.instagram.com/p/DfUhfIwKYka/" target="_blank" rel="noopener noreferrer">@mavgpt 님 영상</a>에서 본 방법이고, 저희는 아직 직접 해 보지 않았어요. 준비 조건과 한계는 Claude·Google 공식 도움말을 열어 확인한 것만 적었어요.</p>

      <h2>이런 분께</h2>
      <p>단체 사진, 행사 사진, 여행 사진처럼 남이 올린 사진 속 나까지 한 번에 점검해 보고 싶은 분께 맞아요. 꼭 내 사진으로만 쓰세요. 다른 사람을 찾는 용도가 아니에요.</p>

      <h2>준비: Claude in Chrome 연결하기</h2>
      <p>Claude in Chrome은 Claude가 웹사이트를 읽고, 클릭하고, 이동할 수 있게 해 주는 Chrome 확장 프로그램이에요.</p>
      <ul>
        <li><strong>요금제</strong> — 유료 요금제(Pro, Max, Ultra, Team, Enterprise)에서만 써요. 무료 요금제는 쓸 수 없어요. Enterprise는 관리자가 켜 줘야 해요.</li>
        <li><strong>설치</strong> — Google Chrome에서 Chrome 웹 스토어의 Claude 확장을 "Chrome에 추가"로 설치하고, Claude 계정으로 로그인한 뒤 고정하고 필요한 권한을 허용해요. 다른 Chromium 기반 브라우저나 모바일에서는 지원하지 않아요.</li>
        <li><strong>데스크톱 앱에서 연결</strong> (도움말의 영문 메뉴 기준) — 왼쪽 아래 이니셜 → Settings → Customize → Connectors → Claude in Chrome의 Configure → 켜기. 확장이 없으면 이때 내려받아요. 한국어 화면의 메뉴 이름은 확인하지 못했어요.</li>
        <li><strong>대화마다 켜기</strong> — 연결하면 채팅의 커넥터 메뉴에 Claude in Chrome이 생기는데, 기본으로 꺼져 있어서 대화마다 직접 켜야 해요.</li>
      </ul>
      <p>도움말은 Claude in Chrome이 안전 분류기를 갖췄지만 여전히 위험이 있다고 밝히고, 쓰기 전에 '안전하게 사용하기' 안내를 읽으라고 권해요. 브라우저 확장의 사이드 패널에서 바로 쓸 수도 있어요.</p>

      <h2>프롬프트 3개</h2>
      <h3>① 특징 정리</h3>
      <p>내 사진을 올리고, 사진 속 내 특징을 항목별로 정리해 달라고 해요.</p>
      <pre><code>이 사진 속 나의 특징을 헤어·옷·배경으로 나눠 목록으로 만들어 줘</code></pre>
      <h3>② 링크 모으기</h3>
      <p>Claude in Chrome을 켠 같은 대화에서, 사진이 올라간 페이지를 찾아 링크를 모아 달라고 해요.</p>
      <pre><code>Chrome으로 이 사진을 역이미지 검색해서 나온 페이지 링크를 모아 줘</code></pre>
      <h3>③ 삭제 요청서</h3>
      <p>모은 링크마다, 그 사이트 형식에 맞춘 삭제 요청서를 써 달라고 해요.</p>
      <pre><code>링크마다 사이트 형식에 맞는 삭제 요청서를 써 줘</code></pre>
      <p>요청서는 보내기 전에 직접 읽고 고쳐서, 내가 보내요. 아래 "삭제 요청은 어디로"를 같이 보세요.</p>

      <h2>알아둘 점: 결과는 다를 수 있어요</h2>
      <ul>
        <li><strong>사람 식별은 하지 않아요</strong> — Anthropic Vision 문서에 따르면 Claude는 이미지 속 사람의 이름을 밝히는 데 쓸 수 없고, 요청하면 거절해요. 그래서 영상에서 본 결과가 그대로 나오지 않을 수 있어요.</li>
        <li><strong>내 사진으로만</strong> — 남의 사진을 넣어 그 사람을 찾는 데 쓰지 마세요.</li>
        <li><strong>찾은 링크는 직접 확인</strong> — 역이미지 검색 결과가 정말 내 사진인지, 어떤 사이트인지 눈으로 보고 판단하세요.</li>
        <li><strong>브라우저를 맡기는 일</strong> — Claude가 내 브라우저에서 읽기·클릭·입력·이동을 하게 돼요. 도움말은 안전 분류기가 있어도 위험이 남아 있다며 사용 전 안전 안내를 읽으라고 해요.</li>
      </ul>

      <h2>삭제 요청은 어디로 보내나</h2>
      <p>Google 도움말 기준으로, 두 곳은 따로 요청해야 해요.</p>
      <ol>
        <li><strong>사진이 올라간 사이트(원본)</strong> — 무언가를 내리려면 보통 사이트 주인에게 연락해야 해요. Google에서 찾았더라도 Google이 그 사이트를 소유한 게 아니에요. 방법은 사이트의 "Contact us" 링크나 이메일, Google에서 <code>whois www.example.com</code>으로 검색해 연락처 찾기, 연락이 안 되면 사이트 호스팅 업체에 연락하기예요.</li>
        <li><strong>Google 검색 결과</strong> — 주소, 전화번호, 이메일, 신분증 번호, 서명이나 신분증 사진, 의료 기록 같은 개인 식별 정보는 Google 검색 결과에서 빼 달라고 요청할 수 있어요. 요청서에는 해당 페이지 URL을 적어야 하고, 적은 URL만 검토해요. 연락처 정보는 '나와 관련된 결과(Results about you)' 기능으로 찾고 요청할 수 있어요.</li>
      </ol>
      <ul>
        <li>Google은 검색 결과에서만 지울 수 있어요. 검색에서 빠져도 페이지는 남아 있어서 링크, SNS, 다른 검색엔진으로 여전히 찾을 수 있어요. 그래서 원본 사이트에 요청하는 게 가장 확실하다고 해요.</li>
        <li>사이트 주인이 이미 내용을 고쳤다면, 오래된 검색 결과를 새로 고쳐 달라고 Google에 요청할 수 있어요.</li>
        <li>사진 자체가 Google 검색 삭제 대상인지는 정책에 따라 달라요. 도움말에 나온 대상은 개인 식별 정보·신상 공개(doxxing), 미성년자 이미지, 개인적인 성적 콘텐츠 등이에요.</li>
      </ul>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://www.instagram.com/p/DfUhfIwKYka/" target="_blank" rel="noopener noreferrer">@mavgpt 인스타그램 영상</a> — 프롬프트 3단계 방법의 출처.</li>
        <li><a href="https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome" target="_blank" rel="noopener noreferrer">Claude Help Center, Get started with Claude in Chrome</a> — 유료 요금제 조건, 설치 순서, 데스크톱 앱 연결 경로, 대화마다 켜기, 안전 주의.</li>
        <li><a href="https://platform.claude.com/docs/en/build-with-claude/vision" target="_blank" rel="noopener noreferrer">Claude Platform Docs, Vision</a> — "Claude cannot be used to name people in images and refuses to do so."</li>
        <li><a href="https://support.google.com/websearch/answer/9673730" target="_blank" rel="noopener noreferrer">Google Search Help, Remove my private info from Google Search</a> — 삭제 요청 가능한 정보, URL 필수, Results about you, 검색에서만 삭제.</li>
        <li><a href="https://support.google.com/websearch/answer/9109" target="_blank" rel="noopener noreferrer">Google Search Help, Contact a website owner</a> — 사이트 주인 연락 방법(Contact us, Whois, 호스팅 업체).</li>
        <li><a href="https://support.google.com/websearch/answer/3143948" target="_blank" rel="noopener noreferrer">Google Search Help, Request to have your personal content removed from Google Search</a> — 개인 콘텐츠 삭제 정책 종류.</li>
      </ul>
    `,
  },
  {
    slug: "lemo-opuscar-animation-video",
    lang: "ko",
    title: "Lemo Opuscar로 애니메이션 영상 만들기: 설치부터 내 스타일까지",
    excerpt:
      "Claude Code 스킬 Lemo Opuscar로 코드로 그린 애니메이션 영상을 만드는 순서를 정리했어요. 스타일 수, 설치 명령, 준비물, 걸리는 시간과 비용, 라이선스를 README 기준으로 바로잡았어요.",
    date: "Nov 13, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "5 min read",
    image: "/images/blog/lemo-opuscar-animation-video.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/DfqvM3tMA6s/" },
    content: `
      <p>릴스에서 말씀드린 'Lemo Opuscar로 애니메이션 영상 만들기'를 글로 정리했어요. <a href="https://www.instagram.com/p/DfMPGCguhRQ/" target="_blank" rel="noopener noreferrer">@nick_saraev 님 영상</a>에서 본 방법이고, 저도 설치해서 화이트보드·카툰·수채화·다큐멘터리 스타일로 만들어 봤어요.</p>
      <p>릴스 영상과 처음 올린 캡션에는 '10분', '100% 무료' 같은 표현이 있었는데, 저장소 README를 다시 확인해 보니 맞지 않는 부분이 있어서 이 글과 캡션을 README 기준으로 바로잡았어요.</p>

      <h2>Lemo Opuscar가 하는 일</h2>
      <p>Lemo Opuscar는 코딩 에이전트에게 영상 스타일을 주는 Claude Code 스킬이에요. README 첫 줄은 "스타일을 고르고 이야기를 가져오면, 에이전트가 영상을 전부 코드로 만든다"예요.</p>
      <ul>
        <li><strong>스타일 수</strong> — README 기준 99가지, 15개 분류예요. 2026년 11월 12일에 33가지가 추가돼 99가지가 됐어요. 릴스에서 말한 66가지는 추가 전 숫자예요.</li>
        <li><strong>만드는 방식</strong> — 캔버스·WebGL 페이지를 프레임 단위로 렌더링하고, 무료 샘플 라이브러리로 음악을 만들고, TTS로 내레이션을 넣어요. TECHNIQUE.md에 따르면 효과음도 사건 시점에 맞춰 코드로 만들고, ffmpeg으로 합쳐요. 영상 생성 모델이나 스톡 영상은 쓰지 않아요.</li>
        <li><strong>스타일 예</strong> — Whiteboard Explainer, Watercolor Brush, Chalkboard, Ukiyo-e, Neon Tubes 같은 이름이 있고, 카툰(Cartoons)·다큐멘터리(Edit &amp; Documentary) 분류도 있어요. 갤러리에서 스타일마다 데모 영상을 볼 수 있어요.</li>
        <li><strong>권장 모델</strong> — Claude용으로 만들었고 Fable·Opus·Sonnet 모두 된다고 해요. Claude Code에서 <code>/effort high</code>로 설정하라고 안내해요. 다른 모델은 스타일을 잘 재현하지 못할 수 있대요.</li>
      </ul>

      <h2>시작 전에 알아둘 것 (캡션 바로잡기)</h2>
      <ul>
        <li><strong>시간</strong> — 10분이 아니에요. README는 영상 한 편에 에이전트가 30~60분 정도 걸리고, 토큰도 꽤 든다고 적었어요.</li>
        <li><strong>비용</strong> — 스킬 자체는 공개돼 있지만, Claude Code를 쓰려면 Pro·Max·Ultra·Team·Enterprise 또는 Console 계정이 필요해요. 무료 claude.ai 요금제에는 Claude Code가 없어요. 토큰을 많이 쓰니 요금제 한도나 API 비용이 들어요.</li>
        <li><strong>준비물</strong> — 편집 프로그램을 다루지는 않지만 실제 코드와 도구가 내 컴퓨터에서 돌아가요. Node 20 이상, ffmpeg 7 이상, Python 3.11 이상(또는 uv)은 직접 설치해 둬야 해요. 나머지는 에이전트가 설치해요. Ubuntu 24.04 기본 ffmpeg 6.1은 너무 오래된 버전이라고 해요.</li>
        <li><strong>이미지 생성 도구가 필요한 스타일</strong> — Manga Panels, Text Flash Cuts, Comic History Cartoon 3가지는 캐릭터를 그릴 이미지 생성 도구(로그인된 Codex CLI 등)를 따로 가져와야 해요. 없으면 이 3가지는 시작할 수 없고, 나머지는 필요 없어요.</li>
        <li><strong>기본 출력</strong> — 1920×1080, 24fps예요(스타일에 따라 30fps). 다른 크기는 요청하면 돼요.</li>
        <li><strong>목소리</strong> — 기본 TTS는 Kokoro(영어, 오프라인)이고 중국어는 edge-tts(온라인)를 써요. 한국어 내레이션에 대한 안내는 README·TECHNIQUE.md에서 확인하지 못했어요.</li>
      </ul>

      <h2>설치하고 만드는 순서</h2>
      <h3>설치: 명령어 두 줄</h3>
      <p>터미널에서 실행해요(README 원문).</p>
      <pre><code>claude plugin marketplace add lemomo-ai/lemo-opuscar
claude plugin install lemo-opuscar@lemolab</code></pre>
      <p>처음 쓸 때 가이드·도구·스타일 프롬프트를 <code>~/lemo-opuscar</code>에 내려받고, 영상 프로젝트는 Claude Code를 시작한 폴더에 만들어져요. 어디서 시작할지 모르겠으면 스킬을 설치한 뒤 <code>/lemo-opuscar:lemo-opuscar</code>만 입력하라고 해요. 언어를 묻고, 무엇을 할지 고르게 해요.</p>
      <pre><code># 업데이트 (그다음 Claude Code 재시작)
claude plugin marketplace update lemolab &amp;&amp; claude plugin update lemo-opuscar@lemolab

# 제거 (그다음 ~/lemo-opuscar 폴더 삭제)
claude plugin uninstall lemo-opuscar@lemolab</code></pre>

      <h3>만들기: 스타일 고르고 말하듯 적기</h3>
      <ol>
        <li><strong>스타일 고르기</strong> — 갤러리에서 그림 느낌으로 찾거나, 설명 영상·출시·뉴스 같은 용도로 찾아요. 저는 화이트보드, 카툰, 수채화, 다큐멘터리로 만들어 봤어요.</li>
        <li><strong>아이디어를 한 문장으로</strong> — 스타일 이름과 하고 싶은 이야기를 평소 말하듯 적어요. 길이, 내레이터, 내 사진이나 음악을 덧붙여도 돼요.</li>
        <li><strong>처음에 한 번 묻는 것에 답하기</strong> — 주제에서 정하지 못한 점, 내 목소리·음악·자료가 있는지, 스토리보드를 먼저 볼지 물어봐요. 스토리보드를 보겠다고 하면 실제 스타일로 핵심 장면을 한 번 보여 주고 멈춰요.</li>
        <li><strong>완성 영상 받기</strong> — 에이전트가 DIRECTOR.md(연출), TECHNIQUE.md(제작), 스타일별 STYLE.md를 읽고 작은 스튜디오처럼 작업해요.</li>
      </ol>
      <p>README 예시 문장이에요.</p>
      <pre><code>Make a 45-second film in the watercolor style about the coffee farm my family runs. Warm female narrator.</code></pre>
      <p>저는 기획서처럼 다듬지 않고 떠오른 대로 적었는데 애니메이션이 나왔어요. 예를 들면 "동네 빵집 하루를 수채화로 40초" 정도로요(저희가 만든 예시 문장). 대본과 목소리까지 장면별로 스토리보드에 짜여 나왔어요.</p>

      <h2>내 브랜드 스타일 만들기 (아직 안 해 봤어요)</h2>
      <p>브랜드 색, 로고, 글꼴, 캐릭터, 채널 톤으로 기존 스타일을 내 것으로 바꾸거나 빈 페이지에서 새로 만들 수 있어요. 마음에 드는 그림이나 영상을 보여 주면 Claude가 가장 가까운 기존 스타일을 기반으로 고르고 이유를 알려 줘요. 저는 이 기능은 아직 써 보지 않았고, 아래는 README에 적힌 순서예요.</p>
      <ol>
        <li><strong>질문 하나씩 계획</strong> — 용도, 플랫폼(세로 피드는 1080×1920 등), 브랜드 요소, 바꿀 점, 이름을 하나씩 정해요. 기존 스타일을 바꿀 때는 한 번에 최대 5가지까지예요.</li>
        <li><strong>요약 확인</strong> — 바꾸기 전·후를 보고, 동의하기 전에는 아무것도 저장하지 않아요.</li>
        <li><strong>스타일 프레임 한 장</strong> — 실제 코드로 그린 한 장을 원본과 나란히 보여 줘요.</li>
        <li><strong>15~30초 데모 영상</strong> — 음악·효과음까지 넣어 확인해요.</li>
        <li><strong>저장</strong> — 마음에 들면 <code>~/lemo-my-styles/&lt;name&gt;/</code>에 보관해 다음 영상에서 이름으로 불러 써요. 업데이트나 재설치로 지워지지 않아요.</li>
      </ol>
      <p>"알아서 새 스타일을 만든다"기보다는, 질문에 답하고 단계마다 확인하며 함께 만드는 방식이에요.</p>

      <h2>라이선스: 무엇이 자유롭고 무엇이 제한되나</h2>
      <ul>
        <li><strong>코드</strong> — MIT.</li>
        <li><strong>문서</strong>(STYLE.md, DIRECTOR.md, TECHNIQUE.md 등 모든 마크다운과 이미지 생성 프롬프트) — CC BY-NC 4.0. 비상업적 공유·변경은 출처 표기 조건으로 가능하고, 내 영상(상업·클라이언트 영상 포함)을 만드는 데 쓰는 건 추가로 허용해요. 문서 자체를 팔거나 상업 제품에 넣으려면 별도 상업 라이선스가 필요해요.</li>
        <li><strong>데모 영상·스틸</strong> — CC BY 4.0.</li>
        <li><strong>내가 만든 영상</strong> — 내 것이고, 상업용도 되며 출처 표기도 필수가 아니에요. 영상에 쓴 외부 자료는 각자의 라이선스를 따라요.</li>
      </ul>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://www.instagram.com/p/DfMPGCguhRQ/" target="_blank" rel="noopener noreferrer">원 영상 (인스타그램)</a> — 방법의 출처.</li>
        <li><a href="https://github.com/lemomo-ai/lemo-opuscar" target="_blank" rel="noopener noreferrer">lemomo-ai/lemo-opuscar</a>, <a href="https://github.com/lemomo-ai/lemo-opuscar/blob/main/README.md" target="_blank" rel="noopener noreferrer">README.md</a> — 99가지 스타일·15개 분류, 설치·업데이트·제거 명령, 진행 방식, 30~60분·토큰, 준비물, 이미지 생성 필요 스타일, 출력 규격, 내 스타일 만들기 5단계, 라이선스.</li>
        <li><a href="https://github.com/lemomo-ai/lemo-opuscar/blob/main/TECHNIQUE.md" target="_blank" rel="noopener noreferrer">TECHNIQUE.md</a> — 프레임 렌더링·TTS·음악·효과음·ffmpeg 파이프라인, 의존성, 음성 패키지(Kokoro·edge-tts).</li>
        <li><a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer">Claude Code Docs, Advanced setup</a> — Pro·Max·Ultra·Team·Enterprise·Console 계정 필요, 무료 요금제 미포함.</li>
      </ul>
    `,
  },
  {
    slug: "claude-code-mcp-scope-fix",
    lang: "ko",
    title: "MCP 연결했는데 안 보일 때: 원인은 등록 범위였어요",
    excerpt:
      "Notion MCP를 연결했는데 프로젝트 폴더에서 안 보였던 이유와, --scope user로 다시 등록해 해결한 두 줄 명령. local·project·user 범위 차이와 다시 설치하기 전에 확인할 것을 공식 문서 기준으로 정리했어요.",
    date: "Nov 12, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "4 min read",
    image: "/images/blog/claude-code-mcp-scope-fix.png",
    // No tags: tag matching would drop an English "Our X review" callout mid-article.
    tags: [],
    reel: { url: "https://www.instagram.com/vibestack.ai/reel/Dfn0NW5sb85/" },
    content: `
      <p>릴스에서 말씀드린 'MCP를 연결했는데 프로젝트에서 안 보였던 일'을 글로 정리했어요. 원인, 해결 명령 두 줄, 다시 설치하기 전에 확인할 것까지 Claude Code 공식 문서와 대조해 적었어요.</p>

      <h2>무슨 일이 있었나</h2>
      <p>저는 Claude Code에 Notion MCP를 분명히 연결했어요. 그런데 작업하는 프로젝트 폴더에서 Claude Code를 열면 Notion이 보이지 않았어요.</p>
      <p>답은 등록할 때 터미널에 이미 나와 있었어요. 등록 결과에 <code>to local config</code>, 그리고 <code>[project: /Users/(내 계정 이름)]</code>가 찍혀 있었거든요. 기본값(local) 범위로, 그것도 홈 폴더에 등록된 거예요. 그래서 홈 폴더가 아닌 프로젝트 폴더에서는 안 보였던 거죠.</p>

      <h2>원인: MCP 등록 범위는 세 가지예요</h2>
      <p>공식 문서에 따르면 MCP 서버는 세 가지 범위(scope)로 등록할 수 있고, 범위에 따라 어느 프로젝트에서 불러오는지, 팀과 공유되는지가 달라져요.</p>
      <ul>
        <li><strong>local (기본값)</strong> — 등록한 그 프로젝트에서만 불러와요. 나만 쓰고 팀과 공유되지 않아요. <code>~/.claude.json</code> 안에 그 프로젝트 경로 아래로 저장돼서, 다른 프로젝트에서는 보이지 않아요.</li>
        <li><strong>project</strong> — 현재 프로젝트에서만 불러오지만 프로젝트 루트의 <code>.mcp.json</code>에 저장돼요. 이 파일을 버전 관리에 올리면 팀 전체가 같은 서버를 써요. 보안상 대화형 세션에서는 쓰기 전에 승인을 물어요.</li>
        <li><strong>user</strong> — 내 컴퓨터의 모든 프로젝트에서 불러와요. 팀과 공유되지 않고, <code>~/.claude.json</code>에 저장돼요.</li>
      </ul>
      <p>문서에는 범위를 따로 정하지 않으면 명령이 local 범위로 기록된다고 적혀 있어요. 따로 지정하려면 <code>--scope project</code>나 <code>--scope user</code>를 붙여요. 저는 아무 옵션 없이 홈 폴더에서 등록했으니 홈 폴더 전용이 된 거예요.</p>

      <h2>해결: 지우고 user 범위로 다시 등록</h2>
      <pre><code>claude mcp remove notion
claude mcp add --scope user --transport http notion https://mcp.notion.com/mcp</code></pre>
      <p><code>--scope user</code>로 등록하면 모든 폴더에서 보여요. 저는 이 두 줄로 해결했어요.</p>
      <ul>
        <li>공식 문서의 Notion 연결 예시는 <code>claude mcp add --transport http notion https://mcp.notion.com/mcp</code>예요. 여기에 범위 옵션만 더한 거예요.</li>
        <li>문서에 따르면 원격 서버를 지우면 Claude Code가 그 서버용으로 저장해 둔 OAuth 토큰도 함께 지워요. 다시 등록한 뒤에는 로그인을 다시 해야 할 수 있어요. 문서는 OAuth 인증이 필요한 원격 서버는 Claude Code 안에서 <code>/mcp</code>로 인증하라고 안내해요.</li>
        <li>명령을 메모장 등에서 복사할 때 <code>--</code>가 긴 대시(—) 하나로 바뀌지 않았는지 보세요. 하이픈 두 개여야 해요.</li>
      </ul>

      <h2>다시 설치하기 전에 확인할 것</h2>
      <p>연결했는데 안 보이면, 다시 설치하기 전에 범위부터 확인해 보세요. 공식 문서에 나온 방법만 모았어요.</p>
      <ol>
        <li><strong>등록할 때 나온 메시지</strong> — <code>claude mcp add</code>는 성공하면 <code>Added ...</code> 줄을 출력해요. 제 경우엔 여기에 <code>to local config</code>와 등록된 폴더 경로가 함께 찍혀 있었어요.</li>
        <li><strong>안 보이는 그 폴더에서 목록 보기</strong> — 프로젝트 폴더에서 아래 명령으로 등록된 서버와 상태를 봐요. 문서는 연결됐는지 확인하려면 <code>claude mcp get &lt;name&gt;</code>을 실행하라고 안내해요.
          <pre><code># 등록된 서버 전체 목록
claude mcp list

# 특정 서버 상세
claude mcp get notion

# (Claude Code 안에서) 서버 상태 확인
/mcp</code></pre>
        </li>
        <li><strong>저장된 파일 보기</strong> — local 범위는 <code>~/.claude.json</code>의 <code>projects</code> 아래, 등록한 폴더 경로 항목에 들어가요. project 범위는 프로젝트 루트의 <code>.mcp.json</code>, user 범위는 <code>~/.claude.json</code>이에요.</li>
        <li><strong>같은 이름이 여러 범위에 있는지</strong> — 같은 이름의 서버를 주소를 달리해 여러 범위에 등록하면 <code>claude mcp list</code>와 <code>/mcp</code>에 충돌 경고가 떠요. 문서는 남길 것만 두고 나머지는 <code>claude mcp remove &lt;name&gt; --scope &lt;scope&gt;</code>로 지우라고 해요.</li>
      </ol>
      <p>MCP의 local 범위는 프로젝트 폴더의 <code>.claude/settings.local.json</code>과는 다른 개념이에요. 이름이 비슷해서 헷갈리기 쉬운데, 문서에도 MCP local 서버는 홈 폴더의 <code>~/.claude.json</code>에 저장된다고 따로 적혀 있어요.</p>

      <h2>어떤 범위로 등록할까</h2>
      <ul>
        <li><strong>여러 프로젝트에서 쓰는 내 도구</strong>(Notion처럼) — user. 문서도 여러 프로젝트에서 자주 쓰는 서비스에 맞는다고 해요.</li>
        <li><strong>팀이 같이 써야 하는 서버</strong> — project. <code>.mcp.json</code>을 저장소에 올려요.</li>
        <li><strong>이 프로젝트에서만 시험해 볼 서버, 버전 관리에 넣기 싫은 인증 정보가 있는 서버</strong> — local.</li>
      </ul>
      <p>같은 서버가 여러 곳에 정의돼 있으면 Claude Code는 우선순위가 가장 높은 정의 하나만 써요. 순서는 local → project → user예요. 항목 내용이 범위끼리 합쳐지지는 않아요.</p>

      <h2>출처 (확인일 2026.11.19)</h2>
      <ul>
        <li><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener noreferrer">Claude Code Docs, Connect Claude Code to tools via MCP</a> — 범위 3종(MCP installation scopes)과 저장 위치, 우선순위, Notion 연결 예시, <code>claude mcp list</code>·<code>get</code>·<code>remove</code>·<code>/mcp</code>, 원격 서버 삭제 시 OAuth 토큰 삭제, 같은 이름 충돌 경고.</li>
      </ul>
      <p><code>to local config</code>, <code>[project: /Users/(내 계정 이름)]</code> 메시지는 저희가 등록할 때 터미널에 나온 문구예요.</p>
    `,
  },
];
