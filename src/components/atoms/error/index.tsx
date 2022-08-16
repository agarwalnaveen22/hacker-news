import React from 'react';
import {View} from 'react-native';
import Label from '../label';

type Props = {
  errorMessage: string;
};

const Error = ({errorMessage}: Props) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Label text={errorMessage} color="text-rose-500" textSize="text-base" />
    </View>
  );
};

export default Error;
