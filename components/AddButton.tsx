import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const AddButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.addBtnContainer} onPress={onPress}>
        <AntDesign name="plus" size={40} color="white" />
    </TouchableOpacity>
  )
}

export default AddButton

const styles = StyleSheet.create({
    addBtnContainer: {
        height: 50,
        width: 50,
        backgroundColor: '#3c6a6c',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 30,
        marginBlockStart: 250
    }
})