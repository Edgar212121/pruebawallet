'use client'

import {useTonConnectUI} from "@tonconnect/ui-react";
import {useCallback, useState, useEffect} from "react";

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection  = useCallback((addres : string) => {  
    setTonWalletAddress(addres);
    console.log("Wallet connected successfully");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully");
    setIsLoading(false);
  }, []);

useEffect(() => {
  const checkWalletConnection =  async () => {
    if( tonConnectUI.account?.address) {
      handleWalletConnection(tonConnectUI.account.address);
    } else {
      handleWalletDisconnection();
    }
  };  

  checkWalletConnection();

  const unsubscribe = tonConnectUI.onStatusChange((wallet)=> {
    if(wallet){
      handleWalletConnection(wallet.account.address);

    } else {
      handleWalletDisconnection();
    } 
  }
  );
    return () => {
      unsubscribe();
    }

}, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);


const handleWalletAction = async () => {
  if(tonConnectUI.connected) {
    setIsLoading(true);
    await tonConnectUI.disconnect();
  } else {
    await tonConnectUI.openModal();
  }
};


const formatAddress = (address: string) => {
  const tempAddress = address.slice(0, 4) + '...' + address.slice(-4);
  return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
};

if (isLoading) {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <p className="text-2xl font-bold">Loading...</p>
      </div>  
    </main>
  );
}

  return (
    <main className="flex items-center justify-center h-screen">
      <h1 className="text-4x1 font-bold">Welcome to TON Connect</h1>
      {tonWalletAddress ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg">Connected: {formatAddress(tonWalletAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
          >
            Disconnect
          </button>  
        </div>
      ) : (
        <button 
          onClick={handleWalletAction}
          className="px-4 py-2 text-white bg-blue-500 rounded-md" 
        >
          Connect Wallet
        </button>
      )
        }
    
    </main>
   
  );
}
