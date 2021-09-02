import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ArchiveIcon, ClipboardCheckIcon, ClipboardListIcon, CollectionIcon,  MenuIcon, UsersIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'


interface Props {
    currentPage: string
}


export default function MainMenu({currentPage}: Props) {

  return (
    <div className="w-10 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex z-10 justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <MenuIcon className="w-5 h-5 text-gray-500" />
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
          <Menu.Items className="absolute right-0 w-52 z-20 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
            <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/"
                    className={`${
                      currentPage==="inventory" ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {currentPage==="inventory" ? (
                      <CollectionIcon
                        className="w-5 h-5 mr-2 text-white-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <CollectionIcon
                        className="w-5 h-5 mr-2 text-green-500"
                        aria-hidden="true"
                      />
                    )}
                    Inventar
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/zaduzenje"
                    className={`${
                      currentPage==="zaduzenje" ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {currentPage==="zaduzenje" ? (
                      <ClipboardListIcon
                        className="w-5 h-5 mr-2 text-white-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ClipboardListIcon
                        className="w-5 h-5 mr-2 text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                    Zaduženje
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/razduzenje"
                    className={`${
                      currentPage==="razduzenje" ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {currentPage==="razduzenje" ? (
                      <ClipboardCheckIcon
                        className="w-5 h-5 mr-2 text-white-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ClipboardCheckIcon
                        className="w-5 h-5 mr-2 text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                    Razduženje
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/users"
                    className={`${
                      currentPage==="users" ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {currentPage==="users" ? (
                      <UsersIcon
                        className="w-5 h-5 mr-2 text-white-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <UsersIcon
                        className="w-5 h-5 mr-2 text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                    Korisnici
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/arhiva"
                    className={`${
                      currentPage==="archive" ? 'bg-blue-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    {currentPage==="archive" ? (
                      <ArchiveIcon
                        className="w-5 h-5 mr-2 text-white-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArchiveIcon
                        className="w-5 h-5 mr-2 text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                    Arhiva
                  </Link>
                )}
              </Menu.Item>
              
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
