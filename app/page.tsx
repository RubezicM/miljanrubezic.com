import Homepage from "@/components/pages/Homepage";
import { query, getClient } from "@/lib/apollo-client";
import { GET_HOMEPAGE_DATA } from "@/lib/queries";

export const revalidate = 3600;

export default async function Home() {
  const client = getClient();
  const { data } = await client.query({
    query: GET_HOMEPAGE_DATA,
    context: {
      next: { revalidate: 3600 },
    },
  });

  return <Homepage data={data.homepage} />;
}
