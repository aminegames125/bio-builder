// Helper: Convert Hex to RGB
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Helper: Convert RGB to Hex
const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Helper: Generate a palette from a single color
// This is a simplified version of what tools like Tailwind use
const generatePalette = (baseColor) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return null;

    const { r, g, b } = rgb;

    // Simple lightening/darkening algorithm
    const lighten = (factor) => ({
        r: Math.round(r + (255 - r) * factor),
        g: Math.round(g + (255 - g) * factor),
        b: Math.round(b + (255 - b) * factor)
    });

    const darken = (factor) => ({
        r: Math.round(r * (1 - factor)),
        g: Math.round(g * (1 - factor)),
        b: Math.round(b * (1 - factor))
    });

    const toHex = (c) => rgbToHex(c.r, c.g, c.b);

    return {
        50: toHex(lighten(0.95)),
        100: toHex(lighten(0.9)),
        200: toHex(lighten(0.75)),
        300: toHex(lighten(0.6)),
        400: toHex(lighten(0.3)),
        500: baseColor, // Base color is 500
        600: toHex(darken(0.1)),
        700: toHex(darken(0.25)),
        800: toHex(darken(0.4)),
        900: toHex(darken(0.6)),
        950: toHex(darken(0.8))
    };
};

// Generate CSS variables from JSON config
export const generateThemeCSS = (themeConfig) => {
    const { colors, typography, styling } = themeConfig;

    let cssVars = ':root {\n';

    // Helper to process color (handle both object and string)
    const processColor = (colorData, prefix) => {
        if (!colorData) return;

        if (typeof colorData === 'string') {
            // It's a single hex string, generate palette
            const palette = generatePalette(colorData);
            if (palette) {
                Object.entries(palette).forEach(([key, value]) => {
                    cssVars += `  --color-${prefix}-${key}: ${value};\n`;
                });
            }
        } else {
            // It's already an object (palette)
            Object.entries(colorData).forEach(([key, value]) => {
                cssVars += `  --color-${prefix}-${key}: ${value};\n`;
            });
        }
    };

    // Generate color variables
    processColor(colors.primary, 'primary');
    processColor(colors.secondary, 'secondary');
    processColor(colors.success, 'success');
    processColor(colors.warning, 'warning');
    processColor(colors.error, 'error');

    // Typography variables
    if (typography) {
        if (typography.heading_font) {
            cssVars += `  --font-heading: '${typography.heading_font}', sans-serif;\n`;
        }
        if (typography.body_font) {
            cssVars += `  --font-body: '${typography.body_font}', sans-serif;\n`;
        }
    }

    // Styling variables
    if (styling) {
        const radiusMap = {
            'sm': '0.25rem',
            'md': '0.5rem',
            'lg': '1rem',
            'xl': '1.5rem',
            '2xl': '2rem',
            '3xl': '3rem',
            'full': '9999px'
        };

        if (styling.border_radius && radiusMap[styling.border_radius]) {
            cssVars += `  --radius-custom: ${radiusMap[styling.border_radius]};\n`;
        }

        if (styling.shadow_intensity) {
            cssVars += `  --shadow-custom: var(--shadow-${styling.shadow_intensity});\n`;
        }
    }

    cssVars += '}\n';

    return cssVars;
};

// Inject theme CSS into document
export const applyTheme = (themeConfig) => {
    const css = generateThemeCSS(themeConfig);

    // Create or update style element
    let styleEl = document.getElementById('dynamic-theme');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'dynamic-theme';
        document.head.appendChild(styleEl);
    }

    styleEl.textContent = css;
};

// Load Google Fonts dynamically
export const loadFonts = (typography) => {
    if (!typography) return;

    const fonts = [
        typography.heading_font,
        typography.body_font
    ].filter(Boolean);

    // Remove duplicates
    const uniqueFonts = [...new Set(fonts)];

    uniqueFonts.forEach(font => {
        // Check if font link already exists
        const existingLink = document.querySelector(`link[href*="${font.replace(' ', '+')}"]`);
        if (existingLink) return;

        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}:wght@400;600;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    });
};

// Generate gradient CSS from gradient config
export const generateGradient = (gradient) => {
    if (Array.isArray(gradient)) {
        // Simple array of colors
        return `linear-gradient(135deg, ${gradient.join(', ')})`;
    }

    if (typeof gradient === 'object') {
        // Object with direction and colors
        const direction = gradient.direction || '135deg';
        const colors = gradient.colors || [];
        return `linear-gradient(${direction}, ${colors.join(', ')})`;
    }

    // Predefined gradient names
    const gradientMap = {
        'sunset-blaze': 'linear-gradient(135deg, #FF6B35, #F7931E, #FDC830)',
        'ocean-blue': 'linear-gradient(135deg, #00D4FF, #0099FF, #0061FF)',
        'purple-dream': 'linear-gradient(135deg, #A8EDEA, #B794F6, #8B5CF6)',
        'neon-glow': 'linear-gradient(135deg, #FF00FF, #9D00FF, #00FFFF)'
    };

    return gradientMap[gradient] || 'linear-gradient(135deg, #0066FF, #9B00FF)';
};
