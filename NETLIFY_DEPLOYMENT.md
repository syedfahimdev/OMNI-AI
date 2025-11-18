# Netlify Deployment Guide for Omni AI Agency Website

This guide covers deploying the Next.js website to Netlify.

## Prerequisites

- GitHub repository connected to Netlify
- Netlify account ([sign up here](https://app.netlify.com/signup))
- Environment variables ready (see below)

## Quick Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository: `syedfahimdev/OMNI-AI`

2. **Configure Build Settings**
   - **Base directory**: `website`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: `.netlify/functions/` (auto-detected)
   
   *Note: These are already configured in `netlify.toml`*

3. **Set Environment Variables**
   
   Go to **Site settings** → **Environment variables** and add:
   
   | Variable | Value | Description |
   |----------|-------|-------------|
   | `NODE_ENV` | `production` | Node environment |
   | `N8N_WEBHOOK_JWT_TOKEN` | `your_jwt_token` | JWT token for n8n webhooks |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-site.netlify.app` | Your Netlify site URL |
   | `NODE_VERSION` | `18.20.8` | Node.js version (optional) |

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site
   - Your site will be available at `https://[site-name].netlify.app`

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Navigate to website directory
cd OMNI-AI/website

# Initialize Netlify site
netlify init

# Deploy
netlify deploy --prod
```

## Environment Variables

### Required Variables

```bash
# Production environment
NODE_ENV=production

# N8N Webhook Configuration
N8N_WEBHOOK_JWT_TOKEN=your_jwt_token_here

# Site URL (use your actual Netlify URL)
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

### Setting Environment Variables

**Via Netlify Dashboard:**
1. Go to your site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click "Add a variable"
4. Add each variable with its value
5. Click "Save"

**Via Netlify CLI:**
```bash
# Set individual variables
netlify env:set N8N_WEBHOOK_JWT_TOKEN "your_jwt_token"
netlify env:set NEXT_PUBLIC_SITE_URL "https://your-site.netlify.app"
```

## Custom Domain Setup

1. **Add Custom Domain**
   - Go to **Site settings** → **Domain management**
   - Click "Add custom domain"
   - Enter your domain (e.g., `omniaiagency.com`)
   - Follow DNS configuration instructions

2. **Configure DNS**
   
   Add these records to your domain provider:
   
   ```
   # For apex domain (omniaiagency.com)
   A     @     75.2.60.5
   
   # For www subdomain
   CNAME www   your-site.netlify.app
   ```
   
   Or use Netlify DNS for easier management.

3. **Enable HTTPS**
   - Netlify automatically provisions SSL certificates
   - HTTPS will be enabled within a few minutes

## Automatic Deployments

Netlify automatically deploys when you push to your repository:

- **Production**: Pushes to `main` branch → Deploys to production
- **Preview**: Pull requests → Creates deploy preview
- **Branch deploys**: Other branches → Optional branch deploys

### Configure Deploy Contexts

Edit `netlify.toml` to customize:

```toml
[context.production]
  command = "npm run build"
  environment = { NODE_ENV = "production" }

[context.deploy-preview]
  command = "npm run build"
  
[context.branch-deploy]
  command = "npm run build"
```

## Next.js Features on Netlify

Netlify supports all Next.js features through the Essential Next.js plugin:

✅ **Supported Features:**
- Static Site Generation (SSG)
- Server-Side Rendering (SSR)
- API Routes
- Incremental Static Regeneration (ISR)
- Middleware
- Image Optimization
- Internationalization (i18n)

### Plugin Configuration

The `@netlify/plugin-nextjs` plugin is configured in `netlify.toml`:

```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

This plugin is automatically installed during build.

## Performance Optimization

### 1. Build Cache
Netlify caches `node_modules` and `.next` between builds for faster deployments.

### 2. Asset Optimization
- Static assets are automatically cached with long-term headers
- Images are optimized via Next.js Image Optimization
- Gzip/Brotli compression enabled by default

### 3. CDN Distribution
Your site is automatically distributed across Netlify's global CDN.

## Monitoring and Analytics

### Build Logs
- View build logs in **Deploys** tab
- Debug build failures with detailed error messages

### Analytics (Optional)
Enable Netlify Analytics for:
- Page views
- Unique visitors
- Top pages
- Traffic sources

Go to **Site settings** → **Analytics** to enable.

## Troubleshooting

### Build Failures

**Issue**: Build fails with dependency errors
```bash
# Solution: Clear cache and retry
netlify build --clear-cache
```

**Issue**: Environment variables not available
```bash
# Solution: Ensure variables are set in Netlify Dashboard
# They should NOT have NEXT_PUBLIC_ prefix unless needed in browser
```

### Runtime Errors

**Issue**: 404 on page refresh
- Next.js dynamic routes are supported automatically
- No manual redirect rules needed

**Issue**: API routes not working
```toml
# Ensure this is in netlify.toml
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

## Comparing with Other Platforms

| Feature | Netlify | Railway | Render |
|---------|---------|---------|--------|
| **Next.js Support** | ✅ Excellent | ✅ Good | ✅ Good |
| **Build Speed** | 🚀 Fast | ⚡ Medium | ⚡ Medium |
| **Global CDN** | ✅ Built-in | ❌ No | ⚡ Limited |
| **Free Tier** | ✅ Generous | ⚡ Limited | ⚡ Limited |
| **Custom Domains** | ✅ Free SSL | ✅ Free SSL | ✅ Free SSL |
| **Deploy Previews** | ✅ Automatic | ❌ Manual | ⚡ Limited |
| **Edge Functions** | ✅ Yes | ❌ No | ❌ No |

## Cost Optimization

### Free Tier Includes:
- 100 GB bandwidth/month
- 300 build minutes/month
- Unlimited sites
- Automatic SSL
- Deploy previews

### Best Practices:
1. Optimize images to reduce bandwidth
2. Use incremental builds to save build minutes
3. Cache static assets aggressively
4. Consider Netlify Large Media for large files

## Deploy Previews

Every pull request gets a unique preview URL:
- Test changes before merging
- Share with team for review
- Automatic cleanup when PR is closed

**Preview URL format**: `https://deploy-preview-[PR#]--[site-name].netlify.app`

## Rollbacks

Instantly rollback to any previous deployment:
1. Go to **Deploys** tab
2. Find the previous working deploy
3. Click "Publish deploy"
4. Site instantly switches to that version

## Additional Resources

- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Essential Next.js Plugin](https://github.com/netlify/netlify-plugin-nextjs)
- [Netlify Build Settings](https://docs.netlify.com/configure-builds/overview/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)

## Support

- **Netlify Community**: https://answers.netlify.com/
- **Status Page**: https://www.netlifystatus.com/
- **Support**: support@netlify.com

---

**Ready to deploy?** Head to [Netlify Dashboard](https://app.netlify.com/) and follow the steps above! 🚀

