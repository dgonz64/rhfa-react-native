import React, { forwardRef } from 'react'

import skin from '../skin'
import { AutoformBase } from 'react-hook-form-auto'

export let Autoform = (props, ref) =>
  <AutoformBase
    {...props}
    skin={skin}
    ref={ref}
  />

Autoform = forwardRef(Autoform)
