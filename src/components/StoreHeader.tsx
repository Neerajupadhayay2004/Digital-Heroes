import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';

export const StoreHeader = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-12 border-b border-border flex items-center justify-between px-6 bg-card font-mono text-[10px] uppercase tracking-widest sticky top-0 z-40">
      <Link to="/" className="flex items-center gap-4">
        <span className="text-primary font-bold text-sm tracking-[0.2em]">VANTAGE</span>
        <span className="text-muted-foreground hidden sm:inline">ORBITAL_TASKING_V4.02</span>
      </Link>
      <div className="flex items-center gap-6">
        <span className="text-muted-foreground hidden md:inline">
          SYS_TIME: {time.toLocaleTimeString('en-US', { hour12: false })}
        </span>
        <span className="text-primary hidden md:inline">● ONLINE</span>
        <CartDrawer />
      </div>
    </header>
  );
};
