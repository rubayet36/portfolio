import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { usePipeline } from '../context/PipelineContext';

export function Contact() {
  const { isCss, isJs, isHighFi } = usePipeline();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Logic only runs if JS is enabled (although React attaches this handler, 
    // in "Raw HTML" mode we won't even use this function)
    if (!isJs) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/rubayet36',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/md-rubayet-khan/',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'rubayet.khan@gmail.com',
      color: 'hover:text-cyan-600'
    }
  ];

  // --- RAW HTML MODE ---
  if (!isCss) {
    return (
      <section id="contact" style={{ padding: '20px', borderBottom: '2px solid black' }}>
        <h2>Contact Me</h2>
        <p>I'm always open to discussing new projects.</p>
        
        <div style={{ marginBottom: '20px' }}>
            <strong>Socials: </strong>
            <a href="https://github.com">GitHub</a> | <a href="https://linkedin.com">LinkedIn</a> | <a href="mailto:rubayet@example.com">Email</a>
        </div>

        <form action="#" method="POST" style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '10px' }}>
            <label>Name: <input type="text" name="name" /></label>
            <label>Email: <input type="email" name="email" /></label>
            <label>Message: <textarea name="message"></textarea></label>
            <button type="submit">Send Message</button>
        </form>
      </section>
    );
  }

  // --- STYLED MODE ---
  return (
    <section
      id="contact"
      className="py-32 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {isHighFi && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Let's <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through the form or connect with me on social media.
              </p>

              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                        flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700
                        ${isJs ? `hover:shadow-md transition-all duration-200 group ${social.color}` : ''}
                    `}
                  >
                    <div className={`
                        w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center 
                        ${isJs ? 'group-hover:scale-110 transition-transform duration-200' : ''}
                    `}>
                      <social.icon className="text-white" size={24} />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="relative">
              {isHighFi && <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl blur-2xl opacity-20" />}
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-4">Quick Response</h3>
                <p className="text-blue-100 leading-relaxed">
                  I typically respond within 24 hours. For urgent inquiries, feel free to reach out on LinkedIn.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={isJs ? handleSubmit : (e) => e.preventDefault()} // Disable submit if JS is off
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isJs} // Optional: Disable inputs if JS is off to force "Raw HTML" feel? Or keep enabled for "CSS only" feel. Keeping enabled is usually better UX even for non-JS.
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 resize-none text-gray-900 dark:text-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isJs}
                className={`
                    w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed
                    ${isJs ? 'hover:shadow-2xl hover:scale-105 transition-all duration-300' : ''}
                `}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={20} />
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-xl text-center font-semibold">
                  Message sent successfully!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}