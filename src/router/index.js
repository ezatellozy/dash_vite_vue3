import { createWebHistory, createRouter } from 'vue-router'
import createStore from 'vuex'
import { computed } from 'vue'

const store = createStore

// ============================== Start Views ==============================
import Home from '../views/Home.vue' // Home

// // ********** Children
// import HomePage from '../views/children/HomePage.vue'

// // ========== Start HomePage ==========

// // ========== Start Products ==========
// import ProductHome from '../views/children/products/Home.vue'
// // Show All
// import AllProduct from '../views/children/products/ShowAll.vue'
// // Add
// import AddProduct from '../views/children/products/Add.vue'
// // Edit
// import EditProduct from '../views/children/products/Edit.vue'
// // Show Product
// import ShowProduct from '../views/children/products/Show.vue'
// // ========== End Products ==========

// // ========== Start Orders ==========
// import OrdersHome from '../views/children/Orders/Home.vue'
// // All Orders
// import Orders from '../views/children/Orders/ShowAll.vue'
// // Single Order
// import ShowOrder from '../views/children/Orders/Show.vue'
// // ========== End Orders ==========

// // **** Start Categories
// import CategoriesHome from '../views/children/Categories/Home.vue'
// // Show All
// import AllCategories from '../views/children/Categories/ShowAll.vue'

// // Add
// import AddCategory from '../views/children/Categories/Add.vue'
// // Edit
// import EditCategory from '../views/children/Categories/Edit.vue'
// // **** End Categories

// // ========== Start Sizes ==========
// import SizesHome from '../views/children/Sizes/Home.vue'
// // Show All
// import AllSizes from '../views/children/Sizes/ShowAll.vue'
// // Add
// import AddSize from '../views/children/Sizes/Add.vue'
// // Edit
// import EditSize from '../views/children/Sizes/Edit.vue'
// // ========== End Sizes ==========

// // ========== Start Feature ==========
// import FeaturesHome from '../views/children/Features/Home.vue'
// // Show All
// import AllFeatures from '../views/children/Features/ShowAll.vue'
// // Add
// import AddFeature from '../views/children/Features/Add.vue'
// // Edit
// import EditFeature from '../views/children/Features/Edit.vue'
// // ========== End Features ==========
// // ========== Start Colors ==========
// import ColorsHome from '../views/children/Colors/Home.vue'
// // Show All
// import AllColors from '../views/children/Colors/ShowAll.vue'
// // Add
// import AddColor from '../views/children/Colors/Add.vue'
// // Edit
// import EditColor from '../views/children/Colors/Edit.vue'
// // ========== End Colors ==========

// // ========== Start Users ==========

// import UsersHome from '../views/children/Users/Home.vue'
// import AllUserss from '../views/children/Users/ShowAll.vue'
// import AddUsers from '../views/children/Users/Add.vue'
// import EditUsers from '../views/children/Users/Edit.vue'
// import UserShowHome from '../views/children/Users/UserProfile/AdminShowHome.vue'

// // ========== end Users ==========

// // ========== Start Countries ==========
// import CountriesHome from '../views/children/Countries/Home.vue'
// // Show All
// import AllCountries from '../views/children/Countries/ShowAll.vue'
// // Add
// import AddCountry from '../views/children/Countries/Add.vue'
// // Edit
// import EditCountry from '../views/children/Countries/Edit.vue'
// // ========== End Countries ==========

// // ========== Start Cities ==========
// import CitiesHome from '../views/children/Cities/Home.vue'
// // Show All
// import AllCities from '../views/children/Cities/ShowAll.vue'
// // Add
// import AddCity from '../views/children/Cities/Add.vue'
// // Edit
// import EditCity from '../views/children/Cities/Edit.vue'
// // ========== End Cities ==========

// // ========== Start profile ==========
// import ProfileHome from '../views/children/Profile/Home.vue'
// import ProfileShow from '../views/children/Profile/AdminShowHome.vue'
// import ProfileEdit from '../views/children/Profile/Edit.vue'
// ********** Auth
import Login from '../views/Auth/Login.vue'

// ********** NotFound
import NotFound from '../views/NotFound.vue'

// ============================== End Views ==============================

// Vuex store
// import store from '../store/index'

const routes = [
  // Main
  {
    path: '/',
    component: Home,
    children: [
      // {
      //   path: '/',
      //   name: 'HomePage',
      //   component: HomePage,
      // },
      // {
      //   path: '/products',
      //   component: ProductHome,
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllProducts',
      //       component: AllProduct,
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddProduct',
      //       component: AddProduct,
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditProduct',
      //       component: EditProduct,
      //       props: true,
      //     },
      //     {
      //       path: 'show/:id',
      //       name: 'ShowProduct',
      //       component: ShowProduct,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== Start Categories ==========
      // {
      //   path: 'categories',
      //   component: CategoriesHome,
      //   children: [
      //     {
      //       path: 'show-all',
      //       name: 'AllCategories',
      //       component: AllCategories,
      //     },
      //     {
      //       path: ':id/sub-category',
      //       name: 'ShowSubCategoris',
      //       component: () =>
      //         import('../views/children/Categories/ShowSubCategoris.vue'),
      //       props: true,
      //     },
      //     // Add
      //     {
      //       path: 'add/:id?',
      //       props: true,
      //       name: 'AddCategory',
      //       component: AddCategory,
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditCategory',
      //       component: EditCategory,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Categories ==========
      // // ========== Start Sizes ==========
      // {
      //   path: '/sizes',
      //   component: SizesHome,
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllSizes',
      //       component: AllSizes,
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddSize',
      //       component: AddSize,
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditSize',
      //       component: EditSize,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Sizes ==========
      // // ========== Start Colors ==========
      // {
      //   path: '/colors',
      //   component: ColorsHome,
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllColors',
      //       component: AllColors,
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddColor',
      //       component: AddColor,
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditColor',
      //       component: EditColor,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Colors ==========
      // // ========== Start Features ==========
      // {
      //   path: '/features',
      //   component: FeaturesHome,
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllFeatures',
      //       component: AllFeatures,
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddFeature',
      //       component: AddFeature,
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditFeature',
      //       component: EditFeature,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Products ==========
      // // ========== Start Orders ==========
      // {
      //   path: '/Orders',
      //   component: OrdersHome,
      //   children: [
      //     // All Orders
      //     {
      //       path: 'all-orders',
      //       name: 'Orders',
      //       component: Orders,
      //     },
      //     {
      //       path: 'show/:id',
      //       name: 'ShowOrder',
      //       component: ShowOrder,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Orders ==========
      // {
      //   path: '/all-inputs',
      //   name: 'all-inputs',
      //   component: () => import('../components/Forms/InputWrapper.vue'),
      // },
      // // ========== Start Users ==========
      // {
      //   path: '/users',
      //   component: UsersHome,
      //   children: [
      //     {
      //       path: 'show-all',
      //       name: 'AllUserss',
      //       component: AllUserss,
      //     },
      //     {
      //       path: 'add',
      //       name: 'AddUsers',
      //       component: AddUsers,
      //     },
      //     {
      //       path: 'edit/:id',
      //       name: 'EditUsers',
      //       component: EditUsers,
      //       props: true,
      //     },
      //     // Show Admin
      //     {
      //       path: 'show/:id',
      //       component: UserShowHome,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Users ==========
      // // ========== Start Providers ==========
      // {
      //   path: '/providers',
      //   component: () => import('../views/children/Providers/Home.vue'),
      //   children: [
      //     {
      //       path: 'show-all',
      //       name: 'AllProviders',
      //       component: () => import('../views/children/Providers/ShowAll.vue'),
      //     },
      //     {
      //       path: 'add',
      //       name: 'AddProvider',
      //       component: () => import('../views/children/Providers/Add.vue'),
      //     },
      //     {
      //       path: 'edit/:id',
      //       name: 'EditProvider',
      //       component: () => import('../views/children/Providers/Edit.vue'),
      //       props: true,
      //     },
      //     // Show Admin
      //     {
      //       path: 'show/:id',
      //       component: () =>
      //         import(
      //           '../views/children/Providers/UserProfile/AdminShowHome.vue'
      //         ),
      //       props: true,
      //       children: [
      //         {
      //           path: '',
      //           name: 'cards',
      //           component: () =>
      //             import(
      //               '../views/children/Providers/UserProfile/children/Cards.vue'
      //             ),
      //         },
      //         {
      //           path: 'data',
      //           component: () =>
      //             import(
      //               '../views/children/Providers/UserProfile/children/PersonalData.vue'
      //             ),
      //         },
      //         {
      //           path: 'store-data',
      //           component: () =>
      //             import(
      //               '../views/children/Providers/UserProfile/children/StoreData.vue'
      //             ),
      //         },
      //       ],
      //     },
      //   ],
      // },
      // // ========== End Providers ==========
      // // ========== Start profile ==========
      // {
      //   path: '/profile',
      //   component: ProfileHome,
      //   children: [
      //     {
      //       path: 'show',
      //       component: ProfileShow,
      //     },
      //     {
      //       path: 'edit',
      //       component: ProfileEdit,
      //     },
      //   ],
      // },
      // // ========== End profile ==========
      // // ========== Start Countries ==========
      // {
      //   path: '/countries',
      //   component: CountriesHome,
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllCountries',
      //       component: AllCountries,
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddCountry',
      //       component: AddCountry,
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditCountry',
      //       component: EditCountry,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Countries ==========
      // // ========== Start Cities ==========
      // {
      //   path: '/cities',
      //   component: CitiesHome,
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllCities',
      //       component: AllCities,
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddCity',
      //       component: AddCity,
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditCitiy',
      //       component: EditCity,
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Cities ==========
      // // ========== Start Regions ==========
      // {
      //   path: '/regions',
      //   component: () => import('../views/children/Regions/Home.vue'),
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllRegions',
      //       component: () => import('../views/children/Regions/ShowAll.vue'),
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddRegion',
      //       component: () => import('../views/children/Regions/Add.vue'),
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditRegion',
      //       component: () => import('../views/children/Regions/Edit.vue'),
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End Regions ==========
      // ========== Start District ==========
      // {
      //   path: '/districts',
      //   component: () => import('../views/children/District/Home.vue'),
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllDistricts',
      //       component: () => import('../views/children/District/ShowAll.vue'),
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddDistrict',
      //       component: () => import('../views/children/District/Add.vue'),
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditDistrict',
      //       component: () => import('../views/children/District/Edit.vue'),
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End District ==========
      // // ========== Start reject-reasons ==========
      // {
      //   path: '/reject-reasons',
      //   component: () => import('../views/children/RejectReasons/Home.vue'),
      //   children: [
      //     // Show All
      //     {
      //       path: 'show-all',
      //       name: 'AllRejectReasonss',
      //       component: () =>
      //         import('../views/children/RejectReasons/ShowAll.vue'),
      //     },
      //     // Add
      //     {
      //       path: 'add',
      //       name: 'AddRejectReasons',
      //       component: () => import('../views/children/RejectReasons/Add.vue'),
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditRejectReasons',
      //       component: () => import('../views/children/RejectReasons/Edit.vue'),
      //       props: true,
      //     },
      //   ],
      // },
      // // ========== End reject-reasons ==========
      // // ========== Start Settings ==========
      // {
      //   alias: '/about',
      //   path: 'about',
      //   component: () => import('../views/children/Settings/About/Home.vue'),
      //   children: [
      //     // Show
      //     {
      //       path: 'show-all',
      //       name: 'aboutShow',
      //       component: () =>
      //         import('../views/children/Settings/About/ShowAll.vue'),
      //     },
      //     {
      //       path: 'add',
      //       name: 'add_about',
      //       component: () => import('../views/children/Settings/About/Add.vue'),
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'edit_about',
      //       component: () =>
      //         import('../views/children/Settings/About/Edit.vue'),
      //       props: true,
      //     },
      //   ],
      // },
      // {
      //   alias: '/terms',
      //   path: 'terms',
      //   component: () => import('../views/children/Settings/Terms/Home.vue'),
      //   children: [
      //     // Show
      //     {
      //       path: 'show-all',
      //       name: 'TermsShow',
      //       component: () =>
      //         import('../views/children/Settings/Terms/ShowAll.vue'),
      //     },
      //     {
      //       path: 'add',
      //       name: 'AddAbout',
      //       component: () => import('../views/children/Settings/Terms/Add.vue'),
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditAbout',
      //       component: () =>
      //         import('../views/children/Settings/Terms/Edit.vue'),
      //       props: true,
      //     },
      //   ],
      // },
      // {
      //   alias: '/policy',
      //   path: 'policy',
      //   component: () => import('../views/children/Settings/Policy/Home.vue'),
      //   children: [
      //     // Show
      //     {
      //       path: 'show-all',
      //       name: 'PolicyShow',
      //       component: () =>
      //         import('../views/children/Settings/Policy/ShowAll.vue'),
      //     },
      //     {
      //       path: 'add',
      //       name: 'AddPolicy',
      //       component: () =>
      //         import('../views/children/Settings/Policy/Add.vue'),
      //     },
      //     // Edit
      //     {
      //       path: 'edit/:id',
      //       name: 'EditPolicy',
      //       component: () =>
      //         import('../views/children/Settings/Policy/Edit.vue'),
      //       props: true,
      //     },
      //   ],
      // },
      // {
      //   path: '/settings/global',
      //   name: 'globalSettings',
      //   component: () => import('../views/children/Settings/Global/index.vue'),
      // },
      // // ========== End Settings ==========
    ],
  },

  // Auth
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  // NotFound
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const TOKEN = computed(() => store.getters['auth_module/currentUser'].token)

// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !isLoggedIn.value) {
//     next('/login')
//   } else if (to.meta.guest && isLoggedIn.value) {
//     next('/')
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, _2, next) => {
//   if (to.name !== 'Login' && !TOKEN.value) {
//     next({ name: 'Login' })
//   } else if (to.name == 'Login' && TOKEN.value) {
//     next('/')
//   } else if (to.name == 'Login' || to.name == 'NotFound') {
//     store.dispatch('sideNav_module/reseatBodyPadding')
//     next()
//   } else {
//     next()
//   }
// })

export default router
