import React, {useCallback, useState} from 'react';
import {FlatList, View, ListRenderItem} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Error, Header, Spinner} from 'components/atoms';
import {ListItem, Search} from 'components/molecules';
import {StoryData as StoryDataType} from 'components/molecules/list-item';
import {getBestStories, getLatestStories, getTopStories} from 'services/index';
import {RootStackParamsList} from '../../../routes';
import {filterList} from 'services/utils';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
  storyType: 'top' | 'best' | 'latest';
};

const ListStories = ({navigation, storyType}: Props) => {
  const [filteredData, setFilteredData] = useState<Array<StoryDataType>>([]);
  const {
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    data,
  } = useInfiniteQuery(
    [
      storyType === 'top'
        ? 'topStories'
        : storyType === 'best'
        ? 'bestStories'
        : 'latestStories',
    ],
    storyType === 'top'
      ? getTopStories
      : storyType === 'best'
      ? getBestStories
      : getLatestStories,
    {
      getNextPageParam: (lastPage: any) => {
        if (lastPage.next !== null) {
          return lastPage.next;
        }

        return lastPage;
      },
    },
  );
  const increasePage = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);
  const goToDetails = useCallback(
    (storyData: StoryDataType) => {
      navigation.navigate('Details', {
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
  const renderFooter = useCallback(() => {
    return isFetchingNextPage ? <Spinner /> : null;
  }, [isFetchingNextPage]);
  const onSearch = useCallback(
    (text: string) => {
      if (text.length > 0) {
        const result = filterList(
          text,
          data.pages.map(page => page.data).flat(),
        );
        setFilteredData(result);
      } else {
        setFilteredData([]);
      }
    },
    [data],
  );
  return (
    <>
      <Header
        title={`${
          storyType === 'top' ? 'Top' : storyType === 'best' ? 'Best' : 'Latest'
        } News`}
        showBack={false}
      />
      <View className="flex-1 px-4 py-2">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Spinner />
          </View>
        ) : isError ? (
          <Error errorMessage={error?.message} />
        ) : (
          <>
            <Search onChangeText={onSearch} />
            <FlatList
              data={
                filteredData.length > 0
                  ? filteredData
                  : data.pages.map(page => page.data).flat()
              }
              renderItem={renderListItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={filteredData.length <= 0 ? increasePage : null}
              ListFooterComponent={renderFooter}
            />
          </>
        )}
      </View>
    </>
  );
};

export default ListStories;
