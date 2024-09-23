import { apiRequest } from '@shared/api';
import { Method } from '@shared/api/types';

import { PostsType } from './PostsType';

interface PostsResponse {
  limit: number;
  skip: number;
  total: number;
  posts: PostsType[];
}

export const fetchPosts = async (): Promise<PostsResponse | undefined> => {
  try {
    const url = 'https://dummyjson.com/posts';

    return await apiRequest({ url, method: Method.Get, withThrow: true });
  } catch (error) {
    console.error('Failed to fetch posts:', error);

    return undefined; // Возвращаем undefined в случае ошибки
  }
};
