import store from './redux';
import connect from './connect';
export default store;
declare const useModel: () => any;
declare const useDispatch: () => (val: import("./redux").Dispatch) => void;
export { connect, useModel, useDispatch };
