'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, X, Heart, Wind, Brain, Mic, Eye } from 'lucide-react';
import Link from 'next/link';
import SharedFooter from '../components/SharedFooter';

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS (Astrala-inspired)
// ─────────────────────────────────────────────────────────────────────────────
// BG:          #EDE9E1  warm linen
// TEXT:        #2C2916  deep warm charcoal
// ACCENT:      #7A6E3A  muted olive-gold
// ACCENT_LIGHT:#C8B96E  lighter gold for hover
// SECONDARY:   #D9D4C8  slightly darker linen for section separation
// DARK_BG:     #1E1A0F  very dark warm charcoal for CTA section

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type Service = {
    id: number;
    bookingId: string;
    label: string;
    title: string;
    tagline: string;
    description: string;
    icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }>;
    image: string;
    duration: string;
    priceIndia: string;
    priceIntl: string;
    perks: string[];
};

// ─────────────────────────────────────────────────────────────────────────────
// FADE-IN
// ─────────────────────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }: {
    children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'down'; className?: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0, x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE DATA
// ─────────────────────────────────────────────────────────────────────────────
const services: Service[] = [
    {
        id: 1,
        bookingId: 'life-coaching',
        label: 'LIFE COACHING',
        title: 'Advising, Mentoring & Counseling',
        tagline: 'Your personal life architect',
        description: 'A deeply personal 1-on-1 session designed to break patterns, clarify your direction, and build the mental frameworks needed to live a purposeful and fulfilling life.',
        icon: Heart,
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
        duration: '60 min',
        priceIndia: '₹1,500',
        priceIntl: '£15',
        perks: ['Goal architecture & life audit', 'Mindset reprogramming', 'Personalised action plan'],
    },
    {
        id: 2,
        bookingId: 'crystal-scrying',
        label: 'CRYSTAL BALL SCRYING',
        title: 'Divination & Intuitive Insight',
        tagline: 'Illuminating your path forward',
        description: 'Peer beyond the veil. A guided 25-minute scrying session using ancient crystal ball techniques to illuminate your path, reveal blind spots, and offer profound clarity.',
        icon: Eye,
        image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?q=80&w=1200&auto=format&fit=crop',
        duration: '25 min',
        priceIndia: '₹500',
        priceIntl: '£20',
        perks: ['Deep intuitive reading', 'Past, present & future insights', 'Energy alignment ritual'],
    },
    {
        id: 3,
        bookingId: 'aura-cleansing',
        label: 'AURA CLEANSING',
        title: 'Energy Clearing & Field Renewal',
        tagline: 'Restore your energetic signature',
        description: 'Your aura holds every experience, emotion and interaction. This session identifies, clears, and restores your auric field — removing dense energies and emotional residue.',
        icon: Wind,
        image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop',
        duration: '45 min',
        priceIndia: '₹800',
        priceIntl: '£10',
        perks: ['Chakra & aura scan', 'Deep energy clearing', 'Post-session protection ritual'],
    },
    {
        id: 4,
        bookingId: 'subconscious-work',
        label: 'SUBCONSCIOUS WORK',
        title: 'Rewire Deep-Rooted Patterns',
        tagline: 'Access the 95% beneath awareness',
        description: 'Through guided techniques we surface, examine, and dissolve the limiting beliefs and unconscious behaviours that quietly run your life from behind the scenes.',
        icon: Brain,
        image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1200&auto=format&fit=crop',
        duration: '50 min',
        priceIndia: '₹1,200',
        priceIntl: '£12',
        perks: ['Belief system audit', 'Deep-pattern dissolution', 'Emotional root-cause healing'],
    },
    {
        id: 5,
        bookingId: 'sound-healing',
        label: 'MANTRA & SOUND HEALING',
        title: 'Vibrational Frequency Work',
        tagline: 'Sound is the original medicine',
        description: 'Through the precise use of mantras, sacred sound frequencies and breathwork, this session recalibrates your nervous system and elevates your vibrational state permanently.',
        icon: Mic,
        image: 'https://images.unsplash.com/photo-1545696968-1a31da406a8a?q=80&w=1200&auto=format&fit=crop',
        duration: '40 min',
        priceIndia: '₹700',
        priceIntl: '£8',
        perks: ['Personalised mantra activation', 'Frequency alignment', 'Guided breathwork & release'],
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// BOOKING MODAL
// ─────────────────────────────────────────────────────────────────────────────
const BookingModal = ({ service, onClose }: { service: Service | null; onClose: () => void }) => {
    const [country, setCountry] = useState('India');
    const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', time: '' });
    const [submitted, setSubmitted] = useState(false);

    if (!service) return null;

    const price = country === 'India' ? service.priceIndia : service.priceIntl;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-[#1E1A0F]/70 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.93, y: 24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl bg-[#EDE9E1] overflow-hidden"
                style={{ fontFamily: "'Georgia', serif" }}
            >
                {/* Gold top bar */}
                <div className="h-1 w-full bg-[#7A6E3A]" />

                <div className="p-8 md:p-10">
                    {/* Close */}
                    <button onClick={onClose} className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center text-[#7A6E3A] hover:text-[#2C2916] bg-[#D9D4C8] rounded-full transition-colors">
                        <X size={18} />
                    </button>

                    {!submitted ? (
                        <>
                            {/* Label */}
                            <p className="text-xs tracking-[0.22em] font-sans font-semibold text-[#7A6E3A] uppercase mb-2">{service.label}</p>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#2C2916] mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                                {service.title}
                            </h3>
                            <p className="text-sm font-sans text-[#7A6E3A] mb-6">{service.tagline}</p>

                            {/* Price */}
                            <div className="bg-[#D9D4C8] px-5 py-4 flex items-center justify-between mb-7">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.18em] font-sans font-semibold text-[#7A6E3A] mb-0.5">Session Investment</p>
                                    <p className="text-3xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase tracking-[0.18em] font-sans font-semibold text-[#7A6E3A] mb-0.5">Duration</p>
                                    <p className="text-xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{service.duration}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-1.5">Full Name</label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full border border-[#C8B96E] bg-[#F5F1E8] px-4 py-3 text-[#2C2916] font-medium text-sm focus:outline-none focus:border-[#7A6E3A] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-1.5">Email</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" className="w-full border border-[#C8B96E] bg-[#F5F1E8] px-4 py-3 text-[#2C2916] font-medium text-sm focus:outline-none focus:border-[#7A6E3A] transition-colors" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-1.5">WhatsApp</label>
                                        <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+91 99999 99999" className="w-full border border-[#C8B96E] bg-[#F5F1E8] px-4 py-3 text-[#2C2916] font-medium text-sm focus:outline-none focus:border-[#7A6E3A] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-1.5">Location</label>
                                        <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-[#C8B96E] bg-[#F5F1E8] px-4 py-3 text-[#2C2916] font-medium text-sm focus:outline-none focus:border-[#7A6E3A] transition-colors appearance-none cursor-pointer">
                                            <option value="India">India</option>
                                            <option value="Other">International</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A] mb-1.5">Preferred Date & Time</label>
                                    <input required type="datetime-local" name="time" value={formData.time} onChange={handleChange} className="w-full border border-[#C8B96E] bg-[#F5F1E8] px-4 py-3 text-[#2C2916] font-medium text-sm focus:outline-none focus:border-[#7A6E3A] transition-colors" />
                                </div>

                                <button type="submit" className="w-full bg-[#2C2916] text-[#EDE9E1] py-4 font-semibold uppercase tracking-[0.18em] text-sm flex items-center justify-center gap-3 hover:bg-[#7A6E3A] transition-colors mt-2">
                                    Reserve My Session — {price} <ArrowRight size={16} />
                                </button>
                            </form>
                        </>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                            <div className="w-16 h-16 rounded-full bg-[#7A6E3A] mx-auto flex items-center justify-center mb-6">
                                <CheckCircle2 size={32} className="text-[#EDE9E1]" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2C2916] mb-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>Session Requested</h3>
                            <p className="font-sans text-[#7A6E3A] text-base mb-2">Thank you, <strong className="text-[#2C2916]">{formData.name}</strong>.</p>
                            <p className="font-sans text-sm text-[#A09070] mb-8">We will reach out on WhatsApp within 24 hours to confirm your <em>{service.title}</em> session.</p>
                            <button onClick={onClose} className="px-8 py-3 bg-[#2C2916] text-[#EDE9E1] text-sm uppercase tracking-[0.18em] font-semibold hover:bg-[#7A6E3A] transition-colors">
                                Close
                            </button>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────────────────────────────────────
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
    const isReversed = index % 2 !== 0;

    return (
        <FadeIn>
            <div className={`flex flex-col lg:flex-row ${isReversed ? 'lg:flex-row-reverse' : ''} gap-0 border-t border-[#C8B96E]/40 pt-0 group`}>
                {/* Image */}
                <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3]">
                    <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>

                {/* Content */}
                <div className={`w-full lg:w-1/2 flex flex-col justify-center px-6 py-8 md:px-10 md:py-12 bg-[#EDE9E1]`}>
                    {/* Category label */}
                    <div className="flex items-center gap-3 mb-5">
                        <service.icon size={14} style={{ color: '#7A6E3A' }} />
                        <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#7A6E3A]">{service.label}</span>
                    </div>

                    {/* Title */}
                    <h3
                        className="text-3xl md:text-4xl font-bold text-[#2C2916] mb-1 leading-tight"
                        style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                    >
                        {service.title}
                    </h3>
                    <p className="text-sm italic text-[#A09070] mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                        — {service.tagline}
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-px bg-[#7A6E3A] mb-6" />

                    {/* Description */}
                    <p className="font-sans text-[#5A5040] font-medium leading-relaxed text-base mb-8">
                        {service.description}
                    </p>

                    {/* Perks */}
                    <ul className="space-y-2.5 mb-8">
                        {service.perks.map((perk, i) => (
                            <li key={i} className="flex items-center gap-3 font-sans text-sm text-[#5A5040]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7A6E3A] shrink-0" />
                                {perk}
                            </li>
                        ))}
                    </ul>

                    {/* Pricing row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#C8B96E]/40 pt-6">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.18em] font-sans font-semibold text-[#7A6E3A] mb-0.5">From</p>
                            <p className="text-2xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                                {service.priceIndia}
                            </p>
                            <p className="text-xs font-sans text-[#A09070]">{service.priceIntl} internationally · {service.duration}</p>
                        </div>
                        <Link
                            href={`/life-hub/book?service=${service.bookingId}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2C2916] text-[#EDE9E1] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] font-sans hover:bg-[#7A6E3A] transition-colors rounded-full"
                        >
                            Book Now <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function LifeHub() {
    const { scrollYProgress } = useScroll();
    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <>
            {/* Load Playfair Display */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');`}</style>

            <main className="min-h-screen bg-[#EDE9E1] text-[#2C2916] selection:bg-[#C8B96E]/40" style={{ fontFamily: "'Inter', sans-serif" }}>

                {/* Scroll progress bar */}
                <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#7A6E3A] origin-left z-50" style={{ scaleX: springScroll }} />

                {/* NAV spacer */}
                <div className="h-24" />

                {/* ──────────────── HERO ──────────────── */}
                <section className="relative pt-16 pb-24 overflow-hidden">
                    {/* Subtle linen texture grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8B96E10_1px,transparent_1px),linear-gradient(to_bottom,#C8B96E10_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

                    <div className="container mx-auto px-6 max-w-7xl relative z-10">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                            {/* Left: copy */}
                            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                                <FadeIn>
                                    <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] mb-6 flex items-center gap-2 justify-center lg:justify-start">
                                        <span className="w-8 h-px bg-[#7A6E3A] inline-block" />
                                        BGV Life Hub · Holistic Wellness
                                    </p>
                                </FadeIn>

                                <FadeIn delay={0.1}>
                                    <h1
                                        className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[#2C2916] leading-[1.05] mb-8"
                                        style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                                    >
                                        Your path<br />
                                        to a{' '}
                                        <em className="text-[#7A6E3A]">transformed</em>
                                        <br />life awaits.
                                    </h1>
                                </FadeIn>

                                <FadeIn delay={0.2}>
                                    <p className="text-lg md:text-xl text-[#5A5040] leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                                        Expert-led sessions in Life Coaching, Crystal Scrying, Aura Cleansing, Subconscious Work, and Sound Healing — personalised to where you are and where you want to be.
                                    </p>
                                </FadeIn>

                                <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                                    <a href="#services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2C2916] text-[#EDE9E1] px-10 py-4 text-sm uppercase tracking-[0.18em] font-semibold hover:bg-[#7A6E3A] transition-colors rounded-full">
                                        Explore Sessions <ArrowRight size={14} />
                                    </a>
                                    <a href="#services" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#7A6E3A] text-[#7A6E3A] px-10 py-4 text-sm uppercase tracking-[0.18em] font-semibold hover:bg-[#7A6E3A] hover:text-[#EDE9E1] transition-colors rounded-full">
                                        Book a Session
                                    </a>
                                </FadeIn>
                            </div>

                            {/* Right: decorative SVG mandala */}
                            <FadeIn delay={0.25} direction="left" className="absolute -right-[30%] -top-[10%] opacity-10 pointer-events-none scale-150 lg:scale-100 lg:opacity-100 lg:pointer-events-auto lg:static lg:flex-1 flex items-center justify-center z-[-1] lg:z-auto">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                                    className="relative w-[420px] h-[420px]"
                                >
                                    <svg viewBox="0 0 400 400" className="w-full h-full" style={{ color: '#7A6E3A' }}>
                                        {/* Outer circle */}
                                        <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" />
                                        <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                        <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 6" />
                                        <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                        <circle cx="200" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
                                        {/* Cross lines */}
                                        <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="0.4" />
                                        <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="0.4" />
                                        <line x1="65" y1="65" x2="335" y2="335" stroke="currentColor" strokeWidth="0.4" />
                                        <line x1="335" y1="65" x2="65" y2="335" stroke="currentColor" strokeWidth="0.4" />
                                        {/* 8 dots on second ring */}
                                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                                            const r = 160;
                                            const rad = (angle * Math.PI) / 180;
                                            return <circle key={angle} cx={200 + r * Math.cos(rad)} cy={200 + r * Math.sin(rad)} r="4" fill="currentColor" />;
                                        })}
                                        {/* Center star */}
                                        <polygon points="200,170 209,191 232,191 214,205 221,228 200,215 179,228 186,205 168,191 191,191" fill="none" stroke="currentColor" strokeWidth="1.2" />
                                    </svg>
                                    {/* Center label (non-rotating) */}
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="text-center">
                                            <p className="text-3xl font-bold text-[#7A6E3A]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>BGV</p>
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-[#7A6E3A] mt-1">Life Hub</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ──────────────── MARQUEE ──────────────── */}
                <section className="border-y border-[#C8B96E]/40 py-4 overflow-hidden bg-[#E8E3D8]">
                    <motion.div
                        animate={{ x: [0, -1400] }}
                        transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
                        className="whitespace-nowrap flex"
                    >
                        {[...Array(6)].map((_, i) => (
                            <span key={i} className="inline-flex items-center gap-8 mx-10 text-xs uppercase tracking-[0.3em] font-semibold text-[#7A6E3A]">
                                <span>Life Coaching</span>
                                <span className="text-[#C8B96E] text-base">✦</span>
                                <span>Crystal Scrying</span>
                                <span className="text-[#C8B96E] text-base">✦</span>
                                <span>Aura Cleansing</span>
                                <span className="text-[#C8B96E] text-base">✦</span>
                                <span>Subconscious Work</span>
                                <span className="text-[#C8B96E] text-base">✦</span>
                                <span>Sound Healing</span>
                                <span className="text-[#C8B96E] text-base">✦</span>
                            </span>
                        ))}
                    </motion.div>
                </section>

                {/* ──────────────── INTRO BANNER ──────────────── */}
                <section className="py-24 bg-[#EDE9E1] border-b border-[#C8B96E]/30">
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <FadeIn>
                            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] mb-8 flex items-center justify-center gap-3">
                                <span className="w-8 h-px bg-[#7A6E3A]" /> Our Philosophy <span className="w-8 h-px bg-[#7A6E3A]" />
                            </p>
                            <p
                                className="text-3xl md:text-4xl text-[#2C2916] leading-[1.5] font-medium"
                                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                            >
                                "True transformation begins within. Our practice blends ancient wisdom with modern understanding to help you reclaim your power, clarity, and peace."
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* ──────────────── SERVICES ──────────────── */}
                <section id="services" className="py-24">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <FadeIn className="mb-20">
                            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] mb-3 flex items-center gap-2">
                                <span className="w-8 h-px bg-[#7A6E3A]" /> Our Offerings
                            </p>
                            <h2
                                className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C2916] leading-tight"
                                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                            >
                                Choose your<br className="hidden sm:block" />path to wellness.
                            </h2>
                        </FadeIn>

                        <div className="space-y-0">
                            {services.map((service, i) => (
                                <div key={service.id} className="border-t border-[#C8B96E]/40">
                                    <ServiceCard service={service} index={i} />
                                </div>
                            ))}
                            <div className="border-t border-[#C8B96E]/40" />
                        </div>
                    </div>
                </section>

                {/* ──────────────── HOW IT WORKS ──────────────── */}
                <section className="py-24 bg-[#E8E3D8]">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <FadeIn className="text-center mb-20">
                            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] mb-4 flex items-center justify-center gap-3">
                                <span className="w-8 h-px bg-[#7A6E3A]" /> The Process <span className="w-8 h-px bg-[#7A6E3A]" />
                            </p>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                                Your journey, simplified.
                            </h2>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
                            {/* Horizontal connector (Desktop) */}
                            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-[#C8B96E]/60" />
                            {/* Vertical connector (Mobile) */}
                            <div className="md:hidden absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#C8B96E]/0 via-[#C8B96E]/60 to-[#C8B96E]/0 -translate-x-1/2" />

                            {[
                                { step: '01', title: 'Choose your path', desc: 'Browse our five transformative sessions and select the one that calls to you right now.' },
                                { step: '02', title: 'Reserve your slot', desc: 'Fill in a short form with your details and your preferred date and time.' },
                                { step: '03', title: 'Begin your shift', desc: 'Connect with your expert guide via Zoom for a session that will change your world.' },
                            ].map((item, i) => (
                                <FadeIn key={i} delay={i * 0.15} className="relative z-10 text-center px-6 py-8 md:px-8 md:py-10">
                                    <div
                                        className="w-16 h-16 rounded-full border-2 border-[#7A6E3A] mx-auto flex items-center justify-center mb-6 bg-[#E8E3D8]"
                                    >
                                        <span className="text-lg font-bold text-[#7A6E3A]" style={{ fontFamily: "'Playfair Display', serif" }}>{item.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#2C2916] mb-3" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>{item.title}</h3>
                                    <p className="text-sm text-[#5A5040] leading-relaxed">{item.desc}</p>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ──────────────── STATS ROW ──────────────── */}
                <FadeIn>
                    <section className="border-y border-[#C8B96E]/40 py-10 bg-[#EDE9E1]">
                        <div className="container mx-auto px-6 max-w-5xl grid grid-cols-3 divide-x divide-[#C8B96E]/40">
                            {[
                                { stat: '500+', label: 'Lives transformed' },
                                { stat: '10+', label: 'Years of wisdom' },
                                { stat: '5', label: 'Unique pathways' },
                            ].map((item) => (
                                <div key={item.label} className="text-center py-4 px-6">
                                    <p className="text-4xl font-bold text-[#7A6E3A] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{item.stat}</p>
                                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#5A5040]">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </FadeIn>

                {/* ──────────────── COACHES / GUIDES ──────────────── */}
                <section id="guides" className="py-28 bg-[#EDE9E1]">
                    <div className="container mx-auto px-6 max-w-7xl">

                        {/* Section header */}
                        <FadeIn className="mb-24">
                            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] mb-3 flex items-center gap-2">
                                <span className="w-8 h-px bg-[#7A6E3A]" /> Your Guides
                            </p>
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                <h2
                                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C2916] leading-tight"
                                    style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                                >
                                    Meet the minds<br />
                                    <em className="text-[#7A6E3A]">behind your transformation.</em>
                                </h2>
                                <p className="text-base text-[#5A5040] max-w-sm leading-relaxed">
                                    Our guides bring decades of lived experience in both the spiritual and the practical — chosen for their depth, compassion, and results.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Coach 1 — Amaira Srivastava */}
                        <FadeIn>
                            <div className="flex flex-col xl:flex-row gap-0 border border-[#C8B96E]/30 overflow-hidden bg-white shadow-[0_4px_40px_rgba(122,110,58,0.06)]">

                                {/* Left — large portrait */}
                                <div className="w-full xl:w-[40%] relative overflow-hidden h-[340px] sm:h-[400px] md:min-h-[480px] xl:min-h-0">
                                    <img
                                        src="/faculty/amaira.jpg"
                                        alt="Amaira Srivastava"
                                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                                    />
                                    {/* Subtle gradient overlay at bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A0F]/60 via-transparent to-transparent" />
                                    {/* Name plate */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#C8B96E] mb-1">Life Coach & Wiccan Practitioner</p>
                                        <h3
                                            className="text-4xl font-bold text-white leading-tight"
                                            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                                        >
                                            Amaira<br />Srivastava
                                        </h3>
                                    </div>
                                </div>

                                {/* Right — bio & details */}
                                <div className="w-full xl:w-[60%] p-6 md:p-10 lg:p-16 flex flex-col justify-between bg-[#EDE9E1]">

                                    {/* Quote / headline */}
                                    <div className="mb-10">
                                        <p
                                            className="text-xl md:text-2xl font-medium text-[#2C2916] leading-relaxed border-l-4 border-[#7A6E3A] pl-6 mb-8 italic"
                                            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                                        >
                                            "My mission is to bridge the spiritual and the practical — empowering individuals to harness both inner wisdom and strategic action."
                                        </p>

                                        <p className="text-base text-[#5A5040] leading-relaxed mb-5">
                                            With over 20 years of experience guiding individuals through personal transformation, Amaira is both a dedicated Life Coach and a practicing Wiccan, blending spiritual wisdom with strategic, results-driven coaching. Her journey has been rooted in helping people rediscover their inner power, align with their purpose, and create meaningful change in their lives.
                                        </p>
                                        <p className="text-base text-[#5A5040] leading-relaxed">
                                            As a Strategic Life Coach, she works with clarity, structure, and practical tools to help clients set achievable goals, overcome limiting beliefs, and design actionable plans for success. Her 20+ years of Wiccan practice — including spell work, energy healing, crystal ball scrying, protection rituals, and manifestation — support emotional, mental, and spiritual well-being.
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-[#C8B96E]/40 mb-10" />

                                    {/* Specialities */}
                                    <div className="mb-10">
                                        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A6E3A] mb-4">Specialities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                'Life Coaching', 'Crystal Ball Scrying', 'Wiccan Spell Work',
                                                'Aura Cleansing', 'Manifestation', 'Subconscious Reprogramming',
                                                'Protection Rituals', 'Energy Healing', 'Spiritual Guidance'
                                            ].map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-4 py-1.5 text-xs font-semibold text-[#7A6E3A] border border-[#C8B96E]/60 bg-[#F5F1E8] uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Experience & CTA row */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                        <div className="flex items-center gap-8">
                                            <div>
                                                <p className="text-3xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', serif" }}>20+</p>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A]">Years Experience</p>
                                            </div>
                                            <div className="w-px h-10 bg-[#C8B96E]/40" />
                                            <div>
                                                <p className="text-3xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', serif" }}>5</p>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A]">Services Offered</p>
                                            </div>
                                        </div>

                                        <a
                                            href="#services"
                                            className="inline-flex items-center gap-2 bg-[#2C2916] text-[#EDE9E1] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] hover:bg-[#7A6E3A] transition-colors rounded-full shrink-0"
                                        >
                                            Book with Amaira <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Coach 2 — Harshada Sawant */}
                        <FadeIn delay={0.1}>
                            <div className="mt-8 flex flex-col xl:flex-row-reverse gap-0 border border-[#C8B96E]/30 overflow-hidden bg-white shadow-[0_4px_40px_rgba(122,110,58,0.06)]">

                                {/* Right (visually) — large portrait */}
                                <div className="w-full xl:w-[40%] relative overflow-hidden min-h-[480px] xl:min-h-0">
                                    <img
                                        src="/faculty/harshada.jpg"
                                        alt="Harshada Sawant"
                                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A0F]/60 via-transparent to-transparent" />
                                    {/* Name plate */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <p className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#C8B96E] mb-1">Vedic Astrologer · 15+ Years</p>
                                        <h3
                                            className="text-4xl font-bold text-white leading-tight"
                                            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                                        >
                                            Harshada<br />Sawant
                                        </h3>
                                    </div>
                                </div>

                                {/* Left — bio & details */}
                                <div className="w-full xl:w-[60%] p-10 md:p-16 flex flex-col justify-between bg-[#EDE9E1]">

                                    <div className="mb-10">
                                        <p
                                            className="text-xl md:text-2xl font-medium text-[#2C2916] leading-relaxed border-l-4 border-[#7A6E3A] pl-6 mb-8 italic"
                                            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
                                        >
                                            "Astrology for me is not just a profession but a responsibility — to guide people with accuracy, positivity, and ethical values."
                                        </p>

                                        <p className="text-base text-[#5A5040] leading-relaxed mb-5">
                                            Namaste. With over 15 years of experience in Vedic astrology, Harshada has guided many individuals in areas of career, marriage, health, finance, and personal growth. Her aim is to provide clear, practical, and honest guidance to help people make better life decisions.
                                        </p>
                                        <p className="text-base text-[#5A5040] leading-relaxed">
                                            She specialises in horoscope analysis, Kundli matching, planetary remedies, and life-guidance consultations. A firm believer that astrology is a divine science, Harshada strives to offer simple solutions and positive guidance for a balanced, peaceful life — helping clients understand both life's challenges and its opportunities.
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-[#C8B96E]/40 mb-10" />

                                    {/* Specialities */}
                                    <div className="mb-10">
                                        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A6E3A] mb-4">Specialities</p>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                'Vedic Astrology', 'Horoscope Reading', 'Kundli Matching',
                                                'Planetary Remedies', 'Career Guidance', 'Marriage Compatibility',
                                                'Health Astrology', 'Finance Prediction', 'Life Guidance'
                                            ].map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-4 py-1.5 text-xs font-semibold text-[#7A6E3A] border border-[#C8B96E]/60 bg-[#F5F1E8] uppercase tracking-wider"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats & CTA */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                        <div className="flex items-center gap-8">
                                            <div>
                                                <p className="text-3xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', serif" }}>15+</p>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A]">Years Experience</p>
                                            </div>
                                            <div className="w-px h-10 bg-[#C8B96E]/40" />
                                            <div>
                                                <p className="text-3xl font-bold text-[#2C2916]" style={{ fontFamily: "'Playfair Display', serif" }}>Vedic</p>
                                                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#7A6E3A]">Astrology Tradition</p>
                                            </div>
                                        </div>

                                        <a
                                            href="#services"
                                            className="inline-flex items-center gap-2 bg-[#2C2916] text-[#EDE9E1] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] hover:bg-[#7A6E3A] transition-colors rounded-full shrink-0"
                                        >
                                            Book with Harshada <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>



                    </div>
                </section>


                <section className="py-32 bg-[#1E1A0F] text-[#EDE9E1] relative overflow-hidden">
                    {/* Subtle mandala bg watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <svg viewBox="0 0 400 400" className="w-[600px] h-[600px]" style={{ color: '#C8B96E' }}>
                            <circle cx="200" cy="200" r="190" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" />
                            <circle cx="200" cy="200" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
                            <line x1="200" y1="10" x2="200" y2="390" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="10" y1="200" x2="390" y2="200" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="65" y1="65" x2="335" y2="335" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="335" y1="65" x2="65" y2="335" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                        <FadeIn>
                            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-[#7A6E3A] mb-6 flex items-center justify-center gap-3">
                                <span className="w-8 h-px bg-[#7A6E3A]" /> Begin Today <span className="w-8 h-px bg-[#7A6E3A]" />
                            </p>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#EDE9E1] leading-[1.05] mb-6" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                                Ready to begin<br /><em className="text-[#C8B96E]">your journey?</em>
                            </h2>
                            <p className="text-lg text-[#EDE9E1]/60 mb-12 max-w-xl mx-auto leading-relaxed">
                                Take the first step toward the life you truly want. Expert guides are ready to walk alongside you.
                            </p>
                            <a href="#services" className="inline-flex items-center gap-3 bg-[#7A6E3A] text-[#EDE9E1] px-12 py-5 text-sm uppercase tracking-[0.22em] font-semibold hover:bg-[#C8B96E] hover:text-[#2C2916] transition-colors rounded-full">
                                Book a Session Now <ArrowRight size={16} />
                            </a>
                        </FadeIn>
                    </div>
                </section>

                <SharedFooter />

            </main>
        </>
    );
}
