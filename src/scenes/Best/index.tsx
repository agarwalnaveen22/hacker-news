import React from 'react';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../../routes';
import {ListStories} from 'components/organisms';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
};

const BestScene = ({navigation}: Props) => {
  return <ListStories navigation={navigation} storyType="best" />;
};

export default BestScene;
