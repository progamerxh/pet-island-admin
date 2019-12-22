import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

export const apiUrl = `https://petisland.herokuapp.com/api`;

const uploadFile = file => new Promise((resolve, reject) => {
    const token = localStorage.getItem('token')
    let data = new FormData()
    data.append('images', file.rawFile)

    fetch(`${apiUrl}/image`, {
        method: 'POST',
        headers: {
            'x-access-token': token
        },
        body: data
    }).then(res => res.json())
        .then(json => resolve(json))
        .catch(e => reject(e))

});

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // add your own headers here
    const token = localStorage.getItem('token')
    options.headers.set('x-access-token', token);
    return fetchUtils.fetchJson(url, options);
}
const objFilter = (obj, validParams) => {
    var result = {}, key;
    // ---------------^---- as noted by @CMS, 
    //      always declare variables with the "var" keyword

    for (key in obj) {
        if (obj.hasOwnProperty(key) && validParams.includes(key)) {
            result[key] = obj[key];
        }
    }

    return result;
};

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        const query = {
            // sort: JSON.stringify([field, order]),
            offset: (page - 1) * perPage,
            limit: perPage,
            ...params.filter
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.rows.filter(({ status }) => !status || status !== 'Deleted'),
            total: json.count,
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            offSet: (page - 1) * perPage,
            limit: perPage,
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) => {
        const { data } = params;
        const validParams = {
            'tag': ['title', 'description'],
            'pet-category': ['name', 'description', 'image'],
        }
        if (resource === 'pet-category' && data.image) {
            return uploadFile(data.image)
                .then(imageArr =>
                    httpClient(`${apiUrl}/${resource}/${params.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            ...objFilter(data, validParams[resource]),
                            image: imageArr[0].id,
                        }),
                    }).then(({ json }) => ({ data: json }))
                ).catch(e => console.log(e))

        } else {
            return httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(objFilter(data, validParams[resource])),
            }).then(({ json }) => ({ data: json }))
        }
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: async (resource, params) => {
        const { data } = params;
        if (resource === 'pet-category' && data.image) {
            return uploadFile(data.image)
                .then(imageArr =>
                    httpClient(`${apiUrl}/${resource}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            ...data,
                            image: imageArr[0].id,
                        }),
                    }).then(({ json }) => ({
                        data: { ...data, id: json.id },
                    }))
                ).catch(e => console.log(e))

        } else {
            return httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        }
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};