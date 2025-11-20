import { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../../theme'
import { MiniButton } from '../core/Button'

const DialogOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const DialogContent = styled.div`
  background: ${colors.background};
  border: 1px solid ${colors.borders};
  border-radius: 8px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`

const DialogTitle = styled.h2`
  margin: 0 0 16px 0;
  color: ${colors.foreground};
  font-size: 1.5rem;
`

const DialogDescription = styled.p`
  margin: 0 0 24px 0;
  color: ${colors.foreground};
  opacity: 0.8;
  line-height: 1.5;
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 1px solid ${colors.borders};
  border-radius: 4px;
  background: ${colors.background};
  color: ${colors.foreground};
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  margin-bottom: 24px;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

const InfoText = styled.p`
  margin: 0 0 16px 0;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid ${colors.primary};
  color: ${colors.foreground};
  font-size: 0.85rem;
  line-height: 1.4;
`

interface AIImprovementDialogProps {
  isOpen: boolean
  onClose: () => void
  onImprove: (jobDescription?: string) => Promise<void>
  mode: 'improve' | 'tailor'
}

export function AIImprovementDialog({
  isOpen,
  onClose,
  onImprove,
  mode
}: AIImprovementDialogProps) {
  const [jobDescription, setJobDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async () => {
    setIsProcessing(true)
    try {
      if (mode === 'tailor') {
        await onImprove(jobDescription)
      } else {
        await onImprove()
      }
      setJobDescription('')
      onClose()
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    if (!isProcessing) {
      setJobDescription('')
      onClose()
    }
  }

  return (
    <DialogOverlay $isOpen={isOpen} onClick={handleClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        {mode === 'improve' ? (
          <>
            <DialogTitle>📈 Improve with AI</DialogTitle>
            <DialogDescription>
              This will use AI to improve your resume by:
            </DialogDescription>
            <InfoText>
              • Making bullet points more impactful with strong action verbs
              <br />
              • Adding metrics and outcomes where appropriate
              <br />
              • Improving clarity and readability
              <br />• Maintaining all your truthful experience and skills
            </InfoText>
            <InfoText style={{ borderLeftColor: '#f59e0b' }}>
              ⚠️ AI suggestions only – please review for accuracy after
              generation.
            </InfoText>
          </>
        ) : (
          <>
            <DialogTitle>🎯 Tailor to Job Description</DialogTitle>
            <DialogDescription>
              Paste a job description below to tailor your resume to that
              specific role. The AI will:
            </DialogDescription>
            <InfoText>
              • Emphasize relevant experience and skills
              <br />
              • Use keywords from the job description where accurate
              <br />
              • Reorder bullet points to highlight relevant achievements
              <br />• Update your summary to target this specific role
            </InfoText>
            <TextArea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={isProcessing}
            />
          </>
        )}

        <ButtonGroup>
          <MiniButton onClick={handleClose} disabled={isProcessing}>
            Cancel
          </MiniButton>
          <MiniButton
            onClick={handleSubmit}
            disabled={
              isProcessing || (mode === 'tailor' && !jobDescription.trim())
            }
          >
            {isProcessing
              ? 'Processing...'
              : mode === 'improve'
                ? 'Improve Resume'
                : 'Tailor Resume'}
          </MiniButton>
        </ButtonGroup>
      </DialogContent>
    </DialogOverlay>
  )
}
