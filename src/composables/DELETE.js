import auth0 from "@/composables/auth0Client";
import axios from "axios";

export default async function DELETE (url) {
  const accessToken = (import.meta.env.VITE_ENV === "production" ? await auth0.getTokenSilently() : null);
  let data;
  await axios(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
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