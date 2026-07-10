import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Layout from "@/layouts";
import { JotaiProvider } from "@/providers/JotaiProvider";

export default async function LocaleLayout({ children }: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <JotaiProvider>
        <Layout>
          {children}
        </Layout>
      </JotaiProvider>
    </NextIntlClientProvider>
  );
}