import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
const GroupedAvatar = ({ people }) => {
	return (
		<>
			<AvatarGroup max={4}>
				{people.map((val) => (
					<Avatar alt={val.username} src={val.image} />
				))}
			</AvatarGroup>
		</>
	);
};

export default GroupedAvatar;
