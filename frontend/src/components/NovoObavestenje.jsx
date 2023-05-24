import "./css/NoviZahtev.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NovoObavestenje = () => {
    const navigate = useNavigate();
    const objaviObavestenje = async () => {
        const sadrzaj = document.getElementById('sadrzaj').value;
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:8080/api/v1/obavestenja', {
                sadrzaj,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/obavestenja');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="zahtev-container">
            <div className="zahtev-forma">
                <textarea id="sadrzaj" placeholder="Sadrzaj obavestenja" style={{ width: '300px', margin: '30px', height: '150px' }} />
                <button onClick={() => objaviObavestenje()}>Objavi obavestenje</button>
            </div>
        </div>
    );
}

export default NovoObavestenje;