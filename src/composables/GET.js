import auth0 from "@/composables/auth0Client";
import axios from "axios";

export default async function GET (url) {
  const accessToken = (import.meta.env.VITE_ENV === "production" ? await auth0.getTokenSilently() : null);
  let data;
  await axios(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  })
  .then(response => {
    data = response.data;
    console.log(data);
    })
  .catch(error => {
    console.log(error.message);
    data = error.response.data;
  });
      
  return data;
}