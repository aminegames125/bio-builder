import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Palette, Layers, Settings, ExternalLink, Download, Copy,
    Moon, Sun, Plus, Edit2, Trash2, ChevronUp, ChevronDown,
    LayoutTemplate, Image, Type, Box, Monitor, Smartphone,
    Check, X, HelpCircle, AlertCircle
} from 'lucide-react';

import BackgroundPattern from '../components/backgrounds/BackgroundPattern';
import AnimatedIcon from '../components/icons/AnimatedIcon';
import { BLOCK_TYPES, BACKGROUND_OPTIONS, TEXT_EFFECTS, LAYOUT_OPTIONS, ICON_OPTIONS, ANIMATION_OPTIONS } from './config/builderOptions';
import { getBackgroundType } from './utils/backgroundHelper';
import { getBlockDefaults } from './utils/blockDefaults';

// ============================================
// INITIAL STATE
// ============================================
const INITIAL_CONFIG = {
    client_id: 'my-bio',
    profile: {
        name: 'Your Name',
        name_class: '',
        title: 'Your Title',
        bio: 'Your bio description here',
        avatar: 'https://i.pravatar.cc/300',
        verified: false,
        stats: []
    },
    background: {
        type: 'gradient',
        gradient_class: 'bg-gradient-ocean'
    },
    theme: {
        colors: {
            primary: '#0066FF',
            secondary: '#9B00FF'
        }
    },
    layout: {
        type: 'centered'
    },
    footer: {
        enabled: false,
        copyright_text: '© 2025 My Bio Page'
    },
    content_blocks: []
};

// ============================================
// MAIN COMPONENT
// ============================================
const BioBuilder = () => {
    const [config, setConfig] = useState(INITIAL_CONFIG);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [builderTheme, setBuilderTheme] = useState('dark'); // 'dark' or 'light'
    const [activeTab, setActiveTab] = useState('content'); // 'profile', 'design', 'content', 'settings'

    // Sync config to localStorage for preview window
    useEffect(() => {
        localStorage.setItem('bio_builder_preview_config', JSON.stringify(config));
    }, [config]);

    // Inject Theme Colors as CSS Variables
    useEffect(() => {
        const root = document.documentElement;
        if (config.theme?.colors) {
            root.style.setProperty('--color-primary', config.theme.colors.primary);
            root.style.setProperty('--color-secondary', config.theme.colors.secondary);
        }
    }, [config.theme]);

    const openPreviewWindow = () => {
        window.open('/preview', 'BioPreview', 'width=450,height=800,menubar=no,toolbar=no,location=no,status=no');
    };

    // ============================================
    // UPDATE HANDLERS
    // ============================================

    const updateProfile = (field, value) => {
        setConfig(prev => ({
            ...prev,
            profile: { ...prev.profile, [field]: value }
        }));
    };

    const updateBackground = (category, className) => {
        const type = getBackgroundType(category);

        // Determine the correct property name based on type
        let update = { type };

        if (type === 'mesh') update.mesh_class = className;
        else if (type === 'special') update.special_class = className;
        else if (type === 'animated-pattern') update.animated_pattern = className;
        else if (type === 'pattern') update.pattern = className;
        else if (type === 'composite') update.composite_class = className;
        else if (type === 'animated-gradient') update.gradient_class = className;
        else update.gradient_class = className; // default gradient

        setConfig(prev => ({
            ...prev,
            background: update
        }));
    };

    const updateLayout = (type) => {
        setConfig(prev => ({
            ...prev,
            layout: { ...prev.layout, type }
        }));
    };

    const updateFooter = (field, value) => {
        setConfig(prev => ({
            ...prev,
            footer: { ...prev.footer, [field]: value }
        }));
    };

    const updateThemeColor = (type, color) => {
        setConfig(prev => ({
            ...prev,
            theme: {
                ...prev.theme,
                colors: { ...prev.theme?.colors, [type]: color }
            }
        }));
    };

    const addBlock = (blockType) => {
        const newBlock = getBlockDefaults(blockType);
        setConfig(prev => ({
            ...prev,
            content_blocks: [...prev.content_blocks, newBlock]
        }));
        setSelectedBlock(config.content_blocks.length);
        setEditMode(true);
    };

    const removeBlock = (index) => {
        setConfig(prev => ({
            ...prev,
            content_blocks: prev.content_blocks.filter((_, i) => i !== index)
        }));
        if (selectedBlock === index) {
            setSelectedBlock(null);
            setEditMode(false);
        }
    };

    const updateBlock = (index, updates) => {
        setConfig(prev => ({
            ...prev,
            content_blocks: prev.content_blocks.map((block, i) =>
                i === index ? { ...block, ...updates } : block
            )
        }));
    };

    const moveBlock = (index, direction) => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= config.content_blocks.length) return;

        setConfig(prev => {
            const blocks = [...prev.content_blocks];
            [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
            return { ...prev, content_blocks: blocks };
        });
        setSelectedBlock(newIndex);
    };

    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${config.client_id}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const copyJSON = () => {
        navigator.clipboard.writeText(JSON.stringify(config, null, 2));
        alert('JSON copied to clipboard!');
    };

    // ============================================
    // STYLES
    // ============================================
    const isDark = builderTheme === 'dark';
    const bgClass = isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900';
    const cardClass = isDark ? 'bg-gray-900/50 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur-xl border-black/5 shadow-lg';
    const inputClass = isDark ? 'bg-black/20 border-white/10 text-white focus:border-blue-500' : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500';
    const headerClass = isDark ? 'bg-gray-900/80 backdrop-blur-xl border-white/10' : 'bg-white/90 backdrop-blur-xl border-black/5 shadow-sm';
    const activeTabClass = 'bg-blue-600 text-white shadow-lg shadow-blue-500/20';
    const inactiveTabClass = isDark ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-500 hover:bg-black/5 hover:text-gray-900';

    // ============================================
    // RENDER
    // ============================================

    return (
        <div className={`min-h-screen transition-colors duration-300 ${bgClass} font-sans`}>

            {/* Header */}
            <motion.div
                className={`fixed top-0 left-0 right-0 border-b z-50 h-16 flex items-center justify-between px-6 ${headerClass}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg shadow-blue-500/20">
                        <Box size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight">Bio Builder Pro</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setBuilderTheme(isDark ? 'light' : 'dark')}
                        className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                        title="Toggle Theme"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <div className={`h-6 w-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>

                    <button
                        onClick={openPreviewWindow}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all font-medium shadow-lg shadow-blue-500/20 hover:scale-105"
                    >
                        <ExternalLink size={16} />
                        <span>Pop-out Preview</span>
                    </button>

                    <button
                        onClick={copyJSON}
                        className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                        title="Copy JSON"
                    >
                        <Copy size={18} />
                    </button>

                    <button
                        onClick={downloadJSON}
                        className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                        title="Download JSON"
                    >
                        <Download size={18} />
                    </button>
                </div>
            </motion.div>

            <div className="pt-20 flex h-screen pb-4 px-4 gap-4">
                {/* Sidebar Navigation */}
                <div className={`w-64 flex flex-col rounded-2xl border overflow-hidden ${cardClass}`}>
                    <div className="p-4 space-y-2">
                        {[
                            { id: 'profile', icon: User, label: 'Profile' },
                            { id: 'design', icon: Palette, label: 'Design' },
                            { id: 'content', icon: Layers, label: 'Content' },
                            { id: 'settings', icon: Settings, label: 'Settings' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id ? activeTabClass : inactiveTabClass
                                    }`}
                            >
                                <tab.icon size={20} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto p-6 border-t border-white/5">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                            <div className="flex items-center gap-2 mb-2 text-blue-500 font-medium">
                                <ExternalLink size={16} />
                                <span className="text-sm">Preview Active</span>
                            </div>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Changes are synced instantly to the pop-out window.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Editor Area */}
                <motion.div
                    className={`flex-1 overflow-y-auto rounded-2xl border ${cardClass} p-8`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="max-w-4xl mx-auto space-y-10">
                        {activeTab === 'profile' && (
                            <ProfileEditor profile={config.profile} onUpdate={updateProfile} theme={builderTheme} />
                        )}

                        {activeTab === 'design' && (
                            <div className="space-y-10">
                                <ThemeEditor theme={config.theme} onUpdate={updateThemeColor} themeMode={builderTheme} />
                                <LayoutSelector currentLayout={config.layout?.type} onSelect={updateLayout} theme={builderTheme} />
                                <BackgroundSelector
                                    currentBg={config.background}
                                    options={BACKGROUND_OPTIONS}
                                    onSelect={updateBackground}
                                    theme={builderTheme}
                                />
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div className="space-y-10">
                                <BlockLibrary blockTypes={BLOCK_TYPES} onAdd={addBlock} theme={builderTheme} />
                                <BlocksList
                                    blocks={config.content_blocks}
                                    selectedBlock={selectedBlock}
                                    onSelect={setSelectedBlock}
                                    onRemove={removeBlock}
                                    onMove={moveBlock}
                                    onEdit={() => setEditMode(true)}
                                    theme={builderTheme}
                                />
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <FooterEditor footer={config.footer} onUpdate={updateFooter} theme={builderTheme} />
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Block Editor Modal */}
            <AnimatePresence>
                {editMode && selectedBlock !== null && (
                    <BlockEditorModal
                        block={config.content_blocks[selectedBlock]}
                        onUpdate={(updates) => updateBlock(selectedBlock, updates)}
                        onClose={() => setEditMode(false)}
                        theme={builderTheme}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// SUBCOMPONENTS
// ============================================

const SectionHeader = ({ icon: Icon, title, theme }) => (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/10">
        <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
            <Icon size={24} />
        </div>
        <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {title}
        </h2>
    </div>
);

const ThemeEditor = ({ theme, onUpdate, themeMode }) => {
    const isDark = themeMode === 'dark';
    const inputClass = isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900';

    return (
        <div>
            <SectionHeader icon={Palette} title="Theme Colors" theme={themeMode} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Primary Color</label>
                    <div className="flex gap-3">
                        <div className="relative size-12 rounded-xl overflow-hidden shadow-lg border border-white/10">
                            <input
                                type="color"
                                value={theme?.colors?.primary || '#0066FF'}
                                onChange={(e) => onUpdate('primary', e.target.value)}
                                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer"
                            />
                        </div>
                        <input
                            type="text"
                            value={theme?.colors?.primary || '#0066FF'}
                            onChange={(e) => onUpdate('primary', e.target.value)}
                            className={`flex-1 px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputClass}`}
                        />
                    </div>
                </div>
                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Secondary Color</label>
                    <div className="flex gap-3">
                        <div className="relative size-12 rounded-xl overflow-hidden shadow-lg border border-white/10">
                            <input
                                type="color"
                                value={theme?.colors?.secondary || '#9B00FF'}
                                onChange={(e) => onUpdate('secondary', e.target.value)}
                                className="absolute inset-0 w-[150%] h-[150%] -top-1/4 -left-1/4 cursor-pointer"
                            />
                        </div>
                        <input
                            type="text"
                            value={theme?.colors?.secondary || '#9B00FF'}
                            onChange={(e) => onUpdate('secondary', e.target.value)}
                            className={`flex-1 px-4 py-2 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputClass}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileEditor = ({ profile, onUpdate, theme }) => {
    const isDark = theme === 'dark';
    const inputClass = isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900';

    return (
        <div>
            <SectionHeader icon={User} title="Profile Details" theme={theme} />
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Display Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => onUpdate('name', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputClass}`}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name Effect</label>
                        <select
                            value={profile.name_class}
                            onChange={(e) => onUpdate('name_class', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputClass}`}
                        >
                            <option value="">None</option>
                            {Object.entries(TEXT_EFFECTS).map(([category, effects]) => (
                                <optgroup key={category} label={category}>
                                    {effects.map(effect => (
                                        <option key={effect} value={effect}>{effect.replace('text-', '').replace(/-/g, ' ')}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Title / Role</label>
                    <input
                        type="text"
                        value={profile.title}
                        onChange={(e) => onUpdate('title', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputClass}`}
                    />
                </div>

                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Bio</label>
                    <textarea
                        value={profile.bio}
                        onChange={(e) => onUpdate('bio', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all h-32 resize-none ${inputClass}`}
                    />
                </div>

                <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Avatar URL</label>
                    <div className="flex gap-4">
                        <img src={profile.avatar} alt="Avatar" className="size-12 rounded-full object-cover border-2 border-white/20" />
                        <input
                            type="text"
                            value={profile.avatar}
                            onChange={(e) => onUpdate('avatar', e.target.value)}
                            className={`flex-1 px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputClass}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const BackgroundSelector = ({ currentBg, options, onSelect, theme }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const isDark = theme === 'dark';
    const buttonClass = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';

    return (
        <div>
            <SectionHeader icon={Image} title="Background" theme={theme} />
            <div className="space-y-4">
                {Object.entries(options).map(([category, backgrounds]) => (
                    <div key={category} className={`border rounded-xl overflow-hidden transition-all ${isDark ? 'border-white/10 bg-black/20' : 'border-black/10 bg-white'}`}>
                        <button
                            onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                            className={`w-full px-5 py-4 flex justify-between items-center ${buttonClass}`}
                        >
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{category}</span>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/60' : 'bg-black/5 text-gray-500'}`}>
                                    {backgrounds.length}
                                </span>
                                {expandedCategory === category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </button>
                        <AnimatePresence>
                            {expandedCategory === category && (
                                <motion.div
                                    className="p-4 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-3"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                >
                                    {backgrounds.map(bg => {
                                        const isActive = Object.values(currentBg).includes(bg);
                                        return (
                                            <button
                                                key={bg}
                                                onClick={() => onSelect(category, bg)}
                                                className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${isActive ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-transparent hover:border-white/20'
                                                    }`}
                                            >
                                                <div className={`absolute inset-0 ${bg}`}></div>
                                                <div className="absolute inset-x-0 bottom-0 bg-black/50 backdrop-blur-sm p-1 text-[10px] text-white text-center truncate">
                                                    {bg.replace('bg-', '').replace('gradient-', '')}
                                                </div>
                                                {isActive && (
                                                    <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5">
                                                        <Check size={12} className="text-white" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LayoutSelector = ({ currentLayout, onSelect, theme }) => {
    const isDark = theme === 'dark';
    const cardClass = isDark ? 'bg-black/20 border-white/10 hover:border-blue-500/50' : 'bg-white border-gray-200 hover:border-blue-500/50';

    return (
        <div>
            <SectionHeader icon={LayoutTemplate} title="Layout" theme={theme} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {LAYOUT_OPTIONS.map(layout => (
                    <button
                        key={layout.id}
                        onClick={() => onSelect(layout.id)}
                        className={`p-5 rounded-xl text-left transition-all border-2 ${cardClass} ${currentLayout === layout.id ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-500/5' : 'border-transparent'
                            }`}
                    >
                        <div className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{layout.name}</div>
                        <div className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{layout.description}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

const BlockLibrary = ({ blockTypes, onAdd, theme }) => {
    const [expandedCategory, setExpandedCategory] = useState('Basic');
    const isDark = theme === 'dark';
    const buttonClass = isDark ? 'hover:bg-white/5' : 'hover:bg-black/5';

    return (
        <div>
            <SectionHeader icon={Plus} title="Add Blocks" theme={theme} />
            <div className="space-y-4">
                {Object.entries(blockTypes).map(([category, types]) => (
                    <div key={category} className={`border rounded-xl overflow-hidden ${isDark ? 'border-white/10 bg-black/20' : 'border-black/10 bg-white'}`}>
                        <button
                            onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                            className={`w-full px-5 py-4 flex justify-between items-center ${buttonClass}`}
                        >
                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{category}</span>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-white/10 text-white/60' : 'bg-black/5 text-gray-500'}`}>
                                    {types.length}
                                </span>
                                {expandedCategory === category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </button>
                        <AnimatePresence>
                            {expandedCategory === category && (
                                <motion.div
                                    className="p-4 border-t border-white/5 flex flex-wrap gap-3"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                >
                                    {types.map(type => (
                                        <button
                                            key={type}
                                            onClick={() => onAdd(type)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isDark
                                                ? 'bg-white/5 hover:bg-blue-600 hover:text-white text-gray-300'
                                                : 'bg-gray-50 border border-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
                                                }`}
                                        >
                                            <Plus size={14} />
                                            {type.replace(/_/g, ' ')}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BlocksList = ({ blocks, selectedBlock, onSelect, onRemove, onMove, onEdit, theme }) => {
    const isDark = theme === 'dark';
    const itemClass = isDark ? 'bg-black/20 border-white/5 hover:border-white/20' : 'bg-white border-gray-200 hover:border-gray-300';

    return (
        <div>
            <SectionHeader icon={Layers} title={`Your Blocks (${blocks.length})`} theme={theme} />
            {blocks.length === 0 ? (
                <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${isDark ? 'border-white/10 text-white/40' : 'border-gray-200 text-gray-400'}`}>
                    <Layers size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No blocks yet</p>
                    <p className="text-sm mt-1">Add some content from the library above!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {blocks.map((block, index) => (
                        <motion.div
                            key={index}
                            className={`flex justify-between items-center p-4 rounded-xl cursor-pointer border transition-all ${itemClass} ${selectedBlock === index ? 'ring-2 ring-blue-500 border-transparent' : ''
                                }`}
                            onClick={() => onSelect(index)}
                            layout
                        >
                            <div className="flex items-center gap-4">
                                <span className={`size-8 flex items-center justify-center rounded-lg text-sm font-bold ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                    {index + 1}
                                </span>
                                <div>
                                    <h3 className={`font-semibold capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {block.type.replace(/_/g, ' ')}
                                    </h3>
                                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {block.title || 'Untitled Block'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-1 mr-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onMove(index, 'up'); }}
                                        disabled={index === 0}
                                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                                    >
                                        <ChevronUp size={14} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onMove(index, 'down'); }}
                                        disabled={index === blocks.length - 1}
                                        className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                                    >
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onEdit(); }}
                                    className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onRemove(index); }}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FooterEditor = ({ footer, onUpdate, theme }) => {
    const isDark = theme === 'dark';
    const inputClass = isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900';

    return (
        <div>
            <SectionHeader icon={LayoutTemplate} title="Footer Settings" theme={theme} />
            <div className="space-y-6">
                <div className={`flex items-center justify-between p-5 rounded-xl border ${isDark ? 'bg-black/20 border-white/10' : 'bg-white border-gray-200'}`}>
                    <div>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Show Footer</h3>
                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Display copyright or branding at the bottom</p>
                    </div>
                    <button
                        onClick={() => onUpdate('enabled', !footer?.enabled)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${footer?.enabled
                            ? 'bg-green-500/20 text-green-500 border border-green-500/40'
                            : 'bg-red-500/20 text-red-500 border border-red-500/40'
                            }`}
                    >
                        {footer?.enabled ? 'ON' : 'OFF'}
                    </button>
                </div>
                {footer?.enabled && (
                    <div className="space-y-2">
                        <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Footer Text</label>
                        <input
                            type="text"
                            value={footer.copyright_text || ''}
                            onChange={(e) => onUpdate('copyright_text', e.target.value)}
                            placeholder="e.g. © 2025 My Name"
                            className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${inputClass}`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const BlockEditorModal = ({ block, onUpdate, onClose, theme }) => {
    const [editedBlock, setEditedBlock] = useState({ ...block });
    const isDark = theme === 'dark';
    const modalBg = isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200';
    const inputClass = isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900';
    const labelClass = isDark ? 'text-gray-300' : 'text-gray-700';

    const handleUpdate = (field, value) => setEditedBlock(prev => ({ ...prev, [field]: value }));
    const handleSave = () => { onUpdate(editedBlock); onClose(); };

    const handleArrayUpdate = (field, index, value) => {
        setEditedBlock(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };
    const handleArrayAdd = (field, defaultValue = '') => {
        setEditedBlock(prev => ({ ...prev, [field]: [...(prev[field] || []), defaultValue] }));
    };
    const handleArrayRemove = (field, index) => {
        setEditedBlock(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
    };

    const renderField = (key, value) => {
        if (key === 'type' || key === 'enabled') return null;

        // Icon Selector
        if (key === 'icon') {
            return (
                <div key={key} className="space-y-2">
                    <label className={`block text-sm font-semibold capitalize ${labelClass}`}>Icon</label>
                    <div className={`grid grid-cols-6 gap-2 p-4 rounded-xl max-h-48 overflow-y-auto ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
                        {ICON_OPTIONS.map(iconName => (
                            <button
                                key={iconName}
                                onClick={() => handleUpdate(key, iconName)}
                                className={`p-2 rounded-lg flex items-center justify-center transition-all ${value === iconName
                                        ? 'bg-blue-500 text-white shadow-lg'
                                        : isDark ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                                    }`}
                                title={iconName}
                            >
                                <AnimatedIcon name={iconName} size={20} />
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // Animation Selector
        if (key === 'animation') {
            return (
                <div key={key} className="space-y-2">
                    <label className={`block text-sm font-semibold capitalize ${labelClass}`}>Animation</label>
                    <div className="flex flex-wrap gap-2">
                        {ANIMATION_OPTIONS.map(anim => (
                            <button
                                key={anim}
                                onClick={() => handleUpdate(key, anim)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${value === anim
                                        ? 'bg-blue-500 text-white'
                                        : isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {anim}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // Boolean toggle
        if (typeof value === 'boolean') {
            return (
                <div key={key} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                    <label className={`text-sm font-semibold capitalize ${labelClass}`}>{key.replace(/_/g, ' ')}</label>
                    <button
                        onClick={() => handleUpdate(key, !value)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${value ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}
                    >
                        {value ? 'ON' : 'OFF'}
                    </button>
                </div>
            );
        }

        // Array editor
        if (Array.isArray(value)) {
            return (
                <div key={key} className="space-y-2">
                    <label className={`block text-sm font-semibold capitalize ${labelClass}`}>{key.replace(/_/g, ' ')}</label>
                    {value.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            {typeof item === 'object' ? (
                                <div className={`flex-1 p-3 rounded-lg space-y-2 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    {Object.entries(item).map(([k, v]) => (
                                        <input
                                            key={k}
                                            type="text"
                                            value={v}
                                            onChange={(e) => handleArrayUpdate(key, index, { ...item, [k]: e.target.value })}
                                            placeholder={k}
                                            className={`w-full px-3 py-2 rounded-lg border outline-none text-sm ${inputClass}`}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleArrayUpdate(key, index, e.target.value)}
                                    className={`flex-1 px-3 py-2 rounded-lg border outline-none text-sm ${inputClass}`}
                                />
                            )}
                            <button onClick={() => handleArrayRemove(key, index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => handleArrayAdd(key, typeof value[0] === 'object' ? { ...value[0] } : '')}
                        className={`w-full py-2 border border-dashed rounded-lg text-sm ${isDark ? 'border-white/20 hover:bg-white/5' : 'border-gray-300 hover:bg-gray-50'}`}
                    >
                        + Add Item
                    </button>
                </div>
            );
        }

        // Textarea for long text
        if (key === 'description' || key === 'bio' || key === 'content') {
            return (
                <div key={key} className="space-y-2">
                    <label className={`block text-sm font-semibold capitalize ${labelClass}`}>{key.replace(/_/g, ' ')}</label>
                    <textarea
                        value={value}
                        onChange={(e) => handleUpdate(key, e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border outline-none h-24 resize-none ${inputClass}`}
                    />
                </div>
            );
        }

        // Default text input
        return (
            <div key={key} className="space-y-2">
                <label className={`block text-sm font-semibold capitalize ${labelClass}`}>{key.replace(/_/g, ' ')}</label>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleUpdate(key, e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border outline-none ${inputClass}`}
                />
            </div>
        );
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className={`rounded-2xl p-8 max-w-2xl w-full max-h-[85vh] flex flex-col border shadow-2xl ${modalBg}`}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Edit2 size={24} className="text-blue-500" />
                        Edit {block.type.replace(/_/g, ' ')}
                    </h2>
                    <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                    {Object.entries(editedBlock).map(([key, value]) => renderField(key, value))}
                </div>

                <div className={`flex gap-3 mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <button
                        onClick={onClose}
                        className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/20 font-bold transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BioBuilder;
