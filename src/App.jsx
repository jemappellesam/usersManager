import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import BotaoInativaUsuario from './components/BotaoInativaUsuario.jsx';
import BotaoAtivaUsuario from './components/BotaoAtivaUsuario.jsx';
import Cabecalho from './components/Cabecalho.jsx';
import Rodape from './components/Rodape.jsx';
import TituloDaPagina from './components/TituloDaPagina.jsx';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/usuarios`)
      .then(res => {
        setUsuarios(res.data);
      })
      .catch(err => {
        console.log(err);
        setErro("Não foi possível carregar a lista de usuários.");
      });
  }, []);

  function mascararEmail(email) {
    let emailMascarado = email[0];
    let mostrarCaracter = false;

    for (let i = 1; i < email.length; i++) {
      if (email[i] === '@') {
        mostrarCaracter = true;
      }

      if (!mostrarCaracter) {
        emailMascarado += '*';
      } else {
        emailMascarado += email[i];
      }
    }

    return emailMascarado;
  }

  function inativarUsuario(id) {
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 0 })
      .then(res => {
        console.log(res.data);
        setUsuarios(prevUsuarios =>
          prevUsuarios.map(usuario =>
            usuario.id === id ? { ...usuario, ativo: 0 } : usuario
          )
        );
      })
      .catch(err => {
        console.log(err);
        setErro("Não foi possível atualizar os dados do usuário.");
      });
  }

  function ativarUsuario(id) {
    axios.patch(`http://localhost:3000/usuarios/${id}`, { ativo: 1 })
      .then(res => {
        console.log(res.data);
        setUsuarios(prevUsuarios =>
          prevUsuarios.map(usuario =>
            usuario.id === id ? { ...usuario, ativo: 1 } : usuario
          )
        );
      })
      .catch(err => {
        console.log(err);
        setErro("Não foi possível atualizar os dados do usuário.");
      });
  }

  return (
    <>
      <Cabecalho />

      <main className='container-lg mt-5'>
        <div className='row'>
          <div className='col'>
            <TituloDaPagina titulo="Usuários Cadastrados" />
            {erro && <div className='alert alert-danger'>{erro}</div>}
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Usuário GH</th>
                  <th>E-mail</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.login}</td>
                    <td>{mascararEmail(usuario.email)}</td>
                    <td>
                      {usuario.ativo === 1
                        ? <BotaoInativaUsuario acao={inativarUsuario} usuario={usuario}>Desativar</BotaoInativaUsuario>
                        : <BotaoAtivaUsuario acao={ativarUsuario} usuario={usuario}>Ativar</BotaoAtivaUsuario>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Rodape />
    </>
  );
}

export default App;
