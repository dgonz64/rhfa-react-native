import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ArrayTable } from './components/ArrayTable'
import { ArrayPanel } from './components/ArrayPanel'
import { Radios } from './components/Radios'
import { Panel } from './components/Panel'
import { Button } from './components/Button'
import { TextInput } from './components/TextInput'
import {
  trPath,
  trField,
  tr,
  processOptions,
  stringExists
} from 'react-hook-form-auto'
import Checkbox from '@react-native-community/checkbox'
import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-picker/picker'

function createChanger(setValue, name) {
  return function onChange(value) {
    setValue(name, value, { shouldValidate: true })
  }
}

const GroupAdaptor = ({
  name,
  field,
  fieldSchema,
  schemaTypeName,
  errorText,
  helperText,
  inline,
  children,
  labelOverride,
  addWrapperProps,
  styles
}) => {
  if (inline) {
    return children
  } else {
    const label = typeof labelOverride != 'undefined' ?
      labelOverride : trField({ fieldSchema, schemaTypeName, field })

    if (errorText)
      helperText = errorText

    const infoId = trPath(schemaTypeName, field, '_labelInfo')
    const labelInfo = stringExists(infoId) ?
      tr(infoId) : fieldSchema.required && tr('requiredLabel')

    let containerStyles = [
      styles.container,
      errorText && styles.erroredContainer
    ].filter(style => style)

    let helperTextStyles = [
      styles.helperText,
      errorText && styles.erroredHelperText
    ]

    return (
      <View style={containerStyles}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
          </Text>  
          {
            labelInfo &&
              <Text style={styles.labelInfo}>
                {labelInfo}
              </Text>
          }
        </View>
        {children}
        {
          helperText &&
            <Text style={helperTextStyles}>
              {helperText}
            </Text>
        }
      </View>
    )
  }
}

// Both render and adaptorComponent will do.
const ControlAdaptor = ({
  name,
  defaultValue,
  value,
  errorText,
  field,
  fieldSchema,
  formHook,
  rules,
  adaptorComponent,
  children,
  controlProps,
  setValue,
  styles,
  render,
  ...rest
}) => {
  let inputStyle = [
    styles.input,
    errorText && styles.erroredInput
  ]

  // Will use my own onChange instead of Control's to
  // make it work with coercers
  const handleChange = createChanger(setValue, name)

  const Comp = adaptorComponent

  return (
    <Comp
      {...controlProps}
      {...rest}
      value={value}
      onChange={handleChange}
      styles={styles}
      style={inputStyle}
    />
  )
}

export default {
  defaultWrap: GroupAdaptor,
  string: {
    controlled: true,
    render: (props) => {
      return {
        ...props,
        component: ControlAdaptor,
        adaptorComponent: TextInput
      }
    }
  },
  number: {
    coerce: value => value && parseFloat(value) || 0,
    controlled: true,
    render: (props) => {
      return {
        ...props,
        component: ControlAdaptor,
        adaptorComponent: TextInput,
        controlProps: { type: 'number' }
      }
    }
  },
  password: {
    controlled: true,
    render: (props) => {
      return {
        ...props,
        component: ControlAdaptor,
        adaptorComponent: TextInput,
        controlProps: { type: 'password' }
      }
    }
  },
  select: {
    controlled: true,
    render: {
      component: (props) => {
        const {
          schemaTypeName,
          name,
          formHook,
          defaultValue,
          styles,

          value,
          setValue,
        } = props

        const label = trField(props)
        const options = processOptions({
          ...props,
          addDefault: true
        })

        const handleChange = createChanger(setValue, name)

        return (
          <Picker
            selectedValue={value}
            onValueChange={handleChange}
            style={styles.select}
          >
            {
              options.map(({ label, value }) =>
                <Picker.Item
                  key={value}
                  label={label}
                  value={value}
                />
              )
            }
          </Picker>
        )
      }
    }
  },
  boolean: {
    wrapper: (props) => props.children,
    coerce: value => Boolean(value),
    controlled: true,
    render: {
      component: (props) => {
        const {
          name,
          defaultValue,
          formHook,
          control,
          styles,

          value,
          setValue,
          onBlur
        } = props

        const label = trField(props)

        const handleChange = createChanger(setValue, name)

        return (
          <View style={styles.checkboxWrap}>
            <Checkbox
              key={name}
              name={name}
              value={value}
              onValueChange={handleChange}
            />
            <Text style={styles.checkboxLabel}>
              {label}
            </Text>
          </View>
        )
      }
    }
  },
  radios: {
    controlled: true,
    render: {
      component: (props) => {
        const {
          name,
          formHook,
          defaultValue,
          styles,

          value,
          setValue,
          onBlur
        } = props

        const label = trField(props)
        const options = processOptions(props)

        const handleChange = createChanger(setValue, name)

        return (
          <Radios
            options={options}
            value={value}
            onChange={handleChange}
            styles={styles}
          />
        )
      }
    }
  },
  range: {
    coerce: value => parseFloat(value),
    controlled: true,
    render: {
      component: (props) => {
        const {
          name,
          fieldSchema: {
            min,
            max,
            step,
            sliderParams
          },
          formHook,
          styles,

          value,
          setValue,
          onBlur
        } = props

        const defaultValue = typeof props.defaultValue == 'undefined' ?
          min : props.defaultValue
        const stepExp = Math.log10(step)
        const stepDecimals = stepExp >= 0 ? 0 : -stepExp

        const change = createChanger(setValue, name)

        const handleChange = (newValue) => {
          if (!step) {
            change(newValue)
          } else {
            const steps = parseInt((newValue - min) / step)
            const steppedValue = min + steps * step
            const prettyValue = steppedValue.toFixed(stepDecimals)
            change(parseFloat(prettyValue))
          }
        }

        return (
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{value}</Text>
            <Slider
              {...sliderParams}
              minimumValue={min}
              maximumValue={max}
              value={value}
              step={step}
              onValueChange={handleChange}
              style={styles.slider}
            />
          </View>
        )
      }
    }
  },
  button: {
    render: Button
  },
  arrayButton: {
    render: (props) => <Button {...props} mini />
  },
  form: {
    render: ({ children }) =>
      <View>
        {children}
      </View>
  },
  panel: {
    render: ({ children, header, styles }) =>
      <Panel header={header} styles={styles}>
        {children}
      </Panel>
  },
  addGlyph: {
    render: ({ styles }) =>
      <Text style={styles && styles.addText}>+</Text>
  },
  removeGlyph: {
    render: ({ styles }) =>
      <Text style={styles && styles.removeText}>-</Text>
  },
  arrayTable: {
    render: ArrayTable
  },
  arrayPanel: {
    render: ArrayPanel
  },
  div: {
    render: ({ className, ...rest }) =>
      <View style={className} {...rest} />
  },
  text: {
    render: ({ className, ...rest }) =>
      <Text style={className} {...rest} />
  }
}
