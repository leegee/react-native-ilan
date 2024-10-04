import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const sephirot = [
  {
    name: "כתר",
    left: 0.5,
    top: 0.1,
    additionalText: [
      "Keter represents the divine will.",
      "It is the source of all creation, the initial point of the emanation of the Sephirot."
    ]
  },   // Keter
  {
    name: "חכמה",
    left: 0.25,
    top: 0.2,
    additionalText: [
      "Chochmah is wisdom.",
      "It is the second Sephirah, representing pure thought and insight."
    ]
  }, // Chochmah
  {
    name: "בינה",
    left: 0.75,
    top: 0.2,
    additionalText: [
      "Binah signifies understanding.",
      "It is through Binah that wisdom is transformed into understanding."
    ]
  }, // Binah
  {
    name: "חסד",
    left: 0.25,
    top: 0.35,
    additionalText: [
      "Chesed embodies kindness.",
      "It represents love and the impulse to give."
    ]
  }, // Chesed
  {
    name: "גבורה",
    left: 0.75,
    top: 0.35,
    additionalText: [
      "Gevurah stands for strength.",
      "It represents the discipline and restraint that balances Chesed."
    ]
  }, // Gevurah
  {
    name: "תפארת",
    left: 0.5,
    top: 0.42,
    additionalText: [
      "Tiferet is beauty.",
      "It harmonizes the qualities of Chesed and Gevurah."
    ]
  }, // Tiferet
  {
    name: "נצח",
    left: 0.25,
    top: 0.50,
    additionalText: [
      "Netzach represents eternity.",
      "It embodies the concepts of endurance and victory."
    ]
  }, // Netzach
  {
    name: "הוד",
    left: 0.75,
    top: 0.50,
    additionalText: [
      "Hod symbolizes glory.",
      "It represents humility and submission to the divine."
    ]
  }, // Hod
  {
    name: "יסוד",
    left: 0.5,
    top: 0.60,
    additionalText: [
      "Yesod is foundation.",
      "It serves as the bridge between the spiritual and the material."
    ]
  }, // Yesod
  {
    name: "מלכות",
    left: 0.5,
    top: 0.80,
    additionalText: [
      "Malkuth represents sovereignty.",
      "It is the manifestation of the divine presence in the physical world."
    ]
  }, // Malkuth
];

// Define the pathways between Sephirot
const pathways = [
  { start: 0, end: 1 }, // Keter -> Chochmah
  { start: 0, end: 2 }, // Keter -> Binah
  { start: 1, end: 3 }, // Chochmah -> Chesed
  { start: 2, end: 4 }, // Binah -> Gevurah
  { start: 3, end: 5 }, // Chesed -> Tiferet
  { start: 4, end: 5 }, // Gevurah -> Tiferet
  { start: 5, end: 6 }, // Tiferet -> Netzach
  { start: 5, end: 7 }, // Tiferet -> Hod
  { start: 6, end: 8 }, // Netzach -> Yesod
  { start: 7, end: 8 }, // Hod -> Yesod
  { start: 8, end: 9 }, // Yesod -> Malkuth
];

const App = () => {
  const [zoomedCircle, setZoomedCircle] = useState<number | null>(null);
  const [zoomText, setZoomText] = useState<string[]>([]);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const zoomToCircle = (index: number) => {
    setZoomedCircle(index);
    setZoomText(sephirot[index].additionalText);
  };

  const renderCircles = () => {
    return sephirot.map((circle, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => zoomToCircle(index)}
        style={[
          styles.circle,
          { left: `${circle.left * 100}%`, top: `${circle.top * 100}%` },
        ]}
      >
        <Text style={styles.circleText}>{circle.name}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.svg}>
        {pathways.map((path, index) => {
          const startSephirot = sephirot[path.start];
          const endSephirot = sephirot[path.end];

          // Calculate absolute center points for lines
          const startX = startSephirot.left * windowDimensions.width; // Convert to absolute x position
          const startY = startSephirot.top * windowDimensions.height; // Convert to absolute y position
          const endX = endSephirot.left * windowDimensions.width; // Convert to absolute x position
          const endY = endSephirot.top * windowDimensions.height; // Convert to absolute y position

          return (
            <Line
              key={index}
              x1={startX + 40} // Move to center of circle (40px radius)
              y1={startY + 40} // Move to center of circle (40px radius)
              x2={endX + 40} // Move to center of circle (40px radius)
              y2={endY + 40} // Move to center of circle (40px radius)
              stroke="black"
              strokeWidth="2"
            />
          );
        })}
      </Svg>

      {zoomedCircle === null ? (
        renderCircles()
      ) : (
        <View style={styles.zoomedContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {zoomText.map((text, index) => (
              <Text key={index} style={styles.zoomedText}>{text}</Text>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setZoomedCircle(null)}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
  },
  circleText: {
    textAlign: 'center',
    color: 'white',
  },
  zoomedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002',
    color: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  zoomedText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
    color: 'white',
  },
  backText: {
    fontSize: 16,
    alignItems: 'center',
    backgroundColor: '#002',
    color: 'white',
    padding: 10, // Optional: add padding for better touch area
    borderRadius: 5, // Optional: add border radius for better aesthetics
  },
});

export default App;
