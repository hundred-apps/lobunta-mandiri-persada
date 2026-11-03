/**
 * Sejarah singkat PT Lobunta Mandiri Persada.
 *
 * Sumber: halaman "Brief History" dan "Executive Summary" pada company
 * profile LMP. Narasi ini menjelaskan asal-usul perusahaan: PT Lobunta
 * Kencana Raya (berdiri 1973) tidak dapat lagi dipakai untuk jasa
 * konstruksi di bawah rezim perizinan berusaha berbasis risiko
 * (PP No. 5 Tahun 2021), sehingga PT Lobunta Mandiri Persada dibentuk
 * pada 2014 dan direposisi pada 2024 untuk memenuhi regulasi tersebut.
 *
 * `site-setting.description` dipakai sebagai narasi umum perusahaan, bukan
 * sejarah, sehingga riwayat ini disimpan sebagai konten statis. Kalau nanti
 * pindah ke CMS, cukup ganti isi `useCompanyHistory()`.
 */

export interface HistoryParagraph {
  id: string
  en: string
}

/** Paragraf sejarah, urut dari asal-usul hingga kondisi terkini. */
export const LMP_HISTORY: HistoryParagraph[] = [
  {
    id: 'PT Lobunta Kencana Raya didirikan pada 27 Januari 1973 dengan nama CV. Lobunta, berpusat di Jl. Pintu Air No. 31-B, Jakarta Pusat. Pendiriannya dimotivasi oleh kebutuhan alat untuk mendukung setiap proses pengerjaan proyek. Perusahaan kemudian berkembang menjadi salah satu kontraktor pekerjaan tanah dan konstruksi terkemuka di Indonesia dengan kualifikasi B (Besar) dan pengalaman lebih dari 50 tahun.',
    en: 'PT Lobunta Kencana Raya was established on 27 January 1973 as CV. Lobunta, headquartered at Jl. Pintu Air No. 31-B, Jakarta Pusat. Its founding was driven by the need for equipment to support every stage of project execution. The company grew into one of the leading earth works and construction contractors in Indonesia, holding a B (Large) qualification backed by more than 50 years of experience.'
  },
  {
    id: 'Seiring berjalannya waktu, PT Lobunta Kencana Raya tidak lagi dapat digunakan untuk menjalankan pekerjaan jasa konstruksi karena ketentuan perizinan berusaha berbasis risiko yang diatur dalam Peraturan Pemerintah No. 5 Tahun 2021. Untuk memenuhi regulasi tersebut, PT Lobunta Mandiri Persada — anak perusahaan PT Lobunta Kencana Raya — dibentuk pada 2014 dan direposisi secara strategis pada 2024 sebagai badan usaha yang menjalankan pekerjaan pertambangan serta konstruksi teknik penunjang pertambangan.',
    en: 'Over time, PT Lobunta Kencana Raya could no longer be used to carry out construction services under the risk-based business licensing regime set out in Government Regulation No. 5 of 2021. To comply with that regulation, PT Lobunta Mandiri Persada — a subsidiary of PT Lobunta Kencana Raya — was established in 2014 and strategically repositioned in 2024 as the entity carrying out mining contracting and mining-support civil construction works.'
  },
  {
    id: 'Hari ini, didukung tenaga profesional yang ahli di bidangnya, PT Lobunta Mandiri Persada menempatkan kualitas sumber daya manusia, kreativitas, kemampuan belajar, kesediaan berubah, dan kerja keras sebagai prioritas utama. Dengan kualitas tersebut, perusahaan siap menghadapi tantangan persaingan global dengan memberikan yang terbaik kepada seluruh pelanggan.',
    en: 'Today, backed by professionals who are experts in their respective fields, PT Lobunta Mandiri Persada places a premium on high-quality human resources, creativity, the ability to learn, the willingness to change, and hard work. With these qualities, the company is ready to face the challenges of global competition by delivering the best to all of its customers.'
  }
]

/** Dua kalimat kunci yang sering dicari pengunjung. */
export const LMP_HISTORY_HIGHLIGHTS = [
  {
    key: 'legal',
    titleId: 'Badan hukum penyedia jasa',
    titleEn: 'Service-providing legal entity',
    bodyId: 'Sejak 2024, pekerjaan jasa pertambangan dan konstruksi dijalankan oleh PT Lobunta Mandiri Persada sesuai PP No. 5 Tahun 2021.',
    bodyEn: 'Since 2024, mining and construction services have been delivered by PT Lobunta Mandiri Persada in line with Government Regulation No. 5 of 2021.'
  },
  {
    key: 'experience',
    titleId: 'Pengalaman sejak 1973',
    titleEn: 'Experience since 1973',
    bodyId: 'Berakar dari PT Lobunta Kencana Raya (CV. Lobunta) yang berdiri pada 1973 sebagai kontraktor pekerjaan tanah.',
    bodyEn: 'Rooted in PT Lobunta Kencana Raya (CV. Lobunta), established in 1973 as an earth works contractor.'
  }
]

export function useCompanyHistory() {
  return {
    paragraphs: LMP_HISTORY,
    highlights: LMP_HISTORY_HIGHLIGHTS
  }
}
