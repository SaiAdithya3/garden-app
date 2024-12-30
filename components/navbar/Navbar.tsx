import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import ConnectWalletButton from './ConnectWalletButton';
import { colors } from '../../theme/colors';
import navbarlogo from '../../assets/images/gardenlogos/garden_horizontal_darkgrey.png';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Image source={navbarlogo} style={styles.logo} />
      <ConnectWalletButton title="Connect" />
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    position: 'sticky',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
    backdropFilter: 'blur(10px)',
    // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  logo: {
    width: 130,
    height: 55,
    resizeMode: 'contain',
  },
})

export default Navbar