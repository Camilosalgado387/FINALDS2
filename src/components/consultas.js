import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './Busqueda';
import PersonCard from './resultadoConsulta';
import Navbar from './Navegacion'; 
import { datosDePrueba } from './datosprueba';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
`;

const ContentContainer = styled.div`

width: 100%;
max-width: 1200px;
margin: 0 auto;
margin-bottom: 20px; 
background-color: #ffffff; /* Color de fondo */
padding: 10px; /* Espaciado interno */
border-radius: 8px; /* Bordes redondeados */
height: 400px;

`;

const ConsultaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = () => {
    // Puedes realizar acciones adicionales al enviar el formulario de búsqueda
  };

  const filteredPersons = datosDePrueba.filter((person) =>
  (person.Identificacion || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
   
    <Container>
      <Navbar/>
      <ContentContainer className='grande'>
        <SearchForm
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <PersonCard listOfPersons={filteredPersons} />
      </ContentContainer>
    </Container>
  );
};

export default ConsultaPage;
