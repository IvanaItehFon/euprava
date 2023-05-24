import "./css/NoviZahtev.css";
import { Dropdown, Button, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoviZahtev = () => {
  const navigate = useNavigate();
  const posaljiZahtev = async () => {
    
    const sadrzaj = document.getElementById('sadrzaj').value;
    const token = localStorage.getItem('token');
    var dokument = document.getElementById('dokument');
    var formData = new FormData();
    formData.append("dokument", dokument.files[0]);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/dokumentacija', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      const downloadUri = response.data.downloadUri;
      const responseZahtev = await axios.post('http://localhost:8080/api/v1/zahtevi', {
        "sadrzaj": sadrzaj,
        "fileCode": downloadUri,
        "tipUsluge": document.getElementById('tipUsluge').value
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      navigate('/zahtevi');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="zahtev-container">
      <div className="zahtev-forma">
        <select name="language" id="tipUsluge">
          <option value="IZDAVANJE_PASOSA">Izdavanje pasosa</option>
          <option value="IZDAVANJE_LICNE_KARTE">Izdavanje licne karte</option>
        </select>
        <label htmlFor="dokument" style={{ color: 'white' }}>Prosledite PDF dokument maksimalne velicine 1MB:</label>
        <label htmlFor="dokument" style={{ display: 'flex', width: '200px', height: '25px', background: 'white', padding: '5px', alignItems: 'center', cursor: 'pointer', borderRadius: '5px', justifyContent: 'center' }}>
          <span>Custom File Input</span>
          <input type="file" accept="application/pdf" id="dokument" style={{ display: 'none' }} />
        </label>

        <textarea id="sadrzaj" placeholder="Sadrzaj zahteva" />
      </div>

      <button id="posalji-zahtev" onClick={() => posaljiZahtev()} >Posalji zahtev</button>

    </div>
  );
};

export default NoviZahtev;
