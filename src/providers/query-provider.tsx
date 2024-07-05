'use client'

import {
	
	QueryClient,
	QueryClientProvider,
 } from '@tanstack/react-query'

import React, { ReactNode } from 'react'

type Props = {
	children:ReactNode;
}

const queryClient = new QueryClient();
export default function QueryProvider({children}: Props) {
  return (
	 <div>
		 <QueryClientProvider client={queryClient}>
			{children}
		 </QueryClientProvider>
	 </div>
  )
}