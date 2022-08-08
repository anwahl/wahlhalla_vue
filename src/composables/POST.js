
export default async function POST (url, accessToken, body) {
    let returnData;
    const result = await fetch(`http://localhost:8080/api/${url}`, {
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