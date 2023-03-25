// // import { StatusBar } from 'expo-status-bar';
// import { useState, useEffect} from 'react';
// import { StyleSheet, Text, View, Button} from 'react-native';
// import { Camera} from 'expo-camera';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [cameraRef, setCameraRef] = useState(null);
//   const [isPreview, setIsPreview] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status == 'granted');
//     })();
//   }, []);

//   const startCamera = async () => {
//     if (cameraRef) {
//       await cameraRef.resumePreview();
//       setIsPreview(true);
//     }
//   };

//   const stopCamera = async () => {
//     if (cameraRef) {
//       await cameraRef.pausePreview();
//       setIsPreview(false);
//     }
//   };

//   if (hasPermission == null) {
//     return <View />;
//   }
//   if (hasPermission == false) {
//     return <Text>No access to camera
//       </Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {isPreview ? (
//         <Camera
//           style={{ flex: 1 }}
//           type={Camera.Constants.Type.back}
//           ref={(ref) => setCameraRef(ref)}
//         />
//       ) : null}
//       <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//         {!isPreview ? (
//           <Button 
//           title="Start Camera" onPress={() => startCamera()}
//           />
//         ) : (
//           <Button title="Stop Camera" onPress={() => stopCamera()} />
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isPreview, setIsPreview] = useState(false);

  const handleStartPreview = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    setIsPreview(true);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isPreview ? (
        <Camera style={styles.cameraPreview} type={Camera.Constants.Type.front} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Press button below to take a selfie</Text>
          <TouchableOpacity onPress={handleStartPreview} style={styles.captureButton}>
            <Text style={styles.captureButtonText}>Take a selfie</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: '#FF0000',
    borderRadius: 50,
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  captureButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  cameraPreview: {
    flex: 1,
    width: '100%',
  },
});
