import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import '../App.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const navigation = [
	{ name: 'Nasze Produkty', href: '/#products' },
	{ name: 'Nasi Artyści', href: '/#team' },
	{ name: 'Nasze Ceny', href: '/#ceny' },
  ];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [isCartHovered, setIsCartHovered] = useState(false);
	const navigate = useNavigate();
  
	useEffect(() => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');
	  
		if (token) {
		  setIsLoggedIn(true);
		  // Wczytaj koszyk z serwera
		  fetchCartItems();
		} else {
		  // Użytkownik nie jest zalogowany
		  setIsLoggedIn(false);
		  setCartItems([]); // Wyczyszczenie stanu koszyka w komponencie
		  const localCart = JSON.parse(localStorage.getItem('cart')) || [];
		  setCartItems(localCart); // Ustawienie lokalnego koszyka
		}
	  }, []);
	  
	  
  
	  const handleLogout = () => {
		// Czyszczenie danych użytkownika i koszyka
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('cart'); // Upewnij się, że ta linia istnieje
	  
		setIsLoggedIn(false);
		setCartItems([]);
		toast.info('Wylogowano pomyślnie');
		navigate('/');
	  };
	  


	const fetchCartItems = async () => {
		const userId = localStorage.getItem('userId');
		if (!userId) return;
	
		try {
		  const response = await fetch(`/api/koszyk/${userId}`);
		  const data = await response.json();
		  setCartItems(data);
		} catch (error) {
		  console.error('Błąd podczas pobierania danych koszyka:', error);
		}
	  };

	  console.log('isCartHovered:', isCartHovered); // Dodaj tę linię do debugowania

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
  {/* Kontener dla ikon */}
  <div className="flex items-center">
    {/* Link do koszyka z ikonką */}
    <Link to="/koszyk" className="mr-4 text-white hover:text-orange-500">
      <ShoppingCartIcon className="h-6 w-6" />
      <span>Koszyk ({cartItems.length})</span>
    </Link>

    {/* Ikonka Hamburgera */}
    <button
      type="button"
      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
      onClick={() => setMobileMenuOpen(true)}
    >
      <span className="sr-only">Otwórz główne menu</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
</div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white hover:text-orange-500">
                {item.name}
              </a>
            ))}
          </div>
         

		  {isLoggedIn ? (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/panel-konta" className="text-sm font-semibold leading-6 text-white hover:text-orange-500">
            Panel Konta <span aria-hidden="true">&rarr;</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="text-sm font-semibold leading-6 text-white hover:text-orange-500 ml-4"
          >
            Wyloguj się
          </button>
        </div>
      ) : (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/rejestracja" className="text-sm font-semibold leading-6 text-white hover:text-orange-500">
            Zarejestruj się <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link to="/logowanie" className="text-sm font-semibold leading-6 text-white hover:text-orange-500 ml-4">
            Zaloguj się <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      )}

		  <div className="hidden lg:flex lg:flex-1 lg:justify-end">

		  <div className="cart-icon"
   onMouseEnter={() => {
  setIsCartHovered(true);
  if (isLoggedIn) {
    fetchCartItems(); // Ładuj koszyk tylko, gdy użytkownik jest zalogowany
  }
}}isCartHovered
    onMouseLeave={() => setIsCartHovered(false)}
>
    <Link to="/koszyk" className="mr-4 text-white hover:text-orange-500">
        <ShoppingCartIcon className="h-6 w-6" />
        <span>Koszyk ({cartItems.length})</span>
    </Link>
    {isCartHovered && (
        <div className="cart-dropdown">
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item, index) => (
                        <li className="cart-item" key={index}>{item.name} - {item.price} <img src={item.imageSrc} alt={item.name} className="miniaturka" /></li>
						
                    ))}
                </ul>
            ) : (
                <p>Twój koszyk jest pusty</p>
            )}
        </div>
    )}
</div>

		  <Link to="/rezerwacja" className="text-sm font-semibold leading-6 text-white hover:text-orange-500 flex items-center">
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

				<Link to="/rezerwacja" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50">
            Umów się na wizytę <span aria-hidden="true">&rarr;</span>
          </Link>

				

				{isLoggedIn ? (
              <div className="py-6">
                <Link to="/panel-konta" className="text-sm font-semibold leading-6 text-black hover:text-orange-500">
                  Panel Konta <span aria-hidden="true">&rarr;</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="mt-6 block text-sm font-semibold leading-6 text-black hover:text-orange-500"
                >
                  Wyloguj się
                </button>

				<Link to="/koszyk" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-50">
              Koszyk <span aria-hidden="true">&rarr;</span>
            </Link>
              </div>
            ) : (
              <>
                <div className="py-6">
                  <Link to="/rejestracja" className="text-sm font-semibold leading-6 text-black hover:text-orange-500">
                    Zarejestruj się <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
                <div className="py-6">
                  <Link to="/logowanie" className="text-sm font-semibold leading-6 text-black hover:text-orange-500">
                    Zaloguj się <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      
    </div>
  )
}
export default Header;