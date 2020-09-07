import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="about-container">
                <h2>About</h2>
                <p>
                    This website aims to simplify the movie nomination process for the Shoppies, 
                    celebrated awards that recognize achievements in film by entrepreneurs. 
                    This website uses the <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a> to allow you to save your favourite films that you feel deserve a nomination. 
                    You can select up to five nominees.
                </p>
                <p>
                    The Shoppies are brought to you by <a href="https://www.shopify.com/" target="_blank" rel="noopener noreferrer">Shopify</a>, the leading cloud-based, 
                    multi-channel commerce platform that powers more than 1,000,000 businesses in approximately 175 countries worldwide. 
                </p>
            </div>
        );
    }
}

export default About;