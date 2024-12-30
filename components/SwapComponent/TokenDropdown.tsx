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

  const handleSelectToken = (token) => {
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
          source={require('../../assets/images/gardenlogos/garden_logomark.png')}
          style={[
            styles.arrowIcon,
            { transform: [{ rotate: isDropdownOpen ? '180deg' : '0deg' }] },
          ]}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={tokens}
            keyExtractor={(item) => item.symbol}
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
    marginVertical: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.bgtrans,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.disabledButtonColor,
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
    width: 16,
    height: 16,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.disabledButtonColor,
    maxHeight: 200,
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