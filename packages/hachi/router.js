import { matchRoutes } from 'react-router-config';

export default class Router {
    constructor(routes) {
        this.routes = routes;
    }

    async matchComponents(app, pathname) {
        // 组件匹配（包含Loadable组件）
        const components = [];
        const preload = [];
        matchRoutes(this.routes, pathname).map((routers) => {
            const route = routers.route;
            const preloadFun = route.component['preload'];
            if (!preloadFun) {
                components.push(route.component);
            } else {
                preload.push(preloadFun().then(res => {
                    if (res.default) {
                        components.push(res.default);
                    } else {
                        for (let i in res) {
                            if (res.hasOwnProperty(i)) {
                                if (res[i].default.hasOwnProperty('namespace')) {
                                    registerModel(app, res[i]);
                                } else {
                                    components.push(res[i].default);
                                }
                            }
                        }
                    }
                }));
            }
        });
    
        await Promise.all(preload).catch((e) => {
            console.log('matchComponents error:', e);
    
        });
        return components;
    }

    async execute(req, res, parsedUrl) {
        const components = this.matchComponents()
    }
}