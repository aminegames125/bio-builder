import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const ListBlock = ({ items = [], type: listTypeProp = 'bullet', list_style, title, from_markdown }) => {
    if (!items || items.length === 0) {
        return null;
    }

    const type = list_style || listTypeProp;

    return (
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {title && (
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">{title}</h3>
                </div>
            )}

            <ul className="p-2">
                {items.map((item, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="mt-0.5 shrink-0 text-primary-500">
                            {type === 'check' && <AnimatedIcon name="CheckCircle2" size={18} />}
                            {type === 'bullet' && <div className="size-2 rounded-full bg-primary-500 mt-2" />}
                            {type === 'number' && (
                                <span className="flex items-center justify-center size-5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
                                    {index + 1}
                                </span>
                            )}
                            {type === 'arrow' && <AnimatedIcon name="ArrowRight" size={18} />}
                        </div>

                        <span className="text-gray-700 leading-relaxed">
                            {from_markdown ? renderInline(item) : item}
                        </span>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

const renderInline = (s) => {
    const nodes = [];
    let remaining = String(s);
    const regex = /(\[([^\]]+)\]\(([^)]+)\))|(`([^`]+)`)|(\*\*([^*]+)\*\*)|(__(.+?)__)|(\*(.+?)\*)|(_(.+?)_)|(~~(.+?)~~)/;
    while (remaining.length) {
        const m = remaining.match(regex);
        if (!m) { nodes.push(remaining); break; }
        const idx = m.index ?? 0;
        if (idx > 0) nodes.push(remaining.slice(0, idx));
        const full = m[0];
        if (m[1]) {
            const text = m[2];
            const url = m[3];
            nodes.push(<a href={url} className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">{text}</a>);
        } else if (m[4]) {
            nodes.push(<code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono">{m[5]}</code>);
        } else if (m[6]) {
            nodes.push(<strong>{m[7]}</strong>);
        } else if (m[8]) {
            nodes.push(<strong>{m[9]}</strong>);
        } else if (m[10]) {
            nodes.push(<em>{m[11]}</em>);
        } else if (m[12]) {
            nodes.push(<em>{m[13]}</em>);
        } else if (m[14]) {
            nodes.push(<del>{m[15]}</del>);
        }
        remaining = remaining.slice(idx + full.length);
    }
    return nodes;
};

export default ListBlock;
