const PUBLISHED_NAME = 'users';

export default {
  me(context, me) {
    context.states.users.me = me;
    return PUBLISHED_NAME;
  }
};
