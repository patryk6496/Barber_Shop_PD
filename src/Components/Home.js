import '../App.css';
import Header from './Header'
import Shaving from './Shaving'
import Skin from './Skin'
import ProductSlider from './ProductSlider'
import Quotes from './Quotes'
import Team from './Team'
import PricingCard from './PricingCard'
import ContactForm from './ContactForm'
import Footer from './Footer'
import Beadr from './Beard'
import Hero from './Hero'

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const Home = () => {

	const location = useLocation();

	useEffect(() => {
	  const hash = location.hash;
	  if (hash) {
		const element = document.getElementById(hash.replace('#', ''));
		if (element) {
		  element.scrollIntoView({ behavior: 'smooth' });
		}
	  }
	}, [location]);

  return (
	<>
    <div className="App">
      <Header/>
	  <Hero/>
	  <Shaving/>
	  <Skin/>
	  <Beadr/>
	  <ProductSlider/>
	  <Quotes/>
	  <Team/>
	  <PricingCard/>
	  <ContactForm/>
	  <Footer/>
    </div>
	</>
  );
}

export default Home;
