import React from 'react'
import { View } from 'react-native'

const renderItems = ({ items, Panel, styles }) =>
  items.map(({ idx, closeButton, inputs }) =>
    <Panel key={idx} styles={styles} header={closeButton}>
      {inputs}
    </Panel>
  )

export const ArrayPanel = (props) => {
  const { name, skin } = props
  const Panel = skin.panel.render

  return (
    <View key={name}>
      {renderItems({ ...props, Panel })}
    </View>
  )
}
