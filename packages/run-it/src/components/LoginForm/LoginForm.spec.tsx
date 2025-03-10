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

import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from '@looker/components-test-utils'
import userEvent from '@testing-library/user-event'
import { defaultConfigurator, readyToLogin } from '..'
import { runItNoSet } from '../..'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  // https://testing-library.com/docs/guide-which-query

  test('it creates a login form', async () => {
    renderWithTheme(
      <LoginForm
        configurator={defaultConfigurator}
        requestContent={{}}
        setVersionsUrl={runItNoSet}
      />
    )
    const login = screen.getByRole('button', {
      name: 'Login',
    })
    expect(login).toBeInTheDocument()
    await waitFor(() => {
      userEvent.hover(login)
      expect(screen.getByRole('tooltip')).toHaveTextContent(readyToLogin)
    })
  })
})
