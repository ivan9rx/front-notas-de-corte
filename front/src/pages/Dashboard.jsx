import React, { useEffect, useState } from 'react';
import './Template.css';

import ListUsuarios from '../components/admin/listUsuarios';
import ListCursos from '../components/admin/listCursos';
import CadCurso from '../components/admin/cadCurso';
import CadUsuario from '../components/admin/cadUsuario';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function App() {
  const [userRole, setUserRole] = useState(null); // Adicione este estado

  function logOut() {
    const confirmLogout = window.confirm('Você está prestes a fazer logout do sistema. Deseja continuar?');
    if (confirmLogout) {
      localStorage.clear();
      window.location.reload();
    }
  }



  useEffect(() => {
    // Busque o papel do usuário do localStorage quando o componente for montado
    const user = JSON.parse(localStorage.getItem('@Auth:user'));
    const role = user ? user.nivelacesso : null;
    setUserRole(role);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sistema de notas de corte</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {userRole === 'Admin' && ( // Renderize condicionalmente os links
                <>
                  <li className="nav-item">
                    <Link className='nav-link btn' to='/admin/gerenciar-usuarios'>Gerenciar usuários</Link>
                  </li>
                  <li className="nav-item">
                    <Link className='nav-link btn' to='/admin/gerenciar-cursos'>Gerenciar cursos</Link>
                  </li>
                </>
              )}
            </ul>
            <li className="nav-item">
              <button onClick={logOut} >Sair</button>
            </li>
          </div>
        </div>
      </nav>


      <section className="container mt-5 center-content">
        <div className="bg-light p-5 rounded">
          {userRole === 'Admin' && (
            <Alert variant="alert">
              Olá, você é um admin, aqui você pode cadastrar novos admins e também gerenciar os cursos a serem exibidos na dashboard de nossos usuários
            </Alert>
          )}
          {userRole === 'Cliente' && (
            <ListCursos />
          )}
        </div>
      </section>
    </>
  );
}

export default App;
