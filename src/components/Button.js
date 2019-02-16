import React from 'react';
import PropTypes from 'prop-types';


const Button = ({className, text, disabled, onClick }) => (
 <button disabled={disabled}
 className={`button-common ${className}`}
 onClick={onClick} >
 {text}
 </button>
);
// Valores por defecto en caso de que no se pase alguna propiedad.
Button.defaultProps = {
 className: ''
};
// Validar tipo de las propiedades.
// Indicar que propiedades son obligatorias.
// ...
Button.propTypes = {
 className: PropTypes.string,
 onClick: PropTypes.func.isRequired,
 value: PropTypes.string
}


export default Button; 