<script setup lang="ts">
import type { ProjectItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: projects } = await useCms<ProjectItem[]>('projects', 'all')

useSeoMeta({
  title: () => `${t('projects.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('projects.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.projects')"
      :title="$t('projects.heading')"
      :intro="$t('projects.intro')"
    />

    <section class="section">
      <div class="container-page">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <UiSectionHeading :heading="$t('projects.title')" :body="$t('home.projectsBody')" />
          <NuxtLink :to="`/${locale}/units`" class="btn-outline">
            <UiIcon name="truck" :size="16" />
            {{ $t('projects.viewFleet') }}
          </NuxtLink>
        </div>

        <div v-if="projects.length" class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
          />
        </div>
        <p v-else class="prose-lkr mt-8">
          {{ $t('projects.empty') }}
        </p>
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
