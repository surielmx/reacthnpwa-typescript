import { Fragment, useState, useEffect } from 'react';
import Skeleton from '../components/Skeleton';
import { StoryProps, UserProps } from '../typescript/interfaces';
import { isValidObject } from '../util/validators';
import { getStoryUser } from '../api/fetchApi';

const initialUser = {
	id: '',
	about: '',
	created: '',
};

function UserContainer({ isOffLine, params }: StoryProps) {
	const [isValidUser, setValidUser] = useState<boolean>(false);
	const [existUser, setExistUser] = useState<boolean>(false);
	const [userSelected, setUserSelected] = useState<UserProps>(initialUser);

	useEffect(() => {
		async function getUser(userId = 0) {
			const user = await getStoryUser(userId);
			if (!user) {
				setValidUser(Boolean(user));
				setExistUser(Boolean(user));
				setUserSelected(initialUser);
				return;
			}
			const existUser = isValidObject(user);
			setValidUser(existUser);
			setExistUser(existUser);
			setUserSelected(user);
		}
		getUser(params.user);
	}, [params.user]);

	function userMarkup() {
		return { __html: userSelected.about || '' };
	}
	return (
		<Fragment>
			{(!isValidUser && !existUser && !userSelected) ||
			(isValidUser && existUser && !!userSelected) ? (
				<Fragment>
					<div style={{ margin: '30px 15px' }}>
						<p>
							<span style={{ color: 'var(--title)' }}>
								<strong style={{ color: 'var(--link)' }}>${userSelected && userSelected.id}</strong>
								<>{` joined ${userSelected && userSelected.created}`}</>
							</span>
						</p>
						{userSelected ? (
							<p
								style={{ color: 'var(--content)', wordBreak: 'break-all' }}
								dangerouslySetInnerHTML={userMarkup()}
							/>
						) : null}
					</div>
				</Fragment>
			) : (
				<div style={{ margin: '30px 15px' }}>
					<Skeleton variant="text" className="story" height="10px" width="45%" />
					<Skeleton variant="text" className="story" />
				</div>
			)}

			{!isValidUser && !existUser && !userSelected && (
				<h1 style={{ color: 'var(--content)', margin: '15px' }}>Invalid user</h1>
			)}
		</Fragment>
	);
}

export default UserContainer;
