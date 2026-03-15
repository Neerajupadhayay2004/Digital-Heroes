import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-border px-6 py-8 font-mono text-[10px] uppercase text-muted-foreground">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
      <div>
        <span className="text-primary font-bold text-sm tracking-[0.2em]">VANTAGE</span>
        <p className="mt-2">PRECISION EQUIPMENT FOR OPERATORS</p>
      </div>
      <div className="flex gap-6">
        <Link to="/about" className="hover:text-foreground transition-colors">ABOUT</Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">CONTACT</Link>
        <Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link>
        <Link to="/shipping" className="hover:text-foreground transition-colors">SHIPPING</Link>
      </div>
    </div>
  </footer>
);
