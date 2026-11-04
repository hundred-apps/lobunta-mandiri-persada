/**
 * Tipe bersama untuk form dan tabel admin.
 *
 * Setiap halaman fitur mendefinisikan kolom dan field-nya sendiri di file
 * halaman, lalu meneruskannya ke komponen bersama AdminResourceList dan
 * AdminResourceForm.
 */

import type { Localized } from '~/types/content'

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'html'
  | 'number'
  | 'toggle'
  | 'select'
  | 'icon'
  | 'image'
  | 'slug'
  | 'repeater'
  | 'pair'
  | 'date'
  | 'password'
  | 'tags'
  | 'gallery'
  | 'list'

export interface FieldOption {
  value: string
  /** Opsi bisa berupa teks tunggal atau label bilingual ({ id, en }). */
  label: string | Localized
}

/** Kolom satu baris pada field `list` (daftar dokumen/berkas). */
export interface ListRowField {
  name: string
  label: string
  kind: 'text' | 'bilingual' | 'select' | 'file'
  required?: boolean
  placeholder?: { id?: string; en?: string }
  options?: FieldOption[]
  /** Untuk kind `file`: atribut accept pada input berkas. */
  accept?: string
}

export interface FieldDef {
  name: string
  label: string
  kind: FieldKind
  /** Field dua bahasa: nilai disimpan sebagai { id, en }. */
  bilingual?: boolean
  required?: boolean
  help?: string
  placeholder?: { id?: string; en?: string }
  /** Untuk field select: sumber data dari endpoint lain. */
  optionsFrom?: { resource: string; labelKey: string; valueKey: string }
  /** Untuk field select: opsi statis inline. */
  options?: FieldOption[]
  rows?: number
  min?: number
  max?: number
  step?: number
  /** Untuk kind `image`/`file`: jenis berkas yang diterima. */
  accept?: string
  /** Untuk kind `list`: definisi kolom tiap baris. */
  listColumns?: ListRowField[]
  /** Untuk kind `list`: batas jumlah baris. */
  listMax?: number
}

export interface ColumnDef {
  key: string
  label: string
  kind?: 'text' | 'image' | 'toggle' | 'status' | 'number' | 'bilingual' | 'date'
  width?: string
}
