import React, { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Modal } from 'react-native'
import { colors } from '../../theme/colors'
import { useAppKit, useWalletInfo } from '@reown/appkit-wagmi-react-native'
import {
  useAccount,
} from "wagmi";

type ConnectWalletButtonProps = {
  title: string
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ title }) => {
  const { open, close } = useAppKit()
  const { walletInfo } = useWalletInfo();
  const { address, isConnected } = useAccount();
  const finalAddress = isConnected ? address?.slice(0, 4) + "..." + address?.slice(-4) : title;

  const handlePress = () => {
    if (isConnected) {
      open({view: 'Account'});
    } else {
      open({view: 'Connect'});
    }
  }


  return (
    <View>
      <TouchableOpacity style={!isConnected ? styles.button : styles.buttonActive} onPress={handlePress}>
        <Text style={!isConnected ? styles.buttonText : styles.buttonTextActive}>
          {isConnected ? finalAddress : title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryButtonColor,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  buttonActive: {
    backgroundColor: colors.activeButtonColor,
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextActive: {
    color: colors.fontColor,
    fontSize: 16,
    fontWeight: '600',
  }
})

export default ConnectWalletButton