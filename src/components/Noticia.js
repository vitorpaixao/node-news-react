import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash';

class Noticia extends Component {

    constructor() {
        super();
        this.state = {};
    }

    getNoticia = (title) => {
        Request
            .get(`http://localhost:3000/articles/${title}`)
            .accept('application/json')
            .end((err, res) => {
                if (err || !res.ok) {
                    console.log('Server error...');
                } else {
                    console.log('Loaded...');
                    this.setState({
                        detailResponse: [res.body]
                    });
                }
            });
    }

    componentDidMount(props) {
        const { params } = this.props.match;
        this.getNoticia(params.title);
    }

    render() {

        const load = _.map(this.state.detailResponse, (item) => {
            return (
                <div key={item.id} className="blog-header">
                    <div className="col">
                        <h1 className="blog-title">{item.title}</h1>
                        <hr />
                        <p className="lead blog-text">{item.description}</p>
                    </div>
                </div>
            )
        })

        return (
            <div className=" mb-4">
                {load}
            </div>
        );
    }
};

export default Noticia;