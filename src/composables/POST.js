import auth0 from "@/composables/auth0Client";
import axios from "axios";

export default async function POST (url, body) {
  const accessToken = (import.meta.env.VITE_ENV === "production" ? await auth0.getTokenSilently() : null);
  let data;
  await axios(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        },
        data: JSON.stringify(body)
      })
      .then(response => {
        data = response.data;
        console.log(data);
        })
      .catch(error => {
        console.log(error.message);
      });
          
      return data;
}