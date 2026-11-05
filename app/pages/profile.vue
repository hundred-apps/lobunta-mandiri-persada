<script setup lang="ts">
import { useScopeOfWork } from "~/composables/useScopeOfWork";

const { locale, t } = useI18n();
const milestones = useMilestones();
const { divisions: legalDivisions } = useLegalDocuments();
const { statements: companyStatements } = useVisionMission();
const { paragraphs: historyParagraphs, highlights: historyHighlights } =
  useCompanyHistory();
const { divisions: scopeDivisions } = useScopeOfWork();

/** Label dokumen legal sesuai bahasa aktif. */
function legalLabel(doc: { labelId: string; labelEn: string }): string {
  return locale.value === "en" ? doc.labelEn : doc.labelId;
}

const { data: settings } = await useCompany();

const heroImage = computed(
  () => settings.value?.profile || "/img/profile-hero.svg"
);
const gallery = computed(() => settings.value?.gallery ?? []);

/** Urutan dan label grup dokumen company profile per divisi. */
const docGroups = ["mining", "civil", "general"] as const;

const docTypeKeys: Record<string, string> = {
  mining: "projects.docMining",
  civil: "projects.docCivil",
  general: "projects.docGeneral",
};

function docLabel(type: string): string {
  return t(docTypeKeys[type] || docTypeKeys.general!);
}

/**
 * Dokumen dikelompokkan per divisi supaya profil pertambangan dan
 * konstruksi teknik tidak tercampur. Tipe tak dikenal masuk grup Umum.
 */
const documentGroups = computed(() => {
  const all = settings.value?.companyProfiles ?? [];
  return docGroups
    .map((type) => ({
      type,
      label: docLabel(type),
      documents: all.filter((doc) =>
        (docGroups as readonly string[]).includes(doc.type)
          ? doc.type === type
          : type === "general"
      ),
    }))
    .filter((group) => group.documents.length > 0);
});

const documentCount = computed(() =>
  documentGroups.value.reduce((sum, group) => sum + group.documents.length, 0)
);
const whatsappLink = computed(() => {
  const number = (settings.value?.whatsapp || "").replace(/[^0-9]/g, "");
  if (!number) return "#";
  return `https://wa.me/${number}?text=${encodeURIComponent(
    "Halo, saya ingin menerima company profile dalam format PDF."
  )}`;
});

const stats = computed(() => [
  { label: t("profile.founded"), value: settings.value?.foundedYear || "—" },
  {
    label: t("profile.bidangUsaha"),
    value: String(scopeDivisions.reduce((total, division) => total + division.services.length, 0)),
  },
  { label: t("profile.dokumentasi"), value: String(gallery.value.length) },
]);

useSeoMeta({
  title: () => `${t("nav.profile")} | ${pick(settings.value?.companyName)}`,
  description: () =>
    pick(settings.value?.description) || t("meta.homeDescription"),
});
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.profile')"
      :title="pick(settings.companyName)"
      :intro="pick(settings.tagline)"
      :image="heroImage"
    />

    <section class="section">
      <div
        class="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start"
      >
        <div>
          <UiSectionHeading
            :eyebrow="$t('nav.profile')"
            :heading="$t('profile.aboutTitle')"
          />
          <div class="prose-lkr mt-6 space-y-4 text-base sm:text-lg">
            <p v-for="(paragraph, index) in historyParagraphs" :key="index">
              {{ locale === "en" ? paragraph.en : paragraph.id }}
            </p>
          </div>

          <div class="not-prose mt-6 grid gap-4 sm:grid-cols-2">
            <div
              v-for="highlight in historyHighlights"
              :key="highlight.key"
              class="rounded-xl border-l-4 border-brand-500 bg-brand-50 p-4 dark:bg-white/5"
            >
              <p
                class="text-sm font-semibold text-brand-800 dark:text-brand-200"
              >
                {{ locale === "en" ? highlight.titleEn : highlight.titleId }}
              </p>
              <p class="mt-1 text-sm text-ink-soft dark:text-slate-400">
                {{ locale === "en" ? highlight.bodyEn : highlight.bodyId }}
              </p>
            </div>
          </div>

          <dl class="not-prose mt-8 grid gap-4 sm:grid-cols-2">
            <div v-if="settings" class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("profile.legalName") }}
              </dt>
              <dd class="mt-1 text-sm font-medium">{{ settings.legalName }}</dd>
            </div>
            <div v-if="settings" class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("profile.founded") }}
              </dt>
              <dd class="mt-1 text-sm font-medium">
                {{ settings.foundedYear }}
              </dd>
            </div>
            <div v-if="settings" class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("common.address") }}
              </dt>
              <dd class="mt-1 text-sm">{{ pick(settings.address) }}</dd>
            </div>
            <div v-if="settings" class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("common.email") }}
              </dt>
              <dd class="mt-1 text-sm">{{ settings.email }}</dd>
            </div>
            <div v-if="settings" class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("common.whatsapp") }}
              </dt>
              <dd class="mt-1 text-sm">{{ settings.whatsapp }}</dd>
            </div>
            <div v-if="settings" class="card p-5">
              <dt class="text-xs uppercase tracking-wider text-ink-mute">
                {{ $t("common.openHours") }}
              </dt>
              <dd class="mt-1 text-sm">{{ pick(settings.officeHours) }}</dd>
            </div>
          </dl>
        </div>

        <aside v-if="scopeDivisions.length" class="card p-6">
          <h2 class="text-lg">{{ $t("profile.businessLines") }}</h2>
          <ul class="mt-5 space-y-4">
            <li
              v-for="division in scopeDivisions"
              :key="division.key"
              class="flex items-start gap-3"
            >
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon
                  :name="division.key === 'mining' ? 'layers' : 'building'"
                  :size="20"
                />
              </span>
              <div>
                <p class="text-sm font-semibold text-brand-900 dark:text-white">
                  {{ locale === "en" ? division.titleEn : division.titleId }}
                </p>
                <p class="prose-lkr mt-0.5 text-xs">
                  {{
                    locale === "en"
                      ? division.descriptionEn
                      : division.descriptionId
                  }}
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
          :heading="$t('profile.legalityTitle')"
          :body="$t('profile.legalityBody')"
        />

        <div class="mt-10 grid gap-6 lg:grid-cols-2">
          <article
            v-for="division in legalDivisions"
            :key="division.key"
            class="card flex flex-col p-6"
          >
            <p class="eyebrow">
              {{ $t("profile.legalityDivision") }}
            </p>
            <h3 class="mt-2 text-xl">
              {{ locale === "en" ? division.titleEn : division.titleId }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{
                locale === "en"
                  ? division.descriptionEn
                  : division.descriptionId
              }}
            </p>

            <dl class="mt-5 grid gap-3 sm:grid-cols-2">
              <div
                v-for="doc in division.documents"
                :key="doc.labelId"
                class="rounded-xl border border-slate-200 p-4 dark:border-white/10"
              >
                <dt class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ legalLabel(doc) }}
                </dt>
                <dd class="mt-1 break-words font-mono text-sm font-medium">
                  {{ doc.value }}
                </dd>
                <dd
                  v-if="doc.noteId"
                  class="mt-1 text-xs text-ink-soft dark:text-slate-400"
                >
                  {{ locale === "en" ? doc.noteEn : doc.noteId }}
                </dd>
              </div>
            </dl>

            <div class="mt-5">
              <h4
                class="text-xs font-semibold uppercase tracking-wider text-ink-mute"
              >
                {{ $t("profile.kbliTitle") }}
              </h4>
              <ul class="mt-3 space-y-2">
                <li
                  v-for="licence in division.licences"
                  :key="licence.code"
                  class="flex items-start gap-3"
                >
                  <span class="chip shrink-0 font-mono">{{
                    licence.code
                  }}</span>
                  <span class="text-sm text-ink-soft dark:text-slate-400">
                    {{ locale === "en" ? licence.titleEn : licence.titleId }}
                  </span>
                </li>
              </ul>
            </div>
          </article>
        </div>
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
          <div
            v-for="statement in companyStatements"
            :key="statement.key"
            class="card flex flex-col p-6"
          >
            <span
              class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
            >
              <UiIcon :name="statement.icon" :size="22" />
            </span>
            <h3 class="mt-5 text-base">
              {{ locale === "en" ? statement.titleEn : statement.titleId }}
            </h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ locale === "en" ? statement.bodyEn : statement.bodyId }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :heading="$t('profile.scopeTitle')"
          :body="$t('profile.scopeBody')"
        />
        <div
          v-for="division in scopeDivisions"
          :key="division.key"
          class="mt-10"
        >
          <h3 class="text-2xl font-bold mb-6">
            {{ locale === "en" ? division.titleEn : division.titleId }}
          </h3>
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="service in division.services"
              :key="service.code"
              class="card p-4 hover:shadow-lg transition-shadow"
            >
              <span class="chip font-mono">{{ service.code }}</span>
              <h4 class="mt-3 font-semibold text-sm">
                {{ locale === "en" ? service.titleEn : service.titleId }}
              </h4>
              <p class="mt-2 text-xs text-ink-soft dark:text-slate-400">
                {{
                  locale === "en"
                    ? service.descriptionEn
                    : service.descriptionId
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="milestones.length" class="section section-alt">
      <div
        class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
      >
        <UiSectionHeading
          :eyebrow="$t('nav.profile')"
          :heading="$t('home.aboutHeading')"
          :body="$t('home.aboutBody')"
        />
        <MilestoneTimeline :items="milestones" />
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
            <div v-if="settings" class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="map-pin" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.address") }}
                </p>
                <p class="mt-1 text-sm">{{ pick(settings.address) }}</p>
              </div>
            </div>
            <div v-if="settings" class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="phone" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.callUs") }}
                </p>
                <p class="mt-1 space-y-1">
                  <a
                    v-for="phone in settings.phone"
                    :key="phone"
                    :href="`tel:+62${phone.replace(/^0/, '')}`"
                    class="block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                    >{{ phone }}</a
                  >
                </p>
              </div>
            </div>
            <div v-if="settings" class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="mail" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.email") }}
                </p>
                <a
                  :href="`mailto:${settings.email}`"
                  class="mt-1 block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                  >{{ settings.email }}</a
                >
              </div>
            </div>
            <div v-if="settings" class="card flex gap-4 p-5">
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon name="clock" :size="20" />
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-ink-mute">
                  {{ $t("common.openHours") }}
                </p>
                <p class="mt-1 text-sm">{{ pick(settings.officeHours) }}</p>
              </div>
            </div>
          </div>
          <div class="card flex flex-col p-6">
            <span
              class="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
            >
              <UiIcon name="document" :size="22" />
            </span>
            <h3 class="mt-5 text-lg">{{ $t("common.downloadProfile") }}</h3>
            <p class="prose-lkr mt-2 text-sm">
              {{ $t("profile.downloadBody") }}
            </p>

            <div v-if="documentGroups.length" class="mt-6 space-y-5">
              <div v-for="group in documentGroups" :key="group.type">
                <h4
                  class="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300"
                >
                  {{ group.label }}
                </h4>
                <ul class="mt-2 space-y-2">
                  <li v-for="doc in group.documents" :key="doc.mediaId">
                    <a
                      :href="doc.file"
                      target="_blank"
                      rel="noopener"
                      class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm transition hover:border-brand-300 hover:bg-brand-50 dark:border-white/10 dark:hover:bg-white/5"
                    >
                      <span class="min-w-0">
                        <span
                          class="block truncate font-medium text-brand-800 dark:text-brand-200"
                        >
                          {{ pick(doc.title) || group.label }}
                        </span>
                        <span class="block text-xs text-ink-mute">PDF</span>
                      </span>
                      <UiIcon
                        name="download"
                        :size="16"
                        class="shrink-0 text-brand-600 dark:text-brand-300"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <a
              v-if="!documentCount"
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

    <CtaBanner
      :heading="t('services.contactCta')"
      :body="t('contact.intro')"
      :button-label="t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>
