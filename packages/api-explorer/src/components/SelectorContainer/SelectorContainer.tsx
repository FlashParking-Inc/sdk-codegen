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

import type { FC, Dispatch } from 'react'
import React from 'react'
import { Space, IconButton } from '@looker/components'
import { ChangeHistory } from '@styled-icons/material/ChangeHistory'
import type { SpecList, SpecItem } from '@looker/sdk-codegen'
import { Link } from '../Link'
import type { SpecAction } from '../../reducers'
import { diffPath } from '../../utils'
import { SdkLanguageSelector } from './SdkLanguageSelector'
import { ApiSpecSelector } from './ApiSpecSelector'

interface SelectorContainerProps {
  /** Specs to choose from */
  specs: SpecList
  /** Current selected spec */
  spec: SpecItem
  /** Spec state setter */
  specDispatch: Dispatch<SpecAction>
}

export const HEADER_REM = 4

/**
 * Renders a container for selectors
 */
export const SelectorContainer: FC<SelectorContainerProps> = ({
  specs,
  spec,
  specDispatch,
}) => (
  <Space width="auto">
    <SdkLanguageSelector />
    <ApiSpecSelector specs={specs} spec={spec} specDispatch={specDispatch} />
    <Link to={`/${diffPath}/${spec.key}/`}>
      <IconButton
        toggle
        label="Compare Specifications"
        icon={<ChangeHistory />}
        size="small"
      />
    </Link>
  </Space>
)
