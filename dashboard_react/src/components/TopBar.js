import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../assets/css/formStyles.css'

import logo from '../assets/images/logoCompleto.png'

function TopBar() {
	const [modalStatus, setModalStatus] = useState(false);
	const [form, setForm] = useState();

	//Función para manejar los eventos onChange de los inputs.
	const handleChange = function(e){
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}
	return (
		<React.Fragment>
			<Modal
				status={modalStatus}
				changeStatus={setModalStatus}
				title="Iniciar sesión como administrador"
			>
				<form className='login-form'>
					<div>
						<label htmlFor='email'>Correo electrónico</label>
						<input type="email" name="email" id="email" autoComplete="off" onChange={ (e) => handleChange(e) }></input>
					</div>
					<div>
						<label htmlFor='password'>Contraseña</label>
						<input type="password" name="password" id="password" autoComplete="off" onChange={(e) => handleChange(e)}></input>
					</div>
					<small className='login-form__errors'> </small>
					<button className="btn btn-info">
						<i className="fas fa-sign-in-alt"></i> Iniciar sesión
					</button>
					<img src={logo} alt="Logo" style={{scale:'60%'}}/>
				</form>
			</Modal>

			<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
				{
					<ul className="navbar-nav ml-auto">
						<li className="nav-item dropdown no-arrow">
							<button className="btn btn-primary" onClick={ () => setModalStatus(!modalStatus) }>
								<i className="fas fa-sign-in-alt"></i> Iniciar sesión
							</button>
						</li>
					</ul>
				}
			</nav>
		</React.Fragment>
	)
}
export default TopBar;