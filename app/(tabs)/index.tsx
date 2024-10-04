import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const ZoomableCirclesApp = () => {
  const [zoomedCircleIndex, setZoomedCircleIndex] = useState<number | null>(null); // Allow state to hold either a number (index) or null
  const animatedValue = useRef(new Animated.Value(1)).current; // Value to animate the zoom effect

  const handleCirclePress = (index: number) => {
    setZoomedCircleIndex(index); // Set the pressed circle index
    // Animate the circle to fill the screen
    Animated.timing(animatedValue, {
      toValue: 2, // Increase the zoom level
      duration: 500,
      useNativeDriver: false, // Needs to be false because we're animating layout
    }).start();
  };

  const handleZoomOut = () => {
    setZoomedCircleIndex(null); // Reset zoom state
    // Animate the zoom back to the original size
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // Combined positions and Hebrew names into a single array with percentage-based positions
  const sephirot = [
    { name: "כתר", left: 0.5, top: 0.1 },   // Keter
    { name: "חכמה", left: 0.25, top: 0.2 }, // Chochmah
    { name: "בינה", left: 0.75, top: 0.2 }, // Binah
    { name: "חסד", left: 0.25, top: 0.35 }, // Chesed
    { name: "גבורה", left: 0.75, top: 0.35 }, // Gevurah
    { name: "תפארת", left: 0.5, top: 0.45 }, // Tiferet
    { name: "נצח", left: 0.25, top: 0.55 }, // Netzach
    { name: "הוד", left: 0.75, top: 0.55 }, // Hod
    { name: "יסוד", left: 0.5, top: 0.65 }, // Yesod
    { name: "מלכות", left: 0.5, top: 0.85 }, // Malkuth
  ];

  return (
    <View style={styles.container}>
      {/* Render circles in the defined Sephirot positions */}
      {sephirot.map((sefirah, index) => {
        const circleStyle = {
          position: 'absolute',
          left: sefirah.left * width - 50, // Center the circle
          top: sefirah.top * height - 50, // Center the circle
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleCirclePress(index)} // Now handleCirclePress expects a number
            style={circleStyle}
          >
            <Animated.View
              style={[
                styles.circle,
                zoomedCircleIndex === index && {
                  // When zoomed, fill the entire screen
                  position: 'absolute', // Required to take the full screen
                  left: 0,
                  top: 0,
                  width: width,
                  height: height,
                  borderRadius: 0, // Change borderRadius to 0 for square on zoom
                  transform: [{ scale: animatedValue }],
                },
              ]}
            >
              <Text style={styles.circleText}>{sefirah.name}</Text> {/* Add Hebrew text inside the circle */}
            </Animated.View>
          </TouchableOpacity>
        );
      })}

      {/* Zoom out button, only visible when a circle is zoomed */}
      {zoomedCircleIndex !== null && (
        <TouchableOpacity style={styles.zoomOutButton} onPress={handleZoomOut}>
          <Text style={styles.zoomOutText}>Zoom Out</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: 'dodgerblue',
    borderRadius: 50,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },
  circleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
  },
  zoomOutButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  zoomOutText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ZoomableCirclesApp;
