import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Display from './components/Display';
import CharacterDetail from './components/CharacterDetail';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            characters: [],
            nominations: [],
            search: "",
            searched: false,
            searchedTerm: "",
            error: ""
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // onNextFrame(callback) {
    //     setTimeout(function () {
    //         requestAnimationFrame(callback)
    //     }, 10)
    // }

    // componentDidUpdate() {
    //     this.onNextFrame(() => {
    //         if (this.state.nominations.length === 5) {
    //             alert("Awesome! You've added your 5 nominations");
    //         }
    //     });
    // }

    fetchMovies() {
        let uri = `http://www.omdbapi.com/?apikey=b49c2121&type=movie&s=${this.state.search}`;
        let encodedURI = encodeURI(uri)
        console.log(encodedURI);
        fetch(encodedURI)
            .then((response) => {
                this.setState({
                    characters: []
                });
                return response.json();
            })
            .then((data) => {
                if (data.Response === "True") {
                    data.Search.forEach((char) => {
                        this.setState((prevState) => {
                            return {
                                characters: [...prevState.characters, char]
                            }
                        });
                    });
                } else {
                    this.setState({
                        error: data.Error
                    });
                }
            })
            .then(() => {
                console.log(this.state.characters);
            });        
    }

    // ***************** Event Handlers *****************

    handleChange(event) {
        let {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSearch(event) {
        if (!event || (event && event.keyCode === 13)) {
            this.fetchMovies();
            this.setState((prevState) => {
                return {
                    searched: true,
                    searchedTerm: prevState.search
                }
            });
        }
    }

    handleAdd(key) {
        let targetChar;

        if (this.state.nominations.length >= 5) {
            alert("I am sorry, but you have too many nominations already... Dingus.");
        } else {
            for (let i = 0; i < this.state.characters.length; i++) {
                let currentChar = this.state.characters[i];
                if (key === currentChar.imdbID) {
                    targetChar = currentChar;
                    break;
                }
            }

            this.setState((prevState) => {
                return {
                    nominations: [...prevState.nominations, targetChar]
                }
            });
        }

        if (this.state.nominations.length === 4) {
            alert("Awesome! You've added your 5 nominations");
        }
    }

    handleRemove(key) {
        let copyState = this.state.nominations.filter((nomination) => {
            if (key !== nomination.imdbID) {
                return true;
            }
            return false;
        });

        this.setState({
            nominations: copyState
        });
    }

    render() {
        let results = this.state.searched ? 
            `Results for "${this.state.searchedTerm}":` :
            "Search for something!"

        return (
            <div className="container">
                <BrowserRouter>
                    <div className="grid-container">
                            <Route path="/" exact component={() => (
                                <Search handleChange={this.handleChange} handleSearch={this.handleSearch} value={this.state.search}/>
                            )} />
                            <Route path="/" exact component={() => (
                                <Display title={results} movies={this.state.characters} handleClick={this.handleAdd} displayNominate={true} nominations={this.state.nominations} error={this.state.error} />
                            )} />
                            <Route path="/" exact component={() => (
                                <Display title="Current Nominations:" movies={this.state.nominations} handleClick={this.handleRemove} displayNominate={false} nominations={this.state.nominations} error={this.state.error} />
                            )} />
                            <Route path="/:imdbID" render={(props) => (
                                <CharacterDetail handleAdd={this.handleAdd} handleRemove={this.handleRemove} nominations={this.state.nominations} {...props} />
                            )}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;