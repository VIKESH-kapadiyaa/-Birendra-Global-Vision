'use client';
import React, { useState, useEffect } from 'react';
import {
  Code,
  ChevronRight,
  Users,
  Target,
  Cpu,
  Menu,
  X,
  Star,
  Clock,
  BookOpen,
  ShieldCheck,
  Zap,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Plus,
  Minus,
  Sparkles,
  Globe
} from 'lucide-react';

/**
 * WORLD-CLASS NEO-MINIMALIST UI - RESTORED ORIGINAL CONTENT
 * Focus: High-end spacing, refined typography, architectural depth.
 * Content: Restored Coding, Chess, Math, and original Tutor Profiles.
 */

const useScrollPosition = () => {
  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    const updatePosition = () => setScrollPos(window.pageYOffset);
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPos;
};

// --- Architectural 3D Illustrations (Restored for specific subjects) ---
const AbstractVisual = ({ type }: { type: string }) => {
  if (type === 'coding') {
    return (
      <div className="relative w-full h-40 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
        <div className="absolute w-24 h-24 bg-blue-600/5 rounded-[2rem] rotate-12 blur-2xl"></div>
        <div className="relative w-36 h-24 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 flex flex-col gap-2 overflow-hidden">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-400/50"></div>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full"></div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-100"></div>
            <div className="flex-1 h-6 rounded-md bg-slate-50 border border-slate-100"></div>
          </div>
          <div className="w-1/2 h-1.5 bg-slate-100 rounded-full"></div>
        </div>
      </div>
    );
  }
  if (type === 'math') {
    return (
      <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 200" className="w-32 h-32 animate-spin-slow">
          <circle cx="100" cy="100" r="70" fill="none" stroke="#2563eb" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-20" />
          <path d="M60 100 L140 100 M100 60 L100 140" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          <rect x="75" y="75" width="50" height="50" rx="10" fill="white" stroke="#2563eb" strokeWidth="1.5" className="shadow-lg" />
        </svg>
      </div>
    );
  }
  if (type === 'chess') {
    return (
      <div className="relative w-full h-40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <div className="flex items-end gap-1">
          <div className="w-8 h-16 bg-slate-100 border border-slate-200 rounded-t-full shadow-sm transform -rotate-6"></div>
          <div className="w-10 h-24 bg-blue-600 rounded-t-full shadow-lg z-10"></div>
          <div className="w-8 h-16 bg-slate-100 border border-slate-200 rounded-t-full shadow-sm transform rotate-6"></div>
        </div>
      </div>
    );
  }
  return null;
};

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-[10px] font-bold tracking-widest uppercase ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant = "primary", className = "", ...props }: any) => {
  const variants: any = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_10px_20px_-5px_rgba(37,99,235,0.3)]",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10",
    outline: "border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
  };
  return (
    <button
      className={`px-7 py-3.5 rounded-2xl font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TutorCard = ({ name, role, rating, topics }: { name: string; role: string; rating: number; topics: string[] }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
    <div className="flex items-center gap-5 mb-6">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div>
        <h4 className="text-slate-900 font-bold text-lg">{name}</h4>
        <p className="text-slate-500 text-sm font-medium">{role}</p>
      </div>
    </div>
    <div className="flex items-center gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className={i < Math.floor(rating) ? "fill-blue-500 text-blue-500" : "text-slate-200"} />
      ))}
      <span className="text-xs font-bold text-slate-400 ml-2">{rating} (120+ reviews)</span>
    </div>
    <div className="flex flex-wrap gap-2">
      {topics.map(topic => (
        <span key={topic} className="px-3 py-1.5 bg-slate-50 rounded-xl text-[10px] text-slate-600 uppercase tracking-widest font-black border border-slate-100">
          {topic}
        </span>
      ))}
    </div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`border-b border-slate-100 last:border-0 transition-all duration-300 ${isOpen ? 'bg-slate-50/30 -mx-4 px-4 rounded-2xl' : ''}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between py-6 text-left group">
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>{question}</span>
        <span className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-all ${isOpen ? 'rotate-180 bg-blue-600 border-blue-600 text-white shadow-lg' : 'text-slate-400'}`}>
          <Plus size={16} className={isOpen ? 'hidden' : 'block'} />
          <Minus size={16} className={isOpen ? 'block' : 'hidden'} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-500 leading-relaxed pr-10">{answer}</p>
      </div>
    </div>
  );
};

export default function App() {
  const scrollPos = useScrollPosition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white font-['Inter',sans-serif]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-6 ${scrollPos > 30 ? 'py-3' : ''}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between p-2 rounded-3xl transition-all duration-500 ${scrollPos > 30 ? 'bg-white/70 backdrop-blur-xl border border-slate-200 shadow-lg' : 'bg-transparent'}`}>
          <div className="flex items-center gap-3 pl-4 group cursor-pointer">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform shadow-lg shadow-blue-600/20">
              <Cpu className="text-white" size={18} />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">GENIUS<span className="text-blue-600">HUB</span></span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Subjects', 'Tutors', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors">{item}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 pr-2">
            <Button variant="ghost" className="text-xs uppercase tracking-widest px-4 py-2">Sign In</Button>
            <Button className="text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl">Book a Free Trial</Button>
          </div>

          <button className="md:hidden p-3 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1000px] bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.06),transparent_50%)] pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-10">
            <div className="space-y-4">
              <Badge className="bg-blue-50 border-blue-100 text-blue-600">
                <Sparkles size={12} className="animate-pulse" /> Ranked #1 for 1:1 Tutoring
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                Master Any Skill with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient-x">Expert Clarity.</span>
              </h1>
            </div>

            <p className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Hyper-personalized 1:1 online tutoring for high achievers.
              Our vetted experts translate complexity into simple, actionable mastery.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Button variant="secondary" className="text-lg px-10 py-5 rounded-[2rem] group shadow-2xl">
                Book a Free Trial
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <div className="flex items-center gap-3 px-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
                <Globe size={18} className="text-blue-500" /> 24/7 Global Access
              </div>
            </div>

            <div className="pt-10 flex flex-wrap items-center justify-center lg:justify-start gap-12 opacity-30 font-black tracking-tighter text-2xl grayscale">
              <span>STANFORD</span>
              <span>OXFORD</span>
              <span>MIT</span>
              <span>HARVARD</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative z-10 p-6 rounded-[3rem] bg-white/40 backdrop-blur-3xl border border-white/40 shadow-2xl">
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between aspect-square">
                  <Badge className="w-fit">Math</Badge>
                  <AbstractVisual type="math" />
                  <div className="text-xs font-bold text-slate-400">Dr. Aris Thorne</div>
                </div>
                <div className="bg-slate-900 p-5 rounded-[2rem] shadow-2xl flex flex-col justify-between aspect-square text-white">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Zap size={20} className="text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase opacity-50">Live Pulse</div>
                    <div className="text-xl font-bold">Coding Lab</div>
                  </div>
                </div>
                <div className="col-span-2 bg-blue-600 p-6 rounded-[2.5rem] text-white flex items-center justify-between group overflow-hidden relative">
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold uppercase opacity-70 mb-1">Upcoming</div>
                    <div className="text-lg font-bold">Chess Tactics w/ Magnus</div>
                  </div>
                  <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Bento Grid */}
      <section id="subjects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <Badge className="text-blue-600">Core Subjects</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Engineered for <br /> Achievement.</h2>
            </div>
            <p className="text-slate-500 max-w-md text-lg font-medium leading-relaxed">
              A modular approach to learning that adapts to your pace, goal, and unique cognitive profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 p-10 rounded-[3rem] bg-slate-50 border border-slate-100 group hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="space-y-6 flex-1">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                    <Code size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Advanced Coding Labs</h3>
                  <p className="text-slate-500 leading-relaxed">From Python to Solidity, get hands-on experience with live code-sharing and real-time debugging from senior engineers.</p>
                </div>
                <div className="flex-1">
                  <AbstractVisual type="coding" />
                </div>
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-white border border-slate-100 group hover:shadow-xl transition-all duration-500">
              <div className="space-y-6 text-center">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Strategic Chess</h3>
                <p className="text-slate-500">Learn grandmaster techniques, endgame theory, and tactical patterns.</p>
                <AbstractVisual type="chess" />
              </div>
            </div>

            <div className="p-10 rounded-[3rem] bg-white border border-slate-100 group hover:shadow-xl transition-all duration-500">
              <div className="space-y-6 text-center">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Cpu size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Quantum Math</h3>
                <p className="text-slate-500">Unlock advanced calculus and linear algebra with visual explanations.</p>
                <AbstractVisual type="math" />
              </div>
            </div>

            <div className="md:col-span-2 p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-10 group overflow-hidden">
              <div className="space-y-6 flex-1 relative z-10">
                <Badge className="bg-blue-600/20 border-blue-600/30 text-blue-400">Vetted 1%</Badge>
                <h3 className="text-3xl font-black">Elite Expert Roster</h3>
                <p className="text-slate-400 leading-relaxed">Every tutor goes through a rigorous 5-stage technical and pedagogical vetting process. Only the top 1% join our platform.</p>
                <Button className="w-fit">Explore All Experts</Button>
              </div>
              <div className="flex -space-x-4 opacity-50 flex-1 justify-center">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-16 h-16 rounded-full border-4 border-slate-900 bg-slate-800"></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutor Profiles Section */}
      <section id="tutors" className="py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <Badge>Elite Mentors</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Meet Our Experts.</h2>
            </div>
            <Button variant="outline" className="shrink-0">See All Tutors</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TutorCard
              name="Dr. Aris Thorne"
              role="PhD in Particle Physics"
              rating={4.9}
              topics={['Math', 'Quantum Physics', 'Calculus']}
            />
            <TutorCard
              name="Sarah Jenkins"
              role="Lead Engineer @ TechGiant"
              rating={5.0}
              topics={['React', 'Rust', 'System Design']}
            />
            <TutorCard
              name="Magnus V."
              role="International Chess Master"
              rating={4.8}
              topics={['Chess Tactics', 'Opening Theory']}
            />
            <TutorCard
              name="Linus Chen"
              role="AI Research Fellow"
              rating={4.9}
              topics={['Machine Learning', 'Python', 'Stats']}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-7xl mx-auto text-center mb-24 space-y-6">
          <Badge>Transparent Pricing</Badge>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">No Contracts. <br /> Pay as You Grow.</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            { title: "Standard", price: "45", features: ["Verified Expert Tutors", "Interactive Whiteboard", "Session Recordings"] },
            { title: "Premium", price: "75", features: ["Top 5% Subject Experts", "Personalized Study Plans", "AI-Powered Notes"], popular: true },
            { title: "Elite", price: "120", features: ["Industry Leading Mentors", "24/7 Slack Access", "Interview Prep"] }
          ].map((tier, i) => (
            <div key={i} className={`p-10 rounded-[3rem] border ${tier.popular ? 'border-blue-500 shadow-2xl ring-4 ring-blue-50' : 'border-slate-100'} bg-white flex flex-col space-y-8`}>
              <h4 className="text-xl font-bold">{tier.title}</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">${tier.price}</span>
                <span className="text-slate-400 font-bold">/hr</span>
              </div>
              <ul className="space-y-4 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-blue-500" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant={tier.popular ? "primary" : "outline"} className="w-full">Get Started</Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Common Questions.</h2>
            <p className="text-slate-500">Everything you need to know about the GeniusHub experience.</p>
          </div>
          <div className="bg-slate-50/50 p-6 md:p-10 rounded-[3.5rem] border border-slate-100">
            <FAQItem
              question="How are tutors vetted?"
              answer="We use a rigorous 5-step process: identity verification, academic background check, technical assessment, pedagogical trial, and ongoing quality monitoring."
            />
            <FAQItem
              question="Can I book for a specific project?"
              answer="Absolutely. Many students book mentors specifically for a 2-week coding sprint or to prep for an upcoming math competition."
            />
            <FAQItem
              question="Is the first trial session truly free?"
              answer="Yes. We believe in our experts so much that your first 45-minute consultation is on us, no credit card required."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative p-12 md:p-24 rounded-[4rem] bg-slate-900 text-center overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2),transparent)] transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Ready to reach <br /> your <span className="text-blue-500 italic">full potential?</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="px-12 py-6 rounded-[2rem] text-xl font-bold">Book a Free Trial</Button>
                <div className="flex items-center gap-3 text-white/60 font-bold uppercase tracking-widest text-xs">
                  <ShieldCheck size={20} className="text-blue-500" /> No credit card required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Cpu className="text-white" size={16} />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">GENIUS<span className="text-blue-600">HUB</span></span>
          </div>
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            © 2026 GeniusHub • 1:1 Elite Mentorship
          </div>
        </div>
      </footer>


    </div>
  );
}
