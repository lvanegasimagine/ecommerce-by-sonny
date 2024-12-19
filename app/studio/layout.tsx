import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function StudioLayout({ children }: LayoutProps) {
    return (
        <html lang='en'>
            <body>
                {children}
            </body>
        </html>
    );
}
