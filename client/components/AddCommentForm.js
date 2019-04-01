import {useState} from 'react'
import {Mutation} from 'react-apollo'
import gql from "graphql-tag"
import { POST_QUERY } from './Post';

const ADD_COMMENT_MUTATION = gql`
	mutation ADD_COMMENT_MUTATION($articleId: ID! $body: String!){
			addComment(articleId: $articleId body: $body){
				body		
			}
	}
`

const AddCommentForm = ({articleId}) => {
	const [body, setBody] = useState('')
	return (
		<Mutation
			mutation={ADD_COMMENT_MUTATION}
			variables={{
				body,
				articleId
			}}
			refetchQueries={[{ query: POST_QUERY, variables: {id: articleId} }]}
		>
			{(addComment,{data, loading, error}) => (
				<form
					action="post"
					onSubmit={async (event) => {
						event.preventDefault()
						const res = await addComment()
						if (res) setBody('')
					}}
				>
					<textarea
						value={body}
						onChange={(event => setBody(event.target.value))}
					/>
					<button type='submit'>
						Add comment
					</button>
				</form>
			)}
		</Mutation>

	)
 }

 export default AddCommentForm