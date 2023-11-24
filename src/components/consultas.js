import React, { useState } from 'react';
import styled from 'styled-components';
import SearchForm from './Busqueda';
import PersonCard from './resultadoConsulta';
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
  width: 100%; /* Ancho del contenido ajustable según tus necesidades */
  max-width: 800px; /* Ancho máximo para evitar que se extienda demasiado */
  margin-bottom: 20px; /* Espaciado inferior para separar del borde inferior del contenedor principal */
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
    person.identificacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <ContentContainer>
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
