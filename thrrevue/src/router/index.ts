import { createRouter, createWebHistory } from "vue-router"
import Home from "@/pages/Home.vue"
import Bio from "@/pages/Bio.vue"


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/Bio",
      name: "Bio",
      component:Bio
    },
    {
      path:"/News",
      name:"News",
      component:() => import("@/pages/News.vue")
    },
     {
      path:"/Projects",
      name:"",
      component:() => import("@/pages/Projects/Projects.vue"),
      children:[
        {
          path:"/Malice Mizer",
          name:"Malice Mizer",
          component:() => import("@/pages/Projects/MALICEMIZER/About.vue"),
        },
        {
          path:"/Mega 8 Ball",
          name:"Mega 8 Ball",
          component:() => import("@/pages/Projects/Mega8Ball/About.vue"),
        },
        {
          path:"/Zigzo",
          name:"Zigzo",
          component:() => import("@/pages/Projects/zigzo/About.vue"),
        },
        {
          path:"/nil",
          name:"nil",
          component:() => import("@/pages/Projects/nil/About.vue"),
        },
        {
          path:"/Indies Denryoku",
          name:"Indies Denryoku",
          component:() => import("@/pages/Projects/IndiesDenryoku/About.vue"),
        },
        {
          path:"/The Black Comet Club Band",
          name:"The Black Comet Club Band",
          component:() => import("@/pages/Projects/TheBlackCometClubBand/About.vue"),
        },
        {
          path:"/TetsuJin",
          name:"TetsuJin",
          component:() => import("@/pages/Projects/TetsuJin/About.vue"),
        },
        {
          path:"/THEJUNEJULYAUGUST",
          name:"THEJUNEJULYAUGUST",
          component:() => import("@/pages/Projects/THEJUNEJULYAUGUST/About.vue"),
        },
        {
          path:"/DISCO VOLANTE",
          name:"DISCO VOLANTE",
          component:() => import("@/pages/Projects/DISCOVOLANTE/About.vue"),
        },
        {
          path:"/Sillys",
          name:"Sillys",
          component:() => import("@/pages/Projects/Sillys/About.vue"),
        },
      ],
    },
     {
      path:"/Discography",
      name:"",
      component:() => import("@/pages/Discography/Discography.vue")
    },
     {
      path:"/TourDates",
      name:"",
      component:() => import("@/pages/TourDates.vue")
    },
     {
      path:"/Links",
      name:"",
      component:() => import("@/pages/Links.vue")
    },
      {
      path:"/About",
      name:"",
      component:() => import("@/pages/About.vue")
    }
  ]
})

export default router