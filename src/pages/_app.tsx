import { AppProps } from 'next/app';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification'
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

declare global {
  interface Window {
    xnft: any;
  }
}
const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>

          <ContextProvider>
            <div className="flex flex-col h-screen">
              <Notifications />
              <AppBar/>
              <ContentContainer>
                <Component {...pageProps} />
              </ContentContainer>
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
