import type { NextApiRequest, NextApiResponse } from 'next'
import { improveResumeWithAI } from '../../lib/ai-resume-improvement'
import { Resume } from '../../types'

interface RequestBody {
  resumeJson: Resume
  jobDescription?: string
}

interface SuccessResponse {
  success: true
  data: Resume
}

interface ErrorResponse {
  success: false
  error: string
}

type ApiResponse = SuccessResponse | ErrorResponse

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed'
    })
    return
  }

  try {
    const { resumeJson, jobDescription } = req.body as RequestBody

    // Validate input
    if (!resumeJson || typeof resumeJson !== 'object') {
      res.status(400).json({
        success: false,
        error: 'Invalid request: resumeJson is required and must be an object'
      })
      return
    }

    // Call AI improvement service
    const improvedResume = await improveResumeWithAI({
      resumeJson,
      jobDescription
    })

    res.status(200).json({
      success: true,
      data: improvedResume
    })
  } catch (error) {
    console.error('Error in improve-resume API:', error)

    // Return appropriate error message
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'

    res.status(500).json({
      success: false,
      error: errorMessage
    })
  }
}
