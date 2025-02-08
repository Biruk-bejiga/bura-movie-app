import React from "react";

const SearchBox = (props) => {
    return(
        <div className="col col-sn-4">
            <input 
            className="form-control" 
            placeholder="Search for films ..."
            value={props.value}
            onChange={(event) => {props.setsSearchFilms(event.target.value)}}
            />
        </div>
    );
}

export default SearchBox;