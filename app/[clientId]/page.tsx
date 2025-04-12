import { notFound } from 'next/navigation';
import { getClientConfig } from '@/app/lib/getClientConfig';
import LinkTree from '@/app/components/LinkTree';

export default async function ClientPage({ params }: { params: { clientId: string } }) {
  try {
    const param = await params;
    const clientConfig = await getClientConfig(param.clientId);
    
    if (!clientConfig) {
      notFound();
    }
    
    const bgClass = clientConfig.theme === 'dark' 
      ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800' 
      : 'bg-gradient-to-br from-green-50 via-white to-purple-50';
    
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center py-4 px-2 sm:p-8 ${bgClass}`}>
        <LinkTree config={clientConfig} />
      </main>
    );
  } catch (error) {
    console.error("Error loading client config:", error);
    notFound();
  }
}
