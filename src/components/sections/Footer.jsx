import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const Footer = ({ config, social }) => {
    const {
        style = 'minimal',
        show_branding = false,
        show_social = true,
        copyright_text
    } = config || {};

    // Don't render footer wrapper if there's no content
    const hasContent = (show_social && social && social.length > 0) || copyright_text || show_branding;

    if (!hasContent) {
        return null;
    }

    return (
        <footer className="text-center space-y-6">
            {/* Social Icons */}
            {show_social && social && social.length > 0 && (
                <div className="flex justify-center gap-3 flex-wrap">
                    {social.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="size-12 rounded-full bg-gray-100 hover:bg-gray-200
                       flex items-center justify-center transition-colors
                       shadow-md hover:shadow-lg text-2xl"
                            title={item.platform}
                        >
                            {item.icon || '🔗'}
                        </motion.a>
                    ))}
                </div>
            )}

            {/* Copyright */}
            {copyright_text && (
                <p className="text-sm text-gray-500">
                    {copyright_text}
                </p>
            )}

            {/* Branding */}
            {show_branding && (
                <p className="text-xs text-gray-400">
                    Made with ❤️ using BioPageBuilder
                </p>
            )}
        </footer>
    );
};

export default Footer;
