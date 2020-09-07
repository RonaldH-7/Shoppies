import React from 'react';
import CharacterItem from './CharacterItem';

class Display extends React.Component {
    render() {
        let displayMovies = this.props.movies.map((movie) => {
            return <CharacterItem 
                        key={movie.imdbID} 
                        movie={movie} 
                        handleClick={this.props.handleClick} 
                        displayNominate={this.props.displayNominate}
                        isNominated={this.props.isNominated}
                        nominations={this.props.nominations}
                    />
        });
        let msg = this.props.displayNominate ? this.props.error : "No nominations";
        let displayMsg = <p>{msg}</p>;

        return (
            <div className="display">
                <h5>{this.props.title}</h5>
                {
                    displayMovies.length ?
                    <ul>
                        {displayMovies}
                    </ul> :
                    displayMsg
                }
            </div>
        );
    }
}

export default Display;