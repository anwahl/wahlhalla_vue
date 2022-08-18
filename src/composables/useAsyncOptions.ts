import { ref, type Ref } from 'vue';
import { asyncComputed } from '@vueuse/core';
import GET from '@/composables/GET';

export default function useAsyncOptions(optionType: string): {
  evaluating: Ref<boolean>
  asyncOptions: Ref<Array<{}> | undefined>
  apiError: Ref<string>
} {
  const evaluating = ref(false)
  const apiError = ref('')
  const asyncOptions = asyncComputed(
    async () => {
      const options = await GET(optionType);
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