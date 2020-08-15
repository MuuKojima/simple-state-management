# Simple State Management

simple state management library for frontend

<img src="https://github.com/MuuKojima/simple-state-manager/blob/develop/art/architecture.png?raw=true" />

## Installation

```
$ npm install --save simple-state-management
```

## Usage

stores/index.js
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

index.js
```
import store from './stores';

...

// Fire dispatch event for api fetching or something
store.dispatch('todos.fetchList');

...

// Subcribe event
this.unsbscribe = store.subscribe('todos', () => {
  this.list = store.getters('todos.list');
  this.render();
});

// Render view
render() {
  console.log('render => ' this.list);
}

...

unmount() {
  this.unsbscribe();
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
