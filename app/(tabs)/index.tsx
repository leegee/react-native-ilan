import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';

const RADIUS = 40;

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



const pathways = [
  {
    title: "Path of Aleph (Unity)",
    description: "Connects Keter (1) to Chokhmah (2)",
    start: 0,
    end: 1,
    letter: "א", // Aleph
    index: 1,
  },
  {
    title: "Path of Beth (Duality)",
    description: "Connects Chokhmah (2) to Binah (3)",
    start: 1,
    end: 2,
    letter: "ב", // Beth
    index: 2,
  },
  {
    title: "Path of Gimel (Trinity)",
    description: "Connects Binah (3) to Chesed (4)",
    start: 2,
    end: 3,
    letter: "ג", // Gimel
    index: 3,
  },
  {
    title: "Path of Daleth (Four Elements)",
    description: "Connects Chesed (4) to Gevurah (5)",
    start: 3,
    end: 4,
    letter: "ד", // Daleth
    index: 4,
  },
  {
    title: "Path of Hei (Five Senses)",
    description: "Connects Gevurah (5) to Tiferet (6)",
    start: 4,
    end: 5,
    letter: "ה", // Hei
    index: 5,
  },
  {
    title: "Path of Vau (Six Directions)",
    description: "Connects Tiferet (6) to Netzach (7)",
    start: 5,
    end: 6,
    letter: "ו", // Vau
    index: 6,
  },
  {
    title: "Path of Zain (Seven Planets)",
    description: "Connects Netzach (7) to Hod (8)",
    start: 6,
    end: 7,
    letter: "ז", // Zain
    index: 7,
  },
  {
    title: "Path of Cheth (Eight Aspects)",
    description: "Connects Hod (8) to Yesod (9)",
    start: 7,
    end: 8,
    letter: "ח", // Cheth
    index: 8,
  },
  {
    title: "Path of Teth (Nine Sefirot)",
    description: "Connects Yesod (9) to Malkhut (10)",
    start: 8,
    end: 9,
    letter: "ט", // Teth
    index: 9,
  },
  {
    title: "Path of Yud (Ten Sefirot)",
    description: "Connects Keter (1) to Malkhut (10)",
    start: 0,
    end: 9,
    letter: "י", // Yud
    index: 10,
  },
  {
    title: "Path of Kaf (12 Constellations)",
    description: "Connects Malkhut (10) to Yesod (9)",
    start: 9,
    end: 8,
    letter: "כ", // Kaf
    index: 11,
  },
  {
    title: "Path of Lamed (13 Attributes)",
    description: "Connects Yesod (9) to Tiferet (6)",
    start: 8,
    end: 5,
    letter: "ל", // Lamed
    index: 12,
  },
  {
    title: "Path of Mem (14 Aspects)",
    description: "Connects Tiferet (6) to Gevurah (5)",
    start: 5,
    end: 4,
    letter: "מ", // Mem
    index: 13,
  },
  {
    title: "Path of Nun (15 Aspects)",
    description: "Connects Gevurah (5) to Chesed (4)",
    start: 4,
    end: 3,
    letter: "נ", // Nun
    index: 14,
  },
  {
    title: "Path of Samech (16 Aspects)",
    description: "Connects Chesed (4) to Binah (3)",
    start: 3,
    end: 2,
    letter: "ס", // Samech
    index: 15,
  },
  {
    title: "Path of Ayin (17 Aspects)",
    description: "Connects Binah (3) to Chokhmah (2)",
    start: 2,
    end: 1,
    letter: "ע", // Ayin
    index: 16,
  },
  {
    title: "Path of Pe (18 Aspects)",
    description: "Connects Chokhmah (2) to Keter (1)",
    start: 1,
    end: 0,
    letter: "פ", // Pe
    index: 17,
  },
  {
    title: "Path of Tzaddi (19 Aspects)",
    description: "Connects Keter (1) to Malkhut (10)",
    start: 0,
    end: 9,
    letter: "צ", // Tzaddi
    index: 18,
  },
  {
    title: "Path of Qoph (Rational vs. Instinct)",
    description: "Connects Malkhut (10) to Yesod (9)",
    start: 9,
    end: 8,
    letter: "ק", // Qoph
    index: 19,
  },
  {
    title: "Path of Resh (20 Aspects)",
    description: "Connects Yesod (9) to Hod (8)",
    start: 8,
    end: 7,
    letter: "ר", // Resh
    index: 20,
  },
  {
    title: "Path of Shin (21 Aspects)",
    description: "Connects Hod (8) to Netzach (7)",
    start: 7,
    end: 6,
    letter: "ש", // Shin
    index: 21,
  },
  {
    title: "Path of Tav (22 Letters)",
    description: "Connects Netzach (7) to Tiferet (6)",
    start: 6,
    end: 5,
    letter: "ת", // Tav
    index: 22,
  },
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
      <View style={styles.svgContainer}>
        <Svg height="100%" width="100%" style={styles.svg}>
          {/* Render lines only when no circle is zoomed */}
          {zoomedCircle === null && pathways.map((path, index) => {
            console.log(index, path)
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
                x1={startX + RADIUS}  // Adjust to start from center of circle
                y1={startY + RADIUS}  // Adjust to start from center of circle
                x2={endX + RADIUS}    // Adjust to end at center of circle
                y2={endY + RADIUS}    // Adjust to end at center of circle
                stroke="black"
                strokeWidth="2"
              />
            );
          })}
        </Svg>
        {renderCircles()}
      </View>

      {zoomedCircle === null ? null : (
        <View style={styles.zoomedContainer}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {zoomText.map((text, index) => (
              <Text key={index} style={styles.zoomedText}>{text}</Text>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => setZoomedCircle(null)} style={styles.backButton}>
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
  },
  svgContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
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
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS,
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
    padding: RADIUS / 2,
    zIndex: 3,
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
  backButton: {
    zIndex: 4,
    padding: 10,
    borderRadius: 5,
  },
  backText: {
    fontSize: 16,
    alignItems: 'center',
    color: 'white',
  },
});

export default App;
