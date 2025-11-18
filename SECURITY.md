# Security Features

This document outlines the security measures implemented in the OMNI AI platform.

## Website Security (Next.js)

### 1. Security Headers
- **Strict-Transport-Security (HSTS)**: Forces HTTPS connections
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Enables browser XSS filtering
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features
- **Content-Security-Policy (CSP)**: Restricts resource loading

### 2. Rate Limiting
- API routes are protected with rate limiting
- Contact form: 5 requests per minute per IP
- Other API routes: 10 requests per minute per IP
- Automatic cleanup of rate limit records

### 3. Input Validation & Sanitization
- All user inputs are sanitized before processing
- Email format validation
- Phone number format validation
- Length limits on all fields
- Removal of potentially dangerous characters (HTML, JavaScript, event handlers)

### 4. API Security
- Content-Type validation
- JSON parsing error handling
- JWT token authentication for webhooks
- IP address logging for audit trails
- Error messages don't expose sensitive information

### 5. Environment Variables
- Sensitive data stored in environment variables
- `.env.example` file provided for reference
- Never commit `.env` files to version control

## Deployment Security

### Environment Variables Required

#### Website (Next.js)
- `NODE_ENV=production`
- `N8N_WEBHOOK_JWT_TOKEN` - JWT token for webhook authentication
- `PORT=3000` - Server port

#### Admin Dashboard (Streamlit)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_KEY` - Supabase service role key
- `ADMIN_PASSWORD` - Admin dashboard password

## Best Practices

1. **Never commit secrets**: Use environment variables for all sensitive data
2. **Keep dependencies updated**: Regularly update npm/pip packages
3. **Use HTTPS**: Always deploy with SSL/TLS enabled
4. **Monitor logs**: Regularly check application logs for suspicious activity
5. **Regular backups**: Backup your database and important data

## Reporting Security Issues

If you discover a security vulnerability, please email: syedfahimdev@gmail.com

Do NOT create a public GitHub issue for security vulnerabilities.

