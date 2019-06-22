
import axios from 'axios';
import * as constants from './constants';

class ServiceBase {

    constructor() {
      this.urls = constants;
      this.setHeaders();
    }

    setHeaders = () => {
        this.headers = {
            'Authorization' : localStorage.getItem("Authorization"),
            'Accept': '*/*',
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
            'Content-Type':  'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': 'accept, content-type',
            'Access-Control-Max-Age': '1728000'
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

    deleteRequest = async (url) => {
       
        const { headers } = this;
        const serviceData = {
            method: 'DELETE',
            url,
            headers,
        };
        const response = this.myInvoke(serviceData);
        return this.resolvePromise(response);
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
