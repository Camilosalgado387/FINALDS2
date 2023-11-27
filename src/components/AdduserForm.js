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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from  '../imagen/logo2.png'

const AdduserForm = () => {
  const [user, setUser] = useState({});
  const [emailError, setEmailError] = useState("");
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setUser({ ...user, email });
      setEmailError("");
    } else {
      setEmailError("Por favor, ingrese un correo electrónico válido.");
    }
  };

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
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

    // Validaciones adicionales
    if (!isNumeric(user.docNumber) || user.docNumber.length > 10) {
      toast.error("Número de Documento inválido");
      return;
    }

    if (isNumeric(user.firstName) || user.firstName.length > 30) {
      toast.error("Primer Nombre inválido");
      return;
    }

    if (isNumeric(user.lastName) || user.lastName.length > 60) {
      toast.error("Apellidos inválidos");
      return;
    }

    if (!isNumeric(user.phone) || user.phone.length !== 10) {
      toast.error("Número de Celular inválido");
      return;
    }

    if (!validateFileSize(image) || !user.docType || !user.firstName || !user.lastName || !user.email || !user.birthDate || !user.gender || !user.phone) {
      toast.error("Por favor, complete todos los campos y asegúrese de que la imagen sea menor o igual a 2MB.");
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
                  onChange={handleEmailChange}
                />
                {emailError && <p className="error">{emailError}</p>}
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
                  maxLength="10"
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
                  maxLength="10"
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
    </PopUp>
    
  );
};

export default AdduserForm;