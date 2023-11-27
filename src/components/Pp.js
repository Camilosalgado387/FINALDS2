import React from "react";
import './pp.css'
import { useNavigate } from 'react-router-dom';
import logo from '../imagen/logo2.png'

const Pp = () => {
  const navigate = useNavigate();

  const Add = () => {
    navigate('/Add')
  }

  const Upd = () => {
    navigate('/consulta')
  }

  return (
    <div className="main-container">
      <div className="background-image">
        {/* Tu imagen de fondo transparente */}
      </div>
      <div className="content">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <p>Una aplicación dedicada a la gestión eficiente y segura de datos personales, brindando control y privacidad a los usuarios en la administración de su información.</p>
        </div>
        
        <div className="button-container">
          <button type="submit" onClick={Add}>Registro</button>
          <button type="submit" onClick={Upd}>Consulta</button>
        </div>
      </div> 
    </div>
  );
}

export default Pp;
