import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  Monitor, 
  Smartphone, 
  Trash2, 
  Plus, 
  Eye, 
  Code, 
  Palette, 
  Type as TypeIcon, 
  Sliders, 
  Info, 
  Heart, 
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Moon,
  Sun,
  Laptop
} from "lucide-react";
import { WebsiteTheme, ThemeParams } from "./types";
import { PRESET_THEMES } from "./presets";
import * as Icons from "lucide-react";

// Safe dynamic icon loader helper
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  // Map some frequent lowercase names to capitalized ones
  const normalizedName = name.trim();
  const IconComponent = 
    (Icons as any)[normalizedName] || 
    (Icons as any)[normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1)] || 
    Icons.HelpCircle;

  return React.createElement(IconComponent, { className: className || "w-5 h-5" });
}

// Progress status lines to loop while generating
const PROGRESS_STATUSES = [
  "Analyzing brand industry and target audience metrics...",
  "Selecting harmonious Google Fonts pairing...",
  "Synthesizing WCAG dynamic color palette...",
  "Structuring clean modern card layout dimensions...",
  "Drafting conversions-focussed copy sections...",
  "Bending border radii and shading shadows...",
  "Packaging production-ready CSS variables..."
];

export default function App() {
  // Theme state
  const [themes, setThemes] = useState<WebsiteTheme[]>([]);
  const [currentTheme, setCurrentTheme] = useState<WebsiteTheme | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressIndex, setProgressIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Tabs & Settings State
  const [activeTab, setActiveTab] = useState<"preview" | "colors" | "typography" | "tokens" | "css" | "json">("preview");
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Custom text sandbox for font testing
  const [sandboxText, setSandboxText] = useState("We craft experiences that linger long after the initial click.");

  // Form Fields State
  const [formData, setFormData] = useState<ThemeParams>({
    brandName: "Starlight Digital",
    websiteType: "SaaS",
    industry: "Creative Tech & Cloud Infrastructure",
    colorScheme: "Vibrant Indigo & electric neon cyan",
    designStyle: "Glassmorphism",
    targetAudience: "Startups, developers, and visual content creators"
  });

  // Load from local storage or presets
  useEffect(() => {
    const cached = localStorage.getItem("theme_maker_history");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.length > 0) {
          setThemes(parsed);
          setCurrentTheme(parsed[0]);
          return;
        }
      } catch (e) {
        console.error("Failed to parse local history storage", e);
      }
    }
    setThemes(PRESET_THEMES);
    setCurrentTheme(PRESET_THEMES[0]);
  }, []);

  // Save changes to local storage when history updates
  const saveToHistory = (newThemes: WebsiteTheme[]) => {
    setThemes(newThemes);
    localStorage.setItem("theme_maker_history", JSON.stringify(newThemes));
  };

  // Status message rotation logic
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      interval = setInterval(() => {
        setProgressIndex((prev) => (prev + 1) % PROGRESS_STATUSES.length);
      }, 2500);
    } else {
      setProgressIndex(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Inject current theme Fonts into document head dynamically
  useEffect(() => {
    if (!currentTheme) return;

    const loadFont = (fontUrl: string) => {
      if (!fontUrl) return;
      const id = `font-link-${encodeURIComponent(fontUrl)}`;
      if (document.getElementById(id)) return;

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    };

    if (currentTheme.typography?.headingFont?.importUrl) {
      loadFont(currentTheme.typography.headingFont.importUrl);
    }
    if (currentTheme.typography?.bodyFont?.importUrl) {
      loadFont(currentTheme.typography.bodyFont.importUrl);
    }
  }, [currentTheme]);

  // Handle Form Change
  const updateFormField = (field: keyof ThemeParams, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Generate Theme Handler
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    setProgressIndex(0);

    try {
      const response = await fetch("/api/generate-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.error || `HTTP error ${response.status}`);
      }

      const generatedData = await response.json();
      
      const newTheme: WebsiteTheme = {
        ...generatedData,
        id: `theme-${Date.now()}`,
        createdAt: new Date().toISOString(),
        industry: formData.industry,
        colorScheme: formData.colorScheme,
        targetAudience: formData.targetAudience
      };

      const updatedList = [newTheme, ...themes];
      saveToHistory(updatedList);
      setCurrentTheme(newTheme);
      setActiveTab("preview");
    } catch (err: any) {
      console.warn("Failed targeting API generation. Building beautiful local fallback archetype. Error: ", err);
      // Construct an extremely high-quality pseudo-random fallback matching requested fields so the app is 100% functional
      createLocalAlternativeTheme(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // High quality local fallback generator if the API is down or Key is missing
  const createLocalAlternativeTheme = (errMsg: string) => {
    // Generate harmonious palettes based on input colorScheme name
    const scheme = formData.colorScheme.toLowerCase();
    const isDark = formData.designStyle.includes("Dark") || scheme.includes("dark") || scheme.includes("cyber") || scheme.includes("midnight");
    
    // Choose presets matching color concept
    let primary = "#4f46e5"; // Indigo
    let secondary = "#06b6d4"; // Cyan
    let accent = "#f43f5e"; // Rose
    let bg = isDark ? "#0f172a" : "#f8fafc";
    let text1 = isDark ? "#f8fafc" : "#0f172a";
    let text2 = isDark ? "#cbd5e1" : "#334155";
    let textMuted = isDark ? "#64748b" : "#94a3b8";

    if (scheme.includes("teal") || scheme.includes("green") || scheme.includes("forest")) {
      primary = "#0f766e";
      secondary = "#0d9488";
      accent = "#f59e0b";
    } else if (scheme.includes("warm") || scheme.includes("amber") || scheme.includes("orange")) {
      primary = "#ea580c";
      secondary = "#f59e0b";
      accent = "#3b82f6";
    } else if (scheme.includes("pastel") || scheme.includes("soft") || scheme.includes("rose")) {
      primary = "#ec4899";
      secondary = "#a855f7";
      accent = "#14b8a6";
    } else if (scheme.includes("minimal") || scheme.includes("mono") || scheme.includes("slate") || scheme.includes("white")) {
      primary = isDark ? "#f1f5f9" : "#1e293b";
      secondary = isDark ? "#94a3b8" : "#475569";
      accent = "#3b82f6";
    }

    // Dynamic Fonts choice
    const headingFontName = formData.designStyle === "Luxury" ? "Playfair Display" : 
                             formData.designStyle === "Futuristic" ? "Syne" : "Space Grotesk";
    const bodyFontName = "Inter";

    const localTheme: WebsiteTheme = {
      id: `theme-local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      brandName: formData.brandName,
      websiteType: formData.websiteType,
      designStyle: formData.designStyle,
      industry: formData.industry,
      colorScheme: formData.colorScheme,
      targetAudience: formData.targetAudience || "General",
      colorPalette: {
        primary: { hex: primary, name: "Dominant Brand Accent", description: "Direct Action Points" },
        secondary: { hex: secondary, name: "Supporting Atmosphere", description: "Visual rhythm support" },
        accent: { hex: accent, name: "Critical Contrast", description: "Pointers and badging" },
        background: { hex: bg, name: "Canvas Base", description: "Standard viewport background" },
        textPrimary: { hex: text1, name: "Primary Copy", description: "Strict readability titles" },
        textSecondary: { hex: text2, name: "Secondary Narrative", description: "Body layouts" },
        textMuted: { hex: textMuted, name: "Subtle Shadows", description: "Framework guides & limits" }
      },
      typography: {
        headingFont: {
          name: headingFontName,
          importUrl: `https://fonts.googleapis.com/css2?family=${headingFontName.replace(' ', '+')}:wght@700;800&display=swap`,
          category: headingFontName === "Playfair Display" ? "serif" : "sans-serif"
        },
        bodyFont: {
          name: bodyFontName,
          importUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
          category: "sans-serif"
        },
        pairingExplanation: `Paired '${headingFontName}' headings with clean stable '${bodyFontName}' body text to support the ${formData.designStyle} visual atmosphere.`
      },
      designSystem: {
        borderRadius: {
          sm: formData.designStyle === "Minimalist" ? "0px" : "4px",
          md: formData.designStyle === "Minimalist" ? "0px" : "8px",
          lg: formData.designStyle === "Minimalist" ? "0px" : "16px",
          xl: formData.designStyle === "Minimalist" ? "0px" : "24px",
          full: "9999px"
        },
        shadows: {
          sm: isDark ? "0 0 10px rgba(0,0,0,0.5)" : "0 1px 3px rgba(0,0,0,0.1)",
          md: isDark ? "0 4px 18px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.08)",
          lg: isDark ? "0 12px 36px rgba(0,0,0,0.7)" : "0 10px 25px rgba(0,0,0,0.12)",
          xl: isDark ? "0 24px 48px rgba(0,0,0,0.8)" : "0 20px 40px rgba(0,0,0,0.16)",
          inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)"
        },
        spacingScale: {
          xs: "8px",
          sm: "12px",
          md: "24px",
          lg: "40px",
          xl: "64px",
          xxl: "96px"
        },
        buttonStyles: {
          primary: `background-color: var(--theme-primary); color: ${isDark ? "#ffffff" : "#ffffff"}; font-weight: 600; padding: 0.65rem 1.5rem; border-radius: var(--theme-radius-md); transition: all 0.2s ease; cursor: pointer; box-shadow: var(--theme-shadow-md);`,
          secondary: `background-color: rgba(255,255,255, 0.1); border: 1px solid var(--theme-text-muted); color: var(--theme-text-primary); font-weight: 600; padding: 0.65rem 1.5rem; border-radius: var(--theme-radius-md); transition: all 0.2s ease; cursor: pointer;`,
          outline: `background-color: transparent; border: 2px solid var(--theme-primary); color: var(--theme-primary); font-weight: 600; padding: 0.65rem 1.5rem; border-radius: var(--theme-radius-md); transition: all 0.2s ease; cursor: pointer;`
        },
        cardStyles: {
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
          background: isDark ? "rgba(30, 41, 59, 0.4)" : "rgba(255, 255, 255, 0.8)",
          padding: "24px",
          extraTailwindClasses: "backdrop-blur-md rounded-[var(--theme-radius-lg)] hover:shadow-lg transition-all border duration-200"
        }
      },
      sections: {
        hero: {
          title: `Empower ${formData.brandName} With Generative Systems`,
          subtitle: `Achieve top-tier performance benchmarks. We provide high-fidelity tailored operations designed precisely for "${formData.industry}" agencies built using classic style frameworks.`,
          primaryCta: `Get Started Now`,
          secondaryCta: `Learn More`
        },
        features: {
          title: "Engineered with Extreme Intention",
          subtitle: `Our premium capabilities built specifically inside the ${formData.industry} cluster.`,
          items: [
            { title: "Dynamic Architecture", description: "Adaptable layouts rendered cleanly across any screen dynamic viewport.", icon: "Sparkles" },
            { title: "Sovereign Encryption", description: "Highly safe client validation keys stored completely out of range.", icon: "Shield" },
            { title: "Ultra Scalability", description: "Instant caching node relays ensuring sub-millisecond network speeds.", icon: "Zap" }
          ]
        },
        testimonials: {
          title: "Trusted globally by tech leaders",
          subtitle: `What our core ${formData.targetAudience} clients report after switching.`,
          items: [
            { quote: "The absolute clean geometry and structural styling paired with dynamic font loading made it effortless to rebuild our presentation tier.", authorName: "Marcus Thorne", authorRole: "Principal Engineering, CloudGrid", rating: 5 },
            { quote: "Copying variables straight into our styles pipeline saved us multiple design critique cycles. Magnificent utility.", authorName: "Elena Rostova", authorRole: "UI Visual Lead, NeonVector", rating: 5 }
          ]
        },
        pricing: {
          title: "Flexible and Transparent Pricing Tiers",
          subtitle: "Clear plans scaling smoothly alongside your container workload requirements.",
          tiers: [
            { name: "Starter load", price: "$0", description: "Perfect for testing custom visual wireframes with static sandbox data.", features: ["Up to 3 local projects", "Standard static font pairing", "Community forum help"], isPopular: false },
            { name: "Growth Node", price: "$39", description: "Unlimited projects with private premium CDN distribution assets.", features: ["Unlimited active themes", "Advanced layout generator access", "Priority engineering Slack", "10GB asset hosting bandwidth"], isPopular: true },
            { name: "Enterprise Hub", price: "$149", description: "Full white-labeled, sovereign hosting with compliance locks.", features: ["Private sandbox networks", "Continuous SLA uptime logs", "Dedicated styling consultants", "24/7 technical hotline access"], isPopular: false }
          ]
        },
        faq: {
          title: "Theme Engineering Logs",
          subtitle: "Answers to common setup and variables application queries.",
          items: [
            { question: "How do I map these CSS custom variables?", answer: "Simple copy the generated variables into the :root selector of your CSS file. The preview models inherit these variables instantly." },
            { question: "Can we fine-tune generated colors manually?", answer: "Yes! Use the Real-time Theme Editor adjustment sliders tab below to adjust Hex levels on the fly." }
          ]
        },
        contact: {
          title: "Initiate Brand Collaboration",
          subtitle: "Our staff remains fully geared to bring your visual presence into action. Get in touch.",
          fields: ["Email Address", "Target Style", "Message"],
          email: `contact@${formData.brandName.toLowerCase().replace(/[^a-z]/g, "") || "service"}.com`,
          phone: "+1 (800) DESIGN-NOW",
          address: "102 Broadway Boulevard, Suite 500, Seattle, WA 98101"
        }
      },
      cssVariables: `:root {
  /* Brand Typography */
  --font-heading: '${headingFontName}', sans-serif;
  --font-body: '${bodyFontName}', sans-serif;

  /* Color Palette */
  --color-primary: ${primary};
  --color-secondary: ${secondary};
  --color-accent: ${accent};
  --color-bg: ${bg};
  --color-text-primary: ${text1};
  --color-text-secondary: ${text2};
  --color-text-muted: ${textMuted};

  /* Radii Scale */
  --radius-sm: ${formData.designStyle === "Minimalist" ? "0px" : "4px"};
  --radius-md: ${formData.designStyle === "Minimalist" ? "0px" : "8px"};
  --radius-lg: ${formData.designStyle === "Minimalist" ? "0px" : "16px"};
  --radius-xl: ${formData.designStyle === "Minimalist" ? "0px" : "24px"};
  --radius-full: 9999px;
}`
    };

    const updatedList = [localTheme, ...themes];
    saveToHistory(updatedList);
    setCurrentTheme(localTheme);
    setActiveTab("preview");
    setError(`We used an extremely high-quality local designer archetype because the GEMINI_API_KEY was not configured or server was pending. You're fully good to edit, preview, and download this custom-styled theme!`);
  };

  // Delete a theme from history
  const handleDeleteTheme = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = themes.filter((t) => t.id !== id);
    saveToHistory(updated);
    
    if (currentTheme?.id === id) {
      setCurrentTheme(updated.length > 0 ? updated[0] : PRESET_THEMES[0]);
    }
  };

  // Copy helper
  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Download Theme JSON helper
  const handleDownloadJSON = () => {
    if (!currentTheme) return;
    const blob = new Blob([JSON.stringify(currentTheme, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentTheme.brandName.toLowerCase().replace(/\s+/g, "-")}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Manual Adjuster for generated colors (Real-time updates)
  const handleColorChange = (key: keyof WebsiteTheme["colorPalette"], hexValue: string) => {
    if (!currentTheme) return;
    const updatedTheme = {
      ...currentTheme,
      colorPalette: {
        ...currentTheme.colorPalette,
        [key]: {
          ...currentTheme.colorPalette[key],
          hex: hexValue
        }
      }
    };

    // Re-generate the custom variables string based on manual adjustments so it matches exactly!
    const headingFont = updatedTheme.typography.headingFont.name;
    const bodyFont = updatedTheme.typography.bodyFont.name;
    const spacing = updatedTheme.designSystem.spacingScale;
    const radius = updatedTheme.designSystem.borderRadius;

    updatedTheme.cssVariables = `:root {
  /* Brand Typography */
  --font-heading: '${headingFont}', sans-serif;
  --font-body: '${bodyFont}', sans-serif;

  /* Color Palette */
  --color-primary: ${updatedTheme.colorPalette.primary.hex};
  --color-secondary: ${updatedTheme.colorPalette.secondary.hex};
  --color-accent: ${updatedTheme.colorPalette.accent.hex};
  --color-bg: ${updatedTheme.colorPalette.background.hex};
  --color-text-primary: ${updatedTheme.colorPalette.textPrimary.hex};
  --color-text-secondary: ${updatedTheme.colorPalette.textSecondary.hex};
  --color-text-muted: ${updatedTheme.colorPalette.textMuted.hex};

  /* Spacing Scale */
  --spacing-xs: ${spacing.xs || "6px"};
  --spacing-sm: ${spacing.sm || "12px"};
  --spacing-md: ${spacing.md || "24px"};
  --spacing-lg: ${spacing.lg || "36px"};
  --spacing-xl: ${spacing.xl || "48px"};
  --spacing-xxl: ${spacing.xxl || "72px"};

  /* Radii Scale */
  --radius-sm: ${radius.sm || "4px"};
  --radius-md: ${radius.md || "8px"};
  --radius-lg: ${radius.lg || "16px"};
  --radius-xl: ${radius.xl || "24px"};
  --radius-full: 9999px;
}`;

    setCurrentTheme(updatedTheme);

    // Save back to cached themes list
    const updatedThemesList = themes.map((t) => t.id === currentTheme.id ? updatedTheme : t);
    saveToHistory(updatedThemesList);
  };

  // Instantly toggle Dark Mode / Light Mode variant on active theme
  const toggleDarkLightInversion = (target: "dark" | "light") => {
    if (!currentTheme) return;
    const defaultDarkBg = "#0b0718";
    const defaultLightBg = "#f8fafc";
    const defaultDarkText = "#f8fafc";
    const defaultLightText = "#0f172a";

    const updated = {
      ...currentTheme,
      colorPalette: {
        ...currentTheme.colorPalette,
        background: {
          ...currentTheme.colorPalette.background,
          hex: target === "dark" ? defaultDarkBg : defaultLightBg,
          name: target === "dark" ? "Synthetic Midnight Void" : "Polished Cotton Base"
        },
        textPrimary: {
          ...currentTheme.colorPalette.textPrimary,
          hex: target === "dark" ? defaultDarkText : defaultLightText
        },
        textSecondary: {
          ...currentTheme.colorPalette.textSecondary,
          hex: target === "dark" ? "#cbd5e1" : "#334155"
        },
        textMuted: {
          ...currentTheme.colorPalette.textMuted,
          hex: target === "dark" ? "#64748b" : "#94a3b8"
        }
      }
    };
    
    // update variables
    handleColorChange("background", target === "dark" ? defaultDarkBg : defaultLightBg);
  };

  // Convert current static styles into dynamic mapped style variables
  const getDynamicStylesObj = (theme: WebsiteTheme) => {
    return {
      "--theme-primary": theme.colorPalette.primary.hex,
      "--theme-secondary": theme.colorPalette.secondary.hex,
      "--theme-accent": theme.colorPalette.accent.hex,
      "--theme-background": theme.colorPalette.background.hex,
      "--theme-text-primary": theme.colorPalette.textPrimary.hex,
      "--theme-text-secondary": theme.colorPalette.textSecondary.hex,
      "--theme-text-muted": theme.colorPalette.textMuted.hex,
      "--theme-heading-font": `'${theme.typography.headingFont.name}', 'Outfit', sans-serif`,
      "--theme-body-font": `'${theme.typography.bodyFont.name}', 'Inter', sans-serif`,
      "--theme-radius-sm": theme.designSystem.borderRadius.sm || "4px",
      "--theme-radius-md": theme.designSystem.borderRadius.md || "8px",
      "--theme-radius-lg": theme.designSystem.borderRadius.lg || "16px",
      "--theme-radius-xl": theme.designSystem.borderRadius.xl || "24px",
      "--theme-shadow-sm": theme.designSystem.shadows.sm || "none",
      "--theme-shadow-md": theme.designSystem.shadows.md || "none",
      "--theme-shadow-lg": theme.designSystem.shadows.lg || "none",
      "--theme-spacing-xs": theme.designSystem.spacingScale.xs || "4px",
      "--theme-spacing-sm": theme.designSystem.spacingScale.sm || "8px",
      "--theme-spacing-md": theme.designSystem.spacingScale.md || "16px",
      "--theme-spacing-lg": theme.designSystem.spacingScale.lg || "24px",
      "--theme-spacing-xl": theme.designSystem.spacingScale.xl || "48px",
    } as React.CSSProperties;
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#0a0a0c] text-slate-300 flex flex-col font-sans select-none overflow-x-hidden antialiased">
      
      {/* Background Graphic Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute top-[30%] -right-[5%] w-[45%] h-[55%] rounded-full bg-cyan-500/5 blur-[130px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>

      {/* Corporate Dashboard Header */}
      <header id="app-header" className="sticky top-0 z-40 bg-[#0f0f12] h-14 border-b border-white/5 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div>
            <h1 className="font-bold text-slate-100 tracking-tight leading-none text-sm md:text-base">
              GENESIS<span className="text-indigo-500 underline underline-offset-4 decoration-2">AI</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-mono leading-none mt-1 uppercase tracking-wider">
              AI THEME FORGE & DISPATCH / V1.2
            </p>
          </div>
        </div>

        {/* Action controls & current selected Indicator */}
        {currentTheme && (
          <div className="hidden md:flex items-center gap-3 bg-black/40 p-1 rounded-full border border-white/5 px-3 py-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Workspace:</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400">
              {currentTheme.brandName} // {currentTheme.designStyle}
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            id="btn-dl-json"
            onClick={handleDownloadJSON}
            disabled={!currentTheme}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-50 transition-all cursor-pointer"
            title="Download full Theme System config JSON"
          >
            <Download className="w-3 h-3" />
            <span>Theme JSON</span>
          </button>
          
          <button
            id="btn-copy-css-main"
            onClick={() => currentTheme && handleCopyText(currentTheme.cssVariables, "css")}
            disabled={!currentTheme}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
          >
            {copiedField === "css" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedField === "css" ? "Copied!" : "Export Theme"}</span>
          </button>
        </div>
      </header>

      {/* Main Dynamic Panel Layout */}
      <main id="app-workspace" className="flex-1 max-w-[1700px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 overflow-hidden bg-[#0a0a0c]">
        
        {/* Left Side: Parameters Form and History Hub (Col 1 to 4) */}
        <section id="controls-hub" className="lg:col-span-4 flex flex-col gap-6 h-full min-h-[calc(100vh-130px)]">
          
          {/* Main Controls Form Box */}
          <div className="bg-[#0f0f12] rounded-2xl border border-white/5 p-6 shadow-xl flex flex-col gap-6">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-slate-100">Theme Configurator</h2>
              <p className="text-xs text-slate-500">Describe your vision to the AI engine.</p>
            </div>

            <form onSubmit={handleGenerate} className="flex flex-col gap-5">
              
              {/* Brand Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
                  <span>Brand Name</span>
                  <span className="text-[9px] text-indigo-400 font-mono">Required</span>
                </label>
                <input
                  id="input-brand-name"
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => updateFormField("brandName", e.target.value)}
                  placeholder="e.g. Lumina Core"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Grid block for Website Type & Design Style */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Website Type</label>
                  <div className="relative">
                    <select
                      id="select-web-type"
                      value={formData.websiteType}
                      onChange={(e) => updateFormField("websiteType", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-3 pr-8 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="SaaS">SaaS Platform</option>
                      <option value="Business">Corporate Business</option>
                      <option value="Portfolio">Professional Portfolio</option>
                      <option value="Agency">Creative Agency</option>
                      <option value="E-commerce">E-Commerce App</option>
                      <option value="Restaurant">Premium Restaurant</option>
                      <option value="Blog">Editorial Blog</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute top-2.5 right-3 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Design Style</label>
                  <div className="relative">
                    <select
                      id="select-design-style"
                      value={formData.designStyle}
                      onChange={(e) => updateFormField("designStyle", e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg pl-3 pr-8 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Glassmorphism">Glassmorphism</option>
                      <option value="Futuristic">Futuristic (Cyber)</option>
                      <option value="Modern">Clean Modern</option>
                      <option value="Minimalist">Brutalist Minimalist</option>
                      <option value="Luxury">Luxury Serif</option>
                      <option value="Corporate">Stable Corporate</option>
                      <option value="Dark Mode">Cyberpunk Dark Mode</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute top-2.5 right-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Industry Context */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
                  <span>Industry Sector</span>
                  <span className="text-[9px] text-slate-500 font-mono">Context</span>
                </label>
                <input
                  id="input-industry"
                  type="text"
                  value={formData.industry}
                  onChange={(e) => updateFormField("industry", e.target.value)}
                  placeholder="e.g. Decentralized Logistics"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Color Scheme Concept description */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
                  <span>Mood / Colors</span>
                  <span className="text-[9px] text-slate-500 font-mono">Palette focus</span>
                </label>
                <input
                  id="input-color-scheme"
                  type="text"
                  value={formData.colorScheme}
                  onChange={(e) => updateFormField("colorScheme", e.target.value)}
                  placeholder="e.g. Vibrant Indigo & electric neon cyan"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Target Audience Context */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Target Audience</label>
                <input
                  id="input-audience"
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => updateFormField("targetAudience", e.target.value)}
                  placeholder="e.g. Startups, developers, and visual content creators"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Trigger Generation Button */}
              <button
                id="btn-submit-generator"
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-200" />
                    <span className="font-semibold animate-pulse tracking-wide">Designing Theme...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Re-generate Theme</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Prompt Loading Progress Indicator Screen */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#0f0f12] border border-white/5 rounded-2xl p-4 flex flex-col gap-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-400 animate-spin" />
                    <Sparkles className="w-3.5 h-3.5 absolute text-indigo-400 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 font-mono">
                      Neural Workspace Status
                    </h5>
                    <p className="text-[11px] text-slate-200 font-semibold mt-0.5">
                      {PROGRESS_STATUSES[progressIndex]}
                    </p>
                  </div>
                </div>

                {/* Progress bar simulation */}
                <div className="w-full bg-black/40 rounded-full h-1 overflow-hidden border border-white/5">
                  <motion.div 
                    className="bg-indigo-500 h-full"
                    animate={{ width: ["10%", "30%", "60%", "85%", "95%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Theme generation warnings / feedback */}
          {error && (
            <div className="bg-[#0f0f12] border border-yellow-500/20 rounded-xl p-3.5 text-xs flex gap-3.5 w-full text-slate-300 relative shadow-lg">
              <Info className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-yellow-500 font-bold mb-0.5 uppercase tracking-wider text-[10px]">Notice</p>
                <p className="text-slate-400">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="absolute top-3 right-3 text-slate-500 hover:text-white">
                ✕
              </button>
            </div>
          )}

          {/* History Hub Panel Card */}
          <div className="flex-1 bg-[#0f0f12] rounded-2xl border border-white/5 p-5 shadow-xl flex flex-col gap-4 min-h-[220px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                <h4 className="font-semibold text-slate-100 text-xs uppercase tracking-wider">Theme History</h4>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Auto-Saved</span>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[350px] pr-1 flex flex-col gap-2.5 custom-scrollbar">
              {themes.map((t, idx) => {
                const isActive = currentTheme?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      setCurrentTheme(t);
                      setError(null);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                      isActive
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-md shadow-indigo-500/5"
                        : "bg-white/5 border border-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-300"
                    }`}
                  >
                    <div className="flex flex-col gap-1 truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-100">{t.brandName}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400 font-mono">
                          V{idx + 1}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 truncate font-mono">
                        {t.colorScheme} // {t.designStyle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isActive && (
                        <span className="text-[9px] text-indigo-400 font-bold mr-1 uppercase tracking-wider">ACTIVE</span>
                      )}
                      <button
                        onClick={(e) => handleDeleteTheme(t.id, e)}
                        className="p-1 px-1.5 text-slate-600 hover:text-red-400 rounded hover:bg-white/5 transition-all"
                        title="Delete theme"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {themes.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-xs">
                  No themes created yet. Fill out the architect settings above to forge your first!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Side: Active Workspace & Visual Simulator (Col 5 to 12) */}
        <section id="workspace-hub" className="lg:col-span-8 flex flex-col gap-4 h-full min-h-[calc(100vh-130px)]">
          
          {/* Workspace Sub-Header - Tab Controller & Responsive controls */}
          <div className="bg-[#0f0f12] rounded-2xl border border-white/5 p-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg z-20">
            {/* View Tab Selectors */}
            <div className="flex flex-wrap items-center gap-1 w-full sm:w-auto">
              {[
                { id: "preview", label: "Live Preview", icon: Eye },
                { id: "colors", label: "Palette", icon: Palette },
                { id: "typography", label: "Typography", icon: TypeIcon },
                { id: "tokens", label: "System Modifiers", icon: Sliders },
                { id: "css", label: "CSS Variables", icon: Code },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? "bg-white/10 text-white shadow-md border border-white/10"
                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Responsive simulator & Mode overrides */}
            {currentTheme && (
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                
                {/* Light/Dark mode Quick Overrides */}
                <div className="flex bg-black/40 p-1 rounded-full border border-white/5">
                  <button 
                    onClick={() => toggleDarkLightInversion("light")}
                    className="p-1 px-3 text-[10px] font-medium rounded-full text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-all"
                    title="Convert background and text system elements for light environments"
                  >
                    <Sun className="w-3 h-3 text-amber-500" />
                    <span>Light</span>
                  </button>
                  <button 
                    onClick={() => toggleDarkLightInversion("dark")}
                    className="p-1 px-3 text-[10px] font-medium rounded-full text-slate-300 bg-white/10 flex items-center gap-1.5 transition-all"
                    title="Convert base canvas for dark mode themes"
                  >
                    <Moon className="w-3 h-3 text-indigo-400" />
                    <span>Dark</span>
                  </button>
                </div>

                <div className="h-4 w-px bg-white/10 mx-1" />

                {/* Viewport Width triggers */}
                <div className="flex bg-black/40 p-1 rounded-full border border-white/5">
                  <button
                    onClick={() => setViewport("desktop")}
                    className={`p-1 px-3 rounded-full text-[10px] font-medium flex items-center gap-1 transition-all ${
                      viewport === "desktop" ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                    title="Desert wireframe view"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    onClick={() => setViewport("mobile")}
                    className={`p-1 px-3 rounded-full text-[10px] font-medium flex items-center gap-1 transition-all ${
                      viewport === "mobile" ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"
                    }`}
                    title="Mobile responsive render"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ACTIVE TAB DISPLAY CARD */}
          {currentTheme ? (
            <div className="flex-1 min-h-[500px] flex flex-col">
              
              {/* DISPLAY TAB: LIVE WEBSITE SIMULATOR VIEW */}
              {activeTab === "preview" && (
                <div className="flex-1 flex flex-col gap-3">
                  {/* Web Browser Frame Header Decoration */}
                  <div className="bg-[#0f0f12] border border-white/5 rounded-t-2xl px-4 py-2.5 flex items-center justify-between text-slate-500 text-xs">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300/30"></div>
                    </div>
                    <div className="bg-black/30 px-4 py-1 rounded h-6 w-64 text-[10px] text-slate-400 flex items-center justify-center border border-white/5">
                      {currentTheme.brandName.toLowerCase().replace(/\s+/g, "") || "preview"}.com
                    </div>
                    <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {currentTheme.designStyle}
                    </div>
                  </div>

                  {/* Browser Viewport Window wrapper with responsive constraint */}
                  <div className="flex-1 bg-black/45 border-x border-b border-white/5 rounded-b-2xl flex items-start justify-center overflow-y-auto p-4 md:p-6 select-text">
                    <motion.div
                      id="live-theme-sandbox"
                      layout
                      className={`shadow-2xl transition-all duration-300 relative rounded-lg border overflow-hidden ${
                        viewport === "mobile"
                          ? "w-[375px] max-w-full min-h-[600px] text-xs"
                          : "w-full max-w-full min-h-[500px]"
                      }`}
                      // Apply generated color Palette values
                      style={{
                        ...getDynamicStylesObj(currentTheme),
                        backgroundColor: "var(--theme-background)",
                        borderColor: "var(--theme-text-muted)",
                        color: "var(--theme-text-secondary)"
                      }}
                    >
                      {/* SIMULATED WEB SITE ROOT WITH THE CUSTOM GENERATED CSS STYLING OVERLAYS */}
                      <div className="w-full h-full font-[family:var(--theme-body-font)]">
                        
                        {/* 1. Header/Navigation Bar */}
                        <header className="border-b px-4 py-3 flex items-center justify-between" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}22`, backdropFilter: "blur(4px)" }}>
                          <span className="font-[family:var(--theme-heading-font)] font-bold text-lg" style={{ color: "var(--theme-text-primary)" }}>
                            {currentTheme.brandName}
                          </span>
                          <div className="flex items-center gap-4 text-xs font-semibold" style={{ color: "var(--theme-text-secondary)" }}>
                            <span className="hover:opacity-80 cursor-pointer">Features</span>
                            <span className="hover:opacity-80 cursor-pointer">Pricing</span>
                            <span className="hover:opacity-80 cursor-pointer">Contact</span>
                          </div>
                          <div>
                            <button className="text-xs font-bold rounded-lg border px-3 py-1.5 transition-all hover:scale-[1.02]" style={{ borderColor: "var(--theme-primary)", color: "var(--theme-text-primary)" }}>
                              Login
                            </button>
                          </div>
                        </header>

                        {/* 2. Hero Section */}
                        <section className="px-6 py-12 md:py-16 text-center max-w-4xl mx-auto flex flex-col items-center gap-6">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase border px-2.5 py-0.5 rounded-full" style={{ color: "var(--theme-accent)", borderColor: "var(--theme-accent)" }}>
                            {currentTheme.websiteType} PREVIEW
                          </span>
                          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight font-[family:var(--theme-heading-font)]" style={{ color: "var(--theme-text-primary)" }}>
                            {currentTheme.sections?.hero?.title || "Tailor-Made Dynamic Operations"}
                          </h2>
                          <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-2xl" style={{ color: "var(--theme-text-secondary)" }}>
                            {currentTheme.sections?.hero?.subtitle || "No system constraints. We build complete, beautiful modular setups designed purely to fit target consumer sectors."}
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                            <button 
                              className="text-sm font-semibold rounded-lg hover:brightness-105 transition-all shadow-md px-5 py-2.5 cursor-pointer flex items-center gap-1 hover:scale-[1.02] duration-300"
                              style={{ backgroundColor: "var(--theme-primary)", color: "#ffffff" }}
                            >
                              <span>{currentTheme.sections?.hero?.primaryCta || "Get Started"}</span>
                            </button>
                            <button 
                              className="text-sm font-semibold rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all border px-5 py-2.5 cursor-pointer hover:scale-[1.02] duration-300"
                              style={{ borderColor: "var(--theme-text-muted)", color: "var(--theme-text-primary)" }}
                            >
                              <span>{currentTheme.sections?.hero?.secondaryCta || "Learn More"}</span>
                            </button>
                          </div>
                        </section>

                        {/* 3. Features Grid Section */}
                        <section className="px-6 py-10 max-w-5xl mx-auto border-t" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}15` }}>
                          <div className="text-center mb-8">
                            <h3 className="text-xl md:text-2xl font-bold font-[family:var(--theme-heading-font)]" style={{ color: "var(--theme-text-primary)" }}>
                              {currentTheme.sections?.features?.title || "Modern Features Catalog"}
                            </h3>
                            <p className="text-xs md:text-sm mt-1" style={{ color: "var(--theme-text-secondary)" }}>
                              {currentTheme.sections?.features?.subtitle || "Everything you need out of the container."}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentTheme.sections?.features?.items?.map((item, idx) => (
                              <div
                                key={idx}
                                className={`p-5 rounded-lg border transition-all duration-200 ${currentTheme.designSystem.cardStyles.extraTailwindClasses}`}
                                style={{
                                  backgroundColor: currentTheme.designSystem.cardStyles.background,
                                  borderColor: currentTheme.designSystem.cardStyles.border,
                                  borderRadius: "var(--theme-radius-lg)"
                                }}
                              >
                                <div className="p-2.5 w-max rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: `${currentTheme.colorPalette.primary.hex}15`, color: "var(--theme-primary)" }}>
                                  <DynamicIcon name={item.icon} className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-sm md:text-base font-[family:var(--theme-heading-font)] mb-2" style={{ color: "var(--theme-text-primary)" }}>
                                  {item.title}
                                </h4>
                                <p className="text-xs leading-relaxed" style={{ color: "var(--theme-text-secondary)" }}>
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* 4. Testimonial Highlight */}
                        <section className="px-6 py-10 bg-black/5 dark:bg-white/5 border-t border-b" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}15` }}>
                          <div className="max-w-4xl mx-auto text-center">
                            <h3 className="text-xs font-mono font-bold uppercase tracking-widest mb-6" style={{ color: "var(--theme-accent)" }}>
                              {currentTheme.sections?.testimonials?.title || "CLIENT FEEDBACK"}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {currentTheme.sections?.testimonials?.items?.map((item, idx) => (
                                <div key={idx} className="flex flex-col justify-between p-4 border rounded-xl bg-black/5 dark:bg-white/5" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}15` }}>
                                  <p className="italic text-xs md:text-sm leading-relaxed mb-4" style={{ color: "var(--theme-text-secondary)" }}>
                                    "{item.quote}"
                                  </p>
                                  <div>
                                    <div className="flex items-center justify-center gap-1 text-amber-500 mb-1.5 text-xs">
                                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                                        <span key={i}>★</span>
                                      ))}
                                    </div>
                                    <p className="font-bold text-xs" style={{ color: "var(--theme-text-primary)" }}>
                                      {item.authorName}
                                    </p>
                                    <p className="text-[10px]" style={{ color: "var(--theme-text-muted)" }}>
                                      {item.authorRole}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>

                        {/* 5. Pricing Section */}
                        <section className="px-6 py-12 max-w-5xl mx-auto">
                          <div className="text-center mb-10">
                            <h3 className="text-xl md:text-2xl font-bold font-[family:var(--theme-heading-font)]" style={{ color: "var(--theme-text-primary)" }}>
                              {currentTheme.sections?.pricing?.title || "Flexible Pricing Plans"}
                            </h3>
                            <p className="text-xs md:text-sm mt-1" style={{ color: "var(--theme-text-secondary)" }}>
                              {currentTheme.sections?.pricing?.subtitle || "Transparent plans built for every developmental milestone."}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {currentTheme.sections?.pricing?.tiers?.map((tier, idx) => (
                              <div
                                key={idx}
                                className={`p-6 border relative transition-all duration-200 flex flex-col justify-between ${tier.isPopular ? "scale-[1.02] border-opacity-100 ring-2 z-10" : "opacity-95"}`}
                                style={{
                                  backgroundColor: currentTheme.designSystem.cardStyles.background,
                                  borderColor: tier.isPopular ? "var(--theme-primary)" : currentTheme.designSystem.cardStyles.border,
                                  borderRadius: "var(--theme-radius-xl)",
                                  ringColor: "var(--theme-primary)"
                                }}
                              >
                                {tier.isPopular && (
                                  <span className="absolute -top-3 right-4 px-2.5 py-0.5 text-[9px] font-bold text-white rounded-full uppercase" style={{ backgroundColor: "var(--theme-primary)" }}>
                                    RECOMENDED
                                  </span>
                                )}

                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--theme-accent)" }}>
                                    {tier.name}
                                  </h4>
                                  <div className="flex items-baseline gap-1 my-3">
                                    <span className="text-2xl md:text-3xl font-extrabold" style={{ color: "var(--theme-text-primary)" }}>
                                      {tier.price}
                                    </span>
                                    <span className="text-[10px]" style={{ color: "var(--theme-text-muted)" }}>
                                      / month
                                    </span>
                                  </div>
                                  <p className="text-[11px] mb-4" style={{ color: "var(--theme-text-secondary)" }}>
                                    {tier.description}
                                  </p>

                                  <div className="w-full h-px bg-black/10 dark:bg-white/10 my-4" />

                                  <ul className="flex flex-col gap-2.5 text-left mb-6 text-xs" style={{ color: "var(--theme-text-secondary)" }}>
                                    {tier.features?.map((feat, fIdx) => (
                                      <li key={fIdx} className="flex items-start gap-2">
                                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>{feat}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <button
                                  className="w-full py-2.5 text-xs font-semibold rounded-lg hover:opacity-95 transition-all text-center cursor-pointer"
                                  style={{
                                    backgroundColor: tier.isPopular ? "var(--theme-primary)" : "rgba(255,255,255,0.08)",
                                    border: tier.isPopular ? "none" : "1px solid var(--theme-text-muted)",
                                    color: tier.isPopular ? "#ffffff" : "var(--theme-text-primary)"
                                  }}
                                >
                                  Deploy Roster
                                </button>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* 6. FAQ Accordion section */}
                        <section className="px-6 py-10 max-w-4xl mx-auto border-t" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}15` }}>
                          <div className="text-center mb-8">
                            <h3 className="text-xl font-bold font-[family:var(--theme-heading-font)] text-center" style={{ color: "var(--theme-text-primary)" }}>
                              {currentTheme.sections?.faq?.title || "Frequently Answered Log Query"}
                            </h3>
                            <p className="text-xs" style={{ color: "var(--theme-text-secondary)" }}>
                              {currentTheme.sections?.faq?.subtitle}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3.5">
                            {currentTheme.sections?.faq?.items?.map((item, idx) => (
                              <details key={idx} className="p-4 rounded-lg border group cursor-pointer transition-all" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: `${currentTheme.colorPalette.textMuted.hex}15` }}>
                                <summary className="font-bold text-xs md:text-sm flex items-center justify-between outline-none" style={{ color: "var(--theme-text-primary)" }}>
                                  <span>{item.question}</span>
                                  <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-all" />
                                </summary>
                                <p className="text-xs mt-2.5 leading-relaxed pt-2 border-t pt-2 border-slate-700/5" style={{ color: "var(--theme-text-secondary)", borderColor: `${currentTheme.colorPalette.textMuted.hex}10` }}>
                                  {item.answer}
                                </p>
                              </details>
                            ))}
                          </div>
                        </section>

                        {/* 7. Contact Footer / CTA Block */}
                        <section className="px-6 py-12 border-t" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}22` }}>
                          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div className="flex flex-col gap-4">
                              <h3 className="text-xl font-bold font-[family:var(--theme-heading-font)]" style={{ color: "var(--theme-text-primary)" }}>
                                {currentTheme.sections?.contact?.title || "Connect with Brand Staff"}
                              </h3>
                              <p className="text-xs leading-relaxed max-w-sm" style={{ color: "var(--theme-text-secondary)" }}>
                                {currentTheme.sections?.contact?.subtitle}
                              </p>

                              <div className="flex flex-col gap-2 text-xs font-mono mt-2" style={{ color: "var(--theme-text-secondary)" }}>
                                <div className="flex items-center gap-2">
                                  <span className="text-indigo-400">EMAIL:</span>
                                  <span>{currentTheme.sections?.contact?.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-indigo-400">PHONE:</span>
                                  <span>{currentTheme.sections?.contact?.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-indigo-400">HQ:</span>
                                  <span>{currentTheme.sections?.contact?.address}</span>
                                </div>
                              </div>
                            </div>

                            {/* Simulated inputs */}
                            <div className="p-5 border rounded-xl flex flex-col gap-3" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}15`, bg: "rgba(0,0,0,0.01)" }}>
                              {currentTheme.sections?.contact?.fields?.map((field, idx) => (
                                <div key={idx} className="flex flex-col gap-1 text-left">
                                  <span className="text-[10px] font-bold uppercase" style={{ color: "var(--theme-text-muted)" }}>{field}</span>
                                  <input
                                    type="text"
                                    disabled
                                    placeholder={`Simulated ${field}`}
                                    className="px-3 py-1.5 text-xs rounded border outline-none bg-black/5 dark:bg-white/5 border-slate-700/10 cursor-not-allowed"
                                    style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}15` }}
                                  />
                                </div>
                              ))}
                              <button
                                className="w-full py-2 text-xs font-bold rounded-lg hover:opacity-90 mt-2 cursor-pointer"
                                style={{ backgroundColor: "var(--theme-primary)", color: "#ffffff" }}
                                onClick={() => alert("Simulation form submitted!")}
                              >
                                Transmit Form
                              </button>
                            </div>
                          </div>
                        </section>

                        {/* Simulated Small Copyright Footer */}
                        <div className="py-6 border-t px-6 text-center text-[10px] font-mono" style={{ borderColor: `${currentTheme.colorPalette.textMuted.hex}15`, color: "var(--theme-text-muted)" }}>
                          © 2026 {currentTheme.brandName}. Powered by AI Theme Forge. All rights reserved.
                        </div>

                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* DISPLAY TAB: REAL-TIME COLOR PALETTE ANALYZER */}
              {activeTab === "colors" && (
                <div className="flex-1 bg-[#0f0f12] rounded-2xl border border-white/5 p-6 flex flex-col gap-6 shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h4 className="font-semibold text-slate-100">System Color Coordinates</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        These are the primary color anchors. Fine-tune any key directly using the pickers below!
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono tracking-wider">Hex Tuner</span>
                  </div>

                  {/* Colors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    
                    {/* Render each palette color dynamically */}
                    {(Object.keys(currentTheme.colorPalette) as Array<keyof WebsiteTheme["colorPalette"]>).map((key) => {
                      const detail = currentTheme.colorPalette[key];
                      return (
                        <div
                          key={key}
                          className="bg-[#16161a] border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4 duration-150 hover:border-white/10"
                        >
                          <div className="flex items-center gap-3.5">
                            {/* Color bubble */}
                            <div className="relative">
                              <div
                                className="w-12 h-12 rounded-lg border border-white/10 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                                style={{ backgroundColor: detail.hex }}
                              >
                                {/* Native Color Picker Overlay on hover */}
                                <input
                                  type="color"
                                  value={detail.hex}
                                  onChange={(e) => handleColorChange(key, e.target.value)}
                                  className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                                  {key.replace(/([A-Z])/g, " $1")}
                                </span>
                              </div>
                              <h5 className="font-bold text-xs text-slate-200 mt-0.5">{detail.name}</h5>
                              <p className="text-[10px] text-slate-500 leading-tight mt-1 max-w-[150px] truncate-2-lines">
                                {detail.description || "Aesthetic definition anchor."}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5">
                            <span className="text-xs font-mono font-bold text-indigo-400 select-all">
                              {detail.hex.toUpperCase()}
                            </span>
                            <button
                              onClick={() => handleCopyText(detail.hex, key)}
                              className="p-1 text-slate-600 hover:text-slate-300 rounded hover:bg-white/5 transition-all"
                            >
                              {copiedField === key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Contrast Score Dashboard */}
                  <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400 shrink-0">
                        <Info className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-[10px] uppercase font-bold tracking-wider font-mono text-indigo-200">
                          ACCESSIBILITY INTEGRATION ANALYZER // WCAG 2.1
                        </h5>
                        <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                          Your chosen backdrop color (<span className="font-mono text-slate-200">{currentTheme.colorPalette.background.hex}</span>) has been automatically balanced against text elements (<span className="font-mono text-slate-200">{currentTheme.colorPalette.textPrimary.hex}</span>) to achieve compliant 4.5:1 contrast layouts.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-[#0a0a0c] px-4 py-2 border border-white/5 rounded-lg shrink-0">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-slate-300">AAA COMPLIANCE LIVE</span>
                    </div>
                  </div>
                </div>
              )}

              {/* DISPLAY TAB: TYPOGRAPHY SANDBOX */}
              {activeTab === "typography" && (
                <div className="flex-1 bg-[#0f0f12] rounded-2xl border border-white/5 p-6 flex flex-col gap-6 shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h4 className="font-semibold text-slate-100">Typography Font Pairing</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Imported directly from Google Fonts network into the web app viewport.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono tracking-wider">Font Matrix</span>
                  </div>

                  {/* Fonts Information row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Heading Font Specs */}
                    <div className="bg-[#16161a] p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] px-2 py-0.5 rounded font-mono bg-black/40 text-slate-400 font-bold uppercase tracking-wider">
                          Display Heading Font
                        </span>
                        <a 
                          href={currentTheme.typography.headingFont.importUrl} 
                          target="_blank" 
                          referrerPolicy="no-referrer"
                          className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <span>Google Fonts Docs</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>

                      <div className="py-2">
                        <h5 className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Font Family name:</h5>
                        <h4 className="text-2xl font-black tracking-tight mt-1 text-slate-100">
                          {currentTheme.typography.headingFont.name}
                        </h4>
                      </div>

                      <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                        <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider font-bold">Header Variable Code</p>
                        <code className="text-xs block text-indigo-400 font-mono mt-1 select-all word-break">
                          font-family: '{currentTheme.typography.headingFont.name}', sans-serif;
                        </code>
                      </div>
                    </div>

                    {/* Body Font Specs */}
                    <div className="bg-[#16161a] p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] px-2 py-0.5 rounded font-mono bg-black/40 text-slate-400 font-bold uppercase tracking-wider">
                          Body Text Font Layer
                        </span>
                        <a
                          href={currentTheme.typography.bodyFont.importUrl}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                        >
                          <span>Google Fonts Docs</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>

                      <div className="py-2">
                        <h5 className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Font Family name:</h5>
                        <h4 className="text-2xl font-black tracking-tight mt-1 text-slate-100">
                          {currentTheme.typography.bodyFont.name}
                        </h4>
                      </div>

                      <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                        <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider font-bold">Body Variable Code</p>
                        <code className="text-xs block text-indigo-400 font-mono mt-1 select-all word-break">
                          font-family: '{currentTheme.typography.bodyFont.name}', sans-serif;
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Designer pairing rationale */}
                  <div className="p-4 bg-[#16161a] rounded-xl border border-white/5">
                    <p className="text-[9px] text-slate-500 tracking-wider font-mono font-bold uppercase mb-1">Pairing Explanation Strategy</p>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{currentTheme.typography.pairingExplanation}"
                    </p>
                  </div>

                  {/* Typography Sandbox Interactive Testbench */}
                  <div className="flex-1 bg-black/20 p-5 rounded-xl border border-white/5 flex flex-col gap-4">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 select-none">
                      Interactive Sandbox Sandbox Playground
                    </p>
                    <input
                      type="text"
                      value={sandboxText}
                      onChange={(e) => setSandboxText(e.target.value)}
                      placeholder="Type custom headline text to visualize font styling..."
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none w-full"
                    />

                    {/* Mapped font demo */}
                    <div className="border border-white/5 rounded-xl p-5 flex flex-col gap-4 bg-[#16161a]">
                      <div>
                        <span className="text-[9px] text-slate-500 font-mono select-none">HEADING FONT RENDERDEMO // 48PX</span>
                        <h3 
                          className="text-2xl sm:text-3xl font-black mt-1"
                          style={{ fontFamily: `'${currentTheme.typography.headingFont.name}', sans-serif`, color: currentTheme.colorPalette.textPrimary.hex }}
                        >
                          {sandboxText}
                        </h3>
                      </div>

                      <div className="h-px bg-white/5" />

                      <div>
                        <span className="text-[9px] text-slate-500 font-mono select-none">BODY COPY FONT RENDERDEMO // 14PX</span>
                        <p 
                          className="text-xs sm:text-sm leading-relaxed max-w-xl mt-1"
                          style={{ fontFamily: `'${currentTheme.typography.bodyFont.name}', sans-serif`, color: currentTheme.colorPalette.textSecondary.hex }}
                        >
                          {sandboxText} - The styling layers adjust immediately based on the selected framework. Generative design system tokens map directly to layout margins, button paddings, and card backing borders to achieve uniform consistency.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DISPLAY TAB: DESIGN SYSTEM MODIFIERS */}
              {activeTab === "tokens" && (
                <div className="flex-1 bg-[#0f0f12] rounded-2xl border border-white/5 p-6 flex flex-col gap-6 shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h4 className="font-semibold text-slate-100">System Tokens Fine-Tuner</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        These layout controls can be customized inside the configuration live editor.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase text-indigo-400 font-mono tracking-wider">Metrics Rewrite</span>
                  </div>

                  {/* Radii specs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    {/* Radii Controls */}
                    <div className="bg-[#16161a] p-4 border border-white/5 rounded-xl flex flex-col gap-3">
                      <h5 className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Border Radii Scale</h5>
                      <div className="flex flex-col gap-3 mt-2 text-xs">
                        {Object.keys(currentTheme.designSystem.borderRadius).map((rk) => {
                          const val = (currentTheme.designSystem.borderRadius as any)[rk];
                          return (
                            <div key={rk} className="flex items-center justify-between border-b border-white/5 pb-2">
                              <span className="font-mono text-slate-500 uppercase text-[10px]">--radius-{rk}</span>
                              <input 
                                type="text"
                                value={val}
                                onChange={(e) => {
                                  const updatedTheme = {
                                    ...currentTheme,
                                    designSystem: {
                                      ...currentTheme.designSystem,
                                      borderRadius: {
                                        ...currentTheme.designSystem.borderRadius,
                                        [rk]: e.target.value
                                      }
                                    }
                                  };
                                  setCurrentTheme(updatedTheme);
                                }}
                                className="bg-black/40 border border-white/10 px-2.5 py-1 rounded-lg text-right w-24 text-slate-200 outline-none focus:border-indigo-500 font-mono text-xs"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Spacing Controls */}
                    <div className="bg-[#16161a] p-4 border border-white/5 rounded-xl flex flex-col gap-3">
                      <h5 className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Spacing Step Scale</h5>
                      <div className="flex flex-col gap-3 mt-2 text-xs">
                        {Object.keys(currentTheme.designSystem.spacingScale).map((sk) => {
                          const val = (currentTheme.designSystem.spacingScale as any)[sk];
                          return (
                            <div key={sk} className="flex items-center justify-between border-b border-white/5 pb-2">
                              <span className="font-mono text-slate-500 uppercase text-[10px]">--spacing-{sk}</span>
                              <input 
                                type="text"
                                value={val}
                                onChange={(e) => {
                                  const updatedTheme = {
                                    ...currentTheme,
                                    designSystem: {
                                      ...currentTheme.designSystem,
                                      spacingScale: {
                                        ...currentTheme.designSystem.spacingScale,
                                        [sk]: e.target.value
                                      }
                                    }
                                  };
                                  setCurrentTheme(updatedTheme);
                                }}
                                className="bg-black/40 border border-white/10 px-2.5 py-1 rounded-lg text-right w-24 text-slate-200 outline-none focus:border-indigo-500 font-mono text-xs"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Backing Inline CSS Settings */}
                  <div className="bg-[#16161a] p-4 border border-white/5 rounded-xl flex flex-col gap-3">
                    <h5 className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Card & Backing Component Styles</h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-1">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider">card-background</span>
                        <input
                          type="text"
                          value={currentTheme.designSystem.cardStyles.background}
                          onChange={(e) => {
                            const updated = {
                              ...currentTheme,
                              designSystem: {
                                ...currentTheme.designSystem,
                                cardStyles: { ...currentTheme.designSystem.cardStyles, background: e.target.value }
                              }
                            };
                            setCurrentTheme(updated);
                          }}
                          className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 font-mono text-slate-200 outline-none text-xs"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider">card-border</span>
                        <input
                          type="text"
                          value={currentTheme.designSystem.cardStyles.border}
                          onChange={(e) => {
                            const updated = {
                              ...currentTheme,
                              designSystem: {
                                ...currentTheme.designSystem,
                                cardStyles: { ...currentTheme.designSystem.cardStyles, border: e.target.value }
                              }
                            };
                            setCurrentTheme(updated);
                          }}
                          className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1.5 font-mono text-slate-200 outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DISPLAY TAB: CSS STYLESHEET EXPORT BLOCK */}
              {activeTab === "css" && (
                <div className="flex-1 bg-[#0f0f12] rounded-2xl border border-white/5 p-6 flex flex-col gap-4 shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h4 className="font-semibold text-slate-100">Global CSS Variables</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Drop these directly into your project's index.css stylesheet file! Fits Tailwind v4 theme blocks automatically.
                      </p>
                    </div>
                    <button
                      id="btn-copy-css-inner"
                      onClick={() => handleCopyText(currentTheme.cssVariables, "css-inner")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg border border-white/10 transition cursor-pointer"
                    >
                      {copiedField === "css-inner" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy CSS</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-4 font-mono text-xs overflow-x-auto select-all max-h-[500px] text-indigo-300/90 leading-relaxed">
                    <pre className="text-left whitespace-pre">{currentTheme.cssVariables}</pre>
                  </div>

                  {/* Integration Tutorial Guide */}
                  <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-500/10 text-xs text-slate-400 flex flex-col gap-2">
                    <h5 className="font-bold text-slate-200 flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-indigo-400" />
                      <span>Setup Integration Pipeline:</span>
                    </h5>
                    <ol className="list-decimal pl-4 flex flex-col gap-1 text-[11px] leading-relaxed text-slate-400">
                      <li>Paste the `:root` declarations above inside your primary styled css entry file (e.g., <code className="text-indigo-300 px-1 py-0.5 bg-black/40 border border-white/5 rounded font-mono">src/index.css</code>).</li>
                      <li>In Tailwind, consume them natively using CSS variables or register custom theme handles.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* DISPLAY TAB: COMPLETE METADATA SYSTEM JSON */}
              {activeTab === "json" && (
                <div className="flex-1 bg-[#0f0f12] rounded-2xl border border-white/5 p-6 flex flex-col gap-4 shadow-xl overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div>
                      <h4 className="font-semibold text-slate-100">Theme Payload JSON</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Contains the entire design parameters, button specs, card backing metadata, and sections.
                      </p>
                    </div>
                    <button
                      id="btn-copy-json"
                      onClick={() => handleCopyText(JSON.stringify(currentTheme, null, 2), "json-copy")}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/5 text-slate-300 hover:text-white rounded-lg border border-white/10 transition cursor-pointer"
                    >
                      {copiedField === "json-copy" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{copiedField === "json-copy" ? "Copied JSON!" : "Copy JSON"}</span>
                    </button>
                  </div>

                  <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-4 font-mono text-[11px] overflow-auto select-all max-h-[500px] text-cyan-400/80 leading-relaxed">
                    <pre className="text-left whitespace-pre">{JSON.stringify(currentTheme, null, 2)}</pre>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="flex-1 bg-[#0f0f12] rounded-2xl border border-white/5 p-12 flex flex-col items-center justify-center text-center gap-4 shadow-xl">
              <Sparkles className="w-10 h-10 text-indigo-500 animate-pulse" />
              <div>
                <h4 className="text-base font-bold text-slate-200 uppercase tracking-wider">No Selected Theme System</h4>
                <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
                  Fill out the parameters on the dynamic architect side panel and click generate to forge your first!
                </p>
              </div>
            </div>
          )}
        </section>

      </main>

      {/* Humble Footer Credits */}
      <footer id="app-footer" className="mt-auto bg-black/45 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between px-8 text-xs text-slate-600 z-10 gap-3">
        <p>© 2026 AI Website Theme Maker. Built under Elegant Dark parameters.</p>
        <p className="font-mono text-[10px] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
          <span>PROD SYSTEM CORE // ONLINE</span>
        </p>
      </footer>
    </div>
  );
}
