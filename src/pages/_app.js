import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Layout } from "@/components/layout/Layout";
import '@/styles/globals.scss';

axios.defaults.baseURL = "https://www.themealdb.com/api/json/v1/1";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60
    }
  }
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        toastOptions={{
            style: {
              fontSize: '1.5rem',
              color: '#e85d04'
            }   
          }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}
