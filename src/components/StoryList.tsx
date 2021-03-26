import { CSSProperties, Fragment, memo } from 'react';
import { Link } from 'react-router-dom';
import { PaginationProps } from '../typescript/interfaces';
import Skeleton from '../components/Skeleton';

function StoryList({ stories = [], page = '1' }: PaginationProps) {
    const storyStyle: CSSProperties = {
        marginBottom: 20,
        display: 'flex',
        alignItems: 'baseline',
    };
    const storyNumberStyle: CSSProperties = {
        marginRight: 15,
        color: 'var(--title)',
    };
    const storyTitle: CSSProperties = {
        display: 'block',
        fontSize: '1.25rem',
        marginBottom: 5,
        color: 'var(--title)',
        textDecoration: 'none',
    };
    const storyDetail: CSSProperties = {
        fontSize: '0.875rem',
    };
    const storyLink: CSSProperties = {
        fontSize: '0.875rem',
        fontWeight: 600,
    };
    const storyContent: CSSProperties = {
        color: 'var(--content)',
    };

    return (
        <Fragment>
            <ul
                style={{
                    padding: '0 15px',
                }}
            >
                {(stories.length === 0 ? Array.from(new Array(8)) : stories).map((story, index) => {
                    const currentPage = Number(page);
                    const storyNumber =
                        currentPage !== 1 ? currentPage * 30 - 30 + index + 1 : index + 1;

                    return (
                        <Fragment key={(story && story.id) || index}>
                            {story ? (
                                <li style={storyStyle} key={story.id}>
                                    <span style={storyNumberStyle}>{storyNumber}</span>
                                    <div style={storyDetail}>
                                        <a
                                            href={story.url}
                                            aria-label="Story url"
                                            style={storyTitle}
                                        >
                                            {story.title}
                                        </a>
                                        <div className="story-details">
                                            <span style={storyContent}>{`${story.points || 0
                                                } points`}</span>
                                            {story.user && <span style={storyContent}> | by </span>}
                                            {story.user && (
                                                <Link
                                                    style={{
                                                        ...storyLink,
                                                        color: 'var(--link)',
                                                    }}
                                                    aria-label="Story author"
                                                    to={`/user/${story.user}`}
                                                >
                                                    {story.user}
                                                </Link>
                                            )}
                                            <span
                                                style={storyContent}
                                            >{` | ${story.time_ago} | `}</span>
                                            <Link
                                                style={{
                                                    ...storyLink,
                                                    color: 'var(--link)',
                                                }}
                                                aria-label="Story comments"
                                                to={`/item/${story.id}`}
                                            >
                                                {story.comments_count} comments
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <>
                                    <Skeleton variant="text" className="story" />
                                    <Skeleton
                                        variant="text"
                                        className="story"
                                        height="8px"
                                        width="75%"
                                    />
                                </>
                            )}
                        </Fragment>
                    );
                })}
            </ul>
        </Fragment>
    );
};

export default memo(StoryList);
