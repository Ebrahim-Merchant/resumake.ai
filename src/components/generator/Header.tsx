import { useState, useCallback } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'

import { Logo } from '../core/Logo'
import { MiniButton } from '../core/Button'
import { AIImprovementDialog } from './AIImprovementDialog'
import { colors } from '../../theme'
import { FormValues, Resume } from '../../types'

const StyledHeader = styled.header`
  grid-area: header;
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  border-bottom: 1px solid ${colors.borders};
`

const LogoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  position: absolute;
  right: 32px;
`

const ErrorMessage = styled.div`
  position: fixed;
  top: 80px;
  right: 32px;
  background: #ef4444;
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  z-index: 999;
  max-width: 400px;
`

export function Header() {
  const [dialogMode, setDialogMode] = useState<'improve' | 'tailor' | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const formContext = useFormContext<FormValues>()

  const handleImprove = useCallback(
    async (jobDescription?: string) => {
      try {
        setError(null)

        // Get current form values
        const currentValues = formContext.getValues()

        // Extract the Resume portion (exclude FormValues-specific fields)
        const resumeData: Resume = {
          basics: currentValues.basics,
          work: currentValues.work,
          volunteer: currentValues.volunteer,
          education: currentValues.education,
          awards: currentValues.awards,
          publications: currentValues.publications,
          skills: currentValues.skills,
          projects: currentValues.projects
        }

        // Call the API
        const response = await fetch('/api/improve-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            resumeJson: resumeData,
            jobDescription
          })
        })

        const result = await response.json()

        if (!result.success) {
          throw new Error(result.error || 'Failed to improve resume')
        }

        // Update form with improved resume data
        const improvedData = result.data as Resume
        formContext.reset({
          ...currentValues,
          basics: improvedData.basics,
          work: improvedData.work,
          volunteer: improvedData.volunteer,
          education: improvedData.education,
          awards: improvedData.awards,
          publications: improvedData.publications,
          skills: improvedData.skills,
          projects: improvedData.projects
        })
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
        setTimeout(() => setError(null), 5000)
        throw err
      }
    },
    [formContext]
  )

  return (
    <>
      <StyledHeader>
        <LogoContainer>
          <Link href="/">
            <Logo scale={0.65} />
          </Link>
        </LogoContainer>
        <ButtonGroup>
          <MiniButton onClick={() => setDialogMode('improve')}>
            📈 Improve with AI
          </MiniButton>
          <MiniButton onClick={() => setDialogMode('tailor')}>
            🎯 Tailor to Job
          </MiniButton>
        </ButtonGroup>
      </StyledHeader>

      <AIImprovementDialog
        isOpen={dialogMode !== null}
        onClose={() => setDialogMode(null)}
        onImprove={handleImprove}
        mode={dialogMode || 'improve'}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  )
}
