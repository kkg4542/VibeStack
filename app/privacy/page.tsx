export default function PrivacyPage() {
    return (
        <main className="container max-w-4xl mx-auto px-4 pt-32 pb-20">
            <div className="flex flex-col gap-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                    Privacy Policy
                    <span className="block text-xl font-medium text-muted-foreground mt-2 font-sans">개인정보 처리방침</span>
                </h1>
                <p className="text-sm font-mono text-muted-foreground">Last updated: April 7, 2026</p>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground selection:bg-vibe-electric/20">
                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">01.</span> Introduction / 개요
                    </h2>
                    <p>
                        Welcome to VibeStack (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website (usevibestack.com)
                        and tell you about your privacy rights.
                    </p>
                    <p className="text-sm italic">
                        VibeStack(&quot;회사&quot; 또는 &quot;우리&quot;)는 귀하의 개인정보를 소중히 여기며, 개인정보 보호 관련 법령을 준수하기 위해 노력합니다. 
                        본 방침은 귀하가 서비스를 이용함에 있어 어떤 개인정보가 수집되고 어떻게 사용되는지 설명합니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">02.</span> Data We Collect / 수집하는 정보
                    </h2>
                    <p>We collect information to provide better services to all our users. The types of personal data we collect include:</p>
                    <ul>
                        <li><strong>Identity Data:</strong> Name, username, or similar identifiers provided during account creation or tool submission.</li>
                        <li><strong>Contact Data:</strong> Email address for newsletter subscription, tool submission updates, or support inquiries.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website, including IP address, browser type, and interaction patterns (via Google Analytics).</li>
                        <li><strong>Technical Data:</strong> Device identifiers, browser settings, and operating system information.</li>
                    </ul>
                    <p className="text-sm italic">
                        회사는 더 나은 서비스 제공을 위해 다음과 같은 정보를 수집합니다: 이명, 아이디, 성명(Identity), 이메일 주소(Contact), 
                        서비스 이용 기록 및 접속 로그(Usage), 기기 정보 및 환경설정(Technical) 등.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">03.</span> How We Use Your Data / 정보 활용 목적
                    </h2>
                    <p>We process your personal data for the following purposes:</p>
                    <ul>
                        <li>To maintain and improve our service and user experience.</li>
                        <li>To manage your account and tool submissions.</li>
                        <li>To communicate with you regarding updates, newsletters, and promotional offers (only with your consent).</li>
                        <li>To ensure legal compliance and protect against fraudulent activities.</li>
                    </ul>
                    <p className="text-sm italic">
                        수집된 정보는 서비스 유지 및 개선, 계정 및 도구 등록 관리, 업데이트 소식 전달(동의 시), 법적 의무 준수 및 보안 목적을 위해 사용됩니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">04.</span> Cookies and Tracking / 쿠키 및 추적 기술
                    </h2>
                    <p>
                        We use cookies and similar tracking technologies to track the activity on our service and hold certain information. 
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                    </p>
                    <p className="text-sm italic">
                        회사는 이용자의 맞춤형 서비스 제공을 위해 &apos;쿠키(cookie)&apos; 및 이와 유사한 추적 기술을 사용합니다. 
                        이용자는 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">05.</span> Third-Party Services / 제3자 서비스 제공
                    </h2>
                    <p>We share certain data with trusted third-party service providers to facilitate our services:</p>
                    <ul>
                        <li><strong>Google Analytics:</strong> For traffic analysis and performance monitoring.</li>
                        <li><strong>Stripe:</strong> For secure payment processing (we do not store credit card data).</li>
                        <li><strong>Vercel & Upstash:</strong> For infrastructure and data storage.</li>
                    </ul>
                    <p className="text-sm italic">
                        서비스 운영을 위해 구글 애널리틱스(분석), 스트라이프(결제), 버셀 및 업스태시(인프라) 등 신뢰할 수 있는 제3자 서비스를 활용하며, 
                        데이터 보안을 위해 엄격히 관리합니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">06.</span> Your Rights / 이용자의 권리
                    </h2>
                    <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                    <ul>
                        <li>The right to access, update, or delete the information we have on you.</li>
                        <li>The right of rectification if that information is inaccurate.</li>
                        <li>The right to object to our processing of your personal data.</li>
                    </ul>
                    <p className="text-sm italic">
                        이용자는 언제든지 자신의 개인정보에 대한 열람, 수정, 삭제 요청 및 처리 거부권을 행사할 수 있습니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">07.</span> Contact Us / 문의처
                    </h2>
                    <p>If you have any questions about this privacy policy, please contact us at:</p>
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                        <p className="font-bold text-foreground m-0">VibeStack Support Team</p>
                        <p className="m-0 text-vibe-electric">hello@usevibestack.com</p>
                    </div>
                </section>
            </div>
        </main>
    )
}
