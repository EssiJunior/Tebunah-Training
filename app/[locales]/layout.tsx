import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Layout from "@/layouts";

export default async function LocaleLayout({ children }: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Layout>
        {children}
      </Layout>
    </NextIntlClientProvider>
  );
}