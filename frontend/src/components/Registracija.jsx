import axios from "axios";
import FormaPasosLicna from "./FormaPasosLicna";
import RegistracijaForma from "./RegistracijaForma";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Registracija = () => {
  const navigate = useNavigate();
  const [brojPasosa, setBrojPasosa] = useState('');
  const [datumIzdavanjaPasosa, setDatumIzdavanjaPasosa] = useState('');
  const [datumVazenjaPasosa, setDatumVazenjaPasosa] = useState('');
  const [brojLicneKarte, setBrojLicneKarte] = useState('');
  const [datumIzdavanjaLicne, setDatumIzdavanjaLicne] = useState('');
  const [datumVazenjaLicne, setDatumVazenjaLicne] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastNAme] = useState('');
  const [email, setEmail] = useState('');
  const [jmbg, setJMBG] = useState('');
  const [gender, setGender] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    if (jmbg != "" && firstName != "" && lastName != "" && username != "" && password != "" && email != "") setIsFilled(true);
    else setIsFilled(false);
  }, [firstName, lastName, email, jmbg, username, password])
  const registerUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        "username": username,
        "password": password,
        "ime": firstName,
        "prezime": lastName,
        "email": email,
        "jmbg": jmbg,
        "pol": gender,
        "licnaKarta": {
          "brojLicneKarte": brojLicneKarte,
          "datumIzdavanja": datumIzdavanjaLicne,
          "datumVazenja": datumVazenjaLicne
        },
        "pasos": {
          "brojPasosa": brojPasosa,
          "datumIzdavanja": datumIzdavanjaPasosa,
          "datumVazenja": datumVazenjaPasosa
        }
      });

      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  const [next, setNext] = useState(true);
  return (
    <div className="center-content">
      {next ? <>
        <div className="login-form">
          <h1 style={{ color: '#005bff' }}>Pasos</h1>
          <input type="number" placeholder="Broj pasosa" id="brojPasosa" onChange={() => setBrojPasosa(document.getElementById('brojPasosa').value)} />
          <div className="datum">
            <label htmlFor="datum-izdavanja-pasosa">Datum izdavanja</label>
            <input type="date" id="datum-izdavanja-pasosa" onChange={() => setDatumIzdavanjaPasosa(document.getElementById('datum-izdavanja-pasosa').value)} />
          </div>
          <div className="datum">
            <label htmlFor="datum-vazenja-pasosa">Datum vazenja</label>
            <input type="date" id="datum-vazenja-pasosa" onChange={() => setDatumVazenjaPasosa(document.getElementById('datum-vazenja-pasosa').value)} />
          </div>
          <h1 style={{ color: '#005bff' }}>Licna karta</h1>
          <input type="number" placeholder="Broj licne karte" id="brojLicneKarte" onChange={() => setBrojLicneKarte(document.getElementById('brojLicneKarte').value)} />
          <div className="datum">
            <label htmlFor="datum-izdavanja-licne">Datum izdavanja</label>
            <input type="date" id="datum-izdavanja-licne" onChange={() => setDatumIzdavanjaLicne(document.getElementById('datum-izdavanja-licne').value)} />
          </div>
          <div className="datum">
            <label htmlFor="datum-vazenja-licne">Datum vazenja</label>
            <input type="date" id="datum-vazenja-licne" onChange={() => setDatumVazenjaLicne(document.getElementById('datum-vazenja-licne').value)} />
          </div>{brojPasosa != "" && brojLicneKarte != "" && datumIzdavanjaLicne != "" && datumVazenjaPasosa != "" &&
            datumIzdavanjaPasosa != "" && datumVazenjaLicne != ""
            ? <button onClick={() => setNext(false)}>Sledeca strana</button> : <button disabled style={{ backgroundColor: 'grey' }}>Sledeca strana</button>}
        </div>
      </> :
        <div className="registracija-forma">
          <div className="login-form">
            <div className="form-group">
              <label style={{ color: "black" }}>Korisnicko ime: </label>
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "black" }}>Lozinka: </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "black" }}>Ime: </label>
              <input
                type="text"
                className="form-control"
                id="ime"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "black" }}>Prezime: </label>
              <input
                type="text"
                className="form-control"
                id="prezime"
                onChange={(e) => setLastNAme(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "black" }}>Email: </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ color: "black" }}>JMBG: </label>
              <input
                type="text"
                className="form-control"
                id="jmbg"
                onChange={(e) => setJMBG(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginLeft: '84px' }}>
              <label style={{ color: "black", display: 'flex', alignItems: 'center' }}>
                <input type="radio" name="gender" value="MUSKI" style={{ marginRight: '5px', verticalAlign: 'middle' }} onChange={(e) => setGender(e.target.value)} />
                <span style={{ verticalAlign: 'middle' }}>Muski</span>
              </label>
              <label style={{ color: "black", display: 'flex', alignItems: 'center' }}>
                <input type="radio" name="gender" value="ZENSKI" style={{ marginRight: '5px', verticalAlign: 'middle' }} onChange={(e) => setGender(e.target.value)} />
                <span style={{ verticalAlign: 'middle' }}>Zenski</span>
              </label>
            </div>


            <div className="side-form">

            </div>
            <div className="btn-container">
              {isFilled && <button
                type="submit"
                className="btn-login"
                id="login"
                style={{ margin: "10px", marginLeft: '75px' }}
                onClick={() => registerUser()}
              >
                Napravi nalog
              </button>}
            </div>
          </div>
        </div>}
    </div>
  );
}

export default Registracija;