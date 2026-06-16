import { WebsiteTheme } from "./types";

export const PRESET_THEMES: WebsiteTheme[] = [
  {
    id: "preset-saas-light",
    createdAt: new Date().toISOString(),
    brandName: "Aether AI",
    websiteType: "SaaS",
    designStyle: "Glassmorphism",
    industry: "Artificial Intelligence",
    colorScheme: "Pastel Teal & Ocean Blue",
    targetAudience: "Startups & Creatives",
    colorPalette: {
      primary: {
        hex: "#0f766e",
        name: "Deep Teal",
        description: "Primary brand identifier, used for main CTA, headers, and active indicators."
      },
      secondary: {
        hex: "#0284c7",
        name: "Ocean SkyBlue",
        description: "Secondary highlighting tone for subtitles, features, and key badges."
      },
      accent: {
        hex: "#f43f5e",
        name: "Electric Rose",
        description: "High-contrast focal color for badges, hover states, and critical actions."
      },
      background: {
        hex: "#f8fafc",
        name: "Frosted Slate White",
        description: "Ultra clean, slightly blue-tinted light background emphasizing spaciousness."
      },
      textPrimary: {
        hex: "#0f172a",
        name: "Midnight Obsidian",
        description: "High readability, comfortable dark charcoal for headings."
      },
      textSecondary: {
        hex: "#334155",
        name: "Cool Slate",
        description: "Premium readable grey for body copy and general layout items."
      },
      textMuted: {
        hex: "#64748b",
        name: "Muted Blue Slate",
        description: "Soft grey specifically used for captions, borders, and footer headers."
      }
    },
    typography: {
      headingFont: {
        name: "Outfit",
        importUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap",
        category: "sans-serif"
      },
      bodyFont: {
        name: "Inter",
        importUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
        category: "sans-serif"
      },
      pairingExplanation: "Outfit's energetic rounded geometric headings complement the high legibility and neutral tone of Inter body text, establishing a forward-looking SaaS identity."
    },
    designSystem: {
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        xl: "28px",
        full: "9999px"
      },
      shadows: {
        sm: "0 2px 4px 0 rgba(15, 23, 42, 0.03)",
        md: "0 8px 16px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)",
        lg: "0 20px 32px -8px rgba(15, 23, 42, 0.12), 0 8px 12px -4px rgba(15, 23, 42, 0.06)",
        xl: "0 32px 54px -16px rgba(15, 23, 42, 0.16), 0 16px 24px -8px rgba(15, 23, 42, 0.08)",
        inner: "inset 0 2px 4px 0 rgba(15, 23, 42, 0.06)"
      },
      spacingScale: {
        xs: "6px",
        sm: "12px",
        md: "24px",
        lg: "36px",
        xl: "48px",
        xxl: "72px"
      },
      buttonStyles: {
        primary: "background: linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%); color: #ffffff; padding: 0.75rem 1.5rem; font-weight: 600; border-radius: var(--theme-radius-md); box-shadow: var(--theme-shadow-md); transition: all 0.2s ease;",
        secondary: "background-color: rgba(255, 255, 255, 0.8); border: 1px solid rgba(15, 23, 42, 0.1); color: var(--theme-text-primary); padding: 0.75rem 1.5rem; font-weight: 600; border-radius: var(--theme-radius-md); backdrop-filter: blur(8px); transition: all 0.2s ease;",
        outline: "background-color: transparent; border: 2px solid var(--theme-primary); color: var(--theme-primary); padding: 0.75rem 1.5rem; font-weight: 600; border-radius: var(--theme-radius-md); transition: all 0.2s ease;"
      },
      cardStyles: {
        border: "1px solid rgba(255, 255, 255, 0.7)",
        background: "rgba(255, 255, 255, 0.4)",
        padding: "var(--theme-spacing-lg)",
        extraTailwindClasses: "backdrop-blur-md shadow-lg duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white transition-all"
      }
    },
    sections: {
      hero: {
        title: "Model the future of customer interaction with Aether Labs",
        subtitle: "Aether AI's generative text models build empathetic, deeply specialized customer service environments tailored specifically for creative scaling startups.",
        primaryCta: "Launch Console",
        secondaryCta: "Request Access"
      },
      features: {
        title: "Intelligent features forged for high-octane growth",
        subtitle: "We've consolidated our core generation neural architectures into a simple, responsive API.",
        items: [
          {
            title: "Autonomous Resolution",
            description: "Over 92% of general consumer tickets resolved without human intervention using contextual reinforcement learning models.",
            icon: "Shield"
          },
          {
            title: "Neural Translation",
            description: "Instantly communicate with international users across 42 different dialect clusters with real-time semantic preservation.",
            icon: "Globe"
          },
          {
            title: "Dynamic Analytics",
            description: "Map live telemetry sentiment spikes and customer friction areas before they cause checkout cart drop-offs.",
            icon: "Zap"
          }
        ]
      },
      testimonials: {
        title: "What pioneers say about Aether Workspace",
        subtitle: "Over 400 modern SaaS brands use our themes and engines to fuel their presentation tiers.",
        items: [
          {
            quote: "Aether completely automated our localized support portals. Our team focused on raw product delivery, saving us thousands in international setup overhead.",
            authorName: "Sarah Mercer",
            authorRole: "Head of Operations, FinCore Code",
            rating: 5
          },
          {
            quote: "The interface style and premium typography settings instantly felt unified. Standardizing our look took less than an afternoon of variables configuration.",
            authorName: "Alexandre Dupoint",
            authorRole: "Principal Designer, Spark Creative Studio",
            rating: 5
          }
        ]
      },
      pricing: {
        title: "Transparent models made to scale with you",
        subtitle: "No hidden network overcharges. Simple seat count and token consumption models.",
        tiers: [
          {
            name: "Hobby Developer",
            price: "$0",
            description: "Perfect for testing sandbox implementations and private wireframes.",
            features: [
              "Up to 1,000 API calls / month",
              "Access to Outfit & Inter standard fonts",
              "Standard community support channels"
            ],
            isPopular: false
          },
          {
            name: "Startup Scale",
            price: "$49",
            description: "Built for scaling commercial projects needing prioritized SLA guarantees.",
            features: [
              "Unlimited standard API calls",
              "Advanced custom CSS theme outputs",
              "Prioritized Slack developer support",
              "Dedicated regional CDN nodes"
            ],
            isPopular: true
          },
          {
            name: "Enterprise Core",
            price: "$199",
            description: "Full-scale custom fine-tuning and compliance controls for dedicated teams.",
            features: [
              "Custom domain white labeling",
              "Dedicated isolated server shards",
              "Custom SSO authorization support",
              "24/7 dedicated support phone line"
            ],
            isPopular: false
          }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about setting up and importing your custom generated design tokens.",
        items: [
          {
            question: "How do I import these CSS variables into my existing Tailwind CSS project?",
            answer: "Simply copy the generated variables block and paste it under the @theme block or :root selector in your primary CSS file (e.g. index.css). Tailwind v4 natively supports inheriting css var values automatically!"
          },
          {
            question: "Can I use these fonts in other applications besides Vite?",
            answer: "Absolutely. The heading and body fonts are loaded directly from Google Fonts. You can use the provided link tag in any HTML/CSS environment, including Webflow, React Native, or WordPress."
          },
          {
            question: "Are the generated designs fully responsive?",
            answer: "Yes, the preview uses fluid design-system tokens on responsive containers, ensuring your layout adapts seamlessly from small mobile screens to massive widescreen layouts."
          }
        ]
      },
      contact: {
        title: "Ready to accelerate your visual brand?",
        subtitle: "Get in touch with an expert consultant or request dedicated brand consulting.",
        fields: ["Full Name", "Enterprise Email", "Aesthetic Style Choice", "Tell us about your brand"],
        email: "consult@aetherai.io",
        phone: "+1 (888) 902-1203",
        address: "742 Mission St, San Francisco, CA 94103"
      }
    },
    cssVariables: `:root {
  /* Brand Typography */
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Color Palette */
  --color-primary: #0f766e;
  --color-secondary: #0284c7;
  --color-accent: #f43f5e;
  --color-bg: #f8fafc;
  --color-text-primary: #0f172a;
  --color-text-secondary: #334155;
  --color-text-muted: #64748b;

  /* Spacing Scale */
  --spacing-xs: 6px;
  --spacing-sm: 12px;
  --spacing-md: 24px;
  --spacing-lg: 36px;
  --spacing-xl: 48px;
  --spacing-xxl: 72px;

  /* Border Radii */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;

  /* Elevation Shadows */
  --shadow-sm: 0 2px 4px 0 rgba(15, 23, 42, 0.03);
  --shadow-md: 0 8px 16px -4px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 20px 32px -8px rgba(15, 23, 42, 0.12);
  --shadow-inner: inset 0 2px 4px 0 rgba(15, 23, 42, 0.06);
}`
  },
  {
    id: "preset-gaming-dark",
    createdAt: new Date().toISOString(),
    brandName: "Volt Esports",
    websiteType: "Portfolio",
    designStyle: "Futuristic & Dark Mode",
    industry: "Esports & Gaming",
    colorScheme: "Neon Purple & Cyber Orange",
    targetAudience: "Gen-Z Gamers",
    colorPalette: {
      primary: {
        hex: "#8b5cf6",
        name: "Neon Amethyst",
        description: "Vibrant electric purple acting as the primary energetic core."
      },
      secondary: {
        hex: "#f97316",
        name: "Cyber Orange",
        description: "Secondary highlighting accent used to grab visual attention."
      },
      accent: {
        hex: "#06b6d4",
        name: "Volt Cyan",
        description: "Ultra bright cyan for highlights, energy effects and button flares."
      },
      background: {
        hex: "#090514",
        name: "Deep Void Void",
        description: "The dark deep violet/black starry background representing space cybernetics."
      },
      textPrimary: {
        hex: "#f8fafc",
        name: "Star Dust White",
        description: "High contrast pure white for extreme readability on dark canvas."
      },
      textSecondary: {
        hex: "#cbd5e1",
        name: "Nebula Silver",
        description: "Luminous light grey for body text and descriptive content."
      },
      textMuted: {
        hex: "#64748b",
        name: "Radioactive Purple Muted",
        description: "Slightly colorful muted violet-grey for passive text blocks."
      }
    },
    typography: {
      headingFont: {
        name: "Syne",
        importUrl: "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap",
        category: "display"
      },
      bodyFont: {
        name: "JetBrains Mono",
        importUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",
        category: "monospace"
      },
      pairingExplanation: "Syne's ultra-wide raw modern geometric headings pair exceptionally well with the retro-technical, futuristic vibe of JetBrains Mono body copy, highlighting a top-tier esports theme."
    },
    designSystem: {
      borderRadius: {
        sm: "0px",
        md: "4px",
        lg: "8px",
        xl: "12px",
        full: "9999px"
      },
      shadows: {
        sm: "0 0 10px rgba(139, 92, 246, 0.15)",
        md: "0 0 20px rgba(139, 92, 246, 0.35)",
        lg: "0 0 35px rgba(139, 92, 246, 0.55)",
        xl: "0 0 50px rgba(139, 92, 246, 0.75)",
        inner: "inset 0 0 10px rgba(139, 92, 246, 0.25)"
      },
      spacingScale: {
        xs: "4px",
        sm: "10px",
        md: "20px",
        lg: "32px",
        xl: "48px",
        xxl: "64px"
      },
      buttonStyles: {
        primary: "background: linear-gradient(90deg, var(--theme-primary) 0%, var(--theme-secondary) 100%); color: #ffffff; padding: 0.75rem 1.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--theme-radius-md); box-shadow: var(--theme-shadow-md); border: 1px solid var(--theme-accent); transition: all 0.2s ease;",
        secondary: "background-color: transparent; border: 1px solid var(--theme-primary); color: #ffffff; padding: 0.75rem 1.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--theme-radius-md); box-shadow: var(--theme-shadow-sm); transition: all 0.2s ease;",
        outline: "background-color: transparent; border: 2px solid var(--theme-accent); color: var(--theme-accent); padding: 0.75rem 1.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-radius: var(--theme-radius-md); transition: all 0.2s ease;"
      },
      cardStyles: {
        border: "1px solid rgba(139, 92, 246, 0.3)",
        background: "rgba(9, 5, 20, 0.75)",
        padding: "var(--theme-spacing-lg)",
        extraTailwindClasses: "shadow-[0_0_15px_rgba(139,92,246,0.15)] rounded-md border-[var(--theme-primary)] border-opacity-30 duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:scale-[1.02] transition-all"
      }
    },
    sections: {
      hero: {
        title: "Volt Esports: Powering the next generation of competitive gaming Hub",
        subtitle: "Command the battlefield with our ultra-performance Esports roster, exclusive tournaments, and next-gen gaming hardware solutions tailored for elite players.",
        primaryCta: "Enter Lobby",
        secondaryCta: "Specs Arena"
      },
      features: {
        title: "ENGINEERED FOR ULTRA-LOW LATENCY RUNS",
        subtitle: "[CHRONOS STACK V2.5 ONLINE]",
        items: [
          {
            title: "Volt Gaming Arena",
            description: "Join high prize pools standard tournaments with our active anti-cheat engine integrated directly into Discord APIs.",
            icon: "Zap"
          },
          {
            title: "Performance Roster Analytics",
            description: "Analyze visual reaction speed and crosshair tracking metrics calculated across milliseconds of gameplay history.",
            icon: "Cpu"
          },
          {
            title: "Cyber Security Vault",
            description: "Keep your gaming profiles, hardware keys, and token winnings stored behind multi-factor gaming verification logs.",
            icon: "Shield"
          }
        ]
      },
      testimonials: {
        title: "COMMUNITY REPORT FEEDBACK",
        subtitle: "Hear from elite competitive players who conquered local lobbies using our hardware stack.",
        items: [
          {
            quote: "Volt's frame buffers saved my finals match. I tracked high contrast outlines instantly and clutched the final round without a single millisecond slip.",
            authorName: "Viper_X9",
            authorRole: "Apex Tier Champion",
            rating: 5
          },
          {
            quote: "The fonts, typography layout and JetBrains Mono coding aesthetic matches our team's look 100%. We copy-pasted the cards styles straight in.",
            authorName: "Luna-Rift",
            authorRole: "Volt Esports Team Captain",
            rating: 5
          }
        ]
      },
      pricing: {
        title: "SELECT YOUR LOADOUT STATION",
        subtitle: "No microtransactions. Fully transparent plans for high performance gamers.",
        tiers: [
          {
            name: "RECRUIT PLAN",
            price: "$0",
            description: "Basic access to daily casual lobbies and open spectating.",
            features: [
              "Up to 3 standard lobby enters / day",
              "Access to regional leaderboard logs",
              "Standard community forums access"
            ],
            isPopular: false
          },
          {
            name: "ELITE GLADIATOR",
            price: "$19",
            description: "Our recommended roster access to daily high-tier lobbies and pro tournaments.",
            features: [
              "Unlimited lobby enters and prioritised entry",
              "Access to custom premium overlay kits",
              "Prioritised developer Discord channels",
              "Exclusive local merch discounts"
            ],
            isPopular: true
          },
          {
            name: "CHAMPION VOYAGER",
            price: "$49",
            description: "Ultimate server slots with private consulting, hardware analysis, and coaching.",
            features: [
              "Weekly 1:1 pro analysis video sessions",
              "Isolated low ping server slots",
              "All standard custom kits unlocked",
              "Vip gaming badges in core hub"
            ],
            isPopular: false
          }
        ]
      },
      faq: {
        title: "TRANSMISSION FREQUENT LOGS",
        subtitle: "Frequently queried logs from the hardware core.",
        items: [
          {
            question: "DO I REGISTER HARDWARE FOR VOLT COMPETITIVE?",
            answer: "No, our tracking integrations are entirely software-side and connect instantly with Valve, Riot, or EA API accounts."
          },
          {
            question: "CAN I RUN THESE STYLES IN DARK MODE APPS?",
            answer: "Indeed, these colors are hand-picked to deliver high eye-safety levels on ultra-dark settings by using violet background buffers."
          }
        ]
      },
      contact: {
        title: "SIGNAL OUR COMMAND POST",
        subtitle: "Do you have questions, corporate sponsorships, or team challenges? Initiate transmission.",
        fields: ["USER ID", "SECURE EMAIL", "SIGNAL CODE", "TRANSMISSION REQUEST"],
        email: "comms@voltesports.gg",
        phone: "+1 (800) TERMINAL",
        address: "Cyber Dome 9, Section 102, Tokyo, JP"
      }
    },
    cssVariables: `:root {
  /* Brand Typography */
  --font-heading: 'Syne', sans-serif;
  --font-body: 'JetBrains Mono', monospace;

  /* Color Palette */
  --color-primary: #8b5cf6;
  --color-secondary: #f97316;
  --color-accent: #06b6d4;
  --color-bg: #090514;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #64748b;

  /* Spacing Scale */
  --spacing-xs: 4px;
  --spacing-sm: 10px;
  --spacing-md: 20px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  --spacing-xxl: 64px;

  /* Border Radii */
  --radius-sm: 0px;
  --radius-md: 4px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;

  /* Elevation Shadows */
  --shadow-sm: 0 0 10px rgba(139, 92, 246, 0.15);
  --shadow-md: 0 0 20px rgba(139, 92, 246, 0.35);
  --shadow-lg: 0 0 35px rgba(139, 92, 246, 0.55);
  --shadow-inner: inset 0 0 10px rgba(139, 92, 246, 0.25);
}`
  }
];
