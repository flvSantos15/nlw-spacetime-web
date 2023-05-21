import Link from 'next/link'
import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { ChevronLeft } from 'lucide-react'

import { NewMemoryForm } from '@/components/NewMemoryForm'

interface Memory {
  coverUrl: string
  content: string
  createdAt: string
  isPublic: boolean
  id: string
}

interface MemoryProps {
  params: {
    memory: string
  }
}

export default async function EditMemory({ params }: MemoryProps) {
  const isAutheticated = cookies().has('token')

  const token = cookies().get('token')?.value

  const { data } = await api.get<Memory>(`/memories/${params.memory}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center text-sm text-gray-200 hover:text-gray-1 w-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à timeline
      </Link>

      <NewMemoryForm
        memoryContent={data.content}
        memoryCoverUrl={data.coverUrl}
        memoryId={data.id}
        memoryIsPublic={data.isPublic}
      />
    </div>
  )
}
