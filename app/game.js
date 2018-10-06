import React from 'react';
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import UncheckBox from 'react-icons/lib/md/check-box-outline-blank';
import CheckedBox from 'react-icons/lib/md/check-box';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';


const Game = ({game}) => {
  var icon = <UncheckBox/>;
  if (game.completed === true) {
    icon = <CheckedBox/>;
  }

  var chips = [];

  if (game.support.length > 0) {
    chips.push(<Chip key="support" label={game.support[0]}/>);
  }
  if (game.genre != '') {
    chips.push(<Divider key="divider"/>);
    chips.push(<Chip key="genre" label={game.genre}/>);
  }

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={icon}>
      <h3 className="vertical-timeline-element-title">{game.title}</h3>
      <h6 className="vertical-timeline-element-subtitle">{game.date}</h6>

      {chips}

      <a href={game.url}><img src={"covers/cover_big/"+game.slug+".jpg"} className="game-covers"/></a>
    </VerticalTimelineElement>
  );
};

export default Game;
