import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        < nav className="navbar navbar-expand-lg bg-warning" >
        <div className="container-fluid">
            <a className="navbar-brand" >LOGO</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/register' className="nav-link" >Registrar</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/login' className="nav-link" >Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/user/profile' className="nav-link" aria-disabled="true">Perfil</Link>
                    </li>
                </ul>
            </div>
        </div>
      </nav >
    )
}

export default NavBar