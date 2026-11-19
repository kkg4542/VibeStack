import { BlogPost } from "./blog-types";

/**
 * Korean companion posts for @vibestack.ai Instagram reels. The reel promises
 * a guide ("댓글에 '카드' 남기면 DM으로 보내드려요"); the DM links here.
 * Set `reel.url` once the reel is live — the embed then replaces the hero image.
 */
export const postsKo: BlogPost[] = [
  {
    slug: "card-news-automation-guide",
    lang: "ko",
    title: "카드뉴스 만드는 순서: 클로드 코드로 카드 7장 만들기",
    excerpt:
      "vibestack.ai가 카드뉴스 7장을 만들 때 실제로 거치는 8단계. 헤드리스 크롬 캡처 명령, 카드 HTML 뼈대, 클로드 코드 지시문 예시, 게시 전 점검 체크리스트를 정리했어요.",
    date: "Nov 20, 2026",
    author: "David Kim",
    category: "Guide",
    readTime: "5 min read",
    image: "/images/blog/card-news-automation-guide.png",
    // No tags: tag matching would drop an English "Our Claude review" callout mid-article.
    tags: [],
    reel: {},
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
];
