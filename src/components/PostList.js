import PostCard from './PostCard';

const PostList = ({ posts, onSelect }) => {
  return (
    <main className="gallery">
      {posts.map((post, index) => (
        <PostCard key={index} post={post} onClick={() => onSelect(post)} />
      ))}
    </main>
  );
};

export default PostList;