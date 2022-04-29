import { ReactNode } from 'react';
export declare type MapState = (state: any) => object;
declare const _default: (mapState: MapState, mapDispatch?: {}, effectsArr?: never[]) => (Component: ReactNode) => import("react-redux").ConnectedComponent<(props: any) => JSX.Element, Omit<any, never> & import("react-redux").ConnectProps>;
export default _default;
