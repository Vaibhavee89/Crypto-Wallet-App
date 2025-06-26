import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Calendar, Zap, Target } from 'lucide-react-native';
import { useGameData } from '@/hooks/useGameData';
import ChallengeCard from '@/components/ChallengeCard';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ChallengesScreen() {
  const { user, challenges, completeChallenge } = useGameData();

  const dailyChallenges = challenges.filter(c => c.type === 'daily');
  const weeklyChallenges = challenges.filter(c => c.type === 'weekly');
  const specialChallenges = challenges.filter(c => c.type === 'special');

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalXpEarned = challenges
    .filter(c => c.completed)
    .reduce((sum, c) => sum + c.xpReward, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Trophy size={28} color="#4adeab" />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Challenges</Text>
              <Text style={styles.headerSubtitle}>
                Complete challenges to earn XP and unlock achievements
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Stats Overview */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.statsCard}
        >
          <Text style={styles.statsTitle}>Challenge Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Target size={20} color="#4adeab" />
              </View>
              <Text style={styles.statValue}>{completedChallenges}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Zap size={20} color="#f59e0b" />
              </View>
              <Text style={styles.statValue}>{totalXpEarned}</Text>
              <Text style={styles.statLabel}>XP Earned</Text>
            </View>
            
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Calendar size={20} color="#6366f1" />
              </View>
              <Text style={styles.statValue}>{user.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </Animated.View>

        {/* Daily Challenges */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.challengeSection}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Challenges</Text>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>Resets in 12h</Text>
            </View>
          </View>
          
          {dailyChallenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              index={index}
              onComplete={() => completeChallenge(challenge.id)}
            />
          ))}
        </Animated.View>

        {/* Weekly Challenges */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600)}
          style={styles.challengeSection}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weekly Challenges</Text>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>Resets in 3d</Text>
            </View>
          </View>
          
          {weeklyChallenges.map((challenge, index) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              index={index}
              onComplete={() => completeChallenge(challenge.id)}
            />
          ))}
        </Animated.View>

        {/* Special Challenges */}
        {specialChallenges.length > 0 && (
          <Animated.View 
            entering={FadeInDown.delay(500).duration(600)}
            style={styles.challengeSection}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Special Events</Text>
              <View style={[styles.sectionBadge, styles.specialBadge]}>
                <Text style={styles.sectionBadgeText}>Limited Time</Text>
              </View>
            </View>
            
            {specialChallenges.map((challenge, index) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                index={index}
                onComplete={() => completeChallenge(challenge.id)}
              />
            ))}
          </Animated.View>
        )}

        {/* Tips Card */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.tipsCard}
        >
          <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
          <Text style={styles.tipsText}>
            • Complete daily challenges to maintain your learning streak{'\n'}
            • Weekly challenges offer higher XP rewards{'\n'}
            • Special events provide exclusive achievements{'\n'}
            • Consistent participation unlocks bonus rewards
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1d29',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  statsCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#2a2d3a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  statsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  challengeSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  sectionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#374151',
    borderRadius: 8,
  },
  specialBadge: {
    backgroundColor: '#8b5cf6',
  },
  sectionBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  tipsCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 171, 0.2)',
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4adeab',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    lineHeight: 20,
  },
});