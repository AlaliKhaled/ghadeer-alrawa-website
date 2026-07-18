/**
 * Image paths matched by index to the message-file lists.
 * These are the client's own branded Ghadir Al-Rawa images.
 * Swap any file in `public/images/...` (JPG/PNG/WebP) — next/image optimizes them.
 */

// Matched to services.items order (see messages/*.json).
export const serviceImages: (string | undefined)[] = [
  "/images/services/s1.webp", // تركيب فلاتر المياه المنزلية
  "/images/services/s2.webp", // صيانة جميع أنواع فلاتر المياه
  "/images/services/s3.webp", // محطات RO الصناعية
  "/images/services/s4.webp", // محطات تحلية مياه البحر
  "/images/services/s5.webp", // أنظمة المعالجة المسبقة
  "/images/services/s6.webp", // إزالة الحديد والمنغنيز والكبريت والسيليكا
  "/images/services/s7.webp", // أنظمة التعقيم UV
  "/images/services/s8.webp", // أنظمة حقن الكلور والمواد الكيميائية
  "/images/services/s9.webp", // أنظمة CIP لغسيل الأغشية
  "/images/services/s10.webp", // توريد قطع الغيار والمضخات والممبرينات
  "/images/services/s11.webp", // عقود الصيانة الدورية
];

// Matched to products.items order.
export const productImages: (string | undefined)[] = [
  "/images/products/p1.webp", // فلاتر منزلية
  "/images/products/p2.webp", // فلاتر تجارية
  "/images/products/p3.webp", // محطات RO
  "/images/products/p4.webp", // محطات Sea Water
  "/images/products/p5.webp", // ممبرينات
  "/images/products/p6.webp", // مضخات ضغط عالي
  "/images/products/p7.webp", // فلاتر رملية وكربونية
  "/images/products/p8.webp", // سوفتنر
  "/images/products/p9.webp", // خزانات
  "/images/products/p10.webp", // أنظمة UV
  "/images/products/p11.webp", // قطع غيار وإكسسوارات
];

/** Strongest branded shots for the Magnetic Carousel showcase (home page).
 *  High-resolution originals from the client's Ghadir Al-Rawa photo sets. */
export const galleryImages: string[] = [
  "/images/gallery/g1.webp", // branded showroom / product wall
  "/images/gallery/g2.webp", // aerial sea-water desalination plant
  "/images/gallery/g3.webp", // high-pressure pump station (seaside)
  "/images/gallery/g4.webp", // RO membrane filtration unit (seaside)
  "/images/gallery/g5.webp", // UV disinfection RO hall
  "/images/gallery/g6.webp", // water-softener tank system
  "/images/gallery/g7.webp", // industrial RO plant with engineers
  "/images/gallery/g8.webp", // compact RO unit close-up
];
