import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lesson } from '@/types/game';
import { Clock, Star, Lock } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted: boolean;
  isLocked: boolean;
  onPress: () => void;
}

export default function LessonCard({ lesson, index, isCompleted, isLocked, onPress }: LessonCardProps) {
  const getDifficultyColor = (difficulty: Lesson['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return '#4adeab';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCategoryColor = (category: Lesson['category']) => {
    switch (category) {
      case 'basics': return '#6366f1';
      case 'trading': return '#f59e0b';
      case 'security': return '#ef4444';
      case 'advanced': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600)}>
      <TouchableOpacity 
        style={[
          styles.container,
          isCompleted && styles.completedContainer,
          isLocked && styles.lockedContainer
        ]}
        onPress={onPress}
        disabled={isLocked}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, isLocked && styles.lockedText]}>
              {lesson.title}
            </Text>
            {isLocked && <Lock size={16} color="#6b7280" />}
            {isCompleted && <Star size={16} color="#4adeab" fill="#4adeab" />}
          </View>
          
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getCategoryColor(lesson.category) }]}>
              <Text style={styles.badgeText}>{lesson.category}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: getDifficultyColor(lesson.difficulty) }]}>
              <Text style={styles.badgeText}>{lesson.difficulty}</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.description, isLocked && styles.lockedText]}>
          {lesson.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <Clock size={14} color="#9ca3af" />
            <Text style={styles.timeText}>{lesson.estimatedTime} min</Text>
          </View>
          <Text style={styles.xpReward}>+{lesson.xpReward} XP</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2d3a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  completedContainer: {
    borderColor: '#4adeab',
    backgroundColor: 'rgba(74, 222, 171, 0.05)',
  },
  lockedContainer: {
    opacity: 0.6,
  },
  header: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    flex: 1,
  },
  lockedText: {
    color: '#6b7280',
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  xpReward: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4adeab',
  },
});