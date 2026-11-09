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
    class="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm dark:border-white/10 dark:bg-brand-900/50"
    novalidate
    @submit.prevent="submit"
  >
    <div class="border-b border-stone-100 bg-gradient-to-r from-brand-950/[0.03] to-transparent px-6 py-5 dark:border-white/10 dark:from-white/[0.03] sm:px-8">
      <div class="flex items-start gap-3">
        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-900 text-accent-400">
          <UiIcon name="mail" :size="18" />
        </span>
        <div>
          <span class="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400">
            {{ locale === 'en' ? 'Inquiry & Proposal' : 'Konsultasi & Penawaran' }}
          </span>
          <h2 class="mt-0.5 font-display text-xl font-extrabold text-brand-950 dark:text-white sm:text-2xl">
            {{ $t('contact.formTitle') }}
          </h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ locale === 'en' ? 'Share your project details and our team will respond promptly.' : 'Sampaikan detail kebutuhan Anda, tim kami akan segera merespons.' }}
          </p>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8">
      <div class="grid gap-5 sm:grid-cols-2">
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {{ $t('contact.name') }} <span class="text-accent-600">*</span>
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
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {{ $t('contact.email') }} <span class="text-accent-600">*</span>
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
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
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
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
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
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
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
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {{ $t('contact.message') }} <span class="text-accent-600">*</span>
          </span>
          <textarea
            v-model="form.message"
            rows="5"
            required
            class="field resize-y rounded-xl"
            :placeholder="$t('contact.messagePlaceholder')"
          />
        </label>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          <span class="text-accent-600">*</span> {{ locale === 'en' ? 'Required fields' : 'Wajib diisi' }}
        </p>
        <button
          type="submit"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 text-sm font-bold text-brand-950 shadow-sm transition hover:bg-accent-400 active:scale-[0.98] disabled:opacity-60"
          :disabled="state === 'sending'"
        >
          <UiIcon name="arrow-right" :size="16" />
          <span>{{ state === 'sending' ? $t('contact.sending') : $t('contact.submit') }}</span>
        </button>
      </div>

      <p
        v-if="feedback"
        class="mt-4 rounded-xl px-4 py-3 text-sm font-medium"
        :class="state === 'success' ? 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/40 dark:text-emerald-300' : 'border border-red-200 bg-red-50 text-red-800 dark:border-red-800/40 dark:bg-red-950/40 dark:text-red-300'"
        role="status"
      >
        {{ feedback }}
      </p>
    </div>
  </form>
</template>
