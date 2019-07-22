import Vue from "vue"
import Router from "vue-router"
import Boards from "../components/Boards"
import BoardPage from "../components/BoardPage"
import { authenticationService } from '../services/authentication.service';
import { Role } from '../_helpers/role';
import AdminPage from '../components/AdminPage';
import LoginPage from '../components/LoginPage';
import myTasksPage from '../components/myTasksPage';
import MyBoards from '../components/MyBoards'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Boards",
      component: Boards,
      meta: { authorize: [Role.Admin, Role.User] }
    },
    {
      path: "/boards/:boardId",
      name: "BoardPage",
      component: BoardPage,
      meta: { authorize: [Role.Admin, Role.User] }
    },
    {
      path: "/",
      name: "My Tasks",
      component: myTasksPage,
      meta: { authorize: [Role.Admin, Role.User] }
    },

    {
      path: "/my-boards",
      name: "My Boards",
      component: MyBoards,
      meta: { authorize: [Role.Admin, Role.User] }
    },

    {
      path: '/admin',
      component: AdminPage,
      meta: { authorize: [Role.Admin] }
    },
    {
      path: '/login',
      component: LoginPage
    },

    // otherwise redirect to home
    { path: '/', redirect: '/' }
  ],

});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const {authorize} = to.meta;
  const currentUser = authenticationService.currentUserValue;

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({path: '/login' , query: {returnUrl: to.path}});
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({path: '/'});
    }
  }

  next();
});
export default router
