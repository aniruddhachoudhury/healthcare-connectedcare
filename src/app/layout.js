import "./globals.css";
import { I18nProvider } from "@/context/i18n-context";

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
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
