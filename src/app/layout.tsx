import type { Metadata, Viewport } from 'next';

import { fontSans } from '~/lib/fonts';
import { cn } from '~/lib/utils';
import { Toaster } from '~/components/ui/toaster';
import { ThemeProvider } from '~/components/layouts/theme-provider';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ChatDocs',
    template: `%s - ChatDocs`,
  },
  description: 'Upload documents and ask questions with AI',
  icons: ['/favicon.svg'],
  manifest: '/manifest.json',
  metadataBase: new URL('http://localhost:3000'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ChatDocs',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'ChatDocs',
    title: {
      default: 'ChatDocs',
      template: `%s - ChatDocs`,
    },
    description: 'Upload documents and ask questions with AI',
  },
  twitter: {
    card: 'summary',
    title: {
      default: 'ChatDocs',
      template: `%s - ChatDocs`,
    },
    description: 'Upload documents and ask questions with AI',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('flex min-h-screen flex-col font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
