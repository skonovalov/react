import React from 'react';
import ReactDOM from 'react-dom';

/*components*/
import Leaderboard from './src/components/Leaderboard';
/*end components*/

import './src/assets/leaderboard.css';

ReactDOM.render(
  <Leaderboard url='leaderboard.json'/>,
  document.getElementById('app')
);
