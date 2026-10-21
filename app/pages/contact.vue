<script setup lang="ts">
import type { SiteSettings } from "~/types/content";

const { locale, t } = useI18n();
const { data: settings } = useStaticCompany();

const details = computed(() => {
  if (!settings.value) return [];
  const value: SiteSettings = settings.value;
  return [
    {
      icon: "map-pin",
      label: t("common.address") + " " + t("contact.officeTitle"),
      value: pick(value.address),
      href: undefined,
    },
    {
      icon: "phone",
      label: t("common.callUs"),
      value: value.phone.join(" / "),
      href: `tel:+62${value.phone[0]?.replace(/^0/, "")}`,
    },
    {
      icon: "mail",
      label: t("common.email"),
      value: value.email,
      href: `mailto:${value.email}`,
    },
    {
      icon: "clock",
      label: t("common.openHours"),
      value: pick(value.officeHours),
      href: undefined,
    },
  ];
});

useSeoMeta({
  title: () => `${t("contact.title")} | PT Lobunta Mandiri Persada`,
  description: () => t("contact.intro"),
});
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.contact')"
      :title="$t('contact.heading')"
      :intro="$t('contact.intro')"
    />

    <section class="section">
      <div class="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div class="space-y-6">
          <ul class="space-y-4">
            <li
              v-for="item in details"
              :key="item.label"
              class="card flex items-start gap-4 p-5"
            >
              <span
                class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon :name="item.icon" :size="20" />
              </span>
              <span>
                <span
                  class="block text-xs uppercase tracking-wider text-ink-mute"
                  >{{ item.label }}</span
                >
                <component
                  :is="item.href ? 'a' : 'span'"
                  :href="item.href"
                  class="mt-1 block font-medium text-brand-900 dark:text-white"
                  :class="
                    item.href
                      ? 'hover:text-brand-600 hover:underline dark:hover:text-brand-300'
                      : ''
                  "
                >
                  {{ item.value }}
                </component>
              </span>
            </li>
          </ul>

          <div
            v-if="settings"
            class="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10"
          >
            <div class="flex h-full flex-col items-start justify-center gap-4 bg-brand-50 p-8 dark:bg-brand-900/40">
              <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
                <UiIcon name="map-pin" :size="22" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.address") }}
                </p>
                <p class="mt-1 font-medium text-brand-900 dark:text-white">
                  {{ pick(settings.address) }}
                </p>
              </div>
              <a
                class="btn-outline"
                :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pick(settings.address))}`"
                target="_blank"
                rel="noopener"
              >
                {{ $t("common.viewOnMap") }}
                <UiIcon name="arrow-right" :size="16" />
              </a>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <NuxtLink :to="`/${locale}/products`" class="btn-outline">
          {{ $t("nav.products") }}
          <UiIcon name="arrow-right" :size="16" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
