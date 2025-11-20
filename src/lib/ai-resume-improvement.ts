import OpenAI from 'openai'
import { Resume } from '../types'

const SYSTEM_PROMPT = `You are an expert resume writer for software engineers.
I will give you:
- resumeJson: a JSON object representing a resume.
- jobDescription: an optional job description string.

Instructions:
1. Keep the JSON structure exactly the same (same keys, same nesting, same arrays).
2. Improve only the text fields (summary, bullet points, descriptions, highlights).
3. If jobDescription is provided, tailor the resume to that job by emphasizing relevant skills and experience and using accurate keywords.
4. Do not invent new jobs, dates, companies, or technologies.
5. Use strong, impact-focused bullet points with clear actions and outcomes, 1-2 lines each, max 6 per role.
6. Start bullet points with strong action verbs (e.g., Led, Built, Implemented, Optimized).
7. Focus on outcomes and impact; whenever reasonable, add metrics or qualitative impact (e.g. "reduced latency", "improved reliability").
8. Be concise and professional.
9. Return only the updated resumeJson as a valid JSON object, with no additional text or markdown formatting.`

interface ImproveResumeOptions {
  resumeJson: Resume
  jobDescription?: string
}

/**
 * Improves and optionally tailors a resume using AI.
 * 
 * @param options - The resume data and optional job description
 * @returns Promise that resolves to the improved resume
 */
export async function improveResumeWithAI(
  options: ImproveResumeOptions
): Promise<Resume> {
  const { resumeJson, jobDescription } = options

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY environment variable is not set. Please configure it to use AI features.'
    )
  }

  const openai = new OpenAI({ apiKey })

  // Build user message
  let userMessage = `Please improve this resume:\n\n${JSON.stringify(resumeJson, null, 2)}`

  if (jobDescription) {
    userMessage += `\n\nTailor this resume to the following job description:\n\n${jobDescription}\n\nEmphasize relevant experience and skills that match the job requirements.`
  } else {
    userMessage += `\n\nImprove the clarity, impact, and readability of this resume without changing the structure.`
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: userMessage
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      throw new Error('No response from AI service')
    }

    // Parse the JSON response
    // Remove markdown code blocks if present
    let jsonText = responseText.trim()
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\s*\n/, '').replace(/\n```\s*$/, '')
    }

    const improvedResume = JSON.parse(jsonText) as Resume

    // Validate that required fields are still present
    validateResumeStructure(resumeJson, improvedResume)

    return improvedResume
  } catch (error) {
    // Gracefully handle errors by returning original resume
    console.error('Error improving resume with AI:', error)
    throw error
  }
}

/**
 * Validates that the improved resume maintains the same structure as the original.
 * Throws an error if required fields are missing.
 */
function validateResumeStructure(original: Resume, improved: Resume): void {
  // Check that top-level keys from original still exist
  const originalKeys = Object.keys(original)

  for (const key of originalKeys) {
    if (!(key in improved)) {
      throw new Error(`Missing required field: ${key}`)
    }
  }

  // Validate array lengths haven't dramatically changed (some variance is OK)
  if (original.work && improved.work) {
    if (improved.work.length < Math.floor(original.work.length / 2)) {
      throw new Error('Too many work items were removed')
    }
  }

  if (original.education && improved.education) {
    if (improved.education.length < original.education.length) {
      throw new Error('Education items were removed')
    }
  }

  if (original.skills && improved.skills) {
    if (improved.skills.length < Math.floor(original.skills.length / 2)) {
      throw new Error('Too many skill items were removed')
    }
  }

  if (original.projects && improved.projects) {
    if (improved.projects.length < Math.floor(original.projects.length / 2)) {
      throw new Error('Too many project items were removed')
    }
  }
}
