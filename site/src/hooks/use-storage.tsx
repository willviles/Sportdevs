import { createLocalStorageStateHook } from 'shared/dist/react/hooks/use-local-storage-state'

// Docs here: https://github.com/astoilkov/use-local-storage-state

export const useEmailSignUpState = createLocalStorageStateHook<{
  email?: string
  firstName?: string
  lastName?: string
}>('emailSignup')
