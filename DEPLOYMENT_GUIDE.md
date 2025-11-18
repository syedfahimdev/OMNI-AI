# Deployment Guide

This guide explains how to deploy both applications separately.

## Repository Structure

```
OMNI-AI/
├── admin-dashboard/     # Python/Streamlit admin dashboard
├── website/            # Next.js public website
├── render.yaml         # Render.com deployment config
├── railway.json        # Railway.app root config
└── DEPLOYMENT_GUIDE.md # This file
```

## Deployment Options

### Option 1: Railway.app (Recommended)

Railway allows you to deploy each service separately from the same repository.

#### Deploy Admin Dashboard

1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Add a new service
5. Select "Deploy from GitHub repo"
6. Choose the repository
7. Set the **Root Directory** to: `admin-dashboard`
8. Railway will automatically detect the `railway.json` in that directory
9. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `ADMIN_PASSWORD`

#### Deploy Website

1. In the same Railway project, add another service
2. Select "Deploy from GitHub repo"
3. Choose the repository
4. Set the **Root Directory** to: `website`
5. Railway will automatically detect the `railway.json` in that directory
6. Add environment variables:
   - `NODE_ENV=production`
   - `N8N_WEBHOOK_JWT_TOKEN`
   - `PORT=3000`

### Option 2: Render.com

Render uses the `render.yaml` file for deployment configuration.

1. Go to [Render.com](https://render.com)
2. Create a new Blueprint
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml`
5. It will create two services:
   - `omni-ai-admin-dashboard`
   - `omni-ai-website`
6. Add environment variables for each service as specified in `render.yaml`

### Option 3: Docker Deployment

Both applications have Dockerfiles for containerized deployment.

#### Build and Run Admin Dashboard

```bash
cd admin-dashboard
docker build -t omni-ai-admin .
docker run -p 8501:8501 \
  -e SUPABASE_URL=your_url \
  -e SUPABASE_SERVICE_KEY=your_key \
  -e ADMIN_PASSWORD=your_password \
  omni-ai-admin
```

#### Build and Run Website

```bash
cd website
docker build -t omni-ai-website .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e N8N_WEBHOOK_JWT_TOKEN=your_token \
  omni-ai-website
```

## Environment Variables

### Admin Dashboard

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_SERVICE_KEY` | Supabase service role key | Yes |
| `ADMIN_PASSWORD` | Password for admin dashboard access | Yes |

### Website

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Set to `production` | Yes |
| `N8N_WEBHOOK_JWT_TOKEN` | JWT token for webhook authentication | Yes |
| `PORT` | Server port (default: 3000) | No |

## Separate Deployments

Each application can be deployed independently:

- **Admin Dashboard**: Deploy from `admin-dashboard/` directory
- **Website**: Deploy from `website/` directory

Both have their own:
- `railway.json` files for Railway deployment
- `Dockerfile` for containerized deployment
- Environment variable requirements

## Custom Domains

After deployment, you can add custom domains:

- Admin Dashboard: `admin.yourdomain.com`
- Website: `www.yourdomain.com` or `yourdomain.com`

## Monitoring

- Check application logs in your deployment platform
- Monitor error rates and response times
- Set up alerts for critical failures

## Troubleshooting

### Admin Dashboard Issues
- Verify Supabase credentials are correct
- Check that Streamlit can access the database
- Review logs for authentication errors

### Website Issues
- Verify environment variables are set
- Check Next.js build logs
- Ensure `N8N_WEBHOOK_JWT_TOKEN` is valid
- Review API route logs for errors

## Security Notes

- Never commit `.env` files
- Use strong passwords for admin dashboard
- Rotate JWT tokens regularly
- Enable HTTPS for all deployments
- Review security headers (see `SECURITY.md`)

