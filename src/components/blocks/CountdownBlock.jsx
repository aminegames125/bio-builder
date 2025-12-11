import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownBlock = ({ targetDate, date, title, theme = 'light' }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const target = targetDate || date;

    useEffect(() => {
        if (!target) return undefined;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(target).getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [target]);

    const TimeBox = ({ value, label }) => (
        <div className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-md rounded-xl min-w-[70px]">
            <span className="text-3xl font-bold">{String(value).padStart(2, '0')}</span>
            <span className="text-xs uppercase tracking-wider opacity-80">{label}</span>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
        w-full p-6 rounded-2xl shadow-lg text-center
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
        bg-gradient-to-br from-primary-500/10 to-secondary-500/10
      `}
        >
            {title && <h3 className="text-xl font-bold mb-6">{title}</h3>}

            <div className="flex justify-center gap-3 flex-wrap">
                <TimeBox value={timeLeft.days} label="Days" />
                <TimeBox value={timeLeft.hours} label="Hours" />
                <TimeBox value={timeLeft.minutes} label="Mins" />
                <TimeBox value={timeLeft.seconds} label="Secs" />
            </div>
        </motion.div>
    );
};

export default CountdownBlock;
