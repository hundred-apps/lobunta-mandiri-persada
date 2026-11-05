<script setup lang="ts">
import type { FieldDef } from '~/admin/types'
const { t } = useI18n()

definePageMeta({ layout: 'admin' })

const fields = computed<FieldDef[]>(() => [
  { name: 'name', label: t('admin.adminUsersName'), kind: 'text', required: true },
  { name: 'email', label: t('admin.adminUsersEmail'), kind: 'text', required: true },
  { name: 'phone', label: t('admin.adminUsersPhone'), kind: 'text', required: true, help: t('admin.adminUsersPhoneHelp') },
  { name: 'password', label: t('admin.adminUsersPassword'), kind: 'password', help: t('admin.adminUsersPasswordHelp') },
  { name: 'role', label: t('admin.adminUsersRole'), kind: 'select', options: [
    { value: 'superuser', label: 'Super User' },
    { value: 'admin', label: 'Admin' }
  ] }
])
</script>

<template>
  <AdminResourceForm
    resource="admin-users"
    :label="t('admin.adminUsersTitle')"
    :singular="t('admin.adminUsersTitle')"
    base-path="/admin/admin-users"
    :fields="fields"
  />
</template>