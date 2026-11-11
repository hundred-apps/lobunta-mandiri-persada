/**
 * Corporate legality PT Lobunta Mandiri Persada, dipisah per divisi.
 *
 * Sumber: halaman "Corporate Legality" pada dua company profile LMP —
 * profil Mining & Plant dan profil Civil Contractor. Keduanya punya
 * komposisi izin yang berbeda (IUJP hanya di mining, KTA P3IM hanya di
 * civil, kode KBLI pun berbeda), jadi tidak boleh digabung.
 *
 * Data legal jarang berubah dan backend belum punya field-nya, jadi disimpan
 * sebagai konten statis. Kalau nanti pindah ke CMS, cukup ganti isi
 * `useLegalDocuments()`; halaman tidak perlu berubah.
 */

export type DivisionKey = 'mining' | 'civil'

export interface LegalDocument {
  /** Label singkat, mis. "NIB" atau "Akta Pendirian". */
  labelId: string
  labelEn: string
  /** Nilai yang ditampilkan apa adanya (nomor, tanggal, nama notaris). */
  value: string
  /** Keterangan tambahan, mis. SubKlas atau nomor SK. */
  noteId?: string
  noteEn?: string
}

export interface LegalLicence {
  code: string
  titleId: string
  titleEn: string
}

export interface DivisionLegality {
  key: DivisionKey
  titleId: string
  titleEn: string
  descriptionId: string
  descriptionEn: string
  documents: LegalDocument[]
  licences: LegalLicence[]
}

/** Data yang identik untuk kedua divisi. */
const COMPANY_DOCUMENTS: LegalDocument[] = [
  { labelId: 'NIB', labelEn: 'NIB', value: '2603240176563' },
  { labelId: 'NPWP', labelEn: 'Tax ID', value: '66.390.536.2-436.000' },
  {
    labelId: 'Akta Pendirian',
    labelEn: 'Deed of Establishment',
    value: 'No. 16, 28 Januari 2014',
    noteId: 'SK AHU-05800.AH.01.01.Tahun 2014, 11 Februari 2014',
    noteEn: 'SK AHU-05800.AH.01.01.2014, 11 February 2014'
  },
  {
    labelId: 'Akta Perubahan',
    labelEn: 'Deed of Amendment',
    value: 'No. 40, 21 Maret 2024',
    noteId: 'SK AHU-0018742.AH.01.02.Tahun 2024, 22 Maret 2024',
    noteEn: 'SK AHU-0018742.AH.01.02.2024, 22 March 2024'
  }
]

/** SBU Konstruksi dipakai kedua divisi (pekerjaan teknik). */
const SBU_DOCUMENT: LegalDocument = {
  labelId: 'SBU Konstruksi',
  labelEn: 'Construction Business Entity Certificate',
  value: '202601231000327612435',
  noteId: 'SubKlas PA001',
  noteEn: 'Sub-class PA001'
}

export const LMP_DIVISION_LEGALITY: DivisionLegality[] = [
  {
    key: 'mining',
    titleId: 'Kontraktor Tambang & Pekerjaan Sipil Penunjang Tambang',
    titleEn: 'Mine Contractor & Mine Support Civil Works',
    descriptionId: 'Kelengkapan usaha untuk pekerjaan kontraktor pertambangan dan penunjangnya.',
    descriptionEn: 'Business credentials for mining contracting and its supporting works.',
    documents: [
      { labelId: 'NIB', labelEn: 'NIB', value: '2603240176563' },
      {
        labelId: 'Izin Usaha Jasa Pertambangan (IUJP)',
        labelEn: 'Mining Services Business Licence (IUJP)',
        value: '26032401765630001'
      },
      SBU_DOCUMENT,
      { labelId: 'NPWP', labelEn: 'Tax ID', value: '66.390.536.2-436.000' },
      ...COMPANY_DOCUMENTS.filter((doc) => doc.labelId.startsWith('Akta'))
    ],
    licences: [
      { code: '09900', titleId: 'Aktivitas penunjang pertambangan dan penggalian lainnya', titleEn: 'Support activities for other mining and quarrying' },
      { code: '77100', titleId: 'Penyewaan dan sewa guna usaha tanpa hak opsi mobil, bus, truk, dan sejenisnya', titleEn: 'Renting and leasing of cars, buses, trucks and similar vehicles' },
      { code: '77395', titleId: 'Penyewaan dan sewa guna usaha tanpa hak opsi mesin pertambangan dan energi serta peralatannya', titleEn: 'Renting and leasing of mining and energy machinery and equipment' },
      { code: '42992', titleId: 'Konstruksi bangunan sipil pertambangan', titleEn: 'Construction of mining civil buildings' },
      { code: '78101', titleId: 'Aktivitas penyelesaian dan penempatan tenaga kerja dalam negeri', titleEn: 'Domestic labour placement activities' },
      { code: '78300', titleId: 'Penyediaan sumber daya manusia dan manajemen fungsi sumber daya manusia', titleEn: 'Human resources provision and human resources management' },
      { code: '43905', titleId: 'Penyewaan alat konstruksi dengan operator', titleEn: 'Renting of construction equipment with operator' }
    ]
  },
  {
    key: 'civil',
    titleId: 'Pekerjaan Tanah & Konstruksi Sipil',
    titleEn: 'Earthworks and Civil Construction',
    descriptionId: 'Kelengkapan usaha untuk pekerjaan konstruksi teknik.',
    descriptionEn: 'Business credentials for civil construction works.',
    documents: [
      { labelId: 'NIB', labelEn: 'NIB', value: '2603240176563' },
      SBU_DOCUMENT,
      {
        labelId: 'KTA P3IM',
        labelEn: 'P3IM Member Card',
        value: '00078729.001',
        noteId: 'Keanggotaan asosiasi',
        noteEn: 'Association membership'
      },
      { labelId: 'NPWP', labelEn: 'Tax ID', value: '66.390.536.2-436.000' },
      ...COMPANY_DOCUMENTS.filter((doc) => doc.labelId.startsWith('Akta'))
    ],
    licences: [
      { code: '43120', titleId: 'Penyiapan lahan', titleEn: 'Site preparation' },
      { code: '42992', titleId: 'Konstruksi bangunan sipil pertambangan', titleEn: 'Construction of mining civil buildings' },
      { code: '42999', titleId: 'Konstruksi bangunan sipil lainnya YTDL', titleEn: 'Construction of other civil buildings n.e.c.' },
      { code: '41012', titleId: 'Konstruksi konvensional gedung perkantoran', titleEn: 'Conventional construction of office buildings' },
      { code: '42101', titleId: 'Konstruksi jalan pada permukaan tanah', titleEn: 'Construction of roads on the ground surface' },
      { code: '43905', titleId: 'Penyewaan alat konstruksi dengan operator', titleEn: 'Renting of construction equipment with operator' }
    ]
  }
]

/** Data legalitas per divisi untuk halaman profil. */
export function useLegalDocuments() {
  return { divisions: LMP_DIVISION_LEGALITY }
}
