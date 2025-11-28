import { useState, useRef } from 'react';
import AnimatedIcon from '../icons/AnimatedIcon';

const ImageCompareBlock = ({ before, after, labelBefore = "Before", labelAfter = "After" }) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleDrag = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percentage = (x / rect.width) * 100;
        setSliderPosition(percentage);
    };

    return (
        <div
            ref={containerRef}
            className="w-full relative aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-lg group"
            onMouseMove={handleDrag}
            onTouchMove={(e) => handleDrag(e.touches[0])}
        >
            {/* After Image (Background) */}
            <img
                src={after}
                alt={labelAfter}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                {labelAfter}
            </span>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden border-r-2 border-white"
                style={{ width: `${sliderPosition}%` }}
            >
                <img
                    src={before}
                    alt={labelBefore}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
                />
                <span className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    {labelBefore}
                </span>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600">
                    <AnimatedIcon name="MoveHorizontal" size={16} />
                </div>
            </div>
        </div>
    );
};

export default ImageCompareBlock;
