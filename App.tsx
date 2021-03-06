import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
36


import AppStack from './src/routes/AppStack'

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_700Bold, Archivo_400Regular, 
    Poppins_600SemiBold, Poppins_400Regular
  })

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
      
    );
  }
}

