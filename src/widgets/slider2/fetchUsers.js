import axios from 'axios';

export const fetchUsers = async () => {
  const url = 'https://dummyjson.com/users';
  const request = await axios(url);

  return request.data;
};
