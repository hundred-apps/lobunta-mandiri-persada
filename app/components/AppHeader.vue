<script setup lang="ts">
import type { SiteSettings } from '~/types/content'

const props = defineProps<{ settings: SiteSettings | null }>()

const { locale, locales, setLocale } = useI18n()
const open = ref(false)
const route = useRoute()

const otherLocales = computed(() =>
  (locales.value as Array<{ code: string; name?: string }>).filter((item) => item.code !== locale.value)
)

watch(() => route.fullPath, () => { open.value = false })

async function switchLocale(code: string) {
  await setLocale(code as 'id' | 'en')
  open.value = false
}

const nav = computed(() => {
  const visibility = props.settings?.menuVisibility ? (typeof props.settings.menuVisibility === 'string' ? JSON.parse(props.settings.menuVisibility) : props.settings.menuVisibility) : {}
  const defaultNav = [
    { key: 'home', label: 'nav.home', to: '/' },
    { key: 'profile', label: 'nav.profile', to: '/profile' },
    { key: 'products', label: 'nav.products', to: '/products' },
    { key: 'projects', label: 'nav.projects', to: '/projects' },
    { key: 'units', label: 'nav.units', to: '/units' },
    { key: 'customers', label: 'nav.customers', to: '/customers' },
    { key: 'blog', label: 'nav.blog', to: '/blog' },
    { key: 'contact', label: 'nav.contact', to: '/contact' }
  ]
  return defaultNav.filter(item => visibility[item.key] !== false)
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-brand-800/80 bg-brand-900 text-white backdrop-blur shadow-sm">
    <div v-if="settings" class="hidden border-b border-brand-800 bg-brand-950/80 text-brand-200 md:block">
      <div class="container-page flex h-9 items-center justify-between text-xs">
        <p class="flex items-center gap-2">
          <UiIcon name="shield" :size="14" class="text-accent-400" />
          <span>{{ $t('footer.official') }} &middot; {{ $t('footer.tagline') }}</span>
        </p>
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5 text-brand-200">
            <UiIcon name="clock" :size="14" class="text-accent-400" />
            {{ pick(settings.officeHours) }}
          </span>
          <a :href="`tel:+62${settings.phone[0]?.replace(/^0/, '')}`" class="flex items-center gap-1.5 text-brand-200 hover:text-white">
            <UiIcon name="phone" :size="14" class="text-accent-400" />
            {{ settings.phone[0] }}
          </a>
        </div>
      </div>
    </div>

    <div class="container-page flex h-16 items-center justify-between gap-4">
      <NuxtLink :to="`/${locale}`" class="flex items-center gap-3">
        <img
          v-if="settings?.logo"
          :src="settings.logo"
          :alt="pick(settings.companyName)"
          class="h-11 w-auto max-w-[11rem] object-contain brightness-0 invert"
        >
        <span v-else class="grid h-10 w-10 place-items-center rounded-lg bg-accent-500 font-display text-xs font-black text-brand-950">
          LMP
        </span>
        <div class="flex flex-col leading-tight min-w-0">
          <span class="font-display text-xs sm:text-base font-bold text-white tracking-wide truncate max-w-[160px] sm:max-w-none">
            {{ settings ? pick(settings.companyName) : 'PT LOBUNTA MANDIRI PERSADA' }}
          </span>
          <span class="text-[9px] sm:text-[10px] uppercase tracking-wider text-accent-300 font-medium truncate">
            Mining & Civil Contractor
          </span>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="`/${locale}${item.to}`"
          class="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
          active-class="!text-accent-400 !font-semibold bg-white/5"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden items-center rounded-lg border border-white/20 p-0.5 sm:flex">
          <button
            v-for="item in locales"
            :key="item.code"
            type="button"
            class="rounded-md px-2.5 py-1 text-xs font-semibold uppercase transition"
            :class="item.code === locale ? 'bg-accent-500 text-brand-950 font-bold' : 'text-white/80 hover:text-white hover:bg-white/10'"
            @click="switchLocale(item.code)"
          >
            {{ item.code }}
          </button>
        </div>

        <NuxtLink
          :to="`/${locale}/contact`"
          class="hidden items-center gap-2 rounded-xl bg-accent-500 px-4 py-2 text-sm font-bold text-brand-950 transition hover:bg-accent-400 active:scale-[0.98] md:flex shadow-sm"
        >
          <UiIcon name="phone" :size="16" />
          <span>{{ $t('nav.contact') }}</span>
        </NuxtLink>

        <button
          type="button"
          class="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
          :aria-label="open ? $t('nav.close') : $t('nav.open')"
          :aria-expanded="open"
          @click="open = !open"
        >
          <UiIcon :name="open ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <div v-if="open" class="border-t border-brand-800 bg-brand-900 px-4 pb-6 pt-2 lg:hidden text-white">
      <nav class="flex flex-col">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="`/${locale}${item.to}`"
          class="rounded-lg px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
          active-class="!text-accent-400 !font-semibold bg-white/5"
        >
          {{ $t(item.label) }}
        </NuxtLink>
      </nav>
      <div class="mt-4 flex items-center justify-between border-t border-brand-800 pt-4">
        <div class="flex items-center rounded-lg border border-white/20 p-0.5">
          <button
            v-for="item in locales"
            :key="item.code"
            type="button"
            class="rounded-md px-3 py-1.5 text-xs font-semibold uppercase"
            :class="item.code === locale ? 'bg-accent-500 text-brand-950 font-bold' : 'text-white/80'"
            @click="switchLocale(item.code)"
          >
            {{ item.code }}
          </button>
        </div>
        <NuxtLink
          :to="`/${locale}/contact`"
          class="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-3.5 py-1.5 text-xs font-bold text-brand-950"
        >
          <UiIcon name="phone" :size="14" />
          {{ $t('nav.contact') }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>