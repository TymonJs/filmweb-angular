const fetchWithRetries = async (url,retries) => {

    const res = await fetch(url)

    if (!res.ok){
        if (retries<=0) throw new Error("Request failed. Too many retries")
        return fetchWithRetries(url,retries - 1)
    }
    return await res.json()
    
}

fetchWithRetries('https://pokeapi.co/api/v2/pokemona', 3)
  .then(data => console.log(data))
  .catch(error => console.error('Failed to fetch data:', error));
