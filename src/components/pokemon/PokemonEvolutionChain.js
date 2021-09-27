import React, { Component, Fragment } from 'react'
import Axios from 'axios';
import PokemonCard from './PokemonCard';

export default class PokemonEvolutionChain extends Component {

    state = {
        evolutionChainUrl: '',
        evChainIndex:0,
        evChain: [],
        loading: true,
        tooManyRequests: false
    };
    

    async componentDidMount(){
        const { evolutionChainUrl } = this.props;

        if(evolutionChainUrl){
            const evChainIndex = evolutionChainUrl.split('/')[evolutionChainUrl.split('/').length - 2];

            const chainRes = await Axios.get(evolutionChainUrl);
            let evChain = [];
            let evoItem = chainRes.data.chain;

            //mount object with all evolutions
            while(evoItem.species){
                evoItem.species.url = 'https://pokeapi.co/api/v2/pokemon/' + evoItem.species.url.split('/')[evoItem.species.url.split('/').length - 2] + '/';
                evChain.push(evoItem.species);
                if(evoItem.evolves_to[0]){
                    evoItem = evoItem.evolves_to[0];
                } else {
                    break;
                }
            }

            this.setState( {
                evolutionChainUrl: evolutionChainUrl,
                evChainIndex: evChainIndex,
                evChain: evChain
            });
        }
    }
    render() {
        const evChainSize = this.state.evChain.length;
        return (
            <div className="Card">
                <div className="card-header">
                    <h2>Evolutions</h2>
                    <div className="row">
                    {(this.state.evChain[0] != undefined) ? (
                            this.state.evChain.map((pokemon,i) => (
                                <Fragment>
                                    {console.log(pokemon.name)}
                                    <PokemonCard
                                        key={Math.random()}
                                        name={pokemon.name}
                                        url={pokemon.url}
                                    />
                                    {(evChainSize != (i+1)) ?(
                                        <div className="col-md-1 col-sm-1 mb-5 d-flex align-items-center justify-content-center">
                                        <h1>&gt;&gt;</h1>
                                        </div>
                                    ):null}
                                </Fragment>
                            ))
                            ) : (
                            <h1>Loading Pokemon</h1>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
