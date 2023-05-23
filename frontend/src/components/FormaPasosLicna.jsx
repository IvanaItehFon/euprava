const FormaPasosLicna = ({ setBrojPasosa, setbrojLicneKarte, setDatumIzdavanjaPasosa, setDatumIzdavanjaLicne, setDatumVazenjaPasosa, setDatumVadjenjaLicne}) => {
    return ( 
        <div className="forma-pasos-licna">
            <div className="dokument-forma">
          <input type="text" placeholder="Broj pasosa" id="brojPasosa" onChange={() => setBrojPasosa(document.getElementById('brojPasosa').value)}/>
          <div className="datum">
            <label htmlFor="datum-izdavanja">Datum izdavanja</label>
            <input type="date" id="datum-izdavanja-pasosa" onChange={() => setDatumIzdavanjaPasosa(document.getElementById('datum-izdavanja-pasosa').value)}/>
          </div>
          <div className="datum">
            <label htmlFor="datum-vazenja">Datum vazenja</label>
            <input type="date" id="datum-vazenja-pasosa" onChange={() => setDatumVazenjaPasosa(document.getElementById('datum-vazenja-pasosa').value)}/>
          </div>
        </div>
        <div className="dokument-forma">
          <input type="text" placeholder="Broj licne karte" id="brojLicneKarte" />
          <div className="datum">
            <label htmlFor="datum-izdavanja">Datum izdavanja</label>
            <input type="date" id="datum-izdavanja-licne" onChange={() => setDatumIzdavanjaLicne(document.getElementById('datum-izdavanja-licne').value)}/>
          </div>
          <div className="datum">
            <label htmlFor="datum-vazenja">Datum vazenja</label>
            <input type="date" id="datum-vazenja-licne" onChange={() => setDatumVadjenjaLicne(document.getElementById('datum-vazenja-licne').value)}/>
          </div>
        </div>
        </div>
     );
}
 
export default FormaPasosLicna;