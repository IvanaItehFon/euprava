import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Menu = ({ isAdmin }) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "14fe13654fmshb345f2bfa45cc64p125164jsn86817c451dd7",
      "X-RapidAPI-Host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    },
  };
  const [upozorenja, setUpozorenja] = useState();
  const [covidData, setCovidData] = useState();
  const [country, setCountry] = useState('Serbia');
  const [countryCode, setCountryCode] = useState('SRB');
  const [data, setData] = useState();
  const [year, setYear] = useState(2022);
  useEffect(() => {
    const fetchCovidData = async () => {
      fetch(
        "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=" + country,
        options
      )
        .then((response) => response.json())
        .then((response) => setCovidData(response.data.confirmed))
        .catch((err) => console.error(err));
    };
    fetchCovidData();
  }, [country]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/upozorenja",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUpozorenja(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="menu">
      <div className="country-select">
        <select name="language" id="kovid" onChange={(e) => setCountry(e.target.value)}>
          <option value="Serbia">Srbija</option>
          <option value="France">Francuska</option>
          <option value="Germany">Nemacka</option>
        </select>
      </div>
      <h1 style={{ color: '#005bff' }}>Ukupan broj slučajeva korona virusa: {covidData}</h1>
      <div className="grid">
        {isAdmin === false && <Link to={'/obavestenja'} style={{ textDecoration: 'none' }}>
          <div className="item">
            <h1 style={{ textDecoration: "none" }}>Obaveštenja</h1>
            <p style={{ textDecoration: "none" }}>Pogledajte poslednja obaveštenja servisa euprave</p>
          </div></Link>}
        {isAdmin && <Link to={'/novoObavestenje'} style={{ textDecoration: 'none' }}>
          <div className="item">
            <h1 style={{ textDecoration: "none" }}>Objavi obaveštenje</h1>
          </div></Link>}
        {isAdmin === false && <Link to={'/noviZahtev'} style={{ textDecoration: 'none' }}>
          <div className="item">
            <h1 style={{ textDecoration: "none" }}>Pošalji zahtev</h1>
            <p style={{ textDecoration: "none" }}>Podnesite zahtev u vezi vaših dokumenata ili postavite pitanje</p>
          </div></Link>}
        {isAdmin && <Link to={'/zahtevi'} style={{ textDecoration: 'none' }}>
          <div className="item">
            <h1 style={{ textDecoration: "none" }}>Zahtevi</h1>
            <p style={{ textDecoration: "none" }}>Zahtevi korisnika euprave</p>
          </div></Link>}
        {isAdmin && <Link to={'/analitika'} style={{ textDecoration: 'none' }}>
          <div className="item">
            <h1 style={{ textDecoration: "none" }}>Analitika</h1>
            <p style={{ textDecoration: "none" }}>Podaci zahtevima i korisnicima euprave</p>
          </div></Link>}
        {isAdmin && <Link to={'/euprava'} style={{ textDecoration: 'none' }}>
          <div className="item">
            <h1 style={{ textDecoration: "none" }}>Euprava</h1>
            <p style={{ textDecoration: "none" }}>O nama</p>
          </div></Link>}
        {isAdmin === false && <Link to={'/euprava'} style={{ textDecoration: 'none' }}>
          <div className="item">
            <h1 style={{ textDecoration: "none" }}>Euprava</h1>
            <p style={{ textDecoration: "none" }}>O nama</p>
          </div></Link>}
        {upozorenja?.length > 0 && isAdmin === false && <Link to={'/upozorenja'} style={{ textDecoration: 'none' }}>
          <div className="item" style={{ backgroundColor: 'red' }}>
            <h1 style={{ textDecoration: "none" }}>Upozorenja*</h1>
            <p style={{ textDecoration: "none" }}>Imate novo upozorenje</p>
          </div></Link>}
        {upozorenja?.length === 0 && isAdmin === false &&
          <div className="item-disabled">
            <h1 style={{ textDecoration: "none" }}>Upozorenja</h1>
            <p style={{ textDecoration: "none" }}>Trenutno nema upozorenja</p>
          </div>}
      </div>
    </div>
  );
};

export default Menu;
