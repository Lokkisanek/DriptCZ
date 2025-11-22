# 🎨 DRIPT - Underground Culture Platform

Moderní Next.js platforma pro street culture, fashion, hudbu a art s **plně funkčním CMS systémem**. Žádná databáze, vše se ukládá do JSON souborů.

![DRIPT Platform](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Hlavní Funkce

### 🔐 CMS Systém
- **Password-protected Edit Mode** - Heslo: `admin123` (změň v `EditContext.tsx`)
- **Inline Text Editing** - Klikni na jakýkoliv text a edituj přímo na stránce
- **Visual Editor** - Upravuj obsah bez dotýkání kódu
- **Auto-save** - Změny se ukládají automaticky do `data/content.json`

### 📝 Správa Obsahu
- ➕ **Přidávání článků** - S náhledem, kategoriemi a obrázky (max 5MB)
- 🗑️ **Mazání článků** - Jedním kliknutím bez potvrzení
- 🖼️ **Upload obrázků** - JPEG, PNG, WebP formáty
- 🎨 **Hero Background** - Vlastní pozadí hero sekce
- 🔘 **Editovatelná tlačítka** - Přidej, odeber, přesuň, změň styly

### 🎯 Drag & Drop
- Přesouvej tlačítka v hero sekci
- Intuitívní ovládání myší
- Okamžité uložení pozice

### 📄 Kompletní Stránky
- 🏠 **Home** - Hero sekce, spotlight, nejnovější příspěvky
- 👔 **Fashion** - Street style a lookbooky
- 🎵 **Music** - Playlisty a recenze
- 🎨 **Art** - Galerie umění
- 🎤 **Interviews** - Rozhovory s umělci
- 📅 **Events** - Kalendář akcí
- 📰 **Blog** - Všechny články

### 🎨 Styling Features
- Vlastní Tailwind třídy pro tlačítka
- Gradient overlays
- Hover effects
- Responsive design (mobile-first)
- Dark mode aesthetic

---

## 🚀 Instalace a Spuštění

### Před začátkem
Ujisti se, že máš nainstalované:
- **Node.js** (verze 18 nebo vyšší)
- **npm** nebo **yarn**

### Postup

1. **Klonuj repository**
```bash
git clone https://github.com/Lokkisanek/DriptCZ.git
cd DriptCZ
```

2. **Nainstaluj závislosti**
```bash
npm install
```

3. **Spusť dev server**
```bash
npm run dev
```

4. **Otevři v prohlížeči**
```
http://localhost:3000
```

---

## 📖 Jak Používat CMS

### Vstup do Edit Módu
1. Stiskni **Ctrl+E** (nebo **Cmd+E** na Macu)
2. Zadej heslo: `admin123`
3. Klikni **Submit**

### Editování Textu
- Klikni na jakýkoliv text a edituj přímo
- Změny se uloží automaticky po kliknutí mimo

### Přidání Článku
1. V edit módu klikni na **"Add Post"** vlevo dole
2. Vyplň:
   - **Title** - Název článku
   - **Category** - Kategorie (Events, Fashion, Music, atd.)
   - **Excerpt** - Krátký popis
   - **Image** (volitelné) - Nahraj obrázek
3. Klikni **Create Post**
4. Stránka se automaticky obnoví

### Smazání Článku
1. V edit módu najeď myší na článek
2. Klikni na **červenou ikonu koše** vpravo nahoře
3. Článek se smaže okamžitě (bez potvrzení)

### Změna Pozadí Hero Sekce
1. V edit módu klikni **"Change Background"** vlevo nahoře hero sekce
2. Vyber obrázek
3. Pozadí se nahraje a nastaví

### Editace Tlačítek
1. V edit módu najeď myší na tlačítko
2. Zobrazí se 3 ikony:
   - ✏️ **Edit** - Změň text, URL, ikonu a styly
   - 🗑️ **Delete** - Smaž tlačítko
   - ⋮⋮ **Drag** - Drž a přesuň tlačítko
3. Pro přidání klikni **"+ Add Button"**

### Změna Stylů Tlačítek
Po kliknutí na Edit ikonu můžeš nastavit:
- **Background** - např. `bg-white`, `bg-accent`, `bg-red-500`
- **Text Color** - např. `text-black`, `text-white`
- **Hover Background** - např. `hover:bg-accent`
- **Hover Text** - např. `hover:text-white`
- **Border** - např. `border border-white`

---

## 🏗️ Struktura Projektu

```
dript/
├── data/
│   └── content.json          # Veškerý obsah (články, texty, tlačítka)
├── public/
│   └── uploads/              # Nahrané obrázky
├── src/
│   ├── app/
│   │   ├── api/              # API endpointy
│   │   │   ├── articles/     # CRUD pro články
│   │   │   ├── save/         # Ukládání textového obsahu
│   │   │   └── upload/       # Upload obrázků
│   │   ├── art/              # Art stránka
│   │   ├── blog/             # Blog stránka
│   │   ├── events/           # Events stránka
│   │   ├── fashion/          # Fashion stránka
│   │   ├── interviews/       # Interviews stránka
│   │   ├── music/            # Music stránka
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── AddPostModal.tsx           # Modal pro přidání článku
│   │   ├── AdminToolbar.tsx           # Admin toolbar (Add Post button)
│   │   ├── EditableArticleCard.tsx    # Editovatelná karta článku
│   │   ├── EditableContent.tsx        # Inline text editing
│   │   ├── HeroBackgroundUploader.tsx # Upload pozadí
│   │   ├── HeroButtons.tsx            # Editovatelná tlačítka
│   │   ├── Navbar.tsx                 # Navigace
│   │   ├── Footer.tsx                 # Patička
│   │   └── PasswordDialog.tsx         # Dialog pro heslo
│   └── context/
│       └── EditContext.tsx   # Context pro edit mód
└── README.md                 # Tento soubor
```

---

## 🌐 Kde Hostovat ZDARMA

### 1. ✅ **Vercel** (Doporučeno)
**Nejlepší pro Next.js projekty**

- 🎯 **Automatický deployment** z GitHubu
- ⚡ **Serverless funkce** zadarmo
- 🚀 **CDN** po celém světě
- 💯 **100% optimalizováno** pro Next.js

**Jak nasadit:**
1. Jdi na [vercel.com](https://vercel.com)
2. Přihlas se přes GitHub
3. Klikni **"Import Project"**
4. Vyber **DriptCZ** repository
5. Klikni **Deploy** (žádné nastavení není potřeba)
6. Hotovo! 🎉

**Limity zdarma:**
- ✅ Neomezené projekty
- ✅ 100GB bandwidth/měsíc
- ✅ Custom doména (.com, .cz, atd.)

---

### 2. **Netlify**
**Skvělá alternativa**

- 🔄 **Auto deploy** z Gitu
- 📦 **Build** automaticky
- 🌍 **Global CDN**

**Jak nasadit:**
1. Jdi na [netlify.com](https://netlify.com)
2. Přihlas se přes GitHub
3. Klikni **"New site from Git"**
4. Vyber **DriptCZ**
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Klikni **Deploy**

**Limity zdarma:**
- ✅ 100GB bandwidth
- ✅ 300 build minut/měsíc
- ✅ Custom doména

---

### 3. **Railway**
**Pro pokročilejší projekty**

- 🐳 **Docker** support
- 💾 **Databáze** zadarmo (pokud ji budeš potřebovat)
- 🔌 **Environment variables**

**Jak nasadit:**
1. Jdi na [railway.app](https://railway.app)
2. Přihlas se přes GitHub
3. Klikni **"New Project"**
4. Vyber **DriptCZ**
5. Railway detekuje Next.js automaticky
6. Deploy! 🚀

**Limity zdarma:**
- ✅ $5 kredit/měsíc
- ✅ 500 hodin/měsíc
- ✅ 100GB výstupu

---

### 4. **GitHub Pages** ❌
**Nedoporučeno** - GitHub Pages nepodporuje Next.js server-side features a API routes, které DRIPT používá.

---

## ⚠️ Důležité Poznámky

### Před Deploymentem

1. **Změň heslo** v `src/context/EditContext.tsx`:
```typescript
const PASSWORD_HASH = "tvoje_novy_hash_zde";
```
Vygeneruj nový hash zde: https://emn178.github.io/online-tools/sha256.html

2. **Kontroluj `.gitignore`**
   - ✅ `node_modules/` je ignorováno
   - ✅ `.next/` je ignorováno
   - ⚠️ `data/content.json` **NENÍ** ignorováno (obsahuje obsah)
   - ⚠️ `public/uploads/` **NENÍ** ignorováno (obrázky)

3. **Environment Variables**
   - Tento projekt nepotřebuje žádné ENV proměnné
   - Vše funguje out-of-the-box

### Po Deploymentu

- 🔄 **Auto-deploy** - Každý push do `main` automaticky deployuje
- 📝 **Editace** - Můžeš editovat přímo na produkci (Ctrl+E)
- 💾 **Data persistence** - Změny se ukládají do `content.json` v repositáři
- 🔄 **Commit změny** - Po editaci na produkci udělej `git pull` lokálně

---

## 🛠️ Technologie

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Ikony
- **Node.js File System API** - Ukládání dat

---

## 📝 API Endpointy

### `POST /api/articles`
Vytvoří nový článek
```json
{
  "title": "Název článku",
  "category": "Events",
  "excerpt": "Popis",
  "image": "/uploads/image.jpg" // volitelné
}
```

### `DELETE /api/articles/[id]`
Smaže článek podle ID

### `POST /api/save`
Uloží textový obsah
```json
{
  "path": "home.hero.title",
  "value": "Nový text"
}
```

### `POST /api/upload`
Nahraje obrázek (max 5MB, JPEG/PNG/WebP)
- Returns: `{ "success": true, "url": "/uploads/filename.jpg" }`

---

## 🎨 Customizace

### Změna Barev
Edituj `tailwind.config.ts`:
```typescript
colors: {
  background: '#0a0a0a',  // Hlavní pozadí
  foreground: '#ffffff',  // Text
  accent: '#dc2626',      // Zvýraznění (červená)
  muted: '#404040',       // Tlumené barvy
}
```

### Přidání Nové Stránky
1. Vytvoř složku v `src/app/nova-stranka/`
2. Přidej `page.tsx` s:
```tsx
import AdminToolbar from '@/components/AdminToolbar';

export default function NovaStranka() {
  return (
    <div className="min-h-screen py-24 px-4">
      {/* Obsah */}
      <AdminToolbar />
    </div>
  );
}
```
3. Přidej link do `Navbar.tsx`

---

## 📄 Licence

MIT License - Použij jakkoliv chceš!

---

## 🤝 Kontakt

Máš otázky nebo návrhy? Otevři issue na GitHubu!

**GitHub:** https://github.com/Lokkisanek/DriptCZ

---

**Vytvořeno s ❤️ pro underground culture community**
