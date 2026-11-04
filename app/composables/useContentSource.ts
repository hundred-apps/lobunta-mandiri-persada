import type {
  CompanyProfileDoc,
  CustomerItem,
  HeroBlock,
  HomeContent,
  Localized,
  LocalizedHtml,
  PostItem,
  ProductCategory,
  ProductItem,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  UnitItem,
  UnitStatus
} from '~/types/content'

/**
 * Content access layer.
 *
 * Konten publik diambil dari backend Express di NUXT_PUBLIC_API_BASE.
 * Endpoint mengikuti pola dokumentasi Postman:
 *   GET  {base}/{resource}-read/       -> { data: { query: [...] } }
 *   GET  {base}/{resource}-read/{id}   -> { data: {...} }
 *   POST {base}/{resource}-create      -> buat / ubah
 *   POST {base}/{resource}-delete      -> hapus (raw JSON array id)
 *
 * Tidak ada lagi fallback ke data lokal. Kalau backend tidak menjawab
 * (NUXT_PUBLIC_API_BASE kosong atau request gagal), resource mengembalikan
 * nilai kosong dan errornya dicatat ke console.
 */

export type ResourceName =
  | 'settings'
  | 'home'
  | 'services'
  | 'product-categories'
  | 'products'
  | 'customers'
  | 'posts'
  | 'projects'
  | 'units'

/** Pemetaan resource frontend -> nama resource API. */
/**
 * Batas baris untuk daftar yang harus tampil penuh di halaman publik.
 * Backend membalas maksimal 10 baris bila `limit` tidak dikirim, sehingga
 * data di halaman berikutnya (mis. produk baru) tidak pernah muncul.
 */
const FULL_LIST_LIMIT = 500

/**
 * Batas khusus endpoint `project`/`unit`: backend menolak limit di atas 100
 * (`limit harus berupa bilangan bulat antara 1 dan 100`).
 */
const PAGED_LIST_LIMIT = 100

const API_RESOURCE: Record<ResourceName, string> = {
  settings: 'site-setting',
  home: 'home-hero',
  services: 'service',
  'product-categories': 'product-category',
  products: 'product',
  customers: 'customer',
  posts: 'post',
  projects: 'project',
  units: 'unit'
}

const EMPTY_SETTINGS: SiteSettings = {
  companyName: { id: '', en: '' },
  legalName: '',
  tagline: { id: '', en: '' },
  description: { id: '', en: '' },
  foundedYear: '',
  address: { id: '', en: '' },
  phone: [],
  whatsapp: '',
  email: '',
  officeHours: { id: '', en: '' },
  logo: '',
  profile: '',
  companyProfiles: [],
  gallery: [],
  social: {},
  menuVisibility: {}
}

const EMPTY_HOME: HomeContent = {
  hero: { heading: { id: '', en: '' }, image: '', imagePosition: 'right', textPosition: 'left' },
  categories: [],
  customers: []
}

const EMPTY_DEFAULTS: Record<ResourceName, unknown> = {
  settings: EMPTY_SETTINGS,
  home: EMPTY_HOME,
  services: [],
  'product-categories': [],
  products: [],
  customers: [],
  posts: [],
  projects: [],
  units: []
}

function loc(id: unknown, en: unknown): Localized {
  return { id: id == null ? '' : String(id), en: en == null ? '' : String(en) }
}

function locHtml(id: unknown, en: unknown): LocalizedHtml {
  return { id: id == null ? '' : String(id), en: en == null ? '' : String(en) }
}

/** Ubah path media relatif (/files/x.png) jadi URL absolut. */
export function useMediaUrl() {
  const config = useRuntimeConfig()
  const apiBase = String(config.public.apiBase || '').replace(/\/+$/, '')
  const fileBase = apiBase.replace(/\/api$/, '')
  return function mediaUrl(source: unknown): string {
    if (!source) return ''
    const value = typeof source === 'string' ? source : (source as { url?: string }).url
    if (!value) return ''
    if (/^https?:\/\//.test(value)) return value
    return `${fileBase}${value.startsWith('/') ? '' : '/'}${value}`
  }
}

function mapSettings(row: Record<string, unknown>, media: (v: unknown) => string): SiteSettings {
  const logo = row.logoMedia as { url?: string } | null
  const profiles = Array.isArray(row.companyProfiles) ? row.companyProfiles : []
  return {
    companyName: loc(row.companyNameId, row.companyNameEn),
    legalName: String(row.legalName || ''),
    tagline: loc(row.taglineId, row.taglineEn),
    description: loc(row.descriptionId, row.descriptionEn),
    foundedYear: String(row.foundedYear || ''),
    address: loc(row.addressId, row.addressEn),
    phone: row.phone ? [String(row.phone)] : [],
    whatsapp: String(row.whatsapp || ''),
    email: String(row.email || ''),
    officeHours: loc(row.officeHoursId, row.officeHoursEn),
    logo: media(logo),
    profile: media(row.profileMedia ?? row.imageMedia ?? row.image),
    companyProfiles: profiles
      .map((item) => {
        const doc = item as { mediaId?: number; media?: unknown; titleId?: string; titleEn?: string; type?: string }
        return {
          mediaId: Number(doc.mediaId || 0),
          title: loc(doc.titleId, doc.titleEn),
          type: String(doc.type || 'general'),
          file: media(doc.media)
        } satisfies CompanyProfileDoc
      })
      .filter((doc) => Boolean(doc.file)),
    gallery: Array.isArray(row.galleryImages)
      ? (row.galleryImages as Array<{ media?: unknown; mediaId?: number } | null>)
        .map((item) => media(item?.media))
        .filter(Boolean)
      : [],
    social: {},
    menuVisibility: {}
  }
}

function mapHero(row: Record<string, unknown>, media: (v: unknown) => string): HeroBlock {
  const imagePosition = (row.imagePosition === 'left' ? 'left' : 'right') as 'left' | 'right'
  const primary = {
    label: loc(row.ctaLabelId, row.ctaLabelEn),
    to: String(row.ctaTo || '/products')
  }
  const secondary = {
    label: loc(row.ctaSecondaryLabelId, row.ctaSecondaryLabelEn),
    to: String(row.ctaSecondaryTo || '/contact')
  }
  return {
    eyebrow: loc(row.eyebrowId, row.eyebrowEn),
    heading: loc(row.headingId, row.headingEn),
    subheading: loc(row.bodyId, row.bodyEn),
    description: loc(row.bodyId, row.bodyEn),
    image: media(row.media),
    imagePosition,
    textPosition: imagePosition === 'right' ? 'left' : 'right',
    ctaProduct: primary,
    ctaContact: secondary,
    ctaPrimary: primary,
    ctaSecondary: secondary
  }
}

function mapCategory(row: Record<string, unknown>, media: (v: unknown) => string): ProductCategory {
  const products = Array.isArray(row.products) ? row.products : []
  const image = row.media as { url?: string } | null
  return {
    id: Number(row.id),
    slug: String(row.slug || ''),
    name: loc(row.nameId, row.nameEn),
    description: loc(row.descriptionId, row.descriptionEn),
    image: media(image),
    icon: String(row.icon || 'lab'),
    order: Number(row.sortOrder || 0),
    productCount: products.length,
    applications: { id: [], en: [] }
  }
}

function mapProduct(row: Record<string, unknown>, media: (v: unknown) => string): ProductItem {
  const images = Array.isArray(row.images) ? row.images : []
  const firstImage = (images[0] as { media?: { url?: string } } | undefined)?.media
  const category = row.category as { slug?: string } | undefined
  const specs = Array.isArray(row.specs) ? row.specs : []
  return {
    id: Number(row.id),
    slug: String(row.slug || ''),
    sku: String(row.sku || ''),
    name: loc(row.nameId, row.nameEn),
    categorySlug: String(category?.slug || ''),
    image: media(firstImage || (row.media as { url?: string } | null)),
    packaging: loc(row.packagingId, row.packagingEn),
    weight: loc(row.weightId, row.weightEn),
    spec: specs.map((s) => {
      const spec = s as Record<string, unknown>
      return {
        label: loc(spec.labelId ?? spec.label, spec.labelEn ?? spec.label),
        value: loc(spec.valueId ?? spec.value, spec.valueEn ?? spec.value)
      }
    }),
    tdsMediaId: Number(row.tdsMediaId || 0),
    msdsMediaId: Number(row.msdsMediaId || 0),
    tdsFile: media(row.tdsMedia as { url?: string } | null),
    msdsFile: media(row.msdsMedia as { url?: string } | null),
    description: loc(row.descriptionId, row.descriptionEn),
    featured: Boolean(row.featured),
    status: (row.status === 'published' ? 'published' : 'draft'),
    views: Number(row.views || 0)
  }
}

function mapCustomer(row: Record<string, unknown>, media: (v: unknown) => string): CustomerItem {
  const logo = row.media as { url?: string } | null
  return {
    id: Number(row.id),
    name: String(row.name || ''),
    logo: media(logo),
    image: media(logo),
    industry: loc(row.quoteId, row.quoteEn),
    order: Number(row.sortOrder || 0),
    type: row.type ? String(row.type) : undefined
  }
}

function mapService(row: Record<string, unknown>, media: (v: unknown) => string): ServiceItem {
  const images = Array.isArray(row.images) ? row.images : []
  const firstImage = (images[0] as { media?: { url?: string } } | undefined)?.media
  return {
    id: Number(row.id),
    slug: String(row.slug || ''),
    icon: String(row.icon || 'lab'),
    order: Number(row.sortOrder || 0),
    title: loc(row.titleId, row.titleEn),
    excerpt: loc(row.excerptId, row.excerptEn),
    body: locHtml(row.bodyId, row.bodyEn),
    highlights: { id: [], en: [] },
    image: media(firstImage || (row.media as { url?: string } | null)),
    featured: Boolean(row.featured)
  }
}

function mapProject(row: Record<string, unknown>, media: (v: unknown) => string): ProjectItem {
  const images = Array.isArray(row.images)
    ? (row.images as Array<{ media?: unknown } | null>).map((item) => media(item?.media)).filter(Boolean)
    : []
  const name = loc(row.nameId ?? row.name, row.nameEn ?? row.name)
  return {
    id: Number(row.id),
    slug: String(row.slug || '') || slugify(name.en || name.id),
    name,
    clientName: String(row.clientName || ''),
    siteAddress: String(row.siteAddress || ''),
    year: Number(row.year || 0),
    description: loc(row.descriptionId, row.descriptionEn),
    contractValue: Number(row.contractValue || 0),
    image: images[0] || '',
    images,
    type: row.type ? String(row.type) : undefined
  }
}

const UNIT_STATUSES: UnitStatus[] = ['available', 'maintenance', 'inactive']

function mapUnit(row: Record<string, unknown>, media: (v: unknown) => string): UnitItem {
  const images = Array.isArray(row.images)
    ? (row.images as Array<{ media?: unknown } | null>).map((item) => media(item?.media)).filter(Boolean)
    : []
  const status = String(row.status || '') as UnitStatus
  return {
    id: Number(row.id),
    name: String(row.name || ''),
    status: UNIT_STATUSES.includes(status) ? status : 'available',
    image: images[0] || '',
    images
  }
}

function mapPost(row: Record<string, unknown>, media: (v: unknown) => string): PostItem {
  const coverMedia = row.coverMedia as { url?: string } | null
  return {
    id: Number(row.id),
    slug: String(row.slug || ''),
    title: loc(row.titleId, row.titleEn),
    excerpt: loc(row.excerptId, row.excerptEn),
    body: locHtml(row.bodyId, row.bodyEn),
    cover: media(coverMedia),
    author: String(row.author || ''),
    category: loc(row.categoryId, row.categoryEn),
    tags: Array.isArray(row.tags) ? row.tags : (row.tags ? String(row.tags).split(',').map((t) => t.trim()) : []),
    publishedAt: String(row.publishedAt || ''),
    readingMinutes: Math.max(1, Math.ceil((String(row.bodyId || row.bodyEn || '').length || 0) / 200)),
    status: String(row.status || 'draft') as 'published' | 'draft',
    views: Number(row.views || 0)
  }
}

export function useContentSource() {
  const config = useRuntimeConfig()
  const apiBase = String(config.public.apiBase || '').replace(/\/+$/, '')
  const media = useMediaUrl()

  const source = computed<'api' | 'none'>(() => (apiBase ? 'api' : 'none'))

  async function getList(resource: string, query: Record<string, string | number> = {}): Promise<Record<string, unknown>[]> {
    const res = await $fetch<{ data?: { query?: Record<string, unknown>[] } }>(
      `${apiBase}/${resource}-read/`,
      { query, retry: 0, timeout: 12000, headers: { accept: 'application/json' } }
    )
    return Array.isArray(res.data?.query) ? res.data!.query : []
  }

  async function getOne(resource: string, id: string | number): Promise<Record<string, unknown> | null> {
    const res = await $fetch<{ data?: Record<string, unknown> }>(
      `${apiBase}/${resource}-read/${id}`,
      { retry: 0, timeout: 12000, headers: { accept: 'application/json' } }
    )
    return res.data ?? null
  }

  /** Kirim payload ke path bebas (mis. /contact). */
  async function post<T = unknown>(path: string, payload: unknown): Promise<T> {
    if (!apiBase) throw new Error('API belum dikonfigurasi (NUXT_PUBLIC_API_BASE kosong)')
    return await $fetch<T>(`${apiBase}${path}`, {
      method: 'POST',
      body: payload as BodyInit,
      timeout: 30000,
      headers: { accept: 'application/json', 'content-type': 'application/json' }
    })
  }

  /** Kirim payload resource dengan pola -create / -delete. */
  async function submit(resource: string, action: 'create' | 'delete', payload: FormData | unknown): Promise<unknown> {
    if (!apiBase) throw new Error('API belum dikonfigurasi (NUXT_PUBLIC_API_BASE kosong)')
    const isForm = payload instanceof FormData
    return await $fetch(`${apiBase}/${resource}-${action}`, {
      method: 'POST',
      body: payload as BodyInit,
      timeout: 30000,
      headers: isForm
        ? { accept: 'application/json' }
        : { accept: 'application/json', 'content-type': 'application/json' }
    })
  }

  /**
   * Catat jumlah view (mis. `/product-view`, `/post-view`).
   * Body JSON `{ id }` sesuai dokumentasi Postman.
   */
  async function trackView(path: string, id: string | number): Promise<void> {
    if (!apiBase) return
    await $fetch(`${apiBase}${path}`, {
      method: 'POST',
      body: { id: String(id) },
      timeout: 15000,
      headers: { accept: 'application/json', 'content-type': 'application/json' }
    })
  }

  async function request<T>(name: ResourceName, path = '', query: Record<string, string> = {}): Promise<T> {
    void path
    void query

    try {
      switch (name) {
        case 'settings': {
          const rows = await getList('site-setting')
          return (rows[0] ? mapSettings(rows[0], media) : EMPTY_SETTINGS) as T
        }
        case 'home': {
          const heroRows = await getList('home-hero')
          const categories = await getList('product-category')
          const customers = await getList('customer')
          const home: HomeContent = {
            hero: heroRows[0] ? mapHero(heroRows[0], media) : EMPTY_HOME.hero,
            categories: categories.slice(0, 6).map((c) => mapCategory(c, media)),
            customers: customers.slice(0, 6).map((c) => mapCustomer(c, media))
          }
          return home as T
        }
        case 'services': {
          const rows = await getList('service', { limit: FULL_LIST_LIMIT })
          return rows.map((r) => mapService(r, media)) as T
        }
        case 'product-categories': {
          const rows = await getList('product-category', { limit: FULL_LIST_LIMIT })
          return rows.map((r) => mapCategory(r, media)) as T
        }
        case 'products': {
          const rows = await getList('product', { limit: FULL_LIST_LIMIT })
          return rows.map((r) => mapProduct(r, media)) as T
        }
        case 'posts': {
          const rows = await getList('post', { limit: FULL_LIST_LIMIT })
          return rows.map((r) => mapPost(r, media)) as T
        }
        case 'customers': {
          const rows = await getList('customer', { limit: FULL_LIST_LIMIT })
          return rows.map((r) => mapCustomer(r, media)) as T
        }
        case 'projects': {
          const rows = await getList('project', { limit: PAGED_LIST_LIMIT })
          // Urutkan terbaru dulu supaya halaman tidak bergantung pada urutan backend.
          return rows
            .map((r) => mapProject(r, media))
            .sort((a, b) => b.year - a.year || a.id - b.id) as T
        }
        case 'units': {
          const rows = await getList('unit', { limit: PAGED_LIST_LIMIT })
          return rows.map((r) => mapUnit(r, media)) as T
        }
        default:
          return EMPTY_DEFAULTS[name] as T
      }
    } catch (error) {
      console.error(`[content] gagal memuat "${name}" dari API:`, (error as Error).message)
      return EMPTY_DEFAULTS[name] as T
    }
  }

  /** Ambil satu artikel berdasarkan slug. */
  async function getPost(slug: string): Promise<PostItem | null> {
    try {
      const rows = await getList('post', { limit: 200 })
      const row = rows.find((r) => String(r.slug || '') === slug)
      return row ? mapPost(row, media) : null
    } catch (error) {
      console.error(`[content] gagal memuat artikel "${slug}":`, (error as Error).message)
      return null
    }
  }

  return { apiBase, source, request, post, submit, trackView, getList, getOne, getPost }
}

/**
 * Ambil satu resource. `key` wajib unik per kombinasi resource + argumen.
 *
 * Tidak async: useAsyncData mengembalikan ref yang terisi setelah SSR selesai.
 * Halaman yang perlu memastikan data sudah ada sebelum memutuskan 404
 * (mis. detail proyek) memakai `await useCmsReady(...)`.
 */
export function useCms<T>(name: ResourceName, key: string, path = '', query: Record<string, string> = {}) {
  const { request, source } = useContentSource()
  const asyncData = useAsyncData<T>(`cms:${name}:${key}`, () => request<T>(name, path, query))

  return {
    data: computed(() => asyncData.data.value ?? (EMPTY_DEFAULTS[name] as T)),
    /** Tripel useAsyncData, untuk halaman yang harus menunggu data. */
    asyncData,
    source
  }
}

/** Tunggu satu resource selesai dimuat (dipakai halaman detail). */
export async function useCmsReady<T>(name: ResourceName, key: string) {
  const result = useCms<T>(name, key)
  await result.asyncData
  return result
}

export function useCompany() {
  return useCms<SiteSettings>('settings', 'site')
}