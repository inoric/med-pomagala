import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {  DotsVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'


interface Props {
    id: number,
    increment: (arg: string, arg2: number) => void,
}


export default function ThreeDotUsersDropdown({id, increment}: Props) {

  return (
    <div className="w-16 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex z-10 justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
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
          <Menu.Items className="absolute right-0 w-36 z-20 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
            <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => increment("uredi", id)}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <PencilIcon
                        className="w-5 h-5 mr-2 text-white-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <PencilIcon
                        className="w-5 h-5 mr-2 text-blue-500"
                        aria-hidden="true"
                      />
                    )}
                    Uredi
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => increment("izbrisi", id)}
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <TrashIcon
                        className="w-5 h-5 mr-2 text-white-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <TrashIcon
                        className="w-5 h-5 mr-2 text-red-500"
                        aria-hidden="true"
                      />
                    )}
                    Izbriši
                  </button>
                )}
              </Menu.Item>
              
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
