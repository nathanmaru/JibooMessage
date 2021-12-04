import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMessages } from '../store/messageSlice';

const style = {
	height: 30,
	border: '1px solid green',
	margin: 6,
	padding: 8,
};

const InfiniteScrolling = (data) => {
	// data from api
	const [state, setState] = useState({ items: data, hasMore: true }); //set up states
	const dispatch = useDispatch();

	const fetchMoreData = () => {
		if (state.items.results.length + 1 >= data.count) {
			setState({ ...state, hasMore: false });
			return;
		}
		// dispatch action
		dispatch(getMessages(state.items.links.next));
		console.log(state.items.results);
		// const fetchedMessages = useSelector(state=> state.messages)
		// setState({
		// 	items: state.items.concat(Array.from({ length: 10 })),
		// });
	};
	console.log(state);
	return (
		<div>
			<InfiniteScroll
				dataLength={state.items.results ? state.items.results.length : 0}
				next={fetchMoreData}
				hasMore={state.hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				{state.items.results &&
					state.items.results.map((i, index) => (
						<div style={style} key={index}>
							div - #{index + 1}
						</div>
					))}
			</InfiniteScroll>
		</div>
	);
};

export default InfiniteScrolling;
