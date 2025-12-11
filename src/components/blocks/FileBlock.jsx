import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const FileBlock = ({ title, filename, size, type = 'pdf', url, description }) => {
    const icons = {
        pdf: { name: 'FileText', color: '#FF5E5B' },
        zip: { name: 'FileArchive', color: '#FFDD00' },
        image: { name: 'Image', color: '#00C7B7' },
        doc: { name: 'File', color: '#0066FF' }
    };

    const iconConfig = icons[type] || icons.doc;

    const displayTitle = title || filename || 'Download file';

    return (
        <motion.a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
        >
            <div className="flex items-center gap-4">
                <div
                    className="size-12 rounded-lg flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors"
                    style={{ color: iconConfig.color }}
                >
                    <AnimatedIcon name={iconConfig.name} size={24} color="currentColor" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{displayTitle}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="uppercase font-bold">{type}</span>
                        {size && (
                            <>
                                <span>•</span>
                                <span>{size}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="text-gray-400 group-hover:text-primary-500 transition-colors">
                    <AnimatedIcon name="Download" size={20} />
                </div>
            </div>

            {description && (
                <p className="mt-3 text-sm text-gray-500 border-t border-gray-50 pt-2">
                    {description}
                </p>
            )}
        </motion.a>
    );
};

export default FileBlock;
