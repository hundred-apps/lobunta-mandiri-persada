# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Konten statis LMP

Beranda (`app/pages/index.vue`) dan Profil (`app/pages/profile.vue`) memakai data statis dari
`app/content/lmp.ts`. Isi file tersebut disusun dari company profile pada folder `company-profile`:

- `1. LOBUNTA - LMP Mining Contractor Profile.pdf`
- `LOBUNTA - LMP Civil Contractor Profile juli 2026.pdf`
- `IKLAN RENTAL RENTAL EQUIPMENT.pdf`

Identitas perusahaan, divisi, ruang lingkup kerja, pengalaman proyek, armada, dan dokumen unduhan
diambil dari sumber tersebut, bukan dari API. `app/composables/useStaticContent.ts` menyediakan
`useStaticCompany()`, `useStaticServices()`, dan `useStaticCustomers()`; halaman layanan dan klien
menggabungkan data API dengan data statis sebagai cadangan.

Tema memakai warna logo LMP: hijau `#00b050` sebagai warna utama dan kuning `#ffcc00` sebagai aksen
(`tailwind.config.ts`). Berkas company profile tersedia di `public/docs/`, foto di `public/img/lmp/`.

## Company profile, proyek, dan unit

- **Company profile**: diatur di admin → Pengaturan situs → *Company profile (PDF)* sebagai
  daftar dokumen (`companyProfiles` pada `site-setting`). Setiap dokumen punya satu berkas PDF,
  judul dua bahasa, dan divisi (`mining`/`civil`/`general`). Dokumen tampil **dikelompokkan per
  divisi** di halaman profil, sehingga profil pertambangan dan konstruksi teknik tidak tercampur.
- **Proyek**: admin → Proyek (`/admin/projects`, resource API `project`) dan halaman publik
  `/projects` + `/projects/<slug>`. API belum menyimpan slug, jadi slug diturunkan dari nama proyek
  lewat `app/utils/slug.ts` (dipakai admin dan halaman publik agar URL selalu cocok).
- **Unit**: admin → Unit (`/admin/units`, resource API `unit`) dan halaman publik `/units`
  (menu "Armada"). Status unit: `available`, `maintenance`, `inactive`.

Endpoint `project-read`/`unit-read` membatasi `limit` maksimal 100, berbeda dari resource lain
(`useContentSource.ts` → `PAGED_LIST_LIMIT`).

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
