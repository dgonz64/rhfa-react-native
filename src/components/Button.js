import React from 'react'
import {
  Button as RNButton,
  TouchableOpacity
} from 'react-native'

export const Button = ({
  className,
  styles,
  children,
  type,
  onClick,
  intent,
  mini,
  ...rest
}) => {
  styles = styles || className
  const rnIntent = type == 'submit' ? 'primary' : null

  let buttonStyle = [
    styles.button,
    mini && styles.buttonMini,
    intent == 'add' && styles.buttonAdd,
    intent == 'remove' && styles.buttonRemove,
  ].filter(style => style)

  if (typeof children == 'string') {
    return (
      <RNButton
        title={children}
        intent={rnIntent}
        style={buttonStyle}
        onPress={onClick}
        {...rest}
      />
    )
  } else {
    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={onClick}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    )
  }
}
