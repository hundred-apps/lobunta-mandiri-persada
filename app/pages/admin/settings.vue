<script setup lang="ts">
import type { FieldDef } from '~/admin/types'

definePageMeta({ layout: 'admin' })

const { get, update, remove, lastError } = useAdminApi()
const { t } = useI18n()

/** Pilihan divisi dokumen company profile. */
const docTypes = computed(() => [
  { value: 'mining', label: t('projects.docMining') },
  { value: 'civil', label: t('projects.docCivil') },
  { value: 'general', label: t('projects.docGeneral') }
])

const fields = computed<FieldDef[]>(() => [
  { name: 'companyName', label: t('admin.settingsCompanyName'), kind: 'text', bilingual: true, required: true },
  { name: 'legalName', label: t('admin.settingsLegalName'), kind: 'text', required: true, help: t('admin.settingsLegalNameHelp') },
  { name: 'tagline', label: t('admin.settingsTagline'), kind: 'text', bilingual: true, required: true },
  { name: 'description', label: t('admin.settingsDescription'), kind: 'textarea', bilingual: true, required: true, rows: 4, help: t('admin.settingsDescriptionHelp') },
  { name: 'foundedYear', label: t('admin.settingsFoundedYear'), kind: 'text', required: true },
  { name: 'address', label: t('admin.settingsAddress'), kind: 'textarea', bilingual: true, required: true, rows: 2 },
  { name: 'phone', label: t('admin.settingsPhone'), kind: 'repeater', required: true, help: t('admin.settingsPhoneHelp') },
  { name: 'whatsapp', label: t('admin.settingsWhatsapp'), kind: 'text', required: true, help: t('admin.settingsWhatsappHelp') },
  { name: 'email', label: t('admin.settingsEmail'), kind: 'text', required: true },
  { name: 'officeHours', label: t('admin.settingsOfficeHours'), kind: 'text', bilingual: true, required: true },
  { name: 'logo', label: t('admin.settingsLogo'), kind: 'image', required: true, help: t('admin.settingsLogoHelp') },
  {
    name: 'companyProfiles',
    label: t('admin.settingsCompanyProfiles'),
    kind: 'list',
    listMax: 10,
    help: t('admin.settingsCompanyProfilesHelp'),
    listColumns: [
      { name: 'file', label: t('admin.settingsCompanyProfilesFile'), kind: 'file', accept: 'application/pdf,.pdf' },
      { name: 'title', label: t('admin.settingsCompanyProfilesTitle'), kind: 'bilingual', placeholder: { id: 'Contoh: Profil Kontraktor Pertambangan', en: 'e.g. Mining Contractor Profile' } },
      { name: 'type', label: t('admin.settingsCompanyProfilesType'), kind: 'select', options: docTypes.value }
    ]
  },
  { name: 'profile', label: t('admin.settingsProfile'), kind: 'image', help: t('admin.settingsProfileHelp') },
  { name: 'gallery', label: t('admin.settingsGallery'), kind: 'gallery', max: 10, help: t('admin.settingsGalleryHelp') }
])

const model = ref<Record<string, unknown>>({})
const loading = ref(true)
const saving = ref(false)
const notice = ref<{ type: 'ok' | 'error'; text: string } | null>(null)

function defaults(): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const field of fields.value) {
    result[field.name] = field.kind === 'repeater' || field.kind === 'gallery' || field.kind === 'list'
      ? []
      : field.bilingual ? { id: '', en: '' } : field.kind === 'image' ? '' : ''
  }
  return result
}

onMounted(async () => {
  const row = await get<Record<string, unknown>>('settings', 'site')
  model.value = { ...defaults(), ...(row || {}) }
  loading.value = false
})

function isEmpty(field: FieldDef, value: unknown): boolean {
  if (field.bilingual) {
    const bi = (value ?? {}) as { id?: unknown; en?: unknown }
    return !String(bi.id ?? '').trim() || !String(bi.en ?? '').trim()
  }
  if (field.kind === 'repeater') return !Array.isArray(value) || value.length === 0
  if (field.kind === 'list' || field.kind === 'gallery') return !Array.isArray(value) || value.length === 0
  return !String(value ?? '').trim()
}

async function save() {
  notice.value = null
  const missing = fields.value.filter((field) => field.required && isEmpty(field, model.value[field.name]))
  if (missing.length) {
    notice.value = { type: 'error', text: t('admin.noticeSettingsRequired', { fields: missing.map((f) => f.label).join(', ') }) }
    return
  }
  saving.value = true
  const result = await update<Record<string, unknown>>('settings', 'site', model.value)
  saving.value = false
  if (result === null) {
    notice.value = { type: 'error', text: lastError.value || t('admin.noticeSaveError') }
    return
  }
  // Muat ulang dari API supaya bentuk form (bilingual/media) tetap benar.
  const fresh = await get<Record<string, unknown>>('settings', 'site')
  model.value = { ...defaults(), ...(fresh || {}) }
  await refreshNuxtData(['cms:settings:site', 'cms:home:home'])
  notice.value = { type: 'ok', text: t('admin.noticeSettingsSaved') }
}

useSeoMeta({ title: () => `${t('admin.settingsTitle')} | CMS Lobunta` })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl">
          {{ $t('admin.settingsTitle') }}
        </h1>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {{ $t('admin.settingsBody') }}
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
      {{ $t('admin.settingsLoading') }}
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
      {{ $t('admin.settingsEndpointsHelp') }}
    </div>
  </div>
</template>