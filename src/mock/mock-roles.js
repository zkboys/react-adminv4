import roles from './mockdata/roles';

export default {
    'get /mock/role': (config) => {
        const {
            pageSize,
            pageNum,
        } = config.params;


        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, {
                    pageNum,
                    pageSize,
                    total: 888,
                    list: roles,
                }]);
            }, 1000);
        });
    },
};
