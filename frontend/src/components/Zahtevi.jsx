import { useEffect, useState } from "react";
import axios from "axios";
import './css/Obavestenja.css';
import Zahtev from "./Zahtev";
import { useNavigate } from "react-router-dom";

const Zahtevi = ({ isAdmin }) => {
    const navigate = useNavigate();
    const [zahtevi, setZahtevi] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [tip, setTip] = useState('SVI_ZAHTEVI');
    const [status, setStatus] = useState('SVI_ZAHTEVI');
    useEffect(() => {
        const fetchAllData = async (uslov) => {
            try {
                const response = await axios
                    .get('http://localhost:8080/api/v1/zahtevi' + uslov, {
                        params: {
                            size: 3,
                            page: currentPage
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => {
                        setZahtevi(response.data.content);
                        setTotalPages(response.data.totalPages);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        if (status === "SVI_ZAHTEVI") fetchAllData("");
        else fetchAllData('/statusZahteva/' + status);
    }, [currentPage, status]);
    useEffect(() => {
        const fetchAllData = async (uslov) => {
            try {
                const response = await axios
                    .get('http://localhost:8080/api/v1/zahtevi' + uslov, {
                        params: {
                            size: 3,
                            page: currentPage
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => {
                        setZahtevi(response.data.content);
                        setTotalPages(response.data.totalPages);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        if (tip === "SVI_ZAHTEVI") fetchAllData("");
        else fetchAllData('/tipUsluge/' + tip);
    }, [currentPage, tip]);
    console.log(zahtevi)
    return (
        <div className="lista-obavestenja">
            <h1 style={{ fontSize: 'xx-large', marginLeft: '190px' }}>Zahtevi</h1>
            <div className="btn-container" style={{ width: '760px', justifyContent: 'space-between', display: 'flex' }}>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>

                <div className="page-buttons">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            disabled={currentPage === index}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>



            </div>
            {isAdmin ? <table className="custom-table" style={{ height: "300px" }}>
                <thead>
                    <tr>
                        <th>Sadržaj</th>
                        <th>Status Zahteva</th>
                        <th>Tip Usluge</th>
                        <th>Vreme Podnošenja</th>
                        <th>Podnosilac</th>
                    </tr>
                </thead>
                <tbody>
                    {zahtevi &&
                        zahtevi.map((zahtev) => (
                            <tr key={zahtev.id} onClick={() => navigate('/zahtev/' + zahtev.id)}>
                                <td>{zahtev.sadrzaj}</td>
                                <td>{zahtev.statusZahteva}</td>
                                <td>{zahtev.tipUsluge}</td>
                                <td>{zahtev.vremePodnosenja}</td>
                                <td>
                                    <button
                                        className="user"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            navigate('/korisnik/' + zahtev.podnosilac.id);
                                        }}
                                    >
                                        {zahtev.podnosilac.ime} {zahtev.podnosilac.prezime}
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>:<table className="custom-table" style={{ height: "300px" }}>
                <thead>
                    <tr>
                        <th>Sadržaj</th>
                        <th>Status Zahteva</th>
                        <th>Tip Usluge</th>
                        <th>Vreme Podnošenja</th>
                        <th>Podnosilac</th>
                    </tr>
                </thead>
                <tbody>
                    {zahtevi &&
                        zahtevi.map((zahtev) => (
                            <tr key={zahtev.id} onClick={() => navigate('/zahtev/' + zahtev.id)}>
                                <td>{zahtev.sadrzaj}</td>
                                <td>{zahtev.statusZahteva}</td>
                                <td>{zahtev.tipUsluge}</td>
                                <td>{zahtev.vremePodnosenja}</td>
                                <td>
                                    <button
                                        className="user"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            navigate('/korisnik/' + zahtev.podnosilac.id);
                                        }}
                                    >
                                        {zahtev.podnosilac.ime} {zahtev.podnosilac.prezime}
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>}

            <div className="btn-container" style={{ width: '765px', justifyContent: 'space-between', display: 'flex'}}>
                <button onClick={() => setTip('IZDAVANJE_LICNE_KARTE')} className="uslov-btn">Zahtevi za izdavanje liče karte</button>
                <button onClick={() => setTip('IZDAVANJE_PASOSA')} className="uslov-btn">Zahtevi za izdavanje pasoša</button>
                <button onClick={() => setTip('SVI_ZAHTEVI')} className="uslov-btn">Svi zahtevi</button>
            </div>
            <div className="btn-container" style={{ width: '765px', justifyContent: 'space-between', display: 'flex' }}>
                <button onClick={() => setStatus('PRIMLJEN')} className="uslov-btn">Primljeni zahtevi</button>
                <button onClick={() => setStatus('U_OBRADI')} className="uslov-btn">Zahtevi u obradi</button>
                <button onClick={() => setStatus('RAZRESENO')} className="uslov-btn">Razreseni zahtevi</button>
                <button onClick={() => setStatus('SVI_ZAHTEVI')} className="uslov-btn">Svi zahtevi</button>
            </div>
        </div>
    );
}

export default Zahtevi;