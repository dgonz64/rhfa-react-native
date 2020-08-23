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
import { Controller } from 'react-hook-form'
import Checkbox from '@react-native-community/checkbox'
import Slider from '@react-native-community/slider'
import { Picker } from '@react-native-community/picker'

const GroupAdaptor = ({
  name,
  field,
  fieldSchema,
  schemaTypeName,
  errors,
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
    const error = errors[field]

    const helperId = trPath(schemaTypeName, field, '_helper')
    let helperText
    if (error && error.message)
      helperText = error.message
    else if (stringExists(helperId))
      helperText = tr(helperId)
    else
      helperText = fieldSchema.helperText

    const infoId = trPath(schemaTypeName, field, '_labelInfo')
    const labelInfo = stringExists(infoId) ?
      tr(infoId) : fieldSchema.required && tr('requiredLabel')

    let containerStyles = [
      styles.container,
      error && styles.erroredContainer
    ].filter(style => style)

    let helperTextStyles = [
      styles.helperText,
      error && styles.erroredHelperText
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
const ControlAdaptor = props => {
  const {
    name,
    defaultValue,
    controlProps,
    errors,
    field,
    fieldSchema,
    formHook,
    rules,
    register,
    adaptorComponent,
    setValue,
    styles,
    render,
    ...rest
  } = props

  const error = errors[field]
  let inputStyle = [
    styles.input,
    error && styles.erroredInput
  ]

  // Will use my own onChange instead of Control's to
  // make it work with coercers
  const handleChange = (text) => {
    setValue(name, text, { shouldValidate: true })
  }

  const Comp = adaptorComponent
  const renderFunction = render || function({ value }) {
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

  return (
    <Controller
      name={name}
      control={formHook.control}
      defaultValue={defaultValue || ''}
      render={renderFunction}
      rules={rules}
    />
  )
}

export default {
  defaultWrap: GroupAdaptor,
  string: {
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
    render: {
      component: (props) => {
        const {
          schemaTypeName,
          name,
          field,
          fieldSchema,
          setValue,
          formHook,
          defaultValue,
          styles
        } = props

        const label = trField(props)
        const options = processOptions({
          ...props,
          addDefault: true
        })

        const renderSelect = ({ value, onChange, onBlur }) =>
          <Picker
            selectedValue={value}
            onValueChange={onChange}
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

        return (
          <Controller
            key={name}
            name={name}
            control={formHook.control}
            defaultValue={defaultValue || 0}
            render={renderSelect}
          />
        )
      }
    }
  },
  boolean: {
    wrapper: (props) => props.children,
    coerce: value => Boolean(value),
    render: {
      component: (props) => {
        const {
          name,
          defaultValue,
          formHook,
          control,
          styles
        } = props

        const label = trField(props)

        const renderCheckbox = ({ value, onChange, onBlur }) =>
          <View style={styles.checkboxWrap}>
            <Checkbox
              key={name}
              name={name}
              value={value}
              onValueChange={onChange}
            />
            <Text style={styles.checkboxLabel}>
              {label}
            </Text>
          </View>

        return (
          <Controller
            key={name}
            name={name}
            control={formHook.control}
            defaultValue={defaultValue || false}
            render={renderCheckbox}
          />
        )
      }
    }
  },
  radios: {
    render: {
      component: (props) => {
        const {
          name,
          formHook,
          defaultValue,
          styles
        } = props

        const label = trField(props)
        const options = processOptions(props)

        const renderRadio = ({ value, onChange, onBlur }) =>
          <Radios
            options={options}
            value={value}
            onChange={onChange}
            styles={styles}
          />

        return (
          <Controller
            name={name}
            control={formHook.control}
            defaultValue={defaultValue || 0}
            render={renderRadio}
          />
        )
      }
    }
  },
  range: {
    coerce: value => parseFloat(value),
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
          styles
        } = props

        const defaultValue = props.defaultValue ?? min
        const stepExp = Math.log10(step)
        const stepDecimals = stepExp >= 0 ? 0 : -stepExp

        const renderSlider = ({ value, onChange, onBlur }) => {
          const handleChange = (newValue) => {
            if (!step) {
              onChange(newValue)
            } else {
              const steps = parseInt((newValue - min) / step)
              const steppedValue = min + steps * step
              const prettyValue = steppedValue.toFixed(stepDecimals)
              onChange(parseFloat(prettyValue))
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
        
        return (
          <Controller
            name={name}
            control={formHook.control}
            defaultValue={defaultValue || min}
            render={renderSlider}
          />
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
