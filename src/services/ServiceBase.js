import axios from 'axios';
import * as constants from './constants';

class ServiceBase {

    constructor() {
      this.urls = constants;
      this.setHeaders();
    }

    setHeaders = () => {
        this.headers = {
            "gsec-user-token" : localStorage.getItem("gco_auth_token")
        };
    };

    replacePathParams = (url, pathParams) => {
        url.split("/").forEach(keyUrl => {
           url = this.findAndReplacePathParam(url, keyUrl, pathParams);
        });
        return url;
    };

    findAndReplacePathParam = (url, keyUrl, pathParams) => {
        let urlRemplaced = url;
            Object.keys(pathParams)
            .filter(keyParam => keyUrl === `:${keyParam}`)
            .forEach(keyParam => {
                urlRemplaced = urlRemplaced.replace(keyUrl, pathParams[keyParam]);
             });

        return urlRemplaced;
    };

    getRequest = (params, url) => {
        url = this.replacePathParams(url, params);
        const { headers } = this;
        const serviceData = {
           method: 'GET',
           url: `${url}`,
           headers,
        };
        const response = this.myInvoke(serviceData);
        return this.resolvePromise(response);
    };

    postRequest = async (url, data) => {
        const { headers } = this;
        const serviceData = {
            method: 'POST',
            url,
            headers,
            data
        };
        return await this.myInvoke(serviceData);
    };

    postBinaryRequest = async (url, data) => {
        const { headers } = this;
        const serviceData = {
            method: 'POST',
            url,
            headers,
            data,
            responseType: 'arraybuffer',
        };

        return await this.myInvoke(serviceData); 
    }

    putRequest = async (url, data) => {
        const { headers } = this;
        const serviceData = {
            method: 'PUT',
            url,
            headers,
            data,
        };
        return await this.myInvoke(serviceData);
    };

    myInvoke = (serviceData) => {
        try {
           return axios(serviceData);       
        } catch (error) {
            throw Error(error);
        }
    };

    resolvePromise = (promise) => {
        return new Promise((resolve, reject) => {
            return promise
                .then(() => {
                    resolve(promise)
                })
                .catch(error => {
                    reject(error)
                })
        });
    }
}

export default ServiceBase;
