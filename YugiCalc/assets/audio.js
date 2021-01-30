import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

const buttonPress = new Sound(require("YugiCalc/assets/audios/YuGiOhLifePointSoundEffect.mp3"), error => console.log(error));
export const playButtonPress = () => {
  buttonPress.play((success) => buttonPress.reset());
}
