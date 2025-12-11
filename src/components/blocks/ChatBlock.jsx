import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ChatBlock = ({ platform, username, label, messages = [] }) => {
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
    const uname = typeof username === 'string' ? username : String(username ?? '');
    const url = uname && uname.startsWith('http') ? uname : `${config.prefix}${uname}`;
    const displayLabel = label || config.label;

    // Backward compatibility: render static chat transcript when messages are provided and no platform is set
    if (!platform && messages?.length) {
        return (
            <div className="w-full p-4 rounded-xl shadow-sm border border-gray-100 bg-white space-y-3">
                {messages.map((msg, idx) => {
                    const isUser = msg.sender?.toLowerCase() === 'user';
                    return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${isUser
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                <div className="text-[10px] uppercase tracking-wide opacity-70 mb-0.5">{msg.sender}</div>
                                <div>{msg.message}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

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
