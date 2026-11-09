/**
 * Scope of Work untuk dua divisi PT Lobunta Mandiri Persada.
 *
 * Sumber: halaman "Scope of Work" pada company profile LMP.
 * Mining mencakup 8 area layanan teknis; Civil mencakup 7 area.
 * Backend belum punya field terpisah, disimpan sebagai konten statis.
 * Kalau nanti pindah ke CMS, cukup ganti isi `useScopeOfWork()`.
 */

export interface Service {
  code: string
  titleId: string
  titleEn: string
  descriptionId: string
  descriptionEn: string
  icon: string
}

export interface DivisionScope {
  key: 'mining' | 'civil'
  titleId: string
  titleEn: string
  descriptionId: string
  descriptionEn: string
  services: Service[]
}

/** Layanan Pertambangan (Mining) */
export const MINING_SERVICES: Service[] = [
  {
    code: '01',
    titleId: 'Pemberian Lahan / Land Clearing',
    titleEn: 'Land Clearing',
    descriptionId: 'Persiapan lahan sebelum penambangan dimulai',
    descriptionEn: 'Site preparation before mining operations commence',
    icon: 'folder'
  },
  {
    code: '02',
    titleId: 'Penghapusan Tanah Penutup / Overburden Removal',
    titleEn: 'Overburden Removal',
    descriptionId: 'Pengupasan dan pembuangan tanah penutup bijih',
    descriptionEn: 'Removal and disposal of overburden for ore extraction',
    icon: 'trash'
  },
  {
    code: '03',
    titleId: 'Pengambilan Batu Bara / Ore',
    titleEn: 'Coal / Ore Getting',
    descriptionId: 'Ekstraksi langsung material tambang',
    descriptionEn: 'Direct extraction of coal or ore from the ground',
    icon: 'mining'
  },
  {
    code: '04',
    titleId: 'Pengangkutan Batu Bara / Ore Jarak Dekat-Menengah',
    titleEn: 'Coal / Ore Short-Medium Hauling',
    descriptionId: 'Transportasi material tambang ke tempat penyimpanan',
    descriptionEn: 'Transportation of coal/ ore to storage facilities',
    icon: 'truck'
  },
  {
    code: '05',
    titleId: 'Manajemen Stokpile & Pendaratan',
    titleEn: 'Stockpile Management & Barging',
    descriptionId: 'Pengelolaan stokpile dan transportasi lewat sungai',
    descriptionEn: 'Stockpile handling and river transportation',
    icon: 'stack'
  },
  {
    code: '06',
    titleId: 'Konstruksi Jalan & Jembatan',
    titleEn: 'Road & Bridge Construction',
    descriptionId: 'Pembangunan infrastruktur jalan dan jembatan untuk pertambangan',
    descriptionEn: 'Construction of road and bridge infrastructure for mining',
    icon: 'road'
  },
  {
    code: '07',
    titleId: 'Pemeliharaan Jalan',
    titleEn: 'Road Maintenance',
    descriptionId: 'Perawatan dan perbaikan jalan tambang yang sudah ada',
    descriptionEn: 'Maintenance and repair of existing mining roads',
    icon: 'wrench'
  },
  {
    code: '08',
    titleId: 'Penyewaan Alat Berat & Truk',
    titleEn: 'Heavy Equipment & Truck Rental',
    descriptionId: 'Penyewaan alat berat beserta operator dan bahan bakar',
    descriptionEn: 'Rental of heavy equipment with operators and fuel',
    icon: 'truck'
  }
]

/** Layanan Konstruksi Teknik (Civil) */
export const CIVIL_SERVICES: Service[] = [
  {
    code: '01',
    titleId: 'Area Industri',
    titleEn: 'Industrial Area Development',
    descriptionId: 'Pengembangan area khusus industri',
    descriptionEn: 'Development of specialized industrial areas',
    icon: 'building'
  },
  {
    code: '02',
    titleId: 'Konstruksi Jalan Tol',
    titleEn: 'Toll Road Construction',
    descriptionId: 'Pembangunan infrastruktur jalan tol',
    descriptionEn: 'Construction of toll road infrastructure',
    icon: 'road'
  },
  {
    code: '03',
    titleId: 'Irigasi',
    titleEn: 'Irrigation System',
    descriptionId: 'Pembangunan dan pemeliharaan sistem irigasi',
    descriptionEn: 'Construction and maintenance of irrigation systems',
    icon: 'water'
  },
  {
    code: '04',
    titleId: 'Konstruksi Jalan Angkut',
    titleEn: 'Hauling Road Construction',
    descriptionId: 'Pembangunan jalan angkut material',
    descriptionEn: 'Construction of haulage roads for material transport',
    icon: 'truck'
  },
  {
    code: '05',
    titleId: 'Bangunan Cut & Fill',
    titleEn: 'Cut & Fill Building',
    descriptionId: 'Konstruksi bangunan dengan sistem cut & fill max 3 lantai',
    descriptionEn: 'Building construction with cut & fill system (max 3 floors)',
    icon: 'building'
  },
  {
    code: '06',
    titleId: 'Konstruksi Sub Grade & Base',
    titleEn: 'Sub-Grade, Sub-Base, and Base Course Construction',
    descriptionId: 'Pembangunan lapisan pondasi jalan',
    descriptionEn: 'Construction of sub-grade, sub-base, and base courses',
    icon: 'road'
  },
  {
    code: '08',
    titleId: 'Penyewaan Alat Berat & Truk',
    titleEn: 'Heavy Equipment & Truck Rental',
    descriptionId: 'Penyewaan alat berat beserta operator dan bahan bakar',
    descriptionEn: 'Rental of heavy equipment with operators and fuel',
    icon: 'truck'
  }
]

export const LMP_DIVISION_SCOPE: DivisionScope[] = [
  {
    key: 'mining',
    titleId: 'Kontraktor Tambang & Pekerjaan Sipil Penunjang Tambang',
    titleEn: 'Mine Contractor & Mine Support Civil Works',
    descriptionId: 'Layanan teknis untuk ekstraksi dan pemrosesan mineral',
    descriptionEn: 'Technical services for mineral extraction and processing',
    services: MINING_SERVICES
  },
  {
    key: 'civil',
    titleId: 'Pekerjaan Tanah & Konstruksi Sipil',
    titleEn: 'Earthworks and Civil Construction',
    descriptionId: 'Layanan konstruksi sipil untuk infrastruktur dan bangunan',
    descriptionEn: 'Civil construction services for infrastructure and buildings',
    services: CIVIL_SERVICES
  }
]

/** Scope of Work untuk halaman utama dan halaman terpisah */
export function useScopeOfWork() {
  return {
    divisions: LMP_DIVISION_SCOPE,
    allServices: [...MINING_SERVICES, ...CIVIL_SERVICES]
  }
}