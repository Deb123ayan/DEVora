import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground text-lg mb-8">
              Last updated: December 23, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using DEVora Tech's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
              <p className="text-muted-foreground mb-4">
                DEVora Tech provides digital solutions including but not limited to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Web development and design</li>
                <li>Mobile application development</li>
                <li>UI/UX design services</li>
                <li>AI and machine learning solutions</li>
                <li>Digital consulting and strategy</li>
                <li>Technical support and maintenance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Project Terms and Payment</h2>
              <p className="text-muted-foreground mb-4">
                All project terms, timelines, deliverables, and payment schedules will be outlined in separate project agreements or contracts. General terms include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Payment terms are typically 50% upfront, 50% upon completion</li>
                <li>Project timelines are estimates and may vary based on scope changes</li>
                <li>Client feedback and approval are required at designated milestones</li>
                <li>Additional work beyond the agreed scope will be billed separately</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                Upon full payment, clients receive ownership of the final deliverables. However:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>DEVora Tech retains the right to showcase completed work in portfolios</li>
                <li>Pre-existing tools, frameworks, and methodologies remain our property</li>
                <li>Source code and development files are provided upon project completion</li>
                <li>Third-party licenses and dependencies are subject to their respective terms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Client Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                Clients are responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Providing accurate and complete project requirements</li>
                <li>Timely feedback and approvals</li>
                <li>Providing necessary content, assets, and access credentials</li>
                <li>Making payments according to agreed schedules</li>
                <li>Maintaining backups of their data and content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                DEVora Tech's liability is limited to the amount paid for services. We are not liable for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Third-party service failures or security breaches</li>
                <li>Issues arising from client-provided content or requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Warranty and Support</h2>
              <p className="text-muted-foreground mb-4">
                We provide:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>30-day warranty on bug fixes for delivered projects</li>
                <li>Technical support during the development phase</li>
                <li>Documentation and training as specified in project agreements</li>
                <li>Ongoing maintenance services available separately</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
              <p className="text-muted-foreground mb-4">
                Either party may terminate services with written notice. In case of termination:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>Client pays for work completed up to termination date</li>
                <li>Deliverables completed will be provided upon payment</li>
                <li>Refunds are not provided for work already completed</li>
                <li>Confidentiality obligations continue post-termination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Confidentiality</h2>
              <p className="text-muted-foreground mb-4">
                We maintain strict confidentiality of all client information and project details. We will not disclose confidential information to third parties without explicit consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These terms are governed by the laws of India. Any disputes will be resolved through arbitration in Bhubaneswar, Odisha.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white mb-2">DEVora Tech</p>
                <p className="text-muted-foreground mb-2">Email: devora_tech@yahoo.com</p>
                <p className="text-muted-foreground mb-2">Phone: +91 800-113-5771</p>
                <p className="text-muted-foreground">Location: Bhubaneswar, Odisha</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}