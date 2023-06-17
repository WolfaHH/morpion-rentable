import React, { useContext, useState, useEffect, useRef } from 'react';
import { GameContext } from '@/contexts/GameContext';
import Board from '../components/Board';
import GameStatus from '@/components/GameStatus';
import Score from '@/components/Score';
import Head from 'next/head';
import AOS from 'aos';
import useSound from 'use-sound';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

import 'aos/dist/aos.css';

const Game: React.FC = () => {
	const { resetGame, isMuted, setIsMuted } = useContext(GameContext);
	const cursorRef = useRef<HTMLDivElement | null>(null);
	const animationFrameId = useRef<number | null>(null);
	const [play] = useSound('/sounds/click.mp3');
	const [play2] = useSound('/sounds/mute.mp3');
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => {
		setIsHovering(true);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
	};

	// Fonction pour mute les sons
	const toggleMute = () => {
		setIsMuted(!isMuted);
		play2();
	};

	// Gestion du bruit de clique
	const parentClickHandler = () => {
		if (!isMuted)
			play();
	};

	const childClickHandler = (event: React.MouseEvent) => {
		event.stopPropagation(); // This will prevent triggering parentClickHandler
	};

	// Gestion du curseur (C'est un effet amusant, mais à ne pas utiliser en prod)
	const setFromEvent = (e: MouseEvent) => {
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}
		animationFrameId.current = requestAnimationFrame(() => {
			if (cursorRef.current) {
				cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
			}
		});
	};

	useEffect(() => {
		window.addEventListener('mousemove', setFromEvent);
		AOS.init(); // Initialize AOS

		return () => {
			window.removeEventListener('mousemove', setFromEvent);
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, []);

	return (
		<div>
			<Head>
				<title>Morpion Wolfa'</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div
				ref={cursorRef}
				className={`cursor ${isHovering ? 'cursor hovered' : ''}`}
				style={{
					width: '20px',
					height: '20px',
				}}
			/>
			<div onClick={toggleMute} className='sound'>
				{isMuted ? <FiVolumeX size={32} /> : <FiVolume2 size={32} />}
			</div>
			<div className="main" onClick={parentClickHandler}>
				<h1 data-aos="fade-up">Le Morpion de Wolfa'</h1>
				<div className="game-container" data-aos="fade-up" onClick={childClickHandler} onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					<Score />
					<Board />
					<GameStatus />
				</div>
				<button onClick={resetGame}>Restart Game</button>
			</div>
		</div>
	);
};

export default Game;
