interface WinningLine {
	direction: 'horizontal' | 'vertical' | 'diagonal-right' | 'diagonal-left';
	position: number;
}

export interface Winner {
	player: string | null;
	line: WinningLine | null;
}

// Fonction qui détermine le gagnant si il y en a un et retourne un objet contenant le joueur gagnant et la ligne gagnante
const calculateWinner = (squares: Array<string | null>): Winner => {
	const lines: Array<Array<number>> = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const directions: Array<WinningLine['direction']> = [
		'horizontal',
		'horizontal',
		'horizontal',
		'vertical',
		'vertical',
		'vertical',
		'diagonal-right',
		'diagonal-left'
	];

	const positions: Array<number> = [
		16, // top row (16% of the board's height)
		50, // middle row (50% of the board's height)
		84, // bottom row (84% of the board's height)
		16, // left column (16% of the board's width)
		50, // middle column (50% of the board's width)
		84, // right column (84% of the board's width)
		50, // main diagonal (approximately 50% of the board's size)
		50  // counter diagonal (approximately 50% of the board's size)
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return {
				player: squares[a],
				line: {
					direction: directions[i],
					position: positions[i]
				}
			};
		}
	}

	return { player: null, line: null };
}

export default calculateWinner;
