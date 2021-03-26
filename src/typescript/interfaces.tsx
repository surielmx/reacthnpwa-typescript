export interface UserProps {
    id: string;
    about?: string;
    created?: string;
    created_time?: number;
    karma?: number;
}
export interface NavigationProps {
    themeMode: string;
    isOffLine?: boolean;
}
export interface PaginationProps {
    story: string;
    stories?: [];
    page?: string | undefined;
    totalPages: number;
}
export interface SkeletonProps {
    height?: string;
    width?: string;
    center?: boolean;
    variant?: string;
    className?: string | undefined;
}
export interface StoryProps {
    isOffLine: boolean;
    path: string;
    params: {
        page?: string | undefined;
        item?: string;
        user?: number | undefined;
    };
    url: string;
}
export interface ToggleButtonProps {
    themeMode: string
}

export interface NodeProps {
    comments?: CommentsProps[];
    comments_count?: number;
    content?: string | 'undefined';
    id?: number | string;
    level?: number;
    time?: number;
    time_ago?: string;
    type?: string;
    url?: string;
    user?: string;
}
export interface CommentsListProps {
    node?: NodeProps,
    children?: NodeProps[],
}
export interface CommentsProps {
    comments: NodeProps[],
}