// ============================================
// BACKGROUND TYPE HELPER
// Maps category names to background type strings
// ============================================

export function getBackgroundType(category) {
    const typeMap = {
        // Gradients
        'Static Gradients': 'gradient',
        'Diagonal Gradients': 'gradient',
        'Radial Gradients': 'gradient',
        'Animated Gradients': 'animated-gradient',

        // Patterns
        'Static Patterns': 'pattern',
        'Animated Patterns': 'animated-pattern',

        // Special types
        'Composite': 'composite',
        'Mesh': 'mesh',
        'Special': 'special'
    };

    return typeMap[category] || 'gradient';
}
