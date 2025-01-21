import client from './streamClient';

export const connectUser = async (userId, userToken) => {
  await client.connectUser(
    {
      id: userId,
      name: 'User Name', // Replace with user's name
      image: 'https://getstream.io/random_png/?id=' + userId, // Replace with user's avatar
    },
    userToken
  );
};
