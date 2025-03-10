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

import type { FC } from 'react'
import React from 'react'
import { Tab, TabList, TabPanel, TabPanels, useTabs } from '@looker/components'
import type { IMethodResponse } from '@looker/sdk-codegen'

import { CollapserCard } from '@looker/run-it'
import { DocResponseTypes } from './DocResponseTypes'
import { buildResponseTree } from './utils'

interface DocResponsesProps {
  responses: IMethodResponse[]
}

/**
 * Renders a tab list and tab panels for different method response types
 */
export const DocResponses: FC<DocResponsesProps> = ({ responses }) => {
  const tabs = useTabs()

  if (responses.length === 0) return <></>

  const responseTree = buildResponseTree(responses)

  return (
    <CollapserCard heading="Response Models" id="response models">
      <>
        <TabList {...tabs}>
          {Object.keys(responseTree).map((statusCode, index) => (
            <Tab key={index}>{statusCode}</Tab>
          ))}
        </TabList>
        <TabPanels {...tabs} pt="0">
          {Object.values(responseTree).map((responses, index) => (
            <TabPanel key={index}>
              <DocResponseTypes responses={responses} />
            </TabPanel>
          ))}
        </TabPanels>
      </>
    </CollapserCard>
  )
}
