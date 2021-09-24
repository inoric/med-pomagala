import { Menu, Transition } from '@headlessui/react'
import { ComponentProps, Fragment, ReactElement } from 'react'
import { ArchiveIcon, ClipboardCheckIcon, ClipboardListIcon, CollectionIcon, LogoutIcon, MenuIcon, UsersIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface MenuLinkProps {
  href: string;
  title: string;
  Icon: (iconProps: ComponentProps<'svg'>) => ReactElement;
  linkClass?: {
    normal?: string;
    active?: string;
  };
  iconClass?: {
    normal?: string;
    active?: string;
  };
}

const MenuLink = ({ href, title, Icon, linkClass, iconClass }: MenuLinkProps) => {
  const router = useRouter();

  const active = router.pathname === href;
  const iconColor = active
    ? (iconClass?.active ?? 'text-white-500')
    : (iconClass?.normal ?? 'text-gray-500');
  const linkColor = active
    ? (linkClass?.active ?? 'bg-blue-500 text-white')
    : (linkClass?.normal ?? 'text-gray-900 hover:bg-gray-100');

  return (
    <Menu.Item>
      <Link href={href} passHref>
        <a className={`group flex rounded-md items-center w-full px-2 py-2 md:text-sm ${linkColor}`}>
          <Icon className={`w-5 h-5 mr-2 ${iconColor}`} aria-hidden="true" />
          {title}
        </a>
      </Link>
    </Menu.Item>
  )
}

export default function MainMenu() {
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
          <Menu.Items className="absolute right-0 w-60 md:w-52 z-20 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <MenuLink
                href="/"
                title="Inventar"
                Icon={CollectionIcon}
                iconClass={{ normal: 'text-green-500' }}
              />
              <MenuLink href="/zaduzenje" title="Zaduženje" Icon={ClipboardListIcon} />
              <MenuLink href="/razduzenje" title="Razduženje" Icon={ClipboardCheckIcon} />
              <MenuLink href="/users" title="Korisnici" Icon={UsersIcon} />
              <MenuLink href="/arhiva" title="Arhiva" Icon={ArchiveIcon} />
              <MenuLink
                href="/login"
                title="Logout"
                Icon={LogoutIcon}
                linkClass={{ normal: 'text-red-500 hover:bg-red-100' }}
                iconClass={{ normal: 'text-red-500' }}
              />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
