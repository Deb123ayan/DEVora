import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container px-6 mx-auto py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Last updated: December 23, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Contact us through our contact form</li>
                <li>Request a quote or consultation</li>
                <li>Subscribe to our newsletter</li>
                <li>Engage with our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you technical notices and support messages</li>
                <li>Communicate with you about services, features, and updates</li>
                <li>Process transactions and send related information</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>With service providers who assist us in operating our business</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white mb-2">DEVora Tech</p>
                <p className="text-muted-foreground mb-2">Email: devora_tech@yahoo.com</p>
                <p className="text-muted-foreground mb-2">Phone: +91 800-113-5771</p>
                <p className="text-muted-foreground">Location: Bhubaneswar, Odisha</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}