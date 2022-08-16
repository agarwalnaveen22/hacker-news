import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, ScrollView, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {RootStackParamsList} from '../../routes';
import {Error, Header, Label, Spinner} from 'components/atoms';
import {ItemBox, ListItem} from 'components/molecules';
import {StoryData as StoryDataType} from 'components/molecules/list-item';
import {getComments} from 'services/News';

type Props = {
  route: RouteProp<RootStackParamsList, 'Details'>;
  navigation: NativeStackNavigationProp<RootStackParamsList>;
};

const DetailsScene = ({navigation, route}: Props) => {
  const {isLoading, isFetching, isError, error, data} = useQuery(
    ['comments', route.params.data.kids],
    getComments,
  );
  const renderLoading = useCallback(() => {
    return (
      <View className="flex-1 justify-center items-center">
        <Spinner />
      </View>
    );
  }, []);
  const goToDetails = useCallback(
    (storyData: StoryDataType) => {
      navigation.push('Details', {
        data: storyData,
      });
    },
    [navigation],
  );
  const renderListItem: ListRenderItem<StoryDataType> = useCallback(
    ({item}) => {
      return <ListItem data={item} onPress={() => goToDetails(item)} />;
    },
    [goToDetails],
  );
  return (
    <ScrollView className="flex-1">
      <Header title="Details" showBack={true} navigation={navigation} />
      <View className="px-4 py-4">
        <View className="bg-orange-600 px-1 py-1">
          <Label text={'Title'} color="text-white" />
        </View>
        <ItemBox data={route.params.data} />
        <View className="bg-orange-600 px-1 py-1 mt-2">
          <Label text={'Comments'} color="text-white" />
        </View>
        {isLoading || isFetching ? (
          renderLoading()
        ) : isError ? (
          <Error errorMessage={error?.message} />
        ) : (
          <FlatList
            data={data}
            renderItem={renderListItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default DetailsScene;
