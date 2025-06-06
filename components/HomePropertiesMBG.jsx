import { fetchProperties } from "@/utils/request";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const HomeProperties = async () => {
  const data = await fetchProperties();
  const recentProperties = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  // // Suggested by Gemini2.5 after Vercel deployment failures
  // let recentProperties = [];
  // try {
  //   // fetchProperties (for non-featured) should now reliably return an object
  //   // like { properties: [...], total: X } or { properties: [], total: 0 } in case of issues.
  //   const data = await fetchProperties();
  //   if (data && Array.isArray(data.properties)) {
  //     recentProperties = data.properties
  //       .sort(() => Math.random() - Math.random())
  //       .slice(0, 3);
  //   } else {
  //     // This case should ideally not be hit if fetchProperties is robust
  //     console.warn(
  //       "HomeProperties: data.properties was not an array. Data received:",
  //       data
  //     );
  //   }
  // } catch (error) {
  //   // This catch is a fallback for unexpected errors in HomeProperties itself
  //   console.error("Error in HomeProperties component rendering:", error);
  //   // recentProperties remains []
  // }

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties === 0 ? (
              // {recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
