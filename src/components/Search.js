import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends React.Component {
    componentDidMount(){
        this.nameInput.focus(); 
     }

    render() {
        return (
            <Form className="search-component" onSubmit={(event) => {event.preventDefault()}}>
                <Form.Group controlId="search">
                    <Form.Control
                        type="text" 
                        placeholder="Search by movie title..." 
                        className="search" 
                        name="search" 
                        value={this.props.value} 
                        onChange={(event) => {this.props.handleChange(event)}}
                        onKeyDown={(event) => {this.props.handleSearch(event)}}
                        ref={(input) => {this.nameInput = input;}}
                    />
                    <Button 
                        variant="primary" 
                        className="search-button"
                        onClick={() => {this.props.handleSearch()}}
                    >
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </Button>
                </Form.Group>
            </Form>
        );
    }
}

export default Search;