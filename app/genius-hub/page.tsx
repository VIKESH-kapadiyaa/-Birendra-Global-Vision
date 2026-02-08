'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
    Star,
    ChevronRight,
    Target,
    Compass,
    Menu,
    X,
    Heart,
    Zap,
    CheckCircle2,
    ArrowRight,
    Plus,
    Minus,
    Sparkles,
    Globe,
    ShieldCheck,
    MousePointer2,
    Sun,
    Moon,
    BookOpen
} from 'lucide-react';
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
    useMotionValue,
    useMotionTemplate
} from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Advanced Animation Components ---

// 1. Magnetic Button Effect
const MagneticButton = ({ children, className, ...props }: any) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.2); // Magnetic strength
        y.set(middleY * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.9 }}
            className={cn("relative z-10", className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};

// 2. 3D Tilt Card Effect
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(((clientX - left) / width - 0.5) * 20); // Tilt range X
        y.set(((clientY - top) / height - 0.5) * -20); // Tilt range Y
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{ rotateX: mouseY, rotateY: mouseX, transformStyle: "preserve-3d" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={cn("perspective-1000", className)}
        >
            {children}
        </motion.div>
    );
};

// 3. Text Reveal Animation
const StaggeredText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const words = text.split(" ");
    return (
        <motion.div className={cn("inline-block overflow-hidden", className)}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + i * 0.05, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="inline-block mr-[0.25em]"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

// 4. Parallax Background Object
const FloatingOrb = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.div
        animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1]
        }}
        transition={{
            duration: 5,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className={cn("absolute rounded-full blur-3xl opacity-30 mix-blend-multiply pointer-events-none", className)}
    />
);

const FadeIn = ({ children, delay = 0, className, direction = "up" }: { children: React.ReactNode; delay?: number; className?: string, direction?: "up" | "left" | "right" | "down" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0
        },
        visible: { opacity: 1, y: 0, x: 0 }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.span
        whileHover={{ scale: 1.05 }}
        className={cn("inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-50/80 backdrop-blur-md border border-slate-200 text-slate-500 text-[11px] font-bold tracking-widest uppercase shadow-sm cursor-default select-none", className)}
    >
        {children}
    </motion.span>
);

// --- Visuals ---
const AbstractVisual = ({ type }: { type: string }) => {
    if (type === 'occult') {
        return (
            <div className="relative w-full h-40 flex items-center justify-center">
                <FloatingOrb className="w-40 h-40 bg-purple-600/20" delay={0} />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-32 h-32 border border-purple-400/30 rounded-full"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-glow" />
                </motion.div>
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-24 h-24 border border-blue-400/30 rounded-full"
                >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-glow" />
                </motion.div>
                <div className="relative z-10 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                    <Star size={24} className="text-purple-600" fill="currentColor" fillOpacity={0.2} />
                </div>
            </div>
        );
    }
    if (type === 'coaching') {
        return (
            <div className="relative w-full h-40 flex items-center justify-center">
                <motion.svg
                    viewBox="0 0 200 200"
                    className="w-32 h-32"
                >
                    <motion.path
                        d="M100 40 L100 160"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.circle
                        cx="100"
                        cy="100"
                        r="30"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="2"
                        animate={{ r: [30, 40, 30], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <circle cx="100" cy="40" r="4" fill="#2563eb" />
                    <circle cx="100" cy="160" r="4" fill="#2563eb" />
                </motion.svg>
            </div>
        );
    }
    if (type === 'growth') {
        return (
            <div className="relative w-full h-40 flex items-center justify-center">
                <motion.div
                    className="flex gap-2 items-end"
                >
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="w-4 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-full"
                            style={{ height: i * 15 }}
                            animate={{ height: [i * 15, i * 20, i * 15] }}
                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        />
                    ))}
                </motion.div>
            </div>
        );
    }
    return null;
};

// --- Page ---
export default function GeniusHubPage() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-purple-600 selection:text-white font-['Inter',sans-serif] overflow-x-hidden">

            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <FloatingOrb className="top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40" delay={0} />
                <FloatingOrb className="bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/40" delay={2} />
                <FloatingOrb className="top-[40%] left-[20%] w-[20%] h-[20%] bg-indigo-200/30" delay={1} />
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{ backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)" }}
                className="fixed top-0 w-full z-[100] border-b border-white/50"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                            className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20"
                        >
                            <Globe className="text-white" size={20} />
                        </motion.div>
                        <span className="text-lg font-black tracking-tighter text-slate-900">BIRENDRA<span className="text-purple-600">GLOBAL</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-12">
                        {['Services', 'Mentors', 'Pricing', 'FAQ'].map((item, i) => (
                            <motion.a
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-bold tracking-wide text-slate-500 hover:text-purple-600 transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
                            </motion.a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <MagneticButton className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Sign In</MagneticButton>
                        <MagneticButton className="bg-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/25">Book Consultation</MagneticButton>
                    </div>

                    <button className="md:hidden p-2 text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
                <motion.div style={{ y: y1 }} className="absolute right-0 top-20 w-[500px] h-[500px] bg-gradient-to-b from-purple-100/20 to-transparent rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
                    <motion.div style={{ opacity: opacityHero }} className="lg:col-span-7 text-center lg:text-left space-y-12">
                        <FadeIn delay={0.1} className="space-y-6">
                            <Badge className="bg-purple-50 border-purple-100 text-purple-600 shadow-purple-100">
                                <Sparkles size={12} className="text-purple-500 animate-spin-slow" /> Holistic Growth & Wisdom
                            </Badge>
                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                <StaggeredText text="Discover Your" delay={0.2} /> <br />
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 animate-gradient-x pb-2">
                                    <StaggeredText text="True Potential." delay={0.6} />
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.8}>
                            <p className="text-xl md:text-2xl text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                Navigate life&apos;s challenges with ancient wisdom and modern mentorship.
                                Expert guidance in Occult Sciences, Life Coaching, and Personal Growth.
                            </p>
                        </FadeIn>

                        <FadeIn delay={1} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                            <MagneticButton className="bg-slate-900 text-white text-lg px-10 py-5 rounded-full shadow-2xl flex items-center gap-3 hover:shadow-slate-500/50">
                                Start Your Journey
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </MagneticButton>
                            <div className="flex items-center gap-3 px-2 text-sm text-slate-400 font-bold uppercase tracking-widest">
                                <Globe size={18} className="text-purple-500 animate-pulse" /> Learning Without Borders
                            </div>
                        </FadeIn>
                    </motion.div>

                    <motion.div
                        style={{ y: y2 }}
                        initial={{ opacity: 0, x: 100, rotateY: 90 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
                        className="lg:col-span-5 relative hidden lg:block perspective-1000"
                    >
                        <TiltCard className="relative z-10 p-8 rounded-[3.5rem] bg-white/60 backdrop-blur-3xl border border-white/60 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
                            <div className="grid grid-cols-2 gap-5">
                                <motion.div whileHover={{ scale: 0.98 }} className="bg-white p-6 rounded-[2.5rem] border border-white shadow-xl flex flex-col justify-between aspect-square relative overflow-hidden group cursor-pointer">
                                    <Badge className="w-fit relative z-10 bg-purple-50 text-purple-600">Wisdom</Badge>
                                    <AbstractVisual type="occult" />
                                    <div className="text-xs font-bold text-slate-400 relative z-10 group-hover:text-purple-600 transition-colors">Occult Sciences</div>
                                </motion.div>
                                <motion.div whileHover={{ scale: 0.98 }} className="bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl flex flex-col justify-between aspect-square text-white relative overflow-hidden cursor-pointer">
                                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></motion.div>
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                                        <Heart size={24} className="text-purple-400" />
                                    </div>
                                    <div className="space-y-1 relative">
                                        <div className="text-[10px] font-bold uppercase opacity-50 tracking-wider">Live Coaching</div>
                                        <div className="text-2xl font-bold">Inner Peace</div>
                                    </div>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-[3rem] text-white flex items-center justify-between group overflow-hidden relative shadow-lg shadow-purple-600/30 cursor-pointer">
                                    <motion.div
                                        className="absolute inset-0 bg-white/20"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <div className="relative z-10">
                                        <div className="text-[10px] font-bold uppercase opacity-70 mb-2 tracking-widest">Upcoming Workshop</div>
                                        <div className="text-xl font-bold">Astrology & Self Discovery</div>
                                    </div>
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-purple-600 transition-all">
                                        <ArrowRight size={20} />
                                    </div>
                                </motion.div>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </section>

            {/* Services Bento Grid */}
            <section id="services" className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
                        <div className="space-y-6">
                            <Badge className="text-purple-600 bg-purple-50 border-purple-100">Our Services</Badge>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
                                <StaggeredText text="Empower Your" /> <br />
                                <span className="text-slate-400"><StaggeredText text="Life Journey." /></span>
                            </h2>
                        </div>
                        <p className="text-slate-500 max-w-md text-xl font-medium leading-relaxed">
                            Holistic programs designed to support your intellectual, emotional, and spiritual growth.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeIn delay={0.2} className="md:col-span-2">
                            <TiltCard className="h-full p-12 rounded-[3.5rem] bg-[#F7F8FA] border border-white shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-purple-200/50 transition-colors"></div>
                                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                                    <div className="space-y-8 flex-1">
                                        <div className="w-16 h-16 bg-purple-600 text-white rounded-3xl flex items-center justify-center shadow-lg shadow-purple-600/20">
                                            <Moon size={32} />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black text-slate-900">Occult Sciences</h3>
                                            <p className="text-slate-500 text-lg leading-relaxed">
                                                Dive deep into ancient wisdom. Learn Astrology, Numerology, and spiritual sciences to understand your life path and unlock hidden potential.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <AbstractVisual type="occult" />
                                    </div>
                                </div>
                            </TiltCard>
                        </FadeIn>

                        <FadeIn delay={0.3} className="h-full">
                            <TiltCard className="h-full p-10 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl flex flex-col justify-between text-center relative overflow-hidden">
                                <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                                    <Compass size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Life Coaching</h3>
                                    <p className="text-slate-500 text-sm">Gain clarity, confidence & direction.</p>
                                </div>
                                <AbstractVisual type="coaching" />
                            </TiltCard>
                        </FadeIn>

                        <FadeIn delay={0.4} className="h-full">
                            <TiltCard className="h-full p-10 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl flex flex-col justify-between text-center">
                                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                                    <Target size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Mentoring</h3>
                                    <p className="text-slate-500 text-sm">Personalized guidance for growth.</p>
                                </div>
                                <AbstractVisual type="growth" />
                            </TiltCard>
                        </FadeIn>

                        <FadeIn delay={0.5} className="md:col-span-2">
                            <div className="h-full p-12 rounded-[3.5rem] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-16 group overflow-hidden relative shadow-2xl">
                                <motion.div animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-slate-900"></motion.div>

                                <div className="space-y-8 flex-1 relative z-10">
                                    <Badge className="bg-purple-500/10 border-purple-500/20 text-purple-300">Expert Guidance</Badge>
                                    <h3 className="text-4xl font-black">Led by Amaira Srivastava</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed">
                                        With over 20 years of experience in education and leadership, Amaira brings deep insight, credibility, and care to every learning journey.
                                    </p>
                                    <MagneticButton className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-3 rounded-xl font-bold">Read Full Story</MagneticButton>
                                </div>
                                <div className="flex-1 flex justify-center relative z-10">
                                    <div className="w-40 h-40 rounded-full border-4 border-slate-800 overflow-hidden shadow-2xl">
                                        <img src="/maam.jpeg" alt="Amaira" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 px-6">
                <div className="max-w-7xl mx-auto text-center mb-24 space-y-6">
                    <FadeIn>
                        <Badge>Transparent Pricing</Badge>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Invest in your <br /> <span className="text-purple-600">Evolution.</span></h2>
                    </FadeIn>
                </div>
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                    {[
                        { title: "Introductory", price: "Free", period: "First Session", features: ["Initial Consultation", "Goal Setting", "Path Discovery"] },
                        { title: "Standard", price: "Contact", period: "Per Session", features: ["1-on-1 Mentoring", "Customized Plan", "Resource Access"], popular: true },
                        { title: "Deep Dive", price: "Custom", period: "Program", features: ["Intensive Coaching", "Full Support", "Life Transformation"] }
                    ].map((tier, i) => (
                        <FadeIn delay={i * 0.1} key={i}>
                            <TiltCard className={`h-full p-10 rounded-[3rem] border ${tier.popular ? 'border-purple-500 shadow-2xl ring-4 ring-purple-50 bg-purple-50/10' : 'border-slate-100 bg-white'} flex flex-col space-y-8 relative`}>
                                {tier.popular && <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-bl-3xl rounded-tr-[2.5rem] shadow-lg">Popular</motion.div>}
                                <div>
                                    <h4 className="text-xl font-bold text-slate-500 mb-2">{tier.title}</h4>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-slate-900">{tier.price}</span>
                                        {tier.price !== "Free" && <span className="text-slate-400 font-bold text-xs uppercase ml-1">{tier.period}</span>}
                                    </div>
                                </div>
                                <ul className="space-y-5 flex-1">
                                    {tier.features.map((f, j) => (
                                        <motion.li
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + j * 0.1 }}
                                            key={f}
                                            className="flex items-center gap-3 text-sm font-medium text-slate-600"
                                        >
                                            <CheckCircle2 size={18} className="text-purple-500 shrink-0" /> {f}
                                        </motion.li>
                                    ))}
                                </ul>
                                <MagneticButton className={cn("w-full rounded-2xl py-4 font-bold transition-colors", tier.popular ? "bg-purple-600 text-white" : "bg-transparent border border-slate-200 hover:bg-slate-50")}>Book Now</MagneticButton>
                            </TiltCard>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-32 px-6 bg-[#F8FAFC]">
                <div className="max-w-3xl mx-auto">
                    <FadeIn>
                        <div className="text-center mb-20 space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Common Questions.</h2>
                        </div>
                    </FadeIn>
                    <div className="bg-white p-2 md:p-8 rounded-[3.5rem] border border-slate-100 shadow-xl">
                        {[
                            { q: "Who are these programs for?", a: "Our programs are designed for learners of all ages who seek academic support, spiritual depth, or personal life guidance." },
                            { q: "Is the first session really free?", a: "Yes. We believe in building a connection first. Your initial consultation is completely free to ensure we are a right fit for your journey." },
                            { q: "Can I learn online?", a: "Absolutely. Birendra Global Vision is built on the philosophy of 'Learning Without Borders', connecting you with mentors globally." }
                        ].map((item, i) => (
                            <FadeIn delay={i * 0.1} key={i} className="group border-b border-slate-50 last:border-0">
                                <details className="group p-6 cursor-pointer">
                                    <summary className="flex items-center justify-between font-bold text-lg text-slate-900 marker:content-none hover:text-purple-600 transition-colors">
                                        {item.q}
                                        <span className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 group-open:bg-purple-600 group-open:text-white group-open:rotate-180 transition-all">
                                            <Plus size={16} className="group-open:hidden" />
                                            <Minus size={16} className="hidden group-open:block" />
                                        </span>
                                    </summary>
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        whileInView={{ opacity: 1, height: "auto" }}
                                        className="mt-4 text-slate-500 leading-relaxed pr-10 pl-2"
                                    >
                                        {item.a}
                                    </motion.p>
                                </details>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6">
                <FadeIn className="max-w-6xl mx-auto">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative p-12 md:p-24 rounded-[4.5rem] bg-slate-900 text-center overflow-hidden shadow-2xl group cursor-pointer"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(147,51,234,0.4),transparent_60%)]"
                        />
                        <div className="relative z-10 space-y-12">
                            <h2 className="text-5xl md:text-8xl font-black text-white leading-[1] tracking-tighter">
                                Ready to transform <br /> your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 italic">life journey?</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <MagneticButton className="px-12 py-6 rounded-full text-xl font-bold bg-white text-slate-900 hover:bg-slate-200 shadow-xl shadow-white/10">Book Free Consultation</MagneticButton>
                            </div>
                        </div>
                    </motion.div>
                </FadeIn>
            </section>

            {/* Footer */}
            <footer className="py-24 px-6 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Globe className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">BIRENDRA<span className="text-purple-600">GLOBAL</span></span>
                    </motion.div>
                    <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400 content-center">
                        {['Privacy', 'Terms', 'Contact'].map(link => (
                            <a key={link} href="#" className="hover:text-purple-600 transition-colors hover:underline underline-offset-4">{link}</a>
                        ))}
                    </div>
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                        © 2024 Birendra Global Vision
                    </div>
                </div>
            </footer>
        </div>
    );
}
