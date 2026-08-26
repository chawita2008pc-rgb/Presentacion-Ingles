export interface LookbookItem {
    id: string;
    title: string;
    category: 'menswear' | 'womenswear' | 'unisex';
    genderLabel: string;
    image: string;
    designer: string;
    concept: string;
    palette: string[];
    tags: string[];
    statement: string;
}

export interface FashionFact {
    id: string;
    stat: string;
    title: string;
    detail: string;
    emoji: string;
}

export interface TrendItem {
    city: string;
    title: string;
    focus: string;
    description: string;
    image: string;
    trendVibe: string;
}

export interface ManifestoPrinciple {
    number: string;
    title: string;
    subtitle: string;
    description: string;
}

export const REAL_FASHION_FACTS: FashionFact[] = [
    {
        id: "fact-1",
        stat: "85%",
        emoji: "⚡",
        title: "Urban Streetwear Dominance",
        detail: "Over 85% of teens prioritize oversized streetwear, relaxed denim, and comfortable layers for their daily outfits."
    },
    {
        id: "fact-2",
        stat: "78%",
        emoji: "🛍️",
        title: "Thrift & Vintage Culture",
        detail: "78% of young fashion enthusiasts mix independent local label pieces with unique vintage thrift finds."
    },
    {
        id: "fact-3",
        stat: "93%",
        emoji: "✨",
        title: "Non-Verbal Impression",
        detail: "93% of first impressions are formed non-verbally. Your silhouette and outfit choices communicate your energy instantly."
    },
    {
        id: "fact-4",
        stat: "100%",
        emoji: "🎶",
        title: "Music & Culture Impact",
        detail: "Urban music culture heavily inspires street style—from heavy 400+ GSM hoodies to tactical puffer jackets."
    }
];

export const MANIFESTO_PRINCIPLES: ManifestoPrinciple[] = [
    {
        number: "01",
        title: "Authentic Expression",
        subtitle: "Fashion rooted in real identity",
        description: "Modern street style rejects rigid rules. It's a natural fusion of urban trap influences, vintage layering, and personal confidence."
    },
    {
        number: "02",
        title: "Oversized Proportions",
        subtitle: "Freedom of movement and comfort",
        description: "From wide-leg denim to boxy coats, comfort and relaxed silhouettes come first. Clothes should empower your daily flow."
    },
    {
        number: "03",
        title: "Independent Labels & Vintage",
        subtitle: "Curating a unique aesthetic",
        description: "True personal style comes from pairing clean essentials from independent designers with rare thrifted gems."
    },
    {
        number: "04",
        title: "Fluid Boundaries",
        subtitle: "Unisex fashion for everyone",
        description: "Modern garments transcend traditional boundaries. Puffer jackets, cargo pants, and structured knits belong to all."
    },
    {
        number: "05",
        title: "Attitude & Presence",
        subtitle: "The silent language of style",
        description: "Your outfit is your personal signature. The way you layer your fit projects unshakeable poise in any setting."
    }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
    {
        id: "look-1",
        title: "Oversized Leather & Wide-Leg Denim",
        category: "menswear",
        genderLabel: "2026 Menswear Fit",
        image: "/images/menswear_leather.png",
        designer: "Fréres Studio",
        concept: "Boxy vintage leather jacket, heavy white crewneck, and relaxed wide-leg raw denim.",
        palette: ["#1c1917", "#44403c", "#78716c", "#e7e5e4"],
        tags: ["Oversized Leather", "Wide Leg", "Street Fit"],
        statement: "Effortless street confidence with relaxed proportions."
    },
    {
        id: "look-2",
        title: "Fluid Trench & Tailored Trousers",
        category: "womenswear",
        genderLabel: "2026 Womenswear Fit",
        image: "/images/womenswear_trench.png",
        designer: "Aura Atelier",
        concept: "Flowing beige trench coat layered over a clean crop top and relaxed wide-leg trousers.",
        palette: ["#292524", "#78716c", "#d6d3d1", "#f5f5f4"],
        tags: ["Modern Trench", "Wide Leg", "Urban Chic"],
        statement: "Casual elegance tailored for daily city life."
    },
    {
        id: "look-3",
        title: "Heavyweight Hoodie & Technical Cargos",
        category: "unisex",
        genderLabel: "2026 Unisex Streetwear",
        image: "/images/unisex_trap.png",
        designer: "Drøp Lab",
        concept: "Heavyweight dark hoodie paired with technical multi-pocket cargos and clean urban sneakers.",
        palette: ["#44403c", "#78716c", "#b91c1c", "#fef2f2"],
        tags: ["Heavy Hoodie", "Cargo Pants", "Unisex Fit"],
        statement: "The quintessential modern streetwear uniform."
    },
    {
        id: "look-4",
        title: "Cropped Puffer & Layered Denim",
        category: "menswear",
        genderLabel: "2026 Menswear Fit",
        image: "/images/menswear_puffer.png",
        designer: "Bruder Studio",
        concept: "Cropped puffer jacket worn over a layered button-down shirt and washed dark denim.",
        palette: ["#09090b", "#27272a", "#71717a", "#e4e4e7"],
        tags: ["Puffer Jacket", "Layered Fit", "Winter Style"],
        statement: "Essential cold-weather layering with clean street lines."
    },
    {
        id: "look-5",
        title: "Vibrant Vintage Knit & High-Waist Denim",
        category: "womenswear",
        genderLabel: "2026 Womenswear Fit",
        image: "/images/womenswear_vintage.png",
        designer: "Vintage Collect",
        concept: "Vibrant yellow vintage knit sweater paired with high-waisted denim and retro sunglasses.",
        palette: ["#854d0e", "#ca8a04", "#fef08a", "#18181b"],
        tags: ["Vintage Knit", "Pop Color", "Retro Vibe"],
        statement: "Thrifted character turned into an iconic statement outfit."
    },
    {
        id: "look-6",
        title: "Distressed Denim & Layered Tee",
        category: "unisex",
        genderLabel: "2026 Unisex Fit",
        image: "/images/unisex_denim.png",
        designer: "Güemes Studio",
        concept: "Distressed denim jacket layered over an oversized graphic tee and relaxed trousers.",
        palette: ["#1c1917", "#78350f", "#d97706", "#fef3c7"],
        tags: ["Distressed Denim", "Unisex Fit", "Casual Layers"],
        statement: "Relaxed urban energy crafted for everyday wear."
    },
    {
        id: "look-7",
        title: "Unstructured Camel Blazer & White Tee",
        category: "menswear",
        genderLabel: "2026 Menswear Fit",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
        designer: "Rosario Craft Co.",
        concept: "Unstructured camel blazer paired with a crisp white crewneck tee and light wash denim.",
        palette: ["#78350f", "#d97706", "#f5f5f4", "#1c1917"],
        tags: ["Street Blazer", "Smart Casual", "Clean Aesthetics"],
        statement: "Modern street tailoring for sophisticated evening outings."
    },
    {
        id: "look-8",
        title: "Low-Rise Denim & Satin Top",
        category: "womenswear",
        genderLabel: "2026 Womenswear Fit",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
        designer: "Chacarita Studio",
        concept: "Low-rise cargo denim paired with a silky satin top and metallic accessories.",
        palette: ["#1c1917", "#44403c", "#a8a29e", "#e7e5e4"],
        tags: ["Low-Rise Denim", "Satin Top", "Night Fit"],
        statement: "A sleek contrast of utilitarian denim and refined satin."
    }
];

export const GLOBAL_TRENDS: TrendItem[] = [
    {
        city: "Palermo Soho",
        title: "Oversized Leather & Wide-Leg Denim",
        focus: "Men & Women",
        description: "Boxy vintage leather jackets paired with relaxed wide-leg jeans and clean sneakers for an effortless daily look.",
        image: "/images/menswear_leather.png",
        trendVibe: "Natural confidence and clean street proportions."
    },
    {
        city: "Recoleta",
        title: "Fluid Trench Coats & Knitwear",
        focus: "Men & Women",
        description: "Lightweight trench coats and cozy knits styled over minimalist crop tops or crisp tees.",
        image: "/images/womenswear_trench.png",
        trendVibe: "Relaxed urban chic with elevated tailoring."
    },
    {
        city: "Barrio Güemes",
        title: "Technical Hoodies & Multi-Cargos",
        focus: "Unisex",
        description: "Heavy cotton hoodies combined with functional multi-pocket cargo pants and urban sneakers.",
        image: "/images/unisex_trap.png",
        trendVibe: "Streetwear utility and music-inspired style."
    },
    {
        city: "Pichincha",
        title: "Vintage Thrifting & Satins",
        focus: "Men & Women",
        description: "Unique thrifted vintage knits paired with distressed denim, satin accents, and retro frames.",
        image: "/images/womenswear_vintage.png",
        trendVibe: "Creative thrift culture expressing true personality."
    }
];
