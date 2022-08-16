import {StoryData as StoryDataType} from 'components/molecules/list-item';

export const filterList = (text: string, list: Array<StoryDataType>) => {
  return list.filter((obj: StoryDataType) =>
    obj?.title?.toLowerCase().includes(text.toLowerCase()),
  );
};
