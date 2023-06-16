
## LIEN DU SITE : 

## Morpion

Methode utilisé pour l'IA : Minimax 
Cet algorithme fait le tour de tous les mouvements possibles dans le jeu et évalue chaque situation. On calcule le score selon le gagnant, le nombre de mouvements joués (la "profondeur" du jeu) et selon si c'est le tour du joueur "X" ou "O". Le joueur "X" essaie d'augmenter le score, tandis que "O" cherche à le diminuer. L'algorithme se sert aussi de quelque chose appelé élagage alpha-beta, qui permet de réduire le nombre de possibilités qu'il faut explorer dans l'arbre du jeu, ce qui rend le tout beaucoup plus efficace.

Techno utilisé : Next.JS / tsx / SCSS

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server (Node v.20.3):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

