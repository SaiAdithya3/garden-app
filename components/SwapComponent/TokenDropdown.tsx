import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native'
import { tokens } from '@/constants/tokens'
import { colors } from '@/theme/colors'

const TokenDropdown = () => {
  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleSelectToken = (token: any) => {
    setSelectedToken(token)
    setDropdownOpen(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownOpen(!isDropdownOpen)}
      >
        <View style={styles.tokenInfo}>
          <Image source={selectedToken.icon} style={styles.tokenIcon} />
          <Text style={styles.tokenText}>{selectedToken.symbol}</Text>
        </View>
        <Image
          source={require('../../assets/images/chevrondown.png')}
          style={[
            styles.arrowIcon,
            { transform: [{ rotate: isDropdownOpen ? '0deg' : '180deg' }] },
          ]}
        />
      </TouchableOpacity>
      {!isDropdownOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={tokens}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelectToken(item)}
              >
                <Image source={item.icon} style={styles.tokenIcon} />
                <View style={styles.tokenDetails}>
                  <Text style={styles.tokenName}>{item.name}</Text>
                  <Text style={styles.tokenChain}>{item.chain}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    position: 'relative',
    marginVertical: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  tokenText: {
    fontSize: 16,
    color: colors.fontColor,
  },
  arrowIcon: {
    width: 12,
    height: 12,
    marginLeft: 6,
  },
  dropdown: {
    position: 'absolute',
    top: 18,
    right: 0,
    zIndex: 10,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.disabledButtonColor,
    maxHeight: 200,
    width: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  tokenDetails: {
    marginLeft: 10,
  },
  tokenName: {
    fontSize: 16,
    color: colors.fontColor,
  },
  tokenChain: {
    fontSize: 12,
    color: colors.fontColor,
  },
})

export default TokenDropdown