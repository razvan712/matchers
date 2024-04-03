import { Server, IMAGE_CONFIG } from './config';

const LoginUser = async (data) => await Server.post('/auth/login', data).then(({ data }) => data);

const RegisterUser = async (data) => await Server.post('/auth/register', data).then(({ data }) => data);

const GetUser = async (username) => await Server.get(`auth/users/${username}`).then(({ data }) => data)

const UploadProfilePicture = async ({ user, file }) => await Server.put(`/auth/upload-profile-picture/${user}`, file, IMAGE_CONFIG).then(({ data }) => data)

const UpdateBio = async ({ userId, bio }) => await Server.put(`/auth/update-bio/${userId}`, {bio}).then(({ data }) => data)

export { LoginUser, RegisterUser, GetUser, UploadProfilePicture, UpdateBio}
