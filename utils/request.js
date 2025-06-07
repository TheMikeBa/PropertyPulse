// const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// // Fetch all properties
// async function fetchProperties({ showFeatured = false } = {}) {
//   try {
//     // Handle the case where the domain is not available yet
//     if (!apiDomain) {
//       return [];
//     }

//     const res = await fetch(
//       `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }

// // Fetch single property
// async function fetchProperty(id) {
//   try {
//     // Handle the case where the domain is not available yet
//     if (!apiDomain) return null;

//     const response = await fetch(`${apiDomain}/properties/${id}`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch property");
//     }

//     return response.json();
//   } catch (error) {
//     console.log("🌈error🌈", error);
//     return null;
//   }
// }
// export { fetchProperties, fetchProperty };

// Gemini2.5 suggestion after Vercel deployment fails
// ... existing code ...
async function fetchProperties({ showFeatured = false } = {}) {
  try {
    if (!apiDomain) {
      console.log(
        "API domain not available, returning default empty properties structure."
      );
      // For non-featured, expect { properties: [] }
      // For featured, expect []
      return showFeatured ? [] : { properties: [], total: 0 };
    }

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
      { cache: "no-store" } // Consider 'force-cache' or revalidate options for production builds if appropriate
    );

    if (!res.ok) {
      console.error(`Failed to fetch data: ${res.status} ${res.statusText}`);
      // For non-featured, expect { properties: [] }
      // For featured, expect []
      return showFeatured ? [] : { properties: [], total: 0 };
    }

    return res.json();
  } catch (error) {
    console.error("Error in fetchProperties:", error);
    // For non-featured, expect { properties: [] }
    // For featured, expect []
    return showFeatured ? [] : { properties: [], total: 0 };
  }
}

// Fetch single property
async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      console.log(
        "API domain not available, returning null for single property."
      );
      return null;
    }

    const response = await fetch(`${apiDomain}/properties/${id}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch property ${id}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(`Error in fetchProperty for id ${id}:`, error);
    return null;
  }
}
export { fetchProperties, fetchProperty };
