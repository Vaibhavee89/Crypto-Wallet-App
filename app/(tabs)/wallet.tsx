import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Send, ArrowDownLeft, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function WalletScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const cryptoAssets = [
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.00251847', value: '$127.45', change: '+2.34%', changePositive: true },
    { symbol: 'ETH', name: 'Ethereum', balance: '0.8547', value: '$2,847.23', change: '+5.67%', changePositive: true },
    { symbol: 'ADA', name: 'Cardano', balance: '1,247.50', value: '$432.18', change: '-1.23%', changePositive: false },
    { symbol: 'DOT', name: 'Polkadot', balance: '45.73', value: '$298.47', change: '+0.89%', changePositive: true },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Wallet</Text>
          <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
            {balanceVisible ? (
              <Eye size={24} color="#9ca3af" />
            ) : (
              <EyeOff size={24} color="#9ca3af" />
            )}
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceCard}
          >
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>
              {balanceVisible ? '$3,705.33' : '••••••••'}
            </Text>
            <Text style={styles.balanceChange}>+$127.45 (3.56%) today</Text>
          </LinearGradient>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.actionButtons}
        >
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Plus size={24} color="#4adeab" />
            </View>
            <Text style={styles.actionButtonText}>Buy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <Send size={24} color="#4adeab" />
            </View>
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <ArrowDownLeft size={24} color="#4adeab" />
            </View>
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Assets List */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <View style={styles.assetsHeader}>
            <Text style={styles.assetsTitle}>Your Assets</Text>
          </View>
          
          {cryptoAssets.map((asset, index) => (
            <Animated.View 
              key={asset.symbol}
              entering={FadeInDown.delay(400 + index * 100).duration(600)}
            >
              <TouchableOpacity style={styles.assetItem}>
                <View style={styles.assetIcon}>
                  <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                </View>
                
                <View style={styles.assetInfo}>
                  <Text style={styles.assetName}>{asset.name}</Text>
                  <Text style={styles.assetBalance}>{asset.balance} {asset.symbol}</Text>
                </View>
                
                <View style={styles.assetValues}>
                  <Text style={styles.assetValue}>{asset.value}</Text>
                  <Text style={[
                    styles.assetChange,
                    { color: asset.changePositive ? '#4adeab' : '#ef4444' }
                  ]}>
                    {asset.change}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
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
  balanceCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  balanceChange: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2a2d3a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  assetsHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  assetsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2d3a',
  },
  assetIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2a2d3a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  assetSymbol: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#4adeab',
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  assetBalance: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  assetValues: {
    alignItems: 'flex-end',
  },
  assetValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  assetChange: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});