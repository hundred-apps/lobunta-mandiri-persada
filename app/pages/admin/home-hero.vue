<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const { get, update, lastError } = useAdminApi()
const { t } = useI18n()

const fields = computed<FieldDef[]>(() => [
  { name: 'eyebrow', label: t('admin.homeHeroEyebrow'), kind: 'text', bilingual: true, help: t('admin.homeHeroEyebrowHelp') },
  { name: 'heading', label: t('admin.homeHeroHeading'), kind: 'text', bilingual: true, required: true, help: t('admin.homeHeroHeadingHelp') },
  { name: 'heading2', label: t('admin.homeHeroHeading2'), kind: 'text', bilingual: true, help: t('admin.homeHeroHeading2Help') },
  { name: 'description', label: t('admin.homeHeroDescription'), kind: 'textarea', bilingual: true, rows: 4, help: t('admin.homeHeroDescriptionHelp') },
  { name: 'imageUrl', label: t('admin.homeHeroImage'), kind: 'image', help: t('admin.homeHeroImageHelp') },
  { name: 'imagePosition', label: t('admin.homeHeroImagePos'), kind: 'select', options: [
    { value: 'left', label: t('admin.homeHeroImagePosLeft') },
    { value: 'right', label: t('admin.homeHeroImagePosRight') }
  ], help: t('admin.homeHeroImagePosHelp') },
  { name: 'ctaLabel', label: t('admin.homeHeroCta'), kind: 'text', bilingual: true, placeholder: { id: 'Contoh: Lihat Layanan', en: 'e.g. View Services' } },
  { name: 'ctaTo', label: t('admin.homeHeroCtaTo'), kind: 'text', placeholder: { id: '/products', en: '/products' } },
  { name: 'ctaSecondaryLabel', label: t('admin.homeHeroCtaSecondary'), kind: 'text', bilingual: true, placeholder: { id: 'Contoh: Konsultasi Gratis', en: 'e.g. Free Consultation' } },
  { name: 'ctaSecondaryTo', label: t('admin.homeHeroCtaSecondaryTo'), kind: 'text', placeholder: { id: '/contact', en: '/contact' } },
  { name: 'isActive', label: t('admin.homeHeroActive'), kind: 'toggle', help: t('admin.homeHeroActiveHelp') }
])

const model = ref<Record<string, unknown>>({})
const loading = ref(true)
const saving = ref(false)
const notice = ref<{ type: 'ok' | 'error'; text: string } | null>(null)

function emptyValue(field: FieldDef): unknown {
  switch (field.kind) {
    case 'toggle': return true
    case 'number': return 0
    case 'repeater': return []
    case 'pair': return []
    case 'tags': return []
    case 'image': return ''
    case 'select': return field.options?.[0]?.value ?? ''
    default:
      return field.bilingual ? { id: '', en: '' } : ''
  }
}

function defaults(): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const field of fields.value) result[field.name] = emptyValue(field)
  return result
}

onMounted(async () => {
  const row = await get<Record<string, unknown>>('home-hero', 'singleton')
  model.value = { ...defaults(), ...(row || {}) }
  loading.value = false
})

async function save() {
  notice.value = null
  saving.value = true
  const id = String(model.value.id ?? '')
  const result = await update<Record<string, unknown>>('home-hero', id, model.value)
  saving.value = false
  if (result === null) {
    notice.value = { type: 'error', text: lastError.value || t('admin.homeHeroSaveError') }
    return
  }
  const fresh = await get<Record<string, unknown>>('home-hero', 'singleton')
  model.value = { ...defaults(), ...(fresh || {}) }
  await refreshNuxtData(['cms:home:home'])
  notice.value = { type: 'ok', text: t('admin.homeHeroSaved') }
}

useSeoMeta({ title: () => `${t('admin.homeHeroTitle')} | CMS Lobunta` })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl">
          {{ $t('admin.homeHeroTitle') }}
        </h1>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {{ $t('admin.homeHeroBody') }}
        </p>
      </div>
      <button type="button" class="btn-primary" :disabled="saving || loading" @click="save">
        {{ saving ? $t('admin.saving') : $t('admin.save') }}
      </button>
    </div>

    <p
      v-if="notice"
      class="rounded-lg px-4 py-3 text-sm"
      :class="notice.type === 'ok'
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
        : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300'"
      role="status"
    >
      {{ notice.text }}
    </p>

    <div v-if="loading" class="card px-5 py-10 text-center text-sm text-slate-500">
      {{ $t('admin.homeHeroLoading') }}
    </div>

    <form v-else class="card space-y-6 p-6" @submit.prevent="save">
      <AdminField
        v-for="field in fields"
        :key="field.name"
        v-model="model[field.name]"
        :field="field"
      />
    </form>

    <div class="card p-5 text-xs text-slate-500">
      Endpoint: <code class="font-mono">GET /api/home-hero-read/</code> dan
      <code class="font-mono">POST /api/home-hero-create</code>.
    </div>
  </div>
</template>
