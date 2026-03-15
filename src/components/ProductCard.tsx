import { Link } from 'react-router-dom';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${node.title} added to cart`, { position: 'top-center' });
  };

  return (
    <Link to={`/product/${node.handle}`} className="block bg-card hover:bg-accent/50 transition-colors group">
      <div className="aspect-square bg-muted overflow-hidden">
        {image ? (
          <img src={image.url} alt={image.altText || node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-muted-foreground uppercase">
            NO_IMAGE
          </div>
        )}
      </div>
      <div className="p-4 border-l-2 border-primary">
        <div className="font-mono text-[10px] uppercase tracking-wider">
          <h3 className="text-foreground font-bold truncate">{node.title}</h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{node.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-primary font-bold text-sm">{price.currencyCode} {parseFloat(price.amount).toFixed(2)}</span>
            <motion.button
              whileTap={{ y: 1 }}
              onClick={handleAddToCart}
              disabled={isLoading || !variant?.availableForSale}
              className="h-7 px-3 bg-primary text-primary-foreground font-bold text-[9px] uppercase tracking-wider hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : variant?.availableForSale ? 'ADD' : 'SOLD'}
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
};
