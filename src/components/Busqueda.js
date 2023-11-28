import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
`;

const RadioText = styled.span`
  margin-left: 5px;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const ResetButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const SearchForm = ({ searchTerm, onSearchChange, selectedType, onTypeChange, onDateChange, onReset }) => (
  <Form>
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Buscar por identificación"
    />
    <RadioContainer>
      <RadioLabel>
        <RadioInput
          type="radio"
          name="tipoIdentificacion"
          value="cc"
          checked={selectedType === 'cc'}
          onChange={() => onTypeChange('cc')}
        />
        <RadioText>Cedula</RadioText>
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          name="tipoIdentificacion"
          value="ti"
          checked={selectedType === 'ti'}
          onChange={() => onTypeChange('ti')}
        />
        <RadioText>Tarjeta de Identidad</RadioText>
      </RadioLabel>
      <RadioLabel>
        <RadioInput
          type="radio"
          name="tipoIdentificacion"
          value=""
          checked={!selectedType}
          onChange={() => onTypeChange('')}
        />
        <RadioText>None</RadioText>
      </RadioLabel>
    </RadioContainer>
    <Input
      type="date"
      onChange={(e) => onDateChange(e.target.value)}
      placeholder="Buscar por fecha de registro"
    />
    <ResetButton type="button" onClick={onReset}>Reset</ResetButton>
  </Form>
);

export default SearchForm;
