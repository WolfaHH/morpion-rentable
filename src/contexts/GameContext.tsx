
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import calculateWinner from '@/helpers/calculateW';
import getBestMove from '@/helpers/minimax';
import { Winner } from '@/helpers/calculateW';
import isfull from '@/helpers/isfull';
import useSound from 'use-sound';
import { countXAndO } from '@/helpers/isfull';

// Crée l'interface du contexte de jeu
interface IContextProps {
	squares: Array<string | null>;  // Les cases du plateau de jeu
	blocked: Array<boolean>;  // Les cases bloquées
	handleClick: (i: number) => void;  // Fonction pour gérer le clic
	isXNext: boolean;  // Est-ce que c'est au tour de 'X' ?
	resetGame: () => void;  // Fonction pour réinitialiser le jeu
	won: Winner | null;  // Le gagnant de la partie
	isMuted: boolean;  // Le son est-il coupé ?
	setIsMuted: (value: boolean) => void;  // Fonction pour gérer le son
	nbGames: number;  // Nombre de jeux joués
}

interface GameProviderProps {
	children: ReactNode;
}

export const GameContext = createContext({} as IContextProps);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
	const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
	const [blocked, setBlocked] = useState<Array<boolean>>(Array(9).fill(false));
	const [isXNext, setIsXNext] = useState<boolean>(true);
	const [won, setWon] = useState<Winner | null>(null);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [play] = useSound('/sounds/coup.mp3');
	const [play2] = useSound('/sounds/restart.mp3');
	const [nbGames, setNbGames] = useState<number>(0);

	const clickPlay = () => {
		if (!isMuted)
			play();
	};
	const clickPlay2 = () => {
		if (!isMuted)
			play2();
	};

	const playerTurn = (i: number) => {
		const newSquares = squares.slice();
		const newBlocked = blocked.slice();
		if (won && won.player && won.player === 'draw')
			return;
		setWon(calculateWinner(newSquares));
		if ((won && won.player) || newSquares[i]) {
			return;
		}
		newSquares[i] = isXNext ? 'X' : 'O';
		newBlocked[i] = true;
		
		setSquares(newSquares);
		setBlocked(newBlocked);
		setIsXNext(!isXNext);
		setWon(calculateWinner(newSquares));
		if (isfull(newSquares)) {
			setWon({ player: 'draw', line: null });
		}
	}

	const aiTurn = () => {
		const newSquares = squares.slice();
		const newBlocked = blocked.slice();

		let newWon = calculateWinner(newSquares);
		if (newWon && newWon.player && newWon.player === 'draw')
			return;
		if (newWon && newWon.player) {
			return;
		}

		const i = getBestMove(newSquares);  // AI calculates the best move here.

		if (newSquares[i]) {
			return;  // If the best move is already occupied, AI does not play.
		}

		newSquares[i] = isXNext ? 'X' : 'O';  // Assume AI is always 'O'.
		newBlocked[i] = true;
		setSquares(newSquares);
		setBlocked(newBlocked);
		setIsXNext(!isXNext);
		setWon(calculateWinner(newSquares));

		if (isfull(newSquares)) {
			setWon({ player: 'draw', line: null });
		}

	}


	const handleClick = (i: number) => {
		if (nbGames % 2 === 0 && countXAndO(squares) % 2 === 0) {
			playerTurn(i);
			clickPlay();
		  }
		else {
			if (countXAndO(squares) % 2 != 0) {
				playerTurn(i);
				clickPlay();
			}
		}



	};

	
	useEffect(() => {
		if (nbGames % 2 === 0 && countXAndO(squares) % 2 !== 0) { // On utilise le modulo pour savoir si c'est au tour de l'IA ou du joueur
			setTimeout(() => {
				aiTurn();
			}, 1000);

		}
		else if (nbGames % 2 === 1 && countXAndO(squares) % 2 === 0) {
			setTimeout(() => {
				aiTurn();
			}, 1000);

		}
	  }, [squares, nbGames]);

	const resetGame = () => {
		clickPlay2();
		setSquares(Array(9).fill(null));
		setBlocked(Array(9).fill(false));
		setIsXNext(true);
		setWon(null);
		setNbGames(nbGames + 1);
	};



	return (
		<GameContext.Provider value={{ squares, blocked, handleClick, isXNext, resetGame, won, isMuted, setIsMuted, nbGames }}>
			{children}
		</GameContext.Provider>
	);
};
