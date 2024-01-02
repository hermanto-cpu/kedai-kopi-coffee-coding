document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "product1.jpg", price: 25000 },
      { id: 2, name: "Primo Passo", img: "product2.jpg", price: 35000 },
      { id: 3, name: "Arabica Blend", img: "product3.jpg", price: 27000 },
      { id: 4, name: "Green Coffee", img: "product4.jpg", price: 40000 },
      { id: 5, name: "Arabica Brazil", img: "product5.jpg", price: 24000 },
      { id: 6, name: "Liberica Coffee", img: "product6.jpg", price: 30000 },
      { id: 7, name: "Robusta Blend", img: "product7.jpg", price: 21000 },
    ],
  }));
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada item yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika tidak ada , maka
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika item beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      console.log(this.items);
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika items lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri satu2
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= item.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
