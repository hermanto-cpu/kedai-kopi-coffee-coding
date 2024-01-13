document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Robusta Brazil",
        img: "product1.jpg",
        price: 25000,
        deskripsi: "Cicipi kekuatan kopi Robusta pilihan dari Brazil. Dengan rasa yang bold dan aromanya yang khas, setiap teguk memberikan energi untuk menghadapi coding session tanpa batas!",
      },

      {
        id: 2,
        name: "Primo Passo",
        img: "product2.jpg",
        price: 35000,
        deskripsi: "Langkah pertama menuju kenikmatan kopi sejati! Primo Passo menghadirkan perpaduan rasa yang halus dan aroma yang menggoda. Ideal untuk memulai coding hari ini dengan semangat!",
      },

      {
        id: 3,
        name: "Arabica Blend",
        img: "product3.jpg",
        price: 27000,
        deskripsi: "Arabica Blend kami memberikan pengalaman kopi yang unik dengan campuran biji berkualitas tinggi. Rasa lembut dan hint fruity yang memanjakan lidahmu selama coding!",
      },

      {
        id: 4,
        name: "Green Coffee",
        img: "product4.jpg",
        price: 40000,
        deskripsi: "Ingin sesuatu yang fresh? Green Coffee kami hadir untukmu! Dengan rasa yang clean dan energi alami, coding sambil menikmati segelas Green Coffee adalah pilihan tepat!",
      },

      {
        id: 5,
        name: "Arabica Brazil",
        img: "product5.jpg",
        price: 24000,
        deskripsi: "Arabica Brazil menghadirkan kehangatan sentuhan Brasil ke dalam setiap teguk. Kombinasi yang sempurna antara rasa manis dan asam membuat coding jadi lebih berwarna!",
      },

      {
        id: 6,
        name: "Liberica Coffee",
        img: "product6.jpg",
        price: 30000,
        deskripsi: "Liberica Coffee, kopi dengan karakter kuat dan berani. Cocok untuk mereka yang menyukai tantangan, seperti coding dengan gaya yang berbeda. Rasakan keberanian di setiap teguk!",
      },
      {
        id: 7,
        name: "Robusta Blend",
        img: "product7.jpg",
        price: 21000,
        deskripsi: "Robusta Blend, perpaduan kopi yang menggoda dan penuh keberanian. Rasa yang kuat dan harga yang terjangkau, membawa semangat coding ke level berikutnya!",
      },
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

//validation form checkout
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

//kirim data ketika checkout button di click
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("https://wa.me/6281553599549?text=" + encodeURIComponent(message));
  console.log(objData);
});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Customer
  Nama : ${obj.name}
  Email : ${obj.email}
  No. HP : ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})\n`)}
TOTAL : ${rupiah(obj.total)}
Terimakasih.`;
};

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
