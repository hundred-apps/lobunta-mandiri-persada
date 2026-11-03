<script setup lang="ts">
import type { UnitItem } from '~/types/content'

const { t } = useI18n()

const { data: units } = await useCms<UnitItem[]>('units', 'all')

const availableCount = computed(() => units.value.filter((unit) => unit.status === 'available').length)

useSeoMeta({
  title: () => `${t('units.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('units.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('units.eyebrow')"
      :title="$t('units.heading')"
      :intro="$t('units.intro')"
    />

    <section class="section">
      <div class="container-page">
        <UiSectionHeading :heading="$t('units.title')" :body="$t('units.homeIntro')" />
        <p v-if="units.length" class="mt-4 text-sm text-ink-mute">
          {{ $t('units.summary', { total: units.length, available: availableCount }) }}
        </p>

        <div v-if="units.length" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <UnitCard
            v-for="unit in units"
            :key="unit.id"
            :unit="unit"
          />
        </div>
        <p v-else class="prose-lkr mt-8">
          {{ $t('units.empty') }}
        </p>
      </div>
    </section>

    <CtaBanner
      :heading="t('units.ctaHeading')"
      :body="t('units.ctaBody')"
      :button-label="t('nav.contact')"
      button-to="/contact"
      :secondary-label="t('projects.backToProjects')"
      secondary-to="/projects"
    />
  </div>
</template>
