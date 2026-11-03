/**
 * Visi, misi, dan falsafah PT Lobunta Mandiri Persada.
 *
 * Sumber: halaman "Vision & Mission" dan "Philosophy" pada company profile
 * LMP. Teksnya sama di profil Mining dan Civil.
 *
 * Backend `site-setting` belum punya field terpisah untuk ketiganya
 * (`description` dipakai sebagai narasi sejarah), sehingga disimpan sebagai
 * konten statis. Kalau nanti pindah ke CMS, cukup ganti isi
 * `useVisionMission()`; halaman tidak perlu berubah.
 */

export interface CompanyStatement {
  key: 'vision' | 'mission' | 'philosophy'
  icon: string
  titleId: string
  titleEn: string
  bodyId: string
  bodyEn: string
}

/** Kalimat pembuka yang tampil di halaman Vision & Mission pada PDF. */
export const LMP_COMPANY_MOTTO = {
  id: 'Deliver different values',
  en: 'Deliver different values'
}

export const LMP_STATEMENTS: CompanyStatement[] = [
  {
    key: 'vision',
    icon: 'target',
    titleId: 'Visi',
    titleEn: 'Vision',
    bodyId:
      'Menjadi perusahaan yang Sehat, Cerdas, dan Produktif dalam menyerahkan produk dan layanan pada tingkat terbaik di antara pesaing, dengan membangun fondasi yang kuat pada Strategi Bisnis, People (SDM), System, Values, dan Innovation.',
    bodyEn:
      'Become a Healthy, Smart and Productive company in delivering products and services at the best level among other competitors, by building a strong foundation of Business Strategy, People, System, Values and Innovation.'
  },
  {
    key: 'mission',
    icon: 'delivery',
    titleId: 'Misi',
    titleEn: 'Mission',
    bodyId:
      'PT Lobunta Mandiri Persada menjadi bagian penting dalam pembangunan Indonesia, khususnya bagi masyarakat di sekitar wilayah kerja, melalui bidang-bidang keahlian yang kami jalankan.',
    bodyEn:
      'PT Lobunta Mandiri Persada becomes an important part of the development of Indonesia, especially for the local people around its areas of operation, through its business specialities.'
  },
  {
    key: 'philosophy',
    icon: 'shield',
    titleId: 'Falsafah',
    titleEn: 'Philosophy',
    bodyId:
      'Kami berkomitmen menciptakan dan memelihara budaya keunggulan yang tercermin pada setiap produk yang kami hasilkan, setiap layanan yang kami berikan, dan setiap personel yang kami pekerjakan. Kami berkomitmen memberikan yang terbaik di setiap sektor bisnis yang kami jalankan. Bagi kami, menjadi pemimpin bukan sekadar kebesaran, melainkan kemampuan memberikan standar layanan dan kualitas yang lebih tinggi melalui pemanfaatan sumber daya secara optimal.',
    bodyEn:
      'We have a commitment to create and maintain a culture of excellence that is reflected in each product we produce, each service we provide, and each personnel we employ. We are committed to serve the best in every business sector in which we operate. For us, being a leader is not merely associated with greatness, but with the ability to provide higher levels of services and quality through the optimal use of resources.'
  }
]

/** Visi, misi, dan falsafah untuk halaman profil. */
export function useVisionMission() {
  return {
    statements: LMP_STATEMENTS,
    motto: LMP_COMPANY_MOTTO
  }
}
