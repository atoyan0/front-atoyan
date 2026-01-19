const PostCard = ({ post, onClick }) => {
  
  return (
    <div className="boxContainer" onClick={onClick}>
      <img src={post.img} alt={post.name} />
      <div className='container'> 
        <p className='tit'>{post.tags}</p>
        <h1>{post.title}</h1>
        <div className='item'> 
          <h5>{post.autor}</h5> 
          <p>{post.date}</p>
          <p>{post.views}</p>
        </div>
        <p>{post.text}</p>
      </div>
    </div>
  );
};

export default PostCard;
