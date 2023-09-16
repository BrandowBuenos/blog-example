import { useRouter } from "next/router";

export interface Props {
  blogData: BlogProps;
}
interface BlogProps {
  items: [ArticleProps];
}
interface ArticleProps {
  title: string;
  pubDate: string;
  description: string;
  content: string;
  author: string;
  thumbnail: string;
  categories: Array<string>;
}

export default function DetalhesDoPost({ blogData }: Props) {
  const router = useRouter();

  const tituloDoPost = router.query.slug;

  const replaceTitle = tituloDoPost?.toString().replace(/-/g, " ");
  const selectedPost = blogData.items.find(
    (post) => post.title === replaceTitle
  );

  if (!selectedPost) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="max-w-5xl mx-auto">
      <img src={selectedPost.thumbnail} alt={selectedPost.title} />
      <h1> {selectedPost.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: selectedPost.content }}
        className="blog-content"
      />
    </main>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@MediumStaff"
  );
  const blogData = await response.json();

  return {
    props: {
      blogData,
    },
  };
}
