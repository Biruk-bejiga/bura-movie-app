import "./App.css";
import { useEffect, useState } from "react";
import FilmList from "./Component/FilmList";
import FilmListHeading from "./Component/FilmListHeading";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "./Component/SearchBox";
import AddFavoriate from "./Component/AddFavoriate";
import RemoveFavoriate from "./Component/RemoveFavoriate";

const App = () => {
  const [films, setfilm] = useState([]);
  const [FavoriateFilms, setFavoirateFilms] = useState([]);
  const [searchFilms, setsSearchFilms] = useState(['']);
  const getFilmRequest = async (searchFilms) => {
    const url = `http://www.omdbapi.com/?s=${searchFilms}&apikey=2d28ad00`;

    const response = await fetch(url);
    const responseJeson = await response.json();
    if(responseJeson.Search) {
      setfilm(responseJeson.Search);
    }
  }
  useEffect(() => {
    getFilmRequest(searchFilms);
  }, [searchFilms]);
  useEffect(() => {
    const yourFavoriet = JSON.parse(
      localStorage.getItem('your-favoriet')
    );
    if(yourFavoriet) {
      setFavoirateFilms(yourFavoriet);
    }
  }, []);
  const saveToLocalStorage = (items) => {
    localStorage.setItem('your-favoriet', JSON.stringify(items));
  }
  const addFavoriateFilm = (film) => {
    let newFavoriateList;
    // Check if the film already exists in the favorites list
    if (!FavoriateFilms.find((favFilm) => favFilm.imdbID === film.imdbID)) {
        newFavoriateList = [...FavoriateFilms, film];
        setFavoirateFilms(newFavoriateList);
    } else {
        // Alert or message indicating that the film is already in favorites
        console.log("Film already exists in favorites!");
    }
    saveToLocalStorage(newFavoriateList);
}
const removeFavoriateFilm = (film) => {
  const newFavoriateList = FavoriateFilms.filter((FavoriateFilms) => FavoriateFilms.imdbID !== film.imdbID)
      setFavoirateFilms(newFavoriateList);
      saveToLocalStorage(newFavoriateList);
}
  return (
    <div className="App container-fluid film-css">
      <div className="row d-flex align-items-center mb-4">
       <FilmListHeading heading='Movie'/>
       <SearchBox searchFilms={searchFilms} setsSearchFilms={setsSearchFilms}/>
      </div>
      <div className="row">
       <FilmList films={films} favoriateChosen={addFavoriateFilm} favoriate={AddFavoriate}/>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
       <FilmListHeading heading='Your Favoriate'/>
      </div>
      <div className="row">
       <FilmList films={FavoriateFilms} favoriateChosen={removeFavoriateFilm} favoriate={RemoveFavoriate}/>
      </div>
    </div>
  );
}

export default App;
