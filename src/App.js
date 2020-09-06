import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Display from './components/Display';
import CharacterDetail from './components/CharacterDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            characters: [],
            nominations: [],
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.fetchCharacters("https://swapi.dev/api/people/");
    }

    fetchCharacters(url) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.results.forEach((char) => {
                this.setState((prevState) => {
                    return {
                        characters: [...prevState.characters, char]
                    }
                });
            });
            
            // if (data.next) {
            //     this.fetchCharacters(data.next);
            // }
        });
    }

    // handleAdd(key) {
    //     let targetChar;
    //     let copyState = [];

    //     if (this.state.nominations.length < 5) {
    //         for (let i = 0; i < this.state.characters.length; i++) {
    //             let currentChar = this.state.characters[i];
    //             if (key === this.getKey(currentChar.url)) {
    //                 targetChar = currentChar;
    //             } else {
    //                 copyState.push(currentChar);
    //             }
    //         }
    //         this.setState((prevState) => {
    //             return {
    //                 characters: copyState,
    //                 nominations: [...prevState.nominations, targetChar]
    //             }
    //         });
    //     } else {
    //         alert("I am sorry, but you have too many nominations already... Dingus.");
    //     }
    // }
    handleAdd(key) {
        let targetChar;

        if (this.state.nominations.length >= 5) {
            alert("I am sorry, but you have too many nominations already... Dingus.");
        } else {
            for (let i = 0; i < this.state.characters.length; i++) {
                let currentChar = this.state.characters[i];
                if (key === this.getKey(currentChar.url)) {
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
    }

    onNextFrame(callback) {
        setTimeout(function () {
            requestAnimationFrame(callback)
        }, 10)
    }

    componentDidUpdate() {
        this.onNextFrame(() => {
            if (this.state.nominations.length === 5) {
                alert("Awesome! You've added your 5 nominations");
            }
        });
    }

    // handleRemove(key) {
    //     let targetChar;
    //     let copyState = [];

    //     for (let i = 0; i < this.state.nominations.length; i++) {
    //         let currentChar = this.state.nominations[i];
    //         if (key === this.getKey(currentChar.url)) {
    //             targetChar = currentChar;
    //         } else {
    //             copyState.push(currentChar);
    //         }
    //     }
    //     this.setState((prevState) => {
    //         return {
    //             characters: [...prevState.characters, targetChar],
    //             nominations: copyState
    //         }
    //     });
    // }
    handleRemove(key) {
        let copyState = this.state.nominations.filter((nomination) => {
            if (key !== this.getKey(nomination.url)){
                return true;
            }
            return false;
        });

        this.setState({
            nominations: copyState
        });
    }

    getKey(url) {
        let key = url.slice(28, url.length - 1);
        return key;
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className="flex-container">
                        <Route path="/" exact component={() => (
                            <Display title="Results:" data={this.state.characters} handleClick={this.handleAdd} displayNominate={true} nominations={this.state.nominations} />
                        )}/>
                        <Route path="/" exact component={() => (
                            <Display title="Current Nominations:" data={this.state.nominations} handleClick={this.handleRemove} displayNominate={false} nominations={this.state.nominations} />
                        )} />
                        <Route path="/:name" render={(props) => (<CharacterDetail handleAdd={this.handleAdd} handleRemove={this.handleRemove} nominations={this.state.nominations} {...props} />)}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;