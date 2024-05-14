import React, {useEffect, useRef} from 'react';

import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {Platform, View} from 'react-native';
import {
  requestCameraAndAudioPermission,
  requestCameraAndAudioPermissionIOS,
} from './src/helpers/utils';

function App(): React.JSX.Element {
  const camera = useRef<Camera>(null);
  const device: any = useCameraDevice('front');

  const format = useCameraFormat(device, [
    {photoResolution: {width: 1280, height: 720}},
  ]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraAndAudioPermission();
    } else if (Platform.OS === 'ios') {
      requestCameraAndAudioPermissionIOS();
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        frameProcessor={frameProcessor}
        format={format}
        style={{flex: 1}}
        pixelFormat="rgb"
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />
    </View>
  );
}

export default App;
