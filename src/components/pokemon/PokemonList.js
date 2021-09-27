import React, { Component } from 'react';

import PokemonCard from './PokemonCard';

export default class PokemonList extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon/",
        limit: 20,
        offset: 0,
        pokemon: null
    };

    async componentDidMount(){
        const { pokemons } = this.props; 
        
        this.setState({ 
            pokemons: pokemons
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.props.pokemons ? (
                    <div className="row">
                    {this.props.pokemons.map(pokemon => (
                        <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            url={pokemon.url}
                        />
                    ))}
                    </div>
                ) : (
                    <h1>Loading Pokemon</h1>
                )}
            </React.Fragment>
        );
    }
}
