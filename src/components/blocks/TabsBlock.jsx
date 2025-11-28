import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TabsBlock = ({ tabs = [], style = 'pill' }) => {
    const [activeTab, setActiveTab] = useState(0);

    if (!tabs || tabs.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Headers */}
            <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100 p-2 gap-1">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`
              relative px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1
              ${activeTab === index ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
            `}
                    >
                        {activeTab === index && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-primary-50 rounded-lg -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 min-h-[150px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h3 className="font-bold text-lg mb-2 text-gray-900">{tabs[activeTab].title || tabs[activeTab].label}</h3>
                        <div className="text-gray-600 leading-relaxed">
                            {tabs[activeTab].content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TabsBlock;
