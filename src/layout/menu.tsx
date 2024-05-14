/**
 * @todo TUrl for check route is in Project or not
 * @example
 * value = 0 => route insite project
 * value = 1 => route outsite project
 */
export type TUrl = 1 | 0;
export type TTargetLink = '_blank' | '_parent' | '_self' | '_top' | undefined;
export type TMenu = { title: string; url: string; target: TTargetLink; children: { title: string; url: string; type: TUrl; target: TTargetLink }[]; type: TUrl }[];
export const menu: TMenu = [
    {
        title: 'Swap',
        url: '/swap',
        children: [],
        type: 0,
        target: undefined,
    },
    // {
    //     title: 'Limit',
    //     url: '/limit',
    //     children: [],
    //     type: 0,
    //     target: undefined,
    // },
    // {
    //     title: 'Send',
    //     url: '/send',
    //     children: [],
    //     type: 0,
    //     target: undefined,
    // },
];
