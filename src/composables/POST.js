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
          if (import.meta.env.VITE_ENV != "production")
              console.log(data);
        })
      .catch(error => {
        console.log(error.message);
        data = error.response.data;
      });
          
      return data;
}