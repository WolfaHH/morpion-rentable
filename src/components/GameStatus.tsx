import { useContext } from 'react';
import { GameContext } from '@/contexts/GameContext';
import  calculateWinner  from '@/helpers/calculateW';

const GameStatus: React.FC = () => {
    const { squares, isXNext, won } = useContext(GameContext);
  
    let status;
    if (won && won.player && won.player !== 'draw') {
      status = `Gagnant: `;
    }
    else if (won && won.player === 'draw') {
      status = `Nulle`;
    }
    else {
      status = `Prochain joueur: `;
    }
  
    return (
      <div className='game-status'>
        {status} 
        {won && !won.player && <span className={isXNext ? 'x' : 'o'}>{isXNext ? 'X' : 'O'}</span>}
        {(won && won.player && won.player != "draw") ? <span className={won.player?.toLowerCase()}>{won.player}</span> : ''}
      </div>
    );
  };
  
  export default GameStatus;
  