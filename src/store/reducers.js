import { combineReducers } from 'redux';
import authReducer from './authSlice';
import worksReducer from './workspaceSlice';
import classReducer from './classroomSlice';
import newClassReducer from './newClassroomSlice';
import classMemberReducer from './classroomMemberSlice';
import noteReducer from './noteSlice';
import classResourceReducer from './classResourceSlice';
import messageReducer from './messageSlice';
import worksMemberReducer from './workspaceMemberSlice';
import articleReducer from './articleSlice';
import libraryReducer from './librarySlice';
import fileManagerReducer from './fileManagerSlice';
import institutionReducer from './newInstitutionSlice';
import subscriptionReducer from './subscriptionSlice';

export default combineReducers({
	auth: authReducer,
	works: worksReducer,
	class: classReducer,
	newClass: newClassReducer,
	classMember: classMemberReducer,
	note: noteReducer,
	resource: classResourceReducer,
	message: messageReducer,
	worksMember: worksMemberReducer,
	article: articleReducer,
	library: libraryReducer,
	fileManager: fileManagerReducer,
	institution: institutionReducer,
	subscription: subscriptionReducer,
});
