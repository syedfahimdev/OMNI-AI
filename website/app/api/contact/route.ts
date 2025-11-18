import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8n.syedfahim.me/webhook/form-submission';

// Input validation and sanitization
function sanitizeString(input: string, maxLength: number): string {
  if (typeof input !== 'string') return '';
  // Remove potentially dangerous characters and limit length
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Remove HTML brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function validatePhone(phone: string | null | undefined): boolean {
  if (!phone) return true; // Phone is optional
  // Allow international phone format
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length <= 20;
}

export async function POST(request: NextRequest) {
  try {
    // Check Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    // Get JWT token from environment variable
    const jwtToken = process.env.N8N_WEBHOOK_JWT_TOKEN;
    
    if (!jwtToken) {
      console.error('N8N_WEBHOOK_JWT_TOKEN environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize and validate inputs
    const name = sanitizeString(body.name, 100);
    const email = sanitizeString(body.email, 254).toLowerCase();
    const subject = sanitizeString(body.subject, 200);
    const message = sanitizeString(body.message, 5000);
    const phone = body.phone ? sanitizeString(body.phone, 20) : null;
    const company = body.company ? sanitizeString(body.company, 100) : null;

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Check for empty strings after sanitization
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    // Prepare sanitized data for webhook
    const webhookData = {
      name,
      email,
      phone,
      company,
      subject,
      message,
      submittedAt: new Date().toISOString(),
      source: 'omni-ai-agency-website',
      ip: request.headers.get('x-forwarded-for')?.split(',')[0] || request.ip || 'unknown',
    };

    // Send data to webhook with JWT authentication
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(webhookData),
    });

    console.log('Webhook response status:', webhookResponse.status);

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Webhook error response:', errorText);
      
      return NextResponse.json(
        { error: 'Failed to submit form to webhook', details: errorText },
        { status: webhookResponse.status }
      );
    }

    const responseData = await webhookResponse.json().catch(() => ({}));
    console.log('Webhook response data:', responseData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        data: responseData 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error in contact form API route:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

