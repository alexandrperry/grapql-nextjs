import Comment from './Comment'
const Comments = ({comments}) => (
  <div>
    {comments.map(item => (
      <Comment item={item} key={item.id}/>
    ))}
  </div>
)

export default Comments