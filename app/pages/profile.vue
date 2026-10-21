<script setup lang="ts">
import {
  lmpBrands,
  lmpCivilProjects,
  lmpCivilScope,
  lmpCustomers,
  lmpDivisions,
  lmpDocuments,
  lmpFacts,
  lmpFleet,
  lmpGoals,
  lmpHistory,
  lmpMiningProjects,
  lmpMiningScope,
  lmpSettings,
  lmpStats,
  lmpVisionMission
} from '~/content/lmp'

const { t } = useI18n()
const milestones = useMilestones()

const heroImage = computed(() => lmpSettings.profile)
const gallery = computed(() => lmpSettings.gallery)

const whatsappLink = computed(() => {
  const number = (lmpSettings.whatsapp || '').replace(/[^0-9]/g, "")
  return `https://wa.me/${number}?text=${encodeURIComponent(
    "Halo, saya ingin meminta company profile PT Lobunta Mandiri Persada."
  )}`
})

useSeoMeta({
  title: () => `${t("nav.profile")} | ${pick(lmpSettings.companyName)}`,
  description: () => pick(lmpSettings.description) || t("meta.homeDescription")
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.profile')"
      :title="pick(lmpSettings.companyName)"
      :intro="pick(lmpSettings.tagline)"
      :image="heroImage"
    />

    <section v-if="lmpStats.length" class="relative z-10 -mt-8">
      <div class="container-page">
        <div
          class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-card dark:border-white/10 dark:bg-white/10 lg:grid-cols-4"
        >
          <div
            v-for="stat in lmpStats"
            :key="stat.label.id"
            class="bg-white p-6 text-center dark:bg-brand-900/60"
          >
            <p class="font-display text-2xl font-black text-brand-600 dark:text-brand-300 sm:text-3xl">
              {{ stat.value }}
            </p>
            <p class="mt-1 text-xs uppercase tracking-wider text-ink-mute">
              {{ pick(stat.label) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div>
          <UiSectionHeading
            :eyebrow="$t('nav.profile')"
            :heading="$t('profile.aboutTitle')"
          />
          <div class="prose-lkr mt-6 space-y-4 text-base sm:text-lg">
            <p>{{ pick(lmpSettings.description) }}</p>
            <p v-for="paragraph in lmpHistory" :key="paragraph.id">
              {{ pick(paragraph) }}
            </p>
          </div>

          <dl class="not-prose mt-8 grid gap-4 sm:grid-cols-2">
            <div v-for="fact in lmpFacts" :key="fact.label.id" class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ pick(fact.label) }}
              </dt>
              <dd class="mt-1 text-sm font-medium">
                {{ pick(fact.value) }}
              </dd>
            </div>
          </dl>
        </div>

        <aside class="card p-6">
          <h2 class="text-lg">
            {{ $t('profile.businessLines') }}
          </h2>
          <ul class="mt-5 space-y-4">
            <li
              v-for="division in lmpDivisions"
              :key="division.id"
              class="flex items-start gap-3"
            >
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon :name="division.icon || 'gear'" :size="20" />
              </span>
              <div>
                <p class="text-sm font-semibold text-brand-900 dark:text-white">
                  {{ pick(division.title) }}
                </p>
                <p class="prose-lkr mt-0.5 text-xs">
                  {{ pick(division.excerpt) }}
                </p>
              </div>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="$t('profile.visionMissionTitle')"
          :body="$t('profile.visionMissionBody')"
        />
        <div class="mt-10 grid gap-5 lg:grid-cols-3">
          <div class="card p-6">
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon name="target" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ $t('profile.vision') }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ pick(lmpVisionMission.vision) }}
            </p>
          </div>
          <div class="card p-6">
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon name="delivery" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ $t('profile.mission') }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ pick(lmpVisionMission.mission) }}
            </p>
          </div>
          <div class="card p-6">
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon name="shield" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ $t('profile.philosophy') }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ pick(lmpVisionMission.philosophy) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <UiSectionHeading
            :heading="$t('profile.scopeTitle')"
            :body="$t('profile.scopeBody')"
          />
          <div class="mt-6 grid gap-6 sm:grid-cols-2">
            <div class="card p-5">
              <p class="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                {{ $t('home.scopeMining') }}
              </p>
              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="item in lmpMiningScope"
                  :key="item.id"
                  class="flex items-start gap-2.5 text-sm text-ink-soft dark:text-slate-300"
                >
                  <UiIcon name="check" :size="16" class="mt-0.5 text-brand-600" />
                  <span>{{ pick(item) }}</span>
                </li>
              </ul>
            </div>
            <div class="card p-5">
              <p class="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
                {{ $t('home.scopeCivil') }}
              </p>
              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="item in lmpCivilScope"
                  :key="item.id"
                  class="flex items-start gap-2.5 text-sm text-ink-soft dark:text-slate-300"
                >
                  <UiIcon name="check" :size="16" class="mt-0.5 text-brand-600" />
                  <span>{{ pick(item) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <UiSectionHeading
            :heading="$t('profile.fleetTitle')"
            :body="$t('profile.fleetBody')"
          />
          <div class="mt-6 space-y-4">
            <div v-for="group in lmpFleet" :key="group.title.id" class="card p-5">
              <p class="text-sm font-semibold text-brand-900 dark:text-white">
                {{ pick(group.title) }}
              </p>
              <ul class="mt-3 flex flex-wrap gap-2">
                <li v-for="item in group.items" :key="item.id" class="chip">
                  {{ pick(item) }}
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="brand in lmpBrands" :key="brand.id" class="chip bg-accent-500 text-brand-950">
              {{ pick(brand) }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.profile')"
          :heading="$t('profile.projectsTitle')"
          :body="$t('profile.projectsBody')"
        />
        <div class="mt-10 grid gap-5 lg:grid-cols-2">
          <article
            v-for="project in [...lmpMiningProjects, ...lmpCivilProjects]"
            :key="pick(project.title) + pick(project.client)"
            class="card flex flex-col p-6"
          >
            <h3 class="text-lg">
              {{ pick(project.title) }}
            </h3>
            <p class="mt-2 text-sm font-semibold text-brand-700 dark:text-brand-300">
              {{ pick(project.client) }}
            </p>
            <p class="mt-1 text-xs text-ink-mute">
              {{ pick(project.location) }} · {{ pick(project.period) }}
            </p>
            <p class="prose-lkr mt-3 text-sm">
              {{ pick(project.scope) }}
            </p>
            <p v-if="project.value" class="mt-3 text-xs font-semibold text-ink-soft dark:text-slate-300">
              {{ pick(project.value) }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section v-if="milestones.length" class="section">
      <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <UiSectionHeading
          :eyebrow="$t('nav.profile')"
          :heading="$t('home.aboutHeading')"
          :body="$t('home.aboutBody')"
        />
        <MilestoneTimeline :items="milestones" />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="$t('profile.valuesTitle')"
          :body="$t('profile.valuesBody')"
        />
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in lmpGoals"
            :key="item.label.id"
            class="card p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon :name="item.icon" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ pick(item.label) }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ pick(item.body) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="gallery.length" class="section">
      <div class="container-page">
        <UiSectionHeading
          align="center"
          :heading="$t('profile.galleryTitle')"
          :body="$t('profile.galleryBody')"
        />
        <div class="mt-10">
          <GalleryCarousel :images="gallery" />
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <UiSectionHeading :heading="$t('profile.contactTitle')" />
        <div class="mt-6 grid gap-6 lg:grid-cols-2">
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="card flex gap-4 p-5">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="map-pin" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.address") }}
                </p>
                <p class="mt-1 text-sm">
                  {{ pick(lmpSettings.address) }}
                </p>
              </div>
            </div>

            <div class="card flex gap-4 p-5">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="phone" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.callUs") }}
                </p>
                <p class="mt-1 space-y-1">
                  <a
                    v-for="phone in lmpSettings.phone"
                    :key="phone"
                    :href="`tel:+62${phone.replace(/^0/, '')}`"
                    class="block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                  >
                    {{ phone }}
                  </a>
                </p>
              </div>
            </div>

            <div class="card flex gap-4 p-5">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="mail" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.email") }}
                </p>
                <a
                  :href="`mailto:${lmpSettings.email}`"
                  class="mt-1 block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                >
                  {{ lmpSettings.email }}
                </a>
              </div>
            </div>

            <div class="card flex gap-4 p-5">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon name="clock" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.openHours") }}
                </p>
                <p class="mt-1 text-sm">
                  {{ pick(lmpSettings.officeHours) }}
                </p>
              </div>
            </div>
          </div>

          <div class="card flex flex-col p-6">
            <span class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
              <UiIcon name="document" :size="22" />
            </span>
            <h3 class="mt-5 text-lg">
              {{ $t("common.downloadProfile") }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ $t("profile.downloadBody") }}
            </p>
            <ul class="mt-5 space-y-3">
              <li v-for="doc in lmpDocuments" :key="doc.href">
                <a
                  :href="doc.href"
                  target="_blank"
                  rel="noopener"
                  class="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium transition hover:border-brand-500 hover:text-brand-700 dark:border-white/10 dark:hover:text-brand-300"
                >
                  <span class="flex items-center gap-2">
                    <UiIcon name="document" :size="16" />
                    {{ pick(doc.title) }}
                  </span>
                  <span class="text-xs text-ink-mute">
                    {{ doc.size }}
                  </span>
                </a>
              </li>
            </ul>
            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener"
              class="btn-primary mt-6 w-full"
            >
              <UiIcon name="whatsapp" filled :size="18" />
              {{ $t("career.requestProfile") }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <section v-if="lmpCustomers.length" class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.customers')"
          :heading="$t('customers.title')"
          :body="$t('customers.intro')"
        />
        <div class="mt-10">
          <CustomerGrid :items="lmpCustomers" />
        </div>
      </div>
    </section>

    <CtaBanner
      :heading="t('services.contactCta')"
      :body="t('contact.intro')"
      :button-label="t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>
