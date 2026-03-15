import { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="h-8 bg-primary text-primary-foreground flex items-center justify-center font-mono text-[10px] uppercase tracking-widest relative">
      <span>FREE SHIPPING ON ORDERS ABOVE ₹5000 — USE CODE: <span className="font-bold">VANTAGE</span></span>
      <button onClick={() => setVisible(false)} className="absolute right-3 hover:opacity-70 transition-opacity">
        <X className="h-3 w-3" />
      </button>
    </div>
  );
};
