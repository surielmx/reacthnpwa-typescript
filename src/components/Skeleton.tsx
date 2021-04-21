import { CSSProperties } from 'react';
import { SkeletonProps } from '../typescript/interfaces';

function Skeleton({
	height = '38px',
	width = 'inherit',
	center = false,
	variant = 'rect',
	className = undefined,
}: SkeletonProps) {
	const initStyle: CSSProperties = {
		display: 'block',
		background: 'var(--skeleton)',
	};
	const variantText = variant === 'text' && {
		marginTop: '0.8rem',
		borderRadius: '4px',
		marginBottom: '0.8rem',
	};
	const variantCircle = variant === 'circle' && {
		borderRadius: '50%',
	};
	const centerStyle = center && { margin: '0 auto' };
	const widthStyle = width && { width };
	const heightStyle = (height && { height }) || { height: '1rem' };
	const skeletonStyle = {
		...initStyle,
		...heightStyle,
		...widthStyle,
		...centerStyle,
		...variantText,
		...variantCircle,
	};
	return <div className={className} style={{ ...skeletonStyle }}></div>;
}

export default Skeleton;
