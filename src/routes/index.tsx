import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu, X, Moon, Sun, Download, ArrowRight, Mail, Phone, MapPin,
  Facebook, Linkedin, MessageCircle, Send, Sparkles, Rocket, Target,
  Palette, Layout, Search, Megaphone, PenTool, Users, TrendingUp,
  Award, CheckCircle2, Star, ExternalLink, Briefcase, GraduationCap,
  Globe, Code2, Figma as FigmaIcon, Instagram, ArrowUpRight,
} from "lucide-react";
import michaelAsset from "@/assets/michael.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: michaelAsset.url },
      { name: "twitter:image", content: michaelAsset.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Michael Mandongwe",
          jobTitle: "Digital Marketing Specialist, Graphic Designer & Website Designer",
          address: { "@type": "PostalAddress", addressLocality: "Harare", addressCountry: "Zimbabwe" },
          email: "mandongwemichael@gmail.com",
          image: michaelAsset.url,
        }),
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Animated counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1600;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(to * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
          if (p < 1) requestAnimationFrame(step);
          else setN(to);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ---------- Navigation ---------- */
function Nav({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container-x">
        <div className={`glass flex items-center justify-between rounded-full px-4 py-2.5 sm:px-6 ${scrolled ? "shadow-[var(--shadow-soft)]" : ""}`}>
          <a href="#home" className="flex items-center gap-2 font-display font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: "var(--gradient-primary)" }}>MM</span>
            <span className="hidden sm:inline text-foreground">Michael Mandongwe</span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setDark(!dark)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/60 hover:bg-muted transition"
              aria-label="Toggle theme">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#contact" className="hidden md:inline-flex btn-primary !py-2 !px-4 text-sm">Let's talk<ArrowRight size={14} /></a>
            <button className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-border" onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden glass mt-2 rounded-2xl p-3">
            <div className="grid gap-1">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-muted">{n.label}</a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Section shell ---------- */
function Section({ id, eyebrow, title, subtitle, children }: { id: string; eyebrow?: string; title: ReactNode; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="mb-12 max-w-2xl reveal">
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-gold)" }} /> {eyebrow}
            </div>
          )}
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
          {subtitle && <p className="mt-4 text-base sm:text-lg text-muted-foreground">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const roles = [
    "Digital Marketing Specialist", "Graphic Designer", "Website Designer",
    "Brand Identity Designer", "SEO Specialist", "Social Media Strategist", "Content Creator",
  ];
  return (
    <section id="home" className="bg-hero relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-primary)" }} />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-gold)" }} />
      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="reveal">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <Sparkles size={14} className="text-[color:var(--brand-gold)]" />
              Available for freelance & full-time roles · Harare, Zimbabwe
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Helping Businesses Grow Through{" "}
              <span className="text-gradient">Digital Marketing, Design & High-Converting Websites</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I help businesses build powerful brands and achieve measurable growth through strategic digital marketing, professional graphic design, branding, website development, SEO, paid advertising, social media management, and creative content that delivers real business results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#portfolio" className="btn-primary">View My Portfolio <ArrowRight size={16} /></a>
              <a href="/cv.pdf" download="Michael-Mandongwe-CV.pdf" className="btn-gold"><Download size={16} /> Download My CV</a>
              <a href="#contact" className="btn-ghost">Contact Me</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur">
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] opacity-30 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl float-slow" style={{ background: "var(--gradient-gold)", boxShadow: "var(--shadow-elegant)" }} />
              <div className="absolute -left-6 bottom-16 h-16 w-16 rounded-full float-slow" style={{ background: "var(--gradient-primary)", animationDelay: "-2s" }} />
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-border" style={{ boxShadow: "var(--shadow-glow)" }}>
                <img src={michaelAsset.url} alt="Michael Mandongwe portrait" className="h-full w-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>
                      <Rocket size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Michael Mandongwe</div>
                      <div className="text-xs text-muted-foreground">Digital · Design · Web</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 sm:grid-cols-4">
          {[
            { n: 40, s: "+", l: "Projects Delivered" },
            { n: 25, s: "+", l: "Happy Clients" },
            { n: 300, s: "%", l: "Audience Growth" },
            { n: 4, s: "+", l: "Years Experience" },
          ].map((s) => (
            <div key={s.l} className="reveal card-elevated p-5 text-center">
              <div className="text-3xl font-bold sm:text-4xl text-gradient">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Half-portrait banner (between Hero and About) ---------- */
function HalfBanner() {
  return (
    <section aria-hidden="true" className="relative">
      <div className="container-x">
        <div className="reveal relative -mt-6 mb-6 overflow-hidden rounded-3xl border border-border" style={{ boxShadow: "var(--shadow-elegant)" }}>
          <div className="relative h-[220px] sm:h-[280px] md:h-[340px]">
            <img
              src={michaelAsset.url}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--brand-royal) 85%, transparent) 0%, color-mix(in oklab, var(--brand-royal) 30%, transparent) 45%, transparent 70%)" }} />
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 sm:px-10 md:px-14 max-w-xl text-white">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                  <Sparkles size={12} className="text-[color:var(--brand-gold)]" /> Michael Mandongwe
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                  Design. Marketing. <span style={{ color: "var(--brand-gold)" }}>Growth.</span>
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/85 sm:text-base">
                  Turning ambitious brands into unforgettable experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const highlights = [
    { icon: <Megaphone size={20} />, t: "Digital Marketing", d: "Strategy, SEO, paid ads, social media." },
    { icon: <Palette size={20} />, t: "Graphic Design", d: "Brand identities, print, social creatives." },
    { icon: <Layout size={20} />, t: "Web Design", d: "Fast, responsive, conversion-focused sites." },
    { icon: <TrendingUp size={20} />, t: "Growth", d: "Analytics-led campaigns and lead-gen funnels." },
  ];
  return (
    <Section id="about" eyebrow="About Me" title={<>Creative strategist blending <span className="text-gradient">marketing, design & code</span></>}>
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="reveal grid gap-4">
          {highlights.map((h) => (
            <div key={h.t} className="card-elevated flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{h.icon}</span>
              <div>
                <div className="font-semibold">{h.t}</div>
                <div className="text-sm text-muted-foreground">{h.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Hello, I'm <strong className="text-foreground">Michael Mandongwe</strong>, a passionate Digital Marketing Specialist, Graphic Designer, and Website Designer dedicated to helping businesses grow through creativity, strategy, and technology.
          </p>
          <p>
            My expertise spans digital marketing, branding, graphic design, website development, SEO, paid advertising, social media management, content creation, and lead generation. Through my training and hands-on client work, I have developed impactful marketing campaigns, engaging visual identities, and modern websites that strengthen brands and drive measurable business growth.
          </p>
          <p className="text-foreground font-medium">
            I believe great marketing is built on creativity, data, and meaningful customer experiences.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {["Strategic thinker", "Data-driven", "Detail obsessed", "Client-first"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-foreground">
                <CheckCircle2 size={18} className="text-[color:var(--brand-gold)]" /> <span className="text-sm font-medium">{t}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contact" className="btn-primary">Work with me <ArrowRight size={16} /></a>
            <a href="/cv.pdf" download="Michael-Mandongwe-CV.pdf" className="btn-ghost"><Download size={16} /> Download CV</a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const groups = [
    {
      title: "Digital Marketing", icon: <Megaphone size={20} />,
      items: ["Digital Marketing Strategy","Social Media Marketing","Content Marketing","SEO","Google Ads","Meta Ads","Email Marketing","Lead Generation","Google Analytics","Marketing Analytics","Campaign Management"],
    },
    {
      title: "Graphic Design", icon: <Palette size={20} />,
      items: ["Brand Identity Design","Logo Design","Flyer Design","Poster Design","Social Media Graphics","Business Cards","Company Profiles","Brochures","Banner Design","Presentation Design","Canva","Adobe Photoshop","Figma"],
    },
    {
      title: "Website Design & Development", icon: <Code2 size={20} />,
      items: ["Responsive Website Design","Landing Page Design","UI/UX Design","WordPress","Lovable AI","HTML","CSS"],
    },
  ];
  return (
    <Section id="skills" eyebrow="Skills" title={<>A full-stack creative <span className="text-gradient">toolkit</span></>} subtitle="Everything I bring to your brand — from strategy and copy to pixels and code.">
      <div className="grid gap-6 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="reveal card-elevated p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{g.icon}</span>
              <h3 className="text-lg font-semibold">{g.title}</h3>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium hover:border-[color:var(--brand-gold)] hover:text-foreground transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const services = [
    { icon: <Megaphone size={22} />, t: "Digital Marketing", d: "Full-funnel strategy that turns audiences into loyal customers." },
    { icon: <Palette size={22} />, t: "Graphic Design", d: "Bold, on-brand visuals for every touchpoint of your business." },
    { icon: <Layout size={22} />, t: "Website Design", d: "Fast, responsive, conversion-focused websites and landing pages." },
    { icon: <Sparkles size={22} />, t: "Branding & Visual Identity", d: "Logos, systems and guidelines that make you unforgettable." },
    { icon: <PenTool size={22} />, t: "Logo Design", d: "Distinctive, timeless marks crafted from research and strategy." },
    { icon: <Users size={22} />, t: "Social Media Management", d: "Content, community and growth for Facebook, Instagram & LinkedIn." },
    { icon: <PenTool size={22} />, t: "Content Creation", d: "Copy, graphics and video that stop the scroll and drive action." },
    { icon: <Target size={22} />, t: "Facebook & Instagram Ads", d: "Precisely-targeted Meta campaigns optimized for ROAS." },
    { icon: <Rocket size={22} />, t: "Google Ads Management", d: "Search, Display & YouTube campaigns that convert intent to sales." },
    { icon: <Search size={22} />, t: "SEO Optimization", d: "Technical, on-page and content SEO to earn compounding traffic." },
    { icon: <Mail size={22} />, t: "Email Marketing", d: "Automations and campaigns that nurture leads into revenue." },
    { icon: <TrendingUp size={22} />, t: "Marketing Strategy", d: "Positioning, funnels and KPIs mapped to your business goals." },
    { icon: <Target size={22} />, t: "Lead Generation", d: "Multi-channel systems that fill your pipeline with quality leads." },
    { icon: <FigmaIcon size={22} />, t: "UI/UX Design", d: "Elegant, usable interfaces designed around real user behavior." },
  ];
  return (
    <Section id="services" eyebrow="Services" title={<>What I can <span className="text-gradient">build for you</span></>} subtitle="Pick a single service or a full growth engine — everything is delivered with strategy, taste and speed.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.t} className="reveal card-elevated group relative overflow-hidden p-6" style={{ transitionDelay: `${(i % 6) * 40}ms` }}>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: "var(--gradient-primary)" }} />
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{s.icon}</span>
              <ArrowUpRight size={18} className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[color:var(--brand-gold)]" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Portfolio ---------- */
type Project = {
  title: string; tag: string; blurb: string;
  responsibilities: string[]; tools?: string[]; achievements?: string[];
  gradient: string; icon: ReactNode;
};

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="reveal card-elevated group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0" style={{ background: p.gradient }} />
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,.5), transparent 40%), radial-gradient(circle at 80% 60%, rgba(0,0,0,.35), transparent 45%)" }} />
        <div className="absolute inset-0 grid place-items-center">
          <div className="glass grid h-20 w-20 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110" style={{ background: "rgba(255,255,255,.15)" }}>
            {p.icon}
          </div>
        </div>
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">{p.tag}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
        {p.achievements && (
          <ul className="mt-4 space-y-1.5">
            {p.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[color:var(--brand-gold)]" /> <span>{a}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.responsibilities.map((r) => (
            <span key={r} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{r}</span>
          ))}
        </div>
        {p.tools && (
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tools:</span> {p.tools.join(" · ")}
          </div>
        )}
      </div>
    </article>
  );
}

function Portfolio_Section() {
  const projects: Project[] = [
    {
      title: "Makumbe Avril Holdings", tag: "Website · Branding",
      blurb: "Designed and developed a modern corporate website with premium UX, responsive design, professional branding, service pages and contact forms.",
      responsibilities: ["Website Design", "UI/UX Design", "Branding", "Graphic Design", "Responsive Development"],
      tools: ["Lovable AI", "Figma", "HTML", "CSS"],
      gradient: "linear-gradient(135deg,#0B3D91 0%,#1e5cd6 60%,#F59E0B 130%)",
      icon: <Globe size={30} />,
    },
    {
      title: "Dynamic Sales Solutions", tag: "Digital Marketing",
      blurb: "Led digital marketing to grow the company's online presence across LinkedIn and Facebook with strategic content and campaigns.",
      responsibilities: ["Social Media", "Content Calendars", "Graphic Design", "Campaign Management"],
      achievements: ["Grew LinkedIn from ~60 to 300+ followers", "Facebook page grew past 1,000 followers", "Designed promotional flyers & branded assets"],
      gradient: "linear-gradient(135deg,#111827 0%,#0B3D91 100%)",
      icon: <TrendingUp size={30} />,
    },
    {
      title: "Clothsations", tag: "Ads · Design",
      blurb: "Digital Marketer & Sales Representative running Meta ads, lead generation and creative for a lifestyle brand.",
      responsibilities: ["Facebook Advertising", "Lead Generation", "Graphic Design", "Content Creation", "Social Media", "Customer Engagement"],
      achievements: ["Promotional flyers & product ads", "Social creatives & campaigns", "Lead-gen funnels"],
      gradient: "linear-gradient(135deg,#F59E0B 0%,#f97316 60%,#0B3D91 130%)",
      icon: <Megaphone size={30} />,
    },
    {
      title: "Sneakers Vault ZW", tag: "Brand Build",
      blurb: "Built a digital brand from the ground up — from logo concepts to launch campaigns and social content strategy.",
      responsibilities: ["Brand Strategy", "Graphic Design", "Social Media Marketing", "Content Planning", "Digital Branding"],
      achievements: ["Logo concepts & brand system", "Product campaigns", "Content calendar"],
      gradient: "linear-gradient(135deg,#0B3D91 0%,#111827 100%)",
      icon: <Sparkles size={30} />,
    },
  ];

  const gallery = [
    { t: "Logo Designs", i: <PenTool size={22} />, g: "linear-gradient(135deg,#0B3D91,#1e5cd6)" },
    { t: "Brand Identity", i: <Sparkles size={22} />, g: "linear-gradient(135deg,#F59E0B,#f97316)" },
    { t: "Social Media Graphics", i: <Instagram size={22} />, g: "linear-gradient(135deg,#111827,#0B3D91)" },
    { t: "Marketing Flyers", i: <Megaphone size={22} />, g: "linear-gradient(135deg,#1e5cd6,#F59E0B)" },
    { t: "Posters", i: <Layout size={22} />, g: "linear-gradient(135deg,#0B3D91,#F59E0B)" },
    { t: "Business Cards", i: <Briefcase size={22} />, g: "linear-gradient(135deg,#111827,#334155)" },
    { t: "Company Profiles", i: <Award size={22} />, g: "linear-gradient(135deg,#0B3D91,#111827)" },
    { t: "Menu Designs", i: <PenTool size={22} />, g: "linear-gradient(135deg,#f97316,#F59E0B)" },
    { t: "Promotional Banners", i: <Rocket size={22} />, g: "linear-gradient(135deg,#1e5cd6,#0B3D91)" },
    { t: "Website UI Mockups", i: <Layout size={22} />, g: "linear-gradient(135deg,#0B3D91,#1e5cd6)" },
    { t: "Digital Advertisements", i: <Target size={22} />, g: "linear-gradient(135deg,#F59E0B,#0B3D91)" },
    { t: "Creative Campaigns", i: <Palette size={22} />, g: "linear-gradient(135deg,#111827,#F59E0B)" },
  ];

  return (
    <Section id="portfolio" eyebrow="Featured Work" title={<>Selected <span className="text-gradient">projects & campaigns</span></>} subtitle="A snapshot of work across websites, brand identities and growth campaigns.">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>

      <div className="mt-20 reveal">
        <h3 className="text-2xl font-bold sm:text-3xl">Graphic Design <span className="text-gradient">Gallery</span></h3>
        <p className="mt-2 max-w-2xl text-muted-foreground">A curated peek at the categories of design work I deliver for clients.</p>
      </div>
      <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g) => (
          <div key={g.t} className="reveal group relative aspect-square overflow-hidden rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: g.g }} />
            <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, rgba(255,255,255,.4), transparent 40%)" }} />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <div className="glass mb-2 inline-grid h-10 w-10 place-items-center rounded-xl text-white" style={{ background: "rgba(255,255,255,.18)" }}>{g.i}</div>
              <div className="text-sm font-semibold">{g.t}</div>
            </div>
            <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
              <ExternalLink className="text-white" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  const items = [
    {
      role: "Digital Marketing Specialist", org: "Dynamic Sales Solutions",
      d: "Managed digital campaigns, social media platforms, branding, and online growth strategies across LinkedIn and Facebook.",
    },
    {
      role: "Digital Marketer & Sales Representative", org: "Clothsations",
      d: "Ran digital marketing campaigns, customer engagement, Meta advertising, and promotional design.",
    },
    {
      role: "Freelance Digital Marketing, Graphic Design & Website Design", org: "Independent",
      d: "Helping businesses build strong brands through strategic marketing, creative design, and professional websites.",
    },
  ];
  return (
    <Section id="experience" eyebrow="Experience" title={<>A journey of <span className="text-gradient">real client impact</span></>}>
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2" />
        <div className="space-y-10">
          {items.map((it, i) => (
            <div key={it.role} className={`reveal relative grid gap-6 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:col-start-2" : ""}`}>
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pr-12 md:text-right" : "md:pr-12"}`}>
                <div className="card-elevated p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">
                    <Briefcase size={14} /> {it.org}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{it.role}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
                </div>
              </div>
              <div className="absolute left-4 top-6 grid h-4 w-4 -translate-x-1/2 place-items-center md:left-1/2">
                <span className="h-4 w-4 rounded-full ring-4 ring-background" style={{ background: "var(--gradient-primary)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Certifications ---------- */
function Certifications() {
  const items = [
    { t: "Digital Marketing", o: "Uncommon.org", i: <Megaphone size={20} />, file: "/certificates/digital-marketing.pdf" },
    { t: "Web Development Certificate", o: "Certified Training", i: <Code2 size={20} />, file: "/certificates/web-development.pdf" },
    { t: "Graphic Design Training", o: "Crash Course", i: <Palette size={20} />, file: "/certificates/graphic-design.pdf" },
    { t: "Google Analytics", o: "Google", i: <TrendingUp size={20} />, file: "/certificates/google-analytics.pdf" },
    { t: "Meta Digital Marketing", o: "Meta", i: <Target size={20} />, file: "/certificates/meta-digital-marketing.pdf" },
  ];
  return (
    <Section id="certifications" eyebrow="Certifications" title={<>Trained & <span className="text-gradient">certified</span></>} subtitle="Click any certificate to view or download.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.t} className="reveal card-elevated flex items-start gap-4 p-6">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{c.i}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-gold)]">
                <GraduationCap size={14} /> Certificate
              </div>
              <h3 className="mt-1 text-base font-semibold">{c.t}</h3>
              <p className="text-sm text-muted-foreground">{c.o}</p>
              <a href={c.file} download target="_blank" rel="noreferrer"
                 className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--brand-royal)] hover:underline">
                <Download size={13} /> View / Download
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
        <Award size={16} className="text-[color:var(--brand-gold)]" />
        Have a look at my full CV for the complete list.
        <a href="/cv.pdf" download="Michael-Mandongwe-CV.pdf" className="btn-primary !py-2 !px-4 text-sm"><Download size={14} /> Download CV</a>
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const items = [
    { n: "Tendai M.", r: "Founder, Startup Studio", q: "Michael combined sharp strategy with beautiful design. Our leads doubled within two months of relaunching with him.", init: "TM" },
    { n: "Rutendo S.", r: "Marketing Manager", q: "The most professional creative I've worked with — deadlines met, communication clear, and the work always on-brand.", init: "RS" },
    { n: "Kudzai C.", r: "Owner, Retail Brand", q: "From logo to Meta ads, Michael delivered an identity that finally feels premium. Our engagement is up across the board.", init: "KC" },
    { n: "Farai N.", r: "Operations Lead", q: "He rebuilt our website in Lovable AI and it converts far better than the previous one. Fast, polished, and mobile-first.", init: "FN" },
  ];
  return (
    <Section id="testimonials" eyebrow="Testimonials" title={<>Clients I've had the honor of <span className="text-gradient">working with</span></>}>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((t) => (
          <blockquote key={t.n} className="reveal card-elevated relative p-6">
            <div className="mb-3 flex gap-0.5 text-[color:var(--brand-gold)]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-base leading-relaxed">"{t.q}"</p>
            <footer className="mt-5 flex items-center gap-3 border-t border-border pt-4">
              <span className="grid h-11 w-11 place-items-center rounded-full text-white font-semibold" style={{ background: "var(--gradient-primary)" }}>{t.init}</span>
              <div>
                <div className="text-sm font-semibold">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = encodeURIComponent(String(data.get("name") || ""));
    const message = encodeURIComponent(String(data.get("message") || ""));
    const email = encodeURIComponent(String(data.get("email") || ""));
    window.location.href = `mailto:mandongwemichael@gmail.com?subject=New enquiry from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`;
    setSent(true);
  };
  return (
    <Section id="contact" eyebrow="Contact" title={<>Let's build something <span className="text-gradient">remarkable</span></>} subtitle="Have a project or a role in mind? I usually reply within a few hours.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <form onSubmit={onSubmit} className="reveal card-elevated grid gap-4 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Name" placeholder="Your full name" required />
            <Field name="email" label="Email" type="email" placeholder="you@company.com" required />
            <Field name="phone" label="Phone" placeholder="e.g. +263 77 555 0100" />
            <Field name="company" label="Company" placeholder="Company / Brand" />
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Message</span>
            <textarea name="message" required rows={5} placeholder="Tell me about your project, goals and timeline…"
              className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-royal)] focus:ring-4 focus:ring-[color:var(--brand-royal)]/15" />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn-primary"><Send size={16} /> Send message</button>
            <a href="https://wa.me/263775696593" target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle size={16} /> WhatsApp</a>
            {sent && <span className="text-sm text-muted-foreground">Opening your email client…</span>}
          </div>
        </form>

        <div className="reveal grid gap-4">
          {[
            { i: <Mail size={18} />, l: "Email", v: "mandongwemichael@gmail.com", h: "mailto:mandongwemichael@gmail.com" },
            { i: <Phone size={18} />, l: "Phone", v: "0775 696 593 · 0718 387 826", h: "tel:+263775696593" },
            { i: <MessageCircle size={18} />, l: "WhatsApp", v: "0775 696 593 · 0718 387 826", h: "https://wa.me/263775696593" },
            { i: <MapPin size={18} />, l: "Location", v: "Harare, Zimbabwe" },
          ].map((c) => (
            <a key={c.l} href={c.h || "#"} className="card-elevated flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>{c.i}</span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.l}</div>
                <div className="truncate text-sm font-medium">{c.v}</div>
              </div>
            </a>
          ))}
          <div className="card-elevated p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Social</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { i: <Linkedin size={18} />, h: "https://www.linkedin.com/in/michael-mandongwe-872b8a347" },
                { i: <Facebook size={18} />, h: "https://facebook.com" },
                { i: <MessageCircle size={18} />, h: "https://wa.me/263775696593" },
                { i: <Mail size={18} />, h: "mailto:mandongwemichael@gmail.com" },
              ].map((s, idx) => (
                <a key={idx} href={s.h} target="_blank" rel="noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-border transition hover:-translate-y-1 hover:text-white"
                  style={{ transitionProperty: "transform, background, color" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gradient-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  {s.i}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}{required && <span className="text-[color:var(--brand-gold)]"> *</span>}</span>
      <input name={name} type={type} required={required} placeholder={placeholder}
        className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-[color:var(--brand-royal)] focus:ring-4 focus:ring-[color:var(--brand-royal)]/15" />
    </label>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border bg-[color:var(--surface)]">
      <div className="container-x py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full text-white font-bold" style={{ background: "var(--gradient-primary)" }}>MM</span>
              <div>
                <div className="font-display text-lg font-bold">Michael Mandongwe</div>
                <div className="text-xs text-muted-foreground">Digital Marketing · Graphic Design · Website Design</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Helping ambitious brands grow with strategy, design and technology — from Harare to the world.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Explore</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {NAV.slice(0, 5).map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-foreground">{n.label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">More</div>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {NAV.slice(5).map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-foreground">{n.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Michael Mandongwe. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/michael-mandongwe-872b8a347" target="_blank" rel="noreferrer" className="hover:text-foreground"><Linkedin size={16} /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-foreground"><Facebook size={16} /></a>
            <a href="mailto:mandongwemichael@gmail.com" className="hover:text-foreground"><Mail size={16} /></a>
            <a href="https://wa.me/263775696593" target="_blank" rel="noreferrer" className="hover:text-foreground"><MessageCircle size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Portfolio() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground bg-aurora">
      <div className="aurora-layer" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <Nav dark={dark} setDark={setDark} />
      <main className="relative">
        <Hero />
        <HalfBanner />
        <About />
        <Skills />
        <Services />
        <Portfolio_Section />
        <Experience />
        <Certifications />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
