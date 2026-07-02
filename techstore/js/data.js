// =============================================
// ДАННЫЕ ТОВАРОВ — здесь можно добавлять/менять товары
// =============================================

const PRODUCTS = [
  // ===== ИГРОВЫЕ ПК =====
  {
    id: 1,
    name: "NEXUS Beast RTX 4080",
    category: "gaming",
    price: 219000,
    oldPrice: 259000,
    image: "https://placehold.co/400x300/0d1f35/00f5a0?text=Gaming+PC",
    specs: ["Intel Core i9-13900K", "RTX 4080 16GB", "32GB DDR5", "2TB NVMe SSD"],
    badge: "Хит",
    isNew: false,
    isPopular: true
  },
  {
    id: 2,
    name: "NEXUS Pro RTX 4070Ti",
    category: "gaming",
    price: 159000,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1f35/00f5a0?text=Pro+Gaming",
    specs: ["Intel Core i7-13700K", "RTX 4070Ti 12GB", "32GB DDR5", "1TB NVMe SSD"],
    badge: null,
    isNew: true,
    isPopular: true
  },
  {
    id: 3,
    name: "NEXUS Entry RTX 4060",
    category: "gaming",
    price: 89000,
    oldPrice: 99000,
    image: "https://placehold.co/400x300/0d1f35/00f5a0?text=Entry+Gaming",
    specs: ["Intel Core i5-13600K", "RTX 4060 8GB", "16GB DDR4", "512GB NVMe SSD"],
    badge: "–10%",
    isNew: false,
    isPopular: false
  },
  {
    id: 4,
    name: "NEXUS Ultra RTX 4090",
    category: "gaming",
    price: 389000,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1f35/00f5a0?text=Ultra+PC",
    specs: ["Intel Core i9-14900K", "RTX 4090 24GB", "64GB DDR5", "4TB NVMe SSD"],
    badge: "Premium",
    isNew: true,
    isPopular: true
  },

  // ===== НОУТБУКИ =====
  {
    id: 5,
    name: "ASUS ROG Strix G16",
    category: "laptop",
    price: 139000,
    oldPrice: 159000,
    image: "https://placehold.co/400x300/1a0d35/a000f5?text=ROG+Strix",
    specs: ["AMD Ryzen 9 7945HX", "RTX 4070 8GB", "16GB DDR5", "1TB NVMe"],
    badge: "–13%",
    isNew: false,
    isPopular: true
  },
  {
    id: 6,
    name: "MacBook Pro 14 M3",
    category: "laptop",
    price: 189000,
    oldPrice: null,
    image: "https://placehold.co/400x300/1a1a1a/ffffff?text=MacBook+Pro",
    specs: ["Apple M3 Pro", "18-core GPU", "18GB RAM", "512GB SSD"],
    badge: "Новинка",
    isNew: true,
    isPopular: true
  },
  {
    id: 7,
    name: "Lenovo ThinkPad X1 Carbon",
    category: "laptop",
    price: 119000,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1a35/0080ff?text=ThinkPad",
    specs: ["Intel Core i7-1365U", "Intel Iris Xe", "16GB LPDDR5", "512GB SSD"],
    badge: null,
    isNew: false,
    isPopular: false
  },
  {
    id: 8,
    name: "ASUS TUF Gaming F15",
    category: "laptop",
    price: 79000,
    oldPrice: 89000,
    image: "https://placehold.co/400x300/1a0d35/ff6600?text=TUF+F15",
    specs: ["Intel Core i5-12500H", "RTX 3050 4GB", "8GB DDR4", "512GB NVMe"],
    badge: "–11%",
    isNew: false,
    isPopular: false
  },

  // ===== МОНИТОРЫ =====
  {
    id: 9,
    name: "LG UltraGear 27GP950",
    category: "monitor",
    price: 65000,
    oldPrice: 75000,
    image: "https://placehold.co/400x300/0d1535/0066ff?text=LG+4K+Monitor",
    specs: ["27\", 4K IPS", "144Hz, 1ms", "HDMI 2.1, DP 1.4", "HDR600"],
    badge: "–13%",
    isNew: false,
    isPopular: true
  },
  {
    id: 10,
    name: "Samsung Odyssey G7 32\"",
    category: "monitor",
    price: 55000,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1535/0066ff?text=Odyssey+G7",
    specs: ["32\", 2K VA", "240Hz, 1ms", "G-Sync Compatible", "HDR600"],
    badge: "Новинка",
    isNew: true,
    isPopular: false
  },
  {
    id: 11,
    name: "Dell Alienware AW3423DW",
    category: "monitor",
    price: 89000,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1535/00aaff?text=Alienware+34",
    specs: ["34\", QD-OLED", "175Hz, 0.1ms", "3440×1440", "HDR 1000"],
    badge: "Premium",
    isNew: false,
    isPopular: true
  },

  // ===== ВИДЕОКАРТЫ =====
  {
    id: 12,
    name: "NVIDIA GeForce RTX 4080",
    category: "gpu",
    price: 99000,
    oldPrice: 115000,
    image: "https://placehold.co/400x300/1a1a0d/ffdd00?text=RTX+4080",
    specs: ["16GB GDDR6X", "DLSS 3.0", "ADA Lovelace", "Ray Tracing Gen 3"],
    badge: "–14%",
    isNew: false,
    isPopular: true
  },
  {
    id: 13,
    name: "NVIDIA GeForce RTX 4070",
    category: "gpu",
    price: 59000,
    oldPrice: null,
    image: "https://placehold.co/400x300/1a1a0d/ffdd00?text=RTX+4070",
    specs: ["12GB GDDR6X", "DLSS 3.0", "ADA Lovelace", "Ray Tracing"],
    badge: null,
    isNew: false,
    isPopular: true
  },
  {
    id: 14,
    name: "AMD Radeon RX 7900 XTX",
    category: "gpu",
    price: 89000,
    oldPrice: 99000,
    image: "https://placehold.co/400x300/1a0d0d/ff4444?text=RX+7900+XTX",
    specs: ["24GB GDDR6", "RDNA 3", "Ray Accelerators", "AV1 Encode"],
    badge: "–10%",
    isNew: false,
    isPopular: false
  },
  {
    id: 15,
    name: "NVIDIA GeForce RTX 4060 Ti",
    category: "gpu",
    price: 39000,
    oldPrice: null,
    image: "https://placehold.co/400x300/1a1a0d/ffdd00?text=RTX+4060Ti",
    specs: ["8GB GDDR6", "DLSS 3.0", "Ada Lovelace", "HDMI 2.1"],
    badge: "Новинка",
    isNew: true,
    isPopular: false
  },

  // ===== ПРОЦЕССОРЫ =====
  {
    id: 16,
    name: "Intel Core i9-13900K",
    category: "cpu",
    price: 39000,
    oldPrice: 45000,
    image: "https://placehold.co/400x300/0d1a0d/00cc66?text=i9-13900K",
    specs: ["24 ядра (8P+16E)", "Boost до 5.8GHz", "Socket LGA1700", "125W TDP"],
    badge: "–13%",
    isNew: false,
    isPopular: true
  },
  {
    id: 17,
    name: "AMD Ryzen 9 7950X",
    category: "cpu",
    price: 49000,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1a0d/ff6600?text=Ryzen+9+7950X",
    specs: ["16 ядер / 32 потока", "Boost до 5.7GHz", "Socket AM5", "170W TDP"],
    badge: "Premium",
    isNew: false,
    isPopular: true
  },
  {
    id: 18,
    name: "Intel Core i5-13600K",
    category: "cpu",
    price: 21000,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1a0d/00cc66?text=i5-13600K",
    specs: ["14 ядер (6P+8E)", "Boost до 5.1GHz", "Socket LGA1700", "125W TDP"],
    badge: null,
    isNew: false,
    isPopular: false
  },

  // ===== ПЕРИФЕРИЯ =====
  {
    id: 19,
    name: "Logitech G Pro X Superlight 2",
    category: "periphery",
    price: 12000,
    oldPrice: 14500,
    image: "https://placehold.co/400x300/0d0d1a/8855ff?text=G+Pro+X",
    specs: ["HERO 25K сенсор", "Беспроводная", "63г / PTFE тефлон", "70ч. батарея"],
    badge: "–17%",
    isNew: false,
    isPopular: true
  },
  {
    id: 20,
    name: "SteelSeries Apex Pro TKL",
    category: "periphery",
    price: 18500,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d0d1a/ff4488?text=Apex+Pro+TKL",
    specs: ["OmniPoint 2.0 свитчи", "RGB подсветка", "OLED дисплей", "USB-C"],
    badge: "Новинка",
    isNew: true,
    isPopular: false
  },
  {
    id: 21,
    name: "Razer BlackShark V2 Pro",
    category: "accessories",
    price: 14000,
    oldPrice: 16000,
    image: "https://placehold.co/400x300/1a0d0d/00ff88?text=BlackShark+V2",
    specs: ["50мм Triforce драйверы", "THX Spatial Audio", "Беспроводная 2.4GHz", "70ч. батарея"],
    badge: "–13%",
    isNew: false,
    isPopular: false
  },
  {
    id: 22,
    name: "Samsung 980 Pro 2TB NVMe",
    category: "accessories",
    price: 11500,
    oldPrice: null,
    image: "https://placehold.co/400x300/0d1535/0088ff?text=980+Pro+SSD",
    specs: ["PCIe 4.0 NVMe", "Чтение 7000 MB/s", "Запись 6500 MB/s", "M.2 2280"],
    badge: null,
    isNew: false,
    isPopular: true
  }
];
