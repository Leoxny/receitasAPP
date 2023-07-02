
import { MainTab } from './src/routes/MainTab'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import "react-native-gesture-handler"

export default function App() {
  return (
    <NavigationContainer>
      <MainTab />
      <StatusBar style="dark"/>
    </NavigationContainer>
  );
}
