
export default {
  /**
   * Fetch todo list
   */
  async fetchList(context) {
    let mockList;
    await new Promise(resolve => setTimeout(() => {
      mockList = [
        {
          id: 0,
          title: "A Task",
          checked: true
        },
        {
          id: 1,
          title: "B Task",
          checked: false
        },
        {
          id: 2,
          title: "C Task",
          checked: true
        },
      ]
      resolve();
    }, 1000));
    context.commit('todos.list', mockList);
  },

  /**
   * Add todo
   */
  async add(context, payload) {
    const {
      title,
    } = payload;
    const list = context.getters('todos.list').map(item => Object.assign({}, item));
    const item = {
      id: list.length,
      title,
      checked: false
    };
    list.push(item);
    context.commit('todos.list', list);
  },

  /**
   * Toggle todo
   */
  async toggle(context, payload) {
    const {
      id,
      checked
    } = payload;
    const list = context.getters('todos.list');
    const _list = list.map(item => {
      const _item = Object.assign({}, item);
      if (_item.id === id) {
        _item.checked = checked;
      }
      return _item;
    });
    context.commit('todos.list', _list);
  },

  /**
   * Remove todo
   */
  async remove(context, payload) {
    const {
      id,
    } = payload;
    const list = context.getters('todos.list');
    const _list = list.filter(item => item.id !== id)
    context.commit('todos.list', _list);
  }
};
