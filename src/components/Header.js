import React from 'react';
import Navigation from './Navigation';

class Header extends React.Component {
    render() {
        return (
            <header>
                {/* <div className="header-container"> */}
                {/* <img src={require('../images/shoppies_logo.png')} alt="Shoppies logo" style={{width: "85px", height: "auto"}}/> */}
                    <h1 style={{display: "inline-block"}}>The Shoppies: Movie awards</h1>
                {/* </div> */}
                <Navigation />
            </header>
        );
    }
}

export default Header;