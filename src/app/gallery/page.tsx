import GalleryClient from "@/components/gallery/GalleryClient"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function GalleryPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const category = searchParams.category
  const gender = searchParams.gender

  // Handle parameters - ensure they're strings
  const initialCategory = Array.isArray(category) ? category[0] : category
  const initialGender = Array.isArray(gender) ? gender[0] : gender

  return (
    <GalleryClient
      initialCategory={initialCategory}
      initialGender={initialGender}
    />
  )
}
