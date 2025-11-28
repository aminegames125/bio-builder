import { motion } from 'framer-motion';
import ProfileHeader from '../sections/ProfileHeader';
import Footer from '../sections/Footer';

const SplitLayout = ({ config, children }) => {
    const { header = {}, footer = {}, profile, social_links = [] } = config;

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">

            {/* Left Side - Profile (Sticky) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600 
                      lg:sticky lg:top-0 lg:h-screen">
                <div className="h-full flex flex-col items-center justify-center p-8 lg:p-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full max-w-md"
                    >
                        <ProfileHeader
                            config={{ ...header, theme: 'dark', enabled: true }}
                            profile={profile}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Content (Scrollable) */}
            <div className="lg:col-span-3 bg-gray-50">
                <div className="min-h-screen p-8 lg:p-12">
                    <div className="max-w-2xl mx-auto space-y-6">
                        {children}
                    </div>

                    {footer.enabled !== false && (
                        <div className="max-w-2xl mx-auto mt-12">
                            <Footer config={footer} social={social_links} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default SplitLayout;
