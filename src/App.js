import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Display from './components/Display';
import MovieDetail from './components/MovieDetail';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            movieResults: [],
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

    fetchMovies() {
        let uri = `http://www.omdbapi.com/?apikey=b49c2121&type=movie&s=${this.state.search}`;
        let encodedURI = encodeURI(uri)
        console.log(encodedURI);
        fetch(encodedURI)
            .then((response) => {
                this.setState({
                    movieResults: []
                });
                return response.json();
            })
            .then((data) => {
                if (data.Response === "True") {
                    data.Search.forEach((movie) => {
                        this.setState((prevState) => {
                            return {
                                movieResults: [...prevState.movieResults, movie]
                            }
                        });
                    });
                } else {
                    this.setState({
                        error: data.Error
                    });
                }
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
        let targetMovie;

        if (this.state.nominations.length >= 5) {
            alert("I am sorry, but you have too many nominations already... Dingus.");
        } else {
            for (let i = 0; i < this.state.movieResults.length; i++) {
                let currentMovie = this.state.movieResults[i];
                if (key === currentMovie.imdbID) {
                    targetMovie = currentMovie;
                    break;
                }
            }

            this.setState((prevState) => {
                return {
                    nominations: [...prevState.nominations, targetMovie]
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
            <div className="app-container">
                <BrowserRouter>
                    <div className="grid-container">
                            <Route path="/" exact component={() => (
                                <Search handleChange={this.handleChange} handleSearch={this.handleSearch} value={this.state.search}/>
                            )} />
                            <Route path="/" exact component={() => (
                                <Display title={results} movies={this.state.movieResults} handleClick={this.handleAdd} displayNominate={true} nominations={this.state.nominations} error={this.state.error} />
                            )} />
                            <Route path="/" exact component={() => (
                                <Display title="Current Nominations:" movies={this.state.nominations} handleClick={this.handleRemove} displayNominate={false} nominations={this.state.nominations} error={this.state.error} />
                            )} />
                            <Route path="/:imdbID" render={(props) => (
                                <MovieDetail handleAdd={this.handleAdd} handleRemove={this.handleRemove} nominations={this.state.nominations} {...props} />
                            )}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;