import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => (
  <div className="max-w-4xl mx-auto px-6 py-8">
    <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground mb-8 transition-colors">
      <ArrowLeft className="h-3 w-3" /> BACK
    </Link>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.19, 1, 0.22, 1] }}>
      <div className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest mb-4">SYS://ABOUT</div>
      <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tight font-bold text-foreground mb-8">
        ABOUT <span className="text-primary">VANTAGE</span>
      </h1>
      <div className="space-y-6 font-mono text-xs text-foreground/70 leading-relaxed uppercase">
        <p>Vantage Supply is built for operators who demand precision in every detail. We source and verify equipment that meets the highest standards of performance and durability.</p>
        <div className="border border-border p-6 space-y-4">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">FOUNDED</span>
            <span className="text-primary">2026</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">MISSION</span>
            <span className="text-foreground">PRECISION EQUIPMENT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">STATUS</span>
            <span className="text-primary">● OPERATIONAL</span>
          </div>
        </div>
        <p>Every product in our catalog undergoes rigorous verification before being listed. We believe in transparency, quality, and delivering exactly what operators need — nothing more, nothing less.</p>
      </div>
    </motion.div>
  </div>
);

export default About;
