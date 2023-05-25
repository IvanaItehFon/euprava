import axios from "axios";
import { useState, useEffect } from 'react';
import Obavestenje from "./Obavestenje";
import './css/Obavestenja.css';

const Obavestenja = ({ isAdmin }) => {
  const [obavestenja, setObavestenja] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/obavestenja', {
        params: {
          size: 3,
          page: currentPage
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setObavestenja(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteObavestenje = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/obavestenja/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(obavestenja)
  return (
    <div className="lista-obavestenja">
      <h1 style={{ fontSize: 'xx-large' }}>Obavestenja</h1>
      <div className="btn-container" style={{ width: '650px', justifyContent: 'space-between', display: 'flex' }}>
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

      {obavestenja.length>0 ? <>{obavestenja.map((obavestenje) => (
        <Obavestenje
          obavestenje={obavestenje}
          isAdmin={isAdmin}
          key={obavestenje.id}
          onDelete={() => deleteObavestenje(obavestenje.id)}
        />
      ))}</> : <><h1 style={{ margin: '20px' }}>Nema obaveštenja</h1></>} 
    </div>
  );
}

export default Obavestenja;
