'use client'

import { ChangeEvent, useState } from 'react'

interface MediaPickerProps {
  previewValue?: string
}

export function MediaPicker({ previewValue }: MediaPickerProps) {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        onChange={onFileSelected}
        className="invisible h-0 w-0"
      />

      {preview ||
        (previewValue && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview || previewValue}
            alt=""
            className="w-full aspect-video rounded-lg object-cover"
          />
        ))}
    </>
  )
}
