import axios from 'axios';
const baseUrl = 'http://localhost:8080/api';

// export const createPost = async post => {
//   return await axios.post(`${baseUrl}/createpost`, {
//     Post: post,
//   });
// };
export const getFeaturedResturants = async () => {
    return await axios.get(`${baseUrl}/featured-restaurants`);
};

export const getCategories = async () => {
    return await axios.get(`${baseUrl}/categories`);
};

  
export const getFeaturedResturantById = async (id) => {
    return await axios.get(`${baseUrl}//featured-restaurants/${id}`);
};

l̥