import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getAbout } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;
  const about = await getAbout();

  return (
    <>
      <Header locale={locale} about={about} />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer locale={locale} about={about} />
    </>
  );
}
