import './App.css'
import NavBar from "./Components/NavBar/NavBar";
import Banner from "./Components/Banner/Banner";
import RowPost from "./Components/RowPost/RowPost";
import { ACTION_URL, COMEDY_URL, HORROR_URL, NETFLIX_ORIG, TRENDING_URL } from "./constants/constants";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost title = 'Trending' isSmall linkRef = {TRENDING_URL}/>
      <RowPost title = 'Action' isSmall linkRef = {ACTION_URL}/>
      <RowPost title = 'Comedy' isSmall linkRef = {COMEDY_URL}/>
      <RowPost title = 'Horror' isSmall linkRef = {HORROR_URL}/>
      <RowPost title = 'Netflix Originals' linkRef = {NETFLIX_ORIG}/>
    </div>
  );
}

export default App;
