import React from "react";

const FilmList = (props) => {
    const Favoriate = props.favoriate;
    return (
        <>
        {props.films.map(
            (film, index) => 
            <div  className="image-container" style={{ display: 'inline-block', width: 'auto', margin: '0.5rem' }}>
                <img src={film.Poster} alt="Harry Potter poster" />
                <div onClick={() => props.favoriateChosen(film)} className="overlay d-flex align-items-center justify-content-center">
                    <Favoriate />
                </div>
            </div>
            
        )
        }
        </>
    );
}

export default FilmList;