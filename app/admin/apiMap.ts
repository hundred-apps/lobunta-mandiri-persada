/**
 * Pemetaan antara bentuk data API LKR (flat: nameId/nameEn, media bertingkat)
 * dengan bentuk yang dipakai panel admin (bilingual: { id, en }, media berupa URL).
 *
 * Dipakai oleh useAdminApi untuk normalisasi baris saat dibaca dan menyusun
 * payload saat dibuat/diubah. Mengikuti dokumentasi Postman LKR JTW LUBRICANTS.
 */

type Kind = 'bilingual' | 'mono' | 'media' | 'plain' | 'bool' | 'number' | 'gallery' | 'tags' | 'publish' | 'list'

interface FieldMap {
  /**
   * Sumber baca di API. Boleh path bertitik, mis. `logoMedia` atau
   * `images[0].media`. Untuk bilingual jadi `${api}Id` / `${api}En`.
   */
  api: string
  kind: Kind
  /** Nama field multipart untuk unggah berkas baru. Default: `media`. */
  file?: string
  /** Nama field id media untuk connect media lama. Default: `${api}Id`. */
  connect?: string
  /**
   * Field bisa dikosongkan ke null di backend (kolom nullable).
   * Kalau aktif, nilai kosong tetap dikirim ke API alih-alih dilewati.
   */
  nullable?: boolean
}

/** Definisi `kind: 'list'`: array baris dari endpoint yang sama. */
interface ListMap {
  /** Prefix field teks. Baris dengan bentuk `{ id, en }` memakai `${prefix}Id`/`${prefix}En`. */
  api: string
  /** Field teks yang diteruskan apa adanya. */
  plain?: string[]
  /** Nama field multipart untuk unggahan berkas. */
  file: string
}

/** entity key -> { field form -> definisi API } */
const MAPS: Record<string, Record<string, FieldMap>> = {
  'home-hero': {
    eyebrow: { api: 'eyebrow', kind: 'bilingual' },
    heading: { api: 'heading', kind: 'bilingual' },
    heading2: { api: 'heading2', kind: 'bilingual' },
    description: { api: 'body', kind: 'bilingual' },
    imageUrl: { api: 'media', kind: 'media', file: 'media', connect: 'mediaId' },
    imagePosition: { api: 'imagePosition', kind: 'plain' },
    ctaLabel: { api: 'ctaLabel', kind: 'bilingual' },
    ctaTo: { api: 'ctaTo', kind: 'plain' },
    ctaSecondaryLabel: { api: 'ctaSecondaryLabel', kind: 'bilingual' },
    ctaSecondaryTo: { api: 'ctaSecondaryTo', kind: 'plain' },
    order: { api: 'sortOrder', kind: 'number' },
    isActive: { api: 'isActive', kind: 'bool' }
  },
  'product-categories': {
    name: { api: 'name', kind: 'bilingual' },
    slug: { api: 'slug', kind: 'plain' },
    description: { api: 'description', kind: 'bilingual' },
    image: { api: 'media', kind: 'media', file: 'media', connect: 'mediaId' },
    order: { api: 'sortOrder', kind: 'number' }
  },
  products: {
    name: { api: 'name', kind: 'bilingual' },
    slug: { api: 'slug', kind: 'plain' },
    sku: { api: 'sku', kind: 'plain' },
    packaging: { api: 'packaging', kind: 'bilingual' },
    weight: { api: 'weight', kind: 'bilingual' },
    categoryId: { api: 'categoryId', kind: 'number' },
    description: { api: 'description', kind: 'bilingual' },
    image: { api: 'images[0].media', kind: 'media', file: 'media', connect: 'mediaId' },
    tdsFile: { api: 'tdsMedia', kind: 'media', file: 'tdsMedia', connect: 'tdsMediaId' },
    msdsFile: { api: 'msdsMedia', kind: 'media', file: 'msdsMedia', connect: 'msdsMediaId' },
    status: { api: 'status', kind: 'publish' },
    order: { api: 'sortOrder', kind: 'number' }
  },
  services: {
    title: { api: 'title', kind: 'bilingual' },
    slug: { api: 'slug', kind: 'plain' },
    icon: { api: 'icon', kind: 'plain' },
    excerpt: { api: 'excerpt', kind: 'bilingual' },
    body: { api: 'body', kind: 'bilingual' },
    image: { api: 'images[0].media', kind: 'media', file: 'media', connect: 'mediaId' },
    featured: { api: 'featured', kind: 'bool' },
    order: { api: 'sortOrder', kind: 'number' }
  },
  settings: {
    companyName: { api: 'companyName', kind: 'bilingual' },
    legalName: { api: 'legalName', kind: 'plain' },
    tagline: { api: 'tagline', kind: 'bilingual' },
    description: { api: 'description', kind: 'bilingual' },
    foundedYear: { api: 'foundedYear', kind: 'plain' },
    address: { api: 'address', kind: 'bilingual' },
    phone: { api: 'phone', kind: 'plain' },
    whatsapp: { api: 'whatsapp', kind: 'plain' },
    email: { api: 'email', kind: 'plain' },
    officeHours: { api: 'officeHours', kind: 'bilingual' },
    logo: { api: 'logoMedia', kind: 'media', file: 'media', connect: 'logoMediaId' },
    profile: { api: 'profileMedia', kind: 'media', file: 'profileMedia', connect: 'profileMediaId' },
    // Daftar dokumen company profile (PDF) per divisi. Backend memakai array
    // companyProfiles berisi media + judul + tipe.
    companyProfiles: { api: 'companyProfiles', kind: 'list' },
    gallery: { api: 'galleryImages', kind: 'gallery', file: 'galleryMedia', connect: 'galleryImagesId' }
  },
  projects: {
    name: { api: 'name', kind: 'plain' },
    clientName: { api: 'clientName', kind: 'plain' },
    siteAddress: { api: 'siteAddress', kind: 'plain' },
    year: { api: 'year', kind: 'number' },
    contractValue: { api: 'contractValue', kind: 'plain', nullable: true },
    description: { api: 'description', kind: 'bilingual', nullable: true },
    images: { api: 'images[0].media', kind: 'media', file: 'media', connect: 'mediaId' },
    type: { api: 'type', kind: 'plain' },
    show: { api: 'show', kind: 'bool' }
  },
  units: {
    name: { api: 'name', kind: 'plain' },
    status: { api: 'status', kind: 'plain' },
    images: { api: 'images[0].media', kind: 'media', file: 'media', connect: 'mediaId' }
  },
  articles: {
    title: { api: 'title', kind: 'bilingual' },
    slug: { api: 'slug', kind: 'plain' },
    excerpt: { api: 'excerpt', kind: 'bilingual' },
    // Isi artikel diedit lewat satu editor (bukan dua bahasa), lalu disalin ke
    // bodyId dan bodyEn agar halaman Inggris tidak kosong.
    body: { api: 'body', kind: 'mono' },
    author: { api: 'author', kind: 'plain' },
    category: { api: 'category', kind: 'bilingual' },
    tags: { api: 'tags', kind: 'tags' },
    width: { api: 'width', kind: 'number' },
    height: { api: 'height', kind: 'number' },
    alt: { api: 'alt', kind: 'bilingual' },
    coverMedia: { api: 'coverMedia', kind: 'media', file: 'coverMedia', connect: 'coverMediaId' },
    publishedAt: { api: 'publishedAt', kind: 'plain' },
    status: { api: 'status', kind: 'publish' }
  },
  customers: {
    name: { api: 'name', kind: 'plain' },
    quote: { api: 'quote', kind: 'bilingual' },
    image: { api: 'media', kind: 'media', file: 'media', connect: 'mediaId' },
    order: { api: 'sortOrder', kind: 'number' },
    type: { api: 'type', kind: 'plain' },
    show: { api: 'show', kind: 'bool' }
  },
  scopes: {
    title: { api: 'title', kind: 'plain' },
    description: { api: 'description', kind: 'plain' },
    icon: { api: 'icon', kind: 'plain' },
    type: { api: 'type', kind: 'plain' }
  },
  'admin-users': {
    name: { api: 'name', kind: 'plain' },
    email: { api: 'email', kind: 'plain' },
    phone: { api: 'phone', kind: 'plain' },
    role: { api: 'role', kind: 'plain' },
    password: { api: 'password', kind: 'plain' }
  }
}

/** Entity yang payloadnya dikirim sebagai JSON (bukan FormData). */
const JSON_ENTITIES = new Set(['admin-users', 'scopes'])

export function hasApiMap(entityKey: string): boolean {
  return Boolean(MAPS[entityKey])
}

/** Ambil nilai dari path bertitik, mis. `images[0].media`. */
function resolvePath(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, rawKey) => {
    if (acc == null) return undefined
    const match = rawKey.match(/^([^[\]]+)(?:\[(\d+)\])?$/)
    if (!match) return undefined
    const key = match[1]!
    const index = match[2]
    let value = (acc as Record<string, unknown>)[key]
    if (index !== undefined && Array.isArray(value)) value = value[Number(index)]
    return value
  }, source)
}

function mediaUrl(source: unknown): string {
  if (!source) return ''
  const url = typeof source === 'string' ? source : (source as { url?: string }).url
  if (!url) return ''
  if (/^https?:\/\//.test(url)) return url
  const base = String(useRuntimeConfig().public.apiBase || '').replace(/\/+$/, '').replace(/\/api$/, '')
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Ubah nilai `tags` dari API (JSON string `["a","b"]`) atau bentuk lain
 * (array / string koma) menjadi daftar string untuk form admin.
 */
function toTagList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean)
  if (typeof value === 'string' && value.trim()) {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) return parsed.map((v) => String(v)).filter(Boolean)
    } catch {
      // bukan JSON: perlakukan sebagai daftar dipisah koma.
    }
    return value.split(',').map((s) => s.trim()).filter(Boolean)
  }
  return []
}

/** Definisi `kind: 'list'` per entity. */
const LISTS: Record<string, Record<string, ListMap>> = {
  settings: {
    companyProfiles: { api: 'title', plain: ['type'], file: 'media' }
  }
}

function listMapOf(entityKey: string, field: string): ListMap | undefined {
  return LISTS[entityKey]?.[field]
}

/** Satu baris list API -> { mediaId, url, ...teks }. */
function toListRow(def: ListMap, raw: unknown): Record<string, unknown> {
  const row = (raw ?? {}) as Record<string, unknown>
  const media = row.media as { id?: number; url?: string } | null | undefined
  const mediaId = media?.id ?? (typeof row.mediaId === 'number' ? row.mediaId : null)
  const out: Record<string, unknown> = {
    mediaId,
    url: mediaUrl(media),
    id: String(row[`${def.api}Id`] ?? ''),
    en: String(row[`${def.api}En`] ?? '')
  }
  for (const key of def.plain ?? []) out[key] = String(row[key] ?? '')
  return out
}

/** Satu baris form admin -> payload API (media lama cukup id-nya). */
function fromListRow(def: ListMap, raw: unknown): Record<string, unknown> {
  const row = (raw ?? {}) as Record<string, unknown>
  const title = (row.title ?? {}) as { id?: unknown; en?: unknown }
  const out: Record<string, unknown> = {
    [`${def.api}Id`]: title.id ?? '',
    [`${def.api}En`]: title.en ?? ''
  }
  for (const key of def.plain ?? []) out[key] = String(row[key] ?? '')
  if (row.file instanceof File) {
    out.media = row.file
  } else if (row.mediaId !== undefined && row.mediaId !== null && row.mediaId !== '') {
    out.mediaId = row.mediaId
  }
  return out
}

/** API row -> bentuk form admin. */
export function normalizeRow(entityKey: string, row: Record<string, unknown>): Record<string, unknown> {
  const map = MAPS[entityKey]
  const out: Record<string, unknown> = { ...row }
  // home-hero memakai unique_id sebagai identifier, bukan id numerik.
  // Entity lain (mis. product) juga punya unique_id yang harus diabaikan.
  if (entityKey === 'home-hero' && row.unique_id !== undefined) out.id = row.unique_id
  if (!map) return out
  // Produk menyimpan spesifikasi teknis di key `specs` (bukan kolom flat),
  // jadi dipetakan ke bentuk field pair { label, value }.
  if (entityKey === 'products') {
    const specs = Array.isArray(row.specs) ? row.specs : []
    out.spec = specs.map((s) => {
      const spec = s as Record<string, unknown>
      return {
        label: { id: spec.labelId ?? '', en: spec.labelEn ?? '' },
        value: { id: spec.valueId ?? '', en: spec.valueEn ?? '' }
      }
    })
  }
  for (const [field, def] of Object.entries(map)) {
    if (def.kind === 'bilingual') {
      out[field] = { id: row[`${def.api}Id`] ?? '', en: row[`${def.api}En`] ?? '' }
    } else if (def.kind === 'media') {
      const media = resolvePath(row, def.api) as { id?: number; url?: string } | null
      out[field] = mediaUrl(media)
      const connectKey = def.connect ?? `${def.api}Id`
      const id = row[connectKey] ?? media?.id
      if (id !== undefined && id !== null) out[connectKey] = id
    } else if (def.kind === 'gallery') {
      // Setiap baris galeri berupa join: { id, mediaId, media: { id, url } }.
      // `id` di array adalah id baris galeri, BUKAN id berkas; yang jadi acuan
      // hapus/pakai ialah id di dalam objek `media` (`media.id`).
      const raw = resolvePath(row, def.api)
      const items = Array.isArray(raw) ? raw : []
      out[field] = items.map((item) => {
        const entry = item as { id?: number; mediaId?: number; media?: { id?: number; url?: string } | null } | null
        const media = entry?.media ?? null
        // Utamakan id yang ada di dalam `media`.
        const mediaId = media?.id ?? entry?.mediaId ?? null
        return { id: mediaId, mediaId, url: mediaUrl(media) }
      })
    } else if (def.kind === 'list') {
      const def2 = listMapOf(entityKey, field)
      const raw = resolvePath(row, def.api)
      const items = Array.isArray(raw) ? raw : []
      out[field] = items.map((item) => (def2 ? toListRow(def2, item) : item))
    } else if (entityKey === 'settings' && field === 'phone') {
      // API mengirim string tunggal, form memakai repeater (array).
      const phone = row[def.api]
      out[field] = Array.isArray(phone) ? phone : (phone ? [phone] : [])
    } else if (def.kind === 'tags') {
      // API mengirim tags sebagai JSON string; form memakai daftar string.
      out[field] = toTagList(row[def.api])
    } else if (def.kind === 'publish') {
      // API memakai 'published'/'draft'; form memakai toggle boolean.
      out[field] = row[def.api] === 'published'
    } else if (def.kind === 'mono') {
      // Satu nilai untuk kedua bahasa: tampilkan sisi Indonesia.
      out[field] = row[`${def.api}Id`] ?? row[def.api] ?? ''
    } else {
      out[field] = row[def.api]
    }
  }
  return out
}

/**
 * Bentuk form admin -> payload API.
 * Mengembalikan FormData untuk sebagian besar entitas, atau objek JSON untuk
 * product-categories (mengikuti contoh dokumentasi).
 */
export function buildPayload(entityKey: string, form: Record<string, unknown>): FormData | Record<string, unknown> {
  const map = MAPS[entityKey]
  const json: Record<string, unknown> = {}
  const fd = new FormData()
  const useJson = JSON_ENTITIES.has(entityKey)

  function set(key: string, value: unknown) {
    if (useJson) { json[key] = value } else if (value !== undefined) { fd.append(key, String(value)) }
  }

  /** Ambil nilai skalar dari field yang mungkin array (mis. repeater telepon). */
  function scalar(value: unknown): unknown {
    if (Array.isArray(value)) return value.length ? value[0] : ''
    return value
  }

  if (form.id !== undefined && form.id !== null && form.id !== '' && entityKey !== 'settings') {
    set(entityKey === 'home-hero' ? 'unique_id' : 'id', form.id)
  }

  if (!map) {
    for (const [key, value] of Object.entries(form)) {
      if (value === undefined || value === null) continue
      if (typeof value === 'object' && !Array.isArray(value)) {
        const bi = value as { id?: unknown; en?: unknown }
        set(`${key}Id`, bi.id ?? '')
        set(`${key}En`, bi.en ?? '')
      } else {
        set(key, scalar(value))
      }
    }
    return useJson ? json : fd
  }

  for (const [field, def] of Object.entries(map)) {
    const value = form[field]
    if (def.kind === 'bilingual') {
      const bi = (value ?? {}) as { id?: unknown; en?: unknown }
      set(`${def.api}Id`, bi.id ?? '')
      set(`${def.api}En`, bi.en ?? '')
    } else if (def.kind === 'media') {
      const fileKey = def.file ?? 'media'
      const connectKey = def.connect ?? `${def.api}Id`
      if (value instanceof File) {
        // Berkas baru: kirim sebagai multipart.
        if (useJson) { json[fileKey] = value } else { fd.append(fileKey, value) }
      } else if (value === '') {
        // Admin menghapus berkas: kirim id kosong supaya relasi media dilepas.
        set(connectKey, '')
      } else {
        // Tidak diganti: connect media lama lewat id-nya.
        const connectId = form[connectKey]
        if (connectId !== undefined && connectId !== null && connectId !== '') {
          set(connectKey, connectId)
        }
      }
    } else if (def.kind === 'gallery') {
      // Galeri: tiap item bisa File (unggahan baru) atau objek media lama.
      // Keduanya dikirim berulang pada key yang sama supaya backend menerima
      // daftar media, bukan satu nilai tunggal.
      const fileKey = def.file ?? 'galleryMedia'
      const connectKey = def.connect ?? `${def.api}Id`
      const list = Array.isArray(value) ? value : []
      for (const item of list) {
        if (item instanceof File) {
          fd.append(fileKey, item)
        } else if (item && typeof item === 'object' && (item as { id?: unknown }).id != null) {
          fd.append(connectKey, String((item as { id?: unknown }).id))
        }
      }
    } else if (def.kind === 'list') {
      // Dokumen: tiap baris dikirim sebagai satu field JSON (mediaId untuk
      // dokumen lama); berkas baru ikut sebagai multipart pada key-nya.
      const def2 = listMapOf(entityKey, field)
      const list = Array.isArray(value) ? value : []
      for (const item of list) {
        const row = def2 ? fromListRow(def2, item) : (item as Record<string, unknown>)
        const file = row.media
        delete row.media
        if (file instanceof File) fd.append(def2?.file ?? 'media', file)
        fd.append(def.api, JSON.stringify(row))
      }
    } else if (def.kind === 'bool') {
      set(def.api, value ? 'true' : 'false')
    } else if (def.kind === 'tags') {
      // Backend menyimpan tags sebagai JSON string, mis. `["oli","diesel"]`.
      set(def.api, JSON.stringify(toTagList(value)))
    } else if (def.kind === 'mono') {
      // Satu nilai editor -> salin ke kedua bahasa (bodyId & bodyEn, dll).
      const text = value === null || value === undefined ? '' : String(value)
      set(`${def.api}Id`, text)
      set(`${def.api}En`, text)
    } else if (def.kind === 'publish') {
      // Toggle boolean -> 'published'/'draft' sesuai nilai yang dipakai backend.
      set(def.api, value ? 'published' : 'draft')
    } else if (value !== undefined && value !== null && value !== '') {
      set(def.api, scalar(value))
    } else if (def.nullable) {
      set(def.api, '')
    }
  }

  return useJson ? json : fd
}