import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import { HelmetProvider } from 'react-helmet-async'
import AuthProvider from './provider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SkeletonTheme } from 'react-loading-skeleton'
import axios from "axios";
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider } from 'react-photo-view'


axios.defaults.baseURL = "https://blog-website-server-chi.vercel.app";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhotoProvider speed={() => 800}
      easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
      toolbarRender={({ rotate, onRotate }) => {
        return <svg className="PhotoView-Slider__toolbarIcon" onClick={() => onRotate(rotate + 90)} />;
      }}>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <AuthProvider>
              <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </SkeletonTheme>
    </PhotoProvider>
  </StrictMode>,
)
