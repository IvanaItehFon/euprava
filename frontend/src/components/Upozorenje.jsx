import './css/Obavestenja.css';

const Upozorenje = ({ upozorenje }) => {
    return ( 
        <div className="obavestenje">
            <div className='obavestenje-header'>
                <h2>{upozorenje.vreme}</h2>
            </div>
            <p>{upozorenje.sadrzaj}</p>
        </div>
     );
}
 
export default Upozorenje;