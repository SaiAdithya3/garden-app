import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native'
import { colors } from '@/theme/colors'
import TokenDropdown from './TokenDropdown'

type TokenInputProps = {
  type: string
}

const TokenInput: React.FC<TokenInputProps> = ({ type }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.typetext}>{type}</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textinput}
              placeholder="0.0"
              placeholderTextColor="#554b6aad"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.tokenButton}>
              <Text style={styles.coinText}>BTC</Text>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968260.png' }}
                style={styles.tokenImage}
              />
            </TouchableOpacity>
            {/* <TokenDropdown /> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 5,
    borderRadius: 16,
    paddingVertical: 20,
  },
  typetext: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.fontColor,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 2,
  },
  textinput: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  tokenButton: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  coinText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
  },
  tokenImage: {
    width: 24,
    height: 24,
  },
})

export default TokenInput