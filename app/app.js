import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import ActionButton from 'react-native-action-button';
import LazyLoad from 'react-lazyload';
import GamesJSON from './games.json';

import './index.css';

const Games = GamesJSON;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  renderGame(game) {
    var icon = <i className="fa fa-square-o" aria-hidden="true"></i>;
    if (game.completed) {
      icon = <i className="fa fa-check-square-o" aria-hidden="true"></i>;
    }

    return (
      <LazyLoad height={200} key={game.slug}>
        <TimelineEvent
          title={game.title}
          container="card"
          style={{'maxWidth': '400px'}}
          cardHeaderStyle={{'color': 'black', 'background':' white', 'fontSize': '24px'}}
          icon={icon}>
          <a href={game.url}><img src={"covers/cover_big/"+game.slug+".jpg"} className="game-covers"/></a>
        </TimelineEvent>
      </LazyLoad>
    );
  }

  renderTimeline() {
    return (
      <Timeline style={{'marginLeft': '100px'}}>
        {Games.map(this.renderGame)}
      </Timeline>
    );
  }

  sort(event) {
    event.preventDefault();
    console.log('sort', event);
  }

  renderMenu() {
    return (
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
          -
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
          +
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
          +
        </ActionButton.Item>
      </ActionButton>
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
