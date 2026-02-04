export default function PrivacyPage() {
    return (
        <main className="container max-w-4xl mx-auto px-4 pt-32 pb-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-foreground">Privacy Policy</h1>
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-lg prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
                <p className="text-xl font-medium text-foreground mb-8">Last updated: February 3, 2026</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to VibeStack ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data.
                    This privacy policy will inform you as to how we look after your personal data when you visit our website (usevibestack.com)
                    and tell you about your privacy rights.
                </p>

                <h2>2. Data We Collect</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                <ul>
                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                    <li><strong>Contact Data:</strong> includes email address (when subscribing to newsletters or submitting tools).</li>
                    <li><strong>Usage Data:</strong> includes information about how you use our website, products and services (via Google Analytics).</li>
                    <li><strong>Transaction Data:</strong> includes details about payments to and from you (via Stripe). We do not store credit card details.</li>
                </ul>

                <h2>3. How We Use Your Data</h2>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul>
                    <li>To process your tool submission and feature it on our platform.</li>
                    <li>To manage our relationship with you.</li>
                    <li>To improve our website, services, marketing and customer relationships.</li>
                </ul>

                <h2>4. Third-Party Services</h2>
                <p>We use the following third-party services:</p>
                <ul>
                    <li><strong>Google Analytics:</strong> For website traffic analysis.</li>
                    <li><strong>Stripe:</strong> For payment processing.</li>
                    <li><strong>Vercel:</strong> For hosting and infrastructure.</li>
                </ul>

                <h2>5. Contact Us</h2>
                <p>If you have any questions about this privacy policy, please contact us at: hello@usevibestack.com</p>
            </div>
        </main>
    )
}
