import React from 'react';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../Assets/Images/Slider_products/catalog-product-01.jpg';
import image2 from '../Assets/Images/Slider_products/catalog-product-02.jpg';
import image3 from '../Assets/Images/Slider_products/catalog-product-03.jpg';

const products = [
  {
    id: 1,
    name: 'Olejek pilęgnacyjny',
    href: '#',
    imageSrc: image1,
    imageAlt: 'Olejek pilęgnacyjny',
    price: '35',
	currency: 'zł'
  },
  {
    id: 2,
    name: 'Szczotka do brody',
    href: '#',
    imageSrc: image2,
    imageAlt: 'Szczotka do brody',
    price: '35',
	currency: 'zł'
  },
  {
    id: 3,
    name: 'Wosk do brody',
    href: '#',
    imageSrc: image3,
    imageAlt: 'Wosk do brody',
    price: '35',
	currency: 'zł'
  },
  {
    id: 4,
    name: 'Olejek pilęgnacyjny',
    href: '#',
    imageSrc: image1,
    imageAlt: 'Olejek pilęgnacyjnyy',
    price: '35',
	currency: 'zł'
  },
  {
    id: 5,
    name: 'Szczotka do brody',
    href: '#',
    imageSrc: image2,
    imageAlt: 'Szczotka do brody',
    price: '35',
	currency: 'zł'
  },
];

export default function Example() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleAddToCart = async (product) => {
	const userId = localStorage.getItem('userId');
	if (!userId) {
	  // Dodaj produkt do koszyka w localStorage
	  let cart = JSON.parse(localStorage.getItem('cart')) || [];
	  cart.push(product);
	  localStorage.setItem('cart', JSON.stringify(cart));
	  console.log('Produkt dodany do lokalnego koszyka');
	  return;
	}

    try {
      const response = await fetch('/api/koszyk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, product }),
      });

      if (response.ok) {
        console.log('Produkt dodany do koszyka');
      } else {
        console.error('Błąd przy dodawaniu do koszyka');
      }
    } catch (error) {
      console.error('Błąd', error);
    }
	toast.success(`${product.name} dodany do koszyka!`);
  };
  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="heading-slider"><a href="#products">NASZE PRODUKTY</a></h2>

        <div className="mt-6">
		<Slider {...settings}>
  {products.map((product) => (
    <div key={product.id} className="px-4 py-2">
      {/* Kontener karty produktu */}
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="product-name">
              <a href={product.href}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </a>
            </h3>
          </div>
		  <p className="product-price">{product.price} {product.currency}</p>
        </div>
      </div>
      {/* Przycisk umieszczony poza kontenerem 'group' */}
      <button 
              onClick={() => handleAddToCart(product)}
              className="mt-3 w-full font-bold py-2 px-4 rounded cart-button"
            >
              Dodaj do zamówienia
            </button>
    </div>
  ))}
</Slider>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <div className="svg-container ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="215"
                  height="79"
                  viewBox="0 0 215 79"
                  fill="none"
                >
                  <path
                    d="M213.265 39.1323C213.265 44.217 210.44 49.1574 205.117 53.7447C199.796 58.3301 192.052 62.4935 182.419 66.0048C163.157 73.0253 136.498 77.3823 107.015 77.3823C77.532 77.3823 50.8729 73.0253 31.6115 66.0048C21.9778 62.4935 14.2344 58.3301 8.91333 53.7447C3.58999 49.1574 0.765137 44.217 0.765137 39.1323C0.765137 34.0477 3.58999 29.1073 8.91333 24.5199C14.2344 19.9346 21.9778 15.7712 31.6115 12.2598C50.8729 5.23931 77.532 0.882324 107.015 0.882324C136.498 0.882324 163.157 5.23931 182.419 12.2598C192.052 15.7712 199.796 19.9346 205.117 24.5199C210.44 29.1073 213.265 34.0477 213.265 39.1323Z"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                  <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill="black"
                    fontSize="16"
                    fontFamily="Arial"
                  >
                    ZOBACZ WSZYSTKO
                  </text>
                </svg>
                <svg
                  className="svg-animation"
                  xmlns="http://www.w3.org/2000/svg"
                  width="215"
                  height="79"
                  viewBox="0 0 215 79"
                  fill="none"
                >
                  <path
                    d="M213.265 39.1323C213.265 44.217 210.44 49.1574 205.117 53.7447C199.796 58.3301 192.052 62.4935 182.419 66.0048C163.157 73.0253 136.498 77.3823 107.015 77.3823C77.532 77.3823 50.8729 73.0253 31.6115 66.0048C21.9778 62.4935 14.2344 58.3301 8.91333 53.7447C3.58999 49.1574 0.765137 44.217 0.765137 39.1323C0.765137 34.0477 3.58999 29.1073 8.91333 24.5199C14.2344 19.9346 21.9778 15.7712 31.6115 12.2598C50.8729 5.23931 77.532 0.882324 107.015 0.882324C136.498 0.882324 163.157 5.23931 182.419 12.2598C192.052 15.7712 199.796 19.9346 205.117 24.5199C210.44 29.1073 213.265 34.0477 213.265 39.1323Z"
                    stroke="black"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
	  {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
