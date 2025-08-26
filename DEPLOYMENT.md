# 🚀 Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, ensure you have:

1. ✅ **GitHub Repository**: Code pushed to GitHub
2. ✅ **Vercel Account**: Connected to your GitHub account
3. ✅ **Environment Variables**: Configured in Vercel dashboard
4. ✅ **MongoDB Database**: Accessible from Vercel's servers

## 🔧 Environment Variables Setup

In your Vercel dashboard, add these environment variables:

### Required Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW1pbmVudC1kYXNzaWUtNjEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_eduv1fM13AXIt9vfTuAfYhiWdZmjkLxycFi0foNCvE

# Database
DATABASE_URL="mongodb+srv://tracker:tracker@tracker.2mkdpyu.mongodb.net/tracker?retryWrites=true&w=majority&appName=tracker"

# GitHub Integration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO_OWNER=taniyaapatel
GITHUB_REPO_NAME=Samadhan
```

### Optional Variables

```env
# Prisma
PRISMA_GENERATE_DATAPROXY=true
```

## 📋 Deployment Steps

### 1. Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository: `jattu8602/samadhan_tracker`
4. Select the repository

### 2. Configure Project

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run vercel-build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3. Environment Variables

1. Add all required environment variables
2. Ensure `DATABASE_URL` is accessible from Vercel
3. Verify `GITHUB_TOKEN` has correct permissions

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Check for any build errors

## 🔍 Troubleshooting Common Issues

### Prisma Build Errors

**Error**: `Prisma has detected that this project was built on Vercel...`

**Solution**:

- ✅ Use `npm run vercel-build` command
- ✅ Ensure `prisma generate` runs before build
- ✅ Check Prisma schema is valid

### Database Connection Issues

**Error**: `Failed to connect to database`

**Solution**:

- ✅ Verify `DATABASE_URL` is correct
- ✅ Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- ✅ Check database user permissions

### Authentication Issues

**Error**: `Clerk authentication failed`

**Solution**:

- ✅ Verify Clerk keys are correct
- ✅ Check Clerk application settings
- ✅ Ensure OAuth providers are configured

### GitHub Integration Issues

**Error**: `GitHub API error`

**Solution**:

- ✅ Verify `GITHUB_TOKEN` has correct scopes
- ✅ Check repository access permissions
- ✅ Ensure repository exists and is accessible

## 📊 Build Configuration

### Package.json Scripts

```json
{
  "scripts": {
    "vercel-build": "prisma generate && next build",
    "build": "prisma generate && next build --turbopack",
    "prisma:generate": "prisma generate"
  }
}
```

### Vercel Configuration

```json
{
  "buildCommand": "npm run vercel-build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## 🌐 Post-Deployment

### 1. Verify Functionality

- ✅ Test authentication flow
- ✅ Verify database operations
- ✅ Check GitHub integration
- ✅ Test task management

### 2. Monitor Performance

- ✅ Check Vercel analytics
- ✅ Monitor function execution times
- ✅ Watch for any errors in logs

### 3. Set Up Custom Domain (Optional)

1. Go to Vercel dashboard
2. Navigate to Domains section
3. Add your custom domain
4. Configure DNS records

## 🔒 Security Considerations

### Environment Variables

- ✅ Never commit sensitive data to Git
- ✅ Use Vercel's environment variable encryption
- ✅ Rotate tokens regularly

### Database Security

- ✅ Use connection string with authentication
- ✅ Restrict database access to Vercel IPs
- ✅ Enable MongoDB Atlas security features

### API Security

- ✅ All routes are protected by Clerk middleware
- ✅ User authentication required for all operations
- ✅ Rate limiting on API endpoints

## 📱 Testing Your Deployment

### Local Testing

```bash
# Test build process
npm run vercel-build

# Test Prisma generation
npm run prisma:generate

# Test database connection
npm run prisma:db:push
```

### Production Testing

1. **Authentication Flow**

   - Sign up with Google
   - Verify user creation in database
   - Test sign out functionality

2. **Task Management**

   - Add new tasks
   - Mark tasks as completed
   - Remove tasks
   - Verify 7-task limit

3. **GitHub Integration**
   - Check progress for different days
   - Verify repository access
   - Test error handling

## 🆘 Getting Help

### Vercel Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Status](https://vercel-status.com)

### Prisma Support

- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma GitHub](https://github.com/prisma/prisma)
- [Prisma Discord](https://discord.gg/prisma)

### Clerk Support

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Community](https://community.clerk.com)

## 🎯 Success Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build completes successfully
- [ ] Database connection working
- [ ] Authentication flow functional
- [ ] Task management operational
- [ ] GitHub integration working
- [ ] Custom domain configured (optional)
- [ ] Performance monitoring set up
- [ ] Error tracking configured
