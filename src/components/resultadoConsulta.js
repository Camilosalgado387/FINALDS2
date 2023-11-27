import styled from 'styled-components';
import { FiUser, FiPhone, FiMail, FiTrash2, FiInfo, FiEdit } from 'react-icons/fi';
import PersonDetailModal from './personDetailPerson';
import React, { useState } from 'react';
import ActualizarU from './UpdateUserForm';


const StyledCard = styled.div`
position: relative;
width: 100%;
max-width: 400px;
display: flex;
background-color: #ffffff;
border: 1px solid #ddd;
border-radius: 8px;
overflow: hidden;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
box-sizing: border-box;
padding: 20px;
transition: all 0.2s ease-in-out;
cursor: pointer;

&:hover {
  transform: scale(1.05);
}
`;


const MenuContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, 0.5);/* Color verde con opacidad */
  display: flex;
  align-items: center;
  justify-content: space-around;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;

  &:hover {
    color: #ffffff; /* Cambia el color del icono al pasar el cursor sobre el botón */
  }
`;






const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;

`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  max-height: 400px;
  overflow-y: auto;
`;


const CardContent = styled.div`
flex: 1;
padding: 16px;
display: flex;
flex-direction: column;
`;

const Image = styled.img`
width: 200px; /* Ajusta el ancho de la imagen según tus necesidades */
height: 200px; /* Ajusta la altura de la imagen según tus necesidades */
object-fit: cover;
border-radius: 8px 0 0 8px; /* Ajusta la redondez de las esquinas según tus preferencias */
`;

const Icon = styled.span`
  margin-right: 8px;
  font-size: 18px;
  color: #4CAF50; /* Color azul similar al usado por Bootstrap para enlaces */
`;

const Title = styled.h5`
  font-size: 1.25rem; /* Tamaño de fuente similar al utilizado por Bootstrap para títulos de tarjetas */
  margin-bottom: 0.75rem;
`;

const Text = styled.p`
  margin: 0;
  color: ${(props) => props.color || '#000000'};
`;

const SmallText = styled.small`
  color: #6c757d; /* Color de texto secundario utilizado por Bootstrap */
`;

const PersonCard = ({ listOfPersons }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const openModal = (person) => {
    setSelectedPerson(person);
    setShowModal(true);
  };

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  return (
    <Container className='lista'>
      <ContentContainer>
        <GridContainer>
          {listOfPersons.map((person, index) => (
            <StyledCard key={index}>
              <MenuContainer>
                <MenuButton>
                  <FiTrash2 />
                </MenuButton>
                <MenuButton onClick={() => openModal(person)}>
                  <FiInfo />
                </MenuButton>
                <MenuButton onClick={() => openEditModal()}>
                  <FiEdit />
                </MenuButton>
              </MenuContainer>
              <Image src={person.imagen} alt={`Imagen de ${person.nombre}`} />
              <CardContent>
                <Title>
                  <Icon as={FiUser} /> {person.nombre} {person.apellido}
                </Title>
                <Text color="#555">
                  <Icon as={FiPhone} /> {person.telefono}
                </Text>
                <Text color="#777">
                  <Icon as={FiMail} /> {person.correo}
                </Text>
                <SmallText>Last updated 3 mins ago</SmallText>
              </CardContent>
            </StyledCard>
          ))}
        </GridContainer>
      </ContentContainer>
      {showModal && (
        <PersonDetailModal person={selectedPerson} onClose={() => setShowModal(false)} />
      )}
      {editModalVisible && (
        <ActualizarU 
          user={selectedPerson}
          onClose={closeEditModal}
          onSubmit={(editedUser) => {
            // Aquí puedes manejar la lógica para actualizar el usuario
            // en tu lista de personas
            console.log(selectedPerson)
            console.log("Usuario editado:", editedUser);
            closeEditModal();
          }}
        />
      )}
    </Container>
  );
};

export default PersonCard;