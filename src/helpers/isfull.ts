// Fonction qui compte le nombre de X et O dans le tableau
export function countXAndO(array: (string | null)[]): number {
	let count = 0;
	for (const value of array) {
	  if (value === 'X' || value === 'O') {
		count++;
	  }
	}
	return count;
  }

// Fonction qui détermine si le tableau est plein
  const isBoardFull = (squares: Array<string | null>): boolean => {
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        return false;
      }
    }
    return true;
  }
  
  export default isBoardFull;