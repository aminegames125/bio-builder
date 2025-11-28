import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const TestimonialBlock = ({ quote, author, role, avatar, rating = 5, style = 'card' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
        ${style === 'card' ? 'bg-white shadow-lg border border-gray-100' : 'bg-transparent border-l-4 border-primary-500'}
        p-6 rounded-2xl relative
      `}
        >
            {style === 'card' && (
                <div className="absolute top-6 right-6 text-primary-100">
                    <AnimatedIcon name="Quote" size={48} />
                </div>
            )}

            {rating > 0 && (
                <div className="flex gap-1 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <AnimatedIcon
                            key={i}
                            name="Star"
                            size={16}
                            color={i < rating ? "currentColor" : "#E5E7EB"}
                        />
                    ))}
                </div>
            )}

            <p className={`text-lg text-gray-700 italic mb-6 relative z-10 font-medium leading-relaxed`}>
                "{quote}"
            </p>

            <div className="flex items-center gap-3">
                {avatar && (
                    <img
                        src={avatar}
                        alt={author}
                        className="size-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                )}
                <div>
                    <h4 className="font-bold text-gray-900 text-sm">{author}</h4>
                    {role && <p className="text-xs text-gray-500">{role}</p>}
                </div>
            </div>
        </motion.div>
    );
};

export default TestimonialBlock;
