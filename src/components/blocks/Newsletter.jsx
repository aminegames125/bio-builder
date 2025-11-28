import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';

const Newsletter = ({
    title = "Stay Updated",
    description = "Get weekly tips and updates",
    provider = 'custom',
    action_url,
    button_text = "Subscribe",
    placeholder = "Enter your email"
}) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            if (action_url) {
                const response = await fetch(action_url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    setStatus('success');
                    setEmail('');
                } else {
                    setStatus('error');
                }
            } else {
                // Simulate success
                setTimeout(() => {
                    setStatus('success');
                    setEmail('');
                }, 1000);
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-100"
        >
            <div className="flex items-start gap-3 mb-4">
                <div className="size-10 rounded-xl bg-primary-500 flex items-center justify-center text-white flex-shrink-0">
                    <Mail className="size-5" />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-6 py-2 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? (
                        <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : status === 'success' ? (
                        '✓'
                    ) : (
                        button_text
                    )}
                </button>
            </form>

            {status === 'success' && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-success-600 font-medium"
                >
                    🎉 Thanks for subscribing!
                </motion.p>
            )}

            {status === 'error' && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-error-600 font-medium"
                >
                    Something went wrong. Please try again.
                </motion.p>
            )}
        </motion.div>
    );
};

export default Newsletter;
