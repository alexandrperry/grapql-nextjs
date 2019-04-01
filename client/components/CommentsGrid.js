import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";

const CommentsGrid = ({id, comments}) => {
	return (
		<div>
			<AddCommentForm articleId={id}/>
			<Comments comments={comments}/>
		</div>
	)
}

export default CommentsGrid