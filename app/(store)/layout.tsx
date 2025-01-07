import type { Metadata } from 'next';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import { SanityLive } from '@/sanity/lib/live';
import localFont from 'next/font/local';
import { Toaster } from 'react-hot-toast';
import DisableDraftMode from './draft-mode/_component/DisableDraftMode';
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

const poppins = localFont({
  src: '../fonts/Poppins-Regular.ttf',
  variable: '--font-poppins',
  weight: '400',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Ecommerce Website for Shoppers',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing />
            </>
          )}
          <Header />
          <main>{children}</main>
          <SanityLive />
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: '#000000', color: '#ffffff' },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
