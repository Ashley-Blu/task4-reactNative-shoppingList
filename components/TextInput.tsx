import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextInput = () => {
  return (
    <View>
      <TextInput 
        value={value},
        onChangeText={onChangeText},
        placeholder={placeholder}
      />
    </View>
  )
}

export default TextInput

const styles = StyleSheet.create({})