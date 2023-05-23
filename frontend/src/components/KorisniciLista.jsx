import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KorisniciLista = () => {
    const [korisnici, setKorisnici] = useState();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await axios
                    .get('http://localhost:8080/api/v1/korisnici', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => {
                        setKorisnici(response.data.content);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataUser();
    }, [currentPage]);
    console.log(korisnici);
    return ( 
        <div className="lista-korisnika">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Pol</th>
                        <th>Korisničko ime</th>
                        <th>Stranica korisnika</th>
                    </tr>
                </thead>
                <tbody>
                    {korisnici &&
                        korisnici.map((korisnik) => (
                            <tr key={korisnik.id}>
                                <td>{korisnik.id}</td>
                                <td>{korisnik.ime}</td>
                                <td>{korisnik.prezime}</td>
                                <td>{korisnik.pol}</td>
                                <td>{korisnik.username}</td>
                                <td><button className="user" onClick={() => navigate('/korisnik/'+korisnik.id)}>{korisnik.ime} {korisnik.prezime}</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
     );
}
 
export default KorisniciLista;