# Simple State Management

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/simple-state-management.svg)](https://badge.fury.io/js/simple-state-management)

simple state management library for frontend

<img src="https://github.com/MuuKojima/simple-state-manager/blob/develop/art/architecture.png?raw=true" />

## Installation

```
$ npm install --save simple-state-management
```

## Demo

<img src="https://github.com/MuuKojima/simple-state-manager/blob/develop/art/demo.png?raw=true" />

```
$ cd demo
$ npm install .
$ npm run start
-> localhost:8080
```

## Real WebService Demo

https://hostile-architecture.org/

## Usage

#### Init library

stores.js
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

#### Subscribe in your components

app.js
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

...

// Render view
render() {
  console.log('render => ' this.list);
}

...

unmount() {
  this.unsbscribe();
}

```
