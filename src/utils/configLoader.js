// Load and validate client configuration
export const loadClientConfig = async (clientId = null) => {
    try {
        // Use import.meta.glob to find all client config files
        // Relative path from src/utils/configLoader.js to src/clients/*.json
        const clientConfigs = import.meta.glob('../clients/*.json');

        let configModule;

        if (clientId) {
            // Try to find the specific client file
            const path = `../clients/${clientId}.json`;
            if (clientConfigs[path]) {
                configModule = await clientConfigs[path]();
            } else {
                console.warn(`Client config not found: ${clientId}`);
                return null;
            }
        } else {
            // Load default config if no clientId provided
            // You might want to define a default client or use a fallback
            const defaultPath = '../clients/default.json';
            if (clientConfigs[defaultPath]) {
                configModule = await clientConfigs[defaultPath]();
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
