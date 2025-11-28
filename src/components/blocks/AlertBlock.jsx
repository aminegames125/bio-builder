import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const AlertBlock = ({ type = 'info', title, message, icon, dismissible = false }) => {
    const styles = {
        info: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800', icon: 'Info', iconColor: '#3b82f6' },
        success: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-800', icon: 'CheckCircle', iconColor: '#22c55e' },
        warning: { bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-800', icon: 'AlertTriangle', iconColor: '#eab308' },
        error: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800', icon: 'AlertOctagon', iconColor: '#ef4444' }
    };

    const style = styles[type] || styles.info;
    const iconName = icon || style.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-full p-4 rounded-xl border ${style.bg} ${style.border} flex gap-3 items-start`}
        >
            <div className="shrink-0 mt-0.5">
                <AnimatedIcon name={iconName} size={20} color={style.iconColor} />
            </div>
            <div className="flex-1">
                {title && <h4 className={`font-bold text-sm mb-1 ${style.text}`}>{title}</h4>}
                <p className={`text-sm ${style.text} opacity-90`}>{message}</p>
            </div>
        </motion.div>
    );
};

export default AlertBlock;
