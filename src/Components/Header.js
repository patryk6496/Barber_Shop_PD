import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import '../App.css'
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Nasze Produkty', href: '#' },
  { name: 'Nasze Usługi', href: '#' },
  { name: 'Nasze Ceny', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="container-header">
      <header className="absolute inset-x-0 top-0 z-50 ">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only hover:text-orange-500">Barber Shop </span>
            </a>
			<a href="#"><span className="text-white hover:text-orange-500">Barber Shop</span></a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Otwórz główne menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white hover:text-orange-500">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
		  <Link to="/rezerwacja" className="text-sm font-semibold leading-6 text-white hover:text-orange-500">
  Umów się na wizyte <span aria-hidden="true">&rarr;</span>
</Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Barber Shop</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
				<Link to="/rezerwacja" className="text-sm font-semibold leading-6 text-white hover:text-orange-500">
  Umów się na wizyte <span aria-hidden="true">&rarr;</span>
</Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white">
              Od 1989{' '}
            </div>
          </div>
          <div className="text-center">
		  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
      <span className="text-white">
        SALON DLA {" "}
      </span>
      <span className="text-transparent bg-orange-500 bg-clip-text inline-block">
        MĘŻCZYZN
      </span>
    </h1>
            <p className="mt-6 text-lg leading-8 text-white">
				Masz ochotę przyciąć brodę, odświeżyć fryzurę i dać się rozpieścić? To jest miejsce dla Ciebie.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 ">
              <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 "
              >
                ZOBACZ WSZYSTKO
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
