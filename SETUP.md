# Samadhan Tracker - Setup Guide

## 🚀 Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**
   Create `.env.local` file with:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW1pbmVudC1kYXNzaWUtNjEuY2xlcmsuYWNjb3VudHMuZGV2JA
   CLERK_SECRET_KEY=sk_test_eduv1fM13AXIt9vfTuAfYhiWdZmjkLxycFi0foNCvE
   DATABASE_URL="mongodb+srv://tracker:tracker@tracker.2mkdpyu.mongodb.net/tracker?retryWrites=true&w=majority&appName=tracker"
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_REPO_OWNER=taniyaapatel
   GITHUB_REPO_NAME=Samadhan
   ```

3. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Clerk Authentication

- Sign up at [clerk.com](https://clerk.com)
- Create a new application
- Add Google OAuth provider
- Copy your publishable and secret keys

### GitHub Integration

- Generate a personal access token at [github.com/settings/tokens](https://github.com/settings/tokens)
- Token needs `repo` scope for private repositories
- Token needs `public_repo` scope for public repositories

### MongoDB

- Create a MongoDB Atlas account
- Create a new cluster
- Create a database user
- Get your connection string

## 📱 Features

- **User Authentication**: Google OAuth via Clerk
- **Task Selection**: Choose up to 7 learning tasks
- **Progress Tracking**: Mark tasks as completed
- **GitHub Integration**: Check repository progress
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Instant feedback and notifications

## 🏗️ Architecture

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Clerk
- **State Management**: React hooks + Context API
- **API Routes**: Next.js API routes with middleware

## 📁 Project Structure

```
samadhan_tracker/
├── app/
│   ├── api/                    # API routes
│   │   ├── tasks/             # Task CRUD operations
│   │   └── github/            # GitHub integration
│   ├── components/             # Reusable components
│   ├── contexts/               # React contexts
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── lib/                        # Utility libraries
├── prisma/                     # Database schema
├── middleware.ts               # Clerk middleware
└── package.json
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

- Netlify
- Railway
- DigitalOcean App Platform

## 🔍 Troubleshooting

### Common Issues

1. **Build Errors**

   - Check TypeScript compilation
   - Verify all dependencies are installed
   - Check environment variables

2. **Database Connection**

   - Verify MongoDB connection string
   - Check network access
   - Verify database user permissions

3. **Authentication Issues**

   - Check Clerk configuration
   - Verify OAuth provider setup
   - Check environment variables

4. **GitHub Integration**
   - Verify GitHub token permissions
   - Check repository access
   - Verify repository owner and name

## 📚 Learning Tasks

The application includes 21 learning modules:

- **Days 1-5**: JavaScript & Node.js Fundamentals
- **Days 6-10**: React Fundamentals
- **Days 11-15**: Full-Stack Integration
- **Days 16-21**: Advanced Projects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide
