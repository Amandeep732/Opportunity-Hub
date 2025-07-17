
import "./globals.css";


export const metadata = {
  title: "Opportunity Hub",
  description: "One stop for all college students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
