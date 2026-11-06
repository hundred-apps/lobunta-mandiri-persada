<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  intro?: string
  image?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden border-b border-brand-800 bg-brand-900 text-white">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-800/40 via-transparent to-transparent pointer-events-none" />
    <div class="container-page relative grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <div v-if="eyebrow" class="flex items-center gap-2.5 mb-3">
          <span class="inline-block h-[3px] w-6 rounded-full bg-accent-500" />
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-accent-300">
            {{ eyebrow }}
          </p>
        </div>
        <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
          {{ title }}
        </h1>
        <p v-if="intro" class="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200/90">
          {{ intro }}
        </p>
        <slot />
      </div>
      <div v-if="image" class="hidden lg:block">
        <img :src="image" :alt="title" class="w-full rounded-2xl border border-white/10 shadow-lg object-cover" loading="lazy">
      </div>
    </div>
  </section>
</template>
