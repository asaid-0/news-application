import axios from '../helpers/axios';

const UserLogin = (email, password) => {

    return axios.post('/user/login', {
        email,
        password
    })
        .then(res => res.data)
}

const CreateUser = async (name, email, password) => {
    const response = await axios.post('/user/register', {
        name,
        email,
        password
    });
    return response.data;
}

const Subscribe = async (id) => {
    const response = await axios.patch('/sources', { sourceId: id });
    return response.data;
}

const Unsubscribe = async (id) => {
    const response = await axios.delete('/sources', { data: { sourceId: id } });
    return response.data;
}

const GetNews = (page) => {

    return axios.get(`/news/${page}`)
        .then(res => res.data)
}

const GetSources = () => {

    return axios.get('/sources')
        .then(res => res.data)
}


const LogoutUser = () => {

    return axios.get('/logout')
        .then(res => res.data)
}

export {
    UserLogin,
    CreateUser,
    GetNews,
    GetSources,
    Subscribe,
    Unsubscribe,
    LogoutUser
}