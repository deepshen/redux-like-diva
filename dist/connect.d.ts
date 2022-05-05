/// <reference types="react" />
export declare type MapState = (state: any) => object;
declare const _default: (mapStateToProps: MapState, mapDispatch?: {}, effectsArr?: never[]) => (Component: any) => import("react-redux").ConnectedComponent<(props: any) => JSX.Element, Omit<any, never> & import("react-redux").ConnectProps>;
export default _default;
