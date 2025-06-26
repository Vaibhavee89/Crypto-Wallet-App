import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Trophy, BookOpen, Target, Settings, Share, Award, TrendingUp, Calendar } from 'lucide-react-native';
import { useGameData } from '@/hooks/useGameData';
import AchievementCard from '@/components/AchievementCard';
import ProgressBar from '@/components/ProgressBar';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { user, leaderboard } = useGameData();

  const userRank = leaderboard.findIndex(entry => entry.name === user.name) + 1;
  const nextLevelXp = user.xpToNextLevel - user.xp;

  const stats = [
    { icon: BookOpen, label: 'Lessons Completed', value: user.completedLessons.length, color: '#6366f1' },
    { icon: Trophy, label: 'Achievements', value: user.achievements.length, color: '#f59e0b' },
    { icon: Target, label: 'Current Streak', value: `${user.streak} days`, color: '#ef4444' },
    { icon: TrendingUp, label: 'Leaderboard Rank', value: `#${userRank}`, color: '#4adeab' },
  ];

  const recentAchievements = user.achievements.slice(-3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#9ca3af" />
          </TouchableOpacity>
        </Animated.View>

        {/* Profile Card */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.profileCard}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.avatar}
              />
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{user.level}</Text>
              </View>
            </View>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userTitle}>Crypto Learner</Text>
              
              <View style={styles.xpContainer}>
                <Text style={styles.xpText}>{user.xp} XP</Text>
                <Text style={styles.nextLevelText}>
                  {nextLevelXp} XP to Level {user.level + 1}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.shareButton}>
              <Share size={20} color="#4adeab" />
            </TouchableOpacity>
          </View>

          <ProgressBar
            progress={user.xp}
            total={user.xpToNextLevel}
            height={8}
            color="#4adeab"
            label="Level Progress"
          />
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.statsSection}
        >
          <Text style={styles.sectionTitle}>Statistics</Text>
          
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Animated.View 
                key={stat.label}
                entering={FadeInDown.delay(400 + index * 100).duration(600)}
              >
                <View style={styles.statCard}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <stat.icon size={20} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Recent Achievements */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.achievementsSection}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentAchievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </Animated.View>

        {/* Learning Journey */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.journeySection}
        >
          <Text style={styles.sectionTitle}>Learning Journey</Text>
          
          <View style={styles.journeyCard}>
            <View style={styles.journeyHeader}>
              <Calendar size={20} color="#4adeab" />
              <Text style={styles.journeyTitle}>Member Since</Text>
            </View>
            <Text style={styles.journeyDate}>January 2024</Text>
            
            <View style={styles.journeyStats}>
              <View style={styles.journeyStatItem}>
                <Text style={styles.journeyStatValue}>15</Text>
                <Text style={styles.journeyStatLabel}>Days Active</Text>
              </View>
              <View style={styles.journeyStatItem}>
                <Text style={styles.journeyStatValue}>2.5h</Text>
                <Text style={styles.journeyStatLabel}>Avg. Daily</Text>
              </View>
              <View style={styles.journeyStatItem}>
                <Text style={styles.journeyStatValue}>85%</Text>
                <Text style={styles.journeyStatLabel}>Accuracy</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Leaderboard Position */}
        <Animated.View 
          entering={FadeInDown.delay(700).duration(600)}
          style={styles.leaderboardSection}
        >
          <Text style={styles.sectionTitle}>Leaderboard Position</Text>
          
          <View style={styles.leaderboardCard}>
            <View style={styles.rankContainer}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{userRank}</Text>
              </View>
              <View style={styles.rankInfo}>
                <Text style={styles.rankTitle}>Current Rank</Text>
                <Text style={styles.rankDescription}>
                  You're in the top {Math.round((userRank / leaderboard.length) * 100)}% of learners!
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.viewLeaderboardButton}>
              <Trophy size={16} color="#4adeab" />
              <Text style={styles.viewLeaderboardText}>View Full Leaderboard</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Motivational Quote */}
        <Animated.View 
          entering={FadeInDown.delay(800).duration(600)}
          style={styles.quoteCard}
        >
          <Award size={24} color="#6366f1" />
          <Text style={styles.quoteText}>
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </Text>
          <Text style={styles.quoteAuthor}>- Chinese Proverb</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#2a2d3a',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#4adeab',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: '#2a2d3a',
  },
  levelText: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 8,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  xpText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#4adeab',
  },
  nextLevelText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  shareButton: {
    padding: 8,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#2a2d3a',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
  },
  achievementsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4adeab',
  },
  journeySection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  journeyCard: {
    backgroundColor: '#2a2d3a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  journeyTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  journeyDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 16,
  },
  journeyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  journeyStatItem: {
    alignItems: 'center',
  },
  journeyStatValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#4adeab',
  },
  journeyStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  leaderboardSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  leaderboardCard: {
    backgroundColor: '#2a2d3a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rankBadge: {
    backgroundColor: '#4adeab',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 16,
  },
  rankText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  rankInfo: {
    flex: 1,
  },
  rankTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  rankDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  viewLeaderboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 171, 0.2)',
  },
  viewLeaderboardText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4adeab',
  },
  quoteCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 12,
    marginBottom: 8,
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
});