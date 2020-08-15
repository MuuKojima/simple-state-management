
export default {
  /**
   * Fetch me
   */
  async fetchMe(context) {
    let mockMe;
    await new Promise(resolve => setTimeout(() => {
      mockMe = {
        name: 'Bob'
      }
      resolve();
    }, 1000));
    context.commit('users.me', mockMe);
  }
};
