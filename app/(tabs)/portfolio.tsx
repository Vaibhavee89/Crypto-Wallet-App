import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, DollarSign, Plus, Minus, ChartBar as BarChart3 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useGameData } from '@/hooks/useGameData';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock current prices for simulation
const mockPrices: { [key: string]: number } = {
  'BTC': 47500,
  'ETH': 3200,
  'ADA': 0.45,
  'DOT': 8.50,
  'SOL': 95.30,
  'MATIC': 0.85,
};

export default function PortfolioScreen() {
  const { user, makeTrade } = useGameData();
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');

  // Calculate portfolio value
  const portfolioValue = user.portfolio.reduce((total, item) => {
    const currentPrice = mockPrices[item.symbol] || item.currentPrice;
    return total + (item.amount * currentPrice);
  }, 0);

  const totalInvested = user.portfolio.reduce((total, item) => {
    return total + (item.amount * item.purchasePrice);
  }, 0);

  const totalGainLoss = portfolioValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

  const availableCryptos = [
    { symbol: 'BTC', name: 'Bitcoin', price: mockPrices.BTC },
    { symbol: 'ETH', name: 'Ethereum', price: mockPrices.ETH },
    { symbol: 'ADA', name: 'Cardano', price: mockPrices.ADA },
    { symbol: 'DOT', name: 'Polkadot', price: mockPrices.DOT },
    { symbol: 'SOL', name: 'Solana', price: mockPrices.SOL },
    { symbol: 'MATIC', name: 'Polygon', price: mockPrices.MATIC },
  ];

  const handleTrade = (symbol: string, isBuy: boolean) => {
    const crypto = availableCryptos.find(c => c.symbol === symbol);
    if (!crypto) return;

    const amount = isBuy ? 100 / crypto.price : 0.01; // Buy $100 worth or sell 0.01 units
    const cost = amount * crypto.price;

    if (isBuy && cost > user.virtualBalance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough virtual money for this trade.');
      return;
    }

    makeTrade(symbol, amount, crypto.price);
    Alert.alert(
      'Trade Executed!',
      `${isBuy ? 'Bought' : 'Sold'} ${amount.toFixed(6)} ${symbol} for $${cost.toFixed(2)}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Virtual Portfolio</Text>
          <Text style={styles.headerSubtitle}>Practice trading with virtual money</Text>
        </Animated.View>

        {/* Portfolio Value Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.portfolioCard}
          >
            <Text style={styles.portfolioLabel}>Total Portfolio Value</Text>
            <Text style={styles.portfolioValue}>${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            
            <View style={styles.portfolioStats}>
              <View style={styles.portfolioStat}>
                <Text style={styles.portfolioStatLabel}>Available Balance</Text>
                <Text style={styles.portfolioStatValue}>${user.virtualBalance.toLocaleString()}</Text>
              </View>
              
              <View style={styles.portfolioStat}>
                <Text style={styles.portfolioStatLabel}>Total P&L</Text>
                <View style={styles.gainLossContainer}>
                  {totalGainLoss >= 0 ? (
                    <TrendingUp size={16} color="#4adeab" />
                  ) : (
                    <TrendingDown size={16} color="#ef4444" />
                  )}
                  <Text style={[
                    styles.portfolioStatValue,
                    { color: totalGainLoss >= 0 ? '#4adeab' : '#ef4444' }
                  ]}>
                    ${Math.abs(totalGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({gainLossPercentage.toFixed(2)}%)
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Holdings */}
        {user.portfolio.length > 0 && (
          <Animated.View 
            entering={FadeInDown.delay(300).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Your Holdings</Text>
            
            {user.portfolio.map((holding, index) => {
              const currentPrice = mockPrices[holding.symbol] || holding.currentPrice;
              const currentValue = holding.amount * currentPrice;
              const gainLoss = currentValue - (holding.amount * holding.purchasePrice);
              const gainLossPercent = ((currentPrice - holding.purchasePrice) / holding.purchasePrice) * 100;
              
              return (
                <Animated.View 
                  key={`${holding.symbol}-${index}`}
                  entering={FadeInDown.delay(400 + index * 100).duration(600)}
                >
                  <View style={styles.holdingCard}>
                    <View style={styles.holdingHeader}>
                      <View style={styles.holdingIcon}>
                        <Text style={styles.holdingSymbol}>{holding.symbol}</Text>
                      </View>
                      
                      <View style={styles.holdingInfo}>
                        <Text style={styles.holdingName}>{holding.name}</Text>
                        <Text style={styles.holdingAmount}>
                          {holding.amount.toFixed(6)} {holding.symbol}
                        </Text>
                      </View>
                      
                      <View style={styles.holdingValues}>
                        <Text style={styles.holdingValue}>
                          ${currentValue.toFixed(2)}
                        </Text>
                        <View style={styles.holdingGainLoss}>
                          {gainLoss >= 0 ? (
                            <TrendingUp size={12} color="#4adeab" />
                          ) : (
                            <TrendingDown size={12} color="#ef4444" />
                          )}
                          <Text style={[
                            styles.holdingGainLossText,
                            { color: gainLoss >= 0 ? '#4adeab' : '#ef4444' }
                          ]}>
                            {gainLossPercent.toFixed(2)}%
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </Animated.View>
        )}

        {/* Available Cryptocurrencies */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Available Cryptocurrencies</Text>
          <Text style={styles.sectionSubtitle}>
            Practice trading with real-time simulated prices
          </Text>
          
          {availableCryptos.map((crypto, index) => (
            <Animated.View 
              key={crypto.symbol}
              entering={FadeInDown.delay(600 + index * 100).duration(600)}
            >
              <View style={styles.cryptoCard}>
                <View style={styles.cryptoInfo}>
                  <View style={styles.cryptoIcon}>
                    <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                  </View>
                  
                  <View style={styles.cryptoDetails}>
                    <Text style={styles.cryptoName}>{crypto.name}</Text>
                    <Text style={styles.cryptoPrice}>
                      ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.tradeButtons}>
                  <TouchableOpacity 
                    style={styles.buyButton}
                    onPress={() => handleTrade(crypto.symbol, true)}
                  >
                    <Plus size={16} color="#ffffff" />
                    <Text style={styles.tradeButtonText}>Buy</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.sellButton}
                    onPress={() => handleTrade(crypto.symbol, false)}
                  >
                    <Minus size={16} color="#ffffff" />
                    <Text style={styles.tradeButtonText}>Sell</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Educational Note */}
        <Animated.View 
          entering={FadeInDown.delay(800).duration(600)}
          style={styles.educationalCard}
        >
          <BarChart3 size={24} color="#6366f1" />
          <Text style={styles.educationalTitle}>Learning Mode</Text>
          <Text style={styles.educationalText}>
            This is a virtual trading environment. All trades are simulated and no real money is involved. 
            Use this space to practice your trading strategies and learn about market dynamics!
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
  portfolioCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  portfolioLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  portfolioValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portfolioStat: {
    flex: 1,
  },
  portfolioStatLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  portfolioStatValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  gainLossContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: 16,
  },
  holdingCard: {
    backgroundColor: '#2a2d3a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  holdingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  holdingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  holdingSymbol: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#4adeab',
  },
  holdingInfo: {
    flex: 1,
  },
  holdingName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  holdingAmount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  holdingValues: {
    alignItems: 'flex-end',
  },
  holdingValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 4,
  },
  holdingGainLoss: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  holdingGainLossText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  cryptoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2d3a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 222, 171, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cryptoSymbol: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    color: '#4adeab',
  },
  cryptoDetails: {
    flex: 1,
  },
  cryptoName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
  },
  cryptoPrice: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#4adeab',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sellButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tradeButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  educationalCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
  },
  educationalTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6366f1',
    marginTop: 12,
    marginBottom: 8,
  },
  educationalText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});