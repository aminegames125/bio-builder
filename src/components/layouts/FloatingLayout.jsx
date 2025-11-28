import { motion } from 'framer-motion';
import ProfileHeader from '../sections/ProfileHeader';
import Footer from '../sections/Footer';

const FloatingLayout = ({ config, children }) => {
    const { profile, social_links = [], header = {}, footer = {} } = config;
    const childArray = Array.isArray(children) ? children : [children];

    return (
        <div className="min-h-screen relative overflow-hidden">

            {/* Floating Shapes Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 size-96 bg-gradient-radial-purple opacity-30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 size-96 bg-gradient-radial-ocean opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-80 bg-gradient-radial-sunset opacity-25 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 py-12 max-w-5xl relative z-10">

                {/* Floating Header */}
                {header.enabled !== false && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50"
                    >
                        <ProfileHeader config={{ ...header, enabled: true }} profile={profile} />
                    </motion.div>
                )}

                {/* Floating Cards with Stagger */}
                <div className="space-y-6">
                    {childArray.map((child, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                                type: 'spring',
                                stiffness: 100
                            }}
                            whileHover={{
                                scale: 1.02,
                                zIndex: 10
                            }}
                            className="backdrop-blur-xl bg-white/70 rounded-2xl shadow-xl border border-white/50 overflow-hidden"
                        >
                            {child}
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                {footer.enabled !== false && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 backdrop-blur-xl bg-white/60 rounded-3xl p-6 shadow-xl border border-white/50"
                    >
                        <Footer config={footer} social={social_links} />
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default FloatingLayout;
