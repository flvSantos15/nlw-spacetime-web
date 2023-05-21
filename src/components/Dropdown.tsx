'use client'

import { Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Transition } from '@headlessui/react'
import { MoreVertical } from 'lucide-react'

interface DropdownProps {
  memoryId: string
}

export default function Dropdown({ memoryId }: DropdownProps) {
  const router = useRouter()

  async function handleRedirectToEditPage() {
    router.push(`/memories/edit/${memoryId}`)
  }

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 p-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <MoreVertical
              className="h-5 w-5 text-gray-200 hover:text-gray-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 px-2 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  onClick={handleRedirectToEditPage}
                  className="text-gray-100 group flex w-full items-center rounded-md px-2 py-2 text-sm"
                >
                  <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Edit
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        // stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  )
}
