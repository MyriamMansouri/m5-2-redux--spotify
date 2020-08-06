import { combineReducers } from "redux";

import auth from "./artists-reducer";
import artists from "./artists-reducer";

export default combineReducers({auth, artists})
