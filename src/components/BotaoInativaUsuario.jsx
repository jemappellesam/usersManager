import React from 'react';
import Botao from './Botao.jsx';

const BotaoInativaUsuario = ({ acao, usuario }) => {
  return (
    <Botao onClick={() => acao(usuario.id)} tipo="danger">
      Desativar
    </Botao>
  );
};

export default BotaoInativaUsuario;
