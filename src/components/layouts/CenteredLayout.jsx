import { motion } from 'framer-motion';
import ProfileHeader from '../sections/ProfileHeader';
import Footer from '../sections/Footer';

const CenteredLayout = ({ config, children }) => {
    const { profile, social_links = [], layout = {}, header = {}, footer = {} } = config;
    const { show_profile_stats = false } = layout;

    // Build header config
    const headerConfig = {
        show_avatar: true,
        avatar_size: 'xl',
        avatar_style: 'circle',
        show_name: true,
        show_title: true,
        show_bio: true,
        show_stats: show_profile_stats,
        theme: 'light',
        ...header
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">

            {/* Floating gradient orbs - subtle and static */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-radial-sunset opacity-20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-radial-ocean opacity-15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-lg relative z-10">

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <ProfileHeader config={headerConfig} profile={profile} />
                </motion.div>

                {/* Content Blocks */}
                <div className="flex flex-col gap-4 mb-8">
                    {children}
                </div>

                {/* Footer with Social Icons */}
                {footer.enabled !== false && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Footer config={footer} social={social_links} />
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default CenteredLayout;
