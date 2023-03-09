import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';


SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);


export default function App() {
  let [isPlaying, setIsPlaying] = useState(false);
  let [playBackInstance, setPlayBack] = useState(null);

  const handlePlayPauseAsync = async () =>{
    if (isPlaying){
      await playBackInstance.pauseAsync()
    }else{
      const { sound } = await Audio.Sound.createAsync( require('./assets/music/ukulele.mp3'));
      setPlayBack(sound);
      await sound.playAsync();
    }

    setIsPlaying(!isPlaying);
  }

  useEffect(() =>  {
    async function setAudio(){
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playThroughEarpieceAndroid: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      });
    }
    setAudio();
    
  }, [0]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Aloha Music</Text>
      <Image style={styles.image} source={require('./assets/ukulele.png')}></Image>
      <TouchableOpacity onPress={handlePlayPauseAsync}>
        {isPlaying ?
          <Feather name="pause" size={32} color="#563822"/>:
          <Feather name="play" size={32} color="#563822"/>
        }
        
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heading: {
    width: 300,
    fontSize: 35,
    color: '#563822',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: "#da9547",
  },

  image: {
    height: 500,
    width: 300,
    margin: 40,
  }
});
