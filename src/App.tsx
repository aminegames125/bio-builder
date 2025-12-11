import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
registerComponent('text', TextBlock);
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
