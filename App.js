import * as React from 'react';
import { Provider } from 'mobx-react';
import TodoStore from './ToDo_Folder/TodoStore';
import Home from './ToDo_Folder/Home';


class App extends React.Component {
	render() {
		<Provider todoStore={TodoStore} >
			<Home />
		</Provider>
	}
}