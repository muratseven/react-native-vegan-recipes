import React, {useEffect, useState} from 'react';
import AppContainer from './src/navigations/AppNavigation';
import AnimatedSplash from 'react-native-animated-splash-screen';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [isLoaded, setIsLoading] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  });

  return (
    // <AnimatedSplash
    //   translucent={true}
    //   isLoaded={isLoaded}
    //   logoImage={require('./assets/splashScreen.png')}
    //   backgroundColor={'#00D683'}
    //   logoHeight={'110%'}
    //   logoWidth={'110%'}>
    <AppContainer />
    // </AnimatedSplash>
  );
}
