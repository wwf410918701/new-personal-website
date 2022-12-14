export const getImageTypeBasedOnFirebaseLink = (imageUrl: string) => {
  if (imageUrl.includes("png")) {
    return "png";
  } else if (imageUrl.includes("jpg")) {
    return "jpg";
  } else if (imageUrl.includes("jpeg")) {
    return "jpeg";
  }
  return null;
};