import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

class CharacterDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            characterInfo: {},
            isLoading: false
        };
    }
    componentDidMount() {
        console.log(this.props.match.params.imdbID);

        let imdbID = this.props.match.params.imdbID;

        let uri = `http://www.omdbapi.com/?apikey=b49c2121&i=${imdbID}`;
        let encodedURI = encodeURI(uri)
        console.log(encodedURI);

        this.setState({isLoading: true});

        fetch(encodedURI)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    characterInfo: data,
                    isLoading: false
                });
            });
    }

    isNominated() {
        let nominations = this.props.nominations;
        for (let i = 0; i < nominations.length; i++) {
            if (nominations[i].imdbID === this.state.characterInfo.imdbID) {
                return true;
            }
        }
        return false;
    }

    render() {
        let key = this.props.match.params.imdbID;
        let button = this.isNominated() ?
            <Button variant="danger" size="sm" onClick={()=>{this.props.handleRemove(key)}}>Remove</Button> :
            <Button variant="success" size="sm" onClick={()=>{this.props.handleAdd(key)}}>Nominate</Button>;

        return (
            <div className="flex-container">
                {
                    this.state.isLoading ?
                    <div className="loading">
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                        <h1 style={{display: "inline-block"}}>&nbsp;Loading</h1>
                    </div> :
                    <div>
                        <h1>{this.state.characterInfo.Title}</h1>
                        <div className="flex-container">
                            <Link to="/">
                                <Button size="sm">Home</Button>
                            </Link>
                            {button}
                        </div>
                        <p>Year: {this.state.characterInfo.Year}</p>
                        <p>Rated: {this.state.characterInfo.Rated}</p>
                        <p>Released: {this.state.characterInfo.Released}</p>
                        <p>Runtime: {this.state.characterInfo.Runtime}</p>
                        <p>BoxOffice: {this.state.characterInfo.BoxOffice}</p>
                        <p>Plot: {this.state.characterInfo.Plot}</p>
                    </div>
                }
            </div>
        );
    }
}

export default CharacterDetail;