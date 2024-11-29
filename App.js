import React, { useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native'; 
import Reanimated, { withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

// Replace the local image with a browser image URL
const imageUrl = 'https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/463278919_1867088467151253_5796243171662992517_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHuPo6bVRdbCnzm7J7SplpE_k3j931PP27-TeP3fU8_buFuPFO1KgTXxcajpDqW57gx3OPiZYB-iXloTyBzwmjI&_nc_ohc=8PGsnZxzZlsQ7kNvgHQGZQc&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_gid=AHuMYWqDL8JL0-N0VIqRAXj&oh=00_AYAnwQ2ExLEVHU8kG4CcM-4lDNAXY6BGa_qnDetZmUEJ4g&oe=674F45DB';

const withActionLogger = (WrappedComponent) => {
  return (props) => {
    const handleClick = () => {
      console.log('Button clicked');
      props.onPress && props.onPress();
    };
    return <WrappedComponent {...props} onPress={handleClick} />;
  };
};

const CustomButton = withActionLogger(({ onPress, label, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={24} color="#FFFFFF" style={styles.buttonIcon} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
});

const App = () => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const scale = useSharedValue(1);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 300 }) }],
    };
  });

  const toggleScale = () => {
    scale.value = scale.value === 1 ? 1.5 : 1; 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>ohahah</Text>

      <Reanimated.View style={[styles.imageBox, animatedStyle]}>
        <Image
          source={{ uri: imageUrl }} // Use the image from the browser
          style={styles.image}
        />
      </Reanimated.View>

      <Animated.View style={[styles.fadingBox, { opacity: fadeAnim }]}>
        <Text style={styles.boxText}>ARTURO OLITA JR.</Text>
        <Text style={styles.boxText}>BSIT-3</Text>
      </Animated.View>

      <CustomButton label="Animate Image" onPress={toggleScale} icon="sync-outline" />
      <CustomButton label="Fade In" onPress={fadeIn} icon="eye-outline" />
      <CustomButton label="Fade Out" onPress={fadeOut} icon="eye-off-outline" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1877F2', // Facebook blue
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2, 
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // White button
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 40,
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  buttonText: {
    color: '#1877F2', // Facebook blue text
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12, 
  },
  buttonIcon: {
    marginRight: 12,
  },
  fadingBox: {
    width: 250,
    height: 130,
    backgroundColor: '#FFFFFF', // White fading box
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
  },
  boxText: {
    color: '#1877F2', // Facebook blue text
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  imageBox: {
    width: 150,
    height: 150,
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#1877F2', // Facebook blue border
  },
});

export default App;
