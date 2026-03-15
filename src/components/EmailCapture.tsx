import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const EmailCapture = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Signal locked — you\'re on the list', { position: 'top-center' });
    setEmail('');
  };

  return (
    <section className="border-t border-border px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest mb-4">SYS://COMMS</div>
        <h2 className="text-2xl md:text-4xl font-display uppercase tracking-tight font-bold text-foreground">
          JOIN THE <span className="text-primary">NETWORK</span>
        </h2>
        <p className="font-mono text-[10px] uppercase text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
          Subscribe for early access to drops, exclusive intel, and operational updates.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-px max-w-md mx-auto mt-6">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ENTER COMM_LINK"
            required
            className="flex-1 h-10 bg-card border border-border px-4 font-mono text-[10px] uppercase text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          />
          <motion.button whileTap={{ y: 1 }} type="submit"
            className="h-10 px-6 bg-primary text-primary-foreground font-bold font-mono text-[10px] uppercase tracking-widest hover:brightness-110 transition-all">
            SUBSCRIBE
          </motion.button>
        </form>
      </div>
    </section>
  );
};
