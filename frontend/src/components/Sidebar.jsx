import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isAdmin, isLoggedin }) => {
    const [id, setID] = useState(1);
    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await axios
                    .get('http://localhost:8080/api/v1/korisnici/trenutni', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => {
                        // console.log(response.data.ime + response.data.id);
                        setID(response.data.id)
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchDataUser();
    });
    // console.log(id);
    // console.log(isAdmin);
    return (
        <div className="container">
            <div className="sidebar">
                <Link to={'/'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Euprava</Link>
                {isLoggedin ? <>
                    <Link to={'/login'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Odjavi se</Link>
                    {isAdmin &&<Link to={'/zahtevi'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Zahtevi</Link>}
                    <Link to={'/obavestenja'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Obaveštenja</Link>
                    {!isAdmin && <Link to={'/upozorenja'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Upozorenja</Link>}
                    {isAdmin && <Link to={'/korisnici'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Korisnici</Link>}
                    {!isAdmin && <Link to={'/korisnik/' + id} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Moj nalog</Link>}
                </> : <>
                    <Link to={'/login'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Prijavi se</Link>
                    <Link to={'/registracija'} style={{ textDecoration: 'none', fontSize: 'x-large' }}>Napravi nalog</Link>
                </>}
            </div>
        </div>
    );
}

export default Sidebar;