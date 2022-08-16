import axios from 'axios';
import Constants from '../constants';

const getStory = async (id: number) => {
  try {
    const {data: story} = await axios.get(
      `${Constants.API_URL}/item/${id}.json`,
    );
    return story;
  } catch (error) {
    throw 'Error while getting a story.';
  }
};

function setCurrentPage(page: number) {
  const dataLimit = 10;
  const limit = dataLimit * (page + 1);
  const offset = page * dataLimit;
  return {offset, limit};
}

const getStories = async (type: 'top' | 'best' | 'new', currentPage = 0) => {
  try {
    const {data: storyIds} = await axios.get(
      `${Constants.API_URL}/${type}stories.json`,
    );
    const {offset, limit} = setCurrentPage(currentPage);
    const stories = await Promise.all(
      storyIds.slice(offset, limit).map(getStory),
    );
    const result = {
      data: stories,
      count: storyIds.length,
      next: currentPage + 1,
    };
    return result;
  } catch (error) {
    throw 'Error while getting list of stories.';
  }
};

export const getComments = async ({queryKey}: any) => {
  const [_, commentIds] = queryKey;
  try {
    return await Promise.all(commentIds.map(getStory));
  } catch (error) {
    throw 'Error while getting list of comments.';
  }
};

export const getTopStories = async ({pageParam = 0}) => {
  return await getStories('top', pageParam);
};

export const getBestStories = async ({pageParam = 0}) => {
  return await getStories('best', pageParam);
};

export const getLatestStories = async ({pageParam = 0}) => {
  return await getStories('new', pageParam);
};
