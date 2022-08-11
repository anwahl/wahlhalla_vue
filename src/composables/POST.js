
export default async function POST (url, accessToken, body) {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify(body)
    })
    const data = await result.json();
    console.log(data);
    return await data ;
  }