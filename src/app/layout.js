import "./globals.css";

export const metadata = {
  title: "Connected Cloud TreatMent",
  description: "Easy healthcare cloud solution",
};
export const dynamic = 'force-dynamic';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
