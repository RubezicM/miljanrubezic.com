import Homepage from "@/components/pages/Homepage";
import gqlClient from "@/lib/apollo-client";
import { GET_HOMEPAGE_DATA } from "@/lib/queries";

export const revalidate = 3600;

export default async function Home() {
  const { data } = await gqlClient.query({
    query: GET_HOMEPAGE_DATA,
    context: {
      fetchOptions: {
        next: { revalidate: 3600 },
      },
    },
  });

  return <Homepage data={data.homepage} />;
}
