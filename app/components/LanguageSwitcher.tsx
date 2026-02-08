'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, LANGUAGES, Language } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-[100]">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Globe size={14} className="text-purple-400 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{LANGUAGES[language].flag}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider">{language.toUpperCase()}</span>
                <ChevronDown
                    size={12}
                    className={`text-white/50 transition-transform duration-200 sm:w-[14px] sm:h-[14px] ${isOpen ? 'rotate-180' : ''}`}
                />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[99]"
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-40 sm:w-48 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl z-[100]"
                        >
                            <div className="p-1.5 sm:p-2">
                                <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/30 font-bold">
                                    Select Language
                                </div>

                                {(Object.keys(LANGUAGES) as Language[]).map((lang) => (
                                    <motion.button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-left transition-all ${language === lang
                                            ? 'bg-purple-500/20 text-white'
                                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                                            }`}
                                        whileHover={{ x: 2 }}
                                    >
                                        <span className="text-base sm:text-lg">{LANGUAGES[lang].flag}</span>
                                        <div className="flex-1">
                                            <div className="text-xs sm:text-sm font-medium">{LANGUAGES[lang].name}</div>
                                            <div className="text-[9px] sm:text-[10px] text-white/40">{LANGUAGES[lang].nativeName}</div>
                                        </div>
                                        {language === lang && (
                                            <Check size={12} className="text-purple-400 sm:w-[14px] sm:h-[14px]" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-white/5 px-3 sm:px-4 py-1.5 sm:py-2">
                                <p className="text-[8px] sm:text-[9px] text-white/30 text-center">
                                    🌍 Serving UK, USA, France, Singapore & India
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
