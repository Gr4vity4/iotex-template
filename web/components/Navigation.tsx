import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
// import { showMenuState } from 'states'

export default function Sidebar() {
  const router = useRouter()
  const { t } = useTranslation()

  const menuItems = [
    {
      path: '/aaa',
      text: t('Create'),
    },
    {
      path: '/aaa',
      text: t('Styles'),
    },
    {
      path: '/aaa',
      text: t('Gallery'),
    },
    {
      path: '/aaa',
      text: t('Editorial'),
    },
  ]

  // const [showMenu, setShowMenu] = useRecoilState(showMenuState)

  const isMenuActived = (path: string) => {
    return path === router.asPath
  }

  const closeMenu = () => true
  const showMenu = false

  return (
    <nav>
      <div
        id="nav-section"
        className={`${
          !showMenu ? 'hidden' : ''
        } md:block fixed md:sticky top-0 md:top-4 left-0 w-screen md:w-auto h-screen md:h-auto p-4 md:p-0 z-50 bg-dark-400 md:bg-transparent`}
      >
        <div className="grid mt-2 justify-items-end">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md md:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900"
            onClick={closeMenu}
          >
            <span className="sr-only">Close main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul id="ul-sidebar-nav" className="pt-2 pl-6 list-none md:space-x-8 lg:space-x-12 md:flex md:pt-0">
          {menuItems.map((menuItem) => (
            <li key={menuItem.text} className="py-4 text-2xl font-bold md:py-0 md:text-base md:font-normal">
              {/* <Link href={menuItem.path}> </Link> */}
                <a className={`${isMenuActived(menuItem.path) ? '' : 'text-black-500'} hover:`} onClick={closeMenu}>
                  {menuItem.text}
                </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
