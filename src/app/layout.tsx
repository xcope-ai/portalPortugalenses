'use client';

import { AuthProvider } from '@/lib/auth';
import { I18nProvider } from '@/lib/i18n';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import '../lib/i18n-config';
import { Chatbot } from '@/components/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </AuthProvider>
        <Chatbot />
      </body>
    </html>
  );
}
