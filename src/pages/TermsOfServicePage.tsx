const TermsOfServicePage = () => {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 8, 2026</p>

        <div className="space-y-8">
          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing or using the BraidBook platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Platform. These Terms apply to all users, including customers, hair stylists, and administrators.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">2. Description of Service</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              BraidBook is an online marketplace that connects customers seeking hair braiding services with professional hair stylists. We provide the technology platform to facilitate bookings, payments, reviews, and communication between parties. BraidBook is not a hair salon or styling service provider — we act as an intermediary marketplace.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">To use certain features, you must create an account. You agree to:</p>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1.5">
              <li>Provide accurate, current, and complete registration information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Not create more than one account per person without our consent</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">We reserve the right to suspend or terminate accounts that violate these Terms.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">4. Customer Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">As a customer, you agree to:</p>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1.5">
              <li>Provide accurate booking information including preferred services and timing</li>
              <li>Arrive on time for appointments or cancel/reschedule at least 24 hours in advance</li>
              <li>Pay for services rendered through the Platform's payment system</li>
              <li>Treat stylists with respect and professionalism</li>
              <li>Leave honest and fair reviews based on your actual experience</li>
              <li>Not engage in fraudulent or abusive behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">5. Stylist Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">As a hair stylist on BraidBook, you agree to:</p>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1.5">
              <li>Provide accurate information about your skills, experience, and services</li>
              <li>Maintain a clean, safe, and professional working environment</li>
              <li>Honor all accepted bookings and communicate promptly about any changes</li>
              <li>Deliver services as described in your profile and service listings</li>
              <li>Comply with all applicable local, state, and federal licensing requirements</li>
              <li>Maintain appropriate liability insurance where required by law</li>
              <li>Not solicit customers to transact outside the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">6. Bookings & Cancellations</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1.5">
              <li>Bookings are confirmed once both the customer and stylist have agreed to the appointment</li>
              <li>Cancellations made 24+ hours before the appointment are free of charge</li>
              <li>Late cancellations (within 24 hours) may incur a cancellation fee of up to 50% of the service price, as set by the stylist</li>
              <li>No-shows may be charged the full service price</li>
              <li>Stylists who repeatedly cancel or fail to honor bookings may face account suspension</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">7. Payments & Fees</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1.5">
              <li>All payments are processed securely through our approved payment partners</li>
              <li>BraidBook charges a platform service fee on each transaction (currently 10% for stylists)</li>
              <li>Customers are charged at the time of booking confirmation</li>
              <li>Stylists receive payment within 3-5 business days after service completion</li>
              <li>Withdrawal requests are processed within 3-4 business days via PayPal, debit card, or bank transfer</li>
              <li>All prices displayed on the Platform are in US Dollars unless stated otherwise</li>
              <li>BraidBook is not responsible for additional costs agreed upon between customer and stylist outside the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">8. Subscription Plans</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Stylists may subscribe to monthly plans (Basic, Professional, or Premium) for enhanced features and visibility. Subscriptions auto-renew monthly. You may cancel at any time; cancellation takes effect at the end of the current billing period. No refunds are provided for partial billing periods.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">9. Reviews & Content</h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1.5">
              <li>Reviews must be based on genuine service experiences</li>
              <li>Reviews must not contain hate speech, profanity, personal attacks, or discriminatory language</li>
              <li>We reserve the right to remove reviews that violate these guidelines</li>
              <li>You retain ownership of content you post but grant BraidBook a license to display it on the Platform</li>
              <li>Portfolio images uploaded by stylists must be their own work or used with permission</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">10. Dispute Resolution</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If a dispute arises between a customer and a stylist, both parties are encouraged to attempt resolution directly. If the dispute cannot be resolved, either party may file a complaint through our Contact page by selecting the "Dispute / Complaint" category. Our dispute resolution team will review the case and contact both parties within 24-48 hours. BraidBook's decision in dispute matters is final.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">11. Prohibited Activities</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">You may not use the Platform to:</p>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1.5">
              <li>Violate any applicable law, regulation, or third-party rights</li>
              <li>Post false, misleading, or deceptive content</li>
              <li>Harass, abuse, or discriminate against any user</li>
              <li>Attempt to bypass or manipulate Platform security measures</li>
              <li>Scrape, crawl, or collect data from the Platform without consent</li>
              <li>Use the Platform for any purpose other than its intended use</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">12. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              BraidBook provides the Platform on an "as is" and "as available" basis. We do not guarantee the quality, safety, or legality of services provided by stylists. To the fullest extent permitted by law, BraidBook shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform, including but not limited to personal injury, property damage, or dissatisfaction with services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">13. Indemnification</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You agree to indemnify, defend, and hold harmless BraidBook, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">14. Modifications to Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Material changes will be communicated via email or prominent notice on the Platform. Continued use of the Platform after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold mb-3">15. Governing Law</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in the courts located in New York County, New York.
            </p>
          </section>

          <section className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="font-serif text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <div className="text-sm text-muted-foreground mt-3 space-y-1">
              <p><strong>BraidBook Inc.</strong></p>
              <p>123 Beauty Lane, Suite 200</p>
              <p>New York, NY 10001</p>
              <p>Email: legal@braidbook.com</p>
              <p>Phone: (555) 987-6543</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
