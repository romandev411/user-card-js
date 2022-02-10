const API = './data.json';

function fetchData() {
    return fetch(API)
    .then((response)=> {
        return response.json();
    })
    .then((response)=> {
        return response;
    })
    .catch((error)=> {
        console.error(error + ' fail data');
        return [];
    });
}