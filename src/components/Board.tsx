import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import { GameContext } from '@/contexts/GameContext';


const Board: React.FC = () => {
	const { squares, handleClick, won, blocked, isXNext } = useContext(GameContext);

	return (
		<div className={won && won.player ? "board won" : "board " + (isXNext ? 'X ' : 'O ')} style={{ position: 'relative' }}>
			{squares.map((square, i) => (
				<button
					className={`${square ? 'square ' + (square as string).toLowerCase() : 'square '
						} ${blocked[i] ? 'blocked' : ''}`}
					key={i}
					onClick={() => handleClick(i)}
				>
					{square}
				</button>
			))}
			{won && won.player && won.line && <div className={`win-line ${won.line.direction}`}
				style={{
					top: won.line.direction === 'horizontal' ? `${won.line.position}%` : undefined,
					left: won.line.direction === 'vertical' ? `${won.line.position}%` : undefined,
				}}
			/>}
		</div>
	);
};

export default Board;