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

import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Accordion2, Heading } from '@looker/components'
import type { MethodList } from '@looker/sdk-codegen'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Link } from '../Link'
import { buildMethodPath, highlightHTML } from '../../utils'
import { SearchContext } from '../../context'

interface MethodsProps {
  className?: string
  defaultOpen?: boolean
  methods: MethodList
  tag: string
  specKey: string
}

export const SideNavMethods = styled(
  ({ className, defaultOpen = false, methods, tag, specKey }: MethodsProps) => {
    const {
      searchSettings: { pattern },
    } = useContext(SearchContext)
    const match = useRouteMatch<{ methodTag: string }>(
      `/:specKey/methods/:methodTag/:methodName?`
    )
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const history = useHistory()

    const handleOpen = () => {
      const _isOpen = !isOpen
      setIsOpen(_isOpen)
      if (_isOpen) history.push(`/${specKey}/methods/${tag}`)
    }

    useEffect(() => {
      const status = match
        ? defaultOpen || match.params.methodTag === tag
        : defaultOpen
      setIsOpen(status)
    }, [defaultOpen])

    /* TODO: Fix highlighting. It is applied but it is somehow being overridden */
    return (
      <Accordion2
        isOpen={isOpen}
        toggleOpen={handleOpen}
        className={className}
        label={
          <Heading as="h4" fontSize="small" py="xsmall">
            {highlightHTML(pattern, tag)}
          </Heading>
        }
      >
        <ul>
          {Object.values(methods).map((method) => (
            <li key={method.name}>
              <Link to={`${buildMethodPath(specKey, tag, method.name)}`}>
                {highlightHTML(pattern, method.summary)}
              </Link>
            </li>
          ))}
        </ul>
      </Accordion2>
    )
  }
)`
  font-family: ${({ theme }) => theme.fonts.brand};

  [aria-controls]:hover,
  [aria-expanded='true'] {
    h4,
    svg {
      color: ${({ theme }) => theme.colors.key};
    }
  }

  [aria-expanded='true'] h4 {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  ul {
    border-left: dashed 1px ${({ theme }) => theme.colors.ui2};
    list-style: none;
    margin: 0;
    padding: 0;
    padding-left: ${({ theme }) => theme.space.xxsmall};
    padding-top: ${({ theme }) => theme.space.xxsmall};
  }

  [aria-current] {
    background: ${({ theme }) => theme.colors.ui1};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  ${Link} {
    border-radius: ${({ theme }) => theme.radii.medium};
    display: block;
    overflow: hidden;
    padding: ${({ theme }) => theme.space.xsmall};
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover,
    &:focus,
    &.active {
      background: ${({ theme }) => theme.colors.ui1};
    }
  }
`
