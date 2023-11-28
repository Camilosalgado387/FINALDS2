import React, { useState } from "react";
import {
  Grid,
  Field,
  ModalBody,
  Modal,
  PopUp,
  GlobalStyles,
  ModalActions,
  FileInputWrapper,
  StyledFileInput,
  PreviewImage,
  ModalHeader,
  ModalTitle,
  PreviewImageWrapper,
  DeleteButton,
} from "./addusercss";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from  '../imagen/logo2.png'

const AdduserForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    docType: "",
    docNumber: "",
    gender: "",
    phone: "",
    imagen: null,
  });
  //const [emailError, setEmailError] = useState("");
  const [image, setImage] = useState(null);

  /*const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };*/

  const isNumeric = (value, maxLength) => {
    const regex = new RegExp(`^\\d{1,${maxLength}}$`);
    return regex.test(value);
  };
  
  const isAlphabetic = (value, maxLength) => {
    const regex = new RegExp(`^\\D{1,${maxLength}}$`);
    return regex.test(value);
  };
  
  const isPhoneNumber = (value) => /^\d{10}$/.test(value);
  
  const isEmail = (value) => {
    const regex = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(value).toLowerCase());
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    let isValid = true;
    let errorMessage = "";
  
    switch (name) {
      case "docNumber":
        isValid = isNumeric(value, 10);
        errorMessage = "Número de Documento inválido. Debe contener solo dígitos y tener hasta 10 caracteres.";
        break;
      case "firstName":
        isValid = isAlphabetic(value, 30);
        errorMessage = "Dato invalido. No debe contener caracteres numéricos y contener hasta 30 caracteres.";
        break;
      case "lastName":
        isValid = isAlphabetic(value, 60);
        errorMessage = "Dato invalido. No debe contener caracteres numéricos y contener hasta 60 caracteres.";
        break;
      case "phone":
        isValid = isPhoneNumber(value);
        errorMessage = "Número de Celular inválido. Debe contener solo 10 dígitos.";
        break;
      case "email":
        isValid = isEmail(value);
        errorMessage = "Por favor, ingrese un correo electrónico válido.";
        break;
      default:
        break;
    }
  
    if (!isValid) {
      toast.error(errorMessage);
    }
  
    // Actualiza el estado con el nuevo valor independientemente de si es válido o no
    setUser({ ...user, [name]: value });
  };
  

  

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Verificar si 'file' es un Blob
    if (file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUser({ ...user, imagen: reader.result });
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("El archivo seleccionado no es válido.");
    }
  };

  const handleDeleteImage = () => {
    setUser({ ...user, imagen: null });
    setImage(null);
  };

  const validateFileSize = (file) => {
    const maxSize = 2 * 1024 * 1024; // 2 MB
    return file.size <= maxSize;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     
    // Validar si todos los campos requeridos están completos
  if (!user.firstName || !user.lastName || !user.email || !user.birthDate || !user.docType || !user.docNumber || !user.gender || !user.phone) {
    toast.error("Todos los campos son obligatorios. Por favor, complete todos los campos antes de enviar el formulario.");
    return;
  }
    console.log("User:", user);
    // Agregar código para agregar el usuario al sistema
  };
  return (
   
    <PopUp>
      <Modal>
        <ModalHeader>
          <div className="logo-section">
            <img src={logo} alt="Logo" className="modal-logo" />
          </div>
          <ModalTitle>Registro</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form className="add-user-form" onSubmit={handleSubmit}>
            <Grid>
              <Field>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  value={user.firstName}
                  onChange={handleInputChange}
                  
                />
              </Field>
              <Field>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={user.lastName}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={user.email}
                  onChange={handleInputChange}
                />
                
              </Field>
              <Field>
                <input
                  type="date"
                  name="birthDate"
                  placeholder="Fecha de Nacimiento "
                  value={user.birthDate}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <select
                  name="docType"
                  value={user.docType}
                  placeholder="Tipo de Documento"
                  onChange={handleInputChange}
                >
                  <option value="">Tipo de Documento...</option>
                  <option value="cc">Cedula</option>
                  <option value="ti">Tarjeta de Identidad</option>
                </select>
              </Field>
              <Field>
                <input
                  type="text"
                  name="docNumber"
                  value={user.docNumber}
                  placeholder="Número de Documento"
                  onChange={handleInputChange}
                  
                />
              </Field>
              <Field>
                <select
                  name="gender"
                  value={user.gender}
                  onChange={handleInputChange}
                  placeholder="Género"
                >
                  <option value="">Género...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                </select>
              </Field>
              <Field>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  placeholder="Teléfono"
                  onChange={handleInputChange}
                  
                />
              </Field>
              <Field>
                <FileInputWrapper>
                  <StyledFileInput
                    type="file"
                    name="imagen"
                    onChange={handleImageChange}
                    disabled={Boolean(image)}
                  />
                  ¡Arrastra y suelta o selecciona un archivo!
                  <PreviewImageWrapper>
                    {image && (
                      <PreviewImage
                        src={image}
                        alt="Preview"
                        className="preview-image"
                      />
                    )}
                  </PreviewImageWrapper>
                </FileInputWrapper>

                {/* Botón fuera del FileInputWrapper */}
                {image && (
                  <React.Fragment>
                    <DeleteButton type="button" onClick={handleDeleteImage}>
                      Borrar
                    </DeleteButton>
                    {/* Agrega espacio adicional */}
                    <div style={{ marginBottom: "10px" }}></div>
                  </React.Fragment>
                )}
              </Field>
            </Grid>
            <ModalActions>
              <button type="submit">Agregar Usuario</button>
            </ModalActions>
          </form>
        </ModalBody>
      </Modal>
      <GlobalStyles />
      <ToastContainer />
    </PopUp>
    
  );
};

export default AdduserForm;