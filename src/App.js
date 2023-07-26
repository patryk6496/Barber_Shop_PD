import './App.css';
import Header from './Components/Header'
import Shaving from './Components/Shaving'
import Skin from './Components/Skin'
import ProductSlider from './Components/ProductSlider'
import Quotes from './Components/Quotes'
import Team from './Components/Team'
import PricingCard from './Components/PricingCard'
import ContactForm from './Components/ContactForm'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="App">
      <Header/>
	  <Shaving/>
	  <Skin/>
	  <ProductSlider/>
	  <Quotes/>
	  <Team/>
	  <PricingCard/>
	  <ContactForm/>
	  <Footer/>
    </div>
  );
}

export default App;
