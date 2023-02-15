import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logoCompleto.png'

function SideBar(){

    return(
        <React.Fragment>
            <ul className="navbar-nav sidebar sidebar-dark accordion  sidebarColor" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src = { logo } alt="Logo" style={{ scale:'70%'}}/>
                    </div>
                </Link>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                        <br/>
                        <span>Hello My New Car</span></Link>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">Acciones</div>

                <li className="nav-item nav-link">
                <Link className="nav-link" to="/SearchProduct">
                        <i className="fas fa-fw fa-search"></i>
                        <span>Buscar producto</span></Link>
                </li>
                <hr className="sidebar-divider d-none d-md-block"/>

            </ul>
        </React.Fragment>
    )
}
export default SideBar;