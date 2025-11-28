// ============================================
// PREVIEW BLOCK RENDERER
// Renders ALL 37 block types in the preview panel
// ============================================

import TextBlock from '../../components/blocks/TextBlock';
import ButtonBlock from '../../components/blocks/ButtonBlock';
import DividerBlock from '../../components/blocks/DividerBlock';
import SpacerBlock from '../../components/blocks/SpacerBlock';
import LinkCard from '../../components/blocks/LinkCard';
import VideoEmbed from '../../components/blocks/VideoEmbed';
import Gallery from '../../components/blocks/Gallery';
import MusicBlock from '../../components/blocks/MusicBlock';
import ContactForm from '../../components/blocks/ContactForm';
import Newsletter from '../../components/blocks/Newsletter';
import ShareBlock from '../../components/blocks/ShareBlock';
import ProductBlock from '../../components/blocks/ProductBlock';
import PricingBlock from '../../components/blocks/PricingBlock';
import DonationBlock from '../../components/blocks/DonationBlock';
import SocialFeedBlock from '../../components/blocks/SocialFeedBlock';
import NFTBlock from '../../components/blocks/NFTBlock';
import FileBlock from '../../components/blocks/FileBlock';
import QRBlock from '../../components/blocks/QRBlock';
import ChatBlock from '../../components/blocks/ChatBlock';
import TestimonialBlock from '../../components/blocks/TestimonialBlock';
import ListBlock from '../../components/blocks/ListBlock';
import CodeBlock from '../../components/blocks/CodeBlock';
import AlertBlock from '../../components/blocks/AlertBlock';
import AccordionBlock from '../../components/blocks/AccordionBlock';
import TabsBlock from '../../components/blocks/TabsBlock';
import CarouselBlock from '../../components/blocks/CarouselBlock';
import TableBlock from '../../components/blocks/TableBlock';
import StatsBlock from '../../components/blocks/StatsBlock';
import TimelineBlock from '../../components/blocks/TimelineBlock';
import SkillBarBlock from '../../components/blocks/SkillBarBlock';
import AvatarGroupBlock from '../../components/blocks/AvatarGroupBlock';
import ImageCompareBlock from '../../components/blocks/ImageCompareBlock';
import GithubRepoBlock from '../../components/blocks/GithubRepoBlock';
import CalendlyBlock from '../../components/blocks/CalendlyBlock';
import CountdownBlock from '../../components/blocks/CountdownBlock';
import MapBlock from '../../components/blocks/MapBlock';
import FAQBlock from '../../components/blocks/FAQBlock';

export function renderPreviewBlock(block) {
    try {
        switch (block.type) {
            // Basic
            case 'text':
                return <TextBlock {...block} />;
            case 'button':
                return <ButtonBlock {...block} />;
            case 'divider':
                return <DividerBlock {...block} />;
            case 'spacer':
                return <SpacerBlock {...block} />;

            // Links & Social
            case 'link_card':
                return <LinkCard {...block} />;
            case 'share':
                return <ShareBlock {...block} />;

            // Media
            case 'video_embed':
                return <VideoEmbed {...block} />;
            case 'music_player':
                return <MusicBlock {...block} />;
            case 'gallery':
                return <Gallery {...block} />;
            case 'carousel':
                return <CarouselBlock {...block} />;
            case 'image_compare':
                return <ImageCompareBlock {...block} />;

            // Forms
            case 'contact_form':
                return <ContactForm {...block} />;
            case 'newsletter_signup':
                return <Newsletter {...block} />;

            // Products & Money
            case 'product':
                return <ProductBlock {...block} />;
            case 'pricing':
                return <PricingBlock {...block} />;
            case 'donation':
                return <DonationBlock {...block} />;
            case 'nft':
                return <NFTBlock {...block} />;

            // Data Display
            case 'stats':
                return <StatsBlock {...block} />;
            case 'table':
                return <TableBlock {...block} />;
            case 'skill_bar':
                return <SkillBarBlock {...block} />;
            case 'timeline':
                return <TimelineBlock {...block} />;
            case 'avatar_group':
                return <AvatarGroupBlock {...block} />;
            case 'testimonial':
                return <TestimonialBlock {...block} />;

            // Interactive
            case 'accordion':
                return <AccordionBlock {...block} />;
            case 'tabs':
                return <TabsBlock {...block} />;
            case 'faq':
                return <FAQBlock {...block} />;
            case 'code':
                return <CodeBlock {...block} />;
            case 'alert':
                return <AlertBlock {...block} />;
            case 'list':
                return <ListBlock {...block} />;

            // Integrations
            case 'social_feed':
                return <SocialFeedBlock {...block} />;
            case 'github_repo':
                return <GithubRepoBlock {...block} />;
            case 'calendly':
                return <CalendlyBlock {...block} />;
            case 'qr':
                return <QRBlock {...block} />;
            case 'chat':
                return <ChatBlock {...block} />;
            case 'file':
                return <FileBlock {...block} />;
            case 'countdown':
                return <CountdownBlock {...block} />;
            case 'map':
                return <MapBlock {...block} />;

            default:
                return (
                    <div className="p-4 bg-white/5 rounded-lg text-center text-white/60">
                        {block.type} block
                    </div>
                );
        }
    } catch (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center text-red-300">
                Error rendering {block.type}
            </div>
        );
    }
}
