/**
 * CoinKart
 * https://github.com/facebook/react-native
 *
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TailwindProvider} from 'tailwindcss-react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Routes from './src/routes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </TailwindProvider>
    </QueryClientProvider>
  );
};

export default App;
