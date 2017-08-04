import React from 'react';
import { Link } from 'react-router-dom';

const NovoSuccess = ({ match }) => {
    //console.log(this.props.match);
    console.log(match);
    return (
        <div>
            Crédito efetuado com sucesso.
            <Link to="/credito">Fazer novo crédito</Link>
        </div>
    );
};

export default NovoSuccess;