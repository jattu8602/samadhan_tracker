# 🐛 Debugging Guide - API Issues on Hosted Website

## 🚨 **Current Issue**
- ✅ Frontend loads and user authentication works
- ❌ API calls fail (no tasks loading)
- ❌ Task management not working

## 🔍 **Step-by-Step Debugging**

### 1. **Check Browser Console**
1. Open your hosted website
2. Press `F12` → Console tab
3. Look for any red error messages
4. Check Network tab for failed API calls

**Expected Console Output:**
```
Fetching tasks from API...
API Response status: 200
Tasks loaded: []
```

**If you see errors, note them down!**

### 2. **Test Basic API Connectivity**
Visit this URL in your browser:
```
https://your-domain.vercel.app/api/test
```

**Expected Response:**
```json
{
  "message": "Test API endpoint working",
  "timestamp": "2024-01-XX...",
  "environment": {
    "hasClerkKey": true,
    "hasClerkSecret": true,
    "hasDatabaseUrl": true,
    "hasGithubToken": true,
    "nodeEnv": "production",
    "vercelEnv": "production"
  },
  "status": "success"
}
```

**If this fails, environment variables are not set correctly!**

### 3. **Check Environment Variables in Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to Settings → Environment Variables
4. Verify these are set:

```env
# Required Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW1pbmVudC1kYXNzaWUtNjEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_eduv1fM13AXIt9vfTuAfYhiWdZmjkLxycFi0foNCvE
DATABASE_URL="mongodb+srv://tracker:tracker@tracker.2mkdpyu.mongodb.net/tracker?retryWrites=true&w=majority&appName=tracker"
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO_OWNER=taniyaapatel
GITHUB_REPO_NAME=Samadhan
```

### 4. **Check Vercel Function Logs**
1. In Vercel dashboard, go to Functions tab
2. Look for your API routes: `/api/tasks`, `/api/test`
3. Check for any error logs
4. Look for execution times and memory usage

### 5. **Test Database Connection**
The issue might be MongoDB connection. Check:

1. **MongoDB Atlas Network Access:**
   - Go to MongoDB Atlas
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere) temporarily

2. **Database User Permissions:**
   - Ensure user has read/write access
   - Check if user is active

### 6. **Check Clerk Configuration**
1. Go to [clerk.com](https://clerk.com)
2. Select your application
3. Check "Domains" section
4. Ensure your Vercel domain is added
5. Verify OAuth redirect URLs

## 🛠️ **Common Fixes**

### **Fix 1: Environment Variables**
```bash
# In Vercel Dashboard → Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZW1pbmVudC1kYXNzaWUtNjEuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_eduv1fM13AXIt9vfTuAfYhiWdZmjkLxycFi0foNCvE
DATABASE_URL="mongodb+srv://tracker:tracker@tracker.2mkdpyu.mongodb.net/tracker?retryWrites=true&w=majority&appName=tracker"
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO_OWNER=taniyaapatel
GITHUB_REPO_NAME=Samadhan
```

### **Fix 2: MongoDB Network Access**
```
MongoDB Atlas → Network Access → Add IP Address → 0.0.0.0/0
```

### **Fix 3: Redeploy After Changes**
After updating environment variables:
1. Go to Vercel dashboard
2. Click "Redeploy" on your project
3. Wait for build to complete

## 📊 **Debugging Checklist**

- [ ] Browser console shows no errors
- [ ] `/api/test` endpoint returns success
- [ ] All environment variables are set in Vercel
- [ ] MongoDB allows connections from anywhere
- [ ] Clerk domain configuration is correct
- [ ] Vercel function logs show no errors
- [ ] Database user has correct permissions

## 🚀 **Quick Test Commands**

### **Test API Endpoints:**
```bash
# Test basic connectivity
curl https://your-domain.vercel.app/api/test

# Test tasks endpoint (will return 401 if not authenticated)
curl https://your-domain.vercel.app/api/tasks
```

### **Check Vercel Status:**
- [Vercel Status](https://vercel-status.com)
- [MongoDB Atlas Status](https://status.mongodb.com)

## 🔧 **If Still Not Working**

### **Option 1: Check Vercel Build Logs**
1. Go to Vercel dashboard
2. Click on your latest deployment
3. Check build logs for any errors
4. Look for Prisma generation issues

### **Option 2: Test Locally with Production Environment**
```bash
# Copy your Vercel environment variables to .env.local
# Then test locally
npm run dev
```

### **Option 3: Check Clerk Authentication**
1. Verify user is actually authenticated
2. Check if Clerk session is valid
3. Test with a fresh browser session

## 📞 **Getting Help**

### **Vercel Support:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### **MongoDB Support:**
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB Community](https://community.mongodb.com/)

### **Clerk Support:**
- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Community](https://community.clerk.com)

## 🎯 **Expected Outcome**

After fixing the issues, you should see:
1. ✅ Tasks loading properly
2. ✅ Ability to add/remove tasks
3. ✅ Progress dashboard working
4. ✅ GitHub integration functional
5. ✅ All API calls succeeding

**Remember:** Most issues are related to environment variables or database connectivity. Start with the `/api/test` endpoint to isolate the problem!
