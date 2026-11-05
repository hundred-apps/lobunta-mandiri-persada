import { computed, type Ref } from 'vue'
import type { CustomerItem } from '~/types/content'
import { useCompany } from '~/composables/useContentSource'

/**
 * Akses konten dari API (bisa dikosongkan saat backend belum diisi).
 * Diganti nanti saat data backend sudah tersedia.
 */

/** Identitas perusahaan. */
export function useStaticCompany() {
  return useCompany()
}

/** Daftar klien dari API. */
export function useStaticCustomers(api: Ref<CustomerItem[] | undefined | null>) {
  return computed<CustomerItem[]>(() => api.value ?? [])
}
