'use client';

import Link from 'next/link';
import { Mail, MessageCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// SHARED FOOTER — BGV Platform
// theme="linen"    → Life Hub (warm ivory/gold, editorial)
// theme="brutalist"→ Genius Hub (pure black, yellow/pink, neo-brutalist)
// ─────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '918291026468';
const EMAIL = 'lalbirendra34@gmail.com';

const LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Genius Hub', href: '/genius-hub' },
    { label: 'Life Hub', href: '/life-hub' },
    { label: 'Book a Demo', href: '/book-demo' },
    { label: 'Apply as Teacher', href: '/apply-teacher' },
];

const SERVICES = [
    { label: 'Life Coaching', href: '/life-hub/book?service=life-coaching' },
    { label: 'Crystal Ball Scrying', href: '/life-hub/book?service=crystal-scrying' },
    { label: 'Aura Cleansing', href: '/life-hub/book?service=aura-cleansing' },
    { label: 'Subconscious Work', href: '/life-hub/book?service=subconscious-work' },
    { label: 'Mantra & Sound Healing', href: '/life-hub/book?service=sound-healing' },
];

const GENIUS_COURSES = [
    { label: 'Mathematics', href: '/genius-hub' },
    { label: 'Physics', href: '/genius-hub' },
    { label: 'Chemistry', href: '/genius-hub' },
    { label: 'English Language', href: '/genius-hub' },
    { label: 'Computer Science', href: '/genius-hub' },
    { label: 'Book a Demo', href: '/book-demo' },
];

type FooterTheme = 'linen' | 'brutalist';
interface SharedFooterProps { theme?: FooterTheme; }

// ─────────────────────────────────────────────────────────────────────────────
// LINEN FOOTER — Life Hub
// ─────────────────────────────────────────────────────────────────────────────
function LinenFooter() {
    const gold = '#C8B96E';
    const olive = '#7A6E3A';
    const muted = '#A09070';
    const text = '#EDE9E1';

    return (
        <footer style={{ backgroundColor: '#1E1A0F', color: text, fontFamily: "'Inter', sans-serif" }}>

            {/* Connect strip */}
            <div style={{ backgroundColor: olive }} className="py-5 px-6">
                <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: text }}>
                        Also, you can connect with us from here
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a href={`mailto:${EMAIL}`}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-colors"
                            style={{ background: text, color: '#2C2916' }}>
                            <Mail size={13} /> {EMAIL}
                        </a>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] rounded-full transition-colors"
                            style={{ background: '#25D366', color: '#fff' }}>
                            <MessageCircle size={13} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="container mx-auto max-w-7xl px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <p className="text-lg font-bold tracking-[0.1em] uppercase mb-1" style={{ color: text }}>Birendra Global Vision</p>
                        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-5" style={{ color: olive }}>Learning Without Borders</p>
                        <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: muted }}>
                            A platform bridging holistic wellness and academic excellence. Expert-led sessions in Vedic astrology, life coaching, spiritual healing, and personalised academic mentoring — delivered globally via Zoom.
                        </p>
                        <div className="space-y-3">
                            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm" style={{ color: muted }}>
                                <Mail size={14} style={{ color: olive }} />{EMAIL}
                            </a>
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm" style={{ color: muted }}>
                                <MessageCircle size={14} style={{ color: '#25D366' }} />+91 8291026468 (WhatsApp)
                            </a>
                        </div>
                    </div>

                    {/* Navigate */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-5" style={{ color: olive }}>Navigate</p>
                        <ul className="space-y-3">
                            {LINKS.map(l => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-sm hover:text-white transition-colors" style={{ color: muted }}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Life Hub Sessions */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-5" style={{ color: olive }}>Life Hub Sessions</p>
                        <ul className="space-y-3">
                            {SERVICES.map(s => (
                                <li key={s.href}>
                                    <Link href={s.href} className="text-sm hover:text-white transition-colors" style={{ color: muted }}>{s.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="h-px w-full mb-8" style={{ backgroundColor: `${gold}25` }} />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: muted }}>
                    <p>© 2026 <span style={{ color: gold }}>Birendra Global Vision</span>. All Rights Reserved.</p>
                    <div className="flex items-center gap-5">
                        <span>Privacy Policy</span>
                        <span style={{ color: `${gold}50` }}>·</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// BRUTALIST FOOTER — Genius Hub
// ─────────────────────────────────────────────────────────────────────────────
function BrutalistFooter() {
    const yellow = '#ffc900';
    const pink = '#ff90e8';
    const white = '#ffffff';
    const grey = 'rgba(255,255,255,0.4)';

    return (
        <footer style={{ backgroundColor: '#000000', color: white, fontFamily: "'Inter', sans-serif" }}
            className="border-t-4 border-white">

            {/* Connect strip — yellow bar */}
            <div style={{ backgroundColor: yellow }} className="py-5 px-6 border-b-4 border-black">
                <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-black">
                        Also, you can connect with us from here
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a href={`mailto:${EMAIL}`}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-[0.15em] border-2 border-black bg-white text-black hover:bg-black hover:text-yellow-400 transition-colors"
                            style={{ boxShadow: '3px 3px 0 #000' }}>
                            <Mail size={13} /> {EMAIL}
                        </a>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-black uppercase tracking-[0.15em] border-2 border-black bg-[#25D366] text-black hover:opacity-90 transition-opacity"
                            style={{ boxShadow: '3px 3px 0 #000' }}>
                            <MessageCircle size={13} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="container mx-auto max-w-7xl px-6 pt-14 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">

                    {/* Brand */}
                    <div className="lg:col-span-2">
                        {/* Logo — brutalist box */}
                        <div className="inline-block border-4 border-white px-5 py-3 mb-6"
                            style={{ boxShadow: `6px 6px 0 ${yellow}` }}>
                            <p className="text-xl font-black uppercase tracking-tight leading-none" style={{ color: yellow }}>BIRENDRA</p>
                            <p className="text-xl font-black uppercase tracking-tight leading-none text-white">GLOBAL VISION</p>
                        </div>

                        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-5" style={{ color: pink }}>
                            Learning Without Borders
                        </p>

                        <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: grey }}>
                            A platform bridging holistic wellness and academic excellence. Expert-led sessions in Vedic astrology, life coaching, spiritual healing, and personalised academic mentoring — delivered globally via Zoom.
                        </p>

                        <div className="space-y-3">
                            <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm hover:text-white transition-colors" style={{ color: grey }}>
                                <Mail size={14} style={{ color: yellow }} />{EMAIL}
                            </a>
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 text-sm hover:text-white transition-colors" style={{ color: grey }}>
                                <MessageCircle size={14} style={{ color: '#25D366' }} />+91 8291026468 (WhatsApp)
                            </a>
                        </div>
                    </div>

                    {/* Navigate */}
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] mb-5" style={{ color: yellow }}>Navigate</p>
                        <ul className="space-y-3">
                            {LINKS.map(l => (
                                <li key={l.href}>
                                    <Link href={l.href}
                                        className="text-sm font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2 group"
                                        style={{ color: grey }}>
                                        <span className="w-0 group-hover:w-3 h-0.5 transition-all duration-200 shrink-0" style={{ backgroundColor: yellow }} />
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Genius Hub Courses */}
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] mb-5" style={{ color: pink }}>Genius Hub Courses</p>
                        <ul className="space-y-3">
                            {GENIUS_COURSES.map(s => (
                                <li key={s.label}>
                                    <Link href={s.href}
                                        className="text-sm font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2 group"
                                        style={{ color: grey }}>
                                        <span className="w-0 group-hover:w-3 h-0.5 transition-all duration-200 shrink-0" style={{ backgroundColor: pink }} />
                                        {s.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Thick rule */}
                <div className="h-1 w-full mb-8 bg-white/10" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-black uppercase tracking-[0.15em]" style={{ color: grey }}>
                        © 2026 <span style={{ color: yellow }}>Birendra Global Vision</span>. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider" style={{ color: grey }}>
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        <span style={{ color: pink }}>·</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function SharedFooter({ theme = 'linen' }: SharedFooterProps) {
    if (theme === 'brutalist') return <BrutalistFooter />;
    return <LinenFooter />;
}
