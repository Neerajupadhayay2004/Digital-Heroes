import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(state => state.addItem);
  const isCartLoading = useCartStore(state => state.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.productByHandle;
    },
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] font-mono text-[10px] uppercase text-muted-foreground">
        PRODUCT NOT FOUND
      </div>
    );
  }

  const variant = product.variants.edges[selectedVariantIdx]?.node;
  const images = product.images.edges;

  const handleAddToCart = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`, { position: 'top-center' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-3 w-3" /> BACK TO INVENTORY
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
        {/* Images */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card">
          <div className="aspect-square bg-muted overflow-hidden">
            {images[0]?.node ? (
              <img src={images[0].node.url} alt={images[0].node.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-muted-foreground">NO_IMAGE</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-px bg-border">
              {images.slice(1, 5).map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <div key={i} className="aspect-square bg-muted overflow-hidden">
                  <img src={img.node.url} alt={img.node.altText || ''} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: [0.19, 1, 0.22, 1], duration: 0.5 }}
          className="bg-card p-8 border-l-2 border-primary"
        >
          <div className="font-mono text-[10px] uppercase text-muted-foreground mb-2">
            PRODUCT_ID: {product.id.split('/').pop()}
          </div>
          <h1 className="text-2xl font-display uppercase tracking-tight font-bold text-foreground">{product.title}</h1>
          <div className="text-primary font-mono font-bold text-xl mt-4">
            {variant?.price.currencyCode} {parseFloat(variant?.price.amount || '0').toFixed(2)}
          </div>

          <p className="text-foreground/70 font-mono text-xs mt-6 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.options?.map((option: { name: string; values: string[] }) => (
            <div key={option.name} className="mt-6">
              <label className="font-mono text-[10px] uppercase text-muted-foreground tracking-widest">{option.name}</label>
              <div className="flex flex-wrap gap-1 mt-2">
                {product.variants.edges.map((v: { node: { id: string; title: string; selectedOptions: Array<{ name: string; value: string }> } }, i: number) => {
                  const val = v.node.selectedOptions.find((o: { name: string }) => o.name === option.name)?.value;
                  if (!val) return null;
                  return (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIdx(i)}
                      className={`h-7 px-3 font-mono text-[9px] uppercase border transition-colors ${
                        i === selectedVariantIdx
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground hover:border-foreground'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <motion.button
            whileTap={{ y: 1 }}
            onClick={handleAddToCart}
            disabled={isCartLoading || !variant?.availableForSale}
            className="w-full h-12 bg-primary text-primary-foreground font-bold font-mono text-xs uppercase tracking-widest mt-8 flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
          >
            {isCartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : variant?.availableForSale ? 'ADD TO CART' : 'SOLD OUT'}
          </motion.button>

          <div className="mt-8 space-y-2 font-mono text-[10px] uppercase text-muted-foreground border-t border-border pt-4">
            <div className="flex justify-between"><span>STATUS</span><span className="text-primary">{variant?.availableForSale ? 'IN STOCK' : 'UNAVAILABLE'}</span></div>
            <div className="flex justify-between"><span>HANDLE</span><span>{product.handle}</span></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
