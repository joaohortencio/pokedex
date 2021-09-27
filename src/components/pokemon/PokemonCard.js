import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import styled from 'styled-components';
import axios from 'axios';

import spinner from '../layout/images/spinner.gif';

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0,25,0.0,0,25,1);
    &:hover {
        box-shadow: 0 14px 20px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
    }
    -moz-user-select: none;
    -website-user-select: none;
    user-select: none;
    -o-usr-select: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
  };
  

export default class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        types:[],
        imageLoading: true,
        tooManyRequests: false
      };

    componentDidMount(){
        const { name, url } = this.props;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
        
        axios.get(url)
            .then((res)=>{
                this.setState({ 
                    types: res.data.types.map(type => type.type.name)
                });
            });

        this.setState( {
            name: name,
            imageUrl: imageUrl,
            pokemonIndex: pokemonIndex
        });
    }

    render() {
          
        return (
          <div className="col-md-3 col-sm-6 mb-5">
            <StyledLink to={`../pokemon/${this.state.pokemonIndex}`} replace>
              <Card className="card">
                <h5 className="card-header" style={{textAlign: 'center'}}>
                    {this.state.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}   
                </h5>
                {this.state.imageLoading ? (
                  <img
                    src={spinner}
                    style={{ width: '3em', height: '3em' }}
                    className="card-img-top rounded mx-auto d-block mt-2"
                  />
                ) : null}
                <Sprite
                  className="card-img-top rounded mx-auto mt-2"
                  src={this.state.imageUrl}
                  onLoad={() => this.setState({ imageLoading: false })}
                  onError={() => this.setState({ tooManyRequests: true })}
                  style={
                    this.state.tooManyRequests
                      ? { display: 'none' }
                      : this.state.imageLoading
                      ? null
                      : { display: 'block' }
                  }
                />
                {this.state.tooManyRequests ? (
                  <h6 className="mx-auto">
                    <span className="badge badge-danger mt-2">
                      Too Many Requests
                    </span>
                  </h6>
                ) : null}
                <div className="card-body mx-auto">
                  <h6 className="card-title">
                    <div className="float-right">
                      {this.state.types.map(type => (
                        <h4
                          key={type}
                          className="badge badge-pill mr-1"
                          style={{
                            backgroundColor: `#${TYPE_COLORS[type]}`,
                            color: 'white'
                          }}
                        >
                          {type
                            .toLowerCase()
                            .split(' ')
                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                            .join(' ')}
                        </h4>
                      ))}
                    </div>
                  </h6>
                </div>
              </Card>
            </StyledLink>
          </div>
        );
      }
}
