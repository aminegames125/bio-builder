import CenteredLayout from '../components/layouts/CenteredLayout';
import SplitLayout from '../components/layouts/SplitLayout';
import CardLayout from '../components/layouts/CardLayout';
import GridLayout from '../components/layouts/GridLayout';
import MinimalLayout from '../components/layouts/MinimalLayout';
import FloatingLayout from '../components/layouts/FloatingLayout';
import CompactLayout from '../components/layouts/CompactLayout';

export const LAYOUT_MAP = {
    'centered': CenteredLayout,
    'centered_narrow': CenteredLayout,
    'centered_wide': CenteredLayout,
    'split': SplitLayout,
    'card': CardLayout,
    'fullscreen': CenteredLayout,
    'grid': GridLayout,
    'masonry': GridLayout,
    'minimal': MinimalLayout,
    'compact': CompactLayout,
    'floating': FloatingLayout,
    'stack': CenteredLayout,
    'tabs': CenteredLayout,
    'accordion': CenteredLayout,
    'carousel': CenteredLayout
};

export const getLayoutComponent = (layoutType) => {
    return LAYOUT_MAP[layoutType] || CenteredLayout;
};
