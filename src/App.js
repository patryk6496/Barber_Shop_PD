import './App.css';
import Header from './Components/Header'
import Shaving from './Components/Shaving'
import Skin from './Components/Skin'
import ProductSlider from './Components/ProductSlider'
import Quotes from './Components/Quotes'
import Team from './Components/Team'

function App() {
  return (
    <div className="App">
      <Header/>
	  <Shaving/>
	  <Skin/>
	  <ProductSlider/>
	  <Quotes/>
	  <Team/>
    </div>
  );
}

export default App;
