
export default async function GET (url, accessToken) {
    let returnData;
    const result = await fetch(`http://localhost:8080/api/${url}`, {
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