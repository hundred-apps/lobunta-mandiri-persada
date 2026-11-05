<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const { t } = useI18n()

const { list, connected } = useAdminApi()

const countable = computed(() => [
  { key: 'product-categories', label: t('admin.navProductCategories'), icon: 'delivery' },
  { key: 'products', label: t('admin.navProducts'), icon: 'lab' },
  { key: 'projects', label: t('admin.navProjects'), icon: 'target' },
  { key: 'units', label: t('admin.navUnits'), icon: 'truck' },
  { key: 'articles', label: t('admin.navArticles'), icon: 'document' },
  { key: 'customers', label: t('admin.navCustomers'), icon: 'factory' }
])
const counts = reactive<Record<string, number | null>>({})
const loading = ref(true)

async function load() {
  loading.value = true
  for (const item of countable.value) {
    const result = await list(item.key, { limit: 1 })
    counts[item.key] = result.total
  }
  loading.value = false
}

await load()

useSeoMeta({ title: () => `${t('admin.dashboardTitle')} | CMS Lobunta` })
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl">
      {{ $t('admin.dashboardTitle') }}
    </h1>
    <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
      {{ $t('admin.dashboardBody') }}
    </p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="entity in countable"
        :key="entity.key"
        :to="`/${$i18n.locale}/admin/${entity.key}`"
        class="card flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:border-brand-300"
      >
        <span>
          <span class="block text-xs uppercase tracking-wider text-slate-500">{{ entity.label }}</span>
          <span class="mt-1 block font-display text-3xl font-black text-brand-800 dark:text-brand-200">
            {{ loading ? '-' : (counts[entity.key] ?? '-') }}
          </span>
        </span>
        <UiIcon :name="entity.icon" :size="26" class="text-brand-400" />
      </NuxtLink>
    </div>

    <div class="card p-6">
      <h2 class="text-base">
        {{ $t('admin.dashboardStatusTitle') }}
      </h2>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        <template v-if="connected">
          {{ $t('admin.dashboardStatusOk') }}
        </template>
        <template v-else>
          {{ $t('admin.dashboardStatusFail') }}
        </template>
      </p>
    </div>
  </div>
</template>