import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const AccordionBlock = ({ items = [], allowMultiple = false }) => {
    const [openIndexes, setOpenIndexes] = useState([0]);

    const toggleItem = (index) => {
        if (allowMultiple) {
            setOpenIndexes(prev =>
                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
            );
        } else {
            setOpenIndexes(prev => prev.includes(index) ? [] : [index]);
        }
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="w-full space-y-2">
            {items.map((item, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-semibold text-gray-900">{item.title}</span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-400"
                            >
                                <AnimatedIcon name="ChevronDown" size={20} />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="px-5 pb-4 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-50 mt-2">
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

export default AccordionBlock;
