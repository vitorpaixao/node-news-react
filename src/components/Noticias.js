import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Request from 'superagent';
import _ from 'lodash';

const Message = () => {
    console.log(this.props);
    return (
        <div>{this.props}</div>
    );
}

class Noticias extends Component {

    constructor() {
        super();
        this.state = {};
    }

    getNoticias = () => {
        Request
            .get("http://localhost:3000/articles")
            .accept('application/json')
            .on('error', (err) => {
                console.log('Error: ', '', err);
            })
            .then((res) => {
                console.log('res', res.ok);
                if (res.ok) {
                    this.setState({
                        articlesNoticias: res.body
                    });
                    console.log('Yes...');
                } else {
                    console.log('Oh no! error');
                }
            })
    }

    componentDidMount(props) {
        this.getNoticias();
    }

    render() {
        console.log('props',this.props);
        var noticias = _.map(this.state.articlesNoticias, (item) => {

            return (
                <div className="col mb-4" key={item.id}>
                    <div className="">
                        <Link to={`/noticia/${item.slug}`} className="text-primary">
                            <h2 className="">{item.title}</h2>
                        </Link>
                        <p className="blog-description">{item.description}</p>
                        <Link to={`/noticia/${item.slug}`} className="text-primary">Saiba mais...</Link>
                        {/* {this.props.partnerAuth.isAuthenticated ? (
                            <Link to={`/editar/${item.slug}`} className="text-primary">Editar</Link>
                        ) : (<div></div>)} */}
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div className="blog-header">
                    <div className="col">
                        <h1 className="blog-title">The React News</h1>
                        <p className="lead blog-description">Um blog em React JS</p>
                    </div>
                </div>
                {noticias}
                <Message message={this.state.message} />
            </div>
        );
    }
}

export default Noticias;