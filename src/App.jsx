import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { auth } from "./firebase"; // importacion de Firebase
import Footer from "./components/Footer";
import Fundaciones from "./components/Fundaciones";
import Veterinarias from "./components/Veterinarias";
import Adopcion from "./components/Adopcion";
import Navbar from "./components/Navbar";
import Wikipet from "./components/Wikipet";
import Login from "./components/Login";

function App() {
  /* 
    onAuthStateChanged: va evaluando si existe el usuario, 
    por lo tanto si se cierra sesión se vuelve a ejecutar onAuthStateChanged()
*/
  const [firebaseUser, setFirebaseUser] = React.useState(false); // Estado: Hay usuario?

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);
  return firebaseUser !== false ? (
    <Router>
      <div>
        {/*<Navbar firebaseUser={firebaseUser} />*/}
        <Navbar firebaseUser={firebaseUser} />
        {/*  <Navbar2 firebaseUser={firebaseUser} /> */}
        {/* Componentes dinamicos : Rutas*/}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/adopcion">
            <Adopcion />
          </Route>
          <Route path="/wikipet">
            {/*<Wikipet />*/}
            <Wikipet />
          </Route>
          <Route path="/adoptar">
            <Fundaciones />
          </Route>
          <Route path="/veterinarias">
            <Veterinarias />
          </Route>
          <Route path="/">
            <Fundaciones />
          </Route>
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
}

export default App;
