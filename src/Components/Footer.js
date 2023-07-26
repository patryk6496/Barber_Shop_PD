import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
			<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">test</span>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              {/* Treść pierwszego bloku */}
            </div>
            <div>
              {/* Treść drugiego bloku */}
            </div>
            <div>
              {/* Treść trzeciego bloku */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
