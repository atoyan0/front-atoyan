import './PostModal.css'

const PostModal = ({ post, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close" onClick={onClose}>✕</button>
         <div className="boxContainerModal" >
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
      </div>
    </div>
  );
};

export default PostModal;
