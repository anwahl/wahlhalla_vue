export default async function PUT (url, accessToken, body) {
    let returnData;
    const result = await fetch(`http://localhost:8080/api/${url}`, {
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