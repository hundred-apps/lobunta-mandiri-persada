import { computed, type Ref } from 'vue'
import type { CustomerItem, ServiceItem, SiteSettings } from '~/types/content'
import { lmpCustomers, lmpDivisions, lmpSettings } from '~/content/lmp'

/**
 * Akses konten statis LMP (company profile) tanpa panggilan API.
 *
 * Dipakai halaman Beranda dan Profil, plus halaman lain yang memakai data
 * statis sebagai cadangan ketika backend tidak dapat dihubungi.
 */

/** Identitas perusahaan dari company profile. */
export function useStaticCompany() {
  return {
    data: computed<SiteSettings>(() => lmpSettings),
    source: computed<'static'>(() => 'static')
  }
}

/**
 * Daftar layanan: data API (bila ada) digabung dengan data statis LMP,
 * sehingga divisi dari company profile tetap tampil.
 */
export function useStaticServices(api: Ref<ServiceItem[] | undefined | null>) {
  return computed<ServiceItem[]>(() => {
    const remote = api.value ?? []
    const slugs = new Set(remote.map((item) => item.slug))
    return [...remote, ...lmpDivisions.filter((item) => !slugs.has(item.slug))]
  })
}

/** Daftar klien statis LMP digabung dengan data API. */
export function useStaticCustomers(api: Ref<CustomerItem[] | undefined | null>) {
  return computed<CustomerItem[]>(() => {
    const remote = api.value ?? []
    const names = new Set(remote.map((item) => item.name))
    return [...remote, ...lmpCustomers.filter((item) => !names.has(item.name))]
  })
}
