import { useContext } from 'react';
import { GameContext } from '@/contexts/GameContext';
import Image from 'next/image';


const Score: React.FC = () => {
	const { squares, handleClick } = useContext(GameContext);

	return (
		<div className='score-container'>
			<div>
				<span>Player</span>
				<Image src="/images/5231019.png" alt="My Image" width={500} height={300} />
			</div>
			<span>Vs</span>
			<div>
				<Image src="/images/wolfa.webp" alt="My Image" width={500} height={300} />
				<span>Wolfa.AI</span>
			</div>
		</div>
	);
};

export default Score;