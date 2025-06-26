import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Zap, Target, Users, ChevronRight, BookOpen, Trophy, TrendingUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameData } from '@/hooks/useGameData';
import ProgressBar from '@/components/ProgressBar';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user, challenges } = useGameData();
  const createButtonScale = useSharedValue(1);

  const handleGetStarted = () => {
    createButtonScale.value = withSpring(0.95, {}, () => {
      createButtonScale.value = withSpring(1);
    });
    router.push('/learn');
  };

  const createButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: createButtonScale.value }],
  }));

  const activeChallenges = challenges.filter(c => !c.completed).slice(0, 2);
  const completionRate = Math.round((user.completedLessons.length / 10) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with User Stats */}
        <Animated.View 
          entering={FadeInUp.delay(100).duration(800)}
          style={styles.header}
        >
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Lv.{user.level}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </Animated.View>

        {/* XP Progress */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.xpCard}
        >
          <View style={styles.xpHeader}>
            <Text style={styles.xpTitle}>Level Progress</Text>
            <Text style={styles.xpText}>{user.xp}/{user.xpToNextLevel} XP</Text>
          </View>
          <ProgressBar
            progress={user.xp}
            total={user.xpToNextLevel}
            height={8}
            color="#4adeab"
          />
        </Animated.View>

        {/* Hero Section */}
        <Animated.View 
          entering={FadeInUp.delay(300).duration(800)}
          style={styles.heroSection}
        >
          <View style={styles.iconContainer}>
            <View style={styles.shieldOuter}>
              <View style={styles.shieldInner}>
                <Shield size={60} color="#4adeab" strokeWidth={1.5} />
              </View>
            </View>
          </View>

          <Text style={styles.heroTitle}>Master Cryptocurrency Investing</Text>
          <Text style={styles.heroSubtitle}>
            Learn, practice, and build confidence in crypto trading through gamified lessons and virtual portfolio management.
          </Text>

          <Animated.View style={createButtonAnimatedStyle}>
            <TouchableOpacity onPress={handleGetStarted} activeOpacity={0.9}>
              <LinearGradient
                colors={['#6366f1', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaButtonText}>Start Learning</Text>
                <ChevronRight size={20} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Features Grid */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.featuresSection}
        >
          <Text style={styles.sectionTitle}>Why Choose CryptoLearn?</Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <BookOpen size={24} color="#4adeab" />
              </View>
              <Text style={styles.featureTitle}>Interactive Lessons</Text>
              <Text style={styles.featureDescription}>
                Learn crypto fundamentals through engaging, bite-sized lessons
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <TrendingUp size={24} color="#4adeab" />
              </View>
              <Text style={styles.featureTitle}>Virtual Trading</Text>
              <Text style={styles.featureDescription}>
                Practice with $10,000 virtual money risk-free
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Trophy size={24} color="#4adeab" />
              </View>
              <Text style={styles.featureTitle}>Achievements</Text>
              <Text style={styles.featureDescription}>
                Earn XP, unlock badges, and climb the leaderboard
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Users size={24} color="#4adeab" />
              </View>
              <Text style={styles.featureTitle}>Community</Text>
              <Text style={styles.featureDescription}>
                Connect with fellow learners and share insights
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(800)}
          style={styles.quickStats}
        >
          <Text style={styles.sectionTitle}>Your Progress</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.quickStatCard}>
              <Text style={styles.quickStatValue}>{user.completedLessons.length}</Text>
              <Text style={styles.quickStatLabel}>Lessons Completed</Text>
            </View>
            
            <View style={styles.quickStatCard}>
              <Text style={styles.quickStatValue}>{completionRate}%</Text>
              <Text style={styles.quickStatLabel}>Course Progress</Text>
            </View>
            
            <View style={styles.quickStatCard}>
              <Text style={styles.quickStatValue}>${user.virtualBalance.toLocaleString()}</Text>
              <Text style={styles.quickStatLabel}>Virtual Balance</Text>
            </View>
          </View>
        </Animated.View>

        {/* Active Challenges Preview */}
        {activeChallenges.length > 0 && (
          <Animated.View 
            entering={FadeInDown.delay(600).duration(800)}
            style={styles.challengesPreview}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Challenges</Text>
              <TouchableOpacity onPress={() => router.push('/challenges')}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            {activeChallenges.map((challenge, index) => (
              <View key={challenge.id} style={styles.challengePreviewCard}>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeProgress}>
                    {challenge.progress}/{challenge.maxProgress}
                  </Text>
                </View>
                <ProgressBar
                  progress={challenge.progress}
                  total={challenge.maxProgress}
                  height={4}
                />
              </View>
            ))}
          </Animated.View>
        )}

        {/* Motivational Image */}
        <Animated.View 
          entering={FadeInDown.delay(700).duration(800)}
          style={styles.imageSection}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.motivationalImage}
          />
          <View style={styles.imageOverlay}>
            <Text style={styles.imageText}>Your crypto journey starts here</Text>
          </View>
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
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2d3a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#4adeab',
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#374151',
    marginHorizontal: 16,
  },
  xpCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#2a2d3a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  xpTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  xpText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4adeab',
  },
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  shieldOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4adeab',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
  },
  shieldInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#4adeab',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 222, 171, 0.05)',
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingHorizontal: 32,
    borderRadius: 28,
    gap: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    width: (width - 64) / 2,
    backgroundColor: '#2a2d3a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    lineHeight: 20,
  },
  quickStats: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: '#2a2d3a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#374151',
  },
  quickStatValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#4adeab',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
  },
  challengesPreview: {
    paddingHorizontal: 24,
    marginBottom: 32,
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
  challengePreviewCard: {
    backgroundColor: '#2a2d3a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  challengeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  challengeProgress: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  imageSection: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  motivationalImage: {
    width: '100%',
    height: 200,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  imageText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    textAlign: 'center',
  },
});