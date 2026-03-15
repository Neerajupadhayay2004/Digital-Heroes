import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const policies = [
  { title: 'SHIPPING', items: ['Standard delivery: 5-7 business days', 'Express delivery: 2-3 business days', 'Free shipping on orders above ₹5000', 'Tracking provided via email'] },
  { title: 'RETURNS', items: ['14-day return window from delivery', 'Items must be unworn with tags attached', 'Refund processed within 5-7 business days', 'Return shipping is on the customer'] },
  { title: 'EXCHANGES', items: ['Size exchanges available within 14 days', 'Subject to stock availability', 'No additional shipping charges', 'Contact us to initiate exchange'] },
];

const Shipping = () => (
  <div className="max-w-4xl mx-auto px-6 py-8">
    <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground mb-8 transition-colors">
      <ArrowLeft className="h-3 w-3" /> BACK
    </Link>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.19, 1, 0.22, 1] }}>
      <div className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest mb-4">SYS://LOGISTICS</div>
      <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tight font-bold text-foreground mb-8">
        SHIPPING & <span className="text-primary">RETURNS</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {policies.map((policy, i) => (
          <motion.div key={policy.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="bg-card p-6">
            <h3 className="font-mono text-xs uppercase text-primary font-bold mb-4 border-b border-border pb-2">{policy.title}</h3>
            <ul className="space-y-2">
              {policy.items.map((item, j) => (
                <li key={j} className="font-mono text-[10px] uppercase text-muted-foreground flex gap-2">
                  <span className="text-primary">›</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default Shipping;
