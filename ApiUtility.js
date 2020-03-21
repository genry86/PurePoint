let api_url = 'http://www.recipepuppy.com/api/'

export default function loadRecipes(page, query) {
    return new Promise(function(resolve, reject) {
        let fetch_url = `${api_url}?p=${page}&q=${query}`
        fetch(fetch_url)
            .then((response) => response.json())
            .then((responseJson) => responseJson["results"])
            .then((results) => {
                resolve(results)
            })
            .catch((error) => {
                reject(error)
            });
  })
}