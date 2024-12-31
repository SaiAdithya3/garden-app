import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import WalletConnect from '@walletconnect/client';
import * as Keychain from 'react-native-keychain';
import { ethers } from 'ethers';

// Wallet types we support
const WALLET_TYPES = {
  METAMASK: 'metamask',
  TRUST_WALLET: 'trust',
  COINBASE: 'coinbase',
  BITCOIN_CORE: 'bitcoin',
};

const CustomWallet = ({ onWalletConnected, onTransactionComplete }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletModalVisible, setWalletModalVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletAddresses, setWalletAddresses] = useState({
    evm: null,
    bitcoin: null
  });
  const [balances, setBalances] = useState({
    evm: '0',
    bitcoin: '0'
  });

  // Initialize WalletConnect
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
    qrcodeModal: true
  });

  useEffect(() => {
    // Load saved wallet addresses
    loadSavedWalletData();
    
    // Set up WalletConnect event listeners
    setupWalletConnectListeners();

    return () => {
      // Cleanup listeners
      if (connector) {
        connector.killSession();
      }
    };
  }, []);

  const loadSavedWalletData = async () => {
    try {
      const savedAddresses = await Keychain.getGenericPassword('wallet_addresses');
      if (savedAddresses) {
        const addresses = JSON.parse(savedAddresses.password);
        setWalletAddresses(addresses);
        if (addresses.evm || addresses.bitcoin) {
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Error loading saved wallet data:', error);
    }
  };

  const setupWalletConnectListeners = () => {
    connector.on("connect", (error, payload) => {
      if (error) {
        console.error(error);
        return;
      }
      handleWalletConnected(payload);
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        console.error(error);
        return;
      }
      handleWalletDisconnected();
    });
  };

  const handleWalletConnected = async (payload) => {
    const { accounts, chainId } = payload.params[0];
    const newAddresses = { ...walletAddresses };

    if (chainId.startsWith('0x')) { // EVM chain
      newAddresses.evm = accounts[0];
    } else { // Bitcoin
      newAddresses.bitcoin = accounts[0];
    }

    setWalletAddresses(newAddresses);
    await Keychain.setGenericPassword('wallet_addresses', JSON.stringify(newAddresses));
    setIsConnected(true);
    onWalletConnected && onWalletConnected(newAddresses);
  };

  const handleWalletDisconnected = async () => {
    setWalletAddresses({ evm: null, bitcoin: null });
    await Keychain.resetGenericPassword();
    setIsConnected(false);
    setSelectedWallet(null);
  };

  const connectWallet = async (walletType) => {
    try {
      setSelectedWallet(walletType);
      
      if (walletType === WALLET_TYPES.BITCOIN_CORE) {
        // Bitcoin specific connection logic
        // You'll need to implement specific Bitcoin wallet SDK integration here
      } else {
        // EVM wallet connection via WalletConnect
        if (!connector.connected) {
          await connector.createSession();
        }
      }
      
      setWalletModalVisible(false);
    } catch (error) {
      Alert.alert('Connection Error', error.message);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (connector.connected) {
        await connector.killSession();
      }
      await handleWalletDisconnected();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const sendTransaction = async (toAddress, amount, chain) => {
    try {
      if (!isConnected) throw new Error('Wallet not connected');

      if (chain === 'evm') {
        const transaction = {
          to: toAddress,
          value: ethers.utils.parseEther(amount.toString()),
          data: '0x',
        };

        const result = await connector.sendTransaction(transaction);
        onTransactionComplete && onTransactionComplete(result);
        return result;
      } else if (chain === 'bitcoin') {
        // Implement Bitcoin transaction logic
        // You'll need to use a Bitcoin-specific library here
      }
    } catch (error) {
      Alert.alert('Transaction Error', error.message);
      throw error;
    }
  };

  const getBalance = async (chain) => {
    try {
      if (!walletAddresses[chain]) return '0';

      if (chain === 'evm') {
        const provider = new ethers.providers.JsonRpcProvider();
        const balance = await provider.getBalance(walletAddresses.evm);
        return ethers.utils.formatEther(balance);
      } else if (chain === 'bitcoin') {
        // Implement Bitcoin balance checking
        // You'll need to use a Bitcoin-specific API or library
      }
    } catch (error) {
      console.error(`Error getting ${chain} balance:`, error);
      return '0';
    }
  };

  return (
    <View style={styles.container}>
      {!isConnected ? (
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => setWalletModalVisible(true)}
        >
          <Text style={styles.buttonText}>Connect Wallet</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.connectedContainer}>
          <Text style={styles.addressText}>
            EVM Address: {walletAddresses.evm ? `${walletAddresses.evm.slice(0, 6)}...${walletAddresses.evm.slice(-4)}` : 'Not connected'}
          </Text>
          <Text style={styles.addressText}>
            BTC Address: {walletAddresses.bitcoin ? `${walletAddresses.bitcoin.slice(0, 6)}...${walletAddresses.bitcoin.slice(-4)}` : 'Not connected'}
          </Text>
          <TouchableOpacity
            style={styles.disconnectButton}
            onPress={disconnectWallet}
          >
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={walletModalVisible}
        onRequestClose={() => setWalletModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Wallet</Text>
            {Object.values(WALLET_TYPES).map((wallet) => (
              <TouchableOpacity
                key={wallet}
                style={styles.walletOption}
                onPress={() => connectWallet(wallet)}
              >
                <Text style={styles.walletOptionText}>{wallet.charAt(0).toUpperCase() + wallet.slice(1)}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setWalletModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disconnectButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectedContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  walletOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  walletOptionText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#757575',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
});

export default CustomWallet;