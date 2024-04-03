import axios from 'axios';
import { QueryClient } from  'react-query';

const BaseURL = 'https://server-app-lime.vercel.app/'
const Server = axios.create({
    baseURL: BaseURL
})

const IMAGE_CONFIG = {
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}

const MULTI_PART_CONFIG = {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
}

const APIClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
})

export { Server, IMAGE_CONFIG, APIClient, MULTI_PART_CONFIG }