import type { AppProps } from 'next/app';
import { GameProvider } from '@/contexts/GameContext';
import '@/styles/styles.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<GameProvider>
			<Component {...pageProps} />
		</GameProvider>
	)
}
export default MyApp;