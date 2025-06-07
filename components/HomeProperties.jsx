import { fetchProperties } from "@/utils/request";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const HomeProperties = async () => {
  const data = await fetchProperties();

  // const recentProperties = data.properties
  //   .sort(() => Math.random() - Math.random())
  //   .slice(0, 3);

  let recentProperties = [];

  if (data && data.properties && Array.isArray(data.properties)) {
    recentProperties = data.properties
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);
  } else if (Array.isArray(data)) {
    // This case handles if fetchProperties() itself returned an empty array directly
    // due to an error or missing API_DOMAIN, and was meant to return {properties: []}
    // For now, we'll assume an empty array means no properties to show.
    // Or, if the API for non-featured properties was changed to return an array directly.
    recentProperties = data
      .sort(() => Math.random() - Math.random())
      .slice(0, 3);
  }

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties === 0 ? (
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
