import { useEffect } from 'react';

const CalendlyBlock = ({ url, height = 630, title = "Schedule time with me" }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div
                className="calendly-inline-widget w-full"
                data-url={url}
                style={{ height: `${height}px` }}
            />
        </div>
    );
};

export default CalendlyBlock;
