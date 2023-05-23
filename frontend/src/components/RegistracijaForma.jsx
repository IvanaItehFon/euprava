const RegistracijaForma = ({ registerUser }) => {
    return ( 
        <div className="registracija-forma">
            <div className="login-form">
        <div className="form-group">
          <label style={{ color: "black" }}>Korisnicko ime: </label>
          <input
            type="text"
            className="form-control"
            id="username"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "black" }}>Lozinka: </label>
          <input
            type="password"
            className="form-control"
            id="password"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "black" }}>Ime: </label>
          <input
            type="text"
            className="form-control"
            id="ime"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "black" }}>Prezime: </label>
          <input
            type="text"
            className="form-control"
            id="prezime"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "black" }}>Email: </label>
          <input
            type="email"
            className="form-control"
            id="email"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "black" }}>JMBG: </label>
          <input
            type="text"
            className="form-control"
            id="jmbg"
            style={{ width: "260px", marginLeft: "20px", margin: "0px" }}
          />
        </div>
        <form action="">
          <input type="radio" name="gender" value="MUSKI" /> Muski<br />
          <input type="radio" name="gender" value="ZENSKI" /> Zenski<br />
        </form>
        <div className="side-form">
            
        </div>
        <div className="btn-container">
          <button
            type="submit"
            className="btn-login"
            id="login"
            style={{ margin: "10px", marginLeft: '75px' }}
            onClick={() => registerUser()}
          >
            Napravi nalog
          </button>
        </div>
      </div>
        </div>
     );
}
 
export default RegistracijaForma;