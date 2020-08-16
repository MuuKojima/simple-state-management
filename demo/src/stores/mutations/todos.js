const PUBLISHED_NAME = 'todos';

export default {
  list(context, list) {
    context.states.todos.list = list;
    return PUBLISHED_NAME;
  }
};
