import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';

// @ts-expect-error - JS module without types
import { loadClientConfig } from './utils/configLoader';
// @ts-expect-error - JS module without types
import { applyTheme, loadFonts } from './utils/themeGenerator';
// @ts-expect-error - JS module without types
import { renderContentBlocks, registerComponent } from './utils/componentMapper';
// @ts-expect-error - JS module without types
import { LAYOUT_MAP } from './utils/layoutMapper';
// @ts-expect-error - JS module without types
import BackgroundPattern from './components/backgrounds/BackgroundPattern';
// @ts-expect-error - JS module without types
import BioBuilder from './pages/BioBuilder';
// @ts-expect-error - JS module without types
import PreviewPage from './pages/PreviewPage';

// Import all block components
// @ts-expect-error - JS module without types
import LinkCard from './components/blocks/LinkCard';
// @ts-expect-error - JS module without types
import VideoEmbed from './components/blocks/VideoEmbed';
// @ts-expect-error - JS module without types
import ContactForm from './components/blocks/ContactForm';
// @ts-expect-error - JS module without types
import Gallery from './components/blocks/Gallery';
// @ts-expect-error - JS module without types
import Newsletter from './components/blocks/Newsletter';
// @ts-expect-error - JS module without types
import MusicBlock from './components/blocks/MusicBlock';
// @ts-expect-error - JS module without types
import MapBlock from './components/blocks/MapBlock';
// @ts-expect-error - JS module without types
import CountdownBlock from './components/blocks/CountdownBlock';
// @ts-expect-error - JS module without types
import FAQBlock from './components/blocks/FAQBlock';
// @ts-expect-error - JS module without types
import TextBlock from './components/blocks/TextBlock';
import * as LucideIcons from 'lucide-react';
import { mapIconName } from './utils/iconMapper';
// @ts-expect-error - JS module without types
import DividerBlock from './components/blocks/DividerBlock';
// @ts-expect-error - JS module without types
import ShareBlock from './components/blocks/ShareBlock';
// @ts-expect-error - JS module without types
import ProductBlock from './components/blocks/ProductBlock';
// @ts-expect-error - JS module without types
import PricingBlock from './components/blocks/PricingBlock';
// @ts-expect-error - JS module without types
import HeroBlock from './components/blocks/HeroBlock';
// @ts-expect-error - JS module without types
import DonationBlock from './components/blocks/DonationBlock';
// @ts-expect-error - JS module without types
import SocialFeedBlock from './components/blocks/SocialFeedBlock';
// @ts-expect-error - JS module without types
import NFTBlock from './components/blocks/NFTBlock';
// @ts-expect-error - JS module without types
import FileBlock from './components/blocks/FileBlock';
// @ts-expect-error - JS module without types
import QRBlock from './components/blocks/QRBlock';
// @ts-expect-error - JS module without types
import ChatBlock from './components/blocks/ChatBlock';
// @ts-expect-error - JS module without types
import TestimonialBlock from './components/blocks/TestimonialBlock';
// @ts-expect-error - JS module without types
import ListBlock from './components/blocks/ListBlock';
// @ts-expect-error - JS module without types
import CodeBlock from './components/blocks/CodeBlock';
// @ts-expect-error - JS module without types
import AlertBlock from './components/blocks/AlertBlock';
// @ts-expect-error - JS module without types
import AccordionBlock from './components/blocks/AccordionBlock';
// @ts-expect-error - JS module without types
import TabsBlock from './components/blocks/TabsBlock';
// @ts-expect-error - JS module without types
import CarouselBlock from './components/blocks/CarouselBlock';
// @ts-expect-error - JS module without types
import TableBlock from './components/blocks/TableBlock';
// @ts-expect-error - JS module without types
import StatsBlock from './components/blocks/StatsBlock';
// @ts-expect-error - JS module without types
import TimelineBlock from './components/blocks/TimelineBlock';
// @ts-expect-error - JS module without types
import SkillBarBlock from './components/blocks/SkillBarBlock';
// @ts-expect-error - JS module without types
import AvatarGroupBlock from './components/blocks/AvatarGroupBlock';
// @ts-expect-error - JS module without types
import ImageCompareBlock from './components/blocks/ImageCompareBlock';
// @ts-expect-error - JS module without types
import GithubRepoBlock from './components/blocks/GithubRepoBlock';
// @ts-expect-error - JS module without types
import CalendlyBlock from './components/blocks/CalendlyBlock';
// @ts-expect-error - JS module without types
import ButtonBlock from './components/blocks/ButtonBlock';
// @ts-expect-error - JS module without types
import SpacerBlock from './components/blocks/SpacerBlock';

// Register all blocks
registerComponent('link_card', LinkCard);
registerComponent('video_embed', VideoEmbed);
registerComponent('contact_form', ContactForm);
registerComponent('gallery', Gallery);
registerComponent('newsletter_signup', Newsletter);
registerComponent('music_player', MusicBlock);
registerComponent('map', MapBlock);
registerComponent('countdown', CountdownBlock);
registerComponent('faq', FAQBlock);
type MDXTextProps = {
    content?: string;
    style?: 'h1' | 'h2' | 'h3' | 'paragraph' | 'quote' | 'caption';
    align?: 'left' | 'center' | 'right' | 'justify';
    className?: string;
    from_markdown?: boolean;
    icon?: string;
    iconPosition?: 'before' | 'after';
    iconSize?: number;
    iconColor?: string;
    color?: string;
};
const MDXText = (props: MDXTextProps) => {
    const styles: Record<string, string> = {
        h1: 'text-3xl font-bold mb-4',
        h2: 'text-2xl font-bold mb-3',
        h3: 'text-xl font-semibold mb-2',
        paragraph: 'text-base leading-relaxed mb-4',
        quote: 'text-lg italic border-l-4 border-primary-500 pl-4 py-2 my-4 bg-gray-50 rounded-r-lg',
        caption: 'text-sm text-gray-500 uppercase tracking-wide'
    };
    const alignment: Record<string, string> = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
    };
    const renderInline = (s: string) => {
        const nodes: (string | JSX.Element)[] = [];
        let remaining = s;
        const regex = /(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(__(.+?)__)|(\*(.+?)\*)|(_(.+?)_)|(~~(.+?)~~)/;
        while (remaining.length) {
            const m = remaining.match(regex);
            if (!m) { nodes.push(remaining); break; }
            const idx = m.index ?? 0;
            if (idx > 0) nodes.push(remaining.slice(0, idx));
            const full = m[0];
            if (m[1]) { // link
                const text = m[2];
                const url = m[3];
                nodes.push(<a href={url} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">{text}</a>);
            } else if (m[4]) { // code
                const code = m[5];
                nodes.push(<code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">{code}</code>);
            } else if (m[6]) { // **bold**
                nodes.push(<strong>{m[7]}</strong>);
            } else if (m[8]) { // __bold__
                nodes.push(<strong>{m[9]}</strong>);
            } else if (m[10]) { // *italic*
                nodes.push(<em>{m[11]}</em>);
            } else if (m[12]) { // _italic_
                nodes.push(<em>{m[13]}</em>);
            } else if (m[14]) { // ~~strike~~
                nodes.push(<del>{m[15]}</del>);
            }
            remaining = remaining.slice(idx + full.length);
        }
        return nodes;
    };
    if (!props.from_markdown) return <TextBlock {...props} />;
    const getIconSize = () => {
        if (props.iconSize) return props.iconSize;
        switch (props.style) {
            case 'h1': return 32;
            case 'h2': return 24;
            case 'h3': return 20;
            default: return 18;
        }
    };
    const lucideIconName = props.icon ? mapIconName(props.icon) : null;
    const IconComponent: ComponentType<SVGProps<SVGSVGElement>> | null = lucideIconName ? (LucideIcons as unknown as Record<string, ComponentType<SVGProps<SVGSVGElement>> >)[lucideIconName] : null;
    const cls = `${styles[props.style || 'paragraph']} ${alignment[props.align || 'left']} ${props.className || ''}`.trim();
    const iconEl = IconComponent ? (
        <IconComponent
            size={getIconSize()}
            color={props.iconColor || props.color || 'currentColor'}
            className={props.iconPosition === 'after' ? 'ml-2 inline-block' : 'mr-2 inline-block'}
        />
    ) : null;
    const containerClass = (() => {
        const isFlexLayout = props.align === 'center' || props.align === 'left' || props.align === 'right';
        if (!IconComponent) return cls;
        const base = `${cls} ${isFlexLayout ? 'flex items-center' : ''}`;
        if (props.align === 'center') return `${base} justify-center`;
        if (props.align === 'right') return `${base} justify-end`;
        return `${base} justify-start`;
    })();
    const content = props.content || '';
    const children = (
        <>
            {props.icon && props.iconPosition !== 'after' && iconEl}
            {renderInline(content)}
            {props.icon && props.iconPosition === 'after' && iconEl}
        </>
    );
    const styleColor = props.color ? { color: props.color } : undefined;
    if (props.style === 'h1') return <h1 className={containerClass} style={styleColor}>{children}</h1>;
    if (props.style === 'h2') return <h2 className={containerClass} style={styleColor}>{children}</h2>;
    if (props.style === 'h3') return <h3 className={containerClass} style={styleColor}>{children}</h3>;
    if (props.style === 'quote') return <blockquote className={containerClass} style={styleColor}>{children}</blockquote>;
    if (props.style === 'caption') return <small className={containerClass} style={styleColor}>{children}</small>;
    return <p className={containerClass} style={styleColor}>{children}</p>;
};
registerComponent('text', MDXText);
registerComponent('divider', DividerBlock);
registerComponent('share', ShareBlock);
registerComponent('product', ProductBlock);
registerComponent('pricing', PricingBlock);
registerComponent('hero', HeroBlock);
registerComponent('donation', DonationBlock);
registerComponent('social_feed', SocialFeedBlock);
registerComponent('nft', NFTBlock);
registerComponent('file', FileBlock);
registerComponent('qr', QRBlock);
registerComponent('chat', ChatBlock);
registerComponent('testimonial', TestimonialBlock);
registerComponent('list', ListBlock);
registerComponent('code', CodeBlock);
registerComponent('alert', AlertBlock);
registerComponent('accordion', AccordionBlock);
registerComponent('tabs', TabsBlock);
registerComponent('carousel', CarouselBlock);
registerComponent('table', TableBlock);
registerComponent('stats', StatsBlock);
registerComponent('timeline', TimelineBlock);
registerComponent('skill_bar', SkillBarBlock);
registerComponent('avatar_group', AvatarGroupBlock);
registerComponent('image_compare', ImageCompareBlock);
registerComponent('github_repo', GithubRepoBlock);
registerComponent('calendly', CalendlyBlock);
registerComponent('button', ButtonBlock);
registerComponent('spacer', SpacerBlock);

// ============================================
// CLIENT PAGE COMPONENT
// ============================================
const ClientPage = () => {
	const { clientId } = useParams();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [config, setConfig] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadClient = async () => {
			try {
				const clientConfig = await loadClientConfig(clientId);
				setConfig(clientConfig);
				applyTheme(clientConfig.theme);
				loadFonts(clientConfig.theme.typography);

				if (clientConfig.seo) {
					document.title = clientConfig.seo.title || clientConfig.profile?.name || 'Bio';
				}

				setLoading(false);
			} catch (error) {
				console.error('Failed to load client:', error);
				setLoading(false);
			}
		};

		loadClient();
	}, [clientId]);

	const LayoutComponent = LAYOUT_MAP[config?.layout?.type] || LAYOUT_MAP['centered'];

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
				<div className="text-center">
					<div className="inline-block size-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mb-4"></div>
					<p className="text-gray-600 font-medium">Loading...</p>
				</div>
			</div>
		);
	}

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-600">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">404</h1>
					<p>Client not found</p>
				</div>
			</div>
		);
	}

	return (
		<>
			{config.background && <BackgroundPattern config={config.background} />}
			<LayoutComponent config={config}>
				{renderContentBlocks(config.content_blocks)}
			</LayoutComponent>
		</>
	);
};

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
	return (
		<Routes>
			{/* Builder Route */}
			<Route path="/builder" element={<BioBuilder />} />

			{/* Preview Route */}
			<Route path="/preview" element={<PreviewPage />} />

			{/* Client Routes */}
			<Route path="/:clientId" element={<ClientPage />} />

			{/* Default Route - Load default client */}
			<Route path="/" element={<ClientPage />} />
		</Routes>
	);
}

export default App;
