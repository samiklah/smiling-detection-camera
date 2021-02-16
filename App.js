import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
 
export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleFacesDetected = ({ faces }) => {
    const face = faces[0];
      if (face) {
        setPredictions(face.smilingProbability);
      }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.accurate,
        runClassifications: FaceDetector.Constants.Classifications.all,
        minDetectionInterval: 200,
      }}
      />
        
            <View>
            <Text>{predictions}</Text>
            </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
