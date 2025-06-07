import { fetchProperties } from "@/utils/request";
import PropertyCard from "./PropertyCard";
import Link from "next/link";

const HomeProperties = async () => {
  // const data = await fetchProperties();
  // const recentProperties = data.properties
  //   .sort(() => Math.random() - Math.random())
  //   .slice(0, 3);

  // Suggested by Gemini2.5 after Vercel deployment failures
  let recentProperties = []; // Initialize as empty array

  try {
    const data = await fetchProperties(); // Call without showFeatured

    // Check if data is an object and has a 'properties' array (expected structure)
    if (
      data &&
      typeof data === "object" &&
      data !== null &&
      Array.isArray(data.properties)
    ) {
      recentProperties = data.properties
        .sort(() => Math.random() - Math.random())
        .slice(0, 3);
    } else if (Array.isArray(data)) {
      // Fallback: if fetchProperties directly returns an array (e.g., from catch or if apiDomain is null)
      recentProperties = data
        .sort(() => Math.random() - Math.random())
        .slice(0, 3);
    }
    // If data is null, undefined, or an unexpected structure, recentProperties remains []
  } catch (error) {
    console.error("Error fetching or processing home properties:", error);
    // recentProperties will remain an empty array, so the page can still render
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
