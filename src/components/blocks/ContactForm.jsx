import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

const ContactForm = ({
    title = "Get In Touch",
    fields = ['name', 'email', 'message'],
    submit_endpoint,
    success_message = "Thanks! I'll get back to you soon.",
    button_text = "Send Message"
}) => {
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            if (submit_endpoint) {
                const response = await fetch(submit_endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    setStatus('success');
                    setFormData({});
                } else {
                    setStatus('error');
                }
            } else {
                // Simulate success if no endpoint
                setTimeout(() => {
                    setStatus('success');
                    setFormData({});
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
            className="w-full p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="size-6 text-primary-500" />
                {title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.includes('name') && (
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                        />
                    </div>
                )}

                {fields.includes('email') && (
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                        />
                    </div>
                )}

                {fields.includes('phone') && (
                    <div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone || ''}
                            onChange={handleChange}
                            placeholder="Your Phone"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                        />
                    </div>
                )}

                {fields.includes('message') && (
                    <div>
                        <textarea
                            name="message"
                            value={formData.message || ''}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="4"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all resize-none"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold hover:from-primary-600 hover:to-secondary-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === 'loading' ? (
                        <>
                            <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="size-5" />
                            {button_text}
                        </>
                    )}
                </button>

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-success-50 border border-success-200 rounded-xl text-success-700 text-center"
                    >
                        {success_message}
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-error-50 border border-error-200 rounded-xl text-error-700 text-center"
                    >
                        Something went wrong. Please try again.
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm;
