# Md2Pdf

Md2Pdf, tarayıcı içinde çalışan ve yazdığınız Markdown içeriğini anlık olarak önizleyip PDF olarak dışa aktarmanızı sağlayan bir React + Vite uygulamasıdır.

## Proje Amacı

Bu projenin amacı, **backend gerektirmeden** Markdown metnini hızlıca düzenlemek, önizlemek ve paylaşılabilir bir PDF çıktısı üretmektir. Uygulama tamamen istemci tarafında (browser) çalışır.

## Özellikler

- Canlı Markdown editörü ve anlık önizleme
- `remark-gfm` ile GFM (GitHub Flavored Markdown) desteği
- `.md` dosyası yükleme (butonla seçme veya sürükle-bırak)
- Tek tıkla Markdown metnini panoya kopyalama
- Tek tıkla PDF indirme (tarayıcı tabanlı üretim)
- İçerik temizleme ve kelime sayısı gösterimi
- Vite `base` ayarı üzerinden GitHub Pages uyumlu yayın desteği

## Kullanılan Teknolojiler

- **React 18** (arayüz)
- **TypeScript** (tip güvenliği)
- **Vite 5** (geliştirme/build aracı)
- **react-markdown** + **remark-gfm** (Markdown render)
- **html2pdf.js** (önizleme alanını PDF'e dönüştürme)
- **gh-pages** (GitHub Pages'e manuel deploy)

## Kurulum ve Çalıştırma

> Node.js 18+ önerilir.

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Production build alın:

```bash
npm run build
```

4. Build çıktısını localde önizleyin:

```bash
npm run preview
```

## GitHub Pages için `VITE_BASE_PATH` Kullanımı

Vite yapılandırmasında `base` değeri `VITE_BASE_PATH` değişkeninden okunur. Repository adı altına deploy ederken build komutunu şu şekilde çalıştırın:

```bash
VITE_BASE_PATH=/<repo>/ npm run build
```

Örnek:

```bash
VITE_BASE_PATH=/Md2Pdf/ npm run build
```

Bu sayede asset yolları GitHub Pages altında doğru çözülür.

## Manuel `gh-pages` Deploy Adımları

Aşağıdaki adımlar manuel yayın akışı içindir:

1. `main` (veya çalıştığınız) branch'inde güncel olduğunuzdan emin olun.
2. Gerekli paketleri yükleyin:

   ```bash
   npm install
   ```

3. GitHub Pages için doğru base path ile build alın:

   ```bash
   VITE_BASE_PATH=/<repo>/ npm run build
   ```

4. `dist/` klasörünü `gh-pages` branch'ine gönderin:

   ```bash
   npx gh-pages -d dist
   ```

   > Alternatif: varsayılan script ile `npm run deploy` (repo köküne deploy ediyorsanız).

5. GitHub repo ayarlarından **Settings → Pages** bölümünde source olarak `gh-pages` branch'ini seçin.
6. Yayın URL'si açıldığında uygulamayı test edin.

## Tarayıcı Tabanlı PDF Üretiminin Bilinen Limitasyonları

- **Render farkları:** PDF çıktısı, tarayıcı motoruna ve işletim sistemine göre küçük farklılıklar gösterebilir.
- **Çok uzun dokümanlar:** Büyük içeriklerde bellek tüketimi artabilir ve işlem süresi uzayabilir.
- **Sayfa kırılımı:** Karmaşık tablolar/kod bloklarında ideal sayfa kırılımı her zaman garanti edilemez.
- **Font/CORS etkileri:** Harici font veya görseller CORS nedeniyle yüklenemezse çıktı etkilenebilir.
- **Tam baskı motoru değildir:** Browser tabanlı yaklaşım, profesyonel masaüstü dizgi araçları kadar deterministik sonuç vermeyebilir.

## Lisans

Bu depo için henüz bir lisans dosyası tanımlanmamıştır.
