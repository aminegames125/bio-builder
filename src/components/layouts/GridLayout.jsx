import { motion } from 'framer-motion';
import ProfileHeader from '../sections/ProfileHeader';
import Footer from '../sections/Footer';

const GridLayout = ({ config, children }) => {
    const { profile, social_links = [], header = {}, footer = {} } = config;

    // Split children into array for mapping
    const childArray = Array.isArray(children) ? children : [children];

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header - Full Width */}
                {header.enabled !== false && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <ProfileHeader config={{ ...header, theme: 'dark', enabled: true }} profile={profile} />
                    </motion.div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {childArray.map((child, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {child}
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                {footer.enabled !== false && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12"
                    >
                        <Footer config={{ ...footer, theme: 'dark' }} social={social_links} />
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default GridLayout;
