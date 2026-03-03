'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'hi';

export const LANGUAGES = {
    en: { name: 'English', flag: '🇬🇧', nativeName: 'English' },
    fr: { name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    hi: { name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
};

// Translation type
type TranslationKeys = {
    // Header/Brand
    brand: string;
    brandShort: string;
    brandTagline: string;

    // Hero Section
    heroSubtitle: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitleGenius: string;
    heroTitleLife: string;
    heroDescription: string;
    scrollDown: string;

    // Gateway Cards
    geniusHubTitle: string;
    geniusHubSubtitle: string;
    lifeHubTitle: string;
    lifeHubSubtitle: string;
    enterButton: string;

    // Gateway Features
    geniusFeature1: string;
    geniusFeature2: string;
    geniusFeature3: string;
    lifeFeature1: string;
    lifeFeature2: string;
    lifeFeature3: string;

    // About Section
    aboutSubtitle: string;
    aboutTitle1: string;
    aboutTitle2: string;
    founderName: string;
    founderRole: string;
    yearsExperience: string;
    experienceLabel: string;
    founderVisionaryTag: string;
    aboutDescription1: string;
    aboutDescription2: string;
    founderQuote: string;

    // Features Section
    featuresSubtitle: string;
    featuresTitle: string;
    discoverButton: string;
    closeButton: string;

    // Feature Titles & Descriptions
    feature1Title: string;
    feature1Desc: string;
    feature1Details: string;
    feature2Title: string;
    feature2Desc: string;
    feature2Details: string;
    feature3Title: string;
    feature3Desc: string;
    feature3Details: string;
    feature4Title: string;
    feature4Desc: string;
    feature4Details: string;

    // Journey Section
    journeySubtitle: string;
    journeyTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;

    // Programs Section
    programsSubtitle: string;
    programsTitle: string;
    geniusTrack: string;
    comingSoon: string;
    comingSoonDesc: string;
    gotIt: string;
    locked: string;

    // Program Cards - Genius
    occultSciencesTitle: string;
    occultSciencesLevel: string;
    occultSciencesDuration: string;
    occultSciencesDesc: string;
    lifeCoachingTitle: string;
    lifeCoachingLevel: string;
    lifeCoachingDuration: string;
    lifeCoachingDesc: string;
    mentoringTitle: string;
    mentoringLevel: string;
    mentoringDuration: string;
    mentoringDesc: string;

    // Program Cards - Life (Coming Soon)
    academicSupportTitle: string;
    academicSupportLevel: string;
    academicSupportDuration: string;
    academicSupportDesc: string;
    skillDevTitle: string;
    skillDevLevel: string;
    skillDevDuration: string;
    skillDevDesc: string;
    holisticLearningTitle: string;
    holisticLearningLevel: string;
    holisticLearningDuration: string;
    holisticLearningDesc: string;

    // Footer CTA
    ctaSubtitle: string;
    ctaTitle1: string;
    ctaTitle2: string;
    ctaDescription: string;
    ctaButton: string;

    // Footer
    footerBrandDesc: string;
    programsLabel: string;
    companyLabel: string;
    aboutUs: string;
    contact: string;
    privacyPolicy: string;
    termsOfService: string;
    allRightsReserved: string;
    statusOnline: string;
    location: string;

    // Booking Modal
    bookYourDemo: string;
    limitedOffer: string;
    perSession: string;
    fullName: string;
    emailAddress: string;
    country: string;
    selectCountry: string;
    phoneNumber: string;
    selectSubjectFocus: string;
    confirmBooking: string;
    confirming: string;
    bookingSuccess: string;
    bookingSuccessDesc: string;

    // Subjects
    subjectMath: string;
    subjectScience: string;
    subjectEnglish: string;
    subjectOccult: string;
    subjectCoaching: string;
    subjectOther: string;

    // GEMS labels
    gemLearn: string;
    gemGrow: string;
    gemShine: string;
    gemCare: string;
    gemEvolve: string;

    // Loading
    loading: string;
};

// English Translations
const en: TranslationKeys = {
    // Header/Brand
    brand: 'Birendra Global Vision',
    brandShort: 'BGV',
    brandTagline: 'Birendra Global Vision',

    // Hero Section
    heroSubtitle: 'Birendra Global Vision',
    heroTitle1: 'Where Knowledge',
    heroTitle2: 'Meets Wisdom.',
    heroTitleGenius: 'Unlock Your Hidden Powers.',
    heroTitleLife: 'Master Academic Excellence.',
    heroDescription: 'A unique educational sanctuary blending academic mastery with mystical sciences. Personal mentorship designed to unlock your potential.',
    scrollDown: 'Scroll Down',

    // Gateway Cards
    geniusHubTitle: 'Genius Hub',
    geniusHubSubtitle: 'ACADEMIC EXCELLENCE',
    lifeHubTitle: 'Life Hub',
    lifeHubSubtitle: 'MYSTICAL SCIENCES',
    enterButton: 'Enter',

    // Gateway Features
    geniusFeature1: 'Mathematics & STEM',
    geniusFeature2: 'English Language & Literature',
    geniusFeature3: 'In-Demand Future Skills',
    lifeFeature1: 'Occult Sciences & Tarot',
    lifeFeature2: 'Aura Cleansing & Chakra Work',
    lifeFeature3: 'Mantra & Sound Healing',

    // About Section
    aboutSubtitle: 'The Story',
    aboutTitle1: 'The Visionary Behind',
    aboutTitle2: 'the Vision.',
    founderName: 'Amaira Srivastava',
    founderRole: 'Founder & Lead Mentor',
    yearsExperience: '20+ Years',
    experienceLabel: 'Experience',
    founderVisionaryTag: 'Our Visionary',
    aboutDescription1: 'With over two decades of experience in education and personal transformation, Amaira has guided thousands of students and seekers towards their highest potential. Her unique blend of academic rigor and esoteric wisdom creates a powerful pathway for holistic growth.',
    aboutDescription2: 'Having led prestigious institutions and trained under masters of both Eastern and Western traditions, she brings a rare perspective that bridges the gap between modern success and ancient wisdom.',
    founderQuote: '"True education is not just about filling minds with knowledge—it\'s about awakening the soul to its infinite possibilities."',

    // Features Section
    featuresSubtitle: 'Why Choose Us',
    featuresTitle: 'Everything You Need to Grow.',
    discoverButton: 'Discover',
    closeButton: 'Close',

    // Feature Titles & Descriptions
    feature1Title: 'Learning Without Borders',
    feature1Desc: 'Quality education and guidance for learners across the world, breaking barriers of distance, age, and background.',
    feature1Details: 'We believe knowledge should have no boundaries. Our platform connects students and seekers from every corner of the globe—USA, UK, India, Singapore, and beyond—offering a seamless, high-quality learning experience that feels just as personal as sitting in the same room.',
    feature2Title: '20+ Years of Excellence',
    feature2Desc: 'Led by an experienced educator with deep academic and leadership expertise from prestigious institutions.',
    feature2Details: 'Our foundation is built on decades of real-world educational leadership. With a legacy of guiding students at top-tier institutions, we bring a level of pedagogical mastery, discipline, and insight that generic tutoring platforms simply cannot match.',
    feature3Title: 'One-to-One Personalized',
    feature3Desc: 'Every learner is unique. Our programs offer individual attention, customized paths, and focused mentoring.',
    feature3Details: 'Crowded classrooms leave talent behind. Our 1:1 mentorship model ensures that 100% of our focus is on YOU. We analyze your learning style, pace, and goals to create a hyper-personalized roadmap that guarantees progress.',
    feature4Title: 'Holistic Programs',
    feature4Desc: 'From academics to occult sciences, and from life coaching to mentoring—supporting complete growth.',
    feature4Details: 'Success is multidimensional. Unlike traditional platforms that focus only on grades, we nurture the whole individual. Whether it\'s mastering Mathematics, understanding your destiny through Astrology, or finding life purpose, we provide the tools for complete evolution.',

    // Journey Section
    journeySubtitle: 'The Journey',
    journeyTitle: 'How We Transform You.',
    step1Title: 'Discovery',
    step1Desc: 'We begin by understanding you. Through an initial deep-dive consultation, we identify your unique strengths, challenges, and aspirations.',
    step2Title: 'Strategy',
    step2Desc: 'Amaira crafts a bespoke learning path for you, blending academic rigor with spiritual insights tailored to your personal blueprint.',
    step3Title: 'Growth',
    step3Desc: 'Engage in vivid, one-on-one sessions. Whether it\'s mastering a subject or unlocking intuitive powers, you learn at your own pace.',
    step4Title: 'Evolution',
    step4Desc: 'Knowledge becomes wisdom. You emerge not just with better grades or skills, but with clarity, confidence, and a higher sense of purpose.',

    // Programs Section
    programsSubtitle: 'Programs',
    programsTitle: 'Choose Your Path.',
    geniusTrack: 'Genius Track',
    comingSoon: 'Coming Soon',
    comingSoonDesc: 'We\'re working on something special. This section will be available soon. Stay tuned!',
    gotIt: 'Got it!',
    locked: 'Locked',

    // Program Cards - Genius
    occultSciencesTitle: 'Occult Sciences',
    occultSciencesLevel: 'All Levels',
    occultSciencesDuration: 'Flexible',
    occultSciencesDesc: 'Dive into the mysteries of the universe. Master the ancient arts of Astrology, Numerology, Tarot, and Vastu Shastra to decode destiny and align your life with cosmic rhythms.',
    lifeCoachingTitle: 'Life Coaching',
    lifeCoachingLevel: 'Personal',
    lifeCoachingDuration: 'Ongoing',
    lifeCoachingDesc: 'Transform obstacles into stepping stones. Through deep introspection and strategic guidance, help you break limiting patterns, gain crystal-clear clarity, and design a life of purpose and power.',
    mentoringTitle: 'Mentoring Programs',
    mentoringLevel: 'Growth',
    mentoringDuration: 'Custom',
    mentoringDesc: 'A bespoke journey of self-discovery. Whether you\'re a student, professional, or seeker, our 1:1 mentorship unlocks your latent potential, shapes your vision, and accelerates your personal evolution.',

    // Program Cards - Life
    academicSupportTitle: 'Academic Support',
    academicSupportLevel: 'All Ages',
    academicSupportDuration: 'Flexible',
    academicSupportDesc: 'Comprehensive academic excellence for K-12 students. Expert tutoring in Mathematics, Science, and Languages designed to build strong foundations and boost exam confidence.',
    skillDevTitle: 'Skill Development',
    skillDevLevel: 'Beginner',
    skillDevDuration: 'Ongoing',
    skillDevDesc: 'Equip yourself for the future. From public speaking and critical thinking to digital literacy, we nurture the essential skills that define 21st-century leaders.',
    holisticLearningTitle: 'Holistic Learning',
    holisticLearningLevel: 'All Levels',
    holisticLearningDuration: 'Custom',
    holisticLearningDesc: 'Education beyond textbooks. Our integrated curriculum fosters emotional intelligence, mindfulness, and creative expression for truly balanced growth.',

    // Footer CTA
    ctaSubtitle: 'Begin Your Transformation',
    ctaTitle1: 'Your destiny awaits.',
    ctaTitle2: 'Are you ready?',
    ctaDescription: 'Join thousands who have transformed their lives through our unique blend of wisdom and knowledge.',
    ctaButton: 'Book Your First Demo',

    // Footer
    footerBrandDesc: 'Bridging ancient wisdom with modern excellence. Your journey to transformation begins here.',
    programsLabel: 'Programs',
    companyLabel: 'Company',
    aboutUs: 'About Us',
    contact: 'Contact',
    privacyPolicy: 'Privacy',
    termsOfService: 'Terms',
    allRightsReserved: 'All Rights Reserved',
    statusOnline: 'Online',
    location: 'India',

    // Booking Modal
    bookYourDemo: 'Book Your Demo',
    limitedOffer: 'Limited Offer',
    perSession: '/session',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    country: 'Country',
    selectCountry: 'Select Country',
    phoneNumber: 'Phone Number',
    selectSubjectFocus: 'Select Subject Focus',
    confirmBooking: 'Confirm Booking',
    confirming: 'Confirming...',
    bookingSuccess: 'Booking Confirmed!',
    bookingSuccessDesc: 'We\'ll contact you within 24 hours to schedule your session.',

    // Subjects
    subjectMath: 'Mathematics',
    subjectScience: 'Science',
    subjectEnglish: 'English',
    subjectOccult: 'Occult Sciences',
    subjectCoaching: 'Life Coaching',
    subjectOther: 'Other',

    // GEMS labels
    gemLearn: 'Learn',
    gemGrow: 'Grow',
    gemShine: 'Shine',
    gemCare: 'Care',
    gemEvolve: 'Evolve',

    // Loading
    loading: 'Loading...',
};

// French Translations
const fr: TranslationKeys = {
    // Header/Brand
    brand: 'Birendra Global Vision',
    brandShort: 'BGV',
    brandTagline: 'Birendra Global Vision',

    // Hero Section
    heroSubtitle: 'Birendra Global Vision',
    heroTitle1: 'Là où le Savoir',
    heroTitle2: 'Rencontre la Sagesse.',
    heroTitleGenius: 'Libérez Vos Pouvoirs Cachés.',
    heroTitleLife: 'Maîtrisez l\'Excellence Académique.',
    heroDescription: 'Un sanctuaire éducatif unique alliant maîtrise académique et sciences mystiques. Un mentorat personnel conçu pour libérer votre potentiel.',
    scrollDown: 'Défiler vers le bas',

    // Gateway Cards
    geniusHubTitle: 'Hub Génie',
    geniusHubSubtitle: 'SCIENCES MYSTIQUES',
    lifeHubTitle: 'Hub Vie',
    lifeHubSubtitle: 'EXCELLENCE ACADÉMIQUE',
    enterButton: 'Entrer',

    // Gateway Features
    geniusFeature1: 'Sagesse Ancienne & Arts Occultes',
    geniusFeature2: 'Coaching de Transformation de Vie',
    geniusFeature3: 'Cartographie du Destin Personnel',
    lifeFeature1: 'Excellence Académique K-12',
    lifeFeature2: 'Programmes de Développement des Compétences',
    lifeFeature3: 'Parcours d\'Apprentissage Personnalisés',

    // About Section
    aboutSubtitle: 'L\'Histoire',
    aboutTitle1: 'Le Visionnaire Derrière',
    aboutTitle2: 'la Vision.',
    founderName: 'Amaira Srivastava',
    founderRole: 'Fondatrice & Mentor Principal',
    yearsExperience: '20+ Ans',
    experienceLabel: 'Expérience',
    founderVisionaryTag: 'Notre Visionnaire',
    aboutDescription1: 'Avec plus de deux décennies d\'expérience dans l\'éducation et la transformation personnelle, Amaira a guidé des milliers d\'étudiants et de chercheurs vers leur plus haut potentiel. Son mélange unique de rigueur académique et de sagesse ésotérique crée un chemin puissant pour une croissance holistique.',
    aboutDescription2: 'Ayant dirigé des institutions prestigieuses et s\'étant formée auprès de maîtres des traditions orientales et occidentales, elle apporte une perspective rare qui comble le fossé entre le succès moderne et la sagesse ancienne.',
    founderQuote: '"La vraie éducation ne consiste pas seulement à remplir les esprits de connaissances—c\'est éveiller l\'âme à ses possibilités infinies."',

    // Features Section
    featuresSubtitle: 'Pourquoi Nous Choisir',
    featuresTitle: 'Tout Ce Dont Vous Avez Besoin Pour Grandir.',
    discoverButton: 'Découvrir',
    closeButton: 'Fermer',

    // Feature Titles & Descriptions
    feature1Title: 'Apprendre Sans Frontières',
    feature1Desc: 'Une éducation de qualité et des conseils pour les apprenants du monde entier, brisant les barrières de distance, d\'âge et d\'origine.',
    feature1Details: 'Nous croyons que le savoir ne devrait avoir aucune frontière. Notre plateforme connecte les étudiants et les chercheurs de tous les coins du monde—États-Unis, Royaume-Uni, Inde, Singapour et au-delà—offrant une expérience d\'apprentissage de haute qualité aussi personnelle que d\'être dans la même pièce.',
    feature2Title: '20+ Ans d\'Excellence',
    feature2Desc: 'Dirigé par une éducatrice expérimentée avec une expertise académique et de leadership approfondie issue d\'institutions prestigieuses.',
    feature2Details: 'Notre fondation repose sur des décennies de leadership éducatif réel. Avec un héritage de guidage d\'étudiants dans des institutions de premier plan, nous apportons un niveau de maîtrise pédagogique, de discipline et de perspicacité que les plateformes de tutorat génériques ne peuvent tout simplement pas égaler.',
    feature3Title: 'Un-à-Un Personnalisé',
    feature3Desc: 'Chaque apprenant est unique. Nos programmes offrent une attention individuelle, des parcours personnalisés et un mentorat ciblé.',
    feature3Details: 'Les salles de classe bondées laissent les talents derrière. Notre modèle de mentorat 1:1 garantit que 100% de notre attention est sur VOUS. Nous analysons votre style d\'apprentissage, votre rythme et vos objectifs pour créer une feuille de route hyper-personnalisée qui garantit les progrès.',
    feature4Title: 'Programmes Holistiques',
    feature4Desc: 'De l\'académique aux sciences occultes, du coaching de vie au mentorat—soutenant une croissance complète.',
    feature4Details: 'Le succès est multidimensionnel. Contrairement aux plateformes traditionnelles qui se concentrent uniquement sur les notes, nous nourrissons l\'individu dans son ensemble. Que ce soit maîtriser les mathématiques, comprendre votre destin par l\'astrologie, ou trouver le but de la vie, nous fournissons les outils pour une évolution complète.',

    // Journey Section
    journeySubtitle: 'Le Voyage',
    journeyTitle: 'Comment Nous Vous Transformons.',
    step1Title: 'Découverte',
    step1Desc: 'Nous commençons par vous comprendre. Grâce à une consultation approfondie initiale, nous identifions vos forces uniques, vos défis et vos aspirations.',
    step2Title: 'Stratégie',
    step2Desc: 'Amaira élabore un parcours d\'apprentissage sur mesure pour vous, alliant rigueur académique et insights spirituels adaptés à votre plan personnel.',
    step3Title: 'Croissance',
    step3Desc: 'Participez à des sessions vivantes en tête-à-tête. Que ce soit maîtriser un sujet ou débloquer des pouvoirs intuitifs, vous apprenez à votre propre rythme.',
    step4Title: 'Évolution',
    step4Desc: 'Le savoir devient sagesse. Vous émergez non seulement avec de meilleures notes ou compétences, mais avec clarté, confiance et un sens plus élevé du but.',

    // Programs Section
    programsSubtitle: 'Programmes',
    programsTitle: 'Choisissez Votre Chemin.',
    geniusTrack: 'Piste Génie',
    comingSoon: 'Bientôt Disponible',
    comingSoonDesc: 'Nous travaillons sur quelque chose de spécial. Cette section sera bientôt disponible. Restez à l\'écoute!',
    gotIt: 'Compris!',
    locked: 'Verrouillé',

    // Program Cards - Genius
    occultSciencesTitle: 'Sciences Occultes',
    occultSciencesLevel: 'Tous Niveaux',
    occultSciencesDuration: 'Flexible',
    occultSciencesDesc: 'Plongez dans les mystères de l\'univers. Maîtrisez les arts anciens de l\'Astrologie, la Numérologie, le Tarot et le Vastu Shastra pour décoder le destin et aligner votre vie avec les rythmes cosmiques.',
    lifeCoachingTitle: 'Coaching de Vie',
    lifeCoachingLevel: 'Personnel',
    lifeCoachingDuration: 'Continu',
    lifeCoachingDesc: 'Transformez les obstacles en tremplins. Grâce à une introspection profonde et des conseils stratégiques, nous vous aidons à briser les schémas limitants, à gagner une clarté cristalline et à concevoir une vie de but et de pouvoir.',
    mentoringTitle: 'Programmes de Mentorat',
    mentoringLevel: 'Croissance',
    mentoringDuration: 'Personnalisé',
    mentoringDesc: 'Un voyage sur mesure de découverte de soi. Que vous soyez étudiant, professionnel ou chercheur, notre mentorat 1:1 libère votre potentiel latent, façonne votre vision et accélère votre évolution personnelle.',

    // Program Cards - Life
    academicSupportTitle: 'Soutien Académique',
    academicSupportLevel: 'Tous Âges',
    academicSupportDuration: 'Flexible',
    academicSupportDesc: 'Excellence académique complète pour les élèves de la maternelle à la terminale. Tutorat expert en Mathématiques, Sciences et Langues conçu pour construire des bases solides et renforcer la confiance aux examens.',
    skillDevTitle: 'Développement des Compétences',
    skillDevLevel: 'Débutant',
    skillDevDuration: 'Continu',
    skillDevDesc: 'Équipez-vous pour l\'avenir. De la prise de parole en public et la pensée critique à la littératie numérique, nous cultivons les compétences essentielles qui définissent les leaders du 21e siècle.',
    holisticLearningTitle: 'Apprentissage Holistique',
    holisticLearningLevel: 'Tous Niveaux',
    holisticLearningDuration: 'Personnalisé',
    holisticLearningDesc: 'L\'éducation au-delà des manuels. Notre programme intégré favorise l\'intelligence émotionnelle, la pleine conscience et l\'expression créative pour une croissance vraiment équilibrée.',

    // Footer CTA
    ctaSubtitle: 'Commencez Votre Transformation',
    ctaTitle1: 'Votre destin vous attend.',
    ctaTitle2: 'Êtes-vous prêt?',
    ctaDescription: 'Rejoignez des milliers de personnes qui ont transformé leur vie grâce à notre mélange unique de sagesse et de connaissance.',
    ctaButton: 'Réservez Votre Première Démo',

    // Footer
    footerBrandDesc: 'Alliant la sagesse ancienne à l\'excellence moderne. Votre voyage vers la transformation commence ici.',
    programsLabel: 'Programmes',
    companyLabel: 'Entreprise',
    aboutUs: 'À Propos',
    contact: 'Contact',
    privacyPolicy: 'Confidentialité',
    termsOfService: 'Conditions',
    allRightsReserved: 'Tous Droits Réservés',
    statusOnline: 'En Ligne',
    location: 'Inde',

    // Booking Modal
    bookYourDemo: 'Réservez Votre Démo',
    limitedOffer: 'Offre Limitée',
    perSession: '/séance',
    fullName: 'Nom Complet',
    emailAddress: 'Adresse Email',
    country: 'Pays',
    selectCountry: 'Sélectionner le Pays',
    phoneNumber: 'Numéro de Téléphone',
    selectSubjectFocus: 'Sélectionner le Sujet',
    confirmBooking: 'Confirmer Réservation',
    confirming: 'Confirmation...',
    bookingSuccess: 'Réservation Confirmée!',
    bookingSuccessDesc: 'Nous vous contacterons dans les 24 heures pour programmer votre séance.',

    // Subjects
    subjectMath: 'Mathématiques',
    subjectScience: 'Sciences',
    subjectEnglish: 'Anglais',
    subjectOccult: 'Sciences Occultes',
    subjectCoaching: 'Coaching de Vie',
    subjectOther: 'Autre',

    // GEMS labels
    gemLearn: 'Apprendre',
    gemGrow: 'Grandir',
    gemShine: 'Briller',
    gemCare: 'Soigner',
    gemEvolve: 'Évoluer',

    // Loading
    loading: 'Chargement...',
};

// Hindi Translations
const hi: TranslationKeys = {
    // Header/Brand
    brand: 'बिरेंद्र ग्लोबल विज़न',
    brandShort: 'BGV',
    brandTagline: 'बिरेंद्र ग्लोबल विज़न',

    // Hero Section
    heroSubtitle: 'बिरेंद्र ग्लोबल विज़न',
    heroTitle1: 'जहाँ ज्ञान',
    heroTitle2: 'बुद्धि से मिलता है।',
    heroTitleGenius: 'अपनी छिपी शक्तियों को जगाएं।',
    heroTitleLife: 'शैक्षणिक उत्कृष्टता में महारत हासिल करें।',
    heroDescription: 'एक अनूठा शैक्षिक आश्रय जो शैक्षणिक निपुणता को रहस्यमय विज्ञान के साथ जोड़ता है। आपकी क्षमता को अनलॉक करने के लिए डिज़ाइन किया गया व्यक्तिगत मार्गदर्शन।',
    scrollDown: 'नीचे स्क्रॉल करें',

    // Gateway Cards
    geniusHubTitle: 'जीनियस हब',
    geniusHubSubtitle: 'रहस्यमय विज्ञान',
    lifeHubTitle: 'लाइफ हब',
    lifeHubSubtitle: 'शैक्षणिक उत्कृष्टता',
    enterButton: 'प्रवेश करें',

    // Gateway Features
    geniusFeature1: 'प्राचीन ज्ञान और गुप्त कलाएं',
    geniusFeature2: 'जीवन परिवर्तन कोचिंग',
    geniusFeature3: 'व्यक्तिगत भाग्य मानचित्रण',
    lifeFeature1: 'K-12 शैक्षणिक उत्कृष्टता',
    lifeFeature2: 'कौशल विकास कार्यक्रम',
    lifeFeature3: 'व्यक्तिगत शिक्षण पथ',

    // About Section
    aboutSubtitle: 'कहानी',
    aboutTitle1: 'दृष्टि के पीछे',
    aboutTitle2: 'दूरदर्शी।',
    founderName: 'अमायरा श्रीवास्तव',
    founderRole: 'संस्थापक और मुख्य मार्गदर्शक',
    yearsExperience: '20+ वर्ष',
    experienceLabel: 'अनुभव',
    founderVisionaryTag: 'हमारे दूरदर्शी',
    aboutDescription1: 'शिक्षा और व्यक्तिगत परिवर्तन में दो दशकों से अधिक के अनुभव के साथ, अमायरा ने हजारों छात्रों और साधकों को उनकी उच्चतम क्षमता की ओर मार्गदर्शन किया है। शैक्षणिक कठोरता और गूढ़ ज्ञान का उनका अनूठा मिश्रण समग्र विकास के लिए एक शक्तिशाली मार्ग बनाता है।',
    aboutDescription2: 'प्रतिष्ठित संस्थानों का नेतृत्व करने और पूर्वी और पश्चिमी दोनों परंपराओं के स्वामियों के तहत प्रशिक्षण लेने के बाद, वह एक दुर्लभ परिप्रेक्ष्य लाती हैं जो आधुनिक सफलता और प्राचीन ज्ञान के बीच के अंतर को पाटता है।',
    founderQuote: '"सच्ची शिक्षा केवल दिमाग को ज्ञान से भरना नहीं है—यह आत्मा को उसकी अनंत संभावनाओं के प्रति जागृत करना है।"',

    // Features Section
    featuresSubtitle: 'हमें क्यों चुनें',
    featuresTitle: 'विकास के लिए सब कुछ जो आपको चाहिए।',
    discoverButton: 'खोजें',
    closeButton: 'बंद करें',

    // Feature Titles & Descriptions
    feature1Title: 'सीमाओं के बिना सीखना',
    feature1Desc: 'दुनिया भर के शिक्षार्थियों के लिए गुणवत्तापूर्ण शिक्षा और मार्गदर्शन, दूरी, उम्र और पृष्ठभूमि की बाधाओं को तोड़ता है।',
    feature1Details: 'हम मानते हैं कि ज्ञान की कोई सीमा नहीं होनी चाहिए। हमारा प्लेटफॉर्म दुनिया के हर कोने से छात्रों और साधकों को जोड़ता है—अमेरिका, ब्रिटेन, भारत, सिंगापुर और उससे आगे—एक निर्बाध, उच्च-गुणवत्ता वाला सीखने का अनुभव प्रदान करता है।',
    feature2Title: '20+ वर्षों की उत्कृष्टता',
    feature2Desc: 'प्रतिष्ठित संस्थानों से गहरी शैक्षणिक और नेतृत्व विशेषज्ञता वाले अनुभवी शिक्षक द्वारा नेतृत्व।',
    feature2Details: 'हमारी नींव दशकों के वास्तविक दुनिया के शैक्षिक नेतृत्व पर बनी है। शीर्ष संस्थानों में छात्रों का मार्गदर्शन करने की विरासत के साथ, हम शैक्षणिक निपुणता, अनुशासन और अंतर्दृष्टि का एक स्तर लाते हैं।',
    feature3Title: 'एक-से-एक व्यक्तिगत',
    feature3Desc: 'हर शिक्षार्थी अद्वितीय है। हमारे कार्यक्रम व्यक्तिगत ध्यान, अनुकूलित पथ और केंद्रित मार्गदर्शन प्रदान करते हैं।',
    feature3Details: 'भीड़भाड़ वाली कक्षाएं प्रतिभा को पीछे छोड़ देती हैं। हमारा 1:1 मार्गदर्शन मॉडल सुनिश्चित करता है कि 100% ध्यान आप पर है। हम आपकी सीखने की शैली, गति और लक्ष्यों का विश्लेषण करते हैं।',
    feature4Title: 'समग्र कार्यक्रम',
    feature4Desc: 'शिक्षा से लेकर गुप्त विज्ञान तक, और लाइफ कोचिंग से लेकर मार्गदर्शन तक—पूर्ण विकास का समर्थन।',
    feature4Details: 'सफलता बहुआयामी है। पारंपरिक प्लेटफॉर्म के विपरीत जो केवल ग्रेड पर ध्यान केंद्रित करते हैं, हम पूरे व्यक्ति का पोषण करते हैं। चाहे गणित में महारत हासिल करना हो, ज्योतिष के माध्यम से अपने भाग्य को समझना हो, या जीवन का उद्देश्य खोजना हो।',

    // Journey Section
    journeySubtitle: 'यात्रा',
    journeyTitle: 'हम आपको कैसे बदलते हैं।',
    step1Title: 'खोज',
    step1Desc: 'हम आपको समझने से शुरू करते हैं। प्रारंभिक गहन परामर्श के माध्यम से, हम आपकी अद्वितीय शक्तियों, चुनौतियों और आकांक्षाओं की पहचान करते हैं।',
    step2Title: 'रणनीति',
    step2Desc: 'अमायरा आपके लिए एक अनुकूलित सीखने का मार्ग तैयार करती हैं, जो आपके व्यक्तिगत ब्लूप्रिंट के अनुसार शैक्षणिक कठोरता को आध्यात्मिक अंतर्दृष्टि के साथ मिलाता है।',
    step3Title: 'विकास',
    step3Desc: 'जीवंत, एक-से-एक सत्रों में भाग लें। चाहे किसी विषय में महारत हासिल करनी हो या सहज शक्तियों को अनलॉक करना हो, आप अपनी गति से सीखते हैं।',
    step4Title: 'विकास',
    step4Desc: 'ज्ञान बुद्धि बन जाता है। आप न केवल बेहतर ग्रेड या कौशल के साथ उभरते हैं, बल्कि स्पष्टता, आत्मविश्वास और उद्देश्य की उच्च भावना के साथ।',

    // Programs Section
    programsSubtitle: 'कार्यक्रम',
    programsTitle: 'अपना मार्ग चुनें।',
    geniusTrack: 'जीनियस ट्रैक',
    comingSoon: 'जल्द आ रहा है',
    comingSoonDesc: 'हम कुछ खास पर काम कर रहे हैं। यह अनुभाग जल्द ही उपलब्ध होगा। बने रहें!',
    gotIt: 'समझ गया!',
    locked: 'बंद',

    // Program Cards - Genius
    occultSciencesTitle: 'गुप्त विज्ञान',
    occultSciencesLevel: 'सभी स्तर',
    occultSciencesDuration: 'लचीला',
    occultSciencesDesc: 'ब्रह्मांड के रहस्यों में गोता लगाएं। भाग्य को डिकोड करने और अपने जीवन को ब्रह्मांडीय लय के साथ संरेखित करने के लिए ज्योतिष, अंकशास्त्र, टैरो और वास्तु शास्त्र की प्राचीन कलाओं में महारत हासिल करें।',
    lifeCoachingTitle: 'लाइफ कोचिंग',
    lifeCoachingLevel: 'व्यक्तिगत',
    lifeCoachingDuration: 'जारी',
    lifeCoachingDesc: 'बाधाओं को सीढ़ियों में बदलें। गहन आत्मनिरीक्षण और रणनीतिक मार्गदर्शन के माध्यम से, सीमित पैटर्न को तोड़ने, क्रिस्टल-स्पष्ट स्पष्टता प्राप्त करने और उद्देश्य और शक्ति का जीवन डिजाइन करने में मदद करें।',
    mentoringTitle: 'मार्गदर्शन कार्यक्रम',
    mentoringLevel: 'विकास',
    mentoringDuration: 'कस्टम',
    mentoringDesc: 'आत्म-खोज की एक अनुकूलित यात्रा। चाहे आप छात्र हों, पेशेवर हों या साधक, हमारा 1:1 मार्गदर्शन आपकी अव्यक्त क्षमता को अनलॉक करता है, आपकी दृष्टि को आकार देता है और आपके व्यक्तिगत विकास को तेज करता है।',

    // Program Cards - Life
    academicSupportTitle: 'शैक्षणिक सहायता',
    academicSupportLevel: 'सभी उम्र',
    academicSupportDuration: 'लचीला',
    academicSupportDesc: 'K-12 छात्रों के लिए व्यापक शैक्षणिक उत्कृष्टता। मजबूत नींव बनाने और परीक्षा में आत्मविश्वास बढ़ाने के लिए डिज़ाइन किया गया गणित, विज्ञान और भाषाओं में विशेषज्ञ ट्यूटरिंग।',
    skillDevTitle: 'कौशल विकास',
    skillDevLevel: 'शुरुआती',
    skillDevDuration: 'जारी',
    skillDevDesc: 'भविष्य के लिए खुद को तैयार करें। सार्वजनिक बोलने और आलोचनात्मक सोच से लेकर डिजिटल साक्षरता तक, हम 21वीं सदी के नेताओं को परिभाषित करने वाले आवश्यक कौशल का पोषण करते हैं।',
    holisticLearningTitle: 'समग्र शिक्षा',
    holisticLearningLevel: 'सभी स्तर',
    holisticLearningDuration: 'कस्टम',
    holisticLearningDesc: 'पाठ्यपुस्तकों से परे शिक्षा। हमारा एकीकृत पाठ्यक्रम वास्तव में संतुलित विकास के लिए भावनात्मक बुद्धिमत्ता, सचेतनता और रचनात्मक अभिव्यक्ति को बढ़ावा देता है।',

    // Footer CTA
    ctaSubtitle: 'अपना परिवर्तन शुरू करें',
    ctaTitle1: 'आपका भाग्य इंतजार कर रहा है।',
    ctaTitle2: 'क्या आप तैयार हैं?',
    ctaDescription: 'हजारों लोगों से जुड़ें जिन्होंने ज्ञान और बुद्धि के हमारे अनूठे मिश्रण के माध्यम से अपना जीवन बदल लिया है।',
    ctaButton: 'अपना पहला डेमो बुक करें',

    // Footer
    footerBrandDesc: 'प्राचीन ज्ञान को आधुनिक उत्कृष्टता से जोड़ना। परिवर्तन की आपकी यात्रा यहीं से शुरू होती है।',
    programsLabel: 'कार्यक्रम',
    companyLabel: 'कंपनी',
    aboutUs: 'हमारे बारे में',
    contact: 'संपर्क करें',
    privacyPolicy: 'गोपनीयता',
    termsOfService: 'शर्तें',
    allRightsReserved: 'सर्वाधिकार सुरक्षित',
    statusOnline: 'ऑनलाइन',
    location: 'भारत',

    // Booking Modal
    bookYourDemo: 'अपना डेमो बुक करें',
    limitedOffer: 'सीमित ऑफर',
    perSession: '/सत्र',
    fullName: 'पूरा नाम',
    emailAddress: 'ईमेल पता',
    country: 'देश',
    selectCountry: 'देश चुनें',
    phoneNumber: 'फ़ोन नंबर',
    selectSubjectFocus: 'विषय चुनें',
    confirmBooking: 'बुकिंग की पुष्टि करें',
    confirming: 'पुष्टि हो रही है...',
    bookingSuccess: 'बुकिंग की पुष्टि!',
    bookingSuccessDesc: 'हम आपके सत्र को शेड्यूल करने के लिए 24 घंटे के भीतर आपसे संपर्क करेंगे।',

    // Subjects
    subjectMath: 'गणित',
    subjectScience: 'विज्ञान',
    subjectEnglish: 'अंग्रेज़ी',
    subjectOccult: 'गुप्त विज्ञान',
    subjectCoaching: 'लाइफ कोचिंग',
    subjectOther: 'अन्य',

    // GEMS labels
    gemLearn: 'सीखें',
    gemGrow: 'बढ़ें',
    gemShine: 'चमकें',
    gemCare: 'देखभाल',
    gemEvolve: 'विकसित हों',

    // Loading
    loading: 'लोड हो रहा है...',
};

const translations: Record<Language, TranslationKeys> = { en, fr, hi };

// Context
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    // Auto-detect language based on browser/timezone on mount
    useEffect(() => {
        const savedLang = localStorage.getItem('preferred-language') as Language;
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
        } else {
            // Auto-detect based on browser language
            const browserLang = navigator.language.toLowerCase();
            if (browserLang.startsWith('fr')) {
                setLanguage('fr');
            } else if (browserLang.startsWith('hi')) {
                setLanguage('hi');
            }
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('preferred-language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Hook
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
