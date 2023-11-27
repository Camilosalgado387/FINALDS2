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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User:", user);
    // Aquí puedes agregar el código para agregar el usuario al sistema
  };

  return (
    <PopUp>
      <Modal>
        <ModalHeader>
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