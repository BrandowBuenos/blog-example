import { ArticleProps, BlogCard } from "@/components/blog-card";
import Link from "next/link";

export interface CustomProps {
  blogData: BlogProps;
}
interface BlogProps {
  items: ArticleProps[];
}

export default function ListagemDePosts({ blogData }: CustomProps) {
  return (
    <div className="">
      <header></header>
      <main className="max-w-6xl mx-auto py-24">
        <h1 className="text-4xl">Posts</h1>

        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-col-3 gap-16 mt-16">
          {blogData.items.map((post) => (
            <Link
              href="/[slug]"
              as={`/${post.title.replaceAll(" ", "-")}`}
              key={post.title}
            >
              <BlogCard posts={post} />
            </Link>
          ))}
        </ul>
      </main>
      <footer></footer>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@MediumStaff"
  );

  var blogData = [];

  if (response.ok) {
    blogData = await response.json();
  }

  return {
    props: {
      blogData,
    },
  };
}
