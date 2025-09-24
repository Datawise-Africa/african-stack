import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useArticles, useArticle } from '../useArticles'
import { describe, it, expect, beforeEach } from 'vitest'
import * as React from 'react'

describe('useArticles', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    )
  }

  it('fetches articles successfully', async () => {
    const { result } = renderHook(() => useArticles(), { wrapper })

    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toHaveLength(6)
    expect(result.current.data?.[0]).toHaveProperty('title')
    expect(result.current.data?.[0]).toHaveProperty('excerpt')
  })

  it('fetches a single article successfully', async () => {
    const { result } = renderHook(() => useArticle('1'), { wrapper })

    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toBeDefined()
    expect(result.current.data?.id).toBe('1')
    expect(result.current.data?.title).toBe('The Future of Web Development')
  })
})