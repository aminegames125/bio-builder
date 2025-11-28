import { motion } from 'framer-motion';
import ProfileHeader from '../sections/ProfileHeader';
import Footer from '../sections/Footer';

const CardLayout = ({ config, children }) => {
    const { header = {}, footer = {}, profile, social_links = [] } = config;

    return (
        <div className="min-h-screen py-12 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
            >

                {/* Card Header with Gradient */}
                {header.enabled !== false && (
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 lg:p-12">
                        <ProfileHeader
                            config={{ ...header, theme: 'dark', enabled: true }}
                            profile={profile}
                        />
                    </div>
                )}

                {/* Card Content */}
                <div className="p-8 lg:p-12 space-y-6">
                    {children}
                </div>

                {/* Card Footer */}
                {footer.enabled !== false && (
                    <div className="px-8 pb-8 lg:px-12 lg:pb-12">
                        <Footer config={footer} social={social_links} />
                    </div>
                )}

            </motion.div>
        </div>
    );
};

export default CardLayout;
