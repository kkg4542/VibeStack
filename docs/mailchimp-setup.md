# Mailchimp 설정 가이드

계정이 이미 있으시면 **Step 2**부터 시작하시면 됩니다!

---

## Step 1: Mailchimp 무료 계정 생성 (선택사항)

이미 계정이 있다면 **Skip**하세요.

1. https://mailchimp.com/signup 접속
2. 이메일, 사용자명, 비밀번호 입력
3. 이메일 인증
4. **Free** 플랜 선택 (최대 500명 구독자 무료)

---

## Step 2: Audience (오디언스) 생성

### 2-1. Audience 메뉴 접속
1. Mailchimp 로그인
2. 왼쪽 메뉴에서 **Audience** 클릭
3. **Audience dashboard** 클릭

### 2-2. 새 Audience 만들기
Audience가 없다면:
1. **Create Audience** 버튼 클릭
2. 다음 정보 입력:
   ```
   Audience name: VibeStack Subscribers
   Default from email: your-email@example.com
   Default from name: VibeStack
   Default subject: 
   Permission reminder: You're receiving this email because you subscribed to VibeStack.
   ```
3. 연락처 정보 입력 (필수)
4. **Save** 클릭

---

## Step 3: Audience ID 찾기 (중요!)

### 3-1. Audience ID 확인
1. **Audience** → **Audience dashboard**
2. **Settings** 드롭다운 클릭
3. **Audience name and defaults** 선택
4. 페이지 중간에 **Audience ID** 표시됨:
   ```
   Audience ID
   1a2b3c4d5e
   ```
5. **이 ID를 복사하세요!**

---

## Step 4: API Key 생성

### 4-1. Account 설정으로 이동
1. 우측 상단 프로필 아이콘 클릭
2. **Account & Billing** 선택

### 4-2. API Keys 페이지 접속
1. **Extras** → **API keys** 클릭
2. **Create A Key** 버튼 클릭
3. Key 이름 입력:
   ```
   VibeStack Production
   ```
4. **Generate Key** 클릭

### 4-3. API Key 복사
생성된 API Key 형식:
```
abc123def456ghi789jkl012-us14
```

**중요 부분:**
- **전체 Key**: `abc123def456ghi789jkl012-us14`
- **Data Center (DC)**: 마지막 하이픈 뒤 부분 (`us14`)

---

## Step 5: Data Center 확인

API Key의 마지막 부분이 Data Center입니다:

**예시:**
- Key가 `xxx-us14` → DC는 `us14`
- Key가 `xxx-us21` → DC는 `us21`
- Key가 `xxx-eu1` → DC는 `eu1`

---

## Step 6: .env 파일에 추가

### 6-1. 환경 변수 추가
`.env` 파일을 열고 다음 3줄 추가:

```bash
# Mailchimp
MAILCHIMP_API_KEY=abc123def456ghi789jkl012-us14
MAILCHIMP_LIST_ID=1a2b3c4d5e
MAILCHIMP_DC=us14
```

**주의사항:**
- API Key는 `-us14` 부분까지 전체 포함
- LIST_ID는 Audience ID
- DC는 API Key 마지막 부분 (`-` 뒤)

---

## Step 7: 개발 서버 재시작

터미널에서:
```bash
# Ctrl + C로 서버 중지
npm run dev
```

---

## Step 8: 테스트

### 8-1. 브라우저에서 테스트
1. http://localhost:3000 접속
2. Footer 또는 Newsletter 섹션 찾기
3. 테스트 이메일 입력 (예: `test@example.com`)
4. **Subscribe** 버튼 클릭

### 8-2. Mailchimp에서 확인
1. Mailchimp **Audience** → **Audience dashboard**
2. **View contacts** 클릭
3. 방금 입력한 이메일이 표시되면 성공! ✅

### 8-3. 실패 시 확인사항
- 브라우저 Console에서 에러 확인
- API Key가 정확한지 확인 (공백 없이)
- Audience ID가 정확한지 확인
- Data Center가 API Key와 일치하는지 확인

---

## Step 9: Welcome Email 설정 (선택사항)

### 9-1. 자동화 이메일 만들기
1. **Automations** → **Create** → **Subscribe to email**
2. **Welcome new subscribers** 템플릿 선택
3. 이메일 디자인:
   - 제목: "Welcome to VibeStack! 🚀"
   - 내용: 환영 메시지 + 인기 AI 도구 5개
   - CTA: 사이트 방문 링크

### 9-2. 자동화 활성화
1. 이메일 디자인 완료 후 **Start Sending** 클릭
2. 이제 새 구독자가 자동으로 환영 이메일 받음

---

## 🎯 완료 체크리스트

- [ ] Mailchimp 계정 생성 (또는 기존 계정 사용)
- [ ] Audience 생성 완료
- [ ] Audience ID 복사: `_______________`
- [ ] API Key 생성 및 복사: `________________-___`
- [ ] Data Center 확인: `______`
- [ ] `.env` 파일에 3개 변수 추가
- [ ] 개발 서버 재시작
- [ ] Newsletter 구독 테스트 성공
- [ ] Mailchimp Audience에서 구독자 확인

---

## 🔍 추가 정보

### API Rate Limits
- 무료 플랜: 10 calls/second
- 충분히 여유 있음

### 구독자 한도
- 무료: 최대 500명
- 500명 초과 시 유료 플랜 필요

### 이메일 발송 한도
- 무료: 월 2,500통까지 무료 (후 12,000통 제한)

---

**문제가 생기면 `.env.setup.md` 파일의 Mailchimp 섹션 참고하세요!**
