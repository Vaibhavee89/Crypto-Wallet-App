import { useState, useEffect } from 'react';
import { User, Achievement, Lesson, Challenge, LeaderboardEntry, PortfolioItem } from '@/types/game';

// Mock data - in a real app, this would come from a backend
const mockUser: User = {
  id: '1',
  name: 'Crypto Explorer',
  level: 3,
  xp: 1250,
  xpToNextLevel: 1500,
  virtualBalance: 10000,
  streak: 7,
  lastLoginDate: new Date().toISOString(),
  achievements: [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      xpReward: 100,
      unlockedAt: '2024-01-15T10:00:00Z',
      category: 'learning'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      xpReward: 200,
      unlockedAt: '2024-01-20T10:00:00Z',
      category: 'streak'
    }
  ],
  completedLessons: ['1', '2', '3'],
  portfolio: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.1,
      purchasePrice: 45000,
      currentPrice: 47500,
      purchaseDate: '2024-01-15T10:00:00Z'
    }
  ]
};

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'What is Cryptocurrency?',
    description: 'Learn the basics of digital currencies and blockchain technology',
    category: 'basics',
    difficulty: 'beginner',
    estimatedTime: 10,
    xpReward: 100,
    prerequisites: [],
    content: [
      {
        type: 'text',
        title: 'Introduction to Cryptocurrency',
        content: 'Cryptocurrency is a digital or virtual currency that uses cryptography for security. Unlike traditional currencies, cryptocurrencies operate on decentralized networks based on blockchain technology.'
      },
      {
        type: 'text',
        title: 'Key Features',
        content: '• Decentralized: No central authority controls it\n• Secure: Uses advanced cryptography\n• Transparent: All transactions are recorded on a public ledger\n• Global: Can be sent anywhere in the world'
      }
    ],
    quiz: [
      {
        id: '1',
        question: 'What makes cryptocurrency different from traditional money?',
        options: ['It\'s digital only', 'It\'s decentralized', 'It uses cryptography', 'All of the above'],
        correctAnswer: 3,
        explanation: 'Cryptocurrency combines all these features: it\'s digital, decentralized, and secured by cryptography.'
      }
    ]
  },
  {
    id: '2',
    title: 'Understanding Bitcoin',
    description: 'Deep dive into the world\'s first cryptocurrency',
    category: 'basics',
    difficulty: 'beginner',
    estimatedTime: 15,
    xpReward: 150,
    prerequisites: ['1'],
    content: [
      {
        type: 'text',
        title: 'What is Bitcoin?',
        content: 'Bitcoin is the first and most well-known cryptocurrency, created by an anonymous person or group known as Satoshi Nakamoto in 2009.'
      }
    ],
    quiz: [
      {
        id: '1',
        question: 'Who created Bitcoin?',
        options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Elon Musk', 'Mark Zuckerberg'],
        correctAnswer: 1,
        explanation: 'Bitcoin was created by the pseudonymous Satoshi Nakamoto in 2009.'
      }
    ]
  }
];

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Learner',
    description: 'Complete one lesson today',
    type: 'daily',
    xpReward: 50,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: '2',
    title: 'Portfolio Builder',
    description: 'Make 3 virtual trades this week',
    type: 'weekly',
    xpReward: 200,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    progress: 1,
    maxProgress: 3
  }
];

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'CryptoMaster', level: 12, xp: 5420, streak: 23 },
  { rank: 2, name: 'BlockchainPro', level: 10, xp: 4890, streak: 15 },
  { rank: 3, name: 'Crypto Explorer', level: 3, xp: 1250, streak: 7 },
  { rank: 4, name: 'DigitalTrader', level: 8, xp: 3200, streak: 12 },
  { rank: 5, name: 'CoinCollector', level: 6, xp: 2100, streak: 5 }
];

export function useGameData() {
  const [user, setUser] = useState<User>(mockUser);
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard);

  const completeLesson = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson || user.completedLessons.includes(lessonId)) return;

    setUser(prev => ({
      ...prev,
      xp: prev.xp + lesson.xpReward,
      completedLessons: [...prev.completedLessons, lessonId]
    }));

    // Check for level up
    const newXp = user.xp + lesson.xpReward;
    if (newXp >= user.xpToNextLevel) {
      setUser(prev => ({
        ...prev,
        level: prev.level + 1,
        xpToNextLevel: prev.xpToNextLevel + 500
      }));
    }
  };

  const completeChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true, progress: challenge.maxProgress }
          : challenge
      )
    );

    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setUser(prev => ({
        ...prev,
        xp: prev.xp + challenge.xpReward
      }));
    }
  };

  const makeTrade = (symbol: string, amount: number, price: number) => {
    const newTrade: PortfolioItem = {
      symbol,
      name: symbol === 'BTC' ? 'Bitcoin' : symbol === 'ETH' ? 'Ethereum' : symbol,
      amount,
      purchasePrice: price,
      currentPrice: price,
      purchaseDate: new Date().toISOString()
    };

    setUser(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, newTrade],
      virtualBalance: prev.virtualBalance - (amount * price)
    }));
  };

  return {
    user,
    lessons,
    challenges,
    leaderboard,
    completeLesson,
    completeChallenge,
    makeTrade
  };
}