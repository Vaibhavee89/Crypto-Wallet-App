import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Shield, Bell, Moon, Globe, CircleHelp as HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        { icon: User, title: 'Profile', subtitle: 'Manage your account details', hasSwitch: false },
        { icon: Shield, title: 'Security', subtitle: 'Password & 2FA settings', hasSwitch: false },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, title: 'Notifications', subtitle: 'Push notifications', hasSwitch: true, switchValue: notifications, onSwitchChange: setNotifications },
        { icon: Moon, title: 'Dark Mode', subtitle: 'App appearance', hasSwitch: true, switchValue: darkMode, onSwitchChange: setDarkMode },
        { icon: Shield, title: 'Biometric Lock', subtitle: 'Use fingerprint/face unlock', hasSwitch: true, switchValue: biometric, onSwitchChange: setBiometric },
        { icon: Globe, title: 'Language', subtitle: 'English', hasSwitch: false },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, title: 'Help Center', subtitle: 'Get help and support', hasSwitch: false },
        { icon: FileText, title: 'Terms & Privacy', subtitle: 'Legal information', hasSwitch: false },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <TouchableOpacity style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <User size={32} color="#4adeab" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </Animated.View>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <Animated.View 
            key={group.title}
            entering={FadeInDown.delay(200 + groupIndex * 100).duration(600)}
          >
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}>{group.title}</Text>
            </View>
            
            <View style={styles.groupContainer}>
              {group.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={item.title}
                  style={[
                    styles.settingItem,
                    itemIndex === group.items.length - 1 && styles.lastItem
                  ]}
                  disabled={item.hasSwitch}
                >
                  <View style={styles.settingIcon}>
                    <item.icon size={20} color="#4adeab" />
                  </View>
                  
                  <View style={styles.settingContent}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>
                  
                  {item.hasSwitch ? (
                    <Switch
                      value={item.switchValue}
                      onValueChange={item.onSwitchChange}
                      trackColor={{ false: '#374151', true: '#4adeab' }}
                      thumbColor={item.switchValue ? '#ffffff' : '#9ca3af'}
                    />
                  ) : (
                    <ChevronRight size={20} color="#9ca3af" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        ))}

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.delay(600).duration(600)}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
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
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 32,
    padding: 20,
    backgroundColor: '#2a2d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  groupHeader: {
    paddingHorizontal: 24,
    marginBottom: 12,
    marginTop: 24,
  },
  groupTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  groupContainer: {
    marginHorizontal: 24,
    backgroundColor: '#2a2d3a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 32,
    padding: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ef4444',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});