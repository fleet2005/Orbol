import React from 'react';
import CardList from './cardList';
import UploadWidget from './widget';

const App = () => {
  return (

    <div>
        <div className="App">
          <h1 style={{textAlign:"center",color:"#d4af37", fontFamily:"cursive", fontSize:"3vw"}}>Orbol</h1>
          <UploadWidget />
          <CardList />
        </div>
    </div>
  );
};

export default App;
