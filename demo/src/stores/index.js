import SimpleStateManagement from '../../../lib';

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
