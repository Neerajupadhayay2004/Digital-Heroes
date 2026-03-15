import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message transmitted successfully', { position: 'top-center' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-3 w-3" /> BACK
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.19, 1, 0.22, 1] }}>
        <div className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest mb-4">SYS://CONTACT</div>
        <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tight font-bold text-foreground mb-8">
          TRANSMIT <span className="text-primary">MESSAGE</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest block mb-1">CALLSIGN</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
              className="w-full h-10 bg-card border border-border px-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest block mb-1">COMM_LINK</label>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required
              className="w-full h-10 bg-card border border-border px-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest block mb-1">MESSAGE</label>
            <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={5}
              className="w-full bg-card border border-border px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none transition-colors resize-none" />
          </div>
          <motion.button whileTap={{ y: 1 }} type="submit"
            className="h-10 px-6 bg-primary text-primary-foreground font-bold font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all">
            <Send className="h-3 w-3" /> TRANSMIT
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
