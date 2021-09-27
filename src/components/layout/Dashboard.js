import React, { Component }from 'react';
import axios from 'axios';


import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

import PokemonList from '../pokemon/PokemonList';
import ReactPaginate from 'react-paginate';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemons : [],
            loading : false,
            currentPage : ( props.currentPage ? props.currentPage : 0), 
            pokemonsPerPage : 12,
            totalPokemons : 0,
            nextLink: '',
            prevLink: ''
        };
        this.paginate = this.paginate.bind(this);
    }

    loadPokemons = (limit , offset ) =>{
        this.setState({loading : true});
        axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
                            .then(
                                (res)=>{
                                    this.setState({ 
                                        pokemons: res.data.results,
                                        loading: false,
                                        totalPokemons: res.data.count,
                                        nextLink: res.data.next,
                                        prevLink: res.data.prev
                                    })
                                });
    }

    async componentDidMount(){
        this.loadPokemons(this.state.pokemonsPerPage, this.state.currentPage);
    }

    paginate ( pageNumber ) {
        this.setState({currentPage : (pageNumber.selected * this.state.pokemonsPerPage)});
        this.loadPokemons(this.state.pokemonsPerPage, (pageNumber.selected * this.state.pokemonsPerPage));
    }

    render(){
        return (
            <div className="row">
                {!this.state.loading ? (
                <div className="col">
                    <PokemonList
                        pokemons={this.state.pokemons}
                    />
                </div>
                ):(
                    <div className="container mb-5 mt-5" >
                        <div className="row">
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                        <div className="row">
                            <div className="justify-content-center">
                                <h4 style={{
                                    textAlign:'center',
                                    color: 'purple'
                                }}>Loading Pokemons...</h4>
                            </div>
                        </div>
                    </div>
                )
                }
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={ Math.round(this.state.totalPokemons/this.state.pokemonsPerPage) + 1 }
                    onPageChange={this.paginate}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    containerClassName={"pagination justify-content-center"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                />
            </div>
        );
    }
}