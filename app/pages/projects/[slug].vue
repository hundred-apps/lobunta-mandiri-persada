<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

const route = useRoute()
const { locale, t } = useI18n()

const slug = computed(() => String(route.params.slug || ''))
// Tunggu data sebelum memutuskan 404; tanpa ini SSR melihat daftar kosong.
const { data: projects } = await useCmsReady<ProjectItem[]>('projects', 'all')

const project = computed(() => projects.value.find((item) => item.slug === slug.value) ?? null)

/** Proyek lain untuk tautan "proyek terkait". */
const related = computed(() => projects.value.filter((item) => item.slug !== slug.value).slice(0, 3))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: () => `${pick(project.value!.name)} | PT Lobunta Mandiri Persada`,
  description: () => pick(project.value!.description) || project.value!.clientName
})
</script>

<template>
  <div v-if="project">
    <section class="section">
      <div class="container-page">
        <NuxtLink :to="`/${locale}/projects`" class="text-sm text-brand-700 hover:underline dark:text-brand-300">
          &larr; {{ $t('projects.backToProjects') }}
        </NuxtLink>

        <div class="card mt-4 overflow-hidden">
          <div class="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div class="p-6 sm:p-8">
              <p class="eyebrow">
                {{ $t('projects.title') }}
              </p>
              <h1 class="mt-3 text-3xl">
                {{ pick(project.name) }}
              </h1>
              <p v-if="pick(project.description)" class="prose-lkr mt-4 text-base">
                {{ pick(project.description) }}
              </p>

              <dl class="mt-6 grid gap-4 sm:grid-cols-2">
                <div class="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                  <dt class="text-xs uppercase tracking-wider text-ink-mute">{{ $t('projects.client') }}</dt>
                  <dd class="mt-1 text-sm font-medium">{{ project.clientName || '—' }}</dd>
                </div>
                <div class="rounded-xl border border-slate-200 p-4 dark:border-white/10">
                  <dt class="text-xs uppercase tracking-wider text-ink-mute">{{ $t('projects.location') }}</dt>
                  <dd class="mt-1 text-sm font-medium">{{ project.siteAddress || '—' }}</dd>
                </div>
              </dl>

              <NuxtLink :to="`/${locale}/contact`" class="btn-primary mt-6">
                <UiIcon name="whatsapp" :size="16" :filled="true" />
                {{ $t('nav.contact') }}
              </NuxtLink>
            </div>

            <div class="grid place-items-center bg-brand-50 p-4 dark:bg-white/5">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="pick(project.name)"
                class="h-full w-full rounded-lg object-cover"
              >
              <div v-else class="grid min-h-[240px] place-items-center text-brand-300 dark:text-white/20">
                <UiIcon name="factory" :size="56" :stroke-width="1.2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="section section-alt">
      <div class="container-page">
        <UiSectionHeading :heading="$t('projects.relatedTitle')" />
        <div class="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="item in related"
            :key="item.id"
            :project="item"
          />
        </div>
      </div>
    </section>

    <CtaBanner
      :heading="t('projects.ctaHeading')"
      :body="t('projects.ctaBody')"
      :button-label="t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>
