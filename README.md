# Geography Quiz App 🌍

A modern, interactive geography quiz web application built with React that helps users test their knowledge of world geography through engaging quizzes covering countries, capitals, and flags from different regions.

## 🌐 Live Application

- **Quiz Website**: [https://geoquiz.cphmk.dk/](https://geoquiz.cphmk.dk/)
- **REST API**: [https://atlasapi.cphmk.dk/api/routes](https://atlasapi.cphmk.dk/api/routes)

## ✨ Features

### Regional Coverage
- **World**: Global geography challenges
- **Europe**: European countries, capitals, and flags
- **Asia**: Asian geography knowledge tests
- **Africa**: African continent exploration
- **North America**: North American geography quizzes
- **South America**: South American region challenges

### Quiz Types
- **Capital Quiz**: Identify capital cities of countries
- **Country Quiz**: Interactive map-based country identification
- **Flag Quiz**: Recognize flags from around the world

### Interactive Features
- 🗺️ **Interactive Maps**: Click-to-select country identification
- ⏱️ **Timer System**: Timed quizzes for added challenge
- 📊 **Progress Tracking**: Real-time score and completion tracking
- 🎯 **Completion Modals**: Detailed results and statistics
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🎨 **Modern UI**: Beautiful, accessible interface with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.1
- **Routing**: React Router DOM 6.28.0
- **Styling**: Styled Components 6.1.13
- **Linting**: ESLint 9.15.0
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
src/
├── components/
│   ├── MapComponents/         # Interactive SVG maps for each region
│   ├── QuizComponents/        # Quiz-specific UI components
│   ├── svgComponents/         # SVG icon components
│   └── UIComponents/          # Reusable UI components
├── constants/
│   └── apiConfig.js          # API endpoints and configuration
├── hooks/
│   ├── useQuizState.jsx      # Quiz state management
│   ├── useQuizTimer.jsx      # Timer functionality
│   └── useScrollPosition.jsx # Scroll position tracking
├── layouts/
│   ├── MainLayout.jsx        # Main application layout
│   ├── QuizLayout.jsx        # Quiz-specific layout
│   └── QuizOverview.jsx      # Quiz overview layout
├── pages/
│   ├── regionPages/          # Landing pages for each region
│   ├── worldQuizPages/       # World quiz components
│   ├── europeQuizPages/      # Europe quiz components
│   ├── asiaQuizPages/        # Asia quiz components
│   ├── africaQuizPages/      # Africa quiz components
│   ├── northAmericaQuizPages/ # North America quiz components
│   └── southAmericaQuizPages/ # South America quiz components
├── quizTypes/
│   ├── EnhancedMapCountryQuiz.jsx  # Map-based country quiz
│   ├── ModernCapitalQuiz.jsx       # Capital identification quiz
│   ├── ModernCountryQuiz.jsx       # Country quiz logic
│   └── ModernFlagQuiz.jsx          # Flag identification quiz
└── quizWrappers/             # Quiz wrapper components
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd geo-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🌍 API Integration

The application integrates with a custom geography API:
- **Base URL**: `https://atlasapi.cphmk.dk/api/countries`
- **Endpoints**:
  - World: `/`
  - Europe: `/region/europe`
  - Asia: `/region/asia`
  - Africa: `/region/africa`
  - Americas: `/region/americas`

## 🎮 How to Play

1. **Choose a Region**: Select from World, Europe, Asia, Africa, North America, or South America
2. **Select Quiz Type**: Choose between Capital, Country (Map), or Flag quizzes
3. **Start the Quiz**: Answer questions by clicking on the map or selecting from multiple choice options
4. **Track Progress**: Monitor your score and completion percentage in real-time
5. **View Results**: See detailed statistics when you complete the quiz

## 🎯 Key Features

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Feedback**: Instant visual feedback for correct/incorrect answers
- **Progress Tracking**: Visual indicators of quiz completion and scoring
- **Timer Integration**: Optional timed challenges for competitive play
- **Accessibility**: Keyboard navigation and screen reader support
- **Modern Animations**: Smooth transitions and engaging visual effects

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

This project is currently in active development. Feel free to submit issues or feature requests.


