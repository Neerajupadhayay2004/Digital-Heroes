import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { motion } from "framer-motion";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="relative h-8 w-8 flex items-center justify-center border border-border hover:bg-muted transition-colors">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-card border-l border-border rounded-none">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-sm font-mono uppercase tracking-widest text-foreground">Cart [{totalItems}]</SheetTitle>
          <SheetDescription className="text-[10px] font-mono uppercase text-muted-foreground">
            {totalItems === 0 ? "EMPTY" : `${totalItems} ITEM${totalItems !== 1 ? 'S' : ''} QUEUED`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center font-mono text-[10px] uppercase text-muted-foreground">
                <ShoppingCart className="h-8 w-8 mx-auto mb-4 opacity-30" />
                <p>NO ITEMS IN QUEUE</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-0">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.variantId}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
                      className="border-t border-border py-3 px-1 flex gap-3"
                    >
                      <div className="w-14 h-14 bg-muted overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 font-mono text-[10px]">
                        <h4 className="text-foreground uppercase truncate font-bold">{item.product.node.title}</h4>
                        <p className="text-muted-foreground">{item.selectedOptions.map(o => o.value).join(' / ')}</p>
                        <p className="text-primary font-bold mt-1">{item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <button onClick={() => removeItem(item.variantId)} className="h-5 w-5 flex items-center justify-center hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </button>
                        <div className="flex items-center gap-0.5">
                          <button className="h-5 w-5 border border-border flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="w-6 text-center text-[10px] font-mono">{item.quantity}</span>
                          <button className="h-5 w-5 border border-border flex items-center justify-center hover:bg-muted" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center font-mono text-[10px] uppercase">
                  <span className="text-muted-foreground">Total</span>
                  <span className="text-primary font-bold text-sm">{items[0]?.price.currencyCode} {totalPrice.toFixed(2)}</span>
                </div>
                <motion.button
                  whileTap={{ y: 1 }}
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isLoading || isSyncing}
                  className="w-full h-10 bg-primary text-primary-foreground font-bold font-mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 hover:brightness-110 transition-all"
                >
                  {isLoading || isSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <><ExternalLink className="w-3 h-3" />EXECUTE CHECKOUT</>}
                </motion.button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
