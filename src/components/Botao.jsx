
import React from 'react';

const Botao = ({ children, onClick, tipo }) => {
  const classes = `btn btn-${tipo || 'default'}`;
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Botao;
