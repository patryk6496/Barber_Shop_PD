import React from 'react';

  export default function Example() {
	return (
	  <div className="bg-white">
		<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
		  <div>
			<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">BRODA</h2>
			<p className="mt-4 text-gray-500">
			Naszą ambicją jest, abyś opuścił program z nowym obrazem siebie.
			</p>
			<div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ZOBACZ WSZYSTKO
              </a>
            </div>
		  </div>
		  <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
			<img
			  src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
			  alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
			  className="rounded-lg bg-gray-100"
			/>
		  </div>
		</div>
	  </div>
	)
  }
  