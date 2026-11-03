/**
 * Slug URL dari teks bebas.
 *
 * Backend belum menyimpan slug untuk proyek, jadi slug diturunkan dari nama
 * di sisi admin (field slug) dan di sisi publik (mapProject). Keduanya harus
 * memakai fungsi yang sama supaya URL hasil klik kartu cocok dengan yang
 * dicari halaman detail.
 */
export function slugify(value: string): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
