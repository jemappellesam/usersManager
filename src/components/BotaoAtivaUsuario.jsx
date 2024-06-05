import React from 'react';
import Botao from './Botao.jsx';

const BotaoAtivaUsuario = ({ acao, usuario }) => {
  return (
    <Botao onClick={() => acao(usuario.id)} tipo="success">
      Ativar
    </Botao>
  );
};

export default BotaoAtivaUsuario;
