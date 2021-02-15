import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from '../Skeleton';
import { PaginationProps } from '../../typescript/interfaces';

const Pagination = ({ stories, story, page, totalPages }: PaginationProps) => {
    const paginationStyle: CSSProperties = {
        textAlign: 'center',
        margin: '20px auto',
        display: 'table',
    };
    const paginationLinkStyle: CSSProperties = {
        padding: '15px',
        fontWeight: 500,
        color: 'var(--link)',
    };
    const paginationSeparatorStyle: CSSProperties = {
        padding: '0 10px',
        color: 'var(--title)',
    };
    const currentPage = parseInt(page, 10);
    const prevPage = currentPage !== 1 ? currentPage - 1 : currentPage;
    const nextPage = currentPage !== totalPages ? currentPage + 1 : currentPage;

    return (
        <>
            {!story || !page ? (
                <Skeleton variant="text" height="25px" width="25%" center />
            ) :
                <div style={paginationStyle}>
                    {currentPage !== 1 && (
                        <Link
                            id="previous-page"
                            to={`/${story}/${prevPage}`}
                            style={paginationLinkStyle}
                        >
                            &lt; prev
                        </Link>
                    )}
                    <span style={paginationSeparatorStyle}>{`${currentPage}/${totalPages}`}</span>

                    {currentPage !== totalPages && (
                        <Link id="next-page" to={`/${story}/${nextPage}`} style={paginationLinkStyle}>
                            next &gt;
                        </Link>
                    )}
                </div>
            }
        </>
    );
};

export default Pagination;
