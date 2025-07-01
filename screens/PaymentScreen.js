import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, ImageBackground
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const PaymentScreen = ({ route, navigation }) => {
  const { item, selectedSeats, selectedShowtime } = route.params;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const backgroundImage = { uri: 'YOUR_PAYMENT_BACKGROUND_IMAGE_URL_HERE' };

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: 'credit-card' },
    { id: 'paypal', label: 'PayPal', icon: 'paypal' },
    { id: 'wallet', label: 'Mobile Wallet', icon: 'mobile' },
  ];

  const totalAmount = selectedSeats.length * item.price;
  const discountedAmount = discountApplied ? totalAmount * 0.9 : totalAmount;

  const applyDiscount = () => {
    if (discountCode === 'DISCOUNT10') {
      setDiscountApplied(true);
      Alert.alert('Success', 'Discount applied! 10% off.');
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid discount code.');
    }
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Payment Method Required', 'Please select a payment method.');
      return;
    }
    
    Alert.alert('Payment Successful', 'Your booking has been confirmed.', [
      { text: 'OK', onPress: () => navigation.navigate('ConfirmationScreen', { item, selectedSeats, selectedShowtime, totalAmount: discountedAmount }) }
    ]);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.subtitle}>Total: ${discountedAmount.toFixed(2)}</Text>

          <Text style={styles.label}>Select Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.paymentButton, selectedPaymentMethod === method.id && { backgroundColor: '#4CAF50' }]}
              onPress={() => setSelectedPaymentMethod(method.id)}
            >
              <FontAwesome name={method.icon} size={24} color={selectedPaymentMethod === method.id ? 'white' : '#004AAD'} />
              <Text style={[styles.paymentText, selectedPaymentMethod === method.id && { color: 'white' }]}>
                {method.label}
              </Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>Apply Discount Code</Text>
          <View style={styles.discountContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Code"
              placeholderTextColor="#666"
              value={discountCode}
              onChangeText={setDiscountCode}
            />
            <TouchableOpacity style={styles.discountButton} onPress={applyDiscount}>
              <Text style={styles.discountButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.payButtonText}> Confirm Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 50, 150, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#004AAD',
    borderRadius: 10,
    marginVertical: 5,
    width: '85%',
    justifyContent: 'center',
  },
  paymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004AAD',
    marginLeft: 10,
  },
  discountContainer: {
    flexDirection: 'row',
    width: '85%',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#004AAD',
    borderRadius: 10,
    padding: 10,
    color: '#004AAD',
  },
  discountButton: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: '#FF6F00',
    borderRadius: 10,
  },
  discountButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#004AAD',
    flexDirection: 'row',
    padding: 18,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
});

export default PaymentScreen;
