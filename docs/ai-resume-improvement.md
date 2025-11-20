# AI-Powered Resume Improvement Feature

## Overview

This feature adds AI-powered resume improvement and job-tailoring capabilities to Resumake. Users can leverage AI to automatically enhance their resume content while maintaining the existing JSON Resume schema structure.

## Features

### 1. Improve with AI
Automatically improves resume content by:
- Using strong action verbs (Led, Built, Implemented, Optimized, etc.)
- Adding impact-focused outcomes and metrics where appropriate
- Improving clarity and readability
- Maintaining all truthful experience and skills

### 2. Tailor to Job Description
Customizes resume content for a specific job by:
- Emphasizing relevant experience and skills
- Using keywords from the job description where accurate
- Reordering bullet points to highlight relevant achievements
- Updating the summary to target the specific role

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure OpenAI API Key

Create a `.env.local` file in the project root:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

### 3. Build and Run
```bash
npm run build
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. **Fill out your resume** using the form sections (Profile, Work, Education, etc.)
2. Click **"📈 Improve with AI"** to enhance your resume content
3. Or click **"🎯 Tailor to Job"** to customize for a specific role
4. **Review the changes** - AI suggestions should always be reviewed for accuracy
5. Click **"MAKE"** to generate your PDF resume

## API Endpoint

**Route**: `POST /api/improve-resume`

**Request Body**:
```json
{
  "resumeJson": { /* Resume object */ },
  "jobDescription": "optional job description string"
}
```

**Response**:
```json
{
  "success": true,
  "data": { /* Improved Resume object */ }
}
```

## Cost Considerations

- Model: GPT-4o-mini (~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens)
- Average resume: ~1,000 input tokens, ~1,500 output tokens
- Estimated cost: ~$0.001 per improvement operation

For detailed documentation, see the full docs.
