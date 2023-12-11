import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';



const LoginRegisterForm = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  
	const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Błąd rejestracji');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token); // Zapisz token w localStorage
    toast.success("Użytkownik utworzony i zalogowany pomyślnie");
    navigate('/'); // Przekierowanie do strony głównej
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    toast.error('Wystąpił błąd podczas rejestracji');
  }
};

  return (
<section>
  <div className="py-16 md:py-24 lg:py-32">
    <div className="mx-auto max-w-xl bg-[#f2f2f7] px-5 py-12 text-center md:px-10">
      <h2 className="text-3xl font-bold md:text-5xl">Start 14-day free trial</h2>
      <p className="mx-auto mb-5 mt-4 max-w-xl text-[#647084] md:mb-8">Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,purus sit amet luctus magna fringilla urna</p>
      <a href="#" className="mx-auto flex max-w-sm justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
        <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19d23637f876_GoogleLogo.svg" alt="" className="mr-4" />
        <p className="font-bold">Sign up with Google</p>
      </a>
      <div className="mx-auto mb-14 mt-14 flex max-w-sm justify-around">
        <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f3d7490d1b3d86cf9442_Line%203.svg" alt="" className="inline-block" />
        <p className="text-sm text-[#647084]">or sign up with email</p>
        <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f3d7490d1b3d86cf9442_Line%203.svg" alt="" className="inline-block" />
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mb-4 max-w-sm pb-4" name="wf-form-password" method="get">
        <div className="relative">
          <img alt="" src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg" className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
          <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" 
          placeholder="Email Address" 
          required 
        />
        </div>
        <div className="relative mb-4 pb-2">
          <img alt="" src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg" className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
          <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" 
          placeholder="Password" 
          required
        />
        </div>
		<button type="submit" className="flex max-w-full grid-cols-2 flex-row items-center justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
    <p className="mr-6 font-bold">Zarejestruj się</p>
    <div className="h-4 w-4 flex-none">
      <svg fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
        <title>Arrow Right</title>
        <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
      </svg>
    </div>
  </button>
      </form>
      {/* <p className="text-sm text-[#636262]">Already have an account? <a href="#" className="font-[Montserrat,_sans-serif] text-sm font-bold text-black">Login now</a>
      </p> */}

	  <Link to="/logowanie" className="text-sm text-[#636262]">
				Masz juz konto ?  <span aria-hidden="true">&rarr;</span>
</Link>
    </div>
  </div>
</section>
);
};
  export default LoginRegisterForm;