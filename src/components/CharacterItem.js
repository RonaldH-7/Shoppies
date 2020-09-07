import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class CharacterItem extends React.Component {
    render() {
        let key = this.props.movie.imdbID;
        let buttonText = this.props.displayNominate ? "Nominate" : "Remove";
        let variant = this.props.displayNominate ? "success" : "danger";
        let button = this.props.displayNominate ? 
            <Button variant={variant} size="sm" onClick={() => {this.props.handleClick(key)}} style={{float: "right"}} disabled={this.isNominated()} >{buttonText}</Button> : 
            <Button variant={variant} size="sm" onClick={() => {this.props.handleClick(key)}} style={{float: "right"}}>{buttonText}</Button>
        
        return (
            <li className="mt-3">
                <Link to={`/${key}`}>
                    {this.props.movie.Title}
                </Link>
                {button}
            </li>
        );
    }

    isNominated() {
        let nominations = this.props.nominations;
        for (let i = 0; i < nominations.length; i++) {
            if (nominations[i].imdbID === this.props.movie.imdbID) {
                return true;
            }
        }
        return false;
    }
}

export default CharacterItem;