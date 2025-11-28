import { motion } from 'framer-motion';
import { Images, X } from 'lucide-react';
import { useState } from 'react';

const Gallery = ({
    title = "Gallery",
    images = [],
    layout = 'grid',
    columns = 3
}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const gridColsClass = {
        2: 'grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }[columns] || 'grid-cols-3';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Images className="size-6 text-primary-500" />
                {title}
            </h3>

            <div className={`grid ${gridColsClass} gap-4`}>
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                        onClick={() => setSelectedImage(image)}
                    >
                        <img
                            src={typeof image === 'string' ? image : image.url}
                            alt={typeof image === 'object' ? image.alt : `Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 size-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="size-6" />
                    </button>

                    <motion.img
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        src={typeof selectedImage === 'string' ? selectedImage : selectedImage.url}
                        alt="Gallery lightbox"
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

export default Gallery;
