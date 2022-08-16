import React from 'react';
import {Pressable} from 'react-native';
import ItemBox from 'components/molecules/item-box';

export type StoryData = {
  by: string;
  descendants?: number | undefined;
  id: number;
  kids?: Array<number> | undefined;
  score?: number | undefined;
  time: number;
  title?: string | undefined;
  type: 'story' | 'comment';
  url?: string;
  parent?: number | undefined;
  text?: string | undefined;
};

type Props = {
  data: StoryData;
  onPress?: () => void;
  childComments?: StoryData | null;
};

const ListItem = ({data, onPress}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="border border-b-slate-300 rounded px-2 py-2 my-2">
      <ItemBox data={data} />
    </Pressable>
  );
};

export default ListItem;
