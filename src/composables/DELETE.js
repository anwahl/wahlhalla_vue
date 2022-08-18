import auth0 from "@/composables/auth0Client";
import axios from "axios";
import { useRouter } from 'vue-router';

export default async function DELETE (url) {
  const accessToken = (import.meta.env.VITE_ENV === "production" ? await auth0.getTokenSilently() : null);
  const router = useRouter();
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
    console.log(data);
    })
  .catch(error => {
    console.log(error.message);
    router.push({ name: 'error', params: { error }  })
  });
      
  return data;
}