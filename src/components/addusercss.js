import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const InputName = styled.input``

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: 'Poppins',sans-serif;
  }

  body, html, #root{
    font-weight: 400;
  }

  button {
    outline: none !important;
    border: none;
    background: #4CAF50;
    &:hover {
      cursor: pointer; 
    }
  }

  input, select{
    width: 100%;
    border-radius: 8px;
    padding: 8px;
    box-sizing: border-box;
    box-shadow: 0.5px 0.5px #ccc;
    border: 1px solid #ccc;
    &:focus {
      outline: 0 none;
      border: 2px solid #A4FFB0;
    }
    &:disabled {
      cursor: not-allowed
    }
  }
  
 
  
  ::-webkit-scrollbar {
      width: 20px;
  }

  ::-webkit-scrollbar-track {
      background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
      background-color: rgb(107, 114, 128);
      border-radius: 20px;
      border: 6px solid transparent;
      background-clip: content-box;
  }
`

export const Field = styled.label`
  font-size: 12px;
  white-space: normal !important;
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px; 
    box-sizing: border-box;
    margin-top: 5px; 
    display: block;
    margin: 0 auto;
  
  
  select:hover {
    background-color: #2B9E3B; /* Cambiar el color de fondo al pasar el cursor */
  }

  select option {
    background-color: #fff;
    color: #333; 
    
  }
  
  select option:hover {
    background-color: #4CAF50; /* Cambiar el color de fondo al pasar el cursor */
    color: #fff;
  }
}

  &:has(${InputName}) {
    grid-column: 1/3;
  }
  
`;

export const PopUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const Modal = styled.div`
  background-color: white;
  opacity: 1;
  position: center;
  border-radius: 15px;
  padding: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
`;

export const ModalBody = styled.div`
  padding-top: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
`;

export const ModalHeader = styled.div`
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

export const ModalTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
`;

export const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  transition: border 0.3s ease;

  &:hover {
    border-color: #8f94fb;
  }
`;

export const StyledFileInput = styled.input`
  position: absolute;
  font-size: 100px;
  opacity: 0;
  cursor: pointer;
`;

export const PreviewImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const PreviewImage = styled.img`
max-width: 100px;
max-height: 100px;
border-radius: 5px;
margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 15px rgba(143, 148, 251, 0.7);
  }
`;
export const DeleteButton = styled.button`
  background-color: #ff4f4f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff6b6b;
  }
`;