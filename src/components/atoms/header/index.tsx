import React, {useCallback} from 'react';
import {Pressable, View} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamsList} from '../../../routes';
import Label from '../label';

type Props = {
  title: string;
  showBack?: boolean;
  navigation?: NativeStackNavigationProp<RootStackParamsList> | undefined;
};

const iconContainerCSS: string = 'w-8 h-8 justify-center items-center';

const Header = ({title, showBack = true, navigation}: Props) => {
  const goBack = useCallback(() => {
    navigation?.goBack();
  }, [navigation]);
  return (
    <View className="flex-row justify-between items-center bg-orange-600 border-b-2 border-b-slate-300">
      {showBack ? (
        <Pressable className={iconContainerCSS} onPress={goBack}>
          <Icon name="arrow-left" size={16} color="#FFFFFF" />
        </Pressable>
      ) : (
        <View className={iconContainerCSS} />
      )}
      <Label
        text={title}
        textSize="text-base"
        fontWeight="font-bold"
        color="text-white"
      />
      <View className={iconContainerCSS} />
    </View>
  );
};

export default Header;
