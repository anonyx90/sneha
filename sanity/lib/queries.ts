export const galleryQuery = `*[_type == "galleryImage"]{
  _id,
  title,
  category,
  "imageUrl": image.asset->url
}`
