export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      title: 'Title' 
    },
    { 
      name: 'category', 
      type: 'string', 
      title: 'Category',
      options: {
        list: [
          { title: 'Nature', value: 'nature' },
          { title: 'People', value: 'people' },
          { title: 'Architecture', value: 'architecture' },
          { title: 'Abstract', value: 'abstract' },
          // add more categories here
        ],
        layout: 'dropdown' // or 'radio' if you want radio buttons
      }
    },
    { 
      name: 'image', 
      type: 'image', 
      title: 'Image', 
      options: { hotspot: true } 
    },
  ],
}
