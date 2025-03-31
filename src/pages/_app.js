import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider } from '@/context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/login' && router.pathname !== '/register') {
      router.push('/login');
    }
  }, [router.pathname]);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
