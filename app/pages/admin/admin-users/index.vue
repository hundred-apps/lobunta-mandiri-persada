<script setup lang="ts">
import type { ColumnDef } from '~/admin/types'
import { useAdminAuth } from '~/composables/useAdminAuth'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const { locale, t } = useI18n()
const { profile } = useAdminAuth()
const isSuperUser = computed(() => profile.value?.role === 'superuser')

onMounted(() => {
  if (!isSuperUser.value && profile.value) {
    router.replace(`/${locale.value}/admin/admin-users/${profile.value.id}`)
  }
})

const columns = computed<ColumnDef[]>(() => [
  { key: 'name', label: t('admin.adminUsersName') },
  { key: 'email', label: t('admin.adminUsersEmail') },
  { key: 'phone', label: t('admin.adminUsersPhone'), width: 'w-40' },
  { key: 'role', label: t('admin.adminUsersRole'), kind: 'status', width: 'w-32' }
])
</script>

<template>
  <AdminResourceList
    resource="admin-users"
    :label="t('admin.adminUsersTitle')"
    :singular="t('admin.adminUsersTitle')"
    :help="t('admin.adminUsersHelp')"
    base-path="/admin/admin-users"
    :columns="columns"
    :read-only="!isSuperUser"
  />
</template>