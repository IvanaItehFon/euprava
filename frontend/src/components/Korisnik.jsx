import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/Korisnik.css";

const Korisnik = ({ isAdmin }) => {
  const { idKorisnika } = useParams();
  console.log(idKorisnika);
  const navigate = useNavigate();
  const [zahtevi, setZahtevi] = useState();
  const [upozorenja, setUpozorenja] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [korisnik, setKorisnik] = useState();
  const [show, setShow] = useState(false);
  const [pasos, setPasos] = useState();
  const [licnaKarta, setLicnaKarta] = useState();
  useEffect(() => {
    const fetchLicnaKarta = async () => {
      try {
        const response = await axios
          .get('http://localhost:8080/api/v1/korisnici/' + idKorisnika + '/licnaKarta', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            setLicnaKarta(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchPasos = async () => {
      try {
        const response = await axios
          .get('http://localhost:8080/api/v1/korisnici/' + idKorisnika + '/pasos', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            setPasos(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchZahtevi = async () => {
      try {
        const response = await axios
          .get('http://localhost:8080/api/v1/zahtevi/podnosilac/' + idKorisnika, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            setZahtevi(response.data.content);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUpozorenja = async () => {
      try {
        const response = await axios
          .get('http://localhost:8080/api/v1/upozorenja/korisnik/' + idKorisnika, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            setUpozorenja(response.data.content);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDataUser = async () => {
      try {
        const response = await axios
          .get('http://localhost:8080/api/v1/korisnici/' + idKorisnika, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            setKorisnik(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataUser();
    fetchUpozorenja();
    fetchZahtevi();
    fetchLicnaKarta();
    fetchPasos();
  }, []);
  console.log(pasos);
  console.log(licnaKarta);
  return (
    <div className="korisnik">
      <div className="podaci1" style={{ padding: '20px', width: '900px', height: '200px', display: 'flex', justifyContent: 'space-around', backgroundColor: "#007bff", borderRadius: '8px', margin: '20px' }}>
        <div className="column podaci1" style={{ width: '400px', color: 'white' }}>
          <h2 className="ime-prezime">{korisnik?.ime} {korisnik?.prezime} ({korisnik?.role})</h2>
          <p className="email-jmbg">Email: {korisnik?.email}</p>
          <p className="email-jmbg">JMBG: {korisnik?.jmbg}</p>
          <p className="username">Korisničko ime: {korisnik?.username}</p>
        </div>
        <div className="column podaci1" style={{ width: '300px', color: 'white' }}>
          <h2 className="ime-prezime">Pasoš</h2>
          <p className="email-jmbg">Broj pasoša: {pasos?.brojPasosa}</p>
          <p className="email-jmbg">Datum izdavanja: {pasos?.datumIzdavanja}</p>
          <p className="username">Datum važenja: {pasos?.datumVazenja}</p>
        </div>
        <div className="column podaci1" style={{ width: '300px', color: 'white' }}>
          <h2 className="ime-prezime">Lična karta</h2>
          <p className="email-jmbg">Broj lične karte: {licnaKarta?.brojLicneKarte}</p>
          <p className="email-jmbg">Datum izdavanja: {licnaKarta?.datumIzdavanja}</p>
          <p className="username">Datum važenja: {licnaKarta?.datumVazenja}</p>
        </div>
      </div>
      <div className="row btn-container">
        <button onClick={() => setShow(true)}>Zahtevi</button>
        <button onClick={() => setShow(false)}>Upozorenja</button>
      </div>
      <div className="row">
        {show && (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Sadržaj</th>
                <th>Status Zahteva</th>
                <th>Tip Usluge</th>
                <th>Vreme Podnošenja</th>
              </tr>
            </thead>
            <tbody>
              {zahtevi.length > 0 ? <>{zahtevi &&
                zahtevi.map((zahtev) => (
                  <tr onClick={() => navigate('/zahtev/' + zahtev?.id)} key={zahtev.id}>
                    <td>{zahtev.sadrzaj}</td>
                    <td>{zahtev.statusZahteva}</td>
                    <td>{zahtev.tipUsluge}</td>
                    <td>{zahtev.vremePodnosenja}</td>
                  </tr>
                ))}</>:<h2 style={{color: '#005bff'}}>Nema zahteva</h2>}
              
            </tbody>
          </table>
        )}

        {!show && <table className="custom-table">
          <thead>
            <tr>
              <th>Sadržaj</th>
              <th>Vreme</th>
            </tr>
          </thead>
          <tbody>
            {upozorenja?.length>0 ? <>{upozorenja &&
              upozorenja.map((upozorenje) => (
                <tr key={upozorenje.id}>
                  <td>{upozorenje.sadrzaj}</td>
                  <td>{upozorenje.vreme}</td>
                </tr>
              ))}</>:<h2 style={{color: '#005bff'}}>Nema upozorenja</h2>}
            
          </tbody>
        </table>}
      </div>
    </div>

  );
}

export default Korisnik;