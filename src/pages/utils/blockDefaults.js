// ============================================
// BLOCK DEFAULTS
// Default properties for all 37 block types
// ============================================

export function getBlockDefaults(type) {
    const defaults = {
        // Basic
        text: {
            type: 'text',
            content: 'New text block',
            style: 'paragraph',
            align: 'left'
        },
        button: {
            type: 'button',
            label: 'Click Me',
            url: '#',
            style: 'primary'
        },
        divider: {
            type: 'divider',
            style: 'solid'
        },
        spacer: {
            type: 'spacer',
            height: 40
        },

        // Links & Social
        link_card: {
            type: 'link_card',
            title: 'Link Title',
            description: 'Link description',
            url: '#',
            icon: 'Link',
            animation: 'scale'
        },
        share: {
            type: 'share',
            platforms: ['twitter', 'facebook', 'linkedin'],
            animation: 'bounce'
        },

        // Media
        video_embed: {
            type: 'video_embed',
            platform: 'youtube',
            video_id: 'dQw4w9WgXcQ',
            title: 'Video Title'
        },
        music_player: {
            type: 'music_player',
            platform: 'spotify',
            track_id: '11dFghVXANMlKmJXsNCbNl',
            title: 'Music Track'
        },
        gallery: {
            type: 'gallery',
            images: [
                { url: 'https://picsum.photos/400/300', caption: 'Image 1' },
                { url: 'https://picsum.photos/400/301', caption: 'Image 2' }
            ]
        },
        carousel: {
            type: 'carousel',
            slides: [
                { image: 'https://picsum.photos/800/400', title: 'Slide 1' },
                { image: 'https://picsum.photos/800/401', title: 'Slide 2' }
            ]
        },
        image_compare: {
            type: 'image_compare',
            before: 'https://picsum.photos/600/400',
            after: 'https://picsum.photos/600/401',
            title: 'Before & After'
        },

        // Forms
        contact_form: {
            type: 'contact_form',
            title: 'Contact Me',
            fields: ['name', 'email', 'message']
        },
        newsletter_signup: {
            type: 'newsletter_signup',
            title: 'Subscribe to Newsletter',
            placeholder: 'Enter your email'
        },

        // Products & Money
        product: {
            type: 'product',
            name: 'Product Name',
            price: '$99',
            image: 'https://picsum.photos/300/300',
            description: 'Product description'
        },
        pricing: {
            type: 'pricing',
            title: 'Pro Plan',
            price: '$29/month',
            features: ['Feature 1', 'Feature 2', 'Feature 3']
        },
        donation: {
            type: 'donation',
            title: 'Support My Work',
            amounts: [5, 10, 25, 50]
        },
        nft: {
            type: 'nft',
            name: 'NFT Collection',
            image: 'https://picsum.photos/400/400',
            description: 'NFT description'
        },

        // Data Display
        stats: {
            type: 'stats',
            items: [
                { label: 'Projects', value: '100+' },
                { label: 'Clients', value: '50+' }
            ]
        },
        table: {
            type: 'table',
            headers: ['Column 1', 'Column 2'],
            rows: [
                ['Data 1', 'Data 2'],
                ['Data 3', 'Data 4']
            ]
        },
        skill_bar: {
            type: 'skill_bar',
            skill: 'JavaScript',
            percentage: 90
        },
        timeline: {
            type: 'timeline',
            events: [
                { year: '2023', title: 'Event 1', description: 'Description' },
                { year: '2024', title: 'Event 2', description: 'Description' }
            ]
        },
        avatar_group: {
            type: 'avatar_group',
            avatars: [
                'https://i.pravatar.cc/100?img=1',
                'https://i.pravatar.cc/100?img=2',
                'https://i.pravatar.cc/100?img=3'
            ]
        },
        testimonial: {
            type: 'testimonial',
            quote: 'This is an amazing product!',
            author: 'John Doe',
            role: 'CEO',
            avatar: 'https://i.pravatar.cc/100'
        },

        // Interactive
        accordion: {
            type: 'accordion',
            items: [
                { title: 'Question 1', content: 'Answer 1' },
                { title: 'Question 2', content: 'Answer 2' }
            ]
        },
        tabs: {
            type: 'tabs',
            tabs: [
                { title: 'Tab 1', content: 'Content 1' },
                { title: 'Tab 2', content: 'Content 2' }
            ]
        },
        faq: {
            type: 'faq',
            title: 'FAQ',
            questions: [
                { question: 'Question 1?', answer: 'Answer 1' },
                { question: 'Question 2?', answer: 'Answer 2' }
            ]
        },
        code: {
            type: 'code',
            language: 'javascript',
            code: 'console.log("Hello World!");',
            title: 'Code Example'
        },
        alert: {
            type: 'alert',
            alertType: 'info',
            title: 'Info',
            message: 'This is an informational message'
        },
        list: {
            type: 'list',
            title: 'List Title',
            items: ['Item 1', 'Item 2', 'Item 3']
        },

        // Integrations
        social_feed: {
            type: 'social_feed',
            platform: 'twitter',
            username: '@username',
            posts_count: 3
        },
        github_repo: {
            type: 'github_repo',
            repo: 'username/repo',
            show_stats: true
        },
        calendly: {
            type: 'calendly',
            url: 'https://calendly.com/username',
            title: 'Schedule a Meeting'
        },
        qr: {
            type: 'qr',
            data: 'https://example.com',
            size: 200
        },
        chat: {
            type: 'chat',
            messages: [
                { sender: 'User', message: 'Hello!' },
                { sender: 'Bot', message: 'Hi there!' }
            ]
        },
        file: {
            type: 'file',
            filename: 'document.pdf',
            url: '#',
            size: '2.5 MB'
        },
        countdown: {
            type: 'countdown',
            date: '2025-12-31T23:59:59',
            title: 'New Year Countdown'
        },
        map: {
            type: 'map',
            location: 'New York, NY',
            zoom: 12
        }
    };

    return defaults[type] || { type, enabled: true };
}
