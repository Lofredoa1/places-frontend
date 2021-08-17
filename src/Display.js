import React from "react";
import './App.css';

const Display = (props) => {
    const {places} = props
  
    const loaded = () => (
        <div style={{ textAlign: "center" }}>
      {places.map((place) => (
        <article>
          <img className="location" src={place.img} />
          <h1>{place.name}</h1>
          <h3>{place.description}</h3>
          <button className="edit-button" onClick={() => {
              props.selectPlace(place)
              props.history.push("/edit")
          }}>Edit</button>
          <button className="delete-button" onClick={() => {
              props.deletePlace(place)
          }}>Delete</button>
        </article>
         
      ))} 
    </div> 
    )

    const loading = <h1>Loading...</h1>

    return places.length > 0 ? loaded() : loading
};

export default Display