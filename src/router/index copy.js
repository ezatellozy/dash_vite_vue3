import Vue from 'vue'
import VueRouter from 'vue-router'

// ============================== Start Views ==============================
import Home from '../views/Home.vue' // Home

// ********** Children
import HomePage from '../views/children/HomePage.vue'

// ========== Start HomePage ==========

// ========== Start Users ==========
// Crud
import UsersHome from '../views/children/Users/Home.vue'
import AllUserss from '../views/children/Users/ShowAll.vue'
import AddUsers from '../views/children/Users/Add.vue'
import EditUsers from '../views/children/Users/Edit.vue'
// Profile
import UserShowHome from '../views/children/Users/UserProfile/AdminShowHome.vue'

// ========== Start Countries ==========
import CountriesHome from '../views/children/Countries/Home.vue'
// Show All
import AllCountries from '../views/children/Countries/ShowAll.vue'
// Add
import AddCountry from '../views/children/Countries/Add.vue'
// Edit
import EditCountry from '../views/children/Countries/Edit.vue'
// ========== End Countries ==========

// ========== Start Cities ==========
import CitiesHome from '../views/children/Cities/Home.vue'
// Show All
import AllCities from '../views/children/Cities/ShowAll.vue'
// Add
import AddCity from '../views/children/Cities/Add.vue'
// Edit
import EditCity from '../views/children/Cities/Edit.vue'
// ========== End Cities ==========

// ========== Start Reoprts Reasons ==========
import ReportsHome from '../views/children/ReportReason/Home.vue'
// Show All
import AllReports from '../views/children/ReportReason/ShowAll.vue'
// Add
import AddReports from '../views/children/ReportReason/Add.vue'
// Edit
import EditReports from '../views/children/ReportReason/Edit.vue'
// ========== End Reoprts Reasons ==========

// ========== Start Reoprts ==========
import ApplicationReportsHome from '../views/children/Reports/Home.vue'
// Products Reports
import ProductsReports from '../views/children/Reports/ProductsReports.vue'
// ========== End Reoprts ==========

// ========== Start Notifications ==========
import NotificationsHome from '../views/children/Notifications/Home.vue'
// All Notifications
import Notifications from '../views/children/Notifications/ShowAll.vue'
// Add Notification
import AddNotification from '../views/children/Notifications/Add.vue'
// Single Notification
import ShowNotification from '../views/children/Notifications/Show.vue'
// ========== End Notifications ==========

// ========== Start Slider ==========
import SliderHome from '../views/children/MainSlider/Home.vue'
// Show All
import AllSliders from '../views/children/MainSlider/ShowAll.vue'
// Add
import AddSlider from '../views/children/MainSlider/Add.vue'
// Edit
import EditSlider from '../views/children/MainSlider/Edit.vue'
// ========== End Slider ==========

// ========== Start News ==========
import NewsHome from '../views/children/news/Home.vue'
// Show All
import AllNews from '../views/children/news/ShowAll.vue'
// Add
import AddNews from '../views/children/news/Add.vue'
// Edit
import EditNews from '../views/children/news/Edit.vue'
// Show Product
import ShowNews from '../views/children/news/Show.vue'

// ========== End News ==========

// ========== Start Leagues ==========
import LeagueHome from '../views/children/League/Home.vue'
// Show All
import AllLeague from '../views/children/League/ShowAll.vue'
// Add
import AddLeague from '../views/children/League/Add.vue'
// Edit
import EditLeague from '../views/children/League/Edit.vue'
// Show Product
import ShowLeague from '../views/children/League/Show.vue'
// ========== End Leagues ==========

// ========== Start Champion ==========
import ChampionHome from '../views/children/Champions/Home.vue'
// Show All
import AllChampion from '../views/children/Champions/ShowAll.vue'
// Add
import AddChampion from '../views/children/Champions/Add.vue'
// Edit
import EditChampion from '../views/children/Champions/Edit.vue'
// Show Product
import ShowChampion from '../views/children/Champions/Show.vue'
// ========== End Champion ==========

// ========== Start plans ==========
import PlanHome from '../views/children/plans/Home.vue'
// Show All
import AllPlan from '../views/children/plans/ShowAll.vue'
// Add
import AddPlan from '../views/children/plans/Add.vue'
// Edit
import EditPlan from '../views/children/plans/Edit.vue'
// Show Product
import ShowPlan from '../views/children/plans/Show.vue'
// ========== End plans ==========
// ========== Start teams ==========
import TeamHome from '../views/children/teams/Home.vue'
// Show All
import AllTeam from '../views/children/teams/ShowAll.vue'
// Add
import AddTeam from '../views/children/teams/Add.vue'
// Edit
import EditTeam from '../views/children/teams/Edit.vue'
// Show Product
import ShowTeam from '../views/children/teams/Show.vue'
// ========== End teams ==========

// ========== Start players ==========
import PlayerHome from '../views/children/players/Home.vue'
// Show All
import AllPlayer from '../views/children/players/ShowAll.vue'
// Add
import AddPlayer from '../views/children/players/Add.vue'
// Edit
import EditPlayer from '../views/children/players/Edit.vue'
// Show Product
import ShowPlayer from '../views/children/players/Show.vue'
// ========== End players ==========

// ========== Start seasons ==========
import SeasonHome from '../views/children/seasons/Home.vue'
// Show All
import AllSeason from '../views/children/seasons/ShowAll.vue'
// Add
import AddSeason from '../views/children/seasons/Add.vue'
// Edit
import EditSeason from '../views/children/seasons/Edit.vue'
// Show Product
import ShowSeason from '../views/children/seasons/Show.vue'
// ========== End seasons ==========

// ========== Start rooms ==========
import RoomHome from '../views/children/rooms/Home.vue'
// Show All
import AllRoom from '../views/children/rooms/ShowAll.vue'
// Add

import ShowRoom from '../views/children/rooms/Show.vue'
// ========== End rooms ==========

// ========== Start matchs ==========
import MatchHome from '../views/children/matchs/Home.vue'
// Show All
import AllMatchs from '../views/children/matchs/ShowAll.vue'
// Add
import AddMatch from '../views/children/matchs/Add.vue'
// Edit
import EditMatch from '../views/children/matchs/Edit.vue'
// Show Product
import ShowMatch from '../views/children/matchs/Show.vue'
// ========== End matchs ==========

// ========== Start Admins ==========
// Crud
import AdminHome from '../views/children/Admins/Home.vue'
import AllAdmins from '../views/children/Admins/ShowAll.vue'
import AddAdmin from '../views/children/Admins/Add.vue'
import EditAdmin from '../views/children/Admins/Edit.vue'
// Profile
import AdminShowHome from '../views/children/Admins/AdminProfile/AdminShowHome.vue'
import Cards from '../views/children/Admins/AdminProfile/children/Cards.vue'
import PersonalData from '../views/children/Admins/AdminProfile/children/PersonalData.vue'
// ========== End Admins ==========

// ========== Start Settings ==========
// import SettingsHome from "../views/children/Settings/Home.vue";
import homeSettings from '../views/children/Settings/Home.vue'
import GlobalSettings from '../views/children/Settings/Global/index.vue'

// ABOUT
import AboutHome from '../views/children/Settings/About/index.vue'

// import AboutHome from '../views/children/Settings/About/Home.vue'
// import AboutShow from '../views/children/Settings/About/ShowAll.vue'
// import AddAbout from '../views/children/Settings/About/Add.vue'
// import EditAbout from '../views/children/Settings/About/Edit.vue'

// Terms
import TermsHome from '../views/children/Settings/Terms/index.vue'
// import TermsHome from '../views/children/Settings/Terms/Home.vue'
// import TermsShow from '../views/children/Settings/Terms/ShowAll.vue'
// import AddTerms from '../views/children/Settings/Terms/Add.vue'
// import EditTerms from '../views/children/Settings/Terms/Edit.vue'

// ABOUT
import PolicyHome from '../views/children/Settings/Policy/index.vue'
// import PolicyHome from '../views/children/Settings/Policy/Home.vue'
// import PolicyShow from '../views/children/Settings/Policy/ShowAll.vue'
// import AddPolicy from '../views/children/Settings/Policy/Add.vue'
// import EditPolicy from '../views/children/Settings/Policy/Edit.vue'
// ABOUT
import ContactMessages from '../views/children/Settings/ContactMessages/Home.vue'
import ContactMessagesShow from '../views/children/Settings/ContactMessages/ShowAll.vue'
import ReplayContactMessages from '../views/children/Settings/ContactMessages/Edit.vue'
// ABOUT
import BanubaUsHome from '../views/children/Settings/Banuba/Home.vue'
import BanubaShow from '../views/children/Settings/Banuba/Show.vue'
import EditBanuba from '../views/children/Settings/Banuba/Edit.vue'
// POLICY
import ContactHome from '../views/children/Settings/ContactUs/Home.vue'
import ContactShow from '../views/children/Settings/ContactUs/Show.vue'
import EditContact from '../views/children/Settings/ContactUs/Edit.vue'

import SmsHome from '../views/children/Settings/Sms/Home.vue'
import SmsShow from '../views/children/Settings/Sms/Show.vue'
import EditSms from '../views/children/Settings/Sms/Edit.vue'
// ========== End Settings ==========

// ********** Auth
import Login from '../views/Auth/Login.vue'

// ********** NotFound
import NotFound from '../views/NotFound.vue'

// ============================== End Views ==============================

// Vuex store
import store from '../store/index'
let router = null
window.rootRouter = router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Main
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'HomePage',
          component: HomePage,
        },

        // ========== Start Users ==========
        {
          path: '/users',
          component: UsersHome,
          children: [
            {
              path: '',
              name: 'AllUserss',
              component: AllUserss,
            },
            {
              path: 'add',
              name: 'AddUsers',
              component: AddUsers,
            },
            {
              path: 'edit/:id',
              name: 'EditUsers',
              component: EditUsers,
              props: true,
            },
            // Show Admin
            {
              path: 'show/:id',
              component: UserShowHome,
              props: true,
            },
          ],
        },
        // ========== End Users ==========

        // ========== Start Countries ==========
        {
          path: '/countries',
          component: CountriesHome,
          children: [
            // Show All
            {
              path: '',
              name: 'AllCountries',
              component: AllCountries,
            },
            // Add
            {
              path: 'add',
              name: 'AddCountry',
              component: AddCountry,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditCountry',
              component: EditCountry,
              props: true,
            },
          ],
        },
        // ========== End Countries ==========

        // ========== Start Cities ==========
        {
          path: '/cities',
          component: CitiesHome,
          children: [
            // Show All
            {
              path: '',
              name: 'AllCities',
              component: AllCities,
            },
            // Add
            {
              path: 'add',
              name: 'AddCity',
              component: AddCity,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditCitiy',
              component: EditCity,
              props: true,
            },
          ],
        },
        // ========== End Cities ==========

        // ========== Start Reports Reasons ==========
        {
          path: '/reports-reasons',
          component: ReportsHome,
          children: [
            // Show All
            {
              path: '',
              name: 'AllReports',
              component: AllReports,
            },
            // Add
            {
              path: 'add',
              name: 'AddReports',
              component: AddReports,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditReports',
              component: EditReports,
              props: true,
            },
          ],
        },
        // ========== End Reports Reasons ==========

        // ========== Start Reports ==========
        {
          path: '/reports',
          component: ApplicationReportsHome,
          children: [
            // Products Reports
            {
              path: 'products-reports',
              name: 'ProductsReports',
              component: ProductsReports,
            },
          ],
        },

        // ========== End Reports ==========

        {
          path: '/sliders',
          component: SliderHome,
          children: [
            // All Returns
            {
              path: 'all-sliders',
              name: 'all-sliders',
              component: AllSliders,
            },
            {
              path: 'add',
              name: 'add-slider',
              component: AddSlider,
            },
            {
              path: 'show/:id',
              name: 'show-slider',
              component: EditSlider,
              props: true,
            },
          ],
        },
        // ========== End Rates ==========

        // ========== Start Notifications ==========
        {
          path: '/notifications',
          component: NotificationsHome,
          children: [
            // All Notifications
            {
              path: 'all-notifications',
              name: 'Notifications',
              component: Notifications,
            },
            {
              path: 'add',
              name: 'AddNotification',
              component: AddNotification,
            },
            {
              path: 'show/:id',
              name: 'ShowNotification',
              component: ShowNotification,
              props: true,
            },
          ],
        },
        // ========== End Notifications ==========

        // ========== Start Slider ==========
        {
          path: '/sliders',
          component: SliderHome,
          children: [
            // Show All
            {
              path: '',
              name: 'AllSliders',
              component: AllSliders,
            },
            // Add
            {
              path: 'add',
              name: 'AddSlider',
              component: AddSlider,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditSlider',
              component: EditSlider,
              props: true,
            },
          ],
        },

        // ========== Start News ==========
        {
          path: '/news',
          component: NewsHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllNews',
              component: AllNews,
            },
            // Add
            {
              path: 'add',
              name: 'AddNews',
              component: AddNews,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditNews',
              component: EditNews,
              props: true,
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowNews',
              component: ShowNews,
              props: true,
            },
          ],
        },
        // ========== End News ==========

        // ========== Start League ==========
        {
          path: '/leagues',
          component: LeagueHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllLeagues',
              component: AllLeague,
            },
            // Add
            {
              path: 'add',
              name: 'AddLeague',
              component: AddLeague,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditLeague',
              component: EditLeague,
              props: true,
            },
            // Show
            {
              path: 'show/:id/:slug?/:group_id?',
              name: 'ShowLeague',
              component: ShowLeague,
              props: true,
            },
          ],
        },
        // ========== End League ==========

        // ========== Start Champion ==========
        {
          path: '/champions',
          component: ChampionHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllChampions',
              component: AllChampion,
            },
            // Add
            {
              path: 'add',
              name: 'AddChampion',
              component: AddChampion,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditChampion',
              component: EditChampion,
              props: true,
            },
            // Show
            {
              path: 'show/:id/:slug?/:group_id?',
              name: 'ShowChampion',
              component: ShowChampion,
              props: true,
            },
          ],
        },
        // ========== End Champion ==========

        // ========== Start plans ==========
        {
          path: '/plans',
          component: PlanHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllPlans',
              component: AllPlan,
            },
            // Add
            {
              path: 'add',
              name: 'AddPlan',
              component: AddPlan,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditPlan',
              component: EditPlan,
              props: true,
            },
            // Show
            {
              path: 'show/:id/:slug?/:plan_id?',
              name: 'ShowPlan',
              component: ShowPlan,
              props: true,
            },
          ],
        },
        // ========== End teams ==========
        // ========== Start teams ==========
        {
          path: '/teams',
          component: TeamHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllTeams',
              component: AllTeam,
            },
            // Add
            {
              path: 'add',
              name: 'AddTeam',
              component: AddTeam,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditTeam',
              component: EditTeam,
              props: true,
            },
            {
              path: 'add-player',
              name: 'add-player',
              component: () =>
                import('@/views/children/teams/AddTeamsPlayer.vue'),
              props: true,
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowTeam',
              component: ShowTeam,
              props: true,
            },
          ],
        },
        // ========== End teams ==========

        // ========== Start players ==========
        {
          path: '/players',
          component: PlayerHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllPlayers',
              component: AllPlayer,
            },
            // Add
            {
              path: 'add',
              name: 'AddPlayer',
              component: AddPlayer,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditPlayer',
              component: EditPlayer,
              props: true,
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowPlayer',
              component: ShowPlayer,
              props: true,
            },
          ],
        },
        // ========== End players ==========

        // ========== Start seasons ==========
        {
          path: '/seasons',
          component: SeasonHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllSeasons',
              component: AllSeason,
            },
            // Add
            {
              path: 'add',
              name: 'AddSeason',
              component: AddSeason,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditSeason',
              component: EditSeason,
              props: true,
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowSeason',
              component: ShowSeason,
              props: true,
            },
          ],
        },
        // ========== End Seasons ==========

        // ========== Start matchs ==========
        {
          path: '/matchs',
          component: PlayerHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllMatchs',
              component: AllMatchs,
            },
            // Add
            {
              path: 'add',
              name: 'AddMatch',
              component: AddMatch,
            },
            // Edit
            {
              path: 'edit/:id',
              name: 'EditMatch',
              component: EditMatch,
              props: true,
            },
            // Show
            {
              path: 'show/:id',
              name: 'ShowMatch',
              component: ShowMatch,
              props: true,
            },
            {
              path: 'update-final-result/:id',
              name: 'update-final-result',
              component: () =>
                import('@/views/children/matchs/UpdateFinalResult.vue'),
              props: true,
            },
          ],
        },
        // ========== End matchs ==========

        // ========== Start rooms ==========
        {
          path: '/rooms',
          component: RoomHome,

          children: [
            // Show All
            {
              path: '',
              name: 'AllRooms',
              component: AllRoom,
            },

            // Show
            {
              path: 'show/:id',
              name: 'ShowRoom',
              component: ShowRoom,
              props: true,
            },
          ],
        },
        // ========== End rooms ==========

        // ========== Start Admins ==========
        {
          path: '/admins',
          component: AdminHome,
          children: [
            {
              path: '',
              name: 'AllAdmins',
              component: AllAdmins,
            },
            {
              path: 'add',
              name: 'AddAdmin',
              component: AddAdmin,
            },
            {
              path: 'edit/:id',
              name: 'EditAdmin',
              component: EditAdmin,
              props: true,
            },
            // Show Admin
            {
              path: 'show/:id',
              component: AdminShowHome,
              props: true,
              children: [
                {
                  path: '',
                  name: 'Cards',
                  component: Cards,
                  props: true,
                },
                {
                  path: 'data',
                  name: 'PersonalData',
                  component: PersonalData,
                  props: true,
                },
              ],
            },
          ],
        },
        // ========== End Admins ==========

        // ========== Start Settings ==========
        // {
        //   alias: '/settings/about',
        //   path: 'about',
        //   component: AboutHome,
        //   children: [
        //     // Show
        //     {
        //       path: '',
        //       name: 'aboutShow',
        //       component: AboutShow,
        //     },
        //     {
        //       path: 'add',
        //       name: 'add_about',
        //       component: AddAbout,
        //     },
        //     // Edit
        //     {
        //       path: 'edit/:id',
        //       name: 'edit_about',
        //       component: EditAbout,
        //       props: true,
        //     },
        //   ],
        // },
        // {
        //   alias: '/settings/terms',
        //   path: 'terms',
        //   component: TermsHome,
        //   children: [
        //     // Show
        //     {
        //       path: '',
        //       name: 'TermsShow',
        //       component: TermsShow,
        //     },
        //     {
        //       path: 'add',
        //       name: 'AddAbout',
        //       component: AddTerms,
        //     },
        //     // Edit
        //     {
        //       path: 'edit/:id',
        //       name: 'EditAbout',
        //       component: EditTerms,
        //       props: true,
        //     },
        //   ],
        // },
        // {
        //   alias: '/settings/policy',
        //   path: 'policy',
        //   component: PolicyHome,
        //   children: [
        //     // Show
        //     {
        //       path: '',
        //       name: 'PolicyShow',
        //       component: PolicyShow,
        //     },
        //     {
        //       path: 'add',
        //       name: 'AddPolicy',
        //       component: AddPolicy,
        //     },
        //     // Edit
        //     {
        //       path: 'edit/:id',
        //       name: 'EditPolicy',
        //       component: EditPolicy,
        //       props: true,
        //     },
        //   ],
        // },
        {
          alias: '/settings/contact_messages',
          path: 'ContactMessages',
          component: ContactMessages,
          children: [
            // Show
            {
              path: '',
              name: 'ContactMessagesShow',
              component: ContactMessagesShow,
            },
            // Replay
            {
              path: 'replay/:id',
              name: 'ReplayContactMessages',
              component: ReplayContactMessages,
              props: true,
            },
          ],
        },
        {
          path: 'settings',
          name: 'settings',
          component: homeSettings,
          children: [
            { path: '/', component: GlobalSettings },
            { path: 'about', component: AboutHome },
            { path: 'policy', component: PolicyHome },
            { path: 'terms', component: TermsHome },
          ],
        },

        // TERMS
        {
          path: 'banuba',
          component: BanubaUsHome,
          children: [
            // Show
            {
              path: '',
              name: 'BanubaShow',
              component: BanubaShow,
            },
            // Edit
            {
              path: 'edit',
              name: 'EditBanuba',
              component: EditBanuba,
            },
          ],
        },
        // POLICY
        {
          path: 'contact',
          component: ContactHome,
          children: [
            // Show
            {
              path: '',
              name: 'ContactShow',
              component: ContactShow,
            },
            // Edit
            {
              path: 'edit',
              name: 'EditContact',
              component: EditContact,
            },
          ],
        },
        {
          path: 'sms',
          component: SmsHome,
          children: [
            // Show
            {
              path: '',
              name: 'SmsShow',
              component: SmsShow,
            },
            // Edit
            {
              path: 'edit',
              name: 'EditSms',
              component: EditSms,
            },
          ],
        },
        // ========== End Settings ==========
      ],
    },

    // Auth
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    // NotFound
    { path: '/:notFound(.*)', name: 'NotFound', component: NotFound },
  ],
})

const TOKEN = store.getters['auth_module/currentUser'].token

router.beforeEach((to, _2, next) => {
  if (to.name !== 'Login' && !TOKEN) {
    next({ name: 'Login' })
  } else if (to.name == 'Login' && TOKEN) {
    next('/')
  } else if (to.name == 'Login' || to.name == 'NotFound') {
    store.dispatch('sideNav_module/reseatBodyPadding')
    next()
  } else {
    next()
  }
})

Vue.use(VueRouter)
export default router
