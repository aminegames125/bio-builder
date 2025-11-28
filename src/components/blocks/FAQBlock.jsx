import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const FAQBlock = ({ items = [], title }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            {title && (
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>
            )}

            <div className="divide-y divide-gray-100">
                {items.map((item, index) => (
                    <div key={index} className="bg-white">
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">{item.question}</span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <AnimatedIcon name="ChevronDown" size={20} className="text-gray-400" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4 text-gray-600">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQBlock;
