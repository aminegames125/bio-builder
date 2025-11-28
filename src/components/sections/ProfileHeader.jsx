import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ProfileHeader = ({ config, profile }) => {
    const {
        show_avatar = true,
        avatar_size = 'xl',
        avatar_style = 'circle',
        show_name = true,
        show_title = true,
        show_bio = true,
        show_stats = false,
        theme = 'light',
        compact = false
    } = config || {};

    const sizeClasses = {
        sm: 'size-16',
        md: 'size-20',
        lg: 'size-24',
        xl: 'size-32',
        '2xl': 'size-40'
    };

    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const subtextColor = theme === 'dark' ? 'text-white/80' : 'text-gray-600';

    return (
        <div className={`text-center ${compact ? 'space-y-3' : 'space-y-6'}`}>

            {/* Avatar */}
            {show_avatar && profile.avatar && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="relative inline-block"
                >
                    <div className={`${sizeClasses[avatar_size]} relative`}>
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className={`w-full h-full object-cover ${avatar_style === 'square' ? 'rounded-2xl' : 'rounded-full'
                                } border-4 ${theme === 'dark' ? 'border-white/20' : 'border-white'} shadow-xl`}
                        />
                        {profile.verified && (
                            <div className="absolute -bottom-1 -right-1 size-8 bg-primary-500 rounded-full 
                            flex items-center justify-center border-2 border-white shadow-lg">
                                <AnimatedIcon name="Check" size={16} color="white" animation="scale" />
                            </div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Name & Title */}
            {show_name && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <h1 className={`${compact ? 'text-2xl' : 'text-4xl md:text-5xl'} font-bold ${textColor} ${profile.name_class || ''}`}>
                        {profile.name}
                    </h1>
                    {show_title && profile.title && (
                        <p className={`${compact ? 'text-sm' : 'text-lg md:text-xl'} ${subtextColor} mt-2`}>
                            {profile.title}
                        </p>
                    )}
                </motion.div>
            )}

            {/* Bio */}
            {show_bio && profile.bio && !compact && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`max-w-md mx-auto ${subtextColor}`}
                >
                    {profile.bio}
                </motion.p>
            )}

            {/* Stats */}
            {show_stats && profile.stats && !compact && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-8"
                >
                    {profile.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className={`text-2xl font-bold ${textColor}`}>{stat.value}</div>
                            <div className={`text-sm ${subtextColor}`}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            )}

        </div>
    );
};

export default ProfileHeader;
