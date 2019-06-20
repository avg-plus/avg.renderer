export interface Transition {
    init(element: any);
    fadeEnter(color: number);
    fadeLeave(color: number);
}