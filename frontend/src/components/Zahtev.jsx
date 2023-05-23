import './css/Obavestenja.css';

const Zahtev = ({ zahtev }) => {
    return ( 
        <div className="obavestenje">
            <div className='obavestenje-header'>
                <h2>{zahtev.vremePodnosenja}</h2>
            </div>
            <p>{zahtev.sadrzaj}</p>
        </div>
     );
}
 
export default Zahtev;