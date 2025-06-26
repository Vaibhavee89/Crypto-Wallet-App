import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Filter, Search } from 'lucide-react-native';
import { useGameData } from '@/hooks/useGameData';
import LessonCard from '@/components/LessonCard';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function LearnScreen() {
  const { user, lessons, completeLesson } = useGameData();

  const handleLessonPress = (lessonId: string) => {
    // In a real app, this would navigate to the lesson detail screen
    router.push(`/lesson/${lessonId}`);
  };

  const isLessonLocked = (lesson: any) => {
    return lesson.prerequisites.some((prereq: string) => 
      !user.completedLessons.includes(prereq)
    );
  };

  const categories = ['All', 'Basics', 'Trading', 'Security', 'Advanced'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <BookOpen size={28} color="#4adeab" />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Learn Crypto</Text>
              <Text style={styles.headerSubtitle}>
                {user.completedLessons.length} of {lessons.length} lessons completed
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Progress Overview */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.progressCard}
        >
          <Text style={styles.progressTitle}>Learning Progress</Text>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>{user.completedLessons.length}</Text>
              <Text style={styles.progressLabel}>Completed</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>
                {lessons.length - user.completedLessons.length}
              </Text>
              <Text style={styles.progressLabel}>Remaining</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressValue}>
                {Math.round((user.completedLessons.length / lessons.length) * 100)}%
              </Text>
              <Text style={styles.progressLabel}>Complete</Text>
            </View>
          </View>
        </Animated.View>

        {/* Filter Buttons */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.filtersSection}
        >
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>Categories</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={16} color="#9ca3af" />
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilters}
          >
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={category}
                style={[
                  styles.categoryChip,
                  index === 0 && styles.activeCategoryChip
                ]}
              >
                <Text style={[
                  styles.categoryChipText,
                  index === 0 && styles.activeCategoryChipText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Lessons List */}
        <View style={styles.lessonsSection}>
          <Text style={styles.sectionTitle}>Available Lessons</Text>
          
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              isCompleted={user.completedLessons.includes(lesson.id)}
              isLocked={isLessonLocked(lesson)}
              onPress={() => handleLessonPress(lesson.id)}
            />
          ))}
        </View>

        {/* Coming Soon */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(600)}
          style={styles.comingSoonCard}
        >
          <Text style={styles.comingSoonTitle}>More Lessons Coming Soon!</Text>
          <Text style={styles.comingSoonText}>
            We're constantly adding new content to help you master cryptocurrency investing. 
            Stay tuned for advanced trading strategies, DeFi protocols, and more!
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
  progressCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#2a2d3a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#4adeab',
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 4,
  },
  filtersSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2a2d3a',
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  categoryFilters: {
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#2a2d3a',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  activeCategoryChip: {
    backgroundColor: '#4adeab',
    borderColor: '#4adeab',
  },
  categoryChipText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#9ca3af',
  },
  activeCategoryChipText: {
    color: '#ffffff',
  },
  lessonsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 16,
  },
  comingSoonCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  comingSoonTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6366f1',
    marginBottom: 8,
  },
  comingSoonText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    lineHeight: 20,
  },
});