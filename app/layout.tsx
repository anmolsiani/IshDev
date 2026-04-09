import type { Metadata } from 'next';
import { Inter, Outfit, JetBrains_Mono, Oxanium, Playfair_Display, Poppins, VT323 } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import LoadingScreen from '@/components/LoadingScreen';
import ChatWidget from '@/components/ChatWidget';
import { CartProvider, CartSidebar } from '@/components/CartSystem';

const oxanium = Oxanium({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-oxanium',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-heading',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['italic'],
  variable: '--font-serif',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const vt323 = VT323({
  subsets: ['latin'],
  variable: '--font-vt323',
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ishdev. | Digital Marketing Agency',
  description: 'Delhi-based agency building brands, running campaigns, and driving revenue. Growth is not optional.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${oxanium.variable} ${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${poppins.variable} ${vt323.variable}`}>
      <body className="antialiased bg-bg text-white selection:bg-accent selection:text-bg overflow-x-hidden min-h-screen flex flex-col font-poppins">
        <CartProvider>
          <LoadingScreen />
          <SmoothScroll>
            <Navbar />
            <PageTransition>
              <main className="flex-1 w-full relative z-10 pt-[100px]">
                {children}
              </main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
          <ChatWidget />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
