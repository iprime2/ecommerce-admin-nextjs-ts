'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './CellAction'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
