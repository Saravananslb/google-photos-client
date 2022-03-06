import Cookies from 'universal-cookie';
import axios from 'axios';

export const cookie = new Cookies();
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

export const signUpUser = async(user) => {
    return await axios.post('/auth/signup', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const signInUser = async(user) => {
    return await axios.post('/auth/signin', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const uploadImage = (formData) => {
    return axios.post(`/upload/image`, formData, {
      headers: {
        authorization: cookie.get("Authorization"),
      },
    });
};

export const addPhoto = async(body) => {
    return await axios.post('/photo/new', body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const addAlbum = async(body) => {
    return await axios.post('/photo/add-album', body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const getPhotos = async(type) => {
    return await axios.get(`/photo/get?type=${type}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const updateUserPhoto = async(body) => {
    return await axios.put(`/photo/edit`, body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const updateAlbumPhoto = async(body) => {
    return await axios.put(`/photo/update-album`, body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}