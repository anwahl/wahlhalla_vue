
export default async function GET (url, accessToken) {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    })
    const data = await result.json();
    console.log(data);
    return await data ;
  }