# Samadhan Tracker

A Next.js application for tracking learning progress with GitHub integration. Users can select up to 7 tasks from a curated list of 21 learning modules and track their completion status.

## Features

- 🔐 **Authentication**: Clerk-powered authentication with Google OAuth
- 📊 **Task Management**: Select and track up to 7 learning tasks
- 🔗 **GitHub Integration**: Automatic progress checking via GitHub repository
- 🎯 **Progress Tracking**: Mark tasks as completed and monitor progress
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS
- 🗄️ **Database**: MongoDB with Prisma ORM
- 🚀 **Next.js 15**: Built with the latest Next.js features

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: MongoDB
- **ORM**: Prisma
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+
- MongoDB database
- Clerk account
- GitHub personal access token

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd samadhan_tracker
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key

# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"

# GitHub Integration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPO_OWNER=team_leader's_github_name
GITHUB_REPO_NAME=repo_name
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (for MongoDB)
npx prisma db push
```

### 4. Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm start
```

## Project Structure

```
samadhan_tracker/
├── app/
│   ├── api/
│   │   ├── tasks/
│   │   │   ├── route.ts          # GET/POST tasks
│   │   │   └── [id]/route.ts     # PATCH/DELETE individual tasks
│   │   └── github/
│   │       └── check-progress/   # GitHub integration
│   ├── layout.tsx                # Root layout with Clerk provider
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles
├── lib/
│   └── prisma.ts                 # Prisma client utility
├── prisma/
│   └── schema.prisma             # Database schema
├── middleware.ts                  # Clerk authentication middleware
└── package.json
```

## Learning Tasks

The application includes 21 learning modules covering:

### JavaScript & Node.js Fundamentals (Days 1-5)

- JavaScript basics, functions, arrays, objects
- Node.js introduction and Express.js setup

### React Fundamentals (Days 6-10)

- React setup, state management, hooks
- Lists, events, and API integration

### Full-Stack Integration (Days 11-15)

- Backend CRUD operations
- Database integration and authentication
- React + backend connectivity

### Advanced Projects (Days 16-21)

- E-commerce store, chat app, task management
- Social media dashboard, weather app, portfolio

## API Endpoints

### Tasks

- `GET /api/tasks` - Get user's selected tasks
- `POST /api/tasks` - Add a new task
- `PATCH /api/tasks/[id]` - Update task completion status
- `DELETE /api/tasks/[id]` - Remove a task

### GitHub Integration

- `GET /api/github/check-progress?day=X` - Check GitHub repository progress

## Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  clerkId   String   @unique
  email     String   @unique
  firstName String?
  lastName  String?
  imageUrl  String?
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Task Model

```prisma
model Task {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String?
  dayNumber   Int
  isCompleted Boolean  @default(false)
  githubUrl   String?
  userId      String   @db.ObjectId
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, dayNumber])
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.
# samadhan_tracker
