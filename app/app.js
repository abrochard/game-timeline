import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import LazyLoad from 'react-lazyload';
import GamesJSON from './games.json';

import './index.css';

const Games = GamesJSON;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {anchor: null};
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

  click(event) {
    this.setState({anchor: event.currentTarget});
  }

  sort(event) {
    event.preventDefault();
    console.log('sort', event);
  }

  renderMenu() {
    return (
      <div>
        <Button variant="fab" color="primary" aria-label="add" onClick={this.click.bind(this)}>
          +
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchor}
          open={Boolean(this.state.anchor)}
          >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </div>
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
