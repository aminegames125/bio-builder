// Load and validate client configuration
export const loadClientConfig = async (clientId = null) => {
    try {
        // Use import.meta.glob to find all client config files
        // Relative path from src/utils/configLoader.js to src/clients
        const clientJsons = import.meta.glob('../clients/*.json');
        const clientMdxs = import.meta.glob('../clients/*.mdx', { query: '?raw', import: 'default' });

        let configModule;

        if (clientId) {
            // Try to find the specific client file
            const jsonPath = `../clients/${clientId}.json`;
            const mdxPath = `../clients/${clientId}.mdx`;
            // Prefer MDX first
            if (clientMdxs[mdxPath]) {
                const raw = await clientMdxs[mdxPath]();
                const { parseMDXClient } = await import('./mdxParser.js');
                return parseMDXClient(raw);
            } else if (clientJsons[jsonPath]) {
                configModule = await clientJsons[jsonPath]();
            } else {
                console.warn(`Client config not found: ${clientId}`);
                return null;
            }
        } else {
            // Load default config if no clientId provided
            // You might want to define a default client or use a fallback
            const defaultJson = '../clients/default.json';
            const defaultMdx = '../clients/default.mdx';
            // Prefer MDX first
            if (clientMdxs[defaultMdx]) {
                const raw = await clientMdxs[defaultMdx]();
                const { parseMDXClient } = await import('./mdxParser.js');
                return parseMDXClient(raw);
            } else if (clientJsons[defaultJson]) {
                configModule = await clientJsons[defaultJson]();
            } else {
                // Fallback to internal default if file not found
                return getDefaultConfig();
            }
        }

        const config = configModule.default || configModule;

        // Validate required fields
        validateConfig(config);

        return config;
    } catch (error) {
        console.error('Failed to load client configuration:', error);
        // Return default fallback config
        return getDefaultConfig();
    }
};

// Validate configuration structure
export const validateConfig = (config) => {
    const required = ['client_id', 'profile', 'theme'];

    for (const field of required) {
        if (!config[field]) {
            console.warn(`Missing field: ${field}, using defaults`);
        }
    }

    // Validate profile structure
    if (!config.profile?.name) {
        console.warn('Profile name is missing');
    }

    // Validate theme structure
    if (!config.theme?.template) {
        console.warn('Theme template is missing');
    }

    return true;
};

// Default fallback configuration
const getDefaultConfig = () => ({
    client_id: 'default',
    profile: {
        name: 'Your Name',
        title: 'Your Title',
        bio: 'Your bio description',
        avatar: 'https://i.pravatar.cc/300',
        stats: []
    },
    theme: {
        template: 'centered',
        colors: {
            primary: {
                50: '#E6F0FF',
                500: '#0066FF',
                600: '#0052CC'
            },
            secondary: {
                50: '#F5E6FF',
                500: '#9B00FF',
                600: '#7C00CC'
            }
        },
        typography: {
            heading_font: 'Poppins',
            body_font: 'Inter'
        },
        styling: {
            border_radius: '2xl',
            card_style: 'glass',
            shadow_intensity: 'xl'
        }
    },
    layout: {
        type: 'centered',
        max_width: 'lg',
        show_profile_stats: false,
        show_social_icons: true
    },
    animations: {
        enabled: true,
        entry_animation: 'fade-in-up',
        hover_animation: 'hover-lift',
        animation_speed: 'medium'
    },
    content_blocks: [],
    social_links: [],
    seo: {
        title: 'Bio Page',
        description: 'My bio page'
    }
});
