import { motion } from 'framer-motion';
import ProfileHeader from '../sections/ProfileHeader';
import Footer from '../sections/Footer';

const MinimalLayout = ({ config, children }) => {
    const { profile, footer = {}, social_links = [] } = config;

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md space-y-12">

                {/* Ultra Minimal Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4"
                >
                    {profile.avatar && (
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="size-20 rounded-full mx-auto object-cover shadow-lg"
                        />
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                        {profile.title && (
                            <p className="text-gray-600 text-sm mt-1">{profile.title}</p>
                        )}
                    </div>
                </motion.div>

                {/* Minimal Content - Maximum Spacing */}
                <div className="space-y-4">
                    {children}
                </div>

                {/* Footer */}
                {footer.enabled !== false && (
                    <Footer config={footer} social={social_links} />
                )}

            </div>
        </div>
    );
};

export default MinimalLayout;
