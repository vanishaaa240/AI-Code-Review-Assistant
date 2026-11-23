
import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "./Help.css";

function Help() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Which programming languages are supported?",
      answer:
        "ReviewAI currently supports C, C++, Java, Python and JavaScript.",
    },
    {
      question: "Are my code reviews saved?",
      answer:
        "Yes. Your code reviews are saved to your account and can be accessed anytime from the History page.",
    },
    {
      question: "Can I download my corrected code?",
      answer:
        "Yes. You can copy or download corrected code and export your review report as a PDF.",
    },
    {
      question: "How is my code evaluated?",
      answer:
        "Our AI analyzes your code and provides a score, strengths, improvements, corrected code, interview questions and recommended topics.",
    },
    {
      question: "Can I delete my previous reviews?",
      answer:
        "Yes. Open the History page and click the delete button on the review you want to remove.",
    },
    {
      question: "Can I change my profile details?",
      answer:
        "You can update your avatar, About section and achievements from the Profile page. Your registered name and email are displayed as account information.",
    },
  ];

  const features = [
    { icon: "✦", title: "AI Code Review", description: "Get intelligent feedback on your code." },
    { icon: "◉", title: "Code Score", description: "Understand your code quality with a score out of 100." },
    { icon: "⌘", title: "Corrected Code", description: "Get improved versions of your code." },
    { icon: "◎", title: "Interview Questions", description: "Practice questions based on your code." },
    { icon: "◇", title: "Recommended Topics", description: "Discover concepts you should learn next." },
    { icon: "◷", title: "Review History", description: "Access and manage your previous reviews." },
    { icon: "↓", title: "PDF Export", description: "Download your review report." },
    { icon: "♧", title: "Profile Settings", description: "Personalize your ReviewAI profile." },
  ];

  const steps = [
    {
      number: "01",
      title: "Select Language",
      description: "Choose the programming language of your code from the editor dropdown.",
      icon: "⌘",
    },
    {
      number: "02",
      title: "Paste Your Code",
      description: "Write or paste your source code into the code editor.",
      icon: "</>",
    },
    {
      number: "03",
      title: "Review Your Code",
      description: "Click the Review Code button and let AI analyze your code.",
      icon: "✦",
    },
    {
      number: "04",
      title: "Explore Feedback",
      description: "Check your score, strengths, improvements and corrected code.",
      icon: "◎",
    },
    {
      number: "05",
      title: "Save Your Results",
      description: "Download your corrected code or PDF report and revisit your reviews in History.",
      icon: "↓",
    },
  ];

  return (
    <div className="home">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="content">
          <div className="help-container">

            {/* Heading */}
            <section className="help-hero">
              <div className="help-hero-content">
                <span className="help-eyebrow">REVIEWAI SUPPORT</span>
                <h1>How can we help you?</h1>
                <p>
                  Everything you need to know about using ReviewAI and getting
                  the best out of your AI-powered coding assistant.
                </p>
                <span className="help-status">
                  <span className="help-status-dot"></span>
                  Your coding journey starts here
                </span>
              </div>

              <div className="help-hero-art">
                <div className="help-art-circle">?</div>
                <span className="help-art-spark spark-one">✦</span>
                <span className="help-art-spark spark-two">✧</span>
                <span className="help-art-spark spark-three">✦</span>
              </div>
            </section>

            {/* Getting Started */}
            <section className="help-section">
              <div className="help-section-heading">
                <div>
                  <span className="help-section-label">GETTING STARTED</span>
                  <h2>How to use ReviewAI</h2>
                  <p>Follow these simple steps to review your first code.</p>
                </div>
                <span className="help-section-icon">🚀</span>
              </div>

              <div className="help-steps-grid">
                {steps.map((step) => (
                  <div className="help-step-card" key={step.number}>
                    <div className="help-step-top">
                      <span className="help-step-number">{step.number}</span>
                      <span className="help-step-icon">{step.icon}</span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="help-section">
              <div className="help-section-heading">
                <div>
                  <span className="help-section-label">WHAT YOU GET</span>
                  <h2>Explore ReviewAI Features</h2>
                  <p>Tools designed to help you write better code.</p>
                </div>
                <span className="help-section-icon">✧</span>
              </div>

              <div className="help-features-grid">
                {features.map((feature) => (
                  <div className="help-feature-card" key={feature.title}>
                    <div className="help-feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="help-section">
              <div className="help-section-heading">
                <div>
                  <span className="help-section-label">NEED ANSWERS?</span>
                  <h2>Frequently Asked Questions</h2>
                  <p>Quick answers to common questions about ReviewAI.</p>
                </div>
                <span className="help-section-icon">❔</span>
              </div>

              <div className="faq-container">
                {faqs.map((faq, index) => (
                  <div
                    className={`faq-item ${openFaq === index ? "faq-active" : ""}`}
                    key={faq.question}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? -1 : index)
                      }
                      aria-expanded={openFaq === index}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-toggle">
                        {openFaq === index ? "−" : "+"}
                      </span>
                    </button>

                    {openFaq === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Support */}
            <section className="help-support-card">
              <div className="help-support-icon">✉</div>

              <div className="help-support-content">
                <span className="help-section-label">STILL NEED HELP?</span>
                <h2>We're here to help!</h2>
                <p>
                  Have questions or facing an issue? Reach out to our support
                  team for assistance.
                </p>
                <a href="mailto:support@reviewai.com">
                  Contact Support ↗
                </a>
              </div>

              <div className="help-version">
                <span>VERSION</span>
                <strong>1.0</strong>
              </div>
            </section>

            <div className="help-footer">
              <p>Made with ✦ for better coding experiences.</p>
              <span>ReviewAI · Version 1.0</span>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Help;
