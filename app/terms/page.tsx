export default function TermsPage() {
    return (
        <main className="container max-w-4xl mx-auto px-4 pt-32 pb-20">
            <div className="flex flex-col gap-4 mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
                    Terms of Service
                    <span className="block text-xl font-medium text-muted-foreground mt-2 font-sans">이용약관</span>
                </h1>
                <p className="text-sm font-mono text-muted-foreground">Last updated: April 7, 2026</p>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground selection:bg-vibe-electric/20">
                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">01.</span> Agreement to Terms / 약관 동의
                    </h2>
                    <p>
                        By accessing or using VibeStack (&quot;Service&quot;), you agree to be bound by these Terms of Service. 
                        If you disagree with any part of the terms, then you may not access the service.
                    </p>
                    <p className="text-sm italic">
                        VibeStack(&quot;서비스&quot;)을 이용함으로써 귀하는 본 이용약관에 동의하게 됩니다. 
                        약관의 내용에 동의하지 않을 경우 서비스 이용이 제한될 수 있습니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">02.</span> Use of Service / 서비스 이용
                    </h2>
                    <p>
                        VibeStack provides a curated directory of AI tools. You agree to use the service only for lawful purposes 
                        and in a way that does not infringe the rights of, restrict or inhibit anyone else&apos;s use and enjoyment of the service.
                    </p>
                    <p className="text-sm italic">
                        VibeStack은 엄선된 AI 도구 디렉토리를 제공합니다. 귀하는 법적 목적에 부합하는 방식으로만 서비스를 이용해야 하며, 
                        타인의 권리를 침해하거나 서비스 이용을 방해해서는 안 됩니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">03.</span> Paid Submissions / 유료 서비스 (도구 등록)
                    </h2>
                    <p>
                        We offer optional paid submission tiers to prioritize the review of your AI tool:
                    </p>
                    <ul>
                        <li><strong>Priority Submission:</strong> Accelerates the review process and includes basic promotion.</li>
                        <li><strong>Premium Submission:</strong> Includes featured placement and extended marketing.</li>
                    </ul>
                    <p>
                        Payments are processed via Stripe. While we guarantee a review, we reserve the right to 
                        reject tools that do not meet our quality or safety standards. In the event of a rejection, 
                        a full refund will be issued.
                    </p>
                    <p className="text-sm italic">
                        도구 등록 심사 우선순위를 위해 유료 티어를 제공합니다. 결제는 Stripe를 통해 처리되며, 
                        심사 결과 서비스의 품질 기준에 부합하지 않을 경우 등록이 거절될 수 있으며 이 경우 전액 환불됩니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">04.</span> Intellectual Property / 지적 재산권
                    </h2>
                    <p>
                        The Service and its original content (excluding content provided by users), features, and functionality 
                        are and will remain the exclusive property of VibeStack and its licensors.
                    </p>
                    <p className="text-sm italic">
                        본 서비스와 그 원본 콘텐츠(이용자 제공 콘텐츠 제외), 기능 및 특성은 VibeStack 및 라이선스 제공자의 독점적 재산입니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">05.</span> Limitation of Liability / 책임 제한
                    </h2>
                    <p>
                        In no event shall VibeStack be liable for any indirect, incidental, special, consequential or punitive damages, 
                        including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                    <p className="text-sm italic">
                        VibeStack은 서비스 이용과 관련하여 발생한 간접적, 부수적, 징벌적 손해나 이익/데이터 손실 등에 대해 책임을 지지 않습니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">06.</span> Governing Law / 준거법
                    </h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which 
                        VibeStack operates, without regard to its conflict of law provisions.
                    </p>
                    <p className="text-sm italic">
                        본 약관은 상관례 및 관련 법령에 따라 해석되고 규정됩니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">07.</span> Changes to Terms / 약관의 변경
                    </h2>
                    <p>
                        We reserve the right to modify or replace these Terms at any time. We will provide at least 30 days notice 
                        prior to any new terms taking effect.
                    </p>
                    <p className="text-sm italic">
                        회사는 필요한 경우 약관을 변경할 권리가 있으며, 주요 변경 사항은 발효 30일 전 공지합니다.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="flex items-center gap-2">
                        <span className="text-vibe-electric">08.</span> Contact Us / 문의처
                    </h2>
                    <p>If you have any questions about these Terms, please contact us at:</p>
                    <div className="p-6 rounded-2xl bg-secondary/30 border border-border">
                        <p className="font-bold text-foreground m-0">VibeStack Support Team</p>
                        <p className="m-0 text-vibe-electric">hello@usevibestack.com</p>
                    </div>
                </section>
            </div>
        </main>
    )
}
