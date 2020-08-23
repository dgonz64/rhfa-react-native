import React from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

export const Radios = ({
  options,
  value,
  onChange,
  styles
}) =>
  <View style={styles.radioContainer}>
    {
      options.map(option => {
        const handleChange = () => {
          onChange(option.value)
        }

        return (
          <TouchableWithoutFeedback
            key={option.value}
            onPress={handleChange}
          >
            <View style={styles.radioLine}>
              <View style={styles.radioWrap}>
                {
                  option.value == value &&
                    <View style={styles.radioSelected} />
                }
              </View>
              <Text style={styles.radioLabel}>
                {option.label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })
    }
  </View>
