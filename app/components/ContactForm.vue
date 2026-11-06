<script setup lang="ts">
const { t, locale } = useI18n()
const { data: company } = useStaticCompany()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: ''
})

const state = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const feedback = ref('')

const errors = computed(() => {
  const list: string[] = []
  if (!form.name.trim()) list.push(t('contact.name'))
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) list.push(t('contact.email'))
  if (!form.message.trim()) list.push(t('contact.message'))
  return list
})

async function submit() {
  feedback.value = ''
  if (errors.value.length > 0) {
    state.value = 'error'
    feedback.value = t('contact.validation')
    return
  }

  state.value = 'sending'
  try {
    const { post } = useContentSource()
    await post('/contact', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      subject: form.subject,
      message: form.message,
      locale: locale.value
    })
    state.value = 'success'
    feedback.value = t('contact.success')
    form.name = ''
    form.email = ''
    form.phone = ''
    form.company = ''
    form.subject = ''
    form.message = ''
  } catch {
    state.value = 'error'
    feedback.value = t('contact.error')
    openWhatsappFallback()
  }
}

function openWhatsappFallback() {
  const number = String(company.value?.whatsapp || '').replace(/[^0-9]/g, '')
  if (!number) return
  const lines = [
    `${t('contact.formTitle')} - ${form.name}`,
    `${t('contact.email')}: ${form.email}`,
    form.phone ? `${t('contact.phone')}: ${form.phone}` : '',
    form.company ? `${t('contact.company')}: ${form.company}` : '',
    form.subject ? `${t('contact.subject')}: ${form.subject}` : '',
    '',
    form.message
  ].filter(Boolean)
  const url = whatsappLink(number, lines.join('\n'))
  if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener')
  feedback.value = t('contact.errorWhatsapp')
}
</script>

<template>
  <form
    class="rounded-2xl border border-stone-200/90 bg-[#fcfbfa] p-6 sm:p-8 shadow-card dark:border-white/10 dark:bg-brand-900/50"
    novalidate
    @submit.prevent="submit"
  >
    <div class="border-b border-stone-200/80 pb-5 dark:border-white/10">
      <div class="inline-flex items-center gap-2 mb-1.5">
        <span class="inline-block h-2 w-2 rounded-full bg-accent-500" />
        <span class="text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">
          {{ locale === 'en' ? 'INQUIRY & PROPOSAL' : 'KONSULTASI & PENAWARAN' }}
        </span>
      </div>
      <h2 class="font-display text-xl sm:text-2xl font-extrabold text-brand-950 dark:text-white">
        {{ $t('contact.formTitle') }}
      </h2>
      <p class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        {{ locale === 'en' ? 'Fill out the form below and our team will get in touch promptly.' : 'Lengkapi formulir di bawah ini dan tim kami akan segera menghubungi Anda.' }}
      </p>
    </div>

    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {{ $t('contact.name') }} <span class="text-red-500">*</span>
        </span>
        <input
          v-model="form.name"
          type="text"
          required
          class="field rounded-xl"
          :placeholder="$t('contact.namePlaceholder')"
        >
      </label>

      <label class="block">
        <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {{ $t('contact.email') }} <span class="text-red-500">*</span>
        </span>
        <input
          v-model="form.email"
          type="email"
          required
          class="field rounded-xl"
          :placeholder="$t('contact.emailPlaceholder')"
        >
      </label>

      <label class="block">
        <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {{ $t('contact.phone') }}
        </span>
        <input
          v-model="form.phone"
          type="tel"
          class="field rounded-xl"
          :placeholder="$t('contact.phonePlaceholder')"
        >
      </label>

      <label class="block">
        <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {{ $t('contact.company') }}
        </span>
        <input
          v-model="form.company"
          type="text"
          class="field rounded-xl"
          :placeholder="$t('contact.companyPlaceholder')"
        >
      </label>

      <label class="block sm:col-span-2">
        <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {{ $t('contact.subject') }}
        </span>
        <input
          v-model="form.subject"
          type="text"
          class="field rounded-xl"
          :placeholder="$t('contact.subjectPlaceholder')"
        >
      </label>

      <label class="block sm:col-span-2">
        <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {{ $t('contact.message') }} <span class="text-red-500">*</span>
        </span>
        <textarea
          v-model="form.message"
          rows="4"
          required
          class="field resize-y rounded-xl"
          :placeholder="$t('contact.messagePlaceholder')"
        />
      </label>
    </div>

    <div class="mt-6 flex flex-wrap items-center gap-3">
      <button
        type="submit"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3.5 text-sm font-bold text-brand-950 shadow-md transition hover:bg-accent-400 active:scale-[0.98] w-full sm:w-auto"
        :disabled="state === 'sending'"
      >
        <UiIcon name="check" :size="16" />
        <span>{{ state === 'sending' ? $t('contact.sending') : $t('contact.submit') }}</span>
      </button>
    </div>

    <p
      v-if="feedback"
      class="mt-4 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium"
      :class="state === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40' : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/40'"
      role="status"
    >
      {{ feedback }}
    </p>
  </form>
</template>
