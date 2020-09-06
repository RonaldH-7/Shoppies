import React from 'react';
import CharacterItem from './CharacterItem';

class Display extends React.Component {
    render() {
        let displayItems = this.props.data.map((item) => {
            return <CharacterItem 
                        key={this.getKey(item.url)} 
                        data={item} 
                        handleClick={this.props.handleClick} 
                        displayNominate={this.props.displayNominate}
                        isNominated={this.props.isNominated}
                        nominations={this.props.nominations}
                    />
        });
        let msg = this.props.displayNominate ? "No search results" : "No nominations";
        let displayMsg = <p>{msg}</p>;

        return (
            <div className="display">
                <h5>{this.props.title}</h5>
                {
                    displayItems.length ?
                    <ul>
                        {displayItems}
                    </ul> :
                    displayMsg
                }
            </div>
        );
    }

    getKey(url) {
        let key = url.slice(28, url.length - 1);
        return key;
    }
}

export default Display;