// src/pages/HelpPage.jsx
import { useState } from "react";
import {
  BookOpen, Code2, PlayCircle, MessageCircle,
  ChevronDown, ExternalLink, Mail, Zap,
  FileText, Shield, HelpCircle,
} from "lucide-react";

/* ─── Quick links ────────────────────────────────────────────── */
const QUICK_LINKS = [
  {
    icon: BookOpen, color: "#7c3aed", bg: "rgba(124,58,237,0.10)", border: "rgba(124,58,237,0.18)",
    title: "Getting Started",
    desc: "Set up your workspace, invite teammates, and explore the dashboard in 5 minutes.",
    link: "#",
  },
  {
    icon: Code2, color: "#22d3ee", bg: "rgba(34,211,238,0.08)", border: "rgba(34,211,238,0.16)",
    title: "API Reference",
    desc: "Full REST API documentation with code samples in JS, Python, and cURL.",
    link: "#",
  },
  {
    icon: PlayCircle, color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.16)",
    title: "Video Tutorials",
    desc: "Step-by-step walkthroughs for analytics, user management, and integrations.",
    link: "#",
  },
  {
    icon: MessageCircle, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.16)",
    title: "Community Forum",
    desc: "Ask questions, share tips, and connect with thousands of AdminPro users.",
    link: "#",
  },
];

/* ─── FAQ data ───────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How do I invite team members to my workspace?",
    a: "Go to the Users page and click 'Add User'. Enter their email and select a role (Admin, Editor, or Viewer). They'll receive an invite link valid for 48 hours.",
  },
  {
    q: "Can I export analytics data to CSV or Excel?",
    a: "Yes. On the Analytics page, use the export button in the top-right corner of any chart. You can export as CSV, XLSX, or PNG. Bulk exports are available on Enterprise plans.",
  },
  {
    q: "How does the dark/light mode preference get saved?",
    a: "Your theme preference is stored in your browser's localStorage under the key 'adminpro-theme'. It persists across sessions and overrides the system preference if explicitly set.",
  },
  {
    q: "What's the difference between Admin, Editor, and Viewer roles?",
    a: "Admins have full access including billing and security settings. Editors can manage content and users but cannot change billing. Viewers have read-only access to dashboards and reports.",
  },
  {
    q: "How do I enable two-factor authentication?",
    a: "Navigate to Settings → Security and toggle on 'Two-factor authentication'. You'll be prompted to scan a QR code with an authenticator app (Google Authenticator, Authy, etc.).",
  },
  {
    q: "Is my data backed up automatically?",
    a: "Yes. AdminPro performs automated daily backups retained for 30 days, plus weekly backups retained for 12 months. Enterprise plans include point-in-time recovery and custom retention policies.",
  },
];

/* ─── FAQ item ───────────────────────────────────────────────── */
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: "1px solid var(--divider)" }}>
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors
                   dark:hover:bg-white/[0.02] hover:bg-black/[0.02]"
        onClick={onToggle}
      >
        <span className={`text-[13px] font-medium leading-snug transition-colors
          ${isOpen ? "dark:text-white text-slate-900" : "dark:text-slate-300 text-slate-700"}`}>
          {faq.q}
        </span>
        <ChevronDown
          size={15}
          className="flex-shrink-0 transition-transform duration-200"
          style={{
            color: isOpen ? "#7c3aed" : "var(--text-faint)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-4">
          <p className="text-[13px] text-slate-500 leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  return (
    <div className="space-y-6 max-w-3xl">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="card px-6 py-8 text-center stagger-1 animate-fade-up overflow-hidden relative">
        {/* Decorative glow */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl pointer-events-none"
          style={{ background: "rgba(124,58,237,0.12)" }}
        />
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 relative"
          style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <HelpCircle size={22} className="text-violet-400" />
        </div>
        <h2 className="dark:text-white text-slate-900 text-[20px] font-bold font-display mb-2">
          How can we help?
        </h2>
        <p className="text-slate-500 text-[13px] max-w-sm mx-auto">
          Browse the docs, watch tutorials, or reach out to our support team — we're here for you.
        </p>
      </div>

      {/* ── Quick links ───────────────────────────────────────── */}
      <div>
        <h3 className="dark:text-white text-slate-900 text-[13px] font-semibold font-display mb-3 stagger-2 animate-fade-up">
          Resources
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger-2 animate-fade-up">
          {QUICK_LINKS.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="card p-4 flex items-start gap-3.5 group transition-all card-lift cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: item.bg, border: `1px solid ${item.border}` }}
              >
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <p className="dark:text-slate-200 text-slate-800 text-[13px] font-semibold">{item.title}</p>
                  <ExternalLink
                    size={11}
                    className="opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0"
                    style={{ color: item.color }}
                  />
                </div>
                <p className="text-slate-500 text-[12px] leading-snug">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <div className="stagger-3 animate-fade-up">
        <h3 className="dark:text-white text-slate-900 text-[13px] font-semibold font-display mb-3">
          Frequently Asked Questions
        </h3>
        <div className="card overflow-hidden">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              isOpen={openFaq === i}
              onToggle={() => toggleFaq(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Contact card ─────────────────────────────────────── */}
      <div className="card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 stagger-4 animate-fade-up">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.18)" }}
        >
          <Zap size={18} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="dark:text-white text-slate-900 text-[14px] font-semibold font-display mb-0.5">
            Still need help?
          </p>
          <p className="text-slate-500 text-[12px]">
            Our support team typically responds within 2 business hours on weekdays.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="mailto:support@adminpro.io"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold transition-all
                       dark:text-slate-300 dark:hover:text-white hover:text-slate-900 text-slate-600"
            style={{ border: "1px solid var(--border)" }}
          >
            <Mail size={13} />
            Email us
          </a>
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12px] font-semibold text-white
                       transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              boxShadow: "0 0 16px rgba(124,58,237,0.28)",
            }}
          >
            <MessageCircle size={13} />
            Live chat
          </button>
        </div>
      </div>

      {/* ── Footer links ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-4 justify-center stagger-5 animate-fade-up pb-2">
        {[
          { icon: FileText, label: "Privacy Policy" },
          { icon: Shield,   label: "Terms of Service" },
          { icon: Code2,    label: "Status Page" },
        ].map((item) => (
          <a
            key={item.label}
            href="#"
            className="flex items-center gap-1.5 text-[11px] transition-colors
                       dark:text-slate-600 dark:hover:text-slate-400 text-slate-400 hover:text-slate-600"
          >
            <item.icon size={12} />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
