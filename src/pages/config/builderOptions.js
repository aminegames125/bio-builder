// ============================================
// BLOCK TYPES - All available content blocks organized by category
// ============================================
export const BLOCK_TYPES = {
    'Basic': ['text', 'button', 'divider', 'spacer'],
    'Links & Social': ['link_card', 'share'],
    'Media': ['video_embed', 'music_player', 'gallery', 'carousel', 'image_compare'],
    'Forms': ['contact_form', 'newsletter_signup'],
    'Products & Money': ['product', 'pricing', 'donation', 'nft'],
    'Data Display': ['stats', 'table', 'skill_bar', 'timeline', 'avatar_group', 'testimonial'],
    'Interactive': ['accordion', 'tabs', 'faq', 'code', 'alert', 'list'],
    'Integrations': ['social_feed', 'github_repo', 'calendly', 'qr', 'chat', 'file', 'countdown', 'map']
};

// ============================================
// LAYOUT OPTIONS - All available layouts
// ============================================
export const LAYOUT_OPTIONS = [
    { id: 'centered', name: 'Centered', description: 'Classic centered layout' },
    { id: 'card', name: 'Card', description: 'Content in a floating card' },
    { id: 'split', name: 'Split', description: 'Split screen with fixed profile' },
    { id: 'grid', name: 'Grid', description: 'Masonry grid layout' },
    { id: 'minimal', name: 'Minimal', description: 'Clean, text-focused layout' },
    { id: 'floating', name: 'Floating', description: 'Floating elements effect' },
    { id: 'compact', name: 'Compact', description: 'Dense, mobile-first layout' }
];

// ============================================
// ICON OPTIONS - Popular Lucide icons
// ============================================
export const ICON_OPTIONS = [
    'Heart', 'Star', 'User', 'Mail', 'Phone', 'Globe', 'Link', 'Github', 'Twitter',
    'Instagram', 'Linkedin', 'Facebook', 'Youtube', 'Twitch', 'Music', 'Video',
    'Image', 'Camera', 'MapPin', 'Calendar', 'Clock', 'Award', 'Zap', 'Activity',
    'TrendingUp', 'DollarSign', 'ShoppingCart', 'CreditCard', 'Briefcase', 'File',
    'Folder', 'Code', 'Terminal', 'Cpu', 'Smartphone', 'Laptop', 'Monitor', 'Wifi',
    'Bluetooth', 'Battery', 'Sun', 'Moon', 'Cloud', 'Umbrella', 'Droplets', 'Wind',
    'Flame', 'Smile', 'Frown', 'Meh', 'ThumbsUp', 'ThumbsDown', 'MessageCircle',
    'Send', 'Share', 'Download', 'Upload', 'Search', 'Menu', 'X', 'Check', 'Plus',
    'Minus', 'Settings', 'Info', 'AlertCircle', 'HelpCircle'
];

// ============================================
// ANIMATION OPTIONS - For icons and elements
// ============================================
export const ANIMATION_OPTIONS = [
    'scale', 'bounce', 'rotate', 'pulse', 'shake', 'flip', 'glow', 'spin', 'none'
];

// ============================================
// BACKGROUND OPTIONS - ALL backgrounds from index.css
// ============================================
export const BACKGROUND_OPTIONS = {
    // Static Gradients (Linear)
    'Static Gradients': [
        'bg-gradient-sunset',
        'bg-gradient-ocean',
        'bg-gradient-purple-dream',
        'bg-gradient-neon',
        'bg-gradient-fire',
        'bg-gradient-instagram',
        'bg-gradient-aurora',
        'bg-gradient-cosmic',
        'bg-gradient-tropical',
        'bg-gradient-mint'
    ],

    // Diagonal Gradients
    'Diagonal Gradients': [
        'bg-gradient-diagonal-sunset',
        'bg-gradient-diagonal-ocean',
        'bg-gradient-diagonal-neon'
    ],

    // Radial Gradients
    'Radial Gradients': [
        'bg-gradient-radial-sunset',
        'bg-gradient-radial-ocean',
        'bg-gradient-radial-purple'
    ],

    // Animated Gradients
    'Animated Gradients': [
        'gradient-animated-sunset',
        'gradient-animated-ocean',
        'gradient-animated-neon',
        'gradient-animated-aurora',
        'gradient-animated-instagram',
        'gradient-animated-holographic',
        'gradient-animated-fire',
        'gradient-animated-cosmic'
    ],

    // Static Patterns
    'Static Patterns': [
        'bg-pattern-dots',
        'bg-pattern-dots-sm',
        'bg-pattern-dots-lg',
        'bg-pattern-grid',
        'bg-pattern-grid-sm',
        'bg-pattern-graph',
        'bg-pattern-diagonal-lines',
        'bg-pattern-diagonal-stripes',
        'bg-pattern-checkerboard',
        'bg-pattern-circles'
    ],

    // Animated Patterns
    'Animated Patterns': [
        'bg-pattern-animated-grid',
        'bg-pattern-animated-dots',
        'bg-pattern-pulse-dots',
        'bg-pattern-pulse-grid',
        'bg-pattern-wave-dots',
        'bg-pattern-wave-grid',
        'bg-pattern-slide-stripes',
        'bg-pattern-slide-diagonals',
        'bg-pattern-zoom-dots',
        'bg-pattern-zoom-circles',
        'bg-pattern-rotating-checkerboard',
        'bg-pattern-rainbow-dots',
        'bg-pattern-rainbow-grid',
        'bg-pattern-animated-matrix',
        'bg-pattern-animated-cosmic',
        'bg-pattern-animated-neon-grid'
    ],

    // Composite Backgrounds
    'Composite': [
        'bg-composite-ocean-grid',
        'bg-composite-sunset-dots',
        'bg-composite-neon-stripes',
        'bg-composite-aurora-dots',
        'bg-composite-cosmic-grid',
        'bg-composite-fire-diagonals',
        'bg-composite-instagram-circles',
        'bg-composite-mint-waves',
        'bg-composite-animated-ocean',
        'bg-composite-animated-neon',
        'bg-composite-animated-matrix'
    ],

    // Mesh Gradients
    'Mesh': [
        'bg-mesh-sunset',
        'bg-mesh-ocean',
        'bg-mesh-cosmic'
    ],

    // Special Effects
    'Special': [
        'bg-spotlight',
        'bg-laser-grid',
        'bg-nebula'
    ]
};

// ============================================
// TEXT EFFECTS - ALL text effects from index.css
// ============================================
export const TEXT_EFFECTS = {
    // Basic Gradient Text (Static)
    'Gradient Text': [
        'text-gradient-sunset',
        'text-gradient-ocean',
        'text-gradient-neon',
        'text-gradient-instagram',
        'text-gradient-aurora'
    ],

    // Animated Gradients
    'Animated Gradients': [
        'text-gradient-animated'
    ],

    // Holographic Effects
    'Holographic': [
        'text-holographic-gradient-animated',
        'text-holographic-ultra',
        'text-holographic-chromatic'
    ],

    // Glowing Gradients
    'Glowing': [
        'text-gradient-animated-glow',
        'text-ocean-glow',
        'text-neon-glow',
        'text-fire-glow'
    ],

    // Neon Effects
    'Neon': [
        'text-neon-classic',
        'text-neon-pink',
        'text-neon-green'
    ],

    // 3D Effects
    '3D Effects': [
        'text-3d-gradient',
        'text-extruded'
    ],

    // Shimmer & Metallic
    'Shimmer': [
        'text-liquid-metal',
        'text-diamond-shimmer',
        'text-gold-shimmer'
    ],

    // Cosmic & Space
    'Cosmic': [
        'text-cosmic-nebula',
        'text-starlight',
        'text-galaxy'
    ],

    // Special Effects
    'Special': [
        'text-glitch',
        'text-rainbow-chromatic'
    ]
};

// Flatten text effects for backward compatibility
export const TEXT_EFFECTS_FLAT = Object.values(TEXT_EFFECTS).flat();
