import React from 'react';
import logo from '../imagen/logo2.png';
import "./estilos.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt='' className='logo'/>
      <h1 className='titulo'>SISTEMA DE CONSULTA</h1>
      <ul>
        <li><a href='/'>Inicio</a></li>
      </ul>
    </div>

  );
};

export default Navbar;