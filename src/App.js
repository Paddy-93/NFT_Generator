import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import ConnectWalletButton from './components/ConnectWalletButton';
import { Route, Routes } from 'react-router-dom';
import ContractCreate from './pages/ContractCreate';
import Navbar from './components/Navbar';
import MyProject from './pages/MyProject';

const App = () => {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.rinkeby, chain.goerli, chain.ropsten, chain.localhost],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
    
    
      <ConnectWalletButton/>
      <Navbar/>
      <Routes>
        <Route exact path="/new" element={<ContractCreate/>}/>
        <Route exact path="/myproject" element={<MyProject/>}/>
      </Routes>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
