import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../'

const products = [
	{
	  id: 1,
	  name: 'Basic Tee',
	  href: '#',
	  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
	  imageAlt: "Front of men's Basic Tee in black.",
	  price: '$35',
	  color: 'Black',
	},
	{
		id: 2,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		price: '$35',
		color: 'Black',
	  },
	  {
		id: 3,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		price: '$35',
		color: 'Black',
	  },
	  {
		id: 4,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		price: '$35',
		color: 'Black',
	  },
	  {
		id: 5,
		name: 'Basic Tee',
		href: '#',
		imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
		imageAlt: "Front of men's Basic Tee in black.",
		price: '$35',
		color: 'Black',
	  },
  ]
  
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
	  
	return (
		<div className="bg-white">
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
  
		  <div className="mt-6">
			<Slider {...settings}>
			  {products.map((product) => (
				<div key={product.id} className="group relative px-4">
				  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 ">
					<img
					  src={product.imageSrc}
					  alt={product.imageAlt}
					  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
					/>
				  </div>
				  <div className="mt-4 flex justify-between">
					<div>
					  <h3 className="text-sm text-gray-700">
						<a href={product.href}>
						  <span aria-hidden="true" className="absolute inset-0" />
						  {product.name}
						</a>
					  </h3>
					  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
					</div>
					<p className="text-sm font-medium text-gray-900">{product.price}</p>
				  </div>
				</div>
				
			  ))}
			</Slider>
			<div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ZOBACZ WSZYSTKO
              </a>
            </div>
		  </div>
		</div>
	  </div>
	);
  }
  