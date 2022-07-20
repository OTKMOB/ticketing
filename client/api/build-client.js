import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://www.otkmob-ticketing-app.shop',
      headers: req.headers
    });
  } else {
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;
