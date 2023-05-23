import "./css/NoviZahtev.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NovoObavestenje = () => {
    const navigate = useNavigate();
    const objaviObavestenje = async () => {
        const sadrzaj = document.getElementById('sadrzaj').value;
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
            const response = await axios.post('http://localhost:8080/api/v1/obavestenja', {
                sadrzaj,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the bearer token to the request headers
                },
            });
            navigate('/obavestenja');
            console.log(response.data); // Handle the response data
        } catch (error) {
            console.error(error); // Handle the error
        }
    };

    return (
        <div className="zahtev-container">
            <div className="zahtev-forma">
                {/* <input type="text" name="" id="sadrzaj" placeholder="Sadrzaj zahteva" /> */}
                <textarea id="sadrzaj" placeholder="Sadrzaj obavestenja" style={{ width: '300px', margin: '30px', height: '150px' }} />
                <button onClick={() => objaviObavestenje()}>Objavi obavestenje</button>
            </div>
        </div>
    );
}

export default NovoObavestenje;