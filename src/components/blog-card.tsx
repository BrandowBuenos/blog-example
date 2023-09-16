export interface ArticleProps {
  title: string;
  pubDate: string;
  description: string;
  content: string;
  author: string;
  thumbnail: string;
  categories: Array<string>;
}

export const BlogCard = ({ posts }: { posts: ArticleProps }) => {
  return (
    <li className="shadow-lg w-96 rounded-xl">
      <img
        src={posts.thumbnail}
        alt={posts.title}
        className="aspect-video w-[100%]"
      />
      <h2 className="p-8">{posts.title}</h2>
    </li>
  );
};
