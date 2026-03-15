import { ProductGrid } from '@/components/ProductGrid';
import { EmailCapture } from '@/components/EmailCapture';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest mb-4">
            SYS://STORE/CATALOG
          </div>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tight font-bold text-foreground leading-none">
            VANTAGE<br />
            <span className="text-primary">SUPPLY</span>
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-6 max-w-md leading-relaxed uppercase">
            Precision equipment for orbital operations. Every item verified. Every transaction secured.
          </p>
          <div className="flex gap-4 mt-8 font-mono text-[10px] uppercase text-muted-foreground">
            <span className="border border-border px-3 py-1.5">VERIFIED_SUPPLY</span>
            <span className="border border-border px-3 py-1.5">API_CONNECTED</span>
            <span className="border border-primary text-primary px-3 py-1.5">LIVE</span>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest">
              INVENTORY_INDEX
            </div>
          </div>
          <ProductGrid />
        </div>
      </section>

      {/* Email Capture */}
      <EmailCapture />
    </div>
  );
};

export default Index;
