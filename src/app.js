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
      this.items.push(newItem);
      this.quantity++;
      this.total += newItem.price;
      console.log(this.items);
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
