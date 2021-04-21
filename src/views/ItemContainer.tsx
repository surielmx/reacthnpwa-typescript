import { Fragment, useState, useEffect } from 'react';
import Comments from '../components/Comments';
import { getStoryItem } from '../api/fetchApi';
import { StoryProps } from '../typescript/interfaces';
import { validateItem, isValidObject } from '../util/validators';

function ItemContainer({ isOffLine, path, params, url }: StoryProps) {
	const { item } = params;
	const [isValidItem, setValidItem] = useState<boolean>(true);
	const [hasComments, setHasComments] = useState<boolean>(true);
	const [comments, setComments] = useState<[]>([]);

	useEffect(() => {
		const isValidItem = validateItem(item);
		if (!isValidItem) {
			setValidItem(isValidItem);
			setHasComments(isValidItem);
			return;
		}
		async function getComments(item = '0') {
			const hasComments = await getStoryItem(item);
			const { comments = [] } = hasComments;

			setValidItem(isValidObject(hasComments));
			setHasComments(comments.length !== 0);
			setComments(comments);
		}
		getComments(item);
	}, [item]);

	return (
		<Fragment>
			{isValidItem && hasComments && (
				<div style={{ margin: '15px 0' }}>
					<Comments comments={comments} />
				</div>
			)}
			{!isValidItem && <h1 style={{ margin: '15px' }}>Invalid comment</h1>}
			{isValidItem && !hasComments && <h1 style={{ margin: '15px' }}>No comments</h1>}
		</Fragment>
	);
}

export default ItemContainer;
