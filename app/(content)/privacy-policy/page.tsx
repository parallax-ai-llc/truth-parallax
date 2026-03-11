export const metadata = {
  title: "Privacy Policy - Legal Parallax",
  description: "Privacy Policy for Legal Parallax",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <article className="prose mx-auto max-w-3xl">
        <h1 className="font-serif">Privacy Policy</h1>

        <p className="lead">Last updated: December 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Legal Parallax is committed to protecting your privacy. This policy explains how we
          handle any information when you use our service.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          Legal Parallax does not require user registration or login. We do not collect
          personal information from our users.
        </p>
        <p>
          We may collect anonymous usage data through standard web analytics to improve our service,
          including:
        </p>
        <ul>
          <li>Pages visited</li>
          <li>Time spent on pages</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Referral source</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>We may use cookies for:</p>
        <ul>
          <li>Theme preference (light/dark mode)</li>
          <li>Anonymous analytics</li>
        </ul>
        <p>You can control cookie settings through your browser preferences.</p>

        <h2>4. Third-Party Services</h2>
        <p>We may use third-party services for:</p>
        <ul>
          <li>Web hosting (Vercel)</li>
          <li>Analytics (anonymous data only)</li>
          <li>External media (Wikimedia Commons)</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          Since we do not collect personal data, there is minimal risk to user privacy. Our service
          is served over HTTPS to ensure secure connections.
        </p>

        <h2>6. Children&apos;s Privacy</h2>
        <p>
          Our service is available to users of all ages. We do not knowingly collect information
          from children under 13.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify users of any changes
          by posting the new policy on this page.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us at{" "}
          <a href="mailto:contact@parallax.kr">contact@parallax.kr</a>.
        </p>
      </article>
    </div>
  );
}
