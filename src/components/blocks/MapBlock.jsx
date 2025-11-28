import { motion } from 'framer-motion';

const MapBlock = ({ address, title, height = 300, zoom = 15 }) => {
    const encodedAddress = encodeURIComponent(address);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full overflow-hidden rounded-2xl shadow-lg bg-white"
        >
            {title && (
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>
            )}
            <iframe
                width="100%"
                height={height}
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}&zoom=${zoom}`}
            ></iframe>
            {/* Note: In a real app, we'd need a Google Maps API Key. 
          For demo purposes, we might use an iframe to OpenStreetMap or a static map image if no key is provided. 
          Here is an OpenStreetMap alternative which doesn't require a key for simple embeds */}

            <iframe
                width="100%"
                height={height}
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-180,-90,180,90&layer=mapnik&marker=${encodedAddress}`} // This is a simplification, OSM needs coords usually
                style={{ display: 'none' }} // Hiding this for now as OSM embed needs coords, not address directly without geocoding
            ></iframe>

            {/* Using a direct Google Maps Embed API (iframe mode) which works for places without a key sometimes or requires one. 
           Let's use the standard embed URL format which is more robust for free usage limits */}
            <iframe
                width="100%"
                height={height}
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`}
            ></iframe>

        </motion.div>
    );
};

export default MapBlock;
