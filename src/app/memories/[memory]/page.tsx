import Image from 'next/image'
import { cookies } from 'next/headers'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

import { api } from '@/lib/api'
import { EmptyMemories } from '@/components/EmptyMemories'
import Dropdown from '@/components/Dropdown'
import { BackButton } from '@/components/BackButton'

dayjs.locale(ptBr)

interface Memory {
  coverUrl: string
  content: string
  createdAt: string
  id: string
}

interface MemoryProps {
  params: {
    memory: string
  }
}

export default async function Memory({ params }: MemoryProps) {
  const isAutheticated = cookies().has('token')

  if (!isAutheticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const { data } = await api.get<Memory>(`/memories/${params.memory}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <div className="flex flex-col gap-10 p-8">
      <div key={data.id} className="space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <BackButton />
            <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(data.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
          </div>
          <Dropdown memoryId={data.id} />
        </div>
        <Image
          src={data.coverUrl}
          alt=""
          width={592}
          height={280}
          className="w-full aspect-video object-cover rounded-lg"
        />
        <p className="text-lg leading-relaxed text-gray-100">{data.content}</p>
      </div>
    </div>
  )
}
