import React, { useState, useEffect } from "react"
import './App.css';
import { Route, Link, Switch } from "react-router-dom"
import Display from "./Display";
import Form from "./Form";


function App() {

  const url = "https://favorite-places-al.herokuapp.com"

  const [places, setPlaces] = useState([]);

  //empty place
  const emptyPlace = {
      name: "",
      img: "",
      description: "",
  }

  const [selectedPlace, setSelectedPlace] = useState(emptyPlace)

  const getPlaces = () => {
    fetch(url + "/places/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      setPlaces(data)
    })
  };

  useEffect(() => {getPlaces()}, [])

  //create new place
  const handleCreate = (newPlace) => {
    fetch(url + "/places/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlace),
    }).then(() => {
      getPlaces();
    })
  };

  //update existing place
  const handleUpdate = (place) => {
    fetch(url + "/places/" + place._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(place),
    }).then(() => {
      getPlaces();
    });
  };
  
  const selectPlace = (place) => {
    setSelectedPlace(place);
  };

  const deletePlace = (place) => {
    fetch(url + "/places/" + place._id, {
      method: "delete",
    }).then(() => {
      getPlaces();
    });
  };

  return (
    <div className="App">
     <h1>Favorite Places Around the World</h1>
     <hr />
     <Link to="/create">
       <button className="add-button">Add Favorite Place</button>
     </Link>
     <main>
       <Switch>
         <Route exact path="/" render={(rp) => <Display {...rp} places={places} selectPlace={selectPlace} deletePlace={deletePlace}/>} />
         <Route exact path="/create" render={(rp) => (
           <Form {...rp} label="create" place={emptyPlace} handleSubmit={handleCreate}/>)} />
         <Route path="/edit" render={(rp) => (
           <Form {...rp} label="update" place={selectedPlace} handleSubmit={handleUpdate}/>
          )}/>
       </Switch>
     </main>
    </div>
  );
}

export default App;
