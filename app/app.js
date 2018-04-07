import React, { Component } from 'react';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import LazyLoad, { forceCheck } from 'react-lazyload';

import { Menu, MainButton, ChildButton } from 'react-mfb';
import 'react-mfb/mfb.css';

import GamesJSON from '../games.json';

import Game from './game.js';
import { Shuffle, SortAlphaDesc, SortAlphaAsc, SortPlayedDateAsc, SortPlayedDateDesc } from './sort.js';

import './index.css';
import 'react-vertical-timeline-component/style.min.css';

const Games = GamesJSON.sort(SortPlayedDateAsc);

const NONE = 0;
const DESC = 1;
const ASC = 2;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: Games,
      alphaSort: NONE,
      sortDate: ASC,
      filter: false
    };
  }

  renderGame(game) {
    return (
      <LazyLoad height={100} offset={100} key={game.slug}>
        <Game game={game}/>
      </LazyLoad>
    );
  }

  renderTimeline() {
    return (
      <VerticalTimeline animate={false}>
        {Games.map(this.renderGame)}
      </VerticalTimeline>
    );
  }

  sort(fn, alphaSort, dateSort) {
    this.setState({
      games: this.state.games.sort(fn),
      alphaSort: alphaSort,
      dateSort: dateSort
    }, () => {forceCheck();});
  }

  sortDate() {
    var fn = SortPlayedDateAsc;
    var direction = ASC;

    if (this.state.dateSort == ASC) {
      fn = SortPlayedDateDesc;
      direction = DESC;
    }

    this.sort(fn, this.state.alphaSort, direction);
  }

  sortAlpha() {
    var fn = SortAlphaDesc;
    var direction = DESC;

    if (this.state.alphaSort == DESC) {
      fn = SortAlphaAsc;
      direction = ASC;
    }

    this.sort(fn, direction, this.state.dateSort);
  }

  shuffleGames() {
    this.setState({games: Shuffle(this.state.games)}, () => {forceCheck();});
  }

  filterGames() {
    if (this.state.filter) {
      this.setState({games: Games, filter: false}, () => {forceCheck();});
      return;
    }

    var fn = g => {
      return g.completed === true;
    };

    var games = this.state.games;
    console.log(games.length);
    games = games.filter(fn);
    console.log(games.length);


    this.setState({games: games, filter: true}, () => {forceCheck();});
  }

  renderMenu() {
    var effect = 'zoomin',
        pos = 'bl',
        method = 'hover';

    var style = {
      background: 'forestgreen'
    };

    return (
      <Menu effect={effect} method={method} position={pos} style={style}>
        <MainButton iconResting="fa fa-bars" iconActive="fa fa-bars" />
        <ChildButton
          onClick={this.sortAlpha.bind(this)}
          icon="fa fa-sort-alpha-asc"
          label="Alphabetical sort"/>
        <ChildButton
          onClick={this.filterGames.bind(this)}
          icon="fa fa-check-square-o"
          label="Filter by completion"/>
        <ChildButton
          onClick={this.sortDate.bind(this)}
          icon="fa fa-calendar"
          label="Date sort"/>
        <ChildButton
          onClick={this.shuffleGames.bind(this)}
          icon="fa fa-random"
          label="Random sort"/>
      </Menu>
    );
  }

  render() {
    return (
      <div>
        {this.renderMenu()}
        <div>
          {this.renderTimeline()}
        </div>
      </div>
    );
  }
}

export default App;
