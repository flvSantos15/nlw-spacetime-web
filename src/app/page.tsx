import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'

import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'

dayjs.locale(ptBr)

interface Memory {
  coverUrl: string
  excerpt: string
  createdAt: string
  id: string
}

export default async function Home() {
  const isAutheticated = cookies().has('token')

  if (!isAutheticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const { data } = await api.get<Memory[]>('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (data.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {data.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image
              src={memory.coverUrl}
              alt=""
              width={592}
              height={280}
              className="w-full aspect-video object-cover rounded-lg"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
