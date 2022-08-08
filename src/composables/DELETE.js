export default async function DELETE (url, accessToken, body) {
    let returnData;
    const result = await fetch(`http://localhost:8080/api/${url}`, {
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