import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and UPI through our secure Shopify checkout.' },
  { q: 'How long does shipping take?', a: 'Standard delivery takes 5-7 business days. Express shipping is available at checkout for 2-3 day delivery.' },
  { q: 'What is your return policy?', a: 'We accept returns within 14 days of delivery. Items must be unworn with original tags attached.' },
  { q: 'How do I track my order?', a: 'A tracking link will be sent to your email once your order ships. You can use it to monitor delivery status in real-time.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship within India. International shipping will be available soon.' },
];

const FAQ = () => (
  <div className="max-w-4xl mx-auto px-6 py-8">
    <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground mb-8 transition-colors">
      <ArrowLeft className="h-3 w-3" /> BACK
    </Link>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.19, 1, 0.22, 1] }}>
      <div className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest mb-4">SYS://FAQ</div>
      <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tight font-bold text-foreground mb-8">
        INTEL <span className="text-primary">DATABASE</span>
      </h1>
      <div className="space-y-0">
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
            className="border-t border-border py-5">
            <h3 className="font-mono text-xs uppercase text-foreground font-bold">{faq.q}</h3>
            <p className="font-mono text-[10px] uppercase text-muted-foreground mt-2 leading-relaxed">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default FAQ;
