import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ChatBlock = ({ platform, username, label }) => {
    const platforms = {
        whatsapp: {
            color: '#25D366',
            icon: 'MessageCircle',
            prefix: 'https://wa.me/',
            label: 'Chat on WhatsApp'
        },
        telegram: {
            color: '#0088cc',
            icon: 'Send',
            prefix: 'https://t.me/',
            label: 'Chat on Telegram'
        },
        discord: {
            color: '#5865F2',
            icon: 'MessageSquare',
            prefix: 'https://discord.gg/',
            label: 'Join Discord Server'
        },
        messenger: {
            color: '#006AFF',
            icon: 'MessageCircle',
            prefix: 'https://m.me/',
            label: 'Chat on Messenger'
        }
    };

    const config = platforms[platform] || platforms.whatsapp;
    const url = username && username.startsWith('http') ? username : `${config.prefix}${username || ''}`;
    const displayLabel = label || config.label;

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between p-4 rounded-xl shadow-sm border border-gray-100 bg-white hover:shadow-md transition-all group"
        >
            <div className="flex items-center gap-4">
                <div
                    className="size-10 rounded-full flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: config.color }}
                >
                    <AnimatedIcon name={config.icon} size={20} color="white" />
                </div>
                <span className="font-medium text-gray-900">{displayLabel}</span>
            </div>

            <div className="text-gray-300 group-hover:text-gray-500 transition-colors">
                <AnimatedIcon name="ChevronRight" size={20} />
            </div>
        </motion.a>
    );
};

export default ChatBlock;
