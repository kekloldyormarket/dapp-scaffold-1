import React from 'react';
import MintButton from '../components/MintButton';

const App = () => {
  const stakedMeerkatNFT = false; // Replace with logic to check if the user has a staked Meerkat NFT

  const onMint = () => {
    console.log('Minting completed');
  };

  return (
    <div>
      <h1>Mint NFT</h1>
      <MintButton stakedMeerkatNFT={stakedMeerkatNFT} onMint={onMint} />
    </div>
  );
};

export default App;
