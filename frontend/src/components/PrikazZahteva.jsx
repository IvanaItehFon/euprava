import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/PrikazZahteva.css';

const PrikazZahteva = ({ isAdmin }) => {
  const { idZahteva } = useParams();
  const navigate = useNavigate();
  const [zahtev, setZahtev] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get('http://localhost:8080/api/v1/zahtevi/' + idZahteva, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            setZahtev(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])
  function download() {
    axios.get('http://localhost:8080/api/v1/dokumentacija/' + zahtev.fileCode, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'responseType': 'blob'
      },
      responseType: 'blob'
    })
      .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', {idZahteva}+'.pdf');
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const obradiZahtev = async (id) => {
    try {
      const response = await axios
        .post('http://localhost:8080/api/v1/zahtevi/' + idZahteva + '/razresi', null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log(response)
          navigate('/zahtevi');
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="prikaz-zahteva-container">
      <h1>{zahtev?.podnosilac.ime} {zahtev?.podnosilac.prezime}</h1>
      <div className="podaci-zahtev">
        <p>Tip usluge: {zahtev?.tipUsluge}</p>
        <p>Vreme podnosenja: {zahtev?.vremePodnosenja}</p>
        <p>Email: {zahtev?.podnosilac.email}</p>
        <p>Status: {zahtev?.statusZahteva}</p>
        <p>Sadrzaj: {zahtev?.sadrzaj}</p></div>
        <div className="btn-container-zahtev">
          <button onClick={() => download()}>Preuzmi dokument</button>
          {isAdmin && zahtev?.statusZahteva != "RAZRESENO" &&<button onClick={() => obradiZahtev(zahtev.id)}>Obradi zahtev</button>}
        </div>
    </div>
  );
}

export default PrikazZahteva;