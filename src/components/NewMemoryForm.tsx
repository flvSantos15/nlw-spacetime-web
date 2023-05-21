'use client'

import { FormEvent, useState } from 'react'
import { Camera } from 'lucide-react'
import Cookie from 'js-cookie'

import { api } from '@/lib/api'
import { MediaPicker } from '@/components/MediaPicker'
import { useRouter } from 'next/navigation'
import { DatePickerComponent } from './DatePicker'
import dayjs from 'dayjs'

interface NewMemoryFormProps {
  memoryId?: string
  memoryContent?: string
  memoryCoverUrl?: string
  memoryIsPublic?: boolean
}

export function NewMemoryForm({
  memoryContent,
  memoryCoverUrl,
  memoryId,
  memoryIsPublic
}: NewMemoryFormProps) {
  const router = useRouter()
  const [memoryDate, setMemoryDate] = useState(new Date())

  async function handleEditMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadResponse.data.fileUrl
    }

    if (memoryCoverUrl && !fileToUpload) {
      coverUrl = memoryCoverUrl
    }

    const token = Cookie.get('token')

    await api.put(
      `/memories/${memoryId}`,
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic')
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    router.push('/')
  }

  // validar a data e mandar para o back
  // console.log(dayjs('Mon May 15 2023 21:32:09').format(''))

  return (
    <form onSubmit={handleEditMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-2 hover: text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            defaultChecked={memoryIsPublic}
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>

        <DatePickerComponent dateValue={memoryDate} onSetDate={setMemoryDate} />
      </div>

      <MediaPicker previewValue={memoryCoverUrl} />

      <textarea
        name="content"
        spellCheck={false}
        defaultValue={memoryContent}
        // onChange={(e) => setNewContent(e.currentTarget.value)}
        className="flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600 self-end"
      >
        salvar
      </button>
    </form>
  )
}
