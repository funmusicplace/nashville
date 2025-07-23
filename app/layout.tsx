export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Get us to Nashville</title>
        <meta property="og:title" content="Get us to Nashville" />
        <meta
          property="og:description"
          content="A fundraiser to get to Nashville"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://mirlo.space/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://mirlo.space/favicon-16x16.png"
        ></link>
        <meta name="twitter:card" content="summary"></meta>
        <meta property="og:site_name" content="A Fundraiser on Mirlo"></meta>
        <meta property="og:image" content="public/hero-image.png"></meta>
      </head>
      <body>{children}</body>
    </html>
  );
}
