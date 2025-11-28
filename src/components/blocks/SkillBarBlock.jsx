import { motion } from 'framer-motion';

const SkillBarBlock = ({ skills = [], showPercentage = true }) => {
    // Don't render if no skills provided
    if (!skills || skills.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            {skills.map((skill, index) => (
                <div key={index}>
                    <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-semibold text-gray-700">{skill.name}</span>
                        {showPercentage && (
                            <span className="text-xs font-medium text-gray-500">{skill.level}%</span>
                        )}
                    </div>
                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillBarBlock;
