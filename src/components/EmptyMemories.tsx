import React from 'react'

export function EmptyMemories() {
  return (
    <div className="flex flex-1 p-16 items-center justify-center">
      <p className="text-center leading-relaxed w-[368px]">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <a href="" className="underline hover:text-gray-50">
          criar agora
        </a>
        !
      </p>
    </div>
  )
}
