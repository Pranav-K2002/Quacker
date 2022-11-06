import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="icon"  sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon"  sizes="16x16" href="/favicon-16x16.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins:wght@400;500;700&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Head>
            <body>
                <Main />
                <NextScript />

            </body>
        </Html>
    )
}