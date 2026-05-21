import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-thai",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flowly.co"),
  title: "Flowly | ระบบจัดการธุรกิจ SME เชื่อม LINE พร้อม Dashboard อัจฉริยะ",
  description:
    "Flowly ระบบจัดการธุรกิจ SME สำหรับอู่รถ ร้านแอร์รถยนต์ ร้านซ่อมรถ คลินิก ร้านอาหาร และร้านค้าที่ต้องการจัดการคิว CRM POS รายงาน และเชื่อม LINE ในระบบเดียว",
  keywords: [
    "ระบบจัดการอู่รถ",
    "โปรแกรมร้านแอร์รถยนต์",
    "ระบบจัดการร้านซ่อมรถ",
    "โปรแกรม POS สำหรับ SME",
    "ระบบจัดการธุรกิจ SME",
    "โปรแกรมจัดการคิว",
    "ระบบ CRM สำหรับร้านค้า",
    "ระบบเชื่อม LINE สำหรับธุรกิจ"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Flowly | ลดงานซ้ำ เพิ่มกำไร จัดการธุรกิจได้ในระบบเดียว",
    description:
      "ระบบจัดการธุรกิจยุคใหม่สำหรับ SME ไทย เชื่อม LINE ได้ พร้อม Dashboard อัจฉริยะ",
    url: "https://flowly.co",
    siteName: "Flowly",
    locale: "th_TH",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowly | ระบบจัดการธุรกิจ SME ไทย",
    description:
      "จัดการคิว งาน ลูกค้า POS รายงาน และ LINE Notification ในระบบเดียว"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${notoThai.variable}`}>
      <body>{children}</body>
    </html>
  );
}
