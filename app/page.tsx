import Homepage from "@/components/pages/Homepage";
import { query } from "@/lib/apollo-client";
import { GET_HOMEPAGE_DATA } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const { data } = await query({
    query: GET_HOMEPAGE_DATA,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return <Homepage data={data.homepage} />;
}
