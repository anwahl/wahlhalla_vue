export default async function DELETE (url, accessToken, body) {
    const result = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      }
    })
    const data = await result.json();
    console.log(data);
    return await data ;
  }