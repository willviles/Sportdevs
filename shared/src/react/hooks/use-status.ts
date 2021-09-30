import React, { useState } from 'react'

export const LoadingStatuses = ['idle', 'loading', 'empty', 'errored'] as const
export type LoadingStatus = typeof LoadingStatuses[number]
export const useLoadingStatus = (initialState: LoadingStatus) => useState<LoadingStatus>(initialState)

export const SubmissionStatuses = ['idle', 'submitting', 'submitted', 'errored'] as const
export type SubmissionStatus = typeof SubmissionStatuses[number]
export const useSubmissionStatus = (initialState: SubmissionStatus) => useState<SubmissionStatus>(initialState)

export const ValidationStatuses = ['idle', 'validating', 'validated', 'errored'] as const
export type ValidationStatus = typeof ValidationStatuses[number]
export const useValidationStatus = (initialState: ValidationStatus) => useState<ValidationStatus>(initialState)
