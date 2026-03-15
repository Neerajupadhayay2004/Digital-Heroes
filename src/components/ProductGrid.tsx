import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-3 font-mono text-[10px] uppercase text-muted-foreground">LOADING INVENTORY...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-32 text-center font-mono text-[10px] uppercase text-destructive">
        ERROR: FAILED TO LOAD PRODUCTS
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="font-mono text-[10px] uppercase text-muted-foreground space-y-2">
          <p className="text-primary font-bold">NO PRODUCTS FOUND</p>
          <p>INVENTORY IS EMPTY — ADD PRODUCTS VIA CHAT</p>
          <div className="mt-8 border border-border p-8 inline-block">
            <div className="grid grid-cols-3 gap-4 text-muted-foreground/30">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-8 h-8 border border-border/50" />
              ))}
            </div>
            <p className="mt-4 text-muted-foreground/50">COORDINATE_GRID</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border">
      {products.map((product, i) => (
        <motion.div
          key={product.node.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.05, ease: [0.19, 1, 0.22, 1], duration: 0.4 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};
