import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Obavestenja from "./components/Obavestenja";
import Menu from "./components/Menu";
import Sidebar from "./components/Sidebar";
import Registracija from "./components/Registracija";
import NoviZahtev from "./components/NoviZahtev";
import NovoObavestenje from "./components/NovoObavestenje";
import Zahtevi from "./components/Zahtevi";
import Upozorenja from "./components/Upozorenja";
import { useEffect, useState } from "react";
import Korisnik from "./components/Korisnik";
import KorisniciLista from "./components/KorisniciLista";
import Analitika from "./components/Analitika";
import PrikazZahteva from "./components/PrikazZahteva";
import Euprava from "./components/EUprava";

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("role") === "ADMIN");
    setIsLoggedIn(localStorage.getItem("token") !== null);
  }, [localStorage.getItem("role")]);

  useEffect(() => {
    console.log(isLoggedin + 'b');
  }, [isLoggedin]);
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar isAdmin={isAdmin} isLoggedin={isLoggedin} />
        <div className="app-body">
          <Routes>
            {isLoggedin ? <Route path="/" element={<Menu isAdmin={isAdmin} />} /> : <Route path="/" element={<Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />} />}
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/registracija" element={<Registracija />} />
            <Route path="/obavestenja" element={<Obavestenja isAdmin={isAdmin} />} />
            <Route path="/zahtevi" element={<Zahtevi />} />
            <Route path="/upozorenja" element={<Upozorenja />} />
            <Route path="/korisnickaPodrska" element={<Obavestenja />} />
            <Route path="/noviZahtev" element={<NoviZahtev />} />
            <Route path="/novoObavestenje" element={<NovoObavestenje />} />
            <Route path="/korisnik/:idKorisnika" element={<Korisnik />} />
            <Route path="/korisnici" element={<KorisniciLista />} />
            <Route path="/analitika" element={<Analitika />} />
            <Route path="/mojNalog" element={<Korisnik />} />
            <Route path="/zahtev/:idZahteva" element={<PrikazZahteva isAdmin={isAdmin} />} />
            <Route path="/euprava" element={<Euprava />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
