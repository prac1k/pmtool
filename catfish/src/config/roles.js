export default {
//role name as a key.
    Admin: {
        routes: [
            {
                component: 'OnlyForHeadOfOperation',
                url: '/only-for-head-of-operation'
            },
            {
                component: 'HeadOfOperationAndManager',
                url: '/hoo-manager'
            },
            {
                component: 'HeadOfOperationManagerAndHeadCashier',
                url: '/hoo-manager-head-cashier'
            }
        ],
    },
    PM: {
        routes: [
            {
                component: 'HeadOfOperationAndManager',
                url: '/hoo-manager'
            },
            {
                component: 'OnlyForManager',
                url: '/manager-only'
            },
            {
                component: 'HeadOfOperationManagerAndHeadCashier',
                url: '/hoo-manager-head-cashier'
            }
        ],
    },
    Sales: {
        routes: [
            {
                component: 'HeadOfOperationManagerAndHeadCashier',
                url: '/hoo-manager-head-cashier'
            }
        ],
    },
    branchLead: {
        routes: [],
    },
    branchMember: {
        routes: [],
    },
    teamLead: {
        routes: [],
    },
    teamMember: {
        routes: [],
    },
    common: {
        routes: [
            {
                component: 'CommonRoute',
                url: '/common-component'
            }
        ]
    }
}
