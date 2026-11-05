<script setup lang="ts">
import type { FieldDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'name', label: t('admin.productsName'), kind: 'text', bilingual: true, required: true },
  { name: 'slug', label: t('admin.productsSlug'), kind: 'slug', required: true },
  { name: 'sku', label: t('admin.productCategoriesSku'), kind: 'text', required: true, help: t('admin.productsSkuHelp') },
  {
    name: 'categoryId',
    label: t('admin.productsCategory'),
    kind: 'select',
    required: true,
    optionsFrom: { resource: 'product-categories', labelKey: 'name', valueKey: 'id' }
  },
  { name: 'packaging', label: t('admin.productsPackaging'), kind: 'text', bilingual: true, required: true, placeholder: { id: 'Contoh: Drum 200L', en: 'e.g. Drum 200L' } },
  { name: 'weight', label: t('admin.productsWeight'), kind: 'text', bilingual: true, required: true, placeholder: { id: 'Contoh: 200 liter', en: 'e.g. 200 liters' } },
  { name: 'description', label: t('admin.productCategoriesDescription'), kind: 'textarea', bilingual: true, rows: 4, help: t('admin.productsDescriptionHelp') },
  { name: 'spec', label: t('admin.productsSpecs'), kind: 'pair', bilingual: true, help: t('admin.productsSpecsHelp') },
  { name: 'image', label: t('admin.productCategoriesImage'), kind: 'image' },
  { name: 'tdsFile', label: t('admin.productsTds'), kind: 'image', help: t('admin.productsTdsHelp') },
  { name: 'msdsFile', label: t('admin.productsMsds'), kind: 'image', help: t('admin.productsMsdsHelp') },
  { name: 'status', label: t('admin.productsStatus'), kind: 'toggle', help: t('admin.productsStatusHelp') }
])

async function saveSpecs(result: Record<string, unknown>, model: Record<string, unknown>) {
  const productId = Number(result.id)
  if (!productId) return
  const { list, remove, create } = useAdminApi()
  const existing = await list<Record<string, unknown>>('product-spec', { productId, limit: 200 })
  for (const row of existing.data) {
    await remove('product-spec', String(row.id ?? ''))
  }
  const specs = Array.isArray(model.spec) ? model.spec as Array<{ label: { id: string; en: string }; value: { id: string; en: string } }> : []
  for (const spec of specs) {
    if (!spec.label?.id && !spec.label?.en && !spec.value?.id && !spec.value?.en) continue
    await create('product-spec', {
      productId,
      labelId: spec.label?.id || '',
      labelEn: spec.label?.en || '',
      valueId: spec.value?.id || '',
      valueEn: spec.value?.en || ''
    })
  }
}
</script>

<template>
  <AdminResourceForm
    resource="products"
    :label="t('admin.productsTitle')"
    :singular="t('admin.productsSingular')"
    base-path="/admin/products"
    :fields="fields"
    prefill-field="categoryId"
    prefill-query="categoryId"
    :after-save="saveSpecs"
  />
</template>