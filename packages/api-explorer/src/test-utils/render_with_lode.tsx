/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */

import type { ReactElement } from 'react'
import React from 'react'
import type { RenderOptions } from '@testing-library/react'
import type { Store } from 'redux'

import { renderWithTheme } from '@looker/components-test-utils'
import type { IDeclarationMine, IExampleMine } from '@looker/sdk-codegen'
import { LodeContext } from '../context'
import type { RootState } from '../state'
import type { IApixEnvAdaptor } from '../utils'
import { withReduxProvider } from './redux'

const withLode = (
  consumer: ReactElement<any>,
  examples: IExampleMine,
  declarations?: IDeclarationMine
) => {
  return (
    <LodeContext.Provider value={{ examples, declarations }}>
      {consumer}
    </LodeContext.Provider>
  )
}

export const renderWithLode = (
  component: ReactElement<any>,
  examples: IExampleMine,
  declarations?: IDeclarationMine,
  options?: Omit<RenderOptions, 'queries'>
) => {
  return renderWithTheme(withLode(component, examples, declarations), options)
}

export const renderWithReduxProviderAndLode = (
  component: ReactElement<any>,
  examples: IExampleMine,
  declarations?: IDeclarationMine,
  store?: Store<RootState>,
  envAdaptor?: IApixEnvAdaptor,
  options?: Omit<RenderOptions, 'queries'>
) =>
  renderWithTheme(
    withReduxProvider(
      withLode(component, examples, declarations),
      store,
      envAdaptor
    ),
    options
  )
