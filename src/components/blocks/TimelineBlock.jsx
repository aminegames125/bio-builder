import { motion } from 'framer-motion';

const TimelineBlock = ({ items = [] }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="w-full pl-4 py-2">
            <div className="relative border-l-2 border-gray-200 space-y-8">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="ml-6 relative"
                    >
                        {/* Dot */}
                        <div className="absolute -left-[31px] top-1.5 size-4 rounded-full bg-white border-4 border-primary-500 shadow-sm"></div>

                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-gray-900">{item.title}</h4>
                                <span className="text-xs font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
                                    {item.date}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TimelineBlock;
