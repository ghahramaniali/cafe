// Utility function to construct full image URLs from database paths
export const getImageUrl = (
  imagePath: string | null | undefined
): string | null => {
  if (!imagePath) return null;

  const SERVER_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "https://leoncafe.ir/backend";

  // If the path already starts with http/https, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If the path starts with /uploads, prepend the server base URL
  if (imagePath.startsWith("/uploads")) {
    return `${SERVER_BASE_URL}${imagePath}`;
  }

  // If it's a relative path, prepend the server base URL and /uploads
  return `${SERVER_BASE_URL}/uploads/${imagePath}`;
};

// Utility function to get the server base URL
export const getServerBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "https://leoncafe.ir/backend"
  );
};
