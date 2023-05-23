import './css/Obavestenja.css';
import axios from 'axios';

const Obavestenje = ({ obavestenje, isAdmin, onDelete }) => {
    const brisanjeObavestenja = async (id) => {
      try {
        const response = await axios.delete(
          "http://localhost:8080/api/v1/obavestenja/" + id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        console.log(response.data);
        onDelete(id); // Notify the parent component about the deletion
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div className="obavestenje">
        <div className="obavestenje-header">
          <h2>{obavestenje.vremeObjavljivanja}</h2>
        </div>
        <p>{obavestenje.sadrzaj}</p>
        {isAdmin && (
          <button onClick={() => brisanjeObavestenja(obavestenje.id)}>
            Delete
          </button>
        )}
      </div>
    );
  };
 
export default Obavestenje;