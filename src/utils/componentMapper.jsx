import React from 'react';

// Component map will be populated as we create components
const componentMap = {};

// Register a component
export const registerComponent = (type, Component) => {
    componentMap[type] = Component;
};

// Render a single content block based on JSON type
export const renderBlock = (block, index) => {
    if (block.enabled === false) return null;

    const Component = componentMap[block.type];

    if (!Component) {
        console.warn(`Unknown block type: ${block.type}`);
        return null;
    }

    return <Component key={block.id || index} {...block} />;
};

// Render all content blocks
export const renderContentBlocks = (blocks) => {
    if (!Array.isArray(blocks)) {
        console.warn('Content blocks must be an array');
        return null;
    }

    return blocks.map((block, index) => renderBlock(block, index));
};

// Get available block types
export const getAvailableBlockTypes = () => {
    return Object.keys(componentMap);
};

// Export for dynamic component registration
export default componentMap;
