import React from 'react';
import Alert from 'react-bootstrap/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

class AlertDisplay extends React.Component {
    render() {
        let variant = this.props.isWarning ? "warning" : "success";
        let msg = this.props.isWarning ?
            "You can't have more than 5 nominations!" :
            "Awesome! You've added your 5 nominations!";

        return (
            <Alert show={this.props.show} variant={variant} className="test">
                <p className="alert-text">{msg}</p>
                <FontAwesomeIcon icon={faWindowClose} size="2x" onClick={() => this.props.handleClick(this.props.isWarning)} className="close-icon"/>
            </Alert>
        );
    }
}

export default AlertDisplay;