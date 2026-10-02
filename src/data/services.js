/**
 * MINDSET Psychotherapy & Counseling Center
 * Clinical Expertise & Therapeutic Services Data
 * Categorized into 4 Major Domains:
 * 1. Individual Support
 * 2. Relationship & Family
 * 3. Child & Development
 * 4. Specialized Support
 */

export const serviceCategories = [
  {
    id: "individual",
    number: "01",
    title: { en: "Individual Support", bn: "ব্যক্তিগত মানসিক সেবা" },
    tagline: { en: "Personalized care for emotional balance and inner strength", bn: "ব্যক্তিগত আবেগীয় ভারসাম্য ও মানসিক শক্তি অর্জনের সেবা" },
    accentColor: "indigo"
  },
  {
    id: "relationship",
    number: "02",
    title: { en: "Relationship & Family", bn: "দাম্পত্য ও পারিবারিক সেবা" },
    tagline: { en: "Restoring intimacy, resolving conflict, and building healthy bonds", bn: "পারস্পরিক বিশ্বাস, সুস্থ যোগাযোগ ও পারিবারিক মেলবন্ধন" },
    accentColor: "orange"
  },
  {
    id: "child",
    number: "03",
    title: { en: "Child & Development", bn: "শিশু ও বিকাশমূলক সেবা" },
    tagline: { en: "Nurturing emotional growth, behavioral milestones, and creative expression", bn: "শিশুর মানসিক বিকাশ, আচরণগত পরিবর্তন ও সৃজনশীল প্রকাশ" },
    accentColor: "emerald"
  },
  {
    id: "specialized",
    number: "04",
    title: { en: "Specialized Support", bn: "বিশেষায়িত ক্লিনিক্যাল সেবা" },
    tagline: { en: "Targeted interventions for trauma, addictions, and complex life distress", bn: "ট্রমা, আসক্তি ও জটিল মানসিক পরিস্থিতি উত্তরণে বিশেষায়িত যত্ন" },
    accentColor: "purple"
  }
];

export const servicesData = [
  /* ========================================================= */
  /* CATEGORY 1: INDIVIDUAL SUPPORT                            */
  /* ========================================================= */
  {
    id: "anxiety-panic-ocd",
    categoryId: "individual",
    metaphorType: "anxiety",
    title: {
      en: "Anxiety, Panic & OCD",
      bn: "অ্যাংজাইটি, প্যানিক ও ওসিডি"
    },
    oneLiner: {
      en: "Soothe persistent worry, racing panic, and repetitive thoughts through somatic regulation.",
      bn: "অতিরিক্ত দুশ্চিন্তা, তীব্র প্যানিক ও অনাকাঙ্ক্ষিত চিন্তার চক্র প্রশমনে নির্ভরযোগ্য থেরাপি।"
    },
    category: {
      en: "Individual Support",
      bn: "ব্যক্তিগত মানসিক সেবা"
    },
    shortDescription: {
      en: "Therapeutic interventions targeting uncontrollable worry, social anxiety, panic attacks, and obsessive-compulsive routines.",
      bn: "অতিরিক্ত উদ্বেগ, হঠাৎ তীব্র ভয় (প্যানিক), সামাজিক ভীতি এবং শুচিবাই বা অবসেসিভ চিন্তার চক্র থেকে মুক্তির থেরাপিউটিক সহায়তা।"
    },
    description: {
      en: "Evidence-based therapy combining cognitive restructuring and somatic breathing regulation to help calm the hyperactive nervous system and reclaim daily functioning.",
      bn: "কগনিটিভ রিস্ট্রাকচারিং ও শারীরিক গ্রাউন্ডিং টেকনিকের সমন্বয়ে অতিরিক্ত উদ্বেগ দূরীকরণ এবং স্নায়ুতন্ত্রের ভারসাম্য পুনরুদ্ধারের সুনির্দিষ্ট চিকিৎসা।"
    },
    details: {
      en: [
        "Somatic grounding and 4-7-8 nervous system soothing protocols",
        "Exposure and Response Prevention (ERP) for obsessive-compulsive loops",
        "Panic attack de-escalation toolkit for immediate emotional rescue"
      ],
      bn: [
        "শ্বাস-প্রশ্বাস ও শরীরভিত্তিক গ্রাউন্ডিং টেকনিক",
        "এক্সপোজার অ্যান্ড রেসপন্স প্রিভেনশন (ERP) পদ্ধতি",
        "প্যানিক অ্যাটাকের মুহূর্তে তাৎক্ষণিক স্বস্তি অর্জনের নির্দেশিকা"
      ]
    },
    whoIsItFor: {
      en: [
        "Individuals experiencing chronic muscle tension, palpitations, or dread",
        "Anyone suffering from sudden panic attacks in public or work spaces",
        "People caught in exhausting repetitive checking or intrusive thoughts"
      ],
      bn: [
        "যাঁরা তীব্র শারীরিক অস্বস্তি, বুক ধড়ফড় বা দীর্ঘস্থায়ী উদ্বেগে ভোগেন",
        "পাবলিক প্লেস বা কর্মক্ষেত্রে হঠাৎ প্যানিক অ্যাটাকের শিকার ব্যক্তিরা",
        "বারবার পরীক্ষা করার অভ্যাস বা অনাকাঙ্ক্ষিত চিন্তায় ক্লান্ত ব্যক্তিবর্গ"
      ]
    },
    therapeuticApproach: {
      en: "Cognitive Behavioral Therapy (CBT), Exposure & Response Prevention (ERP), and Somatic Mindfulness.",
      bn: "কগনিটিভ বিহেভিওরাল থেরাপি (CBT), এক্সপোজার অ্যান্ড রেসপন্স প্রিভেনশন (ERP) ও মাইন্ডফুলনেস।"
    },
    image: "/images/services/anxiety.jpg"
  },
  {
    id: "depression-mood",
    categoryId: "individual",
    metaphorType: "depression",
    title: {
      en: "Depression & Low Mood",
      bn: "বিষণ্নতা ও মানসিক ক্লান্তি"
    },
    oneLiner: {
      en: "Gently navigate emotional emptiness, fatigue, and low motivation to restore daily vitality.",
      bn: "দীর্ঘস্থায়ী বিষণ্নতা, শূন্যতাবোধ ও মানসিক জড়তা কাটিয়ে স্বাভাবিক জীবনের আনন্দ পুনরুদ্ধার।"
    },
    category: {
      en: "Individual Support",
      bn: "ব্যক্তিগত মানসিক সেবা"
    },
    shortDescription: {
      en: "Compassionate, evidence-based psychological support to navigate persistent low mood, loss of interest, and emotional exhaustion.",
      bn: "দীর্ঘস্থায়ী মনখারাপ, আগ্রহহীনতা, মানসিক ক্লান্তি ও হতাশাজনক পরিস্থিতি কাটিয়ে উঠতে প্রমাণভিত্তিক মনোবৈজ্ঞানিক সহায়তা।"
    },
    description: {
      en: "A structured, empathetic therapeutic pathway designed to help you understand depressive triggers, reframe self-critical loops, and reactivate meaningful life habits.",
      bn: "একটি সহানুভূতিশীল থেরাপিউটিক ব্যবস্থা, যা বিষণ্নতার গভীর কারণ শনাক্ত করে আত্ম-সমালোচনা দূর করতে এবং জীবনে নতুন অর্থ খুঁজে পেতে সহায়তা করে।"
    },
    details: {
      en: [
        "Behavioral activation to rebuild small, sustainable daily routines",
        "Compassionate cognitive reframing of internalized guilt and hopelessness",
        "Safe clinical dialogue with absolute confidentiality and zero moral judgment"
      ],
      bn: [
        "ধাপে ধাপে দৈনন্দিন কাজ ও আগ্রহ পুনরুদ্ধারের আচরণগত পদ্ধতি",
        "হতাশা ও আত্ম-দোষারোপ থেকে নিজেকে মুক্ত করার বিজ্ঞানসম্মত প্রক্রিয়া",
        "কোনোরূপ বিচারহীন, অত্যন্ত নিরাপদ পরিবেশে খোলামেলা আলোচনা"
      ]
    },
    whoIsItFor: {
      en: [
        "People struggling to get out of bed, focus at work, or enjoy hobbies",
        "Those feeling overwhelmed by emotional numbness or persistent sadness",
        "Individuals navigating major life disappointment or postpartum mood shifts"
      ],
      bn: [
        "যাঁরা কাজে মনোযোগ দিতে পারছেন না বা কোনো কিছুতেই আনন্দ পাচ্ছেন না",
        "দীর্ঘদিন ধরে মানসিক শূন্যতা বা অসহায়ত্বে আক্রান্ত ব্যক্তিবর্গ",
        "জীবনের বড় কোনো ক্ষতি বা হতাশার মুখোমুখি হওয়া যে কেউ"
      ]
    },
    therapeuticApproach: {
      en: "Cognitive Behavioral Therapy (CBT), Behavioral Activation, and Compassion-Focused Therapy.",
      bn: "কগনিটিভ বিহেভিওরাল থেরাপি (CBT), আচরণগত সক্রিয়করণ ও সহমর্মিতাভিত্তিক থেরাপি।"
    },
    image: "/images/services/depression.jpg"
  },
  {
    id: "cbt",
    categoryId: "individual",
    metaphorType: "cbt",
    title: {
      en: "Cognitive Behavioral Therapy (CBT)",
      bn: "কগনিটিভ বিহেভিওরাল থেরাপি (CBT)"
    },
    oneLiner: {
      en: "Identify automatic negative thoughts and transform destructive emotion-behavior loops.",
      bn: "নেতিবাচক চিন্তার প্যাটার্ন ভেঙে ইতিবাচক আচরণ ও গঠনমূলক দৃষ্টিভঙ্গি গড়ে তোলার বিজ্ঞান।"
    },
    category: {
      en: "Individual Support",
      bn: "ব্যক্তিগত মানসিক সেবা"
    },
    shortDescription: {
      en: "A structured, goal-oriented psychological method helping clients identify and reframe unhelpful thought patterns and maladaptive behaviors.",
      bn: "একটি সুবিন্যস্ত লক্ষ্যভিত্তিক থেরাপি, যা মনস্তাত্ত্বিক ভুল ধারণা ও অবাস্তব চিন্তা চিহ্নিত করে ইতিবাচক আচরণ গড়ে তোলে।"
    },
    description: {
      en: "CBT focuses on the direct interplay between your Thoughts, Emotions, and Behaviors. By learning to recognize distorted thinking habits, you develop lifelong mental resilience.",
      bn: "সিবিটি চিন্তা, অনুভূতি ও আচরণের মধ্যকার চক্রাকার সম্পর্ক বিশ্লেষণ করে অবাস্তব বিশ্বাস পরিবর্তন করতে সাহায্য করে।"
    },
    details: {
      en: [
        "Systematic mapping of automatic negative thought (ANT) triggers",
        "Empirical reality testing through targeted behavioral experiments",
        "Practical self-monitoring tools for long-term psychological independence"
      ],
      bn: [
        "স্বয়ংক্রিয় নেতিবাচক চিন্তার বিন্যাস শনাক্তকরণ ও বিশ্লেষণ",
        "বাস্তবধর্মী পরীক্ষা-নিরীক্ষার মাধ্যমে আচরণগত পরিবর্তন সাধন",
        "ভবিষ্যতে মানসিক চ্যালেঞ্জ মোকাবিলার দীর্ঘমেয়াদি স্বাবলম্বিতা"
      ]
    },
    whoIsItFor: {
      en: [
        "Individuals seeking practical, action-oriented mental health solutions",
        "Those trapped in catastrophic 'all-or-nothing' cognitive traps",
        "Professionals facing intense impostor syndrome or workplace perfectionism"
      ],
      bn: [
        "যাঁরা সুনির্দিষ্ট ও ব্যবহারিক অনুশীলনের মাধ্যমে মানসিক স্বস্তি চান",
        "সবকিছুকে চরম ইতিবাচক বা নেতিবাচক হিসেবে দেখার প্রবণতায় ভোগা ব্যক্তিরা",
        "কর্মক্ষেত্রে তীব্র আত্মবিশ্বাসহীনতা বা পারফেকশনিজমে আক্রান্তরা"
      ]
    },
    therapeuticApproach: {
      en: "Beckian Cognitive Behavioral Therapy with structured worksheets and reality testing.",
      bn: "বেকের সুবিন্যস্ত সিবিটি কাঠামো, ওয়ার্কশিট ও বাস্তববাদী নিরীক্ষণ।"
    },
    image: "/images/services/depression.jpg"
  },
  {
    id: "person-centered",
    categoryId: "individual",
    metaphorType: "person-centered",
    title: {
      en: "Person-Centered Psychotherapy",
      bn: "পার্সন-সেন্টার্ড থেরাপি"
    },
    oneLiner: {
      en: "Experience unconditional empathy and authentic presence to rediscover self-worth.",
      bn: "নিঃশর্ত শ্রদ্ধা ও গভীর সহমর্মিতার আশ্রয়ে নিজের আত্মমূল্য ও স্বাভাবিক সম্ভাবনার বিকাশ।"
    },
    category: {
      en: "Individual Support",
      bn: "ব্যক্তিগত মানসিক সেবা"
    },
    shortDescription: {
      en: "Grounding therapy in unconditional positive regard, deep empathy, and absolute congruence to nurture organic self-discovery.",
      bn: "নিঃশর্ত সম্মান, গভীর সহানুভূতি ও আন্তরিকতার মাধ্যমে ব্যক্তির নিজস্ব উপলব্ধি ও আত্মবিশ্বাসের প্রাকৃতিক বিকাশ।"
    },
    description: {
      en: "Founded on the Carl Rogers humanistic model, this therapy provides a sacred, non-directive container where your genuine feelings are fully validated and allowed to heal organically.",
      bn: "কার্ল রজার্সীয় মানবিক থেরাপির মাধ্যমে কোনো পরামর্শ চাপিয়ে না দিয়ে ব্যক্তির ভেতরের স্বাভাবিক শক্তিকে জাগ্রত করা হয়।"
    },
    details: {
      en: [
        "Unconditional positive regard without judgment or moral scrutiny",
        "Deep empathic listening that mirrors your unexpressed inner truths",
        "Strengthening personal agency, internal boundaries, and self-compassion"
      ],
      bn: [
        "কোনোরূপ শর্ত বা সমালোচনা ছাড়া পূর্ণ সম্মান প্রদর্শন",
        "অনুভূতিগুলোর গভীর প্রতিফলন যা ভেতরের সত্যকে স্পষ্ট করে",
        "নিজের প্রতি সহানুভূতি ও অভ্যন্তরীণ মানসিক শক্তি বৃদ্ধি"
      ]
    },
    whoIsItFor: {
      en: [
        "Individuals who feel constantly judged, misunderstood, or unseen",
        "People struggling with deep shame, self-criticism, or guilt",
        "Anyone desiring an open, authentic human dialogue rather than rigid clinical advice"
      ],
      bn: [
        "যাঁরা সব সময় অন্যদের দ্বারা সমালোচিত বা ভুল বোঝাবুঝির শিকার হন",
        "আত্মসম্মানহীনতা ও দীর্ঘদিনের অপরাধবোধে ভোগা মানুষ",
        "যাঁরা কৃত্রিম উপদেশের বদলে আন্তরিক মানবিক সঙ্গ ও বোঝাপড়া চান"
      ]
    },
    therapeuticApproach: {
      en: "Rogerian Humanistic & Phenomenological Psychotherapy.",
      bn: "রজার্সীয় মানবিক ও অস্তিত্বমূলক থেরাপিউটিক ফ্রেমওয়ার্ক।"
    },
    image: "/images/services/anxiety.jpg"
  },
  {
    id: "existential-therapy",
    categoryId: "individual",
    metaphorType: "existential",
    title: {
      en: "Existential Psychotherapy",
      bn: "এক্সিস্টেন্সিয়াল থেরাপি"
    },
    oneLiner: {
      en: "Confront life meaning, isolation, major transitions, and personal freedom with courage.",
      bn: "জীবনের অর্থহীনতা, একাকীত্ব ও জীবনের বড় বাঁকগুলোতে সঠিক দিকনির্দেশনা অন্বেষণ।"
    },
    category: {
      en: "Individual Support",
      bn: "ব্যক্তিগত মানসিক সেবা"
    },
    shortDescription: {
      en: "Exploring profound human questions regarding life meaning, personal freedom, isolation, identity crises, and pivotal life transitions.",
      bn: "জীবনের অর্থ, ব্যক্তিগত স্বাধীনতা, একাকীত্ব ও পরিচয় সংকট সংক্রান্ত গভীর দার্শনিক ও মনস্তাত্ত্বিক প্রশ্নের সমাধান।"
    },
    description: {
      en: "A philosophical and psychological modality addressing the core conditions of existence: finding purpose, accepting responsibility, navigating mortality, and choosing personal truth.",
      bn: "জীবনের অর্থ, স্বাধীনতা, একাকীত্ব ও অস্তিত্বমূলক সংকট কাটিয়ে ওঠার গভীর মনস্তাত্ত্বিক অনুসন্ধান।"
    },
    details: {
      en: [
        "Navigating mid-career crises, retirement, and major existential crossroads",
        "Transforming isolation into authentic connection and self-reliance",
        "Cultivating purposeful agency aligned with your authentic values"
      ],
      bn: [
        "ক্যারিয়ার সংকট, জীবনের মধ্যবয়সী রূপান্তর বা বড় পরিবর্তনের দ্বন্দ্ব নিরসন",
        "একাকীত্বকে ইতিবাচক আত্মনির্ভরশীলতায় রূপান্তর",
        "নিজের মূল্যবোধের সাথে সংগতি রেখে জীবনের নতুন লক্ষ্য নির্ধারণ"
      ]
    },
    whoIsItFor: {
      en: [
        "Professionals asking 'What is the true purpose of my work and life?'",
        "Those going through painful aging, loss of status, or spiritual disorientation",
        "Individuals wanting to make conscious, courageous personal choices"
      ],
      bn: [
        "যাঁরা জীবনের আসল উদ্দেশ্য ও অর্থ খুঁজে পেতে দ্বিধাদ্বন্দ্বে রয়েছেন",
        "জীবনের বড় ধরনের বিচ্ছেদ, ক্ষতি বা পদমর্যাদার পরিবর্তনের মুখোমুখি ব্যক্তিরা",
        "সাহসের সাথে নিজের জীবনের দায়িত্ব নিতে ইচ্ছুক যেকোনো ব্যক্তি"
      ]
    },
    therapeuticApproach: {
      en: "Existential-Integrative Therapy (Frankl, Yalom, and May traditions).",
      bn: "ভিক্টর ফ্রাঙ্কল ও ইরভিন ইয়ালোমের অস্তিত্বমূলক মনস্তাত্ত্বিক পদ্ধতি।"
    },
    image: "/images/services/trauma.jpg"
  },

  /* ========================================================= */
  /* CATEGORY 2: RELATIONSHIP & FAMILY                         */
  /* ========================================================= */
  {
    id: "couple-relationship-family",
    categoryId: "relationship",
    metaphorType: "relationships",
    title: {
      en: "Couple & Marital Therapy",
      bn: "দাম্পত্য ও যুগল থেরাপি"
    },
    oneLiner: {
      en: "Break repetitive conflict cycles, rebuild damaged trust, and restore intimate communication.",
      bn: "পারস্পরিক ভুল বোঝাবুঝি দূরীকরণ, বিশ্বাস পুনরুদ্ধার ও দাম্পত্য অন্তরঙ্গতা পুনর্গঠন।"
    },
    category: {
      en: "Relationship & Family",
      bn: "দাম্পত্য ও পারিবারিক সেবা"
    },
    shortDescription: {
      en: "Facilitating constructive dialogue, resolving deep-seated interpersonal conflict, restoring trust, and rebuilding emotional intimacy.",
      bn: "দাম্পত্য কলহ দূরীকরণ, পারিবারিক সংবেদনশীলতা বৃদ্ধি এবং পারস্পরিক বোঝাপড়া ও সুস্থ যোগাযোগের পুনর্গঠন।"
    },
    description: {
      en: "When communication deteriorates into defensiveness or silence, couple therapy creates a neutral, structured space where both partners are heard with equal dignity and mutual understanding.",
      bn: "যখন দূরত্ব ও অভিযোগ সম্পর্কের স্বাভাবিক আনন্দ নষ্ট করে, তখন একটি নিরপেক্ষ ও নিরাপদ পরিবেশে পরস্পরের প্রতি শ্রদ্ধা ও অনুভূতির পুনর্জাগরণ ঘটানো হয়।"
    },
    details: {
      en: [
        "De-escalating toxic arguing loops and passive-aggressive silences",
        "Repairing trust after infidelity, financial secrecy, or emotional detachment",
        "Establishing healthy relational boundaries and empathic active listening"
      ],
      bn: [
        "তিক্ত ঝগড়া ও ক্ষতিকর নীরবতার ক্ষতিকর চক্র ভেঙে ফেলা",
        "বিশ্বাসভঙ্গ বা দূরত্ব তৈরির পর পুনরায় শ্রদ্ধাপূর্ণ সম্পর্ক গঠন",
        "পরস্পরের প্রতি সুস্পষ্ট সীমানা ও সহমর্মিতাপূর্ণ যোগাযোগের অভ্যাস"
      ]
    },
    whoIsItFor: {
      en: [
        "Couples contemplating separation or exhausted by identical weekly fights",
        "Partners seeking pre-marital counseling or major life transition alignment",
        "Spouses who feel emotionally distant like roommates rather than partners"
      ],
      bn: [
        "যেসব দম্পতি বিচ্ছেদের দ্বারপ্রান্তে বা বারবার একই বিষয়ে তর্কে ক্লান্ত",
        "বিয়ের আগে মানসিক মিল ও বোঝাপড়া ঝালিয়ে নিতে চাওয়া যুগলরা",
        "যাঁরা এক ছাদের নিচে থেকেও মানসিকভাবে বিচ্ছিন্ন অনুভব করছেন"
      ]
    },
    therapeuticApproach: {
      en: "Gottman Method Relational Interventions & Emotionally Focused Therapy (EFT).",
      bn: "গটম্যান মেথড এবং ইমোশনালি ফোকাসড থেরাপি (EFT)।"
    },
    image: "/images/services/family-therapy.jpg"
  },
  {
    id: "family-systems",
    categoryId: "relationship",
    metaphorType: "family",
    title: {
      en: "Family Systems Therapy",
      bn: "পারিবারিক কাউন্সিলিং"
    },
    oneLiner: {
      en: "Harmonize multi-generational households, resolve parent-in-law tension, and heal domestic discord.",
      bn: "যৌথ পরিবারের টানাপোড়েন নিরসন, বোঝাপড়া বৃদ্ধি ও সুস্থ পারিবারিক পরিবেশ তৈরি।"
    },
    category: {
      en: "Relationship & Family",
      bn: "দাম্পত্য ও পারিবারিক সেবা"
    },
    shortDescription: {
      en: "Systemic family counseling to de-escalate collective distress, establish healthy generational boundaries, and foster mutual warmth.",
      bn: "পারিবারিক টানাপোড়েন দূরীকরণ, যৌথ পরিবারের ভারসাম্য রক্ষা এবং সকল সদস্যের মতামতের মর্যাদা প্রতিষ্ঠা।"
    },
    description: {
      en: "Families are interconnected emotional ecosystems. A symptom in one member often reflects structural tension in the unit. We work with families collectively to heal systemic relational patterns.",
      bn: "পরিবার একটি অবিচ্ছেদ্য মানসিক বলয়। কোনো একজনের সমস্যা মূলত পুরো পরিবারের সম্পর্কেরই প্রতিফলন। আমরা সামগ্রিকভাবে সুস্থ আবহ ফেরাতে কাজ করি।"
    },
    details: {
      en: [
        "Unpacking complex joint family conflicts with non-judgmental neutrality",
        "Setting healthy emotional borders between spouses, in-laws, and extended family",
        "Cultivating collaborative problem-solving during divorce, illness, or loss"
      ],
      bn: [
        "যৌথ পরিবারের দ্বন্দ্বগুলোতে নিরপেক্ষ ও শ্রদ্ধাপূর্ণ সমাধান",
        "স্বামী-স্ত্রী ও আত্মীয়স্বজনের মাঝে সুস্থ মানসিক সীমারেখা তৈরি",
        "পারিবারিক যেকোনো সংকট বা বিচ্ছেদের সময় ভারসাম্যপূর্ণ সিদ্ধান্ত গ্রহণ"
      ]
    },
    whoIsItFor: {
      en: [
        "Families dealing with intense parent-child friction or in-law disagreements",
        "Households coping with chronic illness, grief, or financial restructuring",
        "Parents struggling to balance extended family traditions with modern parenting"
      ],
      bn: [
        "পিতা-মাতার সাথে সন্তানদের মতবিরোধ বা পারিবারিক অস্বস্তিতে থাকা পরিবার",
        "কোনো সদস্যের দীর্ঘ অসুস্থতা বা মানসিক কষ্টে ব্যাহত পরিবারের শান্তি",
        "পারিবারিক অনুশাসন ও আধুনিক জীবনযাত্রার সমন্বয়ে দ্বিধাদ্বন্দ্বে থাকা অভিভাবক"
      ]
    },
    therapeuticApproach: {
      en: "Bowenian Structural Family Systems and Systemic Communication Models.",
      bn: "বোয়েনিয়ান স্ট্রাকচারাল ফ্যামিলি সিস্টেম ও পদ্ধতিগত যোগাযোগ মডেল।"
    },
    image: "/images/services/family-therapy.jpg"
  },
  {
    id: "transactional-analysis",
    categoryId: "relationship",
    metaphorType: "transactional-analysis",
    title: {
      en: "Transactional Analysis (TA)",
      bn: "ট্রানজ্যাকশনাল অ্যানালাইসিস (TA)"
    },
    oneLiner: {
      en: "Map Parent, Adult, and Child ego states to dismantle unconscious interpersonal scripts.",
      bn: "প্যারেন্ট, অ্যাডাল্ট ও চাইল্ড ইগো স্টেট মূল্যায়নের মাধ্যমে সম্পর্কের জটিলতা সমাধান।"
    },
    category: {
      en: "Relationship & Family",
      bn: "দাম্পত্য ও পারিবারিক সেবা"
    },
    shortDescription: {
      en: "Analyzing ego states (Parent, Adult, Child) to understand interpersonal transactions, repetitive relational scripts, and unconscious life patterns.",
      bn: "প্যারেন্ট, অ্যাডাল্ট ও চাইল্ড ইগো স্টেট মূল্যায়নের মাধ্যমে সামাজিক মিথস্ক্রিয়া ও ব্যক্তিগত সম্পর্কের জটিলতা বিশ্লেষণ।"
    },
    description: {
      en: "TA provides a lucid framework to recognize when you are operating from critical parental conditioning or emotional child reactions, empowering you to respond with mature Adult clarity.",
      bn: "টিএ থেরাপি আপনাকে বুঝতে সাহায্য করে কখন আপনি সমালোচনামূলক অনুশাসন বা অবাধ্য অনুভূতির শিকার হচ্ছেন, এবং কীভাবে পরিণত অ্যাডাল্ট স্টেটে কথা বলতে হয়।"
    },
    details: {
      en: [
        "Deciphering repetitive psychological 'games' that trigger domestic arguments",
        "Shifting from critical Parent or rebellious Child into balanced Adult responses",
        "Rewriting childhood life scripts that dictate self-sabotaging adult relationships"
      ],
      bn: [
        "সম্পর্কের পুনরাবৃত্তিমূলক ভুল বোঝাবুঝি ও মানসিক ফাঁদ চিহ্নিত করা",
        "ক্ষোভ ও জেদের বদলে পরিণত, শান্ত ও ভারসাম্যপূর্ণ সিদ্ধান্তের বিকাশ",
        "শৈশবের অপ্রয়োজনীয় সংস্কার ও বিশ্বাস থেকে নিজেকে মুক্ত করা"
      ]
    },
    whoIsItFor: {
      en: [
        "Individuals who notice they always recreate identical conflict in romantic relationships",
        "Colleagues and partners trapped in power struggles and defensive games",
        "Anyone wishing to master mature, non-reactive emotional communication"
      ],
      bn: [
        "যাঁরা লক্ষ্য করেন প্রতিটি সম্পর্কেই তাঁরা একই ধরনের জটিলতায় জড়িয়ে পড়েন",
        "কর্মক্ষেত্রে বা পরিবারে ক্ষমতা ও কর্তৃত্বের দ্বন্দ্বে জর্জরিত মানুষ",
        "যাঁরা উত্তেজিত না হয়ে পরিপক্বভাবে যোগাযোগ করতে চান"
      ]
    },
    therapeuticApproach: {
      en: "Eric Berne's Ego-State Transactional Analysis & Script Analysis.",
      bn: "এরিক বার্নের ক্লাসিক্যাল ট্রানজ্যাকশনাল অ্যানালাইসিস ও স্ক্রিপ্ট বিশ্লেষণ।"
    },
    image: "/images/services/family-therapy.jpg"
  },

  /* ========================================================= */
  /* CATEGORY 3: CHILD & DEVELOPMENT                           */
  /* ========================================================= */
  {
    id: "child-development-behavior",
    categoryId: "child",
    metaphorType: "child",
    title: {
      en: "Child Development & Behavior",
      bn: "শিশুর বিকাশ ও আচরণগত সহায়তা"
    },
    oneLiner: {
      en: "Address attention delays, sensory sensitivities, and emotional outbursts with gentle guidance.",
      bn: "শিশুর মনঃসংযোগের ঘাটতি, অতিরিক্ত রাগ ও সঠিক বিকাশের লক্ষ্যভিত্তিক সাইকোথেরাপি।"
    },
    category: {
      en: "Child & Development",
      bn: "শিশু ও বিকাশমূলক সেবা"
    },
    shortDescription: {
      en: "Comprehensive developmental screening and behavioral scaffolding for children facing hyperactivity, sensory challenges, or emotional dysregulation.",
      bn: "শিশুর মনোযোগের ঘাটতি, অতিচঞ্চলতা (ADHD), আবেগ প্রকাশে জটিলতা ও মানসিক বিকাশের জন্য বিশেষ কাউন্সেলিং।"
    },
    description: {
      en: "Children communicate stress through behavior. Led by child development specialists, this service equips both young minds and parents with positive reinforcement and self-regulation tools.",
      bn: "শিশুরা তাদের মানসিক চাপ কথায় নয়, আচরণে প্রকাশ করে। আমাদের বিশেষজ্ঞ দল শিশু ও মা-বাবা উভয়কেই ভালোবাসা ও কার্যকর পদ্ধতির মাধ্যমে সহায়তা করে।"
    },
    details: {
      en: [
        "Developmental milestones and sensory-motor regulation assessments",
        "Positive behavior management to replace screen obsession and aggression",
        "Empowering parent coaching tailored to positive discipline without punitive measures"
      ],
      bn: [
        "শিশুর বয়সোপযোগী বিকাশ ও সংবেদনশীলতা মূল্যায়ন",
        "মোবাইল আসক্তি, জেদ ও আক্রমণাত্মক আচরণ সংশোধনের ইতিবাচক পদ্ধতি",
        "বকাঝকা বা মারধর ছাড়া সন্তান লালন-পালনে মা-বাবার জন্য বিশেষ গাইডলাইন"
      ]
    },
    whoIsItFor: {
      en: [
        "Children exhibiting severe temper tantrums, school avoidance, or social withdrawal",
        "Parents concerned about developmental speech delay or ADHD symptoms",
        "Families navigating modern digital screen conflicts and homework resistance"
      ],
      bn: [
        "যেসব শিশু অতিরিক্ত জেদ করে, স্কুলে যেতে চায় না বা কথা কম বলে",
        "এডিএইচডি (ADHD), মনোযোগের অভাব বা চঞ্চলতা নিয়ে উদ্বিগ্ন অভিভাবক",
        "স্ক্রিন টাইম ও পড়াশোনার চাপ সামলাতে হিমশিম খাওয়া পরিবার"
      ]
    },
    therapeuticApproach: {
      en: "Developmental Behavioral Intervention and Collaborative Parent Coaching.",
      bn: "ডেভেলপমেন্টাল বিহেভিওরাল ইন্টারভেনশন ও প্যারেন্টিং কোচিং।"
    },
    image: "/images/services/family-therapy.jpg"
  },
  {
    id: "art-play-therapy",
    categoryId: "child",
    metaphorType: "art-therapy",
    title: {
      en: "Art Therapy & Expressive Play",
      bn: "আর্ট ও প্লে থেরাপি"
    },
    oneLiner: {
      en: "Unlock non-verbal emotional expression through creative art, sensory color, and guided play.",
      bn: "রং, তুলি ও খেলার মাধ্যমে শিশুর অবদমিত অনুভূতির নিরাপদ প্রকাশ ও স্বস্তি লাভ।"
    },
    category: {
      en: "Child & Development",
      bn: "শিশু ও বিকাশমূলক সেবা"
    },
    shortDescription: {
      en: "Facilitating emotional release, confidence, and cognitive harmony for children and adolescents through creative artistic modalities.",
      bn: "আর্ট, চিত্রাঙ্কন ও মনস্তাত্ত্বিক খেলার মাধ্যমে শিশুর ভেতরের ভয়, দ্বিধা ও আবেগের সুস্থ প্রকাশ।"
    },
    description: {
      en: "When words are not enough, creative art and therapeutic play allow children and teens to safely externalize inner fears, trauma, and unexpressed joy under certified therapist supervision.",
      bn: "যে অনুভূতি মুখে বলা যায় না, তা শিল্প ও রূপকের মাধ্যমে সহজেই ফুটে ওঠে। আমাদের আর্ট থেরাপিস্টের তত্ত্বাবধানে শিশু খুঁজে পায় আত্মবিশ্বাস।"
    },
    details: {
      en: [
        "Sensory art modalities that soothe nervous system hyper-arousal",
        "Projective play techniques to uncover hidden anxieties and school stress",
        "Building self-esteem and sensory-motor fine coordination through creativity"
      ],
      bn: [
        "রং ও ক্যানভাসের মাধ্যমে শিশুর স্নায়বিক উত্তেজনা প্রশমন",
        "রূপকভিত্তিক খেলার মাধ্যমে স্কুলের ভয় ও মানসিক চাপ নিরসন",
        "সৃজনশীল কাজের মাধ্যমে শিশুর আত্মবিশ্বাস ও সামাজিক দক্ষতা বৃদ্ধি"
      ]
    },
    whoIsItFor: {
      en: [
        "Quiet, introverted children who find it difficult to speak about their feelings",
        "Children who have experienced family separation, bullying, or illness",
        "Youth needing an expressive, non-clinical creative outlet for their anxiety"
      ],
      bn: [
        "কম কথা বলা বা নিজের অনুভূতি প্রকাশে লাজুক শিশুরা",
        "পারিবারিক বিচ্ছেদ, বুলিং বা আঘাতের শিকার হওয়া কোমলমতি শিশু",
        "যাঁরা শিশুর জন্য একটি আনন্দদায়ক ও সৃজনশীল থেরাপি খুঁজছেন"
      ]
    },
    therapeuticApproach: {
      en: "Certified Art Therapy Protocols and Directive/Non-Directive Therapeutic Play.",
      bn: "সার্টিফায়েড আর্ট থেরাপি ও নির্দেশিত/অ-নির্দেশিত প্লে থেরাপি।"
    },
    image: "/images/services/family-therapy.jpg"
  },
  {
    id: "adolescent-youth-guidance",
    categoryId: "child",
    metaphorType: "existential",
    title: {
      en: "Adolescent & Youth Counseling",
      bn: "কৈশোর ও তরুণ পরামর্শ সেবা"
    },
    oneLiner: {
      en: "Confidential guidance through academic burnout, peer identity crises, and emotional storms.",
      bn: "পড়াশোনার চাপ, ক্যারিয়ার নিয়ে বিভ্রান্তি ও বয়ঃসন্ধিকালীন মানসিক টানাপোড়েনের সমাধান।"
    },
    category: {
      en: "Child & Development",
      bn: "শিশু ও বিকাশমূলক সেবা"
    },
    shortDescription: {
      en: "Confidential, respectful guidance for teenagers navigating academic pressures, emotional sensitivity, and self-identity formation.",
      bn: "বয়ঃসন্ধিকালীন শারীরিক ও মানসিক পরিবর্তন, ক্যারিয়ার উদ্বেগ ও আত্মপরিচয়ের সংকট নিরসনে তরুণদের সহায়তা।"
    },
    description: {
      en: "Adolescence is a critical developmental bridge. Our youth counselors speak the language of modern adolescents without condescension, cultivating resilient coping strategies for the future.",
      bn: "বয়ঃসন্ধিকাল হলো জীবনের অত্যন্ত সংবেদনশীল সময়। কিশোর-কিশোরীদের কোনো উপদেশ না চাপিয়ে তাদের বন্ধু হিসেবে পাশে থেকে সঠিক দিকনির্দেশনা দেওয়া হয়।"
    },
    details: {
      en: [
        "Stress reduction for intense O/A-level and university admission hurdles",
        "Navigating peer dynamics, social media addiction, and cyber pressure",
        "Safe exploration of self-identity, bodily changes, and emotional mood swings"
      ],
      bn: [
        "বোর্ড পরীক্ষা ও বিশ্ববিদ্যালয় ভর্তি পরীক্ষার তীব্র মানসিক চাপ নিয়ন্ত্রণ",
        "সোশ্যাল মিডিয়া আসক্তি, সহপাঠীদের তুলনা ও বুলিং মোকাবিলার শক্তি",
        "বয়ঃসন্ধির আবেগ ও আত্মপরিচয় বিষয়ক খোলামেলা আলোচনা"
      ]
    },
    whoIsItFor: {
      en: [
        "Teenagers experiencing severe academic anxiety or lack of direction",
        "Youth exhibiting extreme withdrawal or alienation from parents",
        "Adolescents navigating friendship ruptures, body image issues, or self-doubt"
      ],
      bn: [
        "পড়াশোনায় অতিরিক্ত উদ্বেগে ভোগা বা ভবিষ্যৎ নিয়ে দিশেহারা কিশোর-কিশোরী",
        "অভিভাবকদের সাথে দূরত্ব তৈরি হওয়া বা একাকীত্বে ভোগা তরুণরা",
        "শারীরিক রূপ বা বন্ধুদের মন্তব্যে আত্মবিশ্বাস হারিয়ে ফেলা শিক্ষার্থীরা"
      ]
    },
    therapeuticApproach: {
      en: "Solution-Focused Youth Counseling & Emotion Regulation Therapy.",
      bn: "সলিউশন-ফোকাসড ইয়ুথ কাউন্সেলিং ও আবেগ নিয়ন্ত্রণ থেরাপি।"
    },
    image: "/images/services/anxiety.jpg"
  },

  /* ========================================================= */
  /* CATEGORY 4: SPECIALIZED SUPPORT                           */
  /* ========================================================= */
  {
    id: "trauma-stress",
    categoryId: "specialized",
    metaphorType: "trauma",
    title: {
      en: "Trauma Recovery & PTSD",
      bn: "ট্রমা রিকভারি ও পিটিএসডি"
    },
    oneLiner: {
      en: "Paced, trauma-informed care to process distressing memories and restore nervous system safety.",
      bn: "বিগত জীবনের গভীর মানসিক আঘাত, ট্রমা ও শোক কাটিয়ে অন্তরে নিরাপত্তা ফিরিয়ে আনা।"
    },
    category: {
      en: "Specialized Support",
      bn: "বিশেষায়িত ক্লিনিক্যাল সেবা"
    },
    shortDescription: {
      en: "Carefully paced, trauma-informed counseling to process distressing past events, post-traumatic stress, and chronic burnout.",
      bn: "বিগত জীবনের কোনো গভীর মানসিক আঘাত, ট্রমা, শোক এবং দীর্ঘমেয়াদি তীব্র মানসিক চাপ প্রশমনে বিশেষ কাউন্সেলিং।"
    },
    description: {
      en: "Trauma changes how the brain perceives safety. We use phased, gentle somatic and cognitive methods to uncouple traumatic memories from overwhelming bodily alarm reactions.",
      bn: "ট্রমা মানুষের নিরাপত্তা ও বিশ্বাসের অনুভূতিকে ক্ষতিগ্রস্ত করে। আমরা ধাপে ধাপে রোগীর নিজস্ব গতিতে অতীতের আঘাত থেকে মুক্তি নিশ্চিত করি।"
    },
    details: {
      en: [
        "Phased trauma stability and bodily grounding before processing memories",
        "Relief from chronic hyper-vigilance, nightmares, and triggering flashbacks",
        "Restoring deep self-trust, emotional safety, and healthy boundaries"
      ],
      bn: [
        "শারীরিক ও মানসিক নিরাপত্তা নিশ্চিত করে অতীতের স্মৃতি প্রক্রিয়াকরণ",
        "দুঃস্বপ্ন, আকস্মিক আতঙ্ক ও অতিরিক্ত সতর্কতার অবসাদ থেকে মুক্তি",
        "নিজের প্রতি আস্থা ও জীবনের প্রতি ইতিবাচক দৃষ্টিভঙ্গি পুনরুদ্ধার"
      ]
    },
    whoIsItFor: {
      en: [
        "Survivors of physical accidents, domestic abuse, or sudden loss",
        "People haunted by memories of childhood neglect or medical trauma",
        "First responders, healthcare professionals, or caregivers facing severe secondary trauma"
      ],
      bn: [
        "দুর্ঘটনা, পারিবারিক নির্যাতন বা আকস্মিক শোকের শিকার ব্যক্তিবর্গ",
        "শৈশবের অবহেলা বা পুরোনো তিক্ত স্মৃতিতে প্রতিনিয়ত কষ্ট পাওয়া মানুষ",
        "পেশাগত দায়িত্ব পালনে অতিরিক্ত মানসিক চাপের মুখোমুখি ব্যক্তিরা"
      ]
    },
    therapeuticApproach: {
      en: "Trauma-Informed Cognitive Processing Therapy (CPT) and Somatic Grounding.",
      bn: "ট্রমা-ইনফর্মড কগনিটিভ প্রসেসিং থেরাপি (CPT) ও সোমাটিক গ্রাউন্ডিং।"
    },
    image: "/images/services/trauma.jpg"
  },
  {
    id: "addiction-recovery",
    categoryId: "specialized",
    metaphorType: "addiction",
    title: {
      en: "Addiction & Relapse Support",
      bn: "অ্যাডিকশন ও আসক্তি মুক্তি সহায়তা"
    },
    oneLiner: {
      en: "Evidence-based relapse prevention and behavioral restructuring to reclaim personal freedom.",
      bn: "মাদক বা ক্ষতিকর অভ্যাসের মোহ থেকে মুক্তি এবং সুস্থ পুনর্বাসনের মনস্তাত্ত্বিক সহায়তা।"
    },
    category: {
      en: "Specialized Support",
      bn: "বিশেষায়িত ক্লিনিক্যাল সেবা"
    },
    shortDescription: {
      en: "Compassionate behavioral addiction and substance counseling focused on craving management, trigger identification, and durable relapse prevention.",
      bn: "মাদক, ধূমপান, গেমিং বা অনিয়ন্ত্রিত অভ্যাসের আসক্তি কাটিয়ে সুস্থ ও কর্মক্ষম জীবনে প্রত্যাবর্তনের সমন্বিত চিকিৎসা।"
    },
    description: {
      en: "Led by certified addiction professionals, this service focuses on addressing the emotional void beneath the craving while building concrete behavioral guardrails to prevent relapse.",
      bn: "আমাদের সার্টিফায়েড অ্যাডিকশন প্রফেশনালদের নেতৃত্বে আসক্তির পেছনের মানসিক কারণ দূর করা হয় এবং সুস্থ জীবনের অভ্যাস গড়ে তোলা হয়।"
    },
    details: {
      en: [
        "Comprehensive mapping of high-risk craving triggers and social vulnerabilities",
        "Motivational Interviewing (MI) to build unshakeable commitment to sobriety",
        "Constructive lifestyle redesign to replace compulsive habits with healthy joy"
      ],
      bn: [
        "আসক্তির ঝুঁকিপূর্ণ মুহূর্ত ও প্রলোভন চিহ্নিত করার বিজ্ঞানসম্মত কৌশল",
        "মোটিভেশনাল ইন্টারভিউয়িং-এর মাধ্যমে আত্মবিশ্বাস ও সংকল্প সুদৃঢ় করা",
        "ক্ষতিকর অভ্যাস ত্যাগ করে স্বাস্থ্যকর ও আনন্দময় জীবনধারা প্রতিষ্ঠা"
      ]
    },
    whoIsItFor: {
      en: [
        "Individuals battling substance reliance or prescription medicine misuse",
        "Those trapped in behavioral addictions (excessive gaming, pornography, compulsive spending)",
        "Families seeking professional intervention and relapse-prevention protocols"
      ],
      bn: [
        "মাদকাসক্তি বা অতিরিক্ত ওষুধ ব্যবহারের ওপর নির্ভরশীল ব্যক্তিরা",
        "গেমিং, পর্নোগ্রাফি বা অনিয়ন্ত্রিত অভ্যাসের ফাঁদে আটকে পড়া তরুণরা",
        "আসক্তি থেকে প্রিয়জনকে বাঁচাতে আন্তরিক ও পেশাদার সহায়তা প্রত্যাশী পরিবার"
      ]
    },
    therapeuticApproach: {
      en: "Motivational Interviewing (MI), Relapse Prevention Therapy (RPT), and CBT for Addiction.",
      bn: "মোটিভেশনাল ইন্টারভিউয়িং (MI), রিল্যাপস প্রিভেনশন থেরাপি (RPT) ও সিবিটি।"
    },
    image: "/images/services/anxiety.jpg"
  },
  {
    id: "forensic-psychotherapy",
    categoryId: "specialized",
    metaphorType: "forensic",
    title: {
      en: "Forensic & Ethical Evaluation",
      bn: "ফরেনসিক ও আইনি মানসিক মূল্যায়ন"
    },
    oneLiner: {
      en: "Specialized clinical assessments and psychological rehabilitation within strict ethical standards.",
      bn: "আইনি ও আচরণগত জটিলতায় দায়িত্বশীল, নৈতিক কাঠামোর অধীনে বিশেষায়িত মূল্যায়ন।"
    },
    category: {
      en: "Specialized Support",
      bn: "বিশেষায়িত ক্লিনিক্যাল সেবা"
    },
    shortDescription: {
      en: "Specialized clinical evaluation and therapy addressing legal, behavioral, and psychological rehabilitation within a strictly ethical framework.",
      bn: "আইনি, আচরণগত ও মানসিক পুনর্বাসনের সমন্বয়ে অত্যন্ত দায়িত্বশীল ও নৈতিক কাঠামোর অধীনে বিশেষায়িত ক্লিনিক্যাল থেরাপি।"
    },
    description: {
      en: "Conducted by qualified clinical specialists with legal and forensic expertise, offering objective mental competency assessment, behavioral risk insight, and ethical rehabilitation.",
      bn: "আইন ও মনস্তত্ত্বের সমন্বয়ে যোগ্য বিশেষজ্ঞদের দ্বারা পরিচালিত নিরপেক্ষ মানসিক সক্ষমতা ও আচরণগত ঝুঁকি মূল্যায়ন।"
    },
    details: {
      en: [
        "Ethical psychological assessments for family law and civil proceedings",
        "Behavioral rehabilitation counseling for complex legal distress",
        "Interdisciplinary coordination upholding strict confidentiality and clinical ethics"
      ],
      bn: [
        "পারিবারিক আইন বা সামাজিক কার্যক্রমে নৈতিক মনস্তাত্ত্বিক মূল্যায়ন",
        "জটিল আইনি মানসিক চাপে থাকা ব্যক্তিদের আচরণগত পুনর্বাসন",
        "গোপনীয়তা ও ক্লিনিক্যাল নীতিমালার পূর্ণ সুরক্ষা নিশ্চিতকরণ"
      ]
    },
    whoIsItFor: {
      en: [
        "Individuals navigating contentious divorce or child custody psychological evaluations",
        "Clients experiencing acute psychological distress surrounding legal proceedings",
        "Institutions requiring objective, evidence-based behavioral consultations"
      ],
      bn: [
        "পারিবারিক বিচ্ছেদ বা সন্তানের অভিভাবকত্ব সংক্রান্ত মামলায় মানসিক মূল্যায়নের প্রয়োজন যাঁদের",
        "আইনি প্রক্রিয়ায় তীব্র মানসিক উদ্বেগে ভোগা ব্যক্তিরা",
        "নিরপেক্ষ ও তথ্যভিত্তিক আচরণগত বিশেষজ্ঞ মতামত প্রত্যাশী প্রতিষ্ঠানসমূহ"
      ]
    },
    therapeuticApproach: {
      en: "Forensic Psychological Assessment Protocols & Ethics-Centered Psychotherapy.",
      bn: "ফরেনসিক সাইকোলজিক্যাল অ্যাসেসমেন্ট প্রটোকল ও এথিক্স-সেন্টার্ড থেরাপি।"
    },
    image: "/images/services/depression.jpg"
  }
];
