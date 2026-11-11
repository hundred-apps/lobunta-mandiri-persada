import type { ScopeWorkItem } from '~/types/content'

/**
 * Scope of Work dari API (`scope-read/`), dikelompokkan per divisi (mining/civil).
 * Fallback ke struktur kosong jika data belum tersedia.
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

const DIVISION_META: Record<'mining' | 'civil', Pick<DivisionScope, 'titleId' | 'titleEn' | 'descriptionId' | 'descriptionEn'>> = {
  mining: {
    titleId: 'Kontraktor Tambang & Pekerjaan Sipil Penunjang Tambang',
    titleEn: 'Mine Contractor & Mine Support Civil Works',
    descriptionId: 'Layanan teknis untuk ekstraksi dan pemrosesan mineral',
    descriptionEn: 'Technical services for mineral extraction and processing'
  },
  civil: {
    titleId: 'Pekerjaan Tanah & Konstruksi Sipil',
    titleEn: 'Earthworks and Civil Construction',
    descriptionId: 'Layanan konstruksi sipil untuk infrastruktur dan bangunan',
    descriptionEn: 'Civil construction services for infrastructure and buildings'
  }
}

function toService(item: ScopeWorkItem, index: number): Service {
  const fallback = String(index + 1).padStart(2, '0')
  return {
    code: item.code && String(item.code).trim() ? String(item.code) : fallback,
    titleId: item.title?.id || '',
    titleEn: item.title?.en || '',
    descriptionId: item.description?.id || '',
    descriptionEn: item.description?.en || '',
    icon: item.icon || 'target'
  }
}

export function useScopeOfWork() {
  const { data } = useCms<ScopeWorkItem[]>('scopes', 'all')

  const divisions = computed<DivisionScope[]>(() => {
    const items = (data.value || []).slice().sort((a, b) => {
      const ao = a.order ?? a.id ?? 0
      const bo = b.order ?? b.id ?? 0
      return ao - bo
    })

    return (['mining', 'civil'] as const).map((key) => {
      const meta = DIVISION_META[key]
      const services = items
        .filter((item) => String(item.type || '').toLowerCase() === key)
        .map((item, index) => toService(item, index))

      return {
        key,
        ...meta,
        services
      }
    })
  })

  const allServices = computed<Service[]>(() => divisions.value.flatMap((d) => d.services))

  return {
    divisions,
    allServices
  }
}
