// Simple MDX-like parser for bio-builder
// Supports frontmatter and fenced block sections

export function parseMDXClient(raw) {
    const config = {
        client_id: 'mdx-client',
        profile: {
            name: 'MDX Client',
            title: '',
            bio: '',
            avatar: 'https://i.pravatar.cc/300',
            verified: false,
            stats: []
        },
        theme: {
            template: 'centered',
            colors: { primary: '#0066FF', secondary: '#9B00FF' },
            typography: { heading_font: 'Inter', body_font: 'Inter' }
        },
        layout: { type: 'centered' },
        background: { type: 'gradient', gradient_class: 'bg-gradient-ocean' },
        content_blocks: [],
        social_links: [],
        seo: {}
    };

    // Frontmatter: ---\nkey: value\n--- at top
    const fmMatch = raw.match(/^---[\s\S]*?---/);
    if (fmMatch) {
        const fm = fmMatch[0].replace(/^---\n?/, '').replace(/\n?---$/, '');
        const lines = fm.split(/\r?\n/).filter(Boolean);
        for (const line of lines) {
            const m = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
            if (!m) continue;
            const key = m[1];
            const value = m[2];
            setFrontmatter(config, key, value);
        }
    }

    const blockRegex = /```block\s+([^\n]+)\n([\s\S]*?)```/g;
    let match;
    while ((match = blockRegex.exec(raw)) !== null) {
        const header = match[1];
        const body = match[2].trim();
        const type = parseHeaderType(header);
        if (!type) continue;
        const obj = parseKeyValues(body);
        obj.type = type;
        // Normalize common fields
        normalizeBlock(obj);
        config.content_blocks.push(obj);
    }

    let remaining = raw;
    const fm = remaining.match(/^---[\s\S]*?---/);
    if (fm) remaining = remaining.replace(fm[0], '');
    remaining = remaining.replace(blockRegex, '').trim();
    const mdBlocks = parseMarkdownToBlocks(remaining);
    for (const b of mdBlocks) config.content_blocks.push(b);

    return config;
}

function setFrontmatter(config, key, value) {
    if (key === 'layout') {
        config.layout.type = value.trim();
    } else if (key === 'background_class') {
        config.background = { type: 'custom', custom_class: value.trim() };
    } else if (key === 'title') {
        config.seo.title = value.trim();
    } else if (key === 'description') {
        config.seo.description = value.trim();
    } else if (key === 'keywords') {
        const v = tryJson(value);
        config.seo.keywords = Array.isArray(v) ? v : String(value).split(',').map(s => s.trim()).filter(Boolean);
    } else if (key === 'name') {
        config.profile.name = value.trim();
    } else if (key === 'bio') {
        config.profile.bio = value.trim();
    } else if (key === 'avatar') {
        config.profile.avatar = value.trim();
    } else if (key === 'verified') {
        config.profile.verified = coerce(value) === true;
    } else if (key === 'stats') {
        const v = tryJson(value);
        if (Array.isArray(v)) config.profile.stats = v;
    } else if (key === 'social_links') {
        const v = tryJson(value);
        if (Array.isArray(v)) config.social_links = v;
    } else if (key === 'primary_color') {
        config.theme.colors.primary = value.trim();
    } else if (key === 'secondary_color') {
        config.theme.colors.secondary = value.trim();
    } else if (key === 'heading_font') {
        config.theme.typography.heading_font = value.trim();
    } else if (key === 'body_font') {
        config.theme.typography.body_font = value.trim();
    }
}

function parseHeaderType(header) {
    const m = header.match(/type\s*=\s*([\w_]+)/);
    return m ? m[1] : null;
}

function parseKeyValues(text) {
    const lines = text.split(/\r?\n/);
    const obj = {};
    let currentArrayKey = null;
    for (const line of lines) {
        if (!line.trim()) continue;
        const kv = line.match(/^([a-zA-Z_][\w-]*):\s*(.*)$/);
        if (kv) {
            const key = kv[1];
            const val = kv[2];
            if (val === '' || val === undefined) {
                currentArrayKey = key;
                obj[key] = [];
                continue;
            }
            if (key === 'type') {
                obj.variant_type = tryJson(val);
            } else {
                obj[key] = tryJson(val);
            }
            currentArrayKey = null;
            continue;
        }
        const arrItem = line.match(/^\s*-\s*(.*)$/);
        if (arrItem && currentArrayKey) {
            obj[currentArrayKey].push(tryJson(arrItem[1]));
        }
    }
    return obj;
}

function coerce(v) {
    const trimmed = v.trim();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (/^\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
    // quoted strings
    const q = trimmed.match(/^\"([\s\S]*?)\"$|^'([\s\S]*?)'$/);
    if (q) return q[1] ?? q[2];
    return trimmed;
}

function tryJson(v) {
    const t = String(v).trim();
    if (t.startsWith('{') || t.startsWith('[')) {
        try { return JSON.parse(t); } catch { return coerce(v); }
    }
    return coerce(v);
}

function parseMarkdownToBlocks(text) {
    if (!text) return [];
    const lines = text.split(/\r?\n/);
    const blocks = [];
    let paragraph = [];
    let paragraphAlign = null;
    let listItems = [];
    let listType = null;
    let inCode = false;
    let codeLang = null;
    let codeLines = [];
    const flushParagraph = () => {
        if (paragraph.length) {
            blocks.push({ type: 'text', content: paragraph.join(' ').trim(), style: 'paragraph', align: paragraphAlign || 'left', from_markdown: true });
            paragraph = [];
            paragraphAlign = null;
        }
    };
    const flushList = () => {
        if (listItems.length) {
            const obj = { type: 'list', items: listItems.slice(), from_markdown: true };
            if (listType === 'number') obj.list_style = 'number';
            else obj.list_style = 'bullet';
            blocks.push(obj);
            listItems = [];
            listType = null;
        }
    };
    const flushCode = () => {
        if (codeLines.length) {
            blocks.push({ type: 'code', language: codeLang || 'text', code: codeLines.join('\n'), from_markdown: true });
            codeLines = [];
            codeLang = null;
        }
    };
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (inCode) {
            if (/^```\s*$/.test(line)) {
                inCode = false;
                flushCode();
                continue;
            }
            codeLines.push(line);
            continue;
        }
        const codeStart = line.match(/^```(\w+)?\s*$/);
        if (codeStart) {
            flushParagraph();
            flushList();
            inCode = true;
            codeLang = codeStart[1] || null;
            continue;
        }
        if (!line.trim()) {
            flushParagraph();
            flushList();
            continue;
        }
        const heading = line.match(/^(#{1,3})\s+(.*)$/);
        if (heading) {
            flushParagraph();
            flushList();
            const level = heading[1].length;
            let content = heading[2].trim();
            let align = 'left';
            const am = content.match(/^\[(left|center|right|justify)\]\s+(.*)$/);
            if (am) { align = am[1]; content = am[2]; }
            blocks.push({ type: 'text', content, style: level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3', align, from_markdown: true });
            continue;
        }
        const quote = line.match(/^>\s?(.*)$/);
        if (quote) {
            flushParagraph();
            flushList();
            blocks.push({ type: 'text', content: quote[1].trim(), style: 'quote', align: 'left', from_markdown: true });
            continue;
        }
        if (/^[-*]\s+/.test(line)) {
            const item = line.replace(/^[-*]\s+/, '').trim();
            if (listType && listType !== 'bullet') { flushList(); }
            listType = 'bullet';
            listItems.push(item);
            continue;
        }
        const num = line.match(/^(\d+)\.\s+(.*)$/);
        if (num) {
            const item = num[2].trim();
            if (listType && listType !== 'number') { flushList(); }
            listType = 'number';
            listItems.push(item);
            continue;
        }
        if (/^\s*([-*_]{3,})\s*$/.test(line)) {
            flushParagraph();
            flushList();
            blocks.push({ type: 'divider', style: 'solid', spacing: 'medium', color: 'gray', opacity: 50, from_markdown: true });
            continue;
        }
        let t = line.trim();
        if (!paragraph.length) {
            const am = t.match(/^\[(left|center|right|justify)\]\s+(.*)$/);
            if (am) { paragraphAlign = am[1]; t = am[2]; }
        }
        paragraph.push(t);
    }
    flushParagraph();
    flushList();
    return blocks;
}


function normalizeBlock(obj) {
    const t = obj.type;
    if (t === 'pricing') {
        if (typeof obj.price === 'number') obj.price = String(obj.price);
        obj.currency = obj.currency || '$';
        obj.period = obj.period || '/month';
        obj.features = Array.isArray(obj.features) ? obj.features : [];
        obj.buttonText = obj.buttonText || 'Choose Plan';
    } else if (t === 'spacer') {
        obj.height = obj.height || 20;
    } else if (t === 'text') {
        obj.style = obj.style || 'paragraph';
        obj.align = obj.align || 'left';
    } else if (t === 'button') {
        obj.style = obj.style || 'primary';
        obj.label = obj.label || 'Click';
        obj.url = obj.url || '#';
    } else if (t === 'link_card') {
        obj.animation = obj.animation || 'scale';
    } else if (t === 'video_embed') {
        obj.platform = obj.platform || 'youtube';
        const p = String(obj.platform || '').toLowerCase();
        if (!obj.video_id && obj.videoId) obj.video_id = obj.videoId;
        if (obj.url && !obj.video_id) {
            const u = String(obj.url);
            let id = '';
            if (p === 'youtube') {
                const m1 = u.match(/[?&]v=([a-zA-Z0-9_-]+)/);
                const m2 = u.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
                const m3 = u.match(/\/embed\/([a-zA-Z0-9_-]+)/);
                id = (m1 && m1[1]) || (m2 && m2[1]) || (m3 && m3[1]) || '';
            } else if (p === 'vimeo') {
                const m1 = u.match(/vimeo\.com\/(\d+)/);
                const m2 = u.match(/player\.vimeo\.com\/video\/(\d+)/);
                id = (m1 && m1[1]) || (m2 && m2[1]) || '';
            } else if (p === 'tiktok') {
                const m1 = u.match(/\/video\/(\d+)/);
                const m2 = u.match(/\/embed\/(\d+)/);
                id = (m1 && m1[1]) || (m2 && m2[1]) || '';
            }
            if (id) obj.video_id = id;
        }
        if (typeof obj.autoplay === 'string') obj.autoplay = obj.autoplay === 'true';
    } else if (t === 'music_player') {
        obj.platform = obj.platform || 'spotify';
        if (!obj.track_id && obj.trackId) obj.track_id = obj.trackId;
    } else if (t === 'gallery') {
        if (Array.isArray(obj.images)) {
            obj.images = obj.images.map(it => typeof it === 'string' ? { url: it } : it);
        } else {
            obj.images = [];
        }
    } else if (t === 'carousel') {
        if (Array.isArray(obj.slides)) {
            obj.slides = obj.slides.map(it => typeof it === 'string' ? { image: it } : it);
        } else {
            obj.slides = [];
        }
        if (typeof obj.autoPlay === 'string') obj.autoPlay = obj.autoPlay === 'true';
        if (typeof obj.interval === 'string' && /\d+/.test(obj.interval)) obj.interval = Number(obj.interval);
        obj.items = obj.slides;
    } else if (t === 'image_compare') {
        // ensure both sides
        obj.before = obj.before || '';
        obj.after = obj.after || '';
    } else if (t === 'divider') {
        obj.style = obj.style || 'solid';
        obj.spacing = obj.spacing || 'medium';
        obj.color = obj.color || 'gray';
        if (typeof obj.opacity === 'string') obj.opacity = Number(obj.opacity);
    } else if (t === 'share') {
        if (typeof obj.platforms === 'string') obj.platforms = obj.platforms.split(',').map(s => s.trim()).filter(Boolean);
    } else if (t === 'code') {
        if (Array.isArray(obj.lines)) obj.code = obj.lines.join('\n');
    } else if (t === 'alert') {
        if (obj.variant_type) obj.alertType = obj.variant_type;
        if (typeof obj.dismissible === 'string') obj.dismissible = obj.dismissible === 'true';
    } else if (t === 'contact_form') {
        obj.fields = Array.isArray(obj.fields) ? obj.fields : ['name','email','message'];
        obj.button_text = obj.button_text || obj.buttonText || 'Send';
    } else if (t === 'newsletter_signup') {
        obj.placeholder = obj.placeholder || 'Enter your email';
        obj.button_text = obj.button_text || obj.buttonText || 'Subscribe';
    } else if (t === 'product') {
        // map name -> title for component props
        if (obj.name && !obj.title) obj.title = obj.name;
        obj.currency = obj.currency || '$';
        obj.buttonText = obj.buttonText || 'Buy Now';
    } else if (t === 'donation') {
        obj.platform = obj.platform || 'kofi';
        obj.buttonText = obj.buttonText || 'Support';
        if (!obj.username && obj.handle) obj.username = obj.handle;
        if (obj.username !== undefined) obj.username = String(obj.username);
    } else if (t === 'nft') {
        obj.ctaText = obj.ctaText || 'View';
        if (!obj.contractAddress && obj.contract_address) obj.contractAddress = obj.contract_address;
        if (!obj.tokenId && (obj.token_id !== undefined)) obj.tokenId = obj.token_id;
        if (!obj.marketplace_url && obj.marketplaceURL) obj.marketplace_url = obj.marketplaceURL;
    } else if (t === 'stats') {
        if (Array.isArray(obj.items)) {
            obj.items = obj.items.map(it => {
                if (typeof it === 'string') {
                    const m = it.match(/^([^:]+):\s*(.+)$/);
                    return m ? { label: m[1].trim(), value: m[2].trim() } : { label: it, value: '' };
                }
                return it;
            });
        } else {
            obj.items = [];
        }
        obj.layout = obj.layout || 'grid';
        obj.stats = obj.items;
    } else if (t === 'table') {
        obj.headers = Array.isArray(obj.headers) ? obj.headers : [];
        if (Array.isArray(obj.rows)) {
            obj.rows = obj.rows.map(r => {
                if (typeof r === 'string') {
                    return r.includes('|') ? r.split('|').map(s => s.trim()) : r.split(',').map(s => s.trim());
                }
                return r;
            });
        } else {
            obj.rows = [];
        }
        if (typeof obj.striped === 'string') obj.striped = obj.striped === 'true';
    } else if (t === 'skill_bar') {
        if (Array.isArray(obj.skills)) {
            obj.skills = obj.skills.map(s => {
                if (typeof s === 'string') {
                    const m = s.match(/^(.+?):\s*(\d+)/);
                    return m ? { name: m[1].trim(), level: Number(m[2]) } : { name: s, level: 0 };
                }
                // convert { skill, percentage } to { name, level }
                if (s && typeof s === 'object') {
                    const name = s.name || s.skill;
                    const level = s.level ?? s.percentage ?? 0;
                    return { name, level };
                }
                return s;
            });
        }
        if (typeof obj.showPercentage === 'string') obj.showPercentage = obj.showPercentage === 'true';
    } else if (t === 'timeline') {
        if (obj.events && !obj.items) obj.items = obj.events;
        obj.items = Array.isArray(obj.items) ? obj.items : [];
        obj.items = obj.items.map(it => {
            if (typeof it === 'string') {
                const parts = it.split('|').map(s => s.trim());
                return { date: parts[0] || '', title: parts[1] || '', description: parts[2] || '' };
            }
            if (it && typeof it === 'object') {
                if (it.year && !it.date) it.date = it.year;
            }
            return it;
        });
    } else if (t === 'avatar_group') {
        obj.avatars = Array.isArray(obj.avatars) ? obj.avatars : [];
        obj.avatars = obj.avatars.map(a => typeof a === 'string' ? { src: a } : a);
        if (typeof obj.limit === 'string') obj.limit = Number(obj.limit);
    } else if (t === 'testimonial') {
        if (typeof obj.rating === 'string') obj.rating = Number(obj.rating);
        obj.style = obj.style || 'card';
    } else if (t === 'accordion') {
        obj.items = Array.isArray(obj.items) ? obj.items : [];
        if (typeof obj.allowMultiple === 'string') obj.allowMultiple = obj.allowMultiple === 'true';
    } else if (t === 'tabs') {
        obj.tabs = Array.isArray(obj.tabs) ? obj.tabs : [];
        obj.style = obj.style || 'pill';
        obj.tabs = obj.tabs.map(tab => {
            if (tab && typeof tab === 'object') {
                if (!tab.label && tab.title) tab.label = tab.title;
            }
            return tab;
        });
    } else if (t === 'faq') {
        obj.title = obj.title || 'Frequently Asked Questions';
        obj.questions = Array.isArray(obj.questions) ? obj.questions : [];
    } else if (t === 'list') {
        obj.items = Array.isArray(obj.items) ? obj.items : [];
        if (obj.variant_type) obj.list_style = obj.variant_type;
        obj.list_style = obj.list_style || 'bullet';
    } else if (t === 'social_feed') {
        obj.posts_count = typeof obj.posts_count === 'string' ? Number(obj.posts_count) : (obj.posts_count || 3);
        if (typeof obj.height === 'string') obj.height = Number(obj.height);
        if (!obj.username && obj.handle) obj.username = obj.handle;
        if (obj.username !== undefined) obj.username = String(obj.username);
    } else if (t === 'github_repo') {
        obj.show_stats = typeof obj.show_stats === 'string' ? obj.show_stats === 'true' : (obj.show_stats ?? true);
        if (!obj.repo && obj.owner && obj.name) obj.repo = `${obj.owner}/${obj.name}`;
    } else if (t === 'calendly') {
        if (typeof obj.height === 'string') obj.height = Number(obj.height);
    } else if (t === 'qr') {
        if (typeof obj.size === 'string') obj.size = Number(obj.size);
        if (!obj.bgColor && obj.bgcolor) obj.bgColor = obj.bgcolor;
        if (!obj.bgColor && obj.bg_color) obj.bgColor = obj.bg_color;
        obj.color = obj.color || '#000000';
        obj.bgColor = obj.bgColor || '#ffffff';
    } else if (t === 'chat') {
        if (!obj.username && obj.handle) obj.username = obj.handle;
        if (obj.username !== undefined) obj.username = String(obj.username);
    } else if (t === 'file') {
        // no-op
    } else if (t === 'countdown') {
        obj.theme = obj.theme || 'light';
        if (!obj.targetDate && obj.target_date) obj.targetDate = obj.target_date;
    } else if (t === 'map') {
        if (typeof obj.height === 'string') obj.height = Number(obj.height);
        if (typeof obj.zoom === 'string') obj.zoom = Number(obj.zoom);
    } else if (t === 'hero') {
        obj.align = obj.align || 'center';
    }
}

