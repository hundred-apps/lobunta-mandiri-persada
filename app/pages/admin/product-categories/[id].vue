<script setup lang="ts">
import type { ColumnDef, FieldDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'name', label: t('admin.productCategoriesName'), kind: 'text', bilingual: true, required: true },
  { name: 'slug', label: t('admin.productCategoriesSlug'), kind: 'slug', required: true },
  { name: 'description', label: t('admin.productCategoriesDescription'), kind: 'textarea', bilingual: true, required: true, rows: 4 },
  { name: 'image', label: t('admin.productCategoriesImage'), kind: 'image' }
])

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const { list, remove, lastError } = useAdminApi()

const categoryId = computed(() => String(route.params.id || ''))
const isNew = computed(() => categoryId.value === 'new')

const productColumns = computed<ColumnDef[]>(() => [
  { key: 'image', label: t('admin.productCategoriesImage'), kind: 'image', width: 'w-16' },
  { key: 'name', label: t('admin.productsSingular'), kind: 'bilingual' },
  { key: 'sku', label: t('admin.productCategoriesSku'), width: 'w-32' },
  { key: 'status', label: t('admin.productCategoriesStatus'), kind: 'toggle', width: 'w-24' }
])

const rows = ref<Array<Record<string, unknown>>>([])
const loading = ref(false)
const keyword = ref('')
const pendingDelete = ref<Record<string, unknown> | null>(null)
const deleting = ref(false)

async function loadProducts() {
  loading.value = true
  const result = await list<Record<string, unknown>>('products', {
    categoryId: Number(categoryId.value),
    q: keyword.value || undefined,
    limit: 50
  })
  rows.value = result.data
  loading.value = false
}

async function requestDelete(row: Record<string, unknown>) {
  pendingDelete.value = row
}

async function confirmDelete() {
  if (!pendingDelete.value) return
  deleting.value = true
  const done = await remove('products', String(pendingDelete.value.id ?? ''))
  deleting.value = false
  pendingDelete.value = null
  if (done) await loadProducts()
}

onMounted(() => {
  if (!isNew.value) loadProducts()
})

watch(categoryId, () => {
  if (!isNew.value) loadProducts()
})
</script>

<template>
  <AdminResourceForm
    resource="product-categories"
    :label="t('admin.productCategoriesTitle')"
    :singular="t('admin.productCategoriesSingular')"
    :help="t('admin.productCategoriesBody')"
    base-path="/admin/product-categories"
    :fields="fields"
    cascade-resource="products"
    cascade-param="categoryId"
  >
    <template #after="{ isNew: creating }">
      <section v-if="!creating" class="card space-y-4 p-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg">
              {{ $t('admin.productCategoriesInCategory') }}
            </h2>
            <p class="text-xs text-slate-500">
              {{ rows.length }} {{ $t('admin.productsTitle').toLowerCase() }}
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <input
              v-model="keyword"
              type="search"
              class="field !w-56"
              :placeholder="t('admin.productCategoriesSearch')"
              @keyup.enter="loadProducts"
            >
            <NuxtLink :to="`/${locale}/admin/products/new?categoryId=${categoryId}`" class="btn-primary !py-2">
              {{ $t('admin.productCategoriesAddProduct') }}
            </NuxtLink>
          </div>
        </div>

        <AdminDataTable
          :columns="productColumns"
          :rows="rows"
          :loading="loading"
          :error="lastError"
          @edit="(id) => router.push(`/${locale}/admin/products/${id}`)"
          @remove="requestDelete"
        />
      </section>
    </template>
  </AdminResourceForm>

  <Teleport to="body">
    <div v-if="pendingDelete" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-brand-950">
        <h2 class="text-lg">
          {{ $t('admin.productCategoriesDeleteTitle') }}
        </h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {{ $t('admin.productCategoriesDeleteBody') }}
        </p>
        <div class="mt-6 flex justify-end gap-2">
          <button type="button" class="btn-outline" :disabled="deleting" @click="pendingDelete = null">
            {{ $t('admin.cancel') }}
          </button>
          <button type="button" class="btn-accent" :disabled="deleting" @click="confirmDelete">
            {{ deleting ? $t('admin.deleting') : $t('admin.confirmDeleteVerb') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>