

import signUp from '@/actions/post/sign-up'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

export const UseSignUp = () => {
  const mutation = useMutation({
	mutationFn:signUp
  })
  return mutation;
}
