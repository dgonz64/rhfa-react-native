import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Panel = ({ header, children, styles }) =>
  <View style={styles.panel}>
    <View style={styles.panelHeader}>
      {
        typeof header == 'string' &&
          <Text style={styles.panelHeaderText}>
            {header}
          </Text>
        ||
          header
      }
    </View>
    <View style={styles.panelContents}>
      {children}
    </View>
  </View>
