import React, { useState } from 'react';
import './AdduserForm.css'


const AdduserForm = () => {
    const initialFormState = {
        docType: '', docNumber: '', firstName: '', secondName: '', lastName: '', birthDate: '', gender: '', email: '', phone: ''
    };
    const [user, setUser] = useState(initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!user.docType || !user.docNumber || !user.firstName || !user.lastName || !user.birthDate || !user.gender || !user.email || !user.phone) return;
        // Aquí puedes añadir la lógica para añadir el usuario a tu base de datos
    };

    //Validaciones basicas
    const validaciones = (event) => {
        if (event.target.name === 'docNumber' && !/[0-9]/.test(event.key)) {
            event.preventDefault();
        } else if (event.target.name === 'firstName' && !/[a-zA-Z]/.test(event.key)) {
            event.preventDefault();
        } else if (event.target.name === 'secondName' && !/[a-zA-Z]/.test(event.key)) {
            event.preventDefault();
        } else if (event.target.name === 'lastName' && !/[a-zA-Z]/.test(event.key)) {
            event.preventDefault();
        } else if (event.target.name === 'phone' && !/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    };

    //Validaciones de correo
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setUser({ ...user, email: value });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Email doesn\'t match');
        } else {
            setEmailError('');
        }
    };
    //Validacion de imagen
    const [image, setImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
            if (file.size > 2 * 1024 * 1024) { 
                alert('File is too large! Please select a file smaller than 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <form className='AddUserForm' onSubmit={handleSubmit}>
            <label>Tipo de Documento</label>
            <select name="docType" value={user.docType} onChange={handleInputChange}>
                <option value="">Selecciona...</option>
                <option value="cc">Cedula</option>
                <option value="ti">Tarjeta de Identidad</option>
            </select>
            <label>Número de Documento</label>
            <input type="text" name="docNumber" value={user.docNumber} onChange={handleInputChange} maxLength="10" onKeyPress={validaciones} />
            <label>Primer Nombre</label>
            <input type="text" name="firstName" value={user.firstName} onChange={handleInputChange} maxLength="30" onKeyPress={validaciones} />
            <label>Segundo Nombre</label>
            <input type="text" name="secondName" value={user.secondName} onChange={handleInputChange} maxLength="30" onKeyPress={validaciones} />
            <label>Apellidos</label>
            <input type="text" name="lastName" value={user.lastName} onChange={handleInputChange} maxLength="60" onKeyPress={validaciones} />
            <label>Fecha de Nacimiento</label>
            <input type="date" name="birthDate" value={user.birthDate} onChange={handleInputChange} />
            <label>Género</label>
            <select name="gender" value={user.gender} onChange={handleInputChange}>
                <option value="">Selecciona...</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
                <option value="n">No binario</option>
                <option value="p">Prefiero no reportar</option>
            </select>
            <label>Correo</label>
            <input type="email" name="email" value={user.email} onChange={handleEmailChange} />{emailError && <div className="error">{emailError}</div>}
            <label>Celular</label>
            <input type="tel" name="phone" value={user.phone} onChange={handleInputChange} maxLength="10" onKeyPress={validaciones} />
            <input type="file" name="imagen"accept=".jpg,.png" onChange={handleImageChange} />
            {image && <img src={image} alt="Preview" />}
            <button>Añadir nuevo usuario</button>
            
        </form>
    );
};

export default AdduserForm;