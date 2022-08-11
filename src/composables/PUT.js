export default async function PUT (url, accessToken, body) {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'PUT',
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