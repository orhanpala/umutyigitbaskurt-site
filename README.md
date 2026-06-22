# umutyigitbaskurt.com

Umut Yiğit Başkurt için Next.js 14 (App Router) + Supabase ile geliştirilmiş,
iki dilli (TR/EN) kişisel portfolyo sitesi ve şifre korumalı admin paneli.

## İçindekiler

1. [Teknik yığın](#teknik-yığın)
2. [Yerelde çalıştırma](#yerelde-çalıştırma)
3. [Supabase projesi kurulumu](#supabase-projesi-kurulumu)
4. [`.env.local` doldurma](#envlocal-doldurma)
5. [Admin kullanıcısı oluşturma](#admin-kullanıcısı-oluşturma)
6. [GitHub'a push etme](#githuba-push-etme)
7. [Vercel'e deploy etme](#vercele-deploy-etme)
8. [umutyigitbaskurt.com alan adını bağlama](#umutyigitbaskurtcom-alan-adını-bağlama)
9. [İçerik yönetimi (admin panel)](#i̇çerik-yönetimi-admin-panel)
10. [Proje yapısı](#proje-yapısı)

---

## Teknik yığın

- **Next.js 14** — App Router, TypeScript, Server Actions
- **Tailwind CSS** — `onaylanan-tasarim.html` ile birebir uyumlu renk/tipografi tokenları
- **Supabase** — Postgres veritabanı, Auth (admin girişi), Storage (görsel yükleme)
- İçerik modeli: her metin alanının `_tr` ve `_en` versiyonu var (ör. `title_tr` / `title_en`)

## Yerelde çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın — otomatik
olarak `/tr` adresine yönlendirilirsiniz. `.env.local` doldurulmadan da site
açılır (varsayılan/boş içerikle), ama gerçek verileri görmek ve admin paneline
giriş yapabilmek için aşağıdaki Supabase kurulumunu tamamlamanız gerekir.

## Supabase projesi kurulumu

1. [supabase.com](https://supabase.com) üzerinden ücretsiz bir hesap açın,
   **New Project** ile yeni bir proje oluşturun (bölge olarak Avrupa'ya yakın
   bir bölge seçmeniz önerilir).
2. Proje hazır olduğunda sol menüden **SQL Editor**'ü açın, **New query**
   deyip bu repodaki `supabase/schema.sql` dosyasının tüm içeriğini yapıştırıp
   **Run** ile çalıştırın. Bu işlem şunları oluşturur:
   - `about`, `projects`, `blog_posts`, `certificates`, `messages` tabloları
   - Her tablo için Row Level Security (RLS) politikaları (herkes yayınlanmış
     içeriği okuyabilir, sadece giriş yapan kullanıcı yazabilir/silebilir,
     iletişim mesajlarını herkes gönderebilir ama sadece admin okuyabilir)
   - Görseller için herkese açık okumalı, sadece admin yazabilen `media`
     adında bir Storage bucket'ı
3. Sol menüden **Project Settings > API** sayfasına gidin; `Project URL` ve
   `anon public` anahtarını not edin — bir sonraki adımda kullanacaksınız.

## `.env.local` doldurma

Proje kökünde `.env.example` dosyasını kopyalayıp `.env.local` adıyla kaydedin:

```bash
cp .env.example .env.local
```

Ardından Supabase'den aldığınız değerlerle doldurun:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxx
NEXT_PUBLIC_SITE_URL=https://umutyigitbaskurt.com
```

`.env.local` dosyası `.gitignore` içinde olduğu için GitHub'a gönderilmez —
bu değerleri Vercel'de ayrıca proje ayarlarından eklemeniz gerekecek (bkz.
[Vercel'e deploy etme](#vercele-deploy-etme)).

## Admin kullanıcısı oluşturma

Admin panelinde herkesin kayıt olabileceği bir "üye ol" formu **kasıtlı
olarak yok** — tek kullanıcı (Umut Yiğit) Supabase Dashboard üzerinden elle
oluşturulur:

1. Supabase Dashboard'da **Authentication > Users** sayfasına gidin.
2. **Add user > Create new user** ile e-posta + şifre belirleyin.
3. **Auto Confirm User** seçeneğini işaretleyin (e-posta doğrulama akışını
   atlamak için).
4. Bu e-posta/şifre ile artık `/admin` adresinden giriş yapabilirsiniz.

## GitHub'a push etme

```bash
git init
git add .
git commit -m "İlk sürüm: umutyigitbaskurt.com"
git branch -M main
git remote add origin https://github.com/<kullanici-adiniz>/umutyigitbaskurt-site.git
git push -u origin main
```

> Not: `proje-iskeleti/` klasörü bu reponun kökü olacak şekilde GitHub'a
> push edilmelidir (yani bu README'nin bulunduğu klasör repo köküdür).

## Vercel'e deploy etme

1. [vercel.com](https://vercel.com) hesabınızla giriş yapın, **Add New >
   Project** deyip yukarıda push ettiğiniz GitHub reposunu seçin.
2. Framework olarak Vercel otomatik **Next.js** algılayacaktır, ek bir ayar
   gerekmez.
3. **Environment Variables** bölümüne `.env.local` içindeki üç değişkeni
   ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` → `https://umutyigitbaskurt.com`
4. **Deploy** butonuna basın. Birkaç dakika içinde `*.vercel.app` adresinde
   siteniz yayında olacak.

## umutyigitbaskurt.com alan adını bağlama

1. Alan adını **Türk Ticaret** üzerinden satın alın (bu adım daha önce
   yapılmamışsa).
2. Vercel projenizde **Settings > Domains** sayfasına gidin,
   `umutyigitbaskurt.com` yazıp **Add** deyin. Vercel size eklemeniz gereken
   DNS kayıtlarını gösterecektir — genellikle:
   - `A` kaydı: `@` → `76.76.21.21`
   - `CNAME` kaydı: `www` → `cname.vercel-dns.com`

   (Vercel arayüzünde gösterilen tam değerleri kullanın; zamanla değişebilir.)
3. Türk Ticaret yönetim panelinde alan adınızın **DNS Ayarları / Nameserver**
   bölümüne girin ve Vercel'in verdiği `A` ve `CNAME` kayıtlarını ekleyin.
4. DNS yayılması genelde birkaç dakika ile birkaç saat sürebilir. Vercel,
   kayıtlar doğrulandığında otomatik olarak ücretsiz SSL sertifikası
   oluşturur.
5. `NEXT_PUBLIC_SITE_URL` ortam değişkeninin Vercel'de
   `https://umutyigitbaskurt.com` olarak ayarlı olduğundan emin olun.

## İçerik yönetimi (admin panel)

`/admin` adresinden giriş yaptıktan sonra:

- **Projeler / Sertifikalar** — ekle, düzenle, sil; listede ▲/▼ tuşlarıyla
  sırala (anasayfa ve liste sayfaları bu sıraya göre gösterir). Projelerde
  tek kapak görseli yanında çoklu galeri görseli de yüklenebilir, proje
  detay sayfasının altında grid olarak gösterilir.
- **Blog** — ekle, düzenle, sil; kategori/etiket alanı (liste sayfasında
  sekme olarak filtrelenir), okuma süresi otomatik hesaplanır; görseller
  doğrudan forma sürükleyip Supabase Storage'a yüklenir.
- **Hakkımda & istatistikler** — anasayfa hero metni, biyografi (Markdown
  destekli), yetkinlik/beceri etiketleri (virgülle ayrılmış TR/EN listesi),
  eğitim/deneyim zaman çizelgesi (her girdiye isteğe bağlı bir ikon/logo
  yüklenebilir), profil fotoğrafı, CV (PDF) dosyası, anasayfa istatistik
  kutuları (proje/sertifika/staj/dil sayısı) ve iletişim/sosyal medya
  bilgileri (e-posta, telefon, LinkedIn, Instagram) tek formdan yönetilir.
  CV yüklendiğinde header'daki ve anasayfa hero'sundaki "CV indir" butonu
  otomatik görünür.
- **Projeler ve Blog liste sayfalarında** ziyaretçiler için anlık (client-side)
  arama kutusu vardır.
- **Mesajlar** — İletişim formundan gelen mesajları görüntüleyin, okundu
  işaretleyin veya silin.
- **Hesap ayarları** — admin giriş şifrenizi buradan değiştirebilirsiniz.

Tüm metin alanlarının Türkçe ve İngilizce versiyonları ayrı ayrı girilir;
sitenin geneli `_tr` alanlarını, `/en` altındaki sayfalar `_en` alanlarını
kullanır.

## Proje yapısı

```
src/
  app/
    layout.tsx              Kök layout — fontlar, <html>/<body>
    globals.css
    not-found.tsx
    [locale]/                Genel siteye ait tüm sayfalar (tr/en)
      layout.tsx              Header + Footer
      page.tsx                 Anasayfa
      hakkimda/page.tsx
      projeler/page.tsx
      projeler/[slug]/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      sertifikalar/page.tsx
      iletisim/page.tsx + actions.ts
    admin/
      layout.tsx
      login/page.tsx + actions.ts
      (dashboard)/             Sidebar'lı korumalı admin alanı
        page.tsx                 Genel bakış
        projects/ , blog/ , certificates/ , about/ , messages/
  components/                 Site ve admin bileşenleri
  lib/
    i18n/                     Dil sözlüğü ve locale yardımcıları
    supabase/                 Browser/server Supabase client'ları
    actions/admin.ts          Tüm admin CRUD server action'ları
    data.ts                   Supabase okuma sorguları
    types.ts                  Veritabanı satır tipleri
  middleware.ts                Oturum yenileme + /admin koruması + locale yönlendirme
supabase/
  schema.sql                  Tablolar, RLS politikaları, storage bucket
```

## Şema güncellemesi (mevcut Supabase projesi için)

`supabase/schema.sql` dosyası **idempotenttir** — daha önce `schema.sql`'i
çalıştırdıysanız bile dosyanın tamamını Supabase Dashboard'da **SQL Editor**'e
yapıştırıp tekrar **Run** demeniz yeterlidir; var olan tabloları/politikaları
bozmadan eksik kolonları ekler. Bu turda eklenenler: `about.manifesto_tr`,
`about.manifesto_en` (anasayfadaki manifesto bandı için). Önceki turlarda
eklenen `about.skills`, `blog_posts.category_tr/en`, `projects.gallery_urls`,
`about.phone`, `about.instagram_url` zaten dosyada. Tek başına bir migration
dosyası çalıştırmanıza gerek yok.

## Bilinen notlar

- `npm audit`, `next` paketinin bağımlı olduğu bazı transitive (postcss vb.)
  paketlerde orta seviye uyarılar gösterebilir; proje kasıtlı olarak Next.js
  **14.x** hattında tutulmuştur (brief'te kararlaştırılan sürüm). Next 16'ya
  geçiş istenirse ayrı bir görev olarak ele alınmalıdır.
- Admin panelinde yeni kullanıcı kaydı formu yoktur; tek admin kullanıcısı
  Supabase Dashboard'dan elle oluşturulur (bkz. yukarıdaki adımlar).
- **Ziyaretçi istatistikleri**: `@vercel/analytics` kurulu ve root layout'a
  eklendi; ek bir hesap/kurulum gerekmez — Vercel'e deploy ettiğinizde proje
  panelindeki **Analytics** sekmesinden otomatik veri toplamaya başlar
  (yerelde `npm run dev` sırasında veri göndermez).
- **sitemap.xml**: `https://umutyigitbaskurt.com/sitemap.xml` adresinde
  otomatik üretilir; doğru URL'ler için Vercel'de `NEXT_PUBLIC_SITE_URL`
  ortam değişkeninin doğru ayarlı olduğundan emin olun.
