import { StyleSheet } from 'react-native'

export function createStyles({
  backgroundColor = '#e0e0e0',
  height = 32,
  headerColor = '#a0a0a0',
  panelBorderColor = '#a0a0a0',
  inputBorderColor = '#c0c0c0',
  inputBackgroundColor = '#ffffff',
  radioRadio = 8,
  radioColor = '#808080',
  radioSelectedColor = '#404040',
  buttonColor = '#909090',
  addColor = '#70a070',
  addTextColor = '#104010',
  removeColor = '#a07070',
  removeTextColor = '#ffe0e0',
  errorColor = '#601010',
  errorBackgroundColor = '#ffe0e0',
  miniHeight = 24,
  fontSize = 16
} = {}) {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: buttonColor,
      width: height,
      height
    },
    buttonMini: {
      width: miniHeight,
      height: miniHeight,
    },
    panel: {
      borderColor: panelBorderColor,
      marginBottom: 2,
      borderWidth: 1,
      borderRadius: 4,
      borderStyle: 'solid',
    },
    panelHeader: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 12,
      paddingHorizontal: 4,
      backgroundColor,
      shadowColor: '#101010',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3
    },
    panelHeaderText: {
      fontSize: fontSize - 2,
      fontWeight: 'bold'
    },
    panelContents: {
      paddingVertical: 4,
      paddingHorizontal: 8
    },
    container: {
      marginVertical: 4,
      paddingHorizontal: 4
    },
    erroredContainer: {
      backgroundColor: errorBackgroundColor,
      borderRadius: 2
    },
    input: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: inputBorderColor,
      backgroundColor: inputBackgroundColor,
      borderRadius: 4,
      paddingVertical: 8,
      fontSize,
      height
    },
    erroredInput: {
      borderWidth: 1.5,
      borderStyle: 'solid',
      borderColor: errorColor
    },
    labelContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    label: {
      fontWeight: 'bold',
      marginVertical: 2
    },
    labelInfo: {
      color: '#404040',
      fontSize: fontSize - 2,
      marginLeft: 4
    },
    helperText: {
      fontSize: fontSize - 4,
      color: '#606060'
    },
    erroredHelperText: {
      fontStyle: 'italic',
      color: errorColor
    },
    error: {
      fontSize: fontSize - 4,
      fontStyle: 'italic',
      color: errorColor
    },
    radioContainer: {
      flex: 1,
      flexDirection: 'column'
    },
    radioLine: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: 2,
      alignItems: 'center'
    },
    radioWrap: {
      width: 2 * radioRadio,
      height: 2 * radioRadio,
      borderRadius: radioRadio,
      borderWidth: 2,
      borderColor: radioColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 6
    },
    radioSelected: {
      width: radioRadio,
      height: radioRadio,
      borderRadius: radioRadio / 2,
      backgroundColor: radioSelectedColor
    },
    radioLabel: {
      fontSize: fontSize - 2,
      marginLeft: 6
    },
    checkboxWrap: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 2
    },
    checkboxLabel: {
      fontSize: fontSize - 2,
      marginLeft: 4
    },
    sliderContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch'
    },
    sliderValue: {
      alignSelf: 'center'
    },
    buttonAdd: {
      backgroundColor: addColor,
      borderRadius: 2,
      shadowColor: '#102010',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 2
    },
    buttonRemove: {
      backgroundColor: removeColor,
      borderRadius: 2,
      shadowColor: '#102010',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 2
    },
    addText: {
      color: addTextColor
    },
    removeText: {
      color: removeTextColor
    },
    inputPanelWrap: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    inputPanelEntity: {
      fontSize: fontSize,
      fontWeight: 'bold'
    }
  })
}
