import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, useEffect } from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number;
  total: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  label?: string;
}

export default function ProgressBar({
  progress,
  total,
  height = 8,
  color = '#4adeab',
  backgroundColor = '#374151',
  showText = false,
  label
}: ProgressBarProps) {
  const progressWidth = useSharedValue(0);
  const percentage = Math.min((progress / total) * 100, 100);

  useEffect(() => {
    progressWidth.value = withTiming(percentage, { duration: 800 });
  }, [progress, total]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      {(showText || label) && (
        <View style={styles.textContainer}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showText && (
            <Text style={styles.progressText}>
              {progress}/{total} ({Math.round(percentage)}%)
            </Text>
          )}
        </View>
      )}
      <View style={[styles.track, { height, backgroundColor }]}>
        <Animated.View
          style={[
            styles.fill,
            { height, backgroundColor: color },
            animatedStyle
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  track: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 4,
  },
});