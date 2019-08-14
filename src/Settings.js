const Settings = {
    URL_PROTOCOL: process.env.REACT_APP_URL_PROTOCOL,
    URL_DOMAIN: process.env.REACT_APP_URL_DOMAIN,
    URL_PORT: process.env.REACT_APP_URL_PORT !== '' ? process.env.REACT_APP_URL_PORT : '',
    URL_PROJECT_NAME: process.env.REACT_APP_PROJECT_NAME !== '' ? process.env.REACT_APP_PROJECT_NAME : ''
};
  
Settings.URL_WEBAPI = 'https://gestion-programas-uco.herokuapp.com';


export default Settings;
