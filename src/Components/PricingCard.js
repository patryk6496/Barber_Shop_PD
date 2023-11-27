const posts = [
  {
    id: 1,
    title: 'Fryzura',
    description: 'Dodatek to zestaw funkcji premium, które można dodać do swojego formularza',
    price: '30€',
    features: ['Analiza i masaż skóry głowy', 'Zastosowanie odpowiedniego produktu do pielęgnacji skóry', 'Strzyżenie włosów'],
  },
  {
    id: 2,
    title: 'Broda',
    description: 'Dodatek to zestaw funkcji premium, które można dodać do swojego formularza',
    price: '45€',
    features: ['Analiza i masaż skóry głowy', 'Zastosowanie odpowiedniego produktu do pielęgnacji skóry', 'Strzyżenie włosów'],
  },
  {
    id: 3,
    title: 'Strzyżenie',
    description: 'Dodatek to zestaw funkcji premium, które można dodać do swojego formularza',
    price: '20€',
    features: ['Zastosowanie odpowiedniego produktu do pielęgnacji skóry', 'Strzyżenie włosów i brody', 'Analiza i masaż skóry głowy'],
  },
];

export default function Example() {
  return (
	<div className="bg-white py-24 sm:py-32">
	<div className="mx-auto max-w-7xl px-6 lg:px-8">
	  <div className="mx-auto max-w-100% lg:mx-0">
		<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
		  NASZE CENY
		</h2>
	  </div>
	  <div className="mt-10 flex flex-col gap-8 lg:flex-row pricing-container">
		{posts.map((post) => (
		  <article
			key={post.id}
			className="flex flex-col max-w-sm border border-gray-200 rounded-lg shadow-lg p-6 items-center"
		  >
			<h3 className="text-lg font-semibold leading-6 text-gray-900">
			  <a href={post.href}>
				<span className=" inset-0" />
				{post.title}
			  </a>
			</h3>
			<p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 text-center">
			  {post.description}
			</p>
			<div className="mt-4 flex items-center gap-x-4">
			  <span className="text-xl font-semibold price-text">
				{post.price}
			  </span>
			</div>
			<a
              href="#"
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <div className="svg-container">
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
			<ul className="mt-4 space-y-2 text-gray-600">
			  {post.features.map((feature) => (
				<li key={feature} className="flex items-center gap-x-2">
				  <svg
					className="w-4 h-4 text-green-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				  >
					<path
					  strokeLinecap="round"
					  strokeLinejoin="round"
					  strokeWidth="2"
					  d="M5 13l4 4L19 7"
					/>
				  </svg>
				  <span>{feature}</span>
				</li>
			  ))}
			</ul>
		  </article>
		))}
	  </div>
	</div>
  </div>
  );
}
