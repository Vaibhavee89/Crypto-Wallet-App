import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Challenge } from '@/types/game';
import { Calendar, Trophy, Clock } from 'lucide-react-native';
import ProgressBar from './ProgressBar';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  onComplete?: () => void;
}

export default function ChallengeCard({ challenge, index, onComplete }: ChallengeCardProps) {
  const getTypeColor = (type: Challenge['type']) => {
    switch (type) {
      case 'daily': return '#4adeab';
      case 'weekly': return '#f59e0b';
      case 'special': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getTimeRemaining = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    return `${hours}h`;
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600)}>
      <TouchableOpacity 
        style={[
          styles.container,
          challenge.completed && styles.completedContainer
        ]}
        onPress={onComplete}
        disabled={challenge.completed}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{challenge.title}</Text>
            {challenge.completed && <Trophy size={16} color="#4adeab" />}
          </View>
          
          <View style={styles.badges}>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(challenge.type) }]}>
              <Text style={styles.badgeText}>{challenge.type}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.description}>{challenge.description}</Text>

        <View style={styles.progressSection}>
          <ProgressBar
            progress={challenge.progress}
            total={challenge.maxProgress}
            height={6}
            showText={true}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <Clock size={14} color="#9ca3af" />
            <Text style={styles.timeText}>{getTimeRemaining(challenge.deadline)}</Text>
          </View>
          <Text style={styles.xpReward}>+{challenge.xpReward} XP</Text>
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
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
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
    marginBottom: 16,
    lineHeight: 20,
  },
  progressSection: {
    marginBottom: 16,
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