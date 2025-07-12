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
>>>>>>> 6fc8a8f7ab463c33afc6dd7b5df1c360f05f7ab1
    },
  });

  return <Homepage data={data.homepage} />;
}
