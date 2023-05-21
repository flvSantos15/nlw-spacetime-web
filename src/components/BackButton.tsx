'use client'

import { useRouter } from 'next/navigation'

import { ArrowLeft } from 'lucide-react'

export function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="flex justify-center rounded-full bg-gray-400 bg-opacity-20 p-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>
  )
}
