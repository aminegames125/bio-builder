import { motion } from 'framer-motion';
import ProfileHeader from '../sections/ProfileHeader';
import Footer from '../sections/Footer';

const CompactLayout = ({ config, children }) => {
    const { header = {}, footer = {}, profile, social_links = [] } = config;

    return (
        <div className="min-h-screen py-6 px-4">
            <div className="max-w-md mx-auto space-y-4">

                {/* Compact Header */}
                {header.enabled !== false && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-4 shadow-md"
                    >
                        <ProfileHeader
                            config={{ ...header, compact: true, enabled: true }}
                            profile={profile}
                        />
                    </motion.div>
                )}

                {/* Compact Content - Tight Spacing */}
                <div className="space-y-3">
                    {children}
                </div>

                {/* Footer */}
                {footer.enabled !== false && (
                    <div className="bg-white rounded-2xl p-4 shadow-md">
                        <Footer config={footer} social={social_links} />
                    </div>
                )}

            </div>
        </div>
    );
};

export default CompactLayout;
