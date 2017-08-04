import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter,
    Link
} from 'react-router-dom';

import './assets/css/App.css';

import Noticias from './components/Noticias';
import Novo from './components/Novo';
import Edit from './components/Edit';
import Noticia from './components/Noticia';
import NovoSuccess from './components/NovoSuccess';

import Auth from '../src/data/Partner.json';

const partnerAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

const Header = withRouter(({ history }) => (
    partnerAuth.isAuthenticated ? (

        <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
            <button className="navbar-toggler navbar-toggler-right hidden-lg-up collapsed" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
                aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link to="/" className="navbar-brand">
                <img src="favicon.ico" alt="ReactJS" width="20" height="20" />
            </Link>

            <div className="navbar-collapse collapse" id="navbarsExampleDefault" aria-expanded="false">
                <ul className="navbar-nav mr-auto">

                    <div className="nav-item active">
                        <Link to="/" className="nav-link">Dashboard</Link>
                    </div>
                    <div className="nav-item">
                        <Link className="nav-link" to="/news">News</Link>
                    </div>
                    <div className="nav-item">
                        <Link className="nav-link" to="/novo">Novo Crédito</Link>
                    </div>

                </ul>
                <div className="nav-item">
                    <button className="btn btn-info btn-xs" onClick={() => { partnerAuth.signout(() => history.push('/')) }}>Sair</button>
                </div>
            </div>
        </nav>
    ) : (
            <div></div>
        )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        partnerAuth.isAuthenticated ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

class Login extends React.Component {

    state = {
        redirectToReferrer: false
    }

    login = () => {

        if (Auth[0].login === this.state.login && Auth[0].senha === this.state.pass) {
            partnerAuth.authenticate(() => {
                this.setState({ redirectToReferrer: true })
            })
        } else {
            console.log('Login incorreto...');
        }

    }

    setLogin = (event) => {
        this.setState({ login: event.target.value });
    }

    setPass = (event) => {
        this.setState({ pass: event.target.value });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div className="Login form-signin">

                <h2 className="form-signin-heading">Login</h2>
                <label htmlFor="inputLogin" className="sr-only">Login</label>
                <input onChange={this.setLogin} type="email" id="inputLogin" className="form-control" placeholder="Digite seu login" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Senha</label>
                <input onChange={this.setPass} type="password" id="inputPassword" className="form-control" placeholder="Digite sua senha" required="" />
                <div className="checkbox mt-2 mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Lembre-me
                    </label>
                </div>
                <button onClick={this.login} className="btn btn-lg btn-primary btn-block" type="submit">ENTRAR</button>

            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <div>
            <Header />
            <div className="container mt-admin pt-4">
                <Route exact path="/" component={Noticias} />
                <Route path="/noticia/:title" component={Noticia} />

                <Route path="/login" component={Login} />

                <PrivateRoute path="/news/" partnerAuth={partnerAuth} component={Noticias} />
                <PrivateRoute path="/news/:title" component={Noticia} />

                <PrivateRoute exact path="/novo" component={Novo} />
                <PrivateRoute exact path="/editar/:title" component={Edit} />
                <PrivateRoute exact path="/novo/sucesso" component={NovoSuccess} />
            </div>
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();