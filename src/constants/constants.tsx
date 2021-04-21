type TotalPages = {
	[key: string]: number;
};

// export const typeStories: string[] = ['news', 'newest', 'show', 'ask', 'jobs'];
export const typeStories: Array<string> = ['news', 'newest', 'show', 'ask', 'jobs'];
export const getTotalPages: TotalPages = {
	news: 10,
	newest: 12,
	ask: 2,
	show: 2,
	jobs: 1,
};
