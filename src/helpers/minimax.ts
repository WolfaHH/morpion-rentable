// Cette fonction vérifie s'il y a un gagnant en utilisant les combinaisons gagnantes dans un jeu de Tic Tac Toe.
function checkWinner(squares: Array<string | null>): string | null {
	const lines = [
		[0, 1, 2], // première ligne horizontale
		[3, 4, 5], // deuxième ligne horizontale
		[6, 7, 8], // troisième ligne horizontale
		[0, 3, 6], // première colonne
		[1, 4, 7], // deuxième colonne
		[2, 5, 8], // troisième colonne
		[0, 4, 8], // première diagonale
		[2, 4, 6], // deuxième diagonale
	];

	// Cette boucle parcourt toutes les combinaisons gagnantes pour vérifier s'il y a un gagnant.
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		// Si les trois carrés pour une combinaison gagnante sont identiques, alors il y a un gagnant.
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// Cette fonction utilise l'algorithme Minimax pour trouver le meilleur mouvement possible.
// Cette fonction utilise l'algorithme Minimax pour trouver le meilleur mouvement possible.
function minimax(
	squares: Array<string | null>,
	depth: number,
	isMaximizing: boolean,
	alpha: number,
	beta: number
): any {
	// On vérifie d'abord s'il y a un gagnant.
	const winner = checkWinner(squares);

	// Si nous avons un gagnant, on attribue un score en fonction de qui a gagné.
	if (winner) {
		return winner === "X" ? 10 - depth : depth - 10;
	} else if (!squares.includes(null)) {
		// Si il n'y a plus de cases vides et aucun gagnant, c'est une égalité.
		return 0;
	}

	// Si c'est au tour de "X" de jouer.
	if (isMaximizing) {
		let bestScore = -Infinity; // On initialise le meilleur score à -Infinity.
		let move = -1; // On initialise le meilleur mouvement à -1.
		for (let i = 0; i < squares.length; i++) {
			// Si la case est vide, on crée une copie de notre tableau squares.
			// Ensuite on marque cette case avec "X" et on évalue le score.
			if (!squares[i]) {
				let squaresCopy = [...squares];
				squaresCopy[i] = "X";
				const score = minimax(squaresCopy, depth + 1, false, alpha, beta);
				// Si le score est meilleur que le meilleur score actuel, on le met à jour.
				if (score > bestScore) {
					bestScore = score;
					move = i;
				}
				alpha = Math.max(alpha, bestScore);
				// Si alpha est supérieur ou égal à beta, on arrête la boucle (élagage alpha-beta).
				if (beta <= alpha) {
					break;
				}
			}
		}
		// On retourne le mouvement si on est à la profondeur 0, sinon on retourne le meilleur score.
		return depth === 0 ? move : bestScore;
	} else {
		// Si c'est au tour de "O" de jouer.
		let bestScore = Infinity; // On initialise le meilleur score à Infinity.
		let move = -1; // On initialise le meilleur mouvement à -1.
		for (let i = 0; i < squares.length; i++) {
			// Si la case est vide, on crée une copie de notre tableau squares.
			// Ensuite on marque cette case avec "O" et on évalue le score.
			if (!squares[i]) {
				let squaresCopy = [...squares];
				squaresCopy[i] = "O";
				const score = minimax(squaresCopy, depth + 1, true, alpha, beta);
				// Si le score est plus bas que le meilleur score actuel, on le met à jour.
				if (score < bestScore) {
					bestScore = score;
					move = i;
				}
				beta = Math.min(beta, bestScore);
				// Si beta est inférieur ou égal à alpha, on arrête la boucle (élagage alpha-beta).
				if (beta <= alpha) {
					break;
				}
			}
		}
		// On retourne le mouvement si on est à la profondeur 0, sinon on retourne le meilleur score.
		return depth === 0 ? move : bestScore;
	}
}


// Cette fonction utilise la fonction minimax pour déterminer le meilleur mouvement pour le joueur "X".
function getBestMove(squares: Array<string | null>): number {
	return minimax(squares, 0, true, -Infinity, Infinity);
}

export default getBestMove;

// Note : Mon algo privilégie le fait de ne pas perdre, quitte à rater une occasion de gagner.
/* Cet algorithme fait le tour de tous les mouvements possibles dans le jeu et évalue chaque situation. 
On calcule le score selon le gagnant, le nombre de mouvements joués (la "profondeur" du jeu) et selon si
 c'est le tour du joueur "X" ou "O". Le joueur "X" essaie d'augmenter le score, tandis que "O" cherche à le diminuer.
  L'algorithme se sert aussi de quelque chose appelé élagage alpha-beta, qui permet de réduire 
le nombre de possibilités qu'il faut explorer dans l'arbre du jeu, ce qui rend le tout beaucoup plus efficace. */

