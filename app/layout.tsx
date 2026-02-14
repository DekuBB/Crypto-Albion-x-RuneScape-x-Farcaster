export const metadata = {
  title: 'Crypto Albion MMO',
  description: 'Onchain MMO Lite Prototype',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
