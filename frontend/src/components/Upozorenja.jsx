import axios from "axios";
import './css/Obavestenja.css';
import { useEffect, useState } from "react";
import Upozorenje from "./Upozorenje";

const Upozorenja = () => {
    const [upozorenja, setUpozorenja] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios
            .get('http://localhost:8080/api/v1/upozorenja', {
              params: {
                size: 3,
                page: currentPage
              },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(response => {
              setUpozorenja(response.data.content);
              setTotalPages(response.data.totalPages);
            })
            .catch(error => {
              console.error(error);
            });
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, [currentPage]);
      console.log(upozorenja)
    return ( 
        <div className="lista-obavestenja">
          <h1 style={{fontSize: 'xx-large'}}>Upozorenja</h1>
          <div className="btn-container" style={{ width:'650px', justifyContent: 'space-between', display: 'flex' }}>
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
          { upozorenja?.length >0 ?
            upozorenja.map((upozorenje) => (
              <Upozorenje upozorenje={upozorenje} key={upozorenje.id}/>
            )) : <><h1>Nema upozorenja</h1></>}
        </div>
     );
}
 
export default Upozorenja;