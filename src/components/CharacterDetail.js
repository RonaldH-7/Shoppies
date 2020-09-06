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
        let key = this.props.match.url;
        let url = `https://swapi.dev/api/people${key}`;

        this.setState({isLoading: true});

        fetch(url)
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
            if (nominations[i].name === this.state.characterInfo.name) {
                return true;
            }
        }
        return false;
    }

    render() {
        let key = this.props.match.params.name;
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
                        <h1>{this.state.characterInfo.name}</h1>
                        <div className="flex-container">
                            <Link to="/">
                                <Button size="sm">Home</Button>
                            </Link>
                            {button}
                        </div>
                        <p>Height: {this.state.characterInfo.height}</p>
                        <p>Weight: {this.state.characterInfo.mass}</p>
                        <p>Birth year: {this.state.characterInfo.birth_year}</p>
                        <p>Gender: {this.state.characterInfo.gender}</p>
                    </div>
                }
            </div>
        );
    }
}

export default CharacterDetail;