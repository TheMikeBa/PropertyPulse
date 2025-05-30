const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
async function fetchProperties() {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) return [];

    const response = await fetch(`${apiDomain}/properties`);

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }

    return response.json();
  } catch (error) {
    console.log("🌈error🌈", error);
    return [];
  }
}

// Fetch single property
async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) return null;

    const response = await fetch(`${apiDomain}/properties/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }

    return response.json();
  } catch (error) {
    console.log("🌈error🌈", error);
    return null;
  }
}
export { fetchProperties, fetchProperty };
