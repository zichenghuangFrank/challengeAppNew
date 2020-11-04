import VueRouter from 'vue-router'
import Beijing from "@/components/Beijing";
import Shanghai from "@/components/Shanghai";
import Homepage from "@/components/Homepage";

var index =new VueRouter({
    routes:[
        {
            path: '/',
            name: 'Homepage',
            component: Homepage,
            meta: { title: "Homepage", keepAlive: true}
        },
        {
            path: '/Beijing',
            name: 'Beijing',
            component: Beijing,
            meta: { title: "Beijing", keepAlive: true}
        },
        {
            path: '/Shanghai',
            name: 'Shanghai',
            component: Shanghai,
            meta: { title: "Shanghai", keepAlive: true}
        }
    ]
})

export default index
