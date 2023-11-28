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
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  height: 400px;
`;

const ConsultaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleTypeChange = (value) => {
    setSearchType(value);
  };

  const handleDateChange = (value) => {
    setSearchDate(value);
  };

  const handleNoneSearch = () => {
    // Limpiar los criterios de búsqueda
    setSearchTerm('');
    setSearchType('');
    setSearchDate('');
  };

  const handleSearchSubmit = () => {
    // Realizar acciones adicionales al enviar el formulario de búsqueda
    // Puedes usar searchTerm, searchType y searchDate en tu lógica de filtrado
  };

  const filteredPersons = datosDePrueba.filter((person) => {
    const termMatch = (person.Identificacion || "").toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatch = (person.tipodeDocumento || "").toLowerCase() === searchType.toLowerCase();
    const dateMatch = (person.FechaRegistro || "").includes(searchDate);

    if (searchTerm && searchType && searchDate) {
      return termMatch && typeMatch && dateMatch;
    } else if (searchTerm && searchType) {
      return termMatch && typeMatch;
    } else if (searchTerm && searchDate) {
      return termMatch && dateMatch;
    } else if (searchType && searchDate) {
      return typeMatch && dateMatch;
    } else if (searchTerm) {
      return termMatch;
    } else if (searchType) {
      console.log(typeMatch)
      return typeMatch;
    } else if (searchDate) {
      return dateMatch;
    } else {
      return true; // No hay criterios de búsqueda, mostrar todos los resultados
    }
  });

  return (
    <Container>
      <Navbar />
      <ContentContainer className='grande'>
        <SearchForm
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
          selectedType={searchType}
          onTypeChange={handleTypeChange}
          onDateChange={handleDateChange}
          onNoneSearch={handleNoneSearch}
        />
        <PersonCard listOfPersons={filteredPersons} />
      </ContentContainer>
    </Container>
  );
};

export default ConsultaPage;