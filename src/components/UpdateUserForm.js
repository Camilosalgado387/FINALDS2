import React, { useState, useEffect} from "react";
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

const ActualizarU = ({ user, onClose, onSubmit }) => {
  const [userData, setUserData] = useState({});
  const [emailError, setEmailError] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    setUserData(user || {});
    setEmailError("");
    setImage(user?.imagen || null);
  }, [user]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setUserData({ ...userData, email });
      setEmailError("");
    } else {
      setEmailError("Por favor, ingrese un correo electrónico válido.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserData({ ...userData, imagen: reader.result });
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("El archivo seleccionado no es válido.");
    }
  };

  const handleDeleteImage = () => {
    setUserData({ ...userData, imagen: null });
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User:", userData);
    onSubmit(userData);
  };

  const handleCancel = () => {
    setUserData({});
    setEmailError("");
    setImage(null);
    onClose();
  };

  return (
    <PopUp>
      <Modal>
        <ModalHeader>
          <ModalTitle>Actualizar Datos</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <form className="update-user-form" onSubmit={handleSubmit}>
            <Grid>
              <Field>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  value={userData.firstName || ""}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  value={userData.lastName || ""}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={userData.email || ""}
                  onChange={handleEmailChange}
                />
                {emailError && <p className="error">{emailError}</p>}
              </Field>
              <Field>
                <input
                  type="date"
                  name="birthDate"
                  placeholder="Fecha de Nacimiento"
                  value={userData.birthDate || ""}
                  onChange={handleInputChange}
                />
              </Field>
              <Field>
                <select
                  name="docType"
                  value={userData.docType || ""}
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
                  placeholder="Número de Documento"
                  value={userData.docNumber || ""}
                  onChange={handleInputChange}
                  maxLength="10"
                />
              </Field>
              <Field>
                <select
                  name="gender"
                  value={userData.gender || ""}
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
                  placeholder="Teléfono"
                  value={userData.phone || ""}
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

                {image && (
                  <React.Fragment>
                    <DeleteButton type="button" onClick={handleDeleteImage}>
                      Borrar
                    </DeleteButton>
                    <div style={{ marginBottom: "10px" }}></div>
                  </React.Fragment>
                )}
              </Field>
            </Grid>
            <ModalActions>
              <button type="submit">Guardar Cambios</button>
              <button type="button" onClick={handleCancel}>
                Cancelar
              </button>
            </ModalActions>
          </form>
        </ModalBody>
      </Modal>
      <GlobalStyles />
    </PopUp>
  );
};

export default ActualizarU;