import React from 'react';
import styled from 'styled-components';
import { FiCalendar,  FiPhone, FiMail, FiBook, FiCreditCard } from 'react-icons/fi';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Name = styled.h2`
  margin-bottom: 10px;
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin: 20px 0;
`;

const Column = styled.div`
  flex: 1;
`;

const IconText = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  svg {
    margin-right: 10px;
  }
`;

const PersonDetailModal = ({ person, onClose }) => (
  <ModalOverlay>
    <ModalContent>
      <CloseButton onClick={onClose}>×</CloseButton>
      <Name>{person.nombre} {person.apellido}</Name>
      <Divider />
      <InfoSection>
        <Column>
          <IconText><FiCalendar />  {person.birthDate}</IconText>
          <IconText><FiBook />  {person.genero}</IconText>
          <IconText><FiPhone /> {person.telefono}</IconText>
        </Column>
        <Column>
          <IconText><FiMail />  {person.correo}</IconText>
          <IconText><FiCreditCard />{person.tipodeDocumento}</IconText>
          <IconText><FiCreditCard /> {person.Identificacion}</IconText>
        </Column>
      </InfoSection>
    </ModalContent>
  </ModalOverlay>
);

export default PersonDetailModal;

