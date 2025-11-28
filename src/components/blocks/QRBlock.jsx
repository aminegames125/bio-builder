import { motion } from 'framer-motion';

const QRBlock = ({ data, color = '#000000', bgColor = '#ffffff', size = 200, label }) => {
    // Using a reliable QR code API (goqr.me)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&color=${color.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg"
        >
            <div className="bg-white p-2 rounded-xl shadow-inner">
                <img
                    src={qrUrl}
                    alt="QR Code"
                    width={size}
                    height={size}
                    className="rounded-lg"
                    loading="lazy"
                />
            </div>

            {label && (
                <p className="mt-4 font-medium text-gray-900 text-center">{label}</p>
            )}
        </motion.div>
    );
};

export default QRBlock;
