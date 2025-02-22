"use client";
interface SelectedVariant {
  storage: string;
  color: string;
}

export default function AddToCart(
  productId: number,
  quantity: number = 1,
  variant: SelectedVariant
) {
  try {
    // Get existing cart items or initialize empty array
    const existingCart = JSON.parse("[]");

    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item: { productId: number }) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item if it doesn't exist
      existingCart.push({
        productId: productId,
        quantity: quantity,
        variant: variant.color + " " + variant.storage,
      });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCart));

    // Check for authentication
    if (localStorage.getItem("phone") == null) {
      window.location.href = "/login";
      return;
    }

    // Navigate to cart page
    window.location.href = "/cart";
  } catch (error) {
    console.error("Error adding item to cart:", error);
    // You might want to show a toast or error message to the user here
  }
}

// Optional: Type-safe version with TypeScript interfaces
export interface CartItem {
  productId: number;
  quantity: number;
}
