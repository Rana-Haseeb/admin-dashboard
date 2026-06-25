import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Camera,
  Check,
  ChevronRight,
} from "lucide-react";

/* ─── Toggle switch ──────────────────────────────────────────── */
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-5 w-9 flex-shrink-0 rounded-full cursor-pointer transition-colors duration-200"
      style={{ background: checked ? "#7c3aed" : "var(--bar-empty)" }}
    >
      <span
        className="inline-block w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200"
        style={{
          margin: "2px",
          transform: checked ? "translateX(16px)" : "translateX(0)",
        }}
      />
    </button>
  );
}

/* ─── Section wrapper ────────────────────────────────────────── */
function Section({ icon: Icon, title, subtitle, children, stagger = 1 }) {
  return (
    <div className={`card stagger-${stagger} animate-fade-up`}>
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid var(--divider)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <Icon size={14} className="text-violet-400" />
        </div>
        <div>
          <h3 className="dark:text-white text-slate-900 text-[13px] font-semibold font-display leading-tight">
            {title}
          </h3>
          {subtitle && <p className="text-slate-500 text-[11px] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </div>
  );
}

/* ─── Field ──────────────────────────────────────────────────── */
function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
      <div className="sm:w-40 flex-shrink-0">
        <label className="dark:text-slate-300 text-slate-700 text-[13px] font-medium block">{label}</label>
        {hint && <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

/* ─── Input ──────────────────────────────────────────────────── */
function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-dark w-full px-3 py-2 rounded-lg text-[13px]"
    />
  );
}

/* ─── Divider ────────────────────────────────────────────────── */
function Divider() {
  return <div style={{ height: "1px", background: "var(--divider)" }} />;
}

/* ─── Toggle row ─────────────────────────────────────────────── */
function ToggleRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="dark:text-slate-300 text-slate-700 text-[13px] font-medium">{label}</p>
        {desc && <p className="text-slate-500 text-[11px] mt-0.5">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function SettingsPage() {
  const [displayName, setDisplayName] = useState("Rana Haseeb");
  const [username,    setUsername]    = useState("ranahaseeb");
  const [email,       setEmail]       = useState("ranahaseeb92029@gmail.com");
  const [bio,         setBio]         = useState("Full-stack developer & UI enthusiast.");

  const [notif, setNotif] = useState({
    email:     true,
    browser:   true,
    security:  true,
    updates:   false,
    digest:    true,
    marketing: false,
  });
  const toggleNotif = (key) => setNotif((n) => ({ ...n, [key]: !n[key] }));

  const [twoFA,    setTwoFA]    = useState(true);
  const [sessions, setSessions] = useState(false);
  const [audit,    setAudit]    = useState(true);

  const [accent,  setAccent]  = useState("violet");
  const [density, setDensity] = useState("default");
  const [saved,   setSaved]   = useState(false);

  const ACCENTS = [
    { id: "violet",  color: "#7c3aed" },
    { id: "cyan",    color: "#22d3ee" },
    { id: "emerald", color: "#10b981" },
    { id: "rose",    color: "#f43f5e" },
    { id: "amber",   color: "#f59e0b" },
    { id: "blue",    color: "#3b82f6" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-4 max-w-3xl">

      {/* ── Profile ─────────────────────────────────────────── */}
      <Section icon={User} title="Profile" subtitle="Manage your personal information" stagger={1}>
        <Field label="Photo">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ background: "linear-gradient(135deg, #f43f5e 0%, #db2777 100%)" }}
              >
                RH
              </div>
              <button
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "#7c3aed", border: "2px solid var(--bg-base)" }}
              >
                <Camera size={9} className="text-white" />
              </button>
            </div>
            <div>
              <button
                className="text-[12px] font-medium px-3 py-1.5 rounded-lg text-violet-400 transition-colors"
                style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                Upload photo
              </button>
              <p className="text-slate-500 text-[11px] mt-1">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </Field>

        <Divider />

        <Field label="Display name" hint="Shown across the dashboard">
          <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
        </Field>

        <Field label="Username" hint="Your unique handle">
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-slate-500 pointer-events-none"
            >
              @
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-dark w-full pl-7 pr-3 py-2 rounded-lg text-[13px]"
            />
          </div>
        </Field>

        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
        </Field>

        <Field label="Bio" hint="Short description about you">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Tell us about yourself…"
            className="input-dark w-full px-3 py-2 rounded-lg text-[13px] resize-none"
            style={{ lineHeight: "1.5" }}
          />
        </Field>
      </Section>

      {/* ── Notifications ───────────────────────────────────── */}
      <Section icon={Bell} title="Notifications" subtitle="Choose what you want to hear about" stagger={2}>
        <ToggleRow label="Email notifications"  desc="Receive activity summaries via email"            checked={notif.email}     onChange={() => toggleNotif("email")}     />
        <Divider />
        <ToggleRow label="Browser notifications" desc="Real-time alerts in your browser"               checked={notif.browser}   onChange={() => toggleNotif("browser")}   />
        <Divider />
        <ToggleRow label="Security alerts"       desc="Logins, password changes, suspicious activity"  checked={notif.security}  onChange={() => toggleNotif("security")}  />
        <Divider />
        <ToggleRow label="Product updates"       desc="New features, improvements, changelogs"         checked={notif.updates}   onChange={() => toggleNotif("updates")}   />
        <Divider />
        <ToggleRow label="Weekly digest"         desc="Summary of your team's activity"                checked={notif.digest}    onChange={() => toggleNotif("digest")}    />
        <Divider />
        <ToggleRow label="Marketing emails"      desc="Tips, use cases, and product news"              checked={notif.marketing} onChange={() => toggleNotif("marketing")} />
      </Section>

      {/* ── Appearance ──────────────────────────────────────── */}
      <Section icon={Palette} title="Appearance" subtitle="Customize the look and feel" stagger={3}>
        <Field label="Accent color">
          <div className="flex items-center gap-2 flex-wrap">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                onClick={() => setAccent(a.id)}
                className="w-7 h-7 rounded-full transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
                style={{
                  background: a.color,
                  /* ring color adapts via CSS var so it contrasts in both themes */
                  boxShadow: accent === a.id
                    ? `0 0 0 2px var(--bg-base), 0 0 0 4px ${a.color}`
                    : "none",
                }}
                title={a.id}
              >
                {accent === a.id && <Check size={12} className="text-white" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </Field>

        <Divider />

        <Field label="Interface density" hint="Controls spacing and padding">
          <div className="flex gap-2">
            {["compact", "default", "comfortable"].map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className="px-3 py-1.5 rounded-lg text-[12px] font-medium capitalize transition-colors"
                style={
                  density === d
                    ? { background: "rgba(124,58,237,0.2)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)" }
                    : { background: "var(--input-bg)", color: "var(--text-muted)", border: "1px solid var(--input-bdr)" }
                }
              >
                {d}
              </button>
            ))}
          </div>
        </Field>
      </Section>

      {/* ── Security ────────────────────────────────────────── */}
      <Section icon={Shield} title="Security" subtitle="Protect your account" stagger={4}>
        <ToggleRow label="Two-factor authentication" desc="Add an extra layer of security to your account" checked={twoFA}    onChange={setTwoFA}    />
        <Divider />
        <ToggleRow label="Track active sessions"     desc="Log all devices accessing your account"        checked={sessions} onChange={setSessions} />
        <Divider />
        <ToggleRow label="Audit log"                 desc="Record all admin actions for compliance"       checked={audit}    onChange={setAudit}    />
        <Divider />

        {/* Change password */}
        <button className="flex items-center justify-between w-full group">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "var(--input-bg)", border: "1px solid var(--input-bdr)" }}
            >
              <Key size={13} style={{ color: "var(--text-muted)" }} />
            </div>
            <div className="text-left">
              <p className="dark:text-slate-300 text-slate-700 text-[13px] font-medium">Change password</p>
              <p className="text-slate-500 text-[11px]">Last changed 45 days ago</p>
            </div>
          </div>
          <ChevronRight
            size={14}
            className="dark:text-slate-600 dark:group-hover:text-slate-300 text-slate-400 group-hover:text-slate-700 transition-colors"
          />
        </button>
      </Section>

      {/* ── Save button ──────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 stagger-5 animate-fade-up">
        <button
          className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors
                     dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-white/[0.04]
                     text-slate-500 hover:text-slate-800 hover:bg-black/[0.06]"
        >
          Discard changes
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold text-white
                     transition-all hover:brightness-110 active:scale-95"
          style={{
            background: saved
              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
              : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            boxShadow: saved
              ? "0 0 16px rgba(16,185,129,0.3)"
              : "0 0 16px rgba(124,58,237,0.28)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {saved ? (
            <><Check size={14} strokeWidth={3} /> Saved!</>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}
