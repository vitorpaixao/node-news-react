import React, { Component } from 'react';
import Request from 'superagent';

class Novo extends Component {

    constructor() {
        super();
        this.state = {
            message: "",
            sendstatus: false,
            sending: false
        };
        this.data = {
            name: undefined,
            description: undefined
        };
    }

    handleInputChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.data[name] = value;
        console.log('data onChange: ', this.data);
    }

    sendCredit = (e) => {
        e.preventDefault();
        console.log('data: ', this.data);

        Request
            .post('http://localhost:3000/articles')
            .set('Content-Type', 'application/json')
            .send(this.data)
            .on('progress', event => {
                this.setState({ sending: true });
                console.log('sending');
            })
            .end((error, res) => {
                this.setState({ sending: false });
                console.log('res', res);
                console.log('error', error);
                if (res.ok) {
                    this.setState({
                        message: 'Artigo cadastrado com sucesso',
                        sendstatus: () => {
                            return true
                        }
                    });
                    this.props.history.push('/novo/sucesso', this.state.message);
                } else {
                    this.setState({
                        message: 'Erro ao cadastrar artigo',
                        sendstatus: false
                    });
                }
                console.log('message: ', this.state.message);
            });
    }

    render() {

        return (
            <div className="row justify-content-md-center">

                <div className="col-lg-6 mt-4 pb-5">
                    <h2>Novo Artigo</h2>
                    <form className="box">

                        <div className="form-group">
                            <label htmlFor="name">Título</label>
                            <input onChange={this.handleInputChange} name="name" type="text" className="form-control" id="nomedocliente" aria-describedby="cpfhelp" placeholder="Digite o Nome do cliente" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <input onChange={this.handleInputChange} name="description" type="text" className="form-control" id="cpfdocliente" aria-describedby="cpfhelp" placeholder="Digite a descrição" />
                        </div>

                        {this.sending ? 'Enviando...' : null}
                        <p>{this.state.message}</p>

                        <button onClick={this.sendCredit} className="btn btn-info col">Salvar</button>
                    </form>

                </div>

            </div>
        );
    }
};

export default Novo;