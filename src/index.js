export * from 'react-hook-form-auto'

import {
  AutoformBase,
  setLanguageByName,
  addTranslations
} from 'react-hook-form-auto'

export { Panel } from './components/Panel'

setLanguageByName('en')
addTranslations({
  requiredLabel: '(required)'
})

export { Autoform } from './components/Autoform'
