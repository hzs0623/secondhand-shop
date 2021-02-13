import store from '@/store';

export function loadingState(state) {
  store.commit('global/setLoading', state);
}

