import { useEffect, useState } from 'react';
import { renderContentBlocks } from '../utils/componentMapper';
import { getLayoutComponent } from '../utils/layoutMapper';
import BackgroundPattern from '../components/backgrounds/BackgroundPattern';
import { applyTheme, loadFonts } from '../utils/themeGenerator';

import Footer from '../components/sections/Footer';

const PreviewPage = () => {
    const [config, setConfig] = useState(null);

    const updateConfig = (newConfig) => {
        setConfig(newConfig);
        if (newConfig.theme) {
            applyTheme(newConfig.theme);
            loadFonts(newConfig.theme.typography);

            // Inject CSS variables
            const root = document.documentElement;
            if (newConfig.theme.colors) {
                root.style.setProperty('--color-primary', newConfig.theme.colors.primary);
                root.style.setProperty('--color-secondary', newConfig.theme.colors.secondary);
            }
        }
    };

    useEffect(() => {
        // Initial load from localStorage
        const savedConfig = localStorage.getItem('bio_builder_preview_config');
        if (savedConfig) {
            try {
                const parsed = JSON.parse(savedConfig);
                updateConfig(parsed);
            } catch (e) {
                console.error("Failed to parse preview config", e);
            }
        }

        // Listen for updates from the builder via postMessage (if opened via window.open)
        const handleMessage = (event) => {
            if (event.data?.type === 'BIO_BUILDER_UPDATE') {
                updateConfig(event.data.config);
            }
        };

        // Listen for updates via localStorage (cross-tab/window)
        const handleStorage = (event) => {
            if (event.key === 'bio_builder_preview_config' && event.newValue) {
                try {
                    const parsed = JSON.parse(event.newValue);
                    updateConfig(parsed);
                } catch (e) {
                    console.error("Failed to parse storage update", e);
                }
            }
        };

        window.addEventListener('message', handleMessage);
        window.addEventListener('storage', handleStorage);

        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('storage', handleStorage);
        };
    }, []);

    if (!config) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">⏳</div>
                    <p>Waiting for builder content...</p>
                </div>
            </div>
        );
    }

    const LayoutComponent = getLayoutComponent(config.layout?.type || 'centered');

    return (
        <>
            {config.background && <BackgroundPattern config={config.background} />}
            <LayoutComponent config={config}>
                {renderContentBlocks(config.content_blocks)}
            </LayoutComponent>
        </>
    );
};

export default PreviewPage;
