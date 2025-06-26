import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Achievement } from '@/types/game';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export default function AchievementCard({ achievement, index }: AchievementCardProps) {
  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'learning': return '#6366f1';
      case 'trading': return '#f59e0b';
      case 'streak': return '#ef4444';
      case 'portfolio': return '#4adeab';
      default: return '#6b7280';
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600)}>
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{achievement.icon}</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{achievement.title}</Text>
          <Text style={styles.description}>{achievement.description}</Text>
          
          <View style={styles.footer}>
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(achievement.category) }]}>
              <Text style={styles.categoryText}>{achievement.category}</Text>
            </View>
            <Text style={styles.xpReward}>+{achievement.xpReward} XP</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2a2d3a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textTransform: 'capitalize',
  },
  xpReward: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4adeab',
  },
});