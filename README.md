# A.M.I. Frontend

React + TypeScript frontend for the A.M.I. Interactive Squares application.

## Features

- **React 18 + TypeScript**: Modern React with full type safety
- **Vite**: Fast development and optimized production builds  
- **Interactive Canvas**: Full-screen drag-and-drop interface
- **Real-time Updates**: Optimistic UI with backend synchronization
- **Responsive Design**: Works across all device sizes
- **Error Handling**: Toast notifications for user feedback
- **Railway Ready**: Configured for production deployment

## User Interface

- **Full-screen Canvas**: Interactive board for creating and moving squares
- **Add Square Button**: Creates new squares with random colors
- **Drag & Drop**: Smooth square movement with visual feedback
- **Toast Notifications**: Success/error feedback for all operations
- **Clean Design**: Minimal, modern interface focused on usability

## Local Development

### Prerequisites
- Node.js 18+
- Backend API running (see [ami-backend](https://github.com/Diogo1912/ami-backend))

### Setup

1. **Clone repository**:
   ```bash
   git clone https://github.com/Diogo1912/ami-frontend.git
   cd ami-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   ```bash
   cp .env.example .env
   # Edit .env to point to your backend API
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

Application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Production Deployment (Railway)

### Environment Variables Required

```env
VITE_API_URL=https://your-backend-domain.railway.app/api
NODE_ENV=production
```

### Deploy Steps

1. **Connect to Railway**:
   ```bash
   railway login
   railway init
   ```

2. **Set environment variables**:
   ```bash
   railway variables set VITE_API_URL=https://your-backend-domain.railway.app/api
   railway variables set NODE_ENV=production
   ```

3. **Deploy**:
   ```bash
   railway up
   ```

Railway will automatically:
- Detect React project via `nixpacks.toml`
- Install dependencies with `npm ci`
- Build the app with `npm run build`
- Serve with `npm run preview`

## API Integration

The frontend connects to the Django REST API backend:

- **Base URL**: Configurable via `VITE_API_URL` environment variable
- **Endpoints Used**:
  - `GET /api/squares/` - Load all squares
  - `POST /api/squares/` - Create new square
  - `PATCH /api/squares/{id}/` - Update square position
  - `GET /api/health/` - Health check

## Architecture

### Tech Stack
- **React 18**: Component framework
- **TypeScript**: Type safety and better DX
- **Vite**: Build tool and dev server
- **Axios**: HTTP client for API calls
- **CSS**: Vanilla CSS with modern features

### Key Components
- `App.tsx` - Main application logic and state
- `Board.tsx` - Canvas container for squares
- `DraggableSquare.tsx` - Individual interactive square
- `Header.tsx` - Navigation with add button
- `Toast.tsx` - Notification system

### State Management
- React state for squares array and loading states
- Optimistic updates for smooth UX
- Error recovery with backend re-sync

## Development Notes

- Uses modern React patterns (hooks, functional components)
- TypeScript provides compile-time safety
- Responsive design works on mobile and desktop
- Optimistic UI updates provide immediate feedback
- Graceful error handling with user notifications