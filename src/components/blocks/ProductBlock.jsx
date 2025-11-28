import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ProductBlock = ({ title, price, description, image, url, buttonText = "Buy Now", currency = "$" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
        >
            {image && (
                <div className="w-full h-48 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            )}

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{title}</h3>
                    <span className="font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded-lg text-sm whitespace-nowrap">
                        {currency}{price}
                    </span>
                </div>

                {description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>
                )}

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl font-medium 
                     flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                    <AnimatedIcon name="ShoppingBag" size={18} color="white" />
                    {buttonText}
                </a>
            </div>
        </motion.div>
    );
};

export default ProductBlock;
