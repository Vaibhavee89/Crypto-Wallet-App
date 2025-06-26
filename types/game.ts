export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  virtualBalance: number;
  streak: number;
  lastLoginDate: string;
  achievements: Achievement[];
  completedLessons: string[];
  portfolio: PortfolioItem[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt: string;
  category: 'learning' | 'trading' | 'streak' | 'portfolio';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'trading' | 'security' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  xpReward: number;
  content: LessonContent[];
  quiz: QuizQuestion[];
  prerequisites: string[];
}

export interface LessonContent {
  type: 'text' | 'image' | 'video' | 'interactive';
  content: string;
  title?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PortfolioItem {
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  xpReward: number;
  deadline: string;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  streak: number;
}