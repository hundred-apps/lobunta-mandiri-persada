<script setup lang="ts">
import type { CustomerItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: apiCustomers } = useCms<CustomerItem[]>('customers', 'all')
const customers = useStaticCustomers(apiCustomers)

useSeoMeta({
  title: () => `${t('customers.title')} | PT Lobunta Mandiri Persada`,
  description: () => t('customers.intro')
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.customers')"
          :heading="$t('customers.heading')"
          :body="$t('customers.intro')"
        />
        <div class="mt-8">
          <CustomerGrid v-if="customers.length" :items="customers" />
          <p v-else class="prose-lkr">{{ $t('common.comingSoon') }}</p>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <UiSectionHeading
          :heading="$t('home.divisionsTitle')"
          :body="$t('home.divisionsBody')"
        />
        <div class="mt-8">
          <NuxtLink :to="`/${locale}/products`" class="btn-primary">
            {{ $t('nav.products') }}
            <UiIcon name="arrow-right" :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
