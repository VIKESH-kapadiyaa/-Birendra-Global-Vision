'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { useLanguage } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import {
    Cpu,
    Sparkles,
    Brain,
    Code,
    Star,
    Palette,
    Flame,
    ChevronRight,
    Globe,
    Compass,
    Zap,
    Moon,
    ShieldCheck,
    Users,
    Trophy,
    ArrowRight,
    Lock,
    CheckCircle2,
    Gem,
    Infinity as InfinityIcon,
    Wind,
    Atom,
    Eye,
    Activity,
    Layers,
    BookOpen,
    Mic,
    Video,
    MapPin,
    Twitter,
    Instagram,
    Linkedin,
    GraduationCap,
    Heart,
    Clock,
    Target,
    Award,
    Lightbulb,
    X
} from 'lucide-react';

// --- Constants & Data (now generated inside components using translations) ---

// --- Feature Modal Component ---
type FeatureItem = { icon: React.ReactNode; title: string; desc: string; details: string };
const FeatureModal = ({ feature, onClose }: { feature: FeatureItem | null, onClose: () => void }) => {
    const { t } = useLanguage();
    if (!feature) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                {/* Modal Background Glow */}
                <div className="absolute top-0 right-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-purple-600/20 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-600/20 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 p-6 md:p-10 lg:p-14">
                    <button
                        onClick={onClose}
                        className="absolute top-4 md:top-8 right-4 md:right-8 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"
                    >
                        <X size={18} />
                    </button>

                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center mb-6 md:mb-8 text-white shadow-xl">
                        {feature.icon}
                    </div>

                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6 tracking-tight leading-none">
                        {feature.title}
                    </h3>

                    <div className="w-10 md:w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 md:mb-8" />

                    <p className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed font-light">
                        {feature.details}
                    </p>

                    <div className="mt-6 md:mt-10 pt-6 md:pt-10 border-t border-white/5 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-white text-black font-bold text-sm md:text-base hover:bg-white/90 transition-colors"
                        >
                            {t.closeButton}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};



// --- Sub-Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-t-2 border-white/20 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[8px] tracking-[0.3em] text-white font-black">BIRENDRA</span>
                </div>
            </div>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-xs uppercase tracking-widest text-white/40 font-medium"
            >
                Loading...
            </motion.div>
        </motion.div>
    );
};

const SectionHeader = ({ subtitle, title, align = "left" }: { subtitle: string, title: string, align?: "left" | "center" }) => (
    <div className={`mb-8 sm:mb-12 md:mb-24 ${align === "center" ? "text-center" : "text-left"}`}>
        <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.6em] text-white/30 font-black mb-2 sm:mb-4 md:mb-6 block"
        >
            {subtitle}
        </motion.span>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.85]"
        >
            {title}
        </motion.h2>
    </div>
);

const OrbitNav = () => {
    return (
        <div className="relative flex items-center justify-center w-48 h-48 z-50">
            <motion.div
                className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden group"
                whileHover={{ scale: 1.1 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-[8px] md:text-[10px] font-black tracking-[0.2em] text-white z-10 text-center leading-tight">BIRENDRA<br />GLOBAL</span>
            </motion.div>

            {[0, 120, 240].map((angle, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear" }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/40"
                        style={{ transform: `rotate(-${angle}deg)` }}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Coming Soon Modal
const ComingSoonModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { t } = useLanguage();
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-xl border border-white/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 max-w-md mx-4 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 md:top-6 right-4 md:right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
                >
                    <X size={16} />
                </button>
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl"
                >
                    <Sparkles size={28} className="text-white md:hidden" />
                    <Sparkles size={36} className="text-white hidden md:block" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">{t.comingSoon}</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    {t.comingSoonDesc}
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="mt-6 md:mt-8 px-6 md:px-8 py-2.5 md:py-3 bg-white text-slate-900 rounded-xl font-bold text-sm md:text-base"
                >
                    {t.gotIt}
                </motion.button>
            </motion.div>
        </motion.div>
    );
};



const GatewayCard = ({ title, subtitle, enterLabel, icon: Icon, features, themeColor, onHover, isActive, href, onClick }: any) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width) - 0.5);
        y.set(((e.clientY - rect.top) / rect.height) - 0.5);
    };

    const CardContent = (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => { x.set(0); y.set(0); onHover(false); }}
            className={`relative w-full max-w-[340px] sm:max-w-[320px] md:max-w-[400px] h-auto min-h-[180px] sm:min-h-[320px] md:min-h-[540px] group transition-all duration-700 ${isActive ? 'scale-100 md:scale-105' : 'scale-95 opacity-50'}`}
        >
            <div className={`absolute -inset-4 rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br ${themeColor} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-700`} />

            <div className="relative h-full w-full bg-black/40 backdrop-blur-3xl border border-white/10 rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] p-4 sm:p-6 md:p-12 flex flex-col overflow-hidden">
                {/* Mobile Layout - Horizontal compact */}
                <div className="flex sm:hidden items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${themeColor} text-white shadow-xl flex-shrink-0`}>
                        <Icon size={22} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-white tracking-tight leading-none mb-0.5">{title}</h3>
                        <p className="text-[8px] text-white/40 uppercase tracking-[0.15em] font-bold">{subtitle}</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all flex-shrink-0">
                        <ArrowRight size={14} />
                    </div>
                </div>

                {/* Mobile Features - Horizontal pills */}
                <div className="flex sm:hidden flex-wrap gap-1.5 mt-3">
                    {features.slice(0, 3).map((f: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 text-[9px] bg-white/5 rounded-full text-white/50 border border-white/5">
                            {f}
                        </span>
                    ))}
                    {features.length > 3 && (
                        <span className="px-2 py-0.5 text-[9px] bg-white/5 rounded-full text-white/40 border border-white/5">
                            +{features.length - 3}
                        </span>
                    )}
                </div>

                {/* Desktop/Tablet Layout - Original vertical */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="z-10 hidden sm:block"
                >
                    <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-12">
                        <div className={`p-3 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br ${themeColor} text-white shadow-2xl`}>
                            <Icon size={24} className="md:w-9 md:h-9" />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter leading-none mb-1 md:mb-2">{title}</h3>
                            <p className="text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">{subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-3 md:space-y-6">
                        {features.map((f: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 md:gap-4 text-white/40 text-xs md:text-sm group-hover:text-white/80 transition-colors">
                                <div className="w-1.5 h-[1px] bg-white/20" />
                                {f}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative z-10 hidden sm:flex items-center justify-between mt-auto pt-6 md:pt-8 border-t border-white/5">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors">{enterLabel}</span>
                    <div className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
                    </div>
                </div>

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>
        </motion.div>
    );

    if (onClick) {
        return <div onClick={onClick} className="contents cursor-pointer">{CardContent}</div>;
    }

    if (href) {
        return <Link href={href} className="contents">{CardContent}</Link>;
    }
    return CardContent;
};

// --- Main App ---

export default function App() {
    const { t } = useLanguage();

    // Translated data arrays (re-computed when language changes)
    const GEMS = [
        { id: 1, icon: <BookOpen size={20} />, label: t.gemLearn, x: "12%", y: "15%", speed: 0.05 },
        { id: 2, icon: <Brain size={20} />, label: t.gemGrow, x: "85%", y: "12%", speed: 0.03 },
        { id: 3, icon: <Star size={20} />, label: t.gemShine, x: "8%", y: "80%", speed: 0.04 },
        { id: 4, icon: <Heart size={20} />, label: t.gemCare, x: "90%", y: "75%", speed: 0.06 },
        { id: 5, icon: <InfinityIcon size={20} />, label: t.gemEvolve, x: "50%", y: "8%", speed: 0.02 },
    ];

    const PROGRAMS = {
        genius: [
            { title: t.occultSciencesTitle, level: t.occultSciencesLevel, duration: t.occultSciencesDuration, desc: t.occultSciencesDesc },
            { title: t.lifeCoachingTitle, level: t.lifeCoachingLevel, duration: t.lifeCoachingDuration, desc: t.lifeCoachingDesc },
            { title: t.mentoringTitle, level: t.mentoringLevel, duration: t.mentoringDuration, desc: t.mentoringDesc },
        ],
        life: [
            { title: t.academicSupportTitle, level: t.academicSupportLevel, duration: t.academicSupportDuration, desc: t.academicSupportDesc },
            { title: t.skillDevTitle, level: t.skillDevLevel, duration: t.skillDevDuration, desc: t.skillDevDesc },
            { title: t.holisticLearningTitle, level: t.holisticLearningLevel, duration: t.holisticLearningDuration, desc: t.holisticLearningDesc },
        ],
    };

    const FEATURES = [
        { icon: <Globe size={24} />, title: t.feature1Title, desc: t.feature1Desc, details: t.feature1Details },
        { icon: <Award size={24} />, title: t.feature2Title, desc: t.feature2Desc, details: t.feature2Details },
        { icon: <Users size={24} />, title: t.feature3Title, desc: t.feature3Desc, details: t.feature3Details },
        { icon: <Layers size={24} />, title: t.feature4Title, desc: t.feature4Desc, details: t.feature4Details },
    ];

    const THE_PROCESS = [
        { step: "01", title: t.step1Title, desc: t.step1Desc, icon: <Compass size={32} /> },
        { step: "02", title: t.step2Title, desc: t.step2Desc, icon: <MapPin size={32} /> },
        { step: "03", title: t.step3Title, desc: t.step3Desc, icon: <Zap size={32} /> },
        { step: "04", title: t.step4Title, desc: t.step4Desc, icon: <Star size={32} /> },
    ];
    const [isLoading, setIsLoading] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredHub, setHoveredHub] = useState<string | null>(null);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
    const [bookingProgram, setBookingProgram] = useState<any | null>(null);
    const [userRegion, setUserRegion] = useState<'IN' | 'INTL'>('INTL');
    const [isMounted, setIsMounted] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Auto-detect User Region on Mount
    useEffect(() => {
        setIsMounted(true);
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZone.includes("Calcutta") || timeZone.includes("Kolkata") || timeZone.includes("India")) {
            setUserRegion('IN');
        } else {
            setUserRegion('INTL');
        }
    }, []);
    const { scrollYProgress } = useScroll();

    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40,
            });
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    return (
        <div suppressHydrationWarning className="relative min-h-[400vh] w-full bg-[#030303] overflow-x-hidden font-sans selection:bg-white/20 text-white">

            {/* Language Switcher */}
            <LanguageSwitcher />

            <AnimatePresence>
                {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
                {bookingProgram && (
                    <BookingModal
                        program={bookingProgram}
                        region={userRegion}
                        onClose={() => setBookingProgram(null)}
                    />
                )}
                {selectedFeature && (
                    <FeatureModal
                        feature={selectedFeature}
                        onClose={() => setSelectedFeature(null)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showComingSoon && <ComingSoonModal isOpen={showComingSoon} onClose={() => setShowComingSoon(false)} />}
            </AnimatePresence>

            {/* DUAL-REALITY BACKGROUND ENGINE */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000"
                animate={{
                    background: hoveredHub === 'genius'
                        ? 'radial-gradient(circle at 25% 40%, #1a0a2a 0%, #030303 100%)'
                        : hoveredHub === 'life'
                            ? 'radial-gradient(circle at 75% 40%, #0a102a 0%, #030303 100%)'
                            : 'radial-gradient(circle at 50% 50%, #0a0a0a 0%, #030303 100%)'
                }}
            />

            <motion.div
                className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
                animate={{
                    opacity: hoveredHub ? 0.08 : 0.03,
                    stroke: hoveredHub === 'genius' ? '#9933ff' : hoveredHub === 'life' ? '#3388ff' : '#ffffff'
                }}
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />

            {GEMS.map((gem) => (
                <motion.div
                    key={gem.id}
                    className="fixed pointer-events-none opacity-20 text-white z-0 hidden md:block"
                    style={{ left: gem.x, top: gem.y }}
                    animate={{
                        x: mousePos.x * gem.speed * 20,
                        y: mousePos.y * gem.speed * 20,
                        rotate: [0, 10, -10, 0],
                        scale: hoveredHub ? 1.2 : 1
                    }}
                    transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        x: { type: "spring", stiffness: 30 },
                        y: { type: "spring", stiffness: 30 }
                    }}
                >
                    <div className="flex flex-col items-center gap-1">
                        {gem.icon}
                        <span className="text-[7px] uppercase tracking-[0.4em] font-black opacity-30">{gem.label}</span>
                    </div>
                </motion.div>
            ))}

            {/* HERO / GATEWAY SECTION */}
            <motion.section
                style={{ scale: heroScale, opacity: heroOpacity }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-20 pb-20 sm:pb-32 px-3 sm:px-6 overflow-hidden"
            >
                {/* Dynamic Background Elements - Hidden on mobile for performance */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                    <motion.div
                        animate={{
                            opacity: hoveredHub === 'genius' ? 0.6 : 0.2,
                            scale: hoveredHub === 'genius' ? 1.2 : 1
                        }}
                        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 blur-[120px] rounded-full transition-all duration-1000"
                    />
                    <motion.div
                        animate={{
                            opacity: hoveredHub === 'life' ? 0.6 : 0.2,
                            scale: hoveredHub === 'life' ? 1.2 : 1
                        }}
                        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 blur-[120px] rounded-full transition-all duration-1000"
                    />
                </div>
                {/* Simple static background for mobile */}
                <div className="absolute inset-0 pointer-events-none md:hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 blur-[80px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 blur-[80px] rounded-full" />
                </div>

                <div className="text-center mb-8 sm:mb-12 md:mb-16 max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 sm:gap-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 md:mb-12 hover:bg-white/10 transition-colors cursor-default"
                    >
                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${hoveredHub === 'genius' ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : hoveredHub === 'life' ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-white/50'}`} />
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/60 font-medium">{t.heroSubtitle}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-4 sm:mb-6 md:mb-8 select-none"
                    >
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 filter drop-shadow-2xl">
                            {hoveredHub === 'genius' ? t.heroTitleGenius.split(' ')[0] + '.' : hoveredHub === 'life' ? t.heroTitleLife.split(' ')[0] + '.' : t.heroTitle1.split(' ')[1] || 'Learning'}
                        </span>
                        <br />
                        <span className={`inline-block text-transparent bg-clip-text bg-gradient-to-r transition-all duration-700 ${hoveredHub === 'genius' ? 'from-purple-400 to-pink-400' :
                            hoveredHub === 'life' ? 'from-blue-400 to-cyan-400' :
                                'from-white/60 to-white/20'
                            }`}>
                            {t.heroTitle2}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-white/40 max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed px-4 md:px-0"
                    >
                        {t.heroDescription}
                    </motion.p>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-24 w-full max-w-[1400px] px-4 sm:px-4 md:px-6 perspective-1000">
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <GatewayCard
                            title={t.geniusHubTitle}
                            subtitle={t.geniusHubSubtitle}
                            enterLabel={t.enterButton}
                            icon={Sparkles}
                            isActive={hoveredHub === 'genius' || !hoveredHub}
                            themeColor="from-purple-600 via-violet-600 to-indigo-600"
                            onHover={(h: boolean) => setHoveredHub(h ? 'genius' : null)}
                            features={[t.geniusFeature1, t.geniusFeature2, t.geniusFeature3]}
                            href="/genius-hub"
                        />
                    </div>

                    <div className="hidden lg:flex items-center justify-center w-24 relative z-20">
                        <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent absolute left-1/2 -translate-x-1/2" />
                        <OrbitNav />
                    </div>

                    <div className="flex-1 flex justify-center lg:justify-start">
                        <GatewayCard
                            title={t.lifeHubTitle}
                            subtitle={t.lifeHubSubtitle}
                            enterLabel={t.enterButton}
                            icon={GraduationCap}
                            isActive={hoveredHub === 'life' || !hoveredHub}
                            themeColor="from-blue-600 via-indigo-600 to-cyan-600"
                            onHover={(h: boolean) => setHoveredHub(h ? 'life' : null)}
                            features={[t.lifeFeature1, t.lifeFeature2, t.lifeFeature3]}
                            onClick={() => setShowComingSoon(true)}
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest text-white/20">{t.scrollDown}</span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
                    />
                </motion.div>
            </motion.section>

            {/* FOUNDER STORY SECTION */}
            <section id="about" className="relative z-10 py-12 sm:py-16 md:py-32 px-3 sm:px-4 md:px-6 bg-[#030303] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(88,28,135,0.1),transparent_70%)]" />

                <div className="container mx-auto max-w-7xl relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl sm:rounded-[2rem] md:rounded-[4rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-4 sm:p-8 md:p-16 overflow-hidden relative"
                    >
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[80px] sm:blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[80px] sm:blur-[100px] translate-y-1/2 -translate-x-1/2" />

                        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center relative z-10">
                            {/* Photo Column */}
                            <div className="lg:col-span-5 order-2 lg:order-1">
                                <div className="relative mx-auto max-w-[220px] sm:max-w-[280px] md:max-w-[400px]">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-2xl sm:rounded-[3rem] blur-lg opacity-40 transform rotate-3 scale-105" />
                                    <div className="relative rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
                                        <div className="aspect-[3/4] relative">
                                            <img
                                                src="/maam.jpeg"
                                                alt="Amaira Srivastava"
                                                className="w-full h-full object-cover object-top"
                                                style={{ filter: 'contrast(1.05) brightness(1.05)' }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                                            {/* Name Overlay */}
                                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4">
                                                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white">{t.founderName}</h3>
                                                    <p className="text-purple-300 font-medium text-xs sm:text-sm">{t.founderRole}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating Stats */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="absolute top-4 md:top-8 -left-2 md:-left-8 bg-[#0a0a0a] border border-white/10 p-2 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-2 md:gap-3 scale-75 md:scale-100 origin-left"
                                    >
                                        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                            <Award size={20} />
                                        </div>
                                        <div>
                                            <div className="text-white font-bold text-lg leading-none">{t.yearsExperience}</div>
                                            <div className="text-white/40 text-[10px] uppercase font-bold tracking-wider">{t.experienceLabel}</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Content Column */}
                            <div className="lg:col-span-7 order-1 lg:order-2 space-y-8 text-center lg:text-left">
                                <div className="space-y-4">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                                        <Sparkles size={12} /> {t.founderVisionaryTag}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                                        Empowering Minds,<br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Transforming Lives.</span>
                                    </h2>
                                </div>

                                <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-white/50 leading-relaxed font-light">
                                    <p>
                                        Founded by <strong className="text-white">Amaira Srivastava</strong>, Birendra Global Vision is built on a foundation of wisdom, compassion, and purpose. With over two decades of excellence in education, Amaira has shaped thousands of lives.
                                    </p>
                                    <p className="hidden sm:block">
                                        From her tenure at prestigious institutions like <span className="text-white/80 border-b border-white/20">City Montessori School</span> and <span className="text-white/80 border-b border-white/20">Loreto Convent College</span>, to her leadership roles as Head of School and Academic Manager, she brings a wealth of experience to every mentorship session.
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/5 grid sm:grid-cols-2 gap-6">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-left hover:bg-white/10 transition-colors">
                                        <Globe className="text-purple-400 mb-3" size={24} />
                                        <h4 className="text-white font-bold mb-1">Global Impact</h4>
                                        <p className="text-white/40 text-sm">Connecting learners across borders through technology.</p>
                                    </div>
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-left hover:bg-white/10 transition-colors">
                                        <Heart className="text-pink-400 mb-3" size={24} />
                                        <h4 className="text-white font-bold mb-1">Holistic Approach</h4>
                                        <p className="text-white/40 text-sm">Nurturing intellectual, emotional, and spiritual growth.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                    <motion.blockquote
                                        className="text-white/80 text-base md:text-xl font-medium italic border-l-4 border-purple-500 pl-4 md:pl-6 py-2 bg-gradient-to-r from-purple-500/10 to-transparent rounded-r-xl md:rounded-r-2xl"
                                    >
                                        &ldquo;We don&apos;t just teach—we inspire, guide, and empower you to discover your true potential.&rdquo;
                                    </motion.blockquote>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PLATFORM FEATURES */}
            <section id="features" className="relative z-10 py-12 sm:py-16 md:py-32 px-3 sm:px-4 md:px-6 bg-[#050505] border-y border-white/5">
                <div className="container mx-auto max-w-7xl">
                    <SectionHeader subtitle={t.featuresSubtitle} title={t.featuresTitle} />

                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
                        {FEATURES.map((feat, i) => (
                            <motion.div
                                key={i}
                                layoutId={`feature-card-main-${i}`}
                                onClick={() => setSelectedFeature(feat)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="group relative p-3 sm:p-4 md:p-8 min-h-[140px] sm:min-h-[180px] md:min-h-0 h-full rounded-xl sm:rounded-2xl md:rounded-[2.5rem] bg-[#080808] border border-white/5 hover:border-white/10 cursor-pointer overflow-hidden transition-all duration-300"
                            >
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mb-2 sm:mb-4 md:mb-6 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                                        <div className="scale-75 sm:scale-90 md:scale-100">{feat.icon}</div>
                                    </div>

                                    <h4 className="text-xs sm:text-sm md:text-xl font-bold mb-1 sm:mb-2 md:mb-4 tracking-tight text-white leading-tight">
                                        {feat.title}
                                    </h4>

                                    <p className="text-white/40 text-[10px] sm:text-xs md:text-sm leading-relaxed mb-2 sm:mb-4 md:mb-6 flex-grow line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                                        {feat.desc}
                                    </p>

                                    <div className="hidden sm:flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-400 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <span>{t.discoverButton}</span>
                                        <ChevronRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE JOURNEY / PROCESS SECTION */}
            <section id="journey" className="relative z-10 py-12 sm:py-16 md:py-32 px-3 sm:px-4 md:px-6">
                <div className="container mx-auto max-w-7xl">
                    <SectionHeader subtitle={t.journeySubtitle} title={t.journeyTitle} align="center" />

                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-purple-900/0 via-purple-500/20 to-blue-900/0 hidden md:block" />

                        {THE_PROCESS.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group"
                            >
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-3 sm:mb-4 md:mb-8 relative group-hover:border-purple-500/50 transition-colors duration-500">
                                        <div className="absolute inset-0.5 sm:inset-1 md:inset-2 rounded-full border border-white/5 border-dashed animate-[spin_10s_linear_infinite]" />
                                        <span className="text-lg sm:text-xl md:text-3xl font-black text-white/20 group-hover:text-white transition-colors duration-500">{step.step}</span>
                                        <div className="absolute -bottom-1.5 sm:-bottom-2 md:-bottom-3 px-1.5 sm:px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/5 text-[8px] sm:text-[10px] md:text-xs font-bold text-white shadow-xl">
                                            <div className="scale-75 sm:scale-90 md:scale-100">{step.icon}</div>
                                        </div>
                                    </div>

                                    <h4 className="text-xs sm:text-base md:text-2xl font-bold text-white mb-1 sm:mb-2 md:mb-4">{step.title}</h4>
                                    <p className="text-white/40 text-[10px] sm:text-xs md:text-sm leading-relaxed max-w-[140px] sm:max-w-[200px] md:max-w-[250px] mx-auto line-clamp-2 sm:line-clamp-none">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROGRAMS SECTION */}
            <section id="programs" className="relative z-10 py-12 sm:py-16 md:py-48 px-3 sm:px-4 md:px-6 bg-[#050505] border-y border-white/5 overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-0 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-purple-600/10 blur-[80px] sm:blur-[100px] md:blur-[150px] -translate-y-1/2 pointer-events-none" />
                <div className="absolute top-1/2 right-0 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-blue-600/10 blur-[80px] sm:blur-[100px] md:blur-[150px] -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-24 relative">
                        {/* Central Divider (Desktop) */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

                        {/* Genius Track (Left Column) */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="mb-8 md:mb-12"
                            >
                                <SectionHeader subtitle={t.programsSubtitle} title={t.programsTitle} />
                            </motion.div>

                            <div className="space-y-4 md:space-y-8">
                                {PROGRAMS.genius.map((item, i) => (
                                    <div key={i} onClick={() => setBookingProgram(item)} className="cursor-pointer">
                                        <ProgramCard item={item} index={i} color="purple" lockedLabel={t.locked} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Coming Soon Track (Right Column) */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="mb-8 md:mb-12"
                            >
                                <SectionHeader subtitle={t.comingSoon} title={t.comingSoon} />
                            </motion.div>

                            <div className="space-y-4 md:space-y-8">
                                {PROGRAMS.life.map((item, i) => (
                                    <div key={i} onClick={() => setBookingProgram(item)} className="cursor-pointer">
                                        <ProgramCard item={item} index={i} color="blue" isComingSoon lockedLabel={t.locked} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* FOOTER: THE COSMOS */}
            <footer className="relative z-10 bg-[#020205] overflow-hidden">

                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

                    {/* Floating Orbs - Animated on desktop only */}
                    <motion.div
                        animate={prefersReducedMotion ? {} : { y: [0, -20, 0], x: [0, 10, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 left-[10%] w-32 md:w-64 h-32 md:h-64 bg-purple-600/20 rounded-full blur-[60px] md:blur-[100px]"
                    />
                    <motion.div
                        animate={prefersReducedMotion ? {} : { y: [0, 15, 0], x: [0, -15, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-40 right-[15%] w-40 md:w-80 h-40 md:h-80 bg-blue-600/15 rounded-full blur-[80px] md:blur-[120px]"
                    />
                    <motion.div
                        animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-48 md:w-96 h-48 md:h-96 bg-indigo-600/10 rounded-full blur-[80px] md:blur-[150px]"
                    />

                    {/* Floating Stars/Particles - Only render on client */}
                    {isMounted && [
                        { top: 15, left: 12, speed: 0.3 },
                        { top: 28, left: 78, speed: 0.5 },
                        { top: 42, left: 35, speed: 0.2 },
                        { top: 55, left: 88, speed: 0.4 },
                        { top: 18, left: 45, speed: 0.6 },
                        { top: 72, left: 22, speed: 0.3 },
                        { top: 35, left: 65, speed: 0.5 },
                        { top: 85, left: 48, speed: 0.2 },
                        { top: 22, left: 92, speed: 0.4 },
                        { top: 68, left: 8, speed: 0.6 },
                        { top: 48, left: 55, speed: 0.3 },
                        { top: 78, left: 72, speed: 0.5 },
                        { top: 32, left: 28, speed: 0.4 },
                        { top: 62, left: 42, speed: 0.2 },
                        { top: 88, left: 85, speed: 0.5 }
                    ].map((pos, i) => (
                        <motion.div
                            key={i}
                            animate={prefersReducedMotion ? {} : {
                                opacity: [0.3, 1, 0.3],
                            }}
                            style={{
                                top: `${pos.top}%`,
                                left: `${pos.left}%`,
                                x: mousePos.x * pos.speed * 15,
                                y: mousePos.y * pos.speed * 15,
                            }}
                            transition={{
                                opacity: {
                                    duration: 2 + i * 0.3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                                x: { type: "spring", stiffness: 50, damping: 20 },
                                y: { type: "spring", stiffness: 50, damping: 20 },
                            }}
                            className="absolute w-1 h-1 bg-white rounded-full"
                        />
                    ))}
                </div>

                {/* Main CTA Section */}
                <div className="relative border-b border-white/5">
                    <div className="container mx-auto px-4 md:px-6 py-16 md:py-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-purple-300">
                                <Sparkles size={12} />
                                {t.ctaSubtitle}
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                                {t.ctaTitle1}
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                                    {t.ctaTitle2}
                                </span>
                            </h2>

                            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto px-4 md:px-0">
                                {t.ctaDescription}
                            </p>

                            <motion.button
                                onClick={() => setBookingProgram({ title: "Consultation Session" })}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base md:text-lg shadow-2xl shadow-purple-600/30 overflow-hidden"
                            >
                                {/* Animated Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                                <span className="relative z-10">{t.ctaButton}</span>
                                <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Links Section */}
                <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                        {/* Brand */}
                        <div className="col-span-2 lg:col-span-2 space-y-4 md:space-y-6">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center">
                                        <span className="font-black text-lg md:text-2xl text-white">B</span>
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl md:rounded-2xl blur-lg opacity-30" />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-xl font-black text-white tracking-tight">{t.brand}</h3>
                                    <p className="text-[10px] md:text-xs text-white/40">Unlock. Transform. Elevate.</p>
                                </div>
                            </div>

                            <p className="text-white/30 text-xs md:text-sm leading-relaxed max-w-sm italic border-l-2 border-purple-500/30 pl-3 md:pl-4 hidden sm:block">
                                "The universe doesn't give you what you want. It gives you what you become."
                            </p>

                            <a
                                href="mailto:lalbirendra34@gmail.com"
                                className="hidden sm:inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl md:rounded-2xl text-xs md:text-sm text-white/60 hover:text-white transition-all group"
                            >
                                <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-purple-400 text-xs">@</span>
                                </div>
                                <span className="text-xs md:text-sm">lalbirendra34@gmail.com</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-purple-400" />
                            </a>
                        </div>

                        {/* Programs */}
                        <div>
                            <h6 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 mb-4 md:mb-6 flex items-center gap-2">
                                <div className="w-1 h-3 md:h-4 bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
                                {t.programsLabel}
                            </h6>
                            <ul className="space-y-2 md:space-y-3">
                                {[
                                    { name: 'Occult Sciences', href: '#programs' },
                                    { name: 'Life Coaching', href: '#programs' },
                                    { name: 'Academic Excellence', href: '#programs' },
                                    { name: 'Personal Mentoring', href: '#programs' }
                                ].map(item => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="group flex items-center gap-2 text-xs md:text-sm text-white/40 hover:text-white transition-colors">
                                            <span className="w-0 group-hover:w-3 h-[1px] bg-purple-500 transition-all duration-300" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h6 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 mb-4 md:mb-6 flex items-center gap-2">
                                <div className="w-1 h-3 md:h-4 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
                                {t.companyLabel}
                            </h6>
                            <ul className="space-y-2 md:space-y-3">
                                {[
                                    { name: 'About Us', href: '#about' },
                                    { name: 'Our Philosophy', href: '#features' },
                                    { name: 'Success Stories', href: '#journey' },
                                    { name: 'Contact', href: 'mailto:lalbirendra34@gmail.com' }
                                ].map(item => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="group flex items-center gap-2 text-xs md:text-sm text-white/40 hover:text-white transition-colors">
                                            <span className="w-0 group-hover:w-3 h-[1px] bg-blue-500 transition-all duration-300" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="relative border-t border-white/5">
                    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                        <div className="flex items-center gap-3 md:gap-4">
                            <span className="flex items-center gap-2 text-[10px] md:text-xs text-white/20">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                                All systems operational
                            </span>
                            <span className="text-white/10 hidden sm:inline">·</span>
                            <span className="text-[10px] md:text-xs text-white/20 hidden sm:inline">Delhi, India</span>
                        </div>
                        <div className="flex items-center gap-4 md:gap-6 text-[10px] md:text-xs text-white/30">
                            <span className="hidden sm:inline">© 2024 {t.brand}</span>
                            <span className="sm:hidden">© 2024 {t.brandShort}</span>
                            <Link href="#" className="hover:text-white transition-colors">{t.privacyPolicy}</Link>
                            <Link href="#" className="hover:text-white transition-colors">{t.termsOfService}</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// --- Enhanced Program Card Component ---
function ProgramCard({ item, index, color, isComingSoon, lockedLabel }: { item: any, index: number, color: "purple" | "blue", isComingSoon?: boolean, lockedLabel?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const themeColor = color === "purple" ? "text-purple-400" : "text-blue-400";
    const borderColor = color === "purple" ? "group-hover:border-purple-500/30" : "group-hover:border-blue-500/30";
    const glowColor = color === "purple" ? "from-purple-500/20" : "from-blue-500/20";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            className={`group relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-[#0a0a0a] border border-white/5 ${borderColor} overflow-hidden transition-colors duration-500`}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl md:rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(255,255,255,0.1),
                          transparent 80%
                        )
                      `,
                }}
            />
            {/* Background Gradient Hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

            <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 ${themeColor}`}>
                            {item.level}
                        </span>
                        {isComingSoon && (
                            <span className="flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white/50">
                                <Lock size={10} /> {lockedLabel}
                            </span>
                        )}
                    </div>

                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 group-hover:text-white/60 transition-colors line-clamp-3 md:line-clamp-none">
                        {item.desc}
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/30 group-hover:text-white transition-colors">
                            <Clock size={12} />
                            <span>{item.duration}</span>
                        </div>

                    </div>
                </div>

                {/* Decorative Icon Watermark */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/5 text-white/20 group-hover:scale-110 group-hover:text-white group-hover:bg-white/10 transition-all duration-500">
                    {isComingSoon ? <Lock size={20} /> : <Sparkles size={20} />}
                </div>
            </div>
        </motion.div>
    );
}

// --- Booking Modal Component ---
function BookingModal({ program, region, onClose }: { program: any, region: 'IN' | 'INTL', onClose: () => void }) {
    const { t } = useLanguage();
    const subjects = [t.subjectMath, "Physics", "Chemistry", "Biology", t.subjectEnglish, "Psychology", "Computer Science", "Economics", "Business Studies", "Accountancy"];

    // Country & Currency Logic
    const [selectedRegion, setSelectedRegion] = useState<'IN' | 'INTL'>(region);
    const [countryCode, setCountryCode] = useState(region === 'IN' ? "+91" : "+1");
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const price = selectedRegion === 'IN' ? "₹49" : "$6";

    // Common Countries List
    const countries = [
        { code: "IN", name: "India", dial: "+91", currency: "INR" },
        { code: "US", name: "United States", dial: "+1", currency: "USD" },
        { code: "UK", name: "United Kingdom", dial: "+44", currency: "USD" }, // Using USD for simplicity as per requirement ($6)
        { code: "AE", name: "UAE", dial: "+971", currency: "USD" },
        { code: "SG", name: "Singapore", dial: "+65", currency: "USD" },
        { code: "AU", name: "Australia", dial: "+61", currency: "USD" },
        { code: "CA", name: "Canada", dial: "+1", currency: "USD" },
        { code: "FR", name: "France", dial: "+33", currency: "USD" },
        { code: "DE", name: "Germany", dial: "+49", currency: "USD" },
        { code: "Other", name: "Other / International", dial: "", currency: "USD" }
    ];

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const country = countries.find(c => c.name === e.target.value);
        if (country) {
            setCountryCode(country.dial);
            setSelectedRegion(country.code === 'IN' ? 'IN' : 'INTL');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert(`Booking Request Sent for ${price}! We will contact you at ${countryCode}...`);
            setIsSubmitting(false);
            onClose();
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto"
            >
                {/* Modal Header */}
                <div className="relative h-32 md:h-48 bg-gradient-to-r from-purple-900/50 to-blue-900/50 flex items-end p-4 md:p-8 shrink-0">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <button onClick={onClose} className="absolute top-4 md:top-6 right-4 md:right-6 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white transition-colors">
                        <X size={18} />
                    </button>
                    <div className="relative z-10 w-full">
                        <div className="flex justify-between items-end gap-4">
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300 mb-1 md:mb-2 block">{t.bookYourDemo}</span>
                                <h3 className="text-xl md:text-3xl font-black text-white truncate">{program.title}</h3>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="block text-[10px] md:text-xs text-white/50 uppercase tracking-widest mb-1">{t.limitedOffer}</span>
                                <motion.span
                                    key={price}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="block text-2xl md:text-4xl font-black text-white"
                                >
                                    {price}<span className="text-xs md:text-base font-medium text-white/50">{t.perSession}</span>
                                </motion.span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-4 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                            {/* Personal Info */}
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">{t.fullName}</label>
                                <input type="text" placeholder="John Doe" required className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition-colors" />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">{t.emailAddress}</label>
                                <input type="email" placeholder="john@example.com" required className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition-colors" />
                            </div>

                            {/* Country Selection */}
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">{t.country}</label>
                                <div className="relative">
                                    <select
                                        onChange={handleCountryChange}
                                        defaultValue={region === 'IN' ? "India" : "United States"}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white appearance-none focus:outline-none focus:border-purple-500 transition-colors"
                                    >
                                        <option className="bg-[#0a0a0a]" value="" disabled>{t.selectCountry}</option>
                                        {countries.map(c => (
                                            <option key={c.code} value={c.name} className="bg-[#0a0a0a]">{c.name}</option>
                                        ))}
                                    </select>
                                    <ChevronRight className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 rotate-90 text-white/30 pointer-events-none" size={14} />
                                </div>
                            </div>

                            {/* Phone with Country Code */}
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">{t.phoneNumber}</label>
                                <div className="flex gap-2">
                                    <div className="bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-2 md:px-3 py-2.5 md:py-3 text-sm md:text-base text-white/60 min-w-[60px] md:min-w-[70px] flex items-center justify-center select-none cursor-not-allowed">
                                        {countryCode}
                                    </div>
                                    <input type="tel" placeholder="123 456 7890" required className="flex-1 bg-white/5 border border-white/10 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Subject Selection */}
                        <div className="space-y-2 md:space-y-3">
                            <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/50">{t.selectSubjectFocus}</label>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {subjects.map((sub) => (
                                    <button
                                        key={sub}
                                        type="button"
                                        onClick={() => setSelectedSubject(sub)}
                                        className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${selectedSubject === sub
                                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        {sub}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 md:py-4 mt-4 md:mt-6 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base md:text-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-purple-600/20"
                        >
                            {isSubmitting ? t.confirming : `${t.confirmBooking} • ${price}`}
                        </button>

                        <p className="text-center text-xs text-white/30">
                            {t.termsOfService && `By booking, you agree to our ${t.termsOfService}.`}
                        </p>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}
