import type {
  CustomerItem,
  HeroBlock,
  Localized,
  ServiceItem,
  SiteSettings
} from '~/types/content'

/**
 * Konten statis PT Lobunta Mandiri Persada (LMP).
 *
 * Seluruh data di file ini diambil dari company profile LMP:
 *   - LOBUNTA - LMP Mining Contractor Profile
 *   - LOBUNTA - LMP Civil Contractor Profile (Juli 2026)
 *   - IKLAN RENTAL EQUIPMENT
 *
 * Tidak ada panggilan API: halaman Beranda dan Profil memakai data ini
 * supaya tetap tampil utuh saat backend tidak dapat dihubungi.
 */

export interface LmpFact {
  label: Localized
  value: Localized
}

export interface LmpProject {
  title: Localized
  client: Localized
  location: Localized
  period: Localized
  scope: Localized
  value?: Localized
}

export interface LmpFleetGroup {
  title: Localized
  items: Localized[]
}

const loc = (id: string, en: string): Localized => ({ id, en })

/** Identitas perusahaan. */
export const lmpSettings: SiteSettings = {
  companyName: loc('PT Lobunta Mandiri Persada', 'PT Lobunta Mandiri Persada'),
  legalName: 'PT LOBUNTA MANDIRI PERSADA',
  tagline: loc(
    'Kontraktor Pertambangan, Konstruksi Teknik & Penyewaan Alat Berat',
    'Mining Contractor, Civil Construction & Heavy Equipment Rental'
  ),
  description: loc(
    'Bagian dari LOBUNTA Group, PT Lobunta Mandiri Persada menjalankan Divisi Pertambangan dan Plant serta Divisi Konstruksi Teknik. Berdiri di atas pengalaman lebih dari lima dekade dalam pekerjaan earth works, pertambangan, dan konstruksi umum di Indonesia.',
    'Part of the LOBUNTA Group, PT Lobunta Mandiri Persada runs the Mining & Plant Division and the Civil Construction Division. Built on more than five decades of earth works, mining, and general construction experience in Indonesia.'
  ),
  agencyNumber: 'GRADE-6',
  foundedYear: '1973',
  address: loc(
    'Jl. Raya Bekasi (Jend. Sudirman) Km. 31, Bekasi Selatan, Bekasi 17144',
    'Jl. Raya Bekasi (Jend. Sudirman) Km. 31, Bekasi Selatan, Bekasi 17144'
  ),
  phone: ['021-8853682', '021-8867544', '0813-1618-1546'],
  whatsapp: '62813816181546',
  email: 'mining@lobunta.com',
  officeHours: loc(
    'Senin–Jumat, 08.00–17.00 WIB',
    'Monday–Friday, 08.00–17.00 WIB'
  ),
  logo: '/img/logo.svg',
  profile: '/img/lmp/mining-2.jpg',
  companyProfile: '/docs/lmp-mining-contractor-profile.pdf',
  gallery: [
    '/img/lmp/mining-1.jpg',
    '/img/lmp/mining-2.jpg',
    '/img/lmp/mining-3.jpg',
    '/img/lmp/mining-4.jpg',
    '/img/lmp/civil-1.jpg',
    '/img/lmp/civil-2.jpg',
    '/img/lmp/civil-3.jpg',
    '/img/lmp/civil-4.jpg'
  ],
  social: {},
  menuVisibility: {
    products: false,
    blog: false
  }
}

/** Ringkasan data perusahaan untuk kartu profil. */
export const lmpFacts: LmpFact[] = [
  {
    label: loc('Badan hukum', 'Legal entity'),
    value: loc('PT Lobunta Mandiri Persada (Divisi Pertambangan & Plant, Konstruksi Teknik)', 'PT Lobunta Mandiri Persada (Mining & Plant Division, Civil Construction)')
  },
  {
    label: loc('Tanggal berdiri', 'Date established'),
    value: loc('27 Januari 1973 (CV. Lobunta) · 30 September 1977 (PT. Lobunta Kencana Raya)', '27 January 1973 (CV. Lobunta) · 30 September 1977 (PT. Lobunta Kencana Raya)')
  },
  {
    label: loc('Bidang usaha', 'Main line of business'),
    value: loc(
      'Kontraktor Pertambangan, Kontraktor Umum, General Supplier & Dealership, Plant Hire, Property, Crushing Plant, Mixer Plant, Information Technology',
      'Mining Contractor, General Contractor, General Supplier & Dealership, Plant Hire, Property, Crushing Plant, Mixer Plant, Information Technology'
    )
  },
  {
    label: loc('Kualifikasi', 'Qualification'),
    value: loc('Grade 6 · Kontraktor Pekerjaan Teknik (Spesifikasi 22001–22103)', 'Grade 6 · Civil Work Contractor (Specification 22001–22103)')
  },
  {
    label: loc('NIB', 'NIB'),
    value: loc('9120002171281', '9120002171281')
  },
  {
    label: loc('Izin jasa pertambangan', 'Mining service licence'),
    value: loc('No. 26032401765630001', 'No. 26032401765630001')
  },
  {
    label: loc('NPWP', 'Taxpayer number'),
    value: loc('66.390.536.2-436.000', '66.390.536.2-436.000')
  },
  {
    label: loc('Asosiasi', 'Associations'),
    value: loc('Aspindo (B-098/STA/096/X/2018) · Appaksi (01.001)', 'Aspindo (B-098/STA/096/X/2018) · Appaksi (01.001)')
  },
  {
    label: loc('Kantor pusat', 'Head office'),
    value: loc('Jl. Raya Bekasi Km. 31, Bekasi Selatan · Jl. Pintu Air No. 31-B, Jakarta Pusat', 'Jl. Raya Bekasi Km. 31, Bekasi Selatan · Jl. Pintu Air No. 31-B, Jakarta Pusat')
  }
]

/** Statistik singkat di hero profil. */
export const lmpStats: { label: Localized; value: string }[] = [
  { label: loc('Tahun berdiri', 'Established'), value: '1973' },
  { label: loc('Tenaga kerja', 'Workforce'), value: '600+' },
  { label: loc('Kualifikasi', 'Qualification'), value: 'GRADE-6' },
  { label: loc('Divisi', 'Divisions'), value: '3' }
]

/** Hero beranda. */
export const lmpHero: HeroBlock = {
  eyebrow: loc('Mining & Plant Division', 'Mining & Plant Division'),
  heading: loc(
    'Kontraktor Pertambangan & Konstruksi Teknik',
    'Mining Contractor & Civil Construction'
  ),
  subheading: loc(
    'Dari land clearing, overburden removal, dan haulage bijih sampai pembangunan jalan, jembatan, serta bendungan. Bagian dari LOBUNTA Group dengan tenaga kerja lebih dari 600 orang dan armada alat berat yang siap dioperasikan.',
    'From land clearing, overburden removal, and ore hauling to road, bridge, and dam construction. Part of the LOBUNTA Group with a workforce of more than 600 people and a ready-to-operate heavy equipment fleet.'
  ),
  image: '/img/lmp/mining-2.jpg',
  imagePosition: 'right',
  textPosition: 'left',
  ctaPrimary: { label: loc('Lihat company profile', 'View company profile'), to: '/profile' },
  ctaSecondary: { label: loc('Hubungi kami', 'Contact us'), to: '/contact' }
}

/** Sejarah singkat perusahaan (dari company profile). */
export const lmpHistory: Localized[] = [
  loc(
    'PT. Lobunta Kencana Raya didirikan pada 27 Januari 1973 dengan nama CV. Lobunta, berpusat di Jl. Pintu Air No. 31-B, Jakarta Pusat. Pendiriannya dimotivasi oleh kebutuhan alat untuk mendukung setiap proses pengerjaan proyek.',
    'PT. Lobunta Kencana Raya was established on 27 January 1973 as CV. Lobunta, headquartered at Jl. Pintu Air No. 31-B, Jakarta Pusat. The establishment was motivated by the need for equipment to support every project execution.'
  ),
  loc(
    'Seiring waktu perusahaan berkembang menjadi salah satu kontraktor pekerjaan tanah dan konstruksi terkemuka di Indonesia. Kami mungkin bukan perusahaan terbesar, tetapi kebanggaan kami menjadi salah satu yang terbaik. Manajemen berpengalaman, tenaga teknis, teknisi terampil, dan berbagai alat konstruksi berkualitas membuat kami menjaga reputasi menyelesaikan proyek dengan standar tinggi tepat pada waktunya.',
    'Over time the company grew into one of the leading earth works and construction contractors in Indonesia. We are not the largest company, but it is our pride to be one among the best. Experienced management, engineers, qualified technicians, and quality construction equipment allow us to keep our record of completing complicated projects to high standards within the appointed time schedules.'
  ),
  loc(
    'Saat ini LOBUNTA tidak hanya bergerak di bidang pertambangan, konstruksi umum, dan penyewaan alat, tetapi juga mengembangkan multi divisi: Mining & Plant Division, Civil Construction Division, Property, Mechanical Distributor, serta Information Technology. Komitmen terhadap ISO dan OHSAS terus dijalankan untuk menghasilkan pekerjaan yang lebih sempurna dan tepercaya.',
    'Today LOBUNTA is not only engaged in mining, general construction, and plant hire, but also develops its multi divisions: Mining & Plant Division, Civil Construction Division, Property, Mechanical Distributor, and Information Technology. Continuous commitment to ISO and OHSAS produces more refined and trusted work.'
  )
]

/** Visi, misi, dan falsafah perusahaan. */
export const lmpVisionMission = {
  vision: loc(
    'Menjadi perusahaan pengelola yang sehat, cerdas, dan produktif yang memimpin grup dan divisinya untuk menyampaikan produk serta jasanya pada level terbaik di antara para pesaing, dengan fondasi kuat dalam strategi bisnis, manusia, sistem, nilai, dan inovasi.',
    'To become a healthy, smart, and productive holding company that leads our group and divisions to deliver their products and services at the best level among competitors, built on strong business strategy, people, system, values, and innovation.'
  ),
  mission: loc(
    'PT Lobunta Kencana Raya menjadi bagian penting dari pembangunan Indonesia, khususnya bagi masyarakat setempat, melalui spesialisasi bisnis kami. Kami mengutamakan Mutu dan kesempurnaan kerja, perbaikan berkelanjutan, serta kontribusi sosial dan lingkungan.',
    'PT Lobunta Kencana Raya becomes an important part of the development of Indonesia, especially for its local people, through our business specialities. We prioritise work quality, continuous improvement, and social and environmental contribution.'
  ),
  philosophy: loc(
    'Kami memiliki komitmen untuk membangun dan mempertahankan budaya excellence yang tercermin pada setiap produk, setiap layanan, dan setiap personel yang kami rekrut.acic Being a leader bukan sekadar terbesar, melainkan mampu memberi tingkat layanan dan mutu lebih tinggi lewat penggunaan sumber daya yang optimal.',
    'We are committed to creating and maintaining a culture of excellence reflected in every product, every service, and every person we employ. Being a leader is not merely being the largest, but being able to deliver higher levels of service and quality through optimal use of resources.'
  )
}

/** Ruang lingkup pekerjaan divisi pertambangan. */
export const lmpMiningScope: Localized[] = [
  loc('Land clearing', 'Land clearing'),
  loc('Overburden removal', 'Overburden removal'),
  loc('Selective mining', 'Selective mining'),
  loc('Coal/ore getting', 'Coal/ore getting'),
  loc('Hauling jarak pendek–menengah', 'Short–medium distance hauling'),
  loc('Manajemen stockpile', 'Stockpile management'),
  loc('Pemeliharaan jalan', 'Road maintenance'),
  loc('Barging (angi)', 'Barging')
]

/** Ruang lingkup pekerjaan divisi konstruksi teknik. */
export const lmpCivilScope: Localized[] = [
  loc('Pembangunan jalan', 'Road construction'),
  loc('Pembangunan jembatan', 'Bridge construction'),
  loc('Pembangunan gedung', 'Building construction'),
  loc('Irigasi dan drainase', 'Irrigation and drainage'),
  loc('Pembangunan pelabuhan', 'Port construction'),
  loc('Site development', 'Site development'),
  loc('Land clearing', 'Land clearing'),
  loc('Bendungan / break water', 'Dam / break water')
]

/** Pengalaman proyek pertambangan. */
export const lmpMiningProjects: LmpProject[] = [
  {
    title: loc('Kontraktor Pertambangan Nikel', 'Nickel Ore Mining Contractor'),
    client: loc('PT. GPS (Harita Group)', 'PT. GPS (Harita Group)'),
    location: loc('Obi – Halmahera', 'Obi – Halmahera'),
    period: loc('Kontraktor pertambangan', 'Mining contractor'),
    scope: loc('100.000 MT/bulan bijih · 200.000 Bcm/bulan overburden', '100,000 MT/month of ore · 200,000 Bcm/month of overburden')
  },
  {
    title: loc('Kontraktor Pertambangan Bijih Besi', 'Iron Ore Mining Contractor'),
    client: loc('PT. Karya Wijaya Aneka Mineral', 'PT. Karya Wijaya Aneka Mineral'),
    location: loc('Marau, Kalimantan Barat', 'Marau, West Kalimantan'),
    period: loc('Kontraktor pertambangan', 'Mining contractor'),
    scope: loc('150.000 MT/bulan bijih · 100.000 Bcm/bulan overburden', '150,000 MT/month of ore · 100,000 Bcm/month of overburden')
  },
  {
    title: loc('Kontraktor Pertambangan Bauxite', 'Bauxite Ore Mining Contractor'),
    client: loc('PT. Harita Prima Abadi Mineral', 'PT. Harita Prima Abadi Mineral'),
    location: loc('Kendawangan, Kalimantan Barat', 'Kendawangan, West Kalimantan'),
    period: loc('Kontraktor pertambangan', 'Mining contractor'),
    scope: loc('200.000 MT/bulan bijih washing · 250.000 Bcm/bulan overburden', '200,000 MT/month of washed ore · 250,000 Bcm/month of overburden')
  },
  {
    title: loc('Pertambangan Batubara Rank Tinggi–Rendah', 'High to Low Rank Coal Mining'),
    client: loc(
      'PT. Sumber Kurnia Buana · PT. Pesona Khatulistiwa Nusantara · PT. Banua Delta Kencana · PT. Gorby Putra Utama',
      'PT. Sumber Kurnia Buana · PT. Pesona Khatulistiwa Nusantara · PT. Banua Delta Kencana · PT. Gorby Putra Utama'
    ),
    location: loc('Kalimantan Selatan, Kalimantan Timur, Sumatera Selatan', 'South Kalimantan, East Kalimantan, South Sumatera'),
    period: loc('Kontraktor aktif', 'Active contractor'),
    scope: loc('500.000 Bcm OB dan 60.000 MT coal exposed per bulan', '500,000 Bcm of OB and 60,000 MT of coal exposed monthly')
  }
]

/** Pengalaman proyek konstruksi teknik. */
export const lmpCivilProjects: LmpProject[] = [
  {
    title: loc('Site Development Smelter', 'Site Development Smelter'),
    client: loc('PT Well Harvest Wining Alumina Refinery (WHW)', 'PT Well Harvest Wining Alumina Refinery (WHW)'),
    location: loc('Kendawangan, Kalimantan Tengah', 'Kendawangan, Central Kalimantan'),
    period: loc('2014 – 2015', '2014 – 2015'),
    scope: loc('Land clearing 63,87 Ha · excavasi 5.447.247,58 Bcm · spreading 5.691.024,00 Bcm', 'Land clearing 63.87 ha · 5,447,247.58 Bcm of excavation · 5,691,024.00 Bcm of spreading')
  },
  {
    title: loc('Site Development Smelter', 'Site Development Smelter'),
    client: loc('PT Kayong Aluminium Nusantara (KAN)', 'PT Kayong Aluminium Nusantara (KAN)'),
    location: loc('Kendawangan, Kalimantan Tengah', 'Kendawangan, Central Kalimantan'),
    period: loc('2025 – berjalan', '2025 – ongoing'),
    scope: loc('Rental equipment & dump truck · 13.081,95 M3', 'Rental equipment & dump truck · 13,081.95 m3')
  },
  {
    title: loc('Pembangunan Jalan Tol Jagorawi', 'Road Development Jagorawi Toll Road'),
    client: loc('PT Jasa Marga (Persero)', 'PT Jasa Marga (Persero)'),
    location: loc('TMII – Cibubur', 'TMII – Cibubur'),
    period: loc('Januari 1995 – Februari 1996', 'January 1995 – February 1996'),
    scope: loc('Unsuitable material 75.972,00 Bcm · sub grade 219.921,00 M3 · sub base 159.416,00 M3', '75,972.00 Bcm of unsuitable material · 219,921.00 m3 of sub grade · 159,416.00 m3 of sub base'),
    value: loc('Nilai kontrak Rp 12.502.414.036,72', 'Contract value Rp 12,502,414,036.72')
  },
  {
    title: loc('Rel Lingkar & TLS III (F199)', 'Rel Lingkar & TLS III (F199)'),
    client: loc('PT Tambang Batubara Bukit Asam', 'PT Tambang Batubara Bukit Asam'),
    location: loc('Tanjung Enim, Sumatera Selatan', 'Tanjung Enim, South Sumatera'),
    period: loc('Januari 1996 – Februari 1998', 'January 1996 – February 1998'),
    scope: loc('Land clearing 63,87 Ha · base course 13.081,95 M3 · reinforced concrete pipe dia. 1000 mm', '63.87 ha of land clearing · 13,081.95 m3 of base course · 1000 mm reinforced concrete pipe'),
    value: loc('Nilai kontrak US$ 4.552.819', 'Contract value US$ 4,552,819')
  },
  {
    title: loc('Site Development PLTU Pasuruan', 'Site Development PLTU Pasuruan'),
    client: loc('PLN (Persero) · Mitsubishi Corporation', 'PLN (Persero) · Mitsubishi Corporation'),
    location: loc('Pasuruan, Jawa Timur', 'Pasuruan, East Java'),
    period: loc('Januari 1994 – Juli 1995', 'January 1994 – July 1995'),
    scope: loc('Cut & fill 1.250.000,00 Bcm · bandwall 650,00 M1 · roads 9,00 Km', '1,250,000.00 Bcm of cut and fill · 650.00 m1 of band wall · 9.00 km of roads'),
    value: loc('Nilai kontrak US$ 6.886.562,75', 'Contract value US$ 6,886,562.75')
  },
  {
    title: loc('Jembatan Girder Baja Kelas B Bentang 20 M', 'Class B Steel Girder Bridge, 20 m Span'),
    client: loc('Dinas Pekerjaan Umum Tk. II Kab. Nagan – Provinsi Aceh', 'Dinas Pekerjaan Umum Tk. II Kab. Nagan – Aceh Province'),
    location: loc('Nagan Raya, Provinsi Aceh', 'Nagan Raya, Aceh Province'),
    period: loc('2009', '2009'),
    scope: loc('Pembangunan jembatan baja kelas B bentang 20 meter', 'Construction of a class B steel bridge with a 20 m span'),
    value: loc('Nilai kontrak Rp 4.300.000.000', 'Contract value Rp 4,300,000,000')
  },
  {
    title: loc('Jembatan Rangka Baja Kelas C Bentang 60 M', 'Class C Steel Truss Bridge, 60 m Span'),
    client: loc('Dinas Transmigrasi Tk. I Provinsi Gorontalo', 'Dinas Transmigrasi Tk. I Gorontalo Province'),
    location: loc('Gorontalo', 'Gorontalo'),
    period: loc('2009', '2009'),
    scope: loc('Pembangunan jembatan rangka baja kelas C bentang 60 meter', 'Construction of a class C steel truss bridge with a 60 m span'),
    value: loc('Nilai kontrak Rp 7.500.000.000', 'Contract value Rp 7,500,000,000')
  },
  {
    title: loc('Jembatan Girder Baja Kelas A Bentang 30 M', 'Class A Steel Girder Bridge, 30 m Span'),
    client: loc('Dinas Pekerjaan Umum Tk. I Kalimantan Tengah', 'Dinas Pekerjaan Umum Tk. I Central Kalimantan'),
    location: loc('Palangkaraya, Kalimantan Tengah', 'Palangkaraya, Central Kalimantan'),
    period: loc('2010', '2010'),
    scope: loc('Pembangunan jembatan baja kelas A bentang 30 meter', 'Construction of a class A steel bridge with a 30 m span'),
    value: loc('Nilai kontrak Rp 6.600.000.000', 'Contract value Rp 6,600,000,000')
  },
  {
    title: loc('Jembatan Lengkung Baja Sungai Lulut Kelas C Bentang 21 M', 'Class C Sungai Lulut Steel Arch Bridge, 21 m Span'),
    client: loc('Dinas Pekerjaan Umum Tk. II Kab. Banjar – Kalimantan Selatan', 'Dinas Pekerjaan Umum Tk. II Kab. Banjar – South Kalimantan'),
    location: loc('Kabupaten Banjar, Kalimantan Selatan', 'Banjar Regency, South Kalimantan'),
    period: loc('2010', '2010'),
    scope: loc('Pembangunan jembatan lengkung baja kelas C bentang 21 meter', 'Construction of a class C steel arch bridge with a 21 m span'),
    value: loc('Nilai kontrak Rp 4.800.000.000', 'Contract value Rp 4,800,000,000')
  }
]

/** Armada dan peralatan. */
export const lmpFleet: LmpFleetGroup[] = [
  {
    title: loc('Alat berat', 'Heavy equipment'),
    items: [
      loc('Excavator', 'Excavator'),
      loc('Bulldozer', 'Bulldozer'),
      loc('Compactor dozer', 'Compactor dozer'),
      loc('Wheel loader', 'Wheel loader'),
      loc('Track loader', 'Track loader'),
      loc('Vibrating roller', 'Vibrating roller'),
      loc('Pad foot roller', 'Pad foot roller'),
      loc('Motor grader', 'Motor grader'),
      loc('Hydraulic breaker', 'Hydraulic breaker')
    ]
  },
  {
    title: loc('Alat berat pertambangan', 'Mining heavy equipment'),
    items: [
      loc('Hydraulic excavator & breaker 20–50 ton', 'Hydraulic excavator & breaker 20–50 tons'),
      loc('Bulldozer & ripper 19–40 ton', 'Bulldozer & ripper 19–40 tons'),
      loc('Motor grader 10–20 ton', 'Motor grader 10–20 tons'),
      loc('Vibrating roller', 'Vibrating roller'),
      loc('Crawler drill', 'Crawler drill')
    ]
  },
  {
    title: loc('Dump truck', 'Dump truck'),
    items: [
      loc('Mercedes Benz Actros MB4043 6x6', 'Mercedes Benz Actros MB4043 6x6'),
      loc('Mercedes Benz Axor 2528 6x4 – 20 ton', 'Mercedes Benz Axor 2528 6x4 – 20 tons'),
      loc('MAN Sitrak 6x4 – 30 ton', 'MAN Sitrak 6x4 – 30 tons'),
      loc('Scania P420 8x4 – 35 ton', 'Scania P420 8x4 – 35 tons'),
      loc('Fuel truck, lube truck, dust suppression truck', 'Fuel truck, lube truck, dust suppression truck')
    ]
  },
  {
    title: loc('Trucking & tongkang', 'Trucking & barge'),
    items: [
      loc('Dump truck 6x4 – 20 ton', 'Dump truck 6x4 – 20 tons'),
      loc('Dump truck 6x4 – 24 ton', 'Dump truck 6x4 – 24 tons'),
      loc('Tongkang untuk pengiriman volume besar', 'Barge for large volume delivery')
    ]
  }
]

/** Merek peralatan yang dipakai. */
export const lmpBrands: Localized[] = [
  loc('CAT', 'CAT'),
  loc('Komatsu', 'Komatsu'),
  loc('Sakai', 'Sakai'),
  loc('Mitsubishi', 'Mitsubishi'),
  loc('Doosan', 'Doosan'),
  loc('Sany', 'Sany'),
  loc('Ingersoll Rand', 'Ingersoll Rand')
]

/** Target dan komitmen operasi. */
export const lmpGoals: { icon: string; label: Localized; body: Localized }[] = [
  {
    icon: 'shield',
    label: loc('Sistem manajemen baik & nol kecelakaan', 'Well system management and zero accidents'),
    body: loc('Kepatuhan terhadap standar ISO dan OHSAS pada seluruh proyek.', 'Compliance with ISO and OHSAS standards across every project.')
  },
  {
    icon: 'gear',
    label: loc('Ketersediaan unit minimal 85%', '85% minimum unit availability'),
    body: loc('Perawatan intensif dan condition monitoring untuk menjaga armada tetap siap.', 'Intensive maintenance and condition monitoring keep the fleet deployment-ready.')
  },
  {
    icon: 'target',
    label: loc('Presisi mutu sesuai permintaan klien', 'Precise quality for client requirements'),
    body: loc('Shop drawing, target, dan kontrol biaya, mutu, serta jadwal kerja.', 'Shop drawings, targets, and control over cost, quality, and time schedule.')
  },
  {
    icon: 'academy',
    label: loc('Pelatihan dan pengembangan berkelanjutan', 'Continuous training and development'),
    body: loc('Pelatihan kelas, lapangan, dan bengkel untuk menaikkan keterampilan tenaga kerja.', 'In-class, field, and workshop training to raise workforce skills.')
  },
  {
    icon: 'delivery',
    label: loc('Kontribusi sosial & lingkungan', 'Social and environmental contribution'),
    body: loc('Proyek yang ramah lingkungan dan memperhatikan warga sekitar lokasi kerja.', 'Environmentally considerate projects that benefit communities near the work sites.')
  },
  {
    icon: 'engineer',
    label: loc('Produktivitas armada optimal', 'Optimum fleet productivity'),
    body: loc('Pemilihan unit dan penentuan lokasi yang membantu mengoptimalkan biaya operasi.', 'Unit selection and site positioning that optimise operating cost.')
  }
]

/** Divisi / bidang usaha (dipakai di kartu beranda). */
export const lmpDivisions: ServiceItem[] = [
  {
    id: 1,
    slug: 'mining-contractor',
    icon: 'factory',
    order: 1,
    title: loc('Kontraktor Pertambangan', 'Mining Contractor'),
    excerpt: loc(
      'Kontraktor pertambangan bijih nikel, bijih besi, bauxite, dan batubara: land clearing, overburden removal, selective mining, haulage, stockpile, sampai barging.',
      'Nickel, iron ore, bauxite, and coal mining contractor: land clearing, overburden removal, selective mining, hauling, stockpile management, and barging.'
    ),
    body: { id: '<p>Divisi Pertambangan dan Plant PT Lobunta Mandiri Persada menjalankan pekerjaan earth works dan pertambangan bijih untuk pemilik proyek pertambangan seperti nikel, bijih besi, bauxite, dan batubara. Cakupan pekerjaan mulai dari land clearing, overburden removal, selective mining, coal/ore getting, haulage jarak pendek hingga menengah, stockpile management, pemeliharaan jalan, sampai barging.</p><p>Armada disiapkan dengan excavator 20–50 ton, bulldozer 19–40 ton, motor grader 10–20 ton, dan dump truck 6x4 20–35 ton dari merek CAT, Komatsu, Mitsubishi, Doosan, Sany, dan Ingersoll Rand.</p>', en: '<p>The Mining & Plant Division of PT Lobunta Mandiri Persada delivers earth works and ore mining for mining owners such as nickel, iron ore, bauxite, and coal. The scope covers land clearing, overburden removal, selective mining, coal/ore getting, short to medium distance hauling, stockpile management, road maintenance, and barging.</p><p>The fleet is supported by 20–50 ton excavators, 19–40 ton bulldozers, 10–20 ton motor graders, and 6x4 20–35 ton dump trucks from CAT, Komatsu, Mitsubishi, Doosan, Sany, and Ingersoll Rand.</p>' },
    image: '/img/lmp/mining-2.jpg',
    featured: true
  },
  {
    id: 2,
    slug: 'civil-construction',
    icon: 'engineer',
    order: 2,
    title: loc('Konstruksi Teknik', 'Civil Construction'),
    excerpt: loc(
      'Kontraktor umum untuk jalan, jembatan, gedung, irigasi, pelabuhan, bendungan, dan site development dengan kualifikasi Grade 6.',
      'General contractor for roads, bridges, buildings, irrigation, ports, dams, and site development with Grade 6 qualification.'
    ),
    body: { id: '<p>Divisi Konstruksi Teknik mengerjakan proyek konstruksi umum dengan kualifikasi Grade 6: jalan raya dan jalan lingkungan, jembatan baja, irigasi dan drainase, gedung, pelabuhan, bendungan, serta site development pictured smelter dan pembangkit listrik.</p><p>Prosedur pekerjaan mengikuti data topografi, gambar dan spesifikasi, bill of quantity, method statement, shop drawing, target, bar-chart program, serta schedule tenaga kerja, peralatan, dan material. Pelaporan meliputi progress report, as-built drawing, danpengawasan mutu melalui sand cone test, CBR test, dan sondir.</p>', en: '<p>The Civil Construction Division handles general construction projects with Grade 6 qualification: highways and local roads, steel bridges, irrigation and drainage, buildings, ports, dams, and site development for smelters and power plants.</p><p>Execution follows topographic data, drawings and specifications, bill of quantity, method statement, shop drawings, targets, bar-chart programmes, and manpower, equipment, and material schedules. Reporting covers progress reports, as-built drawings, and quality control through sand cone, CBR, and sondir tests.</p>' },
    image: '/img/lmp/civil-1.jpg',
    featured: true
  },
  {
    id: 3,
    slug: 'heavy-equipment-rental',
    icon: 'truck',
    order: 3,
    title: loc('Penyewaan Alat Berat & Trucking', 'Heavy Equipment Rental & Trucking'),
    excerpt: loc(
      'Sewa excavator, bulldozer, grader, dan dump truck 6x4 20–24 ton plus tongkang untuk stockpile, quarry, cut & fill, smelter, dan infrastruktur.',
      'Rental of excavators, bulldozers, graders, and 6x4 20–24 ton dump trucks plus barges for stockpiles, quarries, cut and fill, smelters, and infrastructure.'
    ),
    body: { id: '<p>Kami menyediakan penyewaan alat berat dan trucking untuk kebutuhan stockpile, tambang bauksit, proyek cut and fill, quarry batu split, proyek smelter, pabrik kelapa sawit, loading-unloading, serta proyek jalan dan infrastruktur lainnya.</p><p>Unit yang siap dipakai meliputi bulldozer, compactor dozer, excavator, wheel loader, track loader, vibrating roller, pad foot roller, motor grader, hydraulic breaker, dump truck 6x4 20 ton dan 24 ton, serta tongkang untuk pengiriman volume besar.</p>', en: '<p>We provide heavy equipment rental and trucking for stockpiles, bauxite mines, cut and fill projects, stone quarries, smelter projects, palm oil mills, loading and unloading, and other road and infrastructure projects.</p><p>Ready-to-use units include bulldozers, compactor dozers, excavators, wheel loaders, track loaders, vibrating rollers, pad foot rollers, motor graders, hydraulic breakers, 6x4 20 and 24 ton dump trucks, and barges for large volume delivery.</p>' },
    image: '/img/lmp/civil-3.jpg',
    featured: true
  },
  {
    id: 4,
    slug: 'earthworks',
    icon: 'target',
    order: 4,
    title: loc('Pekerjaan Tanah & Land Clearing', 'Earthworks & Land Clearing'),
    excerpt: loc(
      'Pekerjaan tanah untuk pembukaan lahan, pemotongan dan penimbunan, pemeliharaan jalan, serta pekerjaan kanal dan drainase.',
      'Earthworks for land opening, cut and fill, road maintenance, and canal and drainage work.'
    ),
    body: { id: '<p>Pekerjaan tanah mencakup pembukaan lahan, pemotongan dan penimbunan, pembuatan lereng, fill borrow, subgrade, sub base, base course, serta parit drainase. Pekerjaan-pekerjaan tersebut merupakan bagian dari scope of work divisi pertambangan dan konstruksi teknik kami.</p><p>Pelaksanaan didukung prosedur: data topografi, method statement, pemilihan mesin, red line atau target, serta schedule tenaga kerja, peralatan, dan material.</p>', en: '<p>Earthworks cover land clearing, cut and fill, sloping, fill borrow, subgrade, sub base, base course, and ditch activities. These works sit within the scope of both our mining and civil construction divisions.</p><p>Execution follows topographic data, method statements, machine application, red lines or targets, and manpower, equipment, and material schedules.</p>' },
    image: '/img/lmp/mining-4.jpg',
    featured: false
  },
  {
    id: 5,
    slug: 'road-bridge-irrigation',
    icon: 'engineer',
    order: 5,
    title: loc('Jalan, Jembatan & Irigasi', 'Road, Bridge & Irrigation'),
    excerpt: loc(
      'Pembangunan jalan raya, jembatan baja, irigasi, dan drainase berikut perawatannya sesuai spesifikasi teknis',
      'Construction of highways, steel bridges, irrigation, and drainage with maintenance according to technical specifications'
    ),
    body: { id: '<p>Kami mengerjakan pembangunan jalan dan jalan tol, jembatan baja kelas A, B, dan C, irigasi, drainase, serta perawatannya sesuai spesifikasi teknis. Pengalaman mencakup Jaguarawi Toll Road (PT Jasa Marga), Jembatan Girder dan Rangka Baja untuk dinas pekerjaan umum di Aceh, Gorontalo, Kalimantan Tengah, dan Kalimantan Selatan.</p><p>Spesifikasi pekerjaan yang kami penuhi: 22001 jalan raya termasuk perawatannya, 22002 jalan kreta api, 22003 lapangan terbang dan runway, 22011 irigasi dan drainase, serta 22103 penggalian dan pemindahan tanah.</p>', en: '<p>We build highways and toll roads, class A, B, and C steel bridges, irrigation, and drainage, including their maintenance according to technical specifications. Our track record covers the Jagorawi Toll Road for PT Jasa Marga and steel girder and truss bridges for public works agencies in Aceh, Gorontalo, Central Kalimantan, and South Kalimantan.</p><p>Qualification codes: 22001 roads including maintenance, 22002 railway roads, 22003 airfields and runways, 22011 irrigation and drainage, and 22103 excavation and earthmoving.</p>' },
    image: '/img/lmp/civil-5.jpg',
    featured: false
  },
  {
    id: 6,
    slug: 'general-supplier-plant',
    icon: 'gear',
    order: 6,
    title: loc('General Supplier & Crushing Plant', 'General Supplier & Crushing Plant'),
    excerpt: loc(
      'Menyediakan alat dan material industri, PERTAMINA dealership, crushing plant, mixer plant, dan penyewaan alat (plant hire).',
      'Supplying industrial equipment and materials, PERTAMINA dealership, crushing plant, mixer plant, and plant hire.'
    ),
    body: { id: '<p>Selain kontraktor dan plant hire, kami menyediakan general supplier and dealership, termasuk PERTAMINA dealership, crushing plant, mixer plant, serta mechanical distributor untuk kebutuhan alat dan material industri.</p><p>Seluruh dukungan iso dan OHSAS, dengan prinsip zero accident dan ketersediaan unit minimal 85%.</p>', en: '<p>Alongside contracting and plant hire, we act as general supplier and dealership, including PERTAMINA dealership, crushing plant, mixer plant, and mechanical distributor for industrial equipment and material needs.</p><p>All work runs on ISO and OHSAS principles, with a zero accident target and a minimum 85% unit availability.</p>' },
    image: '/img/lmp/civil-6.jpg',
    featured: false
  }
]

/** Klien / pemilik proyek dari company profile. */
export const lmpCustomers: CustomerItem[] = [
  { id: 1, name: 'PT. GPS (Harita Group)', logo: '', industry: loc('Pertambangan nikel', 'Nickel mining'), order: 1 },
  { id: 2, name: 'PT. Karya Wijaya Aneka Mineral', logo: '', industry: loc('Pertambangan bijih besi', 'Iron ore mining'), order: 2 },
  { id: 3, name: 'PT. Harita Prima Abadi Mineral', logo: '', industry: loc('Pertambangan bauxite', 'Bauxite mining'), order: 3 },
  { id: 4, name: 'PT. Sumber Kurnia Buana', logo: '', industry: loc('Pertambangan batubara', 'Coal mining'), order: 4 },
  { id: 5, name: 'PT. Banua Delta Kencana', logo: '', industry: loc('Pertambangan batubara', 'Coal mining'), order: 5 },
  { id: 6, name: 'PT. Bara Sentosa Lestari', logo: '', industry: loc('Pertambangan batubara', 'Coal mining'), order: 6 },
  { id: 7, name: 'PT Jasa Marga (Persero)', logo: '', industry: loc('Jalan tol', 'Toll road'), order: 7 },
  { id: 8, name: 'PT Tambang Batubara Bukit Asam', logo: '', industry: loc('Sarana kereta & stasiun', 'Rail line & loading station'), order: 8 },
  { id: 9, name: 'PLN (Persero)', logo: '', industry: loc('Site development pembangkit listrik', 'Power plant site development'), order: 9 },
  { id: 10, name: 'PT Well Harvest Wining Alumina Refinery', logo: '', industry: loc('Smelter', 'Smelter'), order: 10 },
  { id: 11, name: 'PT Kayong Aluminium Nusantara', logo: '', industry: loc('Smelter', 'Smelter'), order: 11 },
  { id: 12, name: 'Dinas Pekerjaan Umum se-Indonesia', logo: '', industry: loc('Jembatan & infrastruktur', 'Bridges & infrastructure'), order: 12 }
]

/** Berkas company profile untuk diunduh. */
export const lmpDocuments: { title: Localized; href: string; size: string }[] = [
  {
    title: loc('Mining Contractor Profile', 'Mining Contractor Profile'),
    href: '/docs/lmp-mining-contractor-profile.pdf',
    size: '3,0 MB'
  },
  {
    title: loc('Civil Contractor Profile (Juli 2026)', 'Civil Contractor Profile (July 2026)'),
    href: '/docs/lmp-civil-construction-profile.pdf',
    size: '2,7 MB'
  },
  {
    title: loc('Iklan Rental Equipment', 'Heavy Equipment Rental Sheet'),
    href: '/docs/lmp-heavy-equipment-rental.pdf',
    size: '0,2 MB'
  }
]

