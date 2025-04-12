'use client';

import { useState } from 'react';

export default function NewsletterSignup({ 
  title, 
  buttonText, 
  placeholder, 
  endpoint,
  themeStyles
}: { 
  title: string, 
  buttonText: string, 
  placeholder: string, 
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeStyles: any
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setStatus('loading');
      
      // Simulating API call - in a real app, you'd send to your endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate sending to the actual endpoint
      console.log(`Sending subscription to ${endpoint} for email: ${email}`);
      
      // Success simulation
      setStatus('success');
      setMessage('You\'ve been successfully subscribed!');
      setEmail('');
      
      // In a real app:
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) throw new Error('Subscription failed');
      
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Newsletter signup error:', error);
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full p-4 bg-green-50 rounded-xl text-center text-green-800">
        {message}
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-center text-sm sm:text-base font-medium mb-3">{title}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          className={`flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeStyles.newsletterInput}`}
          style={themeStyles.customStyles?.newsletterInput}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-4 py-2.5 rounded-xl font-medium transition-all text-sm ${themeStyles.newsletterButton} ${status === 'loading' ? 'opacity-70' : ''}`}
          style={themeStyles.customStyles?.newsletterButton}
        >
          {status === 'loading' ? 'Subscribing...' : buttonText}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-red-500 text-xs text-center">{message}</p>
      )}
    </div>
  );
}
