import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import {StoryData} from '../list-item';
import {Label} from 'components/atoms';

type Props = {
  data: StoryData;
};

const ItemBox = ({data}: Props) => {
  const {width} = useWindowDimensions();
  return data.type === 'story' ? (
    <>
      <Label text={data.title} textSize="text-sm" color="text-orange-600" />
      <View className="items-end">
        <Label
          text={`${data.score} points by ${data.by} | ${moment(
            data.time,
          ).fromNow()} ${
            data?.kids ? '| ' + data?.kids?.length + ' comments' : ''
          }`}
          textSize="text-xs"
          paddingTop="pt-2"
        />
      </View>
    </>
  ) : (
    <>
      <RenderHTML contentWidth={width} source={{html: data.text}} />
      <View className="items-end">
        <Label
          text={`created by ${data.by} | ${moment(data.time).fromNow()} ${
            data?.kids ? '| ' + data?.kids?.length + ' child comments' : ''
          }`}
          textSize="text-xs"
          color="text-orange-600"
          paddingTop="pt-2"
        />
      </View>
    </>
  );
};

export default ItemBox;
