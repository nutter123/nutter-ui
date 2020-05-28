import selectTag from './src/select';

/* istanbul ignore next */
selectTag.install = function(Vue) {
  Vue.component(selectTag.name, selectTag);
};

export default selectTag;
