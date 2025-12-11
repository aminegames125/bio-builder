import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const DonationBlock = ({ platform = 'kofi', username, title, description, buttonText }) => {
    const platforms = {
        kofi: {
            color: '#FF5E5B',
            icon: 'Coffee',
            defaultText: 'Support me on Ko-fi',
            urlPrefix: 'https://ko-fi.com/'
        },
        buymeacoffee: {
            color: '#FFDD00',
            textColor: '#000000',
            icon: 'Coffee',
            defaultText: 'Buy me a coffee',
            urlPrefix: 'https://www.buymeacoffee.com/'
        },
        paypal: {
            color: '#003087',
            icon: 'CreditCard',
            defaultText: 'Donate via PayPal',
            urlPrefix: 'https://paypal.me/'
        },
        patreon: {
            color: '#FF424D',
            icon: 'Heart',
            defaultText: 'Become a Patron',
            urlPrefix: 'https://patreon.com/'
        }
    };

    const config = platforms[platform] || platforms.kofi;
    const uname = typeof username === 'string' ? username : String(username ?? '');
    const url = uname && uname.startsWith('http') ? uname : `${config.urlPrefix}${uname}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center"
        >
            {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
            {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105"
                style={{
                    backgroundColor: config.color,
                    color: config.textColor || 'white'
                }}
            >
                <AnimatedIcon name={config.icon} size={20} color="currentColor" />
                {buttonText || config.defaultText}
            </a>
        </motion.div>
    );
};

export default DonationBlock;
