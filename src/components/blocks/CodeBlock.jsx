import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedIcon from '../icons/AnimatedIcon';

const CodeBlock = ({ code, language = 'javascript', title }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full rounded-2xl overflow-hidden bg-gray-900 text-gray-200 shadow-xl border border-gray-800 font-mono text-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="size-3 rounded-full bg-red-500" />
                        <div className="size-3 rounded-full bg-yellow-500" />
                        <div className="size-3 rounded-full bg-green-500" />
                    </div>
                    {title && <span className="ml-3 text-xs text-gray-400">{title}</span>}
                </div>

                <button
                    onClick={handleCopy}
                    className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                >
                    {copied ? (
                        <>
                            <AnimatedIcon name="Check" size={14} color="#4ade80" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <AnimatedIcon name="Copy" size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <div className="p-4 overflow-x-auto">
                <pre>
                    <code>{code}</code>
                </pre>
            </div>

            <div className="px-4 py-1 bg-gray-800/50 text-right">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{language}</span>
            </div>
        </div>
    );
};

export default CodeBlock;
