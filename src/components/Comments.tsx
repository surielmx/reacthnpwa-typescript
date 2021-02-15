import { Fragment } from 'react';
import { CommentsProps, CommentsListProps, NodeProps } from '../typescript/interfaces';
import Skeleton from '../components/Skeleton';

function nodes(comments: NodeProps[]) {
    return (
        <>
            {
                comments.map((comment: any) => (
                    <CommentList
                        key={comment.id}
                        node={comment}
                        children={comment.comments}
                    />

                ))
            }
        </>
    );
};

function CommentList({ node, children }: CommentsListProps) {
    return (
        <>
            <li key={node!.id} style={{ color: 'var(--title)' }}>
                <div style={{ color: 'var(--title)', fontWeight: 600 }}>
                    by
					<span style={{ color: 'var(--link)' }}>
                        <a href={`/user/${node!.user}`}>{` ${node!.user}`}</a>
                    </span>
					| {node!.time_ago}
                </div>
                {node!.content && (
                    <div
                        style={{ wordWrap: 'break-word' }}
                        dangerouslySetInnerHTML={{ __html: node!.content }}
                    />
                )}
                {children && <ul style={{ paddingLeft: '15px' }}>{nodes(children)}</ul>}
            </li>
        </>
    );
}

const Comments = ({ comments }: CommentsProps) => {
    return (
        <div style={{ padding: '0 15px' }}>
            {comments.length !== 0 ? (
                <ul>{nodes(comments)}</ul>
            ) : (
                Array.from(new Array(12)).map((_, index) => (
                    <Fragment key={`skeleton-${index}`}>
                        <Skeleton variant="text" className="story" height="10px" width="25%" />
                        <Skeleton variant="text" className="story" height="8px" width="30%" />
                        <Skeleton variant="text" className="story" />
                    </Fragment>
                ))
            )}
        </div>
    );
};

export default Comments;
