import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import StoryList from '../components/StoryList';
import { typeStories, getTotalPages } from '../constants/constants';
import { StoryProps, PaginationProps } from '../typescript/interfaces'
import { validatePage } from '../util/validators';
import { getStoryPage } from '../api/fetchApi';

function StoryContainer({ isOffLine, path, params, url }: StoryProps) {
	const { page } = params;
	const [isValidPage, setValidPage] = useState<boolean>(true);
	const [storyData, setStoryData] = useState<PaginationProps>({
		story: '',
		stories: [],
		page: '',
		totalPages: 0,
	});

	useEffect(() => {
		function validateStoryType() {
			if (!isOffLine) {
				setStoryData(prevState => ({ ...prevState, stories: [] }));

				const [, typeStory]: string[] = path.match(/\/([a-z]*)\//) || [];
				const isValidStory = typeStories.find((story) => story === typeStory);
				const isValidPage = validatePage(Number(page));

				if (Boolean(isValidStory) && isValidPage) {
					setStory(typeStory);
				}
				setValidPage(Boolean(isValidStory) && isValidPage);
			}
		}
		validateStoryType();
	}, [isOffLine, page, path, url]);


	async function setStory(story: string) {
		const totalPages = getTotalPages[story];
		const stories = await getStoryPage(story, page);
		setStoryData({
			story,
			stories,
			page,
			totalPages,
		});
	}

	return (
		<>
			{isValidPage ? (
				<>
					<Pagination {...storyData} />
					<StoryList {...storyData} />
				</>
			) : <h1 style={{ color: 'var(--content)', margin: '15px' }}>Invalid page</h1>}
		</>
	);
};

export default StoryContainer;
