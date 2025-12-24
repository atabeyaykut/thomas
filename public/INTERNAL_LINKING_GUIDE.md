# Internal Linking Optimization Rehberi

## 🔗 İÇ BAĞLANTI STRATEJİSİ

### 1. INTERNAL LINKING NEDİR?

Internal linking, sitenizin bir sayfasından başka bir sayfasına verilen linklerdir.

**Faydaları:**
- ✅ SEO gücü dağıtımı (Link Juice)
- ✅ Kullanıcı deneyimi iyileşir
- ✅ Sayfa otoritesi artar
- ✅ Crawl edilebilirlik artar
- ✅ Dwell time uzar

### 2. MEVCUT SAYFA YAPISI

**Ana Sayfalar:**
- Ana Sayfa (/)
- Casino (/tr/lobby/casino/main.html)
- Canlı Casino (/tr/lobby/livecasino/main.html)
- Spor Bahisleri (/sport.html)
- Promosyonlar (/promotions.html)
- Kurallar & SSS (/rules/)

### 3. INTERNAL LINKING MİMARİSİ

#### **A. Hub & Spoke Modeli**

```
Ana Sayfa (Hub)
    ├── Casino (Spoke)
    │   ├── Slot Oyunları
    │   ├── Jackpot Oyunları
    │   └── Masa Oyunları
    ├── Canlı Casino (Spoke)
    │   ├── Canlı Rulet
    │   ├── Canlı Blackjack
    │   └── Canlı Poker
    ├── Spor Bahisleri (Spoke)
    │   ├── Futbol
    │   ├── Basketbol
    │   └── Tenis
    └── Promosyonlar (Spoke)
        ├── Hoş Geldin Bonusu
        ├── Yatırım Bonusu
        └── Kayıp Bonusu
```

#### **B. Siloing Stratejisi**

**Silo 1: Casino Oyunları**
```
Casino Ana Sayfa
├── Slot Kategorisi
│   ├── Book of Ra
│   ├── Sweet Bonanza
│   └── Gates of Olympus
├── Jackpot Kategorisi
└── Masa Oyunları Kategorisi
```

**Her silo içinde:**
- Kategori sayfası → Alt sayfalar
- Alt sayfalar → Kategori sayfası
- Alt sayfalar → İlgili alt sayfalar
- Kategori sayfası → Ana sayfa

### 4. ANCHOR TEXT OPTİMİZASYONU

#### **Anchor Text Tipleri:**

**1. Exact Match (Tam Eşleşme) - %10**
```html
<a href="/tr/lobby/casino/main.html">slot oyunları</a>
```

**2. Partial Match (Kısmi Eşleşme) - %30**
```html
<a href="/tr/lobby/casino/main.html">en iyi slot oyunları</a>
```

**3. Branded (Marka) - %20**
```html
<a href="/">GrandPashabet</a>
```

**4. Generic (Genel) - %20**
```html
<a href="/promotions.html">buraya tıklayın</a>
```

**5. Naked URL - %10**
```html
<a href="/">grandpashabet7034.com</a>
```

**6. Image Alt Text - %10**
```html
<a href="/tr/lobby/casino/main.html">
  <img src="casino.jpg" alt="casino oyunları">
</a>
```

#### **Örnek Anchor Text Kullanımı:**

❌ Kötü (Over-optimization):
```html
<a href="/casino">slot oyunları</a>
<a href="/casino">slot oyunları</a>
<a href="/casino">slot oyunları</a>
```

✅ İyi (Çeşitli):
```html
<a href="/casino">slot oyunları</a>
<a href="/casino">casino oyunlarını keşfedin</a>
<a href="/casino">buradan oynayın</a>
```

### 5. INTERNAL LINK YERLEŞİMİ

#### **A. Navigasyon Menüsü**

**Header Navigation:**
```html
<nav>
  <a href="/">Ana Sayfa</a>
  <a href="/tr/lobby/casino/main.html">Casino</a>
  <a href="/tr/lobby/livecasino/main.html">Canlı Casino</a>
  <a href="/sport.html">Spor Bahisleri</a>
  <a href="/promotions.html">Promosyonlar</a>
</nav>
```

**Footer Navigation:**
```html
<footer>
  <div class="footer-column">
    <h3>Hakkımızda</h3>
    <a href="/rules/tr/12377.html">Hakkımızda</a>
    <a href="/rules/tr/12369.html">Hüküm ve Koşullar</a>
    <a href="/rules/tr/16463.html">SSS</a>
  </div>
  <div class="footer-column">
    <h3>Oyunlar</h3>
    <a href="/tr/lobby/casino/main.html">Slot Oyunları</a>
    <a href="/tr/lobby/livecasino/main.html">Canlı Casino</a>
  </div>
</footer>
```

#### **B. Contextual Links (İçerik İçi)**

**Blog Yazısı Örneği:**
```html
<article>
  <h1>2025'in En İyi Slot Oyunları</h1>
  <p>
    Online casino dünyasında <a href="/tr/lobby/casino/main.html">slot oyunları</a> 
    her zaman en popüler seçenek olmuştur. Özellikle 
    <a href="/games/sweet-bonanza.html">Sweet Bonanza</a> gibi oyunlar...
  </p>
  <p>
    Eğer <a href="/promotions.html">hoş geldin bonusu</a> ile başlamak 
    isterseniz, <a href="/register.html">üye olun</a>.
  </p>
</article>
```

#### **C. Related Posts/Games**

```html
<aside class="related-games">
  <h3>İlgili Oyunlar</h3>
  <ul>
    <li><a href="/games/book-of-ra.html">Book of Ra Deluxe</a></li>
    <li><a href="/games/gates-olympus.html">Gates of Olympus</a></li>
    <li><a href="/games/sugar-rush.html">Sugar Rush</a></li>
  </ul>
</aside>
```

#### **D. Breadcrumbs**

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li><a href="/">Ana Sayfa</a></li>
    <li><a href="/tr/lobby/casino/main.html">Casino</a></li>
    <li><a href="/games/slots/">Slot Oyunları</a></li>
    <li class="active">Sweet Bonanza</li>
  </ol>
</nav>
```

### 6. LINK DEPTH (SAYFA DERİNLİĞİ)

**Optimal Yapı:**
```
Ana Sayfa (Depth 0)
  └── Kategori (Depth 1)
      └── Alt Kategori (Depth 2)
          └── Ürün/Sayfa (Depth 3)
```

**Hedef:**
- Tüm önemli sayfalar 3 tıklamada erişilebilir olmalı
- Homepage'den maksimum 3 link uzaklığı

**Kontrol:**
```javascript
// Sayfa derinliğini kontrol et
function checkPageDepth(url) {
  const depth = url.split('/').filter(x => x).length - 1;
  console.log(`Page depth: ${depth}`);
  return depth;
}
```

### 7. INTERNAL LINK SAYISI

#### **Sayfa Bazında Öneriler:**

**Ana Sayfa:**
- 50-100 internal link (optimal)
- Header nav: 5-10 link
- Footer nav: 20-30 link
- Content area: 20-40 link

**Kategori Sayfaları:**
- 30-60 internal link
- Related categories: 5-10
- Product/game links: 20-40

**Ürün/Oyun Sayfaları:**
- 10-20 internal link
- Breadcrumb: 3-5
- Related items: 5-10
- CTA links: 2-3

**Blog Yazıları:**
- 5-15 internal link
- Contextual links: 3-8
- Related posts: 3-5

### 8. LINK EQUITY DAĞITIMI

#### **PageRank Akışı:**

```
Ana Sayfa (PR 100)
  ├── Casino (PR 25)
  ├── Canlı Casino (PR 25)
  ├── Spor (PR 25)
  └── Promosyonlar (PR 25)
```

**Link Juice Optimizasyonu:**
- Önemli sayfalara daha fazla internal link
- Nofollow kullanma (internal linkler için)
- Orphan pages (yetim sayfalar) olmasın

### 9. INTERNAL LINKING CHECKLIST

#### **Her Sayfa İçin:**
- [ ] En az 3 internal link var
- [ ] Breadcrumb navigation mevcut
- [ ] Related content bölümü var
- [ ] Anchor text çeşitli
- [ ] Broken link yok
- [ ] Orphan page değil
- [ ] 3 tıklamada erişilebilir

#### **Site Geneli:**
- [ ] Sitemap güncel
- [ ] Navigation tutarlı
- [ ] Footer links optimize
- [ ] Silo yapısı kurulu
- [ ] Link depth < 3

### 10. INTERNAL LINK PATTERN'LERİ

#### **Pattern 1: Topic Clusters**

```
Pillar Page: "Online Casino Rehberi"
  ├── Cluster 1: "Slot Oyunları Nasıl Oynanır"
  ├── Cluster 2: "En İyi Slot Stratejileri"
  ├── Cluster 3: "Slot RTP Nedir"
  └── Cluster 4: "Progressive Jackpot Slotlar"
```

Her cluster page → Pillar page'e link
Pillar page → Her cluster'a link

#### **Pattern 2: Sequential Linking**

```
Part 1: Başlangıç Rehberi
  ↓ (Next: Part 2)
Part 2: Orta Seviye Stratejiler
  ↓ (Next: Part 3)
Part 3: İleri Seviye Taktikler
```

#### **Pattern 3: Pyramid Linking**

```
        Ana Sayfa
       /    |    \
    Cat1  Cat2  Cat3
    / \   / \   / \
   P1 P2 P3 P4 P5 P6
```

### 11. CONTEXTUAL LINKING ÖRNEKLERI

#### **Örnek 1: Casino Yazısı**

```html
<article>
  <h1>Sweet Bonanza Slot İncelemesi</h1>
  
  <p>
    <a href="/games/sweet-bonanza.html">Sweet Bonanza</a>, 
    <a href="/providers/pragmatic-play.html">Pragmatic Play</a> 
    tarafından geliştirilen popüler bir 
    <a href="/categories/slot-games.html">slot oyunudur</a>.
  </p>
  
  <h2>Nasıl Oynanır?</h2>
  <p>
    Oyunu <a href="/tr/lobby/casino/main.html">casino lobimizde</a> 
    bulabilir ve <a href="/promotions/free-spins.html">bedava spinler</a> 
    ile deneyebilirsiniz.
  </p>
  
  <h2>Benzer Oyunlar</h2>
  <ul>
    <li><a href="/games/gates-olympus.html">Gates of Olympus</a></li>
    <li><a href="/games/sugar-rush.html">Sugar Rush</a></li>
  </ul>
  
  <p>
    Daha fazla bilgi için 
    <a href="/guides/slot-strategies.html">slot stratejileri rehberimize</a> 
    göz atın veya <a href="/register.html">hemen üye olun</a>.
  </p>
</article>
```

#### **Örnek 2: Promo Sayfası**

```html
<div class="promotion">
  <h1>%300 Hoş Geldin Bonusu</h1>
  
  <p>
    <a href="/register.html">Yeni üyelere</a> özel 
    <strong>%300 bonus</strong> fırsatı! 
    <a href="/tr/lobby/casino/main.html">Slot oyunlarında</a> 
    kullanabilirsiniz.
  </p>
  
  <h2>Bonus Nasıl Alınır?</h2>
  <ol>
    <li><a href="/register.html">Üye olun</a></li>
    <li><a href="/deposit.html">İlk yatırımınızı yapın</a></li>
    <li><a href="/tr/lobby/casino/main.html">Oynamaya başlayın</a></li>
  </ol>
  
  <p>
    Detaylar için 
    <a href="/rules/tr/bonus-terms.html">bonus şartlarını</a> 
    okuyun.
  </p>
</div>
```

### 12. AUTOMATED INTERNAL LINKING

#### **WordPress Plugin Benzeri Sistem:**

```javascript
// auto-internal-links.js
const linkingRules = {
  keywords: {
    'slot oyunları': '/tr/lobby/casino/main.html',
    'canlı casino': '/tr/lobby/livecasino/main.html',
    'spor bahisleri': '/sport.html',
    'hoş geldin bonusu': '/promotions.html',
    'üye ol': '/register.html'
  },
  maxLinksPerKeyword: 3,
  minWordCount: 500
};

function autoLinkContent(content) {
  let linkedContent = content;
  let linkCount = {};
  
  for (let [keyword, url] of Object.entries(linkingRules.keywords)) {
    linkCount[keyword] = 0;
    
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    linkedContent = linkedContent.replace(regex, (match) => {
      if (linkCount[keyword] < linkingRules.maxLinksPerKeyword) {
        linkCount[keyword]++;
        return `<a href="${url}">${match}</a>`;
      }
      return match;
    });
  }
  
  return linkedContent;
}
```

### 13. INTERNAL LINK MONITORING

#### **Tracking Metrikleri:**

**Google Analytics:**
```javascript
// Track internal link clicks
document.querySelectorAll('a[href^="/"]').forEach(link => {
  link.addEventListener('click', function() {
    gtag('event', 'internal_link_click', {
      'link_url': this.href,
      'link_text': this.textContent,
      'source_page': window.location.pathname
    });
  });
});
```

**Kontrol Edilecekler:**
- Click-through rate (CTR)
- Most clicked internal links
- Orphan pages
- Broken links
- Link depth distribution

### 14. BROKEN LINK KONTROLÜ

#### **Script:**

```javascript
// check-broken-links.js
async function checkInternalLinks() {
  const links = document.querySelectorAll('a[href^="/"]');
  const brokenLinks = [];
  
  for (let link of links) {
    try {
      const response = await fetch(link.href, { method: 'HEAD' });
      if (!response.ok) {
        brokenLinks.push({
          url: link.href,
          text: link.textContent,
          status: response.status
        });
      }
    } catch (error) {
      brokenLinks.push({
        url: link.href,
        text: link.textContent,
        error: error.message
      });
    }
  }
  
  console.log('Broken links:', brokenLinks);
  return brokenLinks;
}
```

### 15. BEST PRACTICES

#### **Yapılması Gerekenler:**
✅ Doğal anchor text kullan
✅ Relevant sayfalar arası link
✅ Deep linking yap (sadece homepage'e değil)
✅ Breadcrumb ekle
✅ Related content göster
✅ Sitemap güncel tut

#### **Yapılmaması Gerekenler:**
❌ Keyword stuffing
❌ Aynı anchor text tekrar
❌ Irrelevant linkler
❌ Çok fazla link (spam)
❌ Nofollow internal linkler
❌ Orphan pages bırakma

### 16. INTERNAL LINKING TEMPLATE

#### **Sayfa Şablonu:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Sayfa Başlığı</title>
</head>
<body>
  <!-- Breadcrumb -->
  <nav aria-label="breadcrumb">
    <ol>
      <li><a href="/">Ana Sayfa</a></li>
      <li><a href="/category/">Kategori</a></li>
      <li>Mevcut Sayfa</li>
    </ol>
  </nav>
  
  <!-- Main Content -->
  <article>
    <h1>Başlık</h1>
    <p>
      İçerik ile <a href="/related-page.html">ilgili sayfa</a> linki.
    </p>
  </article>
  
  <!-- Related Content -->
  <aside>
    <h3>İlgili İçerikler</h3>
    <ul>
      <li><a href="/related-1.html">İlgili 1</a></li>
      <li><a href="/related-2.html">İlgili 2</a></li>
      <li><a href="/related-3.html">İlgili 3</a></li>
    </ul>
  </aside>
  
  <!-- CTA -->
  <div class="cta">
    <a href="/register.html">Hemen Üye Ol</a>
  </div>
</body>
</html>
```

---

## 🎯 HIZLI UYGULAMA

### **Bu Hafta Yapılacaklar:**

1. **Tüm sayfalara breadcrumb ekle**
2. **Related content bölümleri oluştur**
3. **Orphan pages tespit et ve linkle**
4. **Broken link kontrolü yap**
5. **Anchor text çeşitliliğini artır**

### **Bu Ay:**

1. **Topic cluster yapısı kur**
2. **Internal link tracking ekle**
3. **Automated linking sistemi**
4. **Link depth optimizasyonu**

Internal linking doğru yapılırsa SEO'da %20-30 artış görürsün! 🚀
