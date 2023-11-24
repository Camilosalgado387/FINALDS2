import React from "react";
import './pp.css'
import {useNavigate} from 'react-router-dom';

const Pp =()=> {
  const navigate = useNavigate();

  const Add =()=>{
    navigate('/Add')
  }
  const Upd = ()=>{
    navigate('/consulta')
  }
  
  return (
    <div>
      <h1>CRUD</h1>
      <div className="contenedor">
       <button type="submit" onClick={Add}>Registro</button>
       <button type="submit" onClick={Upd}>Consulta</button>
      </div>
    </div>
  );
}
export default Pp;