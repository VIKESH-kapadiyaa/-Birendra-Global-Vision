'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import {
    Calculator,
    Atom,
    FlaskConical,
    BookType,
    Lightbulb,
    ArrowRight,
    CheckCircle2,
    GraduationCap,
    Award,
    Target,
    Users
} from 'lucide-react';
import Link from 'next/link';

// --- Shared Animation Components ---

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: { children: React.ReactNode, delay?: number, direction?: "up" | "left" | "right" | "down", className?: string }) => {
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

// --- Main Page Component ---

export default function GeniusHub() {
    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const progressWidth = useTransform(springScroll, [0, 1], ["0%", "100%"]);

    const subjects = [
        {
            title: "Advanced Mathematics",
            desc: "From algebraic foundations to advanced calculus and competitive mathematics.",
            icon: Calculator,
            color: "blue"
        },
        {
            title: "Physics",
            desc: "Master classical mechanics, electromagnetism, and modern physics concepts.",
            icon: Atom,
            color: "indigo"
        },
        {
            title: "Chemistry",
            desc: "Deep dive into organic, inorganic, and physical chemistry principles.",
            icon: FlaskConical,
            color: "emerald"
        },
        {
            title: "English Language & Literature",
            desc: "Enhance critical reading, expressive writing, and communication skills.",
            icon: BookType,
            color: "orange"
        },
        {
            title: "On-Demand Subjects",
            desc: "Customized curriculum tailored to your specific academic requirements and goals.",
            icon: Lightbulb,
            color: "purple"
        }
    ];

    const methodology = [
        {
            step: "01",
            title: "Diagnostic Assessment",
            desc: "We begin by analyzing the student's current proficiency, learning style, and academic goals to establish a clear baseline."
        },
        {
            step: "02",
            title: "Curriculum Customization",
            desc: "A personalized syllabus is crafted, ensuring all blind spots are addressed while accelerating strengths."
        },
        {
            step: "03",
            title: "1-on-1 Expert Mentorship",
            desc: "Engage in highly interactive, focused sessions with elite educators dedicated solely to the student's progress."
        },
        {
            step: "04",
            title: "Continuous Evaluation",
            desc: "Regular mock tests, conceptual reviews, and progress tracking ensure the student is always moving toward excellence."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Top Navigation Spacer (Assuming global nav is fixed) */}
            <div className="h-24 w-full" />

            {/* HERO SECTION */}
            <section className="relative pt-20 pb-32 overflow-hidden">
                {/* Clean Geometric Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-50/50 rounded-full blur-3xl opacity-80" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-50/50 rounded-full blur-3xl opacity-80" />

                    {/* Minimal Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
                                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-blue-800">Premium Academic Mentorship</span>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                                    Master Core <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Academics.</span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                                    Accelerate learning with world-class, customized one-on-one education. We provide elite instruction in Mathematics, Sciences, English, and bespoke subjects designed entirely around the student's ambition.
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                    <Link href="/" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2 group w-full sm:w-auto justify-center">
                                        Book Consultation
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link href="#subjects" className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-semibold transition-all w-full sm:w-auto justify-center flex items-center">
                                        Explore Subjects
                                    </Link>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.4} className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-blue-600" />
                                    <span className="text-sm font-medium">Verified Educators</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-blue-600" />
                                    <span className="text-sm font-medium">100% Customized</span>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Hero Visual */}
                        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
                            <FadeIn delay={0.3} direction="left">
                                <div className="relative rounded-[2rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-50 blur-3xl rounded-full opacity-60 pointer-events-none -mr-20 -mt-20" />

                                    <div className="flex items-center justify-between mb-8 relative z-10">
                                        <h3 className="text-lg font-bold text-slate-800">Student Dashboard Matrix</h3>
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Target size={20} className="text-blue-600" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        {[
                                            { subject: "Advanced Calculus", progress: 85, color: "bg-blue-500" },
                                            { subject: "Organic Chemistry", progress: 65, color: "bg-indigo-500" },
                                            { subject: "English Literature", progress: 92, color: "bg-emerald-500" }
                                        ].map((stat, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-semibold text-slate-700">{stat.subject}</span>
                                                    <span className="text-xs font-bold text-slate-500">{stat.progress}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${stat.progress}%` }}
                                                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                                        className={`h-full ${stat.color} rounded-full`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                                                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="avatar" className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-400 font-medium">Active Mentors</p>
                                            <p className="text-sm font-bold text-slate-800">World-Class Faculty</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </section>

            {/* SUBJECTS SECTION */}
            <section id="subjects" className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <FadeIn>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Academic Disciplines.</h2>
                            <p className="text-lg text-slate-600">Comprehensive, rigorous, and completely personalized. We cover the entire spectrum of fundamental and advanced global curricula.</p>
                        </FadeIn>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjects.map((sub, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="group h-full bg-white p-8 rounded-3xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col cursor-pointer">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
                                        ${sub.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : ''}
                                        ${sub.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : ''}
                                        ${sub.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : ''}
                                        ${sub.color === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' : ''}
                                        ${sub.color === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' : ''}
                                    `}>
                                        <sub.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{sub.title}</h3>
                                    <p className="text-slate-600 leading-relaxed text-sm flex-1">{sub.desc}</p>

                                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        View Syllabus <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* METHODOLOGY SECTION */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        <div className="flex-1">
                            <FadeIn>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">The BGV <br /><span className="text-blue-600">Methodology.</span></h2>
                                <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
                                    We do not believe in a one-size-fits-all approach. Every student has a unique mental architecture. Our four-step methodology ensures knowledge is completely internalized.
                                </p>
                            </FadeIn>

                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {methodology.map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.1} direction="left" className="relative flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center shrink-0 z-10 shadow-sm">
                                            <span className="text-xs font-black text-blue-600">{item.step}</span>
                                        </div>
                                        <div className="pt-2">
                                            <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            <FadeIn direction="right">
                                <div className="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden bg-slate-900 flex items-center justify-center p-8 text-center group">
                                    <img
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                        alt="Students learning"
                                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                                    <div className="relative z-10 max-w-sm">
                                        <GraduationCap size={48} className="text-white mx-auto mb-6 opacity-80" />
                                        <h3 className="text-2xl font-bold text-white mb-4">"Education is not the learning of facts, but the training of the mind to think."</h3>
                                        <p className="text-white/60 font-medium uppercase tracking-widest text-xs">— Albert Einstein</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Ready to excel?</h2>
                        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                            Join elite students worldwide who are accelerating their academic journeys through our specialized mentorship.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/" className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold transition-all text-lg flex items-center gap-2 group w-full sm:w-auto justify-center">
                                Book Your First Demo
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
