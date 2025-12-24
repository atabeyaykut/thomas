# Image Optimization & Lazy Loading Rehberi

## 🖼️ GÖRSEL OPTİMİZASYONU

### 1. MEVCUT DURUM ANALİZİ

**Sayfadaki Görseller:**
- Logo ve favicon
- Banner görselleri
- Oyun thumbnails
- Promo görselleri
- Icon'lar

### 2. OPTİMİZASYON STRATEJİSİ

#### **A. Görsel Format Seçimi**

**WebP Kullanımı (Öncelik 1):**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Açıklama" loading="lazy">
</picture>
```

**Format Karşılaştırması:**
- WebP: %25-35 daha küçük (modern tarayıcılar)
- JPEG: Fotoğraflar için
- PNG: Şeffaflık gerekiyorsa
- SVG: Logo ve icon'lar için

#### **B. Görsel Boyutlandırma**

**Responsive Images:**
```html
<img 
  srcset="image-320w.webp 320w,
          image-640w.webp 640w,
          image-1024w.webp 1024w"
  sizes="(max-width: 320px) 280px,
         (max-width: 640px) 600px,
         1024px"
  src="image-1024w.webp"
  alt="Slot Oyunu"
  loading="lazy"
>
```

**Önerilen Boyutlar:**
- Thumbnail: 300x200px
- Banner: 1920x600px
- Logo: 200x60px
- Icon: 64x64px

#### **C. Lazy Loading Implementasyonu**

**Native Lazy Loading:**
```html
<img src="image.jpg" alt="Açıklama" loading="lazy">
```

**JavaScript Lazy Loading (Gelişmiş):**
```javascript
// lazy-load.js
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
});
```

**HTML Kullanımı:**
```html
<img 
  data-src="actual-image.jpg" 
  src="placeholder-10x10.jpg"
  alt="Açıklama"
  class="lazy"
>
```

### 3. ALT TEXT OPTİMİZASYONU

#### **İyi Alt Text Örnekleri:**

❌ Kötü:
```html
<img src="slot1.jpg" alt="slot">
```

✅ İyi:
```html
<img src="slot1.jpg" alt="Book of Ra Deluxe slot oyunu - 10 bedava spin kazanın">
```

**Alt Text Kuralları:**
- 125 karakter altında
- Anahtar kelime içersin (doğal)
- Görseli açıklasın
- Keyword stuffing yapma

#### **Kategori Bazlı Alt Text:**

**Slot Oyunları:**
```html
<img src="sweet-bonanza.jpg" alt="Sweet Bonanza slot oyunu - Pragmatic Play">
<img src="gates-olympus.jpg" alt="Gates of Olympus slot - Zeus temalı oyun">
```

**Canlı Casino:**
```html
<img src="live-roulette.jpg" alt="Canlı rulet masası - gerçek krupiye">
<img src="live-blackjack.jpg" alt="Canlı blackjack - HD kalite yayın">
```

**Promosyonlar:**
```html
<img src="welcome-bonus.jpg" alt="Hoş geldin bonusu %300 - ilk yatırım">
<img src="free-spins.jpg" alt="100 bedava spin kampanyası">
```

### 4. GÖRSEL SIKIŞTRIMA

#### **Araçlar:**

**Online Araçlar:**
- TinyPNG.com (PNG/JPEG)
- Squoosh.app (Google)
- Compressor.io
- ImageOptim (Mac)

**CLI Araçları:**
```bash
# ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# WebP dönüşüm
cwebp -q 80 input.jpg -o output.webp

# Batch işlem
for img in *.jpg; do
  cwebp -q 80 "$img" -o "${img%.jpg}.webp"
done
```

**Hedef Boyutlar:**
- Thumbnail: < 50KB
- Banner: < 200KB
- Full image: < 500KB

### 5. CDN OPTİMİZASYONU

**Cloudflare Image Optimization:**
```html
<img src="https://cdn.grandpashabet7034.com/cdn-cgi/image/width=800,quality=85,format=auto/image.jpg">
```

**Parametreler:**
- `width=800` - Genişlik
- `quality=85` - Kalite (80-90 optimal)
- `format=auto` - Otomatik format (WebP destekliyorsa)
- `fit=cover` - Crop modu

### 6. LAZY LOADING SCRIPT

**Tam Implementasyon:**

```javascript
// public/lazy-images.js
(function() {
  'use strict';
  
  // Placeholder için blur effect
  const style = document.createElement('style');
  style.innerHTML = `
    img.lazy {
      filter: blur(10px);
      transition: filter 0.3s;
    }
    img.lazy.loaded {
      filter: blur(0);
    }
  `;
  document.head.appendChild(style);
  
  // Intersection Observer
  const config = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };
  
  let observer;
  
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(onIntersection, config);
  } else {
    // Fallback for old browsers
    loadImagesImmediately();
  }
  
  function onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        preloadImage(entry.target);
      }
    });
  }
  
  function preloadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    const tempImg = new Image();
    tempImg.onload = function() {
      img.src = src;
      img.classList.add('loaded');
    };
    tempImg.src = src;
  }
  
  function loadImagesImmediately() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }
  
  // Initialize
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => observer.observe(img));
  
  console.log('✅ Lazy loading initialized for', images.length, 'images');
})();
```

### 7. GÖRSEL SEO CHECKLIST

#### **Her Görsel İçin:**
- [ ] Alt text optimize edildi
- [ ] Dosya adı SEO-friendly (slot-oyunu-book-of-ra.jpg)
- [ ] Boyut optimize edildi (< 200KB)
- [ ] WebP formatı var
- [ ] Lazy loading aktif
- [ ] Responsive sizes tanımlı
- [ ] Title attribute eklendi (opsiyonel)

#### **Sayfa Bazında:**
- [ ] Toplam görsel boyutu < 2MB
- [ ] Critical images preload edildi
- [ ] Above-the-fold görseller eager load
- [ ] Below-the-fold görseller lazy load

### 8. IMAGE SITEMAP

**images-sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://grandpashabet7034.com/</loc>
    <image:image>
      <image:loc>https://cdn.grandpashabet7034.com/slot-games/sweet-bonanza.jpg</image:loc>
      <image:caption>Sweet Bonanza slot oyunu</image:caption>
      <image:title>Sweet Bonanza - Pragmatic Play</image:title>
    </image:image>
    <image:image>
      <image:loc>https://cdn.grandpashabet7034.com/banners/welcome-bonus.jpg</image:loc>
      <image:caption>%300 hoş geldin bonusu</image:caption>
    </image:image>
  </url>
</urlset>
```

### 9. PERFORMANS HEDEFLERİ

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
  - Ana banner lazy load YAPMA
  - Critical CSS inline
  - Preload hero image

- CLS (Cumulative Layout Shift): < 0.1
  - Width/height attribute her zaman ekle
  - Aspect ratio tanımla

**Örnek:**
```html
<img 
  src="banner.jpg" 
  alt="Casino banner"
  width="1920" 
  height="600"
  style="aspect-ratio: 1920/600"
  loading="eager"
>
```

### 10. GÖRSEL OPTİMİZASYON WORKFLOW

#### **Yeni Görsel Ekleme Süreci:**

1. **Orijinal görseli al** (yüksek kalite)
2. **Resize et** (gerekli boyutlara)
3. **Optimize et** (TinyPNG, Squoosh)
4. **WebP'ye çevir**
5. **SEO-friendly dosya adı** ver
6. **Alt text yaz**
7. **HTML'e ekle** (lazy loading ile)
8. **Test et** (PageSpeed Insights)

#### **Toplu Optimizasyon Script:**
```bash
#!/bin/bash
# optimize-images.sh

for img in *.jpg *.png; do
  # WebP'ye çevir
  cwebp -q 85 "$img" -o "${img%.*}.webp"
  
  # JPEG optimize et
  jpegoptim --max=85 --strip-all "$img"
  
  # PNG optimize et
  optipng -o7 "$img"
done

echo "✅ Tüm görseller optimize edildi"
```

### 11. BROWSER CACHING

**HTML Header:**
```html
<link rel="preload" as="image" href="hero-banner.webp">
<link rel="prefetch" as="image" href="next-page-image.webp">
```

**.htaccess (Apache):**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 12. MOBİL OPTİMİZASYON

**Responsive Images:**
```html
<picture>
  <source media="(max-width: 640px)" srcset="mobile-320w.webp">
  <source media="(max-width: 1024px)" srcset="tablet-768w.webp">
  <source srcset="desktop-1920w.webp">
  <img src="desktop-1920w.jpg" alt="Banner" loading="lazy">
</picture>
```

### 13. TEST & MONITORING

#### **Test Araçları:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Lighthouse (Chrome DevTools)

#### **Kontrol Edilecekler:**
- [ ] Görsel yükleme süresi
- [ ] Total image size
- [ ] Lazy loading çalışıyor mu
- [ ] WebP support
- [ ] Alt text coverage

#### **Hedef Skorlar:**
- PageSpeed Mobile: > 90
- PageSpeed Desktop: > 95
- GTmetrix Grade: A
- Total Image Size: < 2MB

---

## 🎯 HIZLI UYGULAMA

### **Bugün Yapılacaklar:**

1. **Tüm görsellere alt text ekle**
2. **Lazy loading script'i ekle**
3. **WebP formatına çevir**
4. **Image sitemap oluştur**
5. **PageSpeed test yap**

### **Bu Hafta:**

1. **Tüm görselleri optimize et**
2. **Responsive images ekle**
3. **CDN optimizasyonu**
4. **Browser caching ayarla**

Bu rehberi takip edersen sayfa hızı %30-50 artacak! 🚀
