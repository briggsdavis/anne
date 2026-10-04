import GalleryClient from "@/components/gallery/gallery-client"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function GalleryPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const category = searchParams.category
  const gender = searchParams.gender
  const query = searchParams.q

  // Handle parameters - ensure they're strings
  const initialCategory = Array.isArray(category) ? category[0] : category
  const initialGender = Array.isArray(gender) ? gender[0] : gender
  const initialSearch = Array.isArray(query) ? query[0] : query

  return (
    <GalleryClient
      initialCategory={initialCategory}
      initialGender={initialGender}
      initialSearch={initialSearch}
    />
  )
}
