import React from 'react';

class Contact extends React.Component {
    render() {
        return (
            <div className="contact-container">
                <h2>Contact</h2>
                <p>
                    This website was developed by Ronald Hua as part of his application for an internship at Shopify for Winter 2021.<br/>
                </p>
                <p>
                    You can connect with Ron at: 
                </p>
                <ul>
                    <li><a href="https://linkedin.com/in/ronald-hua">linkedin.com/in/ronald-hua</a></li>
                    <li><a href="https://github.com/RonaldH-7">github.com/RonaldH-7</a></li>
                </ul>
            </div>
        );
    }
}

export default Contact;