import { Server, MULTI_PART_CONFIG } from './config';
import axios from 'axios';


const GetPosts = (category) => Server.get(`/posts/${category}`).then(({ data }) => data)

const CreateEvent = (postData, token) =>
  Server.post('/posts', { ...postData }, { ...MULTI_PART_CONFIG, headers: { ...MULTI_PART_CONFIG.headers, authorization: token } })
    .then(({ data }) => data);

const DeletePost = (postId) => Server.delete(`/posts/${postId}`).then(({ data }) => data)

const UpdatePost = (postId, newStatus) => Server.put(`/posts/${postId}`, { status: newStatus }).then(({ data }) => data)

const GoingEvent = ({ username, postId }) => Server.put(`/posts/going/${username}/`, { postId }).then(({ data }) => data)

const GetEventById = async (postId) => await Server.get(`/posts/postid/${postId}`).then(({ data }) => data)

const PutEventComment = async (data) => {
  const { postId, username, comment } = data;
  return await Server.put(`/posts/comment/${postId}`, { username, comment }).then(({ data }) => data);
};

const updatePostTitleAndContent = ({ postId, title, content }) => {
  return Server.put(`/posts/${postId}`, { 
    title, // New title
    content, // New content
  }).then(({ data }) => data);
};






export { GetPosts, CreateEvent, DeletePost, UpdatePost, GoingEvent, GetEventById, PutEventComment, updatePostTitleAndContent }