import auth0 from "@/composables/auth0Client";
import { useRouter } from 'vue-router';
import axios from "axios";

export default async function PUT (url, body) {
  const router = useRouter();
  const accessToken = (import.meta.env.VITE_ENV === "production" ? await auth0.getTokenSilently() : null);
  let data;
  await axios(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
        method: 'PUT',
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
        router.push({ name: 'error', params: { error }  })
      });
          
      return data;
}