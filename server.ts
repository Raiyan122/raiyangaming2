import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required in secrets");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    brandName: { type: Type.STRING },
    websiteType: { type: Type.STRING },
    designStyle: { type: Type.STRING },
    industry: { type: Type.STRING },
    colorScheme: { type: Type.STRING },
    targetAudience: { type: Type.STRING },
    colorPalette: {
      type: Type.OBJECT,
      properties: {
        primary: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING, description: "HEX code e.g. #3b82f6" },
            name: { type: Type.STRING, description: "User friendly color name" },
            description: { type: Type.STRING, description: "Aesthetic description of use" }
          },
          required: ["hex", "name", "description"]
        },
        secondary: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING, description: "HEX code e.g. #475569" },
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["hex", "name", "description"]
        },
        accent: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING, description: "HEX code e.g. #f43f5e" },
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["hex", "name", "description"]
        },
        background: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING, description: "HEX code e.g. #0f172a or #ffffff" },
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["hex", "name", "description"]
        },
        textPrimary: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["hex", "name", "description"]
        },
        textSecondary: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["hex", "name", "description"]
        },
        textMuted: {
          type: Type.OBJECT,
          properties: {
            hex: { type: Type.STRING },
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["hex", "name", "description"]
        }
      },
      required: ["primary", "secondary", "accent", "background", "textPrimary", "textSecondary", "textMuted"]
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        headingFont: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Google Font name e.g. Space Grotesk, Playfair Display, Inter" },
            importUrl: { type: Type.STRING, description: "Full google font import URL link like: https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" },
            category: { type: Type.STRING, description: "sans-serif, serif, code, display" }
          },
          required: ["name", "importUrl", "category"]
        },
        bodyFont: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Google Font name e.g. Inter, Outfit, Roboto" },
            importUrl: { type: Type.STRING, description: "Full google font import URL link like: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" },
            category: { type: Type.STRING }
          },
          required: ["name", "importUrl", "category"]
        },
        pairingExplanation: { type: Type.STRING }
      },
      required: ["headingFont", "bodyFont", "pairingExplanation"]
    },
    designSystem: {
      type: Type.OBJECT,
      properties: {
        borderRadius: {
          type: Type.OBJECT,
          properties: {
            sm: { type: Type.STRING },
            md: { type: Type.STRING },
            lg: { type: Type.STRING },
            xl: { type: Type.STRING },
            full: { type: Type.STRING }
          },
          required: ["sm", "md", "lg", "xl", "full"]
        },
        shadows: {
          type: Type.OBJECT,
          properties: {
            sm: { type: Type.STRING },
            md: { type: Type.STRING },
            lg: { type: Type.STRING },
            xl: { type: Type.STRING },
            inner: { type: Type.STRING }
          },
          required: ["sm", "md", "lg", "xl", "inner"]
        },
        spacingScale: {
          type: Type.OBJECT,
          properties: {
            xs: { type: Type.STRING },
            sm: { type: Type.STRING },
            md: { type: Type.STRING },
            lg: { type: Type.STRING },
            xl: { type: Type.STRING },
            xxl: { type: Type.STRING }
          },
          required: ["xs", "sm", "md", "lg", "xl", "xxl"]
        },
        buttonStyles: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "Full CSS inline rules e.g. 'background-color: var(--primary); color: #fff; padding: 0.5rem 1rem;'" },
            secondary: { type: Type.STRING, description: "Full CSS inline rules for secondary buttons" },
            outline: { type: Type.STRING, description: "Full CSS inline rules for outline button" }
          },
          required: ["primary", "secondary", "outline"]
        },
        cardStyles: {
          type: Type.OBJECT,
          properties: {
            border: { type: Type.STRING, description: "CSS border declaration e.g. 1px solid rgba(0,0,0,0.1)" },
            background: { type: Type.STRING, description: "CSS background declaration e.g. rgba(255,255,255,0.05) or #ffffff" },
            padding: { type: Type.STRING, description: "CSS padding e.g. 1.5rem" },
            extraTailwindClasses: { type: Type.STRING, description: "Tailwind classes for rich effects like glassmorphism (backdrop-blur-md) or custom transition" }
          },
          required: ["border", "background", "padding", "extraTailwindClasses"]
        }
      },
      required: ["borderRadius", "shadows", "spacingScale", "buttonStyles", "cardStyles"]
    },
    sections: {
      type: Type.OBJECT,
      properties: {
        hero: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            primaryCta: { type: Type.STRING },
            secondaryCta: { type: Type.STRING }
          },
          required: ["title", "subtitle", "primaryCta", "secondaryCta"]
        },
        features: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING, description: "Name of Lucide icon e.g. Sparkles, Shield, Cpu, Zap, Activity, Users, Globe, Layout, Laptop, MessageSquare, Rocket, Play" }
                },
                required: ["title", "description", "icon"]
              }
            }
          },
          required: ["title", "subtitle", "items"]
        },
        testimonials: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  quote: { type: Type.STRING },
                  authorName: { type: Type.STRING },
                  authorRole: { type: Type.STRING },
                  rating: { type: Type.INTEGER }
                },
                required: ["quote", "authorName", "authorRole", "rating"]
              }
            }
          },
          required: ["title", "subtitle", "items"]
        },
        pricing: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            tiers: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  price: { type: Type.STRING },
                  description: { type: Type.STRING },
                  features: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  isPopular: { type: Type.BOOLEAN }
                },
                required: ["name", "price", "description", "features", "isPopular"]
              }
            }
          },
          required: ["title", "subtitle", "tiers"]
        },
        faq: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING }
                },
                required: ["question", "answer"]
              }
            }
          },
          required: ["title", "subtitle", "items"]
        },
        contact: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subtitle: { type: Type.STRING },
            fields: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            address: { type: Type.STRING }
          },
          required: ["title", "subtitle", "fields", "email", "phone", "address"]
        }
      },
      required: ["hero", "features", "testimonials", "pricing", "faq", "contact"]
    },
    cssVariables: {
      type: Type.STRING,
      description: "CSS block declaring custom properties for the theme inside :root. Format clean, indented, with headings."
    }
  },
  required: [
    "brandName",
    "websiteType",
    "designStyle",
    "industry",
    "colorScheme",
    "targetAudience",
    "colorPalette",
    "typography",
    "designSystem",
    "sections",
    "cssVariables"
  ]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // API Route - Generate Theme
  app.post("/api/generate-theme", async (req, res) => {
    try {
      const { websiteType, brandName, industry, colorScheme, designStyle, targetAudience } = req.body;

      if (!websiteType || !brandName || !industry || !colorScheme || !designStyle) {
        return res.status(400).json({ error: "Missing required selection fields" });
      }

      const client = getGeminiClient();

      const userPrompt = `
        You are a master UI/UX design assistant. Create a stunning, professional, and custom website design system and copy document for:
        - Brand: "${brandName}"
        - Website Type: "${websiteType}"
        - Industry: "${industry}"
        - Preferred Color Scheme: "${colorScheme}"
        - Design Style Concept: "${designStyle}"
        - Target Audience: "${targetAudience || 'General'}"

        Requirements:
        1. Select 2 Google Fonts (Heading and Body Font) with their correct dynamic font importUrl (prefer names like Space Grotesk, Playfair Display, Inter, Outfit, Syne, Cabinet Grotesk, JetBrains Mono, DM Sans, Plus Jakarta Sans). Make sure importUrl is verified Google Fonts stylesheet URLs, including appropriate weights like ':wght@400;500;600;700;800' or appropriate.
        2. Color Palette must feature primary, secondary, accent, background, textPrimary, textSecondary, textMuted. Choose cohesive, beautiful, contrast-rich colors according to the scheme "${colorScheme}". Make sure the colors respect web accessibility (WCAG). Background should match the specified concept: if Light/Glass is requested, the background should be light and secondary components should be glass; if Futuristic/Dark mode, background should be dark.
        3. Design style details must reflect "${designStyle}" (Modern, Minimalist, Luxury, Corporate, Futuristic, Dark Mode, Glassmorphism). Create CSS variables that perfectly represent this.
        4. Sections values (Hero, Features, Testimonials, Pricing, FAQ, Contact) should contain highly realistic marketing copy tailored beautifully to the brand, industry, and target audience. 
           - Provide 3 items for features, and Lucide icon strings from: ['Sparkles', 'Shield', 'Cpu', 'Zap', 'Activity', 'Users', 'Globe', 'Layout', 'Laptop', 'MessageSquare', 'Rocket', 'Play', 'Award', 'Clock', 'ChevronRight', 'Compass'].
           - Provide 2 testimonials.
           - Provide 3 pricing plans.
           - Provide 3 FAQ questions.
        5. Define a superb cssVariables property with clean CSS definitions using :root layout variables, like --color-primary, --color-secondary, --color-bg, --font-heading, --font-body, --radius-md, custom shadows, etc.
      `;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: "You represent the gold-standard of digital web designers in 2026. Your UI suggestions are breathtaking and color coordinates are perfectly balanced.",
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.82
        }
      });

      if (!response.text) {
        throw new Error("No response received from Gemini API");
      }

      const generatedData = JSON.parse(response.text.trim());
      res.json(generatedData);
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate website theme" });
    }
  });

  // Vite Middleware or Static Assets fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
