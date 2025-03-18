'use client'
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Ton connect demop</title>
      <body>
<TonConnectUIProvider manifestUrl="https://tan-magnificent-fly-902.mypinata.cloud/ipfs/bafkreihlmxcnl53dd6wh5mk2whps2zxfd4xo3exj6qm3ukg7unoy2hhllm">
{children}

</TonConnectUIProvider>
      </body>
    </html>
  );
}
