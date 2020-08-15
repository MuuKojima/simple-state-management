# Simple State Management

simple state management library for frontend

<img src="https://github.com/MuuKojima/simple-state-manager/blob/develop/art/architecture.png?raw=true" />

## Installation

```
$ npm install --save simple-state-management
```

## Usage

Demo file stracture
```
├── src
 ├── index.html
 ├── index.js
 └── stores
     ├── index.js
     ├── actions
     │   ├── index.js
     │   ├── todos.js
     ├── getters
     │   ├── index.js
     │   ├── todos.js
     ├── mutations
     │   ├── index.js
     │   ├── todos.js
     └── states
         ├── index.js
         ├── todos.js
```

src/stores/index.js
```
import SimpleStateManagement from 'simple-state-management';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import states from './states';

export default new SimpleStateManagement({
  actions,
  mutations,
  getters,
  states
});
```

src/index.js
```
import store from './stores';

...

// Fire dispatch event for api fetching or something
store.dispatch('todos.fetchList');

...

// Subcribe event
this.unsbscribeTodos = store.subscribe('todos', () => {
  this.list = store.getters('todos.list');
  this.render();
});

// Render view
render() {
  console.log('render => ' this.list);
}
```

## Demo

<img src="https://github.com/MuuKojima/simple-state-manager/blob/develop/art/demo.png?raw=true" />

```
$ cd demo/todos
$ npm install .
$ npm run start
-> localhost:8080 
```

## Real WebService Demo

https://hostile-architecture.org/
