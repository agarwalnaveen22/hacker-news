import React from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  onChangeText: (text: string) => void;
};

const Search = ({onChangeText}: Props) => {
  return (
    <View className="border rounded flex-row items-center px-2 border-orange-600">
      <Icon name="search" />
      <TextInput className="ml-2 flex-1" onChangeText={onChangeText} />
    </View>
  );
};

export default Search;
