# Contact Form Setup

The contact form is configured to submit data to the n8n webhook with JWT authentication.

## Environment Variable Required

Create a `.env.local` file in the root directory with the following:

```env
N8N_WEBHOOK_JWT_TOKEN=your_jwt_token_here
```

Replace `your_jwt_token_here` with your actual JWT token for the n8n webhook.

## Webhook Configuration

- **Webhook URL**: `https://n8n.syedfahim.me/webhook/form-submission`
- **Authentication**: JWT Bearer token (sent in Authorization header)
- **Method**: POST
- **Content-Type**: application/json

## Form Data Structure

The form submits the following data structure:

```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "company": "string (optional)",
  "subject": "string (required)",
  "message": "string (required)",
  "submittedAt": "ISO 8601 timestamp",
  "source": "omni-ai-agency-website"
}
```

## Testing

1. Make sure the `.env.local` file exists with the JWT token
2. Start the development server: `npm run dev`
3. Navigate to `/contact`
4. Fill out and submit the form
5. Check the browser console and server logs for any errors

## Error Handling

The form includes:
- Client-side validation using Zod
- Server-side validation
- Error messages displayed to users
- Success confirmation after submission
- Comprehensive logging for debugging

