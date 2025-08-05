import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Try Ollama first (local AI)
    try {
      const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'phi3',
          prompt: `You are an expert astrologer and spiritual advisor. Please provide helpful, insightful, and personalized astrological guidance. User question: ${message}`,
          stream: false
        }),
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })

      if (ollamaResponse.ok) {
        const result = await ollamaResponse.json()
        return NextResponse.json({ 
          reply: result.response?.trim() || 'I apologize, but I couldn\'t generate a response.'
        })
      }
    } catch (ollamaError) {
      console.log('Ollama not available, trying OpenAI...')
    }

    // Fallback to OpenAI if available
    const openaiApiKey = process.env.OPENAI_API_KEY
    if (openaiApiKey) {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert astrologer and spiritual advisor. Provide helpful, insightful, and personalized astrological guidance based on traditional Vedic astrology principles.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      })

      if (openaiResponse.ok) {
        const result = await openaiResponse.json()
        return NextResponse.json({
          reply: result.choices[0]?.message?.content?.trim() || 'I apologize, but I couldn\'t generate a response.'
        })
      }
    }

    // Fallback response if no AI service is available
    return NextResponse.json({
      reply: `Thank you for your question: "${message}". I'm currently experiencing technical difficulties with my AI services. Please try again later, or consider booking a consultation with one of our human astrologers for personalized guidance.`
    })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}