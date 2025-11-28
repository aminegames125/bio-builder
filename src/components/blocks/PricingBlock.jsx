import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const PricingBlock = ({ title, price, currency = "$", period = "/mo", features = [], buttonText = "Choose Plan", url, popular = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className={`
        relative p-6 rounded-2xl shadow-lg border
        ${popular
                    ? 'bg-white border-primary-500 ring-2 ring-primary-200'
                    : 'bg-white border-gray-100'
                }
      `}
        >
            {popular && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                    POPULAR
                </div>
            )}

            <h3 className="text-lg font-semibold text-gray-500 mb-2">{title}</h3>

            <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-gray-900">{currency}{price}</span>
                <span className="text-gray-500 ml-1">{period}</span>
            </div>

            <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="mt-0.5 text-green-500">
                            <AnimatedIcon name="Check" size={16} color="currentColor" />
                        </div>
                        {feature}
                    </li>
                ))}
            </ul>

            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
          w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center transition-colors
          ${popular
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }
        `}
            >
                {buttonText}
            </a>
        </motion.div>
    );
};

export default PricingBlock;
