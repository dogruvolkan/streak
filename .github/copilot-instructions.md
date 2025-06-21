# Copilot Instructions for Streak Tracker App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview

This is a React + TypeScript streak tracking application with the following key features:

### Core Features

- **Streak Management**: Users can create and track habits/streaks
- **Repeat Patterns**: Support for daily, weekly, and monthly patterns
- **Day Selection**: For weekly patterns, users can select specific days
- **Progress Tracking**: Increment counters for each streak
- **Data Persistence**: All data stored in localStorage
- **Responsive Design**: Mobile-first, desktop-responsive UI

### Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Material UI (@mui/material)
- **Icons**: Material UI Icons (@mui/icons-material)
- **Styling**: Emotion (CSS-in-JS)
- **Storage**: localStorage for data persistence

### Component Architecture

- `App.tsx`: Main application container with streak list and floating action button
- `AddStreakBottomSheet.tsx`: Bottom sheet for creating new streaks
- `StreakCard.tsx`: Individual streak display card with progress button
- `StreakList.tsx`: Container for all streak cards
- `types/`: TypeScript interfaces for Streak objects
- `utils/`: localStorage utilities and helper functions

### UI/UX Guidelines

- Mobile-first responsive design
- Material Design principles
- Bottom sheet interactions for mobile UX
- Floating action button for primary actions
- Progress indicators and visual feedback
- Clean, minimal interface

### Data Structure

```typescript
interface Streak {
  id: string;
  name: string;
  repeatType: "day" | "week" | "month";
  selectedDays?: number[]; // For weekly repeats (0=Sunday, 6=Saturday)
  count: number;
  createdAt: Date;
  lastUpdated: Date;
}
```

### Coding Standards

- Use functional components with hooks
- TypeScript strict mode
- Consistent prop typing
- Error handling for localStorage operations
- Responsive breakpoints using MUI theme
- Clean component separation and reusability
