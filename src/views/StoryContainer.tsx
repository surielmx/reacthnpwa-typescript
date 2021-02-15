import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import StoryList from '../components/StoryList';
import { typeStories, getTotalPages } from '../constants/constants';
import { StoryProps, PaginationProps } from '../typescript/interfaces'
import { validatePage } from '../util/validators';
import { getStoryPage } from '../api/fetchApi';

const initialStoryData: PaginationProps = {
	story: '',
	stories: [],
	page: '',
	totalPages: 0,
}

const StoryContainer = ({ isOffLine, path, params, url }: StoryProps) => {
	const { page: paramsPage } = params;
	const [isValidPage, setValidPage] = useState<boolean>(true);
	const [storyData, setStoryData] = useState(initialStoryData);

	async function setStory(story: string, page: string) {
		const totalPages = getTotalPages[story];
		const stories = await getStoryPage(story, paramsPage);
		const storyData = {
			story,
			stories,
			page: paramsPage,
			totalPages,
		};
		setStoryData(storyData);
	}

	useEffect(() => {
		function validateStoryType() {
			if (!isOffLine) {
				setStoryData(prevState => ({ ...prevState, stories: [] }));

				const [, typeStory]: string[] = path.match(/\/([a-z]*)\//) || [];
				const isValidStory = typeStories.find((story) => story === typeStory);
				const isValidPage = validatePage(Number(paramsPage));

				if (Boolean(isValidStory) && isValidPage) {
					setStory(typeStory, paramsPage);
					return;
				}
				setValidPage(Boolean(isValidStory) && isValidPage);
			}
		}
		validateStoryType();
	}, [isOffLine, paramsPage, path, url]);

	return (
		<>
			{!isValidPage && <h1>Invalid page</h1>}
			{isValidPage ? (
				<>
					<Pagination {...storyData} />
					<StoryList {...storyData} />
				</>
			) : null}
		</>
	);
};

export default StoryContainer;
