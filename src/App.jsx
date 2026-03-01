import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

/* ─────────────────────────────────────────────
   RESPONSIVE HOOK
   isMobile  < 640px
   isTablet  640–1023px
   isDesktop >= 1024px
───────────────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false, isDesktop: true });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
const T = {
  bg:       "#0A0A0F",
  card:     "#111118",
  border:   "rgba(255,255,255,0.08)",
  gold:     "#C9A84C",
  goldL:    "#E8C97A",
  white:    "#FFFFFF",
  gray:     "#8A8A9A",
  grayL:    "#C4C4D4",
};

/* ─────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body { background:#0A0A0F; color:#fff; font-family:'DM Sans',sans-serif; overflow-x:hidden; -webkit-font-smoothing:antialiased; }

  ::-webkit-scrollbar { width:3px; }
  ::-webkit-scrollbar-track { background:#0A0A0F; }
  ::-webkit-scrollbar-thumb { background:#C9A84C; border-radius:2px; }

  /* ── Backgrounds ── */
  .hero-bg {
    position:absolute; inset:0; z-index:0;
    background:
      radial-gradient(ellipse 80% 60% at 60% 30%, rgba(201,168,76,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(76,126,201,0.06) 0%, transparent 60%);
  }
  .grid-lines {
    position:absolute; inset:0; z-index:0; opacity:0.04;
    background-image:linear-gradient(#C9A84C 1px,transparent 1px),
                     linear-gradient(90deg,#C9A84C 1px,transparent 1px);
    background-size:60px 60px;
  }
  .grain {
    position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:0.025;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ── Animations ── */
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
  @keyframes fadeUp  { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }

  .fade-up { animation:fadeUp 0.75s ease both; }

  /* ── Gold text ── */
  .gold-text {
    background:linear-gradient(135deg,#C9A84C 0%,#E8C97A 50%,#C9A84C 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text; animation:shimmer 4s linear infinite;
  }

  /* ── Cards ── */
  .card {
    background:#111118; border:1px solid rgba(255,255,255,0.08);
    border-radius:16px; transition:border-color .3s,transform .3s,box-shadow .3s;
    position:relative; overflow:hidden;
  }
  .card::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,rgba(201,168,76,0.05) 0%,transparent 50%);
    opacity:0; transition:opacity .3s; pointer-events:none;
  }
  .card:hover { border-color:rgba(201,168,76,0.3); transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,0.4),0 0 40px rgba(201,168,76,0.05); }
  .card:hover::before { opacity:1; }

  /* ── Skill tags ── */
  .stag {
    display:inline-block; padding:5px 12px; border-radius:100px;
    font-size:12px; font-family:'DM Mono',monospace;
    border:1px solid rgba(201,168,76,0.25); color:#E8C97A;
    background:rgba(201,168,76,0.07); transition:all .2s; white-space:nowrap;
  }
  .stag:hover { background:rgba(201,168,76,0.15); border-color:rgba(201,168,76,0.5); }

  /* ── Nav links ── */
  .nl {
    color:#8A8A9A; text-decoration:none; font-size:13px; font-weight:500;
    letter-spacing:.06em; text-transform:uppercase; transition:color .2s; cursor:pointer;
  }
  .nl:hover,.nl.active { color:#C9A84C; }

  /* ── Section label ── */
  .slabel {
    font-family:'DM Mono',monospace; font-size:11px; letter-spacing:.2em;
    text-transform:uppercase; color:#C9A84C;
    display:flex; align-items:center; gap:12px;
  }
  .slabel::before { content:''; display:block; width:28px; height:1px; background:#C9A84C; flex-shrink:0; }

  /* ── Buttons ── */
  .btn-p {
    display:inline-flex; align-items:center; gap:8px; padding:12px 26px;
    background:linear-gradient(135deg,#C9A84C,#E8C97A); color:#0A0A0F;
    font-weight:700; font-size:13px; letter-spacing:.06em; text-transform:uppercase;
    border-radius:100px; cursor:pointer; border:none; transition:all .3s; text-decoration:none;
  }
  .btn-p:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(201,168,76,0.4); }

  .btn-o {
    display:inline-flex; align-items:center; gap:8px; padding:11px 26px;
    background:transparent; color:#C9A84C; font-weight:500; font-size:13px;
    letter-spacing:.06em; text-transform:uppercase; border-radius:100px;
    cursor:pointer; border:1px solid rgba(201,168,76,0.4); transition:all .3s; text-decoration:none;
  }
  .btn-o:hover { background:rgba(201,168,76,0.08); border-color:#C9A84C; }

  /* ── Progress ── */
  .pbar { height:2px; background:rgba(255,255,255,0.06); border-radius:2px; overflow:hidden; }
  .pfill { height:100%; border-radius:2px; background:linear-gradient(90deg,#C9A84C,#E8C97A); transition:width 1.5s cubic-bezier(.16,1,.3,1); }

  /* ── Contact items ── */
  .ci {
    display:flex; align-items:center; gap:12px; padding:13px 16px;
    background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08);
    border-radius:12px; text-decoration:none; color:#C4C4D4; transition:all .2s;
  }
  .ci:hover { border-color:rgba(201,168,76,0.3); color:#fff; background:rgba(201,168,76,0.05); }

  /* ── Form fields ── */
  .ff {
    width:100%; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1);
    border-radius:12px; padding:13px 16px; color:#fff;
    font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:all .2s; resize:none;
  }
  .ff::placeholder { color:#44445A; }
  .ff:focus { border-color:rgba(201,168,76,0.5); background:rgba(201,168,76,0.04); box-shadow:0 0 0 3px rgba(201,168,76,0.07); }

  /* ── Hamburger ── */
  .hbg { cursor:pointer; display:flex; flex-direction:column; gap:5px; padding:4px; z-index:1000; position:relative; }
  .hbg span { display:block; width:22px; height:2px; background:#C9A84C; border-radius:2px; transition:all .3s; }
  .hbg.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
  .hbg.open span:nth-child(2) { opacity:0; }
  .hbg.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }

  /* ── Mobile drawer ── */
  .drawer {
    position:fixed; inset:0; z-index:998;
    background:rgba(10,10,15,0.98); backdrop-filter:blur(24px);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:36px;
  }
  .drawer .nl { font-size:20px; letter-spacing:.12em; }

  /* ── Floating orbs (hero, desktop only) ── */
  .orb { animation:float 3.5s ease-in-out infinite; }

  /* ── Responsive overrides ── */
  @media (max-width:1023px) {
    .desktop-only { display:none !important; }
  }
  @media (max-width:639px) {
    .hero-cta  { flex-direction:column; }
    .hero-cta > * { width:100%; text-align:center; justify-content:center; }
    .stats-row { gap:24px !important; }
    .form-row  { grid-template-columns:1fr !important; }
    .ftrow     { flex-direction:column; align-items:center; text-align:center; gap:6px !important; }
  }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  { id:1, name:"AirtopUp",            sub:"Mobile Recharge & Wallet",  env:["React Native","Vite+TS","Redux"],        color:"#4C7EC9", icon:"📱", desc:"Cross-platform recharge app with Paysafe, World TopUp, Gift Cards & Travel SIM for Android and iOS.", hl:["Auth flows + validation","Axios global config","Redux Toolkit","Multi-module integration"] },
  { id:2, name:"Engineering Marg",    sub:"College Choice Advisor",     env:["React","Bootstrap","Razorpay"],          color:"#C97E4C", icon:"🎓", desc:"Student-focused web app helping Maharashtra aspirants pick colleges via MHT-CET scores.", hl:["Admin Dashboard","Razorpay payments","Google Login","Real-time college data"] },
  { id:3, name:"Vasanthan Baskaran",  sub:"SEO Blog Platform",          env:["Next.js","TypeScript","Supabase"],       color:"#4CC98A", icon:"✍️", desc:"Full-stack blog with ISR, canonical meta tags, CRUD ops and Supabase backend.", hl:["ISR for SEO","REST API routes","CRUD operations","Pagination meta tags"] },
  { id:4, name:"T-Junction",          sub:"Learning & Job Platform",    env:["React","AI","Razorpay"],                 color:"#9A4CC9", icon:"🚀", desc:"Multi-role platform (Trainer, Student, Recruiter) with AI career roadmap and role-fit analysis.", hl:["AI career roadmap","Role-based routing","Axios refresh token","Razorpay"] },
  { id:5, name:"Pin2Sale",            sub:"Calling Card Platform",      env:["React JS","Bootstrap","Cypress"],        color:"#C94C4C", icon:"📞", desc:"German-market calling card platform with ACL menus, XSS protection and WebSocket auto-logout.", hl:["ACL dynamic menu","DOMPurify XSS","Cypress testing","PDF generation"] },
  { id:6, name:"INS Calling Card",    sub:"International Recharge",     env:["React","Material UI"],                   color:"#4CC9C9", icon:"🌐", desc:"International mobile recharge portal with Material UI and systematic QA-driven bug resolution.", hl:["Material UI design","Bug resolution","System stability","QA collaboration"] },
];

const SKILLS = [
  { cat:"Frontend",       items:["React.js","Next.js","TypeScript","JavaScript","HTML5","CSS3"], level:90 },
  { cat:"Mobile",         items:["React Native","Android","iOS"],                                level:80 },
  { cat:"State & Tools",  items:["Redux Toolkit","Redux","Axios","NPM"],                         level:85 },
  { cat:"Styling",        items:["Bootstrap","Tailwind CSS","Material UI"],                      level:88 },
  { cat:"Backend & DB",   items:["Supabase","Next.js API","REST APIs"],                          level:75 },
  { cat:"Testing & SEO",  items:["Cypress","SEO Opt.","ISR","Meta tags"],                        level:78 },
];

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function Portfolio() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const sm = isMobile || isTablet;           // "small" = not desktop
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState("home");
  const [visible, setVisible]     = useState(false);

  /* section spy */
  useEffect(() => {
    const spy = () => {
      for (const id of ["home","about","skills","projects","contact"]) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom > 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener("scroll", spy);
    return () => window.removeEventListener("scroll", spy);
  }, []);

  useEffect(() => { const t = setTimeout(()=>setVisible(true), 150); return ()=>clearTimeout(t); }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  /* dynamic padding helpers */
  const px   = isMobile ? 20 : isTablet ? 32 : 48;
  const spv  = isMobile ? 80 : isTablet ? 100 : 120;
  const sp   = `${spv}px ${px}px`;

  return (
    <>
      <style>{CSS}</style>
      <div className="grain" />

      {/* ─── MOBILE DRAWER ─── */}
      {menuOpen && (
        <div className="drawer" onClick={()=>setMenuOpen(false)}>
          {["home","about","skills","projects","contact"].map(id=>(
            <span key={id} className={`nl ${active===id?"active":""}`}
              onClick={e=>{ e.stopPropagation(); go(id); }}>
              {id}
            </span>
          ))}
          <a href="mailto:nibidhacr@gmail.com" className="btn-p" style={{marginTop:8}}>Hire Me</a>
        </div>
      )}

      {/* ─── NAV ─── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:999,
        padding: isMobile ? "15px 20px" : "18px 48px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background:"rgba(10,10,15,0.92)", backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
      }}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:600}}>
          <span className="gold-text">NCR</span>
        </span>

        {/* Desktop links */}
        {isDesktop && (
          <div style={{display:"flex",gap:32}}>
            {["home","about","skills","projects","contact"].map(id=>(
              <span key={id} className={`nl ${active===id?"active":""}`} onClick={()=>go(id)}>{id}</span>
            ))}
          </div>
        )}

        <div style={{display:"flex",alignItems:"center",gap:12}}>
          {isDesktop && (
            <a href="mailto:nibidhacr@gmail.com" className="btn-p" style={{padding:"9px 22px",fontSize:12}}>Hire Me</a>
          )}
          {sm && (
            <div className={`hbg ${menuOpen?"open":""}`} onClick={()=>setMenuOpen(o=>!o)}>
              <span/><span/><span/>
            </div>
          )}
        </div>
      </nav>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section id="home" style={{
        minHeight:"100vh", position:"relative",
        display:"flex", alignItems:"center",
        padding: isMobile ? "110px 20px 60px" : isTablet ? "110px 32px 80px" : "120px 48px 80px",
      }}>
        <div className="hero-bg"/><div className="grid-lines"/>

        <div style={{position:"relative",zIndex:1,maxWidth:1200,margin:"0 auto",width:"100%"}}>
          <div style={{
            display:"grid",
            gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
            gap: isDesktop ? 60 : 0,
            alignItems:"center",
          }}>

            {/* ── Left ── */}
            <div style={{opacity:visible?1:0,animation:visible?"fadeUp .8s ease both":"none"}}>
              {/* badges */}
              <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap"}}>
                {[
                  {emoji:"💼",text:"2+ Years Experience",border:"rgba(201,168,76,0.3)",bg:"rgba(201,168,76,0.06)",color:"#E8C97A"},
                  {emoji:"⚛️",text:"React Specialist",border:"rgba(76,126,201,0.3)",bg:"rgba(76,126,201,0.06)",color:"#A0C0F0"},
                ].map(b=>(
                  <span key={b.text} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"6px 14px",border:`1px solid ${b.border}`,borderRadius:100,fontSize:12,background:b.bg,color:b.color,fontFamily:"'DM Mono',monospace"}}>{b.emoji} {b.text}</span>
                ))}
              </div>

              {/* Name */}
              <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:isMobile?"3rem":isTablet?"4rem":"5.5rem",fontWeight:700,lineHeight:1,letterSpacing:"-.02em",marginBottom:6}}>
                Nibidha
              </h1>
              <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:isMobile?"3rem":isTablet?"4rem":"5.5rem",fontWeight:700,lineHeight:1,letterSpacing:"-.02em",marginBottom:22}}>
                <span className="gold-text">C R</span>
              </h1>

              <p style={{fontSize:isMobile?15:17,fontWeight:300,color:T.grayL,lineHeight:1.8,marginBottom:10}}>
                React Developer & Frontend Engineer
              </p>
              <p style={{fontSize:14,color:T.gray,lineHeight:1.8,marginBottom:34,maxWidth:460}}>
                Crafting high-performance web & mobile applications with React, Next.js, and TypeScript. Specialized in scalable, user-centric products.
              </p>

              {/* CTA */}
              <div className="hero-cta" style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:44}}>
                <span className="btn-p" onClick={()=>go("projects")}>View Projects ↗</span>
                <span className="btn-o" onClick={()=>go("contact")}>Get In Touch</span>
              </div>

              {/* Stats */}
              <div style={{paddingTop:28,borderTop:`1px solid ${T.border}`}}>
                <div className="stats-row" style={{display:"flex",gap:36,flexWrap:"wrap"}}>
                  {[["6","Projects"],["2+","Years Exp"],["10+","Technologies"]].map(([n,l])=>(
                    <div key={l}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:isMobile?"1.9rem":"2.4rem",fontWeight:700}}>
                        <span className="gold-text">{n}</span>
                      </div>
                      <div style={{fontSize:11,color:T.gray,letterSpacing:".06em",textTransform:"uppercase"}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right visual (desktop only) ── */}
            <div className="desktop-only" style={{display:"flex",justifyContent:"center",position:"relative",height:400}}>
              <div style={{width:340,height:340,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.12)",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"spin 30s linear infinite"}}/>
              <div style={{width:260,height:260,borderRadius:"50%",border:"1px dashed rgba(201,168,76,0.08)",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
              <div className="orb" style={{width:175,height:175,borderRadius:"50%",background:"linear-gradient(135deg,rgba(201,168,76,0.18),rgba(76,126,201,0.12))",border:"2px solid rgba(201,168,76,0.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem",boxShadow:"0 0 60px rgba(201,168,76,0.12)",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:1}}>
                👩‍💻
              </div>
              {[{l:"React.js",x:-130,y:-50},{l:"Next.js",x:85,y:-90},{l:"TypeScript",x:110,y:55},{l:"React Native",x:-140,y:72}].map(({l,x,y},i)=>(
                <div key={l} style={{position:"absolute",top:`calc(50% + ${y}px)`,left:`calc(50% + ${x}px)`,transform:"translate(-50%,-50%)",padding:"7px 14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:100,fontSize:11,fontFamily:"'DM Mono',monospace",color:"#E8C97A",zIndex:2,whiteSpace:"nowrap",animation:`float ${3+i*.4}s ease-in-out infinite`,animationDelay:`${i*.25}s`}}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
      <section id="about" style={{padding:sp}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{
            display:"grid",
            gridTemplateColumns: isDesktop ? "1fr 1.5fr" : "1fr",
            gap: isMobile ? 36 : isTablet ? 48 : 72,
            alignItems:"start",
          }}>
            {/* Left */}
            <div>
              <div className="slabel" style={{marginBottom:18}}>About Me</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:isMobile?"2rem":isTablet?"2.5rem":"2.8rem",fontWeight:600,lineHeight:1.2,marginBottom:24}}>
                Passionate Developer,<br/><span className="gold-text">Global Mindset</span>
              </h2>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[
                  {icon:"🎓",t:"ME in Computer Science Engineering",s:"University College of Engineering & Technology, BIT Campus Trichy"},
                  {icon:"💼",t:"Software Developer — Cognitude Technology",s:"Chennai, India · Dec 2023 – Present"},
                  {icon:"🗣️",t:"Languages",s:"English (Professional) · Tamil (Native)"},
                ].map(({icon,t,s})=>(
                  <div key={t} style={{display:"flex",gap:14,padding:"13px 15px",background:T.card,border:`1px solid ${T.border}`,borderRadius:12}}>
                    <span style={{fontSize:18,flexShrink:0,marginTop:1}}>{icon}</span>
                    <div>
                      <div style={{fontSize:13,fontWeight:500,marginBottom:3}}>{t}</div>
                      <div style={{fontSize:12,color:T.gray}}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <p style={{fontSize:15,color:T.grayL,lineHeight:1.9,marginBottom:18}}>
                Highly motivated React Developer with <strong style={{color:"#E8C97A"}}>2+ years of professional experience</strong>. Driven by passion, I self-learned React, Next.js, SEO, and LangChain basics to transition into tech.
              </p>
              <p style={{fontSize:15,color:T.grayL,lineHeight:1.9,marginBottom:28}}>
                I bridge frontend and backend understanding — enabling effective cross-team communication and a grasp of complete system architecture. From mobile apps to SEO-optimized platforms with payment integrations.
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                {[
                  {l:"Frontend Excellence",d:"React, Next.js, TypeScript"},
                  {l:"Mobile Development", d:"React Native (iOS & Android)"},
                  {l:"AI Integration",     d:"LangChain, AI-powered features"},
                  {l:"Payment Systems",    d:"Razorpay, Paysafe integration"},
                ].map(({l,d})=>(
                  <div key={l} style={{padding:"14px",background:T.card,border:`1px solid ${T.border}`,borderRadius:12}}>
                    <div style={{fontSize:12,color:T.gold,fontFamily:"'DM Mono',monospace",marginBottom:5}}>✦</div>
                    <div style={{fontSize:13,fontWeight:500,marginBottom:3}}>{l}</div>
                    <div style={{fontSize:12,color:T.gray}}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SKILLS
      ════════════════════════════════════════ */}
      <section id="skills" style={{padding:sp,background:"rgba(255,255,255,0.012)",borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:isMobile?40:60}}>
            <div className="slabel" style={{justifyContent:"center",marginBottom:14}}>Technical Skills</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:isMobile?"2rem":isTablet?"2.5rem":"2.8rem",fontWeight:600}}>
              Tools & <span className="gold-text">Technologies</span>
            </h2>
          </div>

          <div style={{display:"grid",gridTemplateColumns:isDesktop?"1fr 1fr":"1fr",gap:18}}>
            {SKILLS.map(({cat,items,level})=>(
              <div key={cat} className="card" style={{padding:isMobile?"18px":"24px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:14,fontWeight:500}}>{cat}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.gold}}>{level}%</span>
                </div>
                <div className="pbar" style={{marginBottom:14}}>
                  <div className="pfill" style={{width:`${level}%`}}/>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {items.map(i=><span key={i} className="stag">{i}</span>)}
                </div>
              </div>
            ))}
          </div>

          {/* Also-knows strip */}
          <div style={{marginTop:20,padding:isMobile?"14px 16px":"18px 24px",background:T.card,border:`1px solid ${T.border}`,borderRadius:14,display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
            <span style={{fontSize:12,color:T.gray,marginRight:4,whiteSpace:"nowrap"}}>Also:</span>
            {["Python","Git","Cypress","VS Code","Linux","DOMPurify","WebSockets","LangChain basics"].map(s=>(
              <span key={s} className="stag" style={{borderColor:"rgba(76,126,201,0.25)",color:"#A0C0F0",background:"rgba(76,126,201,0.07)",fontSize:11}}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════ */}
      <section id="projects" style={{padding:sp}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:isMobile?40:60}}>
            <div className="slabel" style={{justifyContent:"center",marginBottom:14}}>Portfolio</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:isMobile?"2rem":isTablet?"2.5rem":"2.8rem",fontWeight:600}}>
              Featured <span className="gold-text">Projects</span>
            </h2>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns: isMobile?"1fr":isTablet?"1fr 1fr":"1fr 1fr 1fr",
            gap:18,
          }}>
            {PROJECTS.map(p=>(
              <div key={p.id} className="card" style={{padding:isMobile?"18px":"24px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
                  <div style={{width:42,height:42,borderRadius:10,background:`${p.color}1A`,border:`1px solid ${p.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19}}>{p.icon}</div>
                  <div style={{width:7,height:7,borderRadius:"50%",background:p.color,boxShadow:`0 0 8px ${p.color}`,animation:"pulse 2s ease-in-out infinite"}}/>
                </div>
                <div style={{fontSize:15,fontWeight:600,marginBottom:4}}>{p.name}</div>
                <div style={{fontSize:11,color:p.color,marginBottom:10,fontFamily:"'DM Mono',monospace"}}>{p.sub}</div>
                <p style={{fontSize:13,color:T.gray,lineHeight:1.7,marginBottom:14}}>{p.desc}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
                  {p.env.map(e=>(
                    <span key={e} style={{fontSize:10,padding:"3px 9px",borderRadius:100,border:`1px solid ${p.color}33`,color:p.color,background:`${p.color}0D`,fontFamily:"'DM Mono',monospace"}}>{e}</span>
                  ))}
                </div>
                <div style={{borderTop:`1px solid ${T.border}`,paddingTop:12}}>
                  {p.hl.map(h=>(
                    <div key={h} style={{display:"flex",alignItems:"center",gap:7,padding:"3px 0",fontSize:12,color:T.grayL}}>
                      <span style={{color:p.color,fontSize:"8px"}}>◆</span>{h}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      <section id="contact" style={{padding:sp,background:"rgba(255,255,255,0.012)",borderTop:`1px solid ${T.border}`}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{marginBottom:isMobile?36:52}}>
            <div className="slabel" style={{marginBottom:14}}>Contact</div>
            <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:isMobile?"2rem":isTablet?"2.5rem":"2.8rem",fontWeight:600}}>
              Let's <span className="gold-text">Connect</span>
            </h2>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns: isDesktop ? "1fr 1.4fr" : "1fr",
            gap: isMobile ? 36 : isTablet ? 40 : 56,
            alignItems:"start",
          }}>
            {/* Info */}
            <div>
              <p style={{fontSize:14,color:T.gray,lineHeight:1.9,marginBottom:24}}>
                Open to full-time React / Frontend roles. Whether you have a project or just want to talk tech — drop a message and I'll reply within 24 hours!
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:22}}>
                {[
                  {href:"mailto:nibidhacr@gmail.com",icon:"✉️",label:"EMAIL",val:"nibidhacr@gmail.com"},
                  {href:"tel:+919500311622",icon:"📱",label:"PHONE",val:"+91 9500311622"},
                  {href:"https://www.linkedin.com/in/nibidha-c-r-7389b1290",icon:"💼",label:"LINKEDIN",val:"nibidha-rajkumar"},
                ].map(({href,icon,label,val})=>(
                  <a key={label} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" className="ci">
                    <span style={{fontSize:18}}>{icon}</span>
                    <div>
                      <div style={{fontSize:10,color:T.gray,marginBottom:2,fontFamily:"'DM Mono',monospace",letterSpacing:".1em"}}>{label}</div>
                      <div style={{fontSize:13}}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
              {/* Availability pill */}
              <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"12px 16px",background:"rgba(76,201,138,0.07)",border:"1px solid rgba(76,201,138,0.25)",borderRadius:12}}>
                <span style={{width:7,height:7,borderRadius:"50%",background:"#4CC98A",display:"block",boxShadow:"0 0 8px #4CC98A",flexShrink:0,animation:"pulse 2s ease-in-out infinite"}}/>
                <div>
                  <div style={{fontSize:10,color:"#4CC98A",fontFamily:"'DM Mono',monospace",letterSpacing:".1em",marginBottom:1}}>AVAILABILITY</div>
                  <div style={{fontSize:12,color:T.grayL}}>Available for new opportunities</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <ContactForm isMobile={isMobile} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer style={{padding:isMobile?"22px 20px":"26px 48px",borderTop:`1px solid ${T.border}`}}>
        <div className="ftrow" style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,maxWidth:1200,margin:"0 auto"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17}}><span className="gold-text">Nibidha C R</span></div>
          <div style={{fontSize:12,color:T.gray}}>React Developer · Frontend Engineer</div>
          <div style={{fontSize:12,color:T.gray,fontFamily:"'DM Mono',monospace"}}>© 2025</div>
        </div>
      </footer>
    </>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function ContactForm({ isMobile }) {
  const [form, setForm]     = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handle = e => setForm(f=>({...f,[e.target.name]:e.target.value}));

const submit = (e) => {
  e.preventDefault();
  setStatus("sending");

  emailjs.send(
    "service_mnji3us",
    "template_avn0g4j",
    {
      from_name:  form.name,
      from_email: form.email,
      subject:    form.subject,
      message:    form.message,
    },
    "_nJzD-vgZmQaVsHcF"
  )
  .then(() => setStatus("sent"))
  .catch(() => setStatus("error"));
};

  const fld = { width:"100%", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px", padding:"13px 16px", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:"14px", outline:"none", transition:"all .2s" };
  const onFocus = e=>{ e.target.style.borderColor="rgba(201,168,76,0.5)"; e.target.style.background="rgba(201,168,76,0.04)"; };
  const onBlur  = e=>{ e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.background="rgba(255,255,255,0.03)"; };
  const LBL     = { display:"block", fontSize:"11px", fontFamily:"'DM Mono',monospace", letterSpacing:".12em", textTransform:"uppercase", color:"#8A8A9A", marginBottom:"7px" };

  return (
    <div style={{background:"#111118",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"18px",padding:isMobile?"22px":"36px"}}>
      <div style={{marginBottom:22}}>
        <div style={{fontSize:17,fontWeight:600,marginBottom:4}}>Send a Message</div>
        <div style={{fontSize:12,color:"#8A8A9A"}}>I'll reply within 24 hours</div>
      </div>

      {status==="sent" ? (
        <div style={{textAlign:"center",padding:"44px 20px",background:"rgba(76,201,138,0.06)",border:"1px solid rgba(76,201,138,0.2)",borderRadius:"12px"}}>
          <div style={{fontSize:"2.5rem",marginBottom:12}}>✅</div>
          <div style={{fontSize:17,fontWeight:600,marginBottom:8,color:"#4CC98A"}}>Message Ready!</div>
          <div style={{fontSize:13,color:"#8A8A9A"}}>Your email client opened — please hit send to complete.</div>
          <button onClick={()=>setStatus("idle")} style={{marginTop:18,padding:"8px 22px",borderRadius:"100px",border:"1px solid rgba(201,168,76,0.3)",background:"transparent",color:"#C9A84C",cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:16}}>
          {/* Name + Email */}
          <div className="form-row" style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:14}}>
            <div>
              <label style={LBL}>Your Name *</label>
              <input className="ff" name="name" value={form.name} onChange={handle} placeholder="John Smith" required style={fld} onFocus={onFocus} onBlur={onBlur}/>
            </div>
            <div>
              <label style={LBL}>Email *</label>
              <input className="ff" name="email" value={form.email} onChange={handle} placeholder="john@company.com" type="email" required style={fld} onFocus={onFocus} onBlur={onBlur}/>
            </div>
          </div>

          <div>
            <label style={LBL}>Subject</label>
            <input className="ff" name="subject" value={form.subject} onChange={handle} placeholder="React Developer Opportunity" style={fld} onFocus={onFocus} onBlur={onBlur}/>
          </div>

          <div>
            <label style={LBL}>Message *</label>
            <textarea className="ff" name="message" value={form.message} onChange={handle} placeholder="Tell me about the role or project…" rows={isMobile?4:5} required style={{...fld,resize:"none"}} onFocus={onFocus} onBlur={onBlur}/>
          </div>

          <button type="submit" disabled={status==="sending"} style={{
            width:"100%", padding:"14px",
            background:status==="sending"?"rgba(201,168,76,0.35)":"linear-gradient(135deg,#C9A84C,#E8C97A)",
            color:"#0A0A0F", fontWeight:700, fontSize:"13px",
            letterSpacing:".08em", textTransform:"uppercase",
            border:"none", borderRadius:"12px",
            cursor:status==="sending"?"not-allowed":"pointer",
            fontFamily:"'DM Sans',sans-serif", transition:"all .3s",
          }}>
            {status==="sending" ? "Opening Mail Client…" : "Send Message ✉️"}
          </button>

          <p style={{fontSize:11,color:"#44445A",textAlign:"center"}}>
            Opens your email client with the message pre-filled.
          </p>
        </form>
      )}
    </div>
  );
}