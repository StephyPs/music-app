export interface SearchState {
    resData: any,
    renderCount: number,
    status: 'initial' | 'loaded' | 'loading' | 'failed';
}