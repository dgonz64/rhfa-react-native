import React from 'react'
import { TextInput as RNTextInput } from 'react-native'

export const TextInput = ({
  value,
  onChange,
  style,
  type
}) => {
  return (
    <RNTextInput
      value={value}
      onChangeText={onChange}
      style={style}
      type={type}
    />
  )
}
