<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { profile, isAuthenticated, logout } = useAdminAuth()
const { connected, lastError, baseUrl } = useAdminApi()
const { data: company } = useStaticCompany()
const { locale, locales, setLocale } = useI18n()

const collapsed = ref(false)

async function switchLocale(code: string) {
  await setLocale(code as 'id' | 'en')
}

const isSuperUser = computed(() => profile.value?.role === 'superuser')

const groups = computed(() => [
  {
    label: t('admin.navGeneral'),
    items: [
      { to: '/admin', label: t('admin.navDashboard'), icon: 'target' },
      { to: '/admin/settings', label: t('admin.navSettings'), icon: 'gear' }
    ]
  },
  {
    label: t('admin.navContent'),
    items: [
      { to: '/admin/home-hero', label: t('admin.navHomeHero'), icon: 'target' },
      { to: '/admin/product-categories', label: t('admin.navProductCategories'), icon: 'delivery' },
      { to: '/admin/products', label: t('admin.navProducts'), icon: 'lab' },
      { to: '/admin/scopes', label: t('admin.navScopes'), icon: 'check' },
      { to: '/admin/projects', label: t('admin.navProjects'), icon: 'target' },
      { to: '/admin/units', label: t('admin.navUnits'), icon: 'truck' },
      { to: '/admin/articles', label: t('admin.navArticles'), icon: 'document' },
      { to: '/admin/customers', label: t('admin.navCustomers'), icon: 'factory' }
    ]
  },
  ...(isSuperUser.value ? [{
    label: t('admin.navSystem'),
    items: [
      { to: '/admin/admin-users', label: t('admin.navAdminUsers'), icon: 'engineer' }
    ]
  }] : [])
])

function isActive(to: string): boolean {
  if (to === '/admin') return route.path === '/admin'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-ink dark:bg-brand-950 dark:text-slate-200">
    <div class="flex">
      <aside
        class="sticky top-0 flex h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-all dark:border-white/10 dark:bg-brand-900/40"
        :class="collapsed ? 'w-16' : 'w-64'"
      >
        <div class="flex h-16 items-center gap-2 border-b border-slate-200 px-4 dark:border-white/10">
          <img
            v-if="company.logo"
            :src="company.logo"
            alt="Logo"
            class="h-9 w-9 shrink-0 rounded-lg object-contain"
          >
          <UiIcon v-else name="oil" :size="28" class="text-brand-700 dark:text-brand-300" />
          <span v-if="!collapsed" class="leading-tight">
            <span class="block font-display text-sm font-bold text-brand-900 dark:text-white">{{ $t('admin.panelName') }}</span>
            <span class="block text-[10px] uppercase tracking-wider text-slate-500">{{ $t('admin.panelTag') }}</span>
          </span>
        </div>

        <nav class="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          <div v-for="group in groups" :key="group.label">
            <p v-if="!collapsed" class="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              {{ group.label }}
            </p>
            <ul class="space-y-0.5">
              <li v-for="item in group.items" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition"
                  :class="isActive(item.to)
                    ? 'bg-brand-700 font-semibold text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'"
                  :title="collapsed ? item.label : undefined"
                >
                  <UiIcon :name="item.icon" :size="18" />
                  <span v-if="!collapsed">{{ item.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>

        <div class="border-t border-slate-200 p-3 dark:border-white/10">
          <button
            type="button"
            class="mb-2 flex w-full items-center justify-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
            @click="collapsed = !collapsed"
          >
            <UiIcon name="arrow-right" :size="16" :style="collapsed ? '' : 'transform: rotate(180deg)'" />
            <span v-if="!collapsed">{{ $t('admin.navCollapse') }}</span>
          </button>
          <NuxtLink
            to="/"
            class="flex items-center gap-2 rounded-lg px-2 py-2 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <UiIcon name="arrow-right" :size="16" style="transform: rotate(180deg)" />
            <span v-if="!collapsed">{{ $t('admin.navViewSite') }}</span>
          </NuxtLink>
        </div>
      </aside>

      <div class="min-w-0 flex-1">
        <header class="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-5 backdrop-blur dark:border-white/10 dark:bg-brand-950/90">
          <div class="flex items-center gap-3">
            <span
              class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              :class="connected
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'"
            >
              <span class="h-2 w-2 rounded-full" :class="connected ? 'bg-emerald-500' : 'bg-amber-500'" />
              {{ connected ? $t('admin.navConnected') : $t('admin.navNotConnected') }}
            </span>
            <span v-if="!connected && lastError" class="hidden text-xs text-slate-500 sm:inline">
              {{ $t('admin.navLastError', { error: lastError }) }}
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center rounded-lg border border-slate-200 p-0.5 dark:border-white/15">
              <button
                v-for="item in locales"
                :key="item.code"
                type="button"
                class="rounded-md px-2 py-1 text-xs font-semibold uppercase transition"
                :class="item.code === locale ? 'bg-brand-700 text-white' : 'text-slate-500 hover:text-brand-700 dark:text-slate-300'"
                :aria-pressed="item.code === locale"
                @click="switchLocale(item.code)"
              >
                {{ item.code }}
              </button>
            </div>
            <span class="hidden text-sm text-slate-600 dark:text-slate-300 sm:inline">
              {{ profile?.name || profile?.email }}
            </span>
            <button type="button" class="btn-outline !py-2" @click="logout">
              {{ $t('admin.navLogout') }}
            </button>
          </div>
        </header>

        <div
          v-if="!connected"
          class="border-b border-amber-200 bg-amber-50 px-5 py-3 text-xs text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
        >
          {{ $t('admin.navBackendHint') }}
          {{ lastError ? ` ${$t('admin.navLastError', { error: lastError })}` : '' }}
        </div>

        <main class="p-5">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>