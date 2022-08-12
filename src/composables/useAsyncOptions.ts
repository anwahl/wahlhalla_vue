import { ref, type Ref } from 'vue';
import { asyncComputed } from '@vueuse/core';
import GET from '@/composables/GET';
import auth0 from "@/composables/auth0Client";

export default function useAsyncOptions(optionType: string): {
  evaluating: Ref<boolean>
  asyncOptions: Ref<Array<{}>>
  apiError: Ref<string>
} {
  const evaluating = ref(false)
  const apiError = ref('')
  const asyncOptions = asyncComputed(
    async () => {
      var accessToken = await auth0.getTokenSilently();
      const options = await GET(optionType, accessToken);
      apiError.value = ''
      return options
    },
    [],
    {
      lazy: true,
      evaluating,
      onError: e => {
        const { message } = e as Error
        apiError.value = message
      },
    }
  )
  return { evaluating, asyncOptions, apiError }
}