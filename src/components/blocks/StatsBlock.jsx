import { motion } from 'framer-motion';

const StatsBlock = ({ stats: statsProp = [], items = [], layout = 'grid' }) => {
    // Don't render if no stats provided
    const stats = (statsProp && statsProp.length ? statsProp : items);
    if (!stats || stats.length === 0) {
        return null;
    }

    return (
        <div className={`
      w-full gap-4
      ${layout === 'grid' ? 'grid grid-cols-2 md:grid-cols-3' : 'flex flex-col space-y-4'}
    `}>
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center"
                >
                    <span className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</span>
                </motion.div>
            ))}
        </div>
    );
};

export default StatsBlock;
