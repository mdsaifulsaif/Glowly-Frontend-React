import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
        // product cards
      cart: [],
      addToCart: (product, quantity) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item._id === product._id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },
      //remove product 
      removeFromCart: (id) => set({ cart: get().cart.filter((item) => item._id !== id) }),
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'glowly-cart' } // localStorage key
  )
);