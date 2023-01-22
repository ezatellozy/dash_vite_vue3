<template>
  <div class="homePage">
    <!-- Start Breadcrumb -->
    <Breadcrumb :items="items" />
    <!-- End Breadcrumb -->

    <!-- Start Main Loader -->
    <!-- <transition name="fadeInUp" mode="out-in" v-if="loading">
      <MainLoader />
    </transition> -->
    <!-- End Main Loader -->

    <div class="row">
      <div class="col-lg-12">
        <main>
          <!-- Main Shapes -->
          <div class="row">
            <!--Statistics-->
            <div class="col-12">
              <div class="row">
                <div
                  class="col-sm-6 col-md-4 col-lg-3"
                  v-for="n in 12"
                  :key="n"
                >
                  <SparksAreaCharts
                    dir="ltr"
                    :SectionRoute="'/users/all'"
                    :ChartColor="'#CD201F'"
                    ChartTitle=""
                    ChartName="الزائرين اليوم"
                    :ChartLabels="[
                      'User 1',
                      'User 2',
                      'User 3',
                      'User 4',
                      'User 5',
                      'User 6',
                    ]"
                    :ChartData="[57, 35, 40, 48, 56, 38]"
                  >
                    <template #chart_title>
                      <span class="title_text">احصائيات</span>
                      <p class="chart_val" :style="{ color: '#CD201F' }">
                        20
                      </p>
                    </template>
                  </SparksAreaCharts>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6 col-md-4" v-if="news">
                  <NewsCard
                    :items="news"
                    height="400px "
                    title="اخر الاخبار"
                  ></NewsCard>
                </div>
                <div class="col-sm-6 col-md-8">
                  <UsersStatisticsTable
                    :tableRows="champions_expectations_order"
                    v-if="champions_expectations_order"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-6" v-if="leagues_chart">
              <ColumnChart
                dir="ltr"
                :ChartLabels="leagues_chart.labels"
                :ChartData="leagues_chart.series"
              >
                <template #chart_title>
                  <span class="title_text">
                    {{ $t('leagues') }}
                  </span>
                </template>
              </ColumnChart>
            </div>

            <div class="col-md-6" v-if="teams_chart">
              <ColumnChart
                dir="ltr"
                :ChartLabels="teams_chart.labels"
                :ChartData="teams_chart.series"
              >
                <template #chart_title>
                  <span class="title_text">
                    {{ $t('teams') }}
                  </span>
                </template>
              </ColumnChart>
            </div>

            <div class="col-md-6" v-if="users_chart">
              <ColumnChart
                dir="ltr"
                :ChartLabels="users_chart.labels"
                :ChartData="users_chart.series"
              >
                <template #chart_title>
                  <span class="title_text">
                    {{ $t('theUsers') }}
                  </span>
                </template>
              </ColumnChart>
            </div>
            <!-- <div class="col-md-4 col-xxl-3">
                <div class="col-md-12" v-if="news">
                  <NewsCard
                    :items="news"
                    height="400px "
                    title="اخر الاخبار"
                  ></NewsCard>
                </div>
                <div class="col-md-12">
                  <DonutChart
                    dir="ltr"
                    :ChartLabels="chartsOrderStatus.labels"
                    :ChartData="chartsOrderStatus.series.map((x) => x.data)"
                  >
                    <template #chart_title>
                      <span class="title_text">الطلبات الاخيرة</span>
                    </template>
                  </DonutChart>
                </div>
              </div> -->

            <!--     <div class="col-xl-8">
                  <AreaCharts
                    v-if="chartsRev.labels"
                    dir="ltr"
                    ChartHeigh="320px !important"
                    :ShapeType="'area'"
                    :ChartType="'smooth'"
                    :ChartColors="['#37DB79', '#F93838']"
                    :ChartLabels="chartsRev.labels.map((x) => x.month_name)"
                    :ChartData="chartsRev.series"
                  >
                    <template #chart_title>
                      <span class="title_text">
                        {{ chartsRev.title.revenue }}
                      </span>
                    </template>
                  </AreaCharts>
                </div>
                <div class="col-xl-4">
                  <HomeCard
                    :items="top_product"
                    height="415px"
                    title="المنتجات المميزة"
                  ></HomeCard>
                </div> -->
            <!-- Start:: Users Table -->

            <!-- <div class="col-md-4 col-xxl-3">
              <div class="row">
                <div class="col-md-12">
                  <NotificationCard
                    :items="notifications"
                    height="627px"
                    title="الاشعارات"
                  ></NotificationCard>
                </div>
                <div class="col-md-12">
                  <StockTrackCard
                    :items="products_out_of_stock"
                    height="345px"
                    title="تتبع المخزون"
                    subTitle="الكمية"
                  ></StockTrackCard>
                </div>

              </div>
            </div> -->
            <!--Statistics-->
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
// Start:: Importing Charts
import SparksAreaCharts from '@/components/Charts/SparksAreaCharts.vue'
import AreaCharts from '@/components/Charts/AreaCharts.vue'
import ColumnChart from '@/components/Charts/ColumnChart.vue'
import DonutChart from '@/components/Charts/DonutChart.vue'
import LineChart from '@/components/Charts/LineChart.vue'
import RadialChart from '@/components/Charts/RadialChart.vue'
// End:: Importing Charts

// Start:: Statistics Tables
import UsersStatisticsTable from '@/components/StatisticsTables/UsersStatisticsTable.vue'
import TransfersTable from '@/components/StatisticsTables/TransfersStatisticsTable.vue'
import HashtagsStatisticsTable from '@/components/StatisticsTables/HashtagsStatisticsTable.vue'
import VideosStatisticsView from '@/components/StatisticsTables/VideosStatisticsView.vue'
import HomeCard from '@/components/StatisticsTables/HomeCard.vue'
import ReviewCard from '@/components/StatisticsTables/ReviewCard.vue'
import NewsCard from '@/components/StatisticsTables/NewsCard.vue'
import StockTrackCard from '@/components/StatisticsTables/StockTracking.vue'
// End:: Statistics Tables

// Start::
import HashtagSlider from '@/components/Sliders/HashtagSlider.vue'

export default {
  name: 'HomePage',

  components: {
    HashtagSlider,
    SparksAreaCharts,
    AreaCharts,
    ColumnChart,
    RadialChart,
    DonutChart,
    LineChart,
    UsersStatisticsTable,
    HashtagsStatisticsTable,
    VideosStatisticsView,
    HomeCard,
    ReviewCard,
    NewsCard,
    StockTrackCard,
    TransfersTable,
  },

  data() {
    return {
      // ========== Charts Aside
      items: [
        {
          text: this.$t('breadcrumb.mainPage'),
          disabled: false,
          href: '/',
        },
      ],

      // ========== Charts Aside
      asideIsActive: false,

      // ============ Charts Data

      upper_chart: [],

      users_chart: null,
      teams_chart: null,
      leagues_chart: null,
      chartsOrderStatus: [],
      news: null,
      loading: false,
      champions_expectations_order: null,
      orders: [
        {
          id: 1,
          date: '12-11-1994',
          customer: {
            id: 1,
            name: 'diaa',
          },
          price: 200,
          status: 'pendding',
          paid: 1,
        },
        {
          id: 2,
          date: '12-11-1994',
          customer: {
            id: 1,
            name: 'diaa',
          },
          price: 200,
          status: 'inprogress',
          paid: 0,
        },
        {
          id: 2,
          date: '12-11-1994',
          customer: {
            id: 1,
            name: 'diaa',
          },
          price: 200,
          status: 'inprogress',
          paid: 0,
        },
      ],
    }
  },

  methods: {
    getStatistcsData() {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: 'home',
      })
        .then((res) => {
          let result = res.data.data

          // for (const [key, value] of Object.entries(result)) {
          //   if (typeof value != 'object') {
          //     this.upper_chart.push({
          //       name: key,
          //       count: value,
          //     })
          //   }
          // }
          this.upper_chart = result.statistical
          this.users_chart = result.stats.users_chart
          this.teams_chart = result.stats.teams_chart
          this.leagues_chart = result.stats.leagues_chart
          this.champions_expectations_order =
            result.champions_expectations_order
          this.news = result.latest_news

          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },

    generateRandomColor() {
      for (let i = 0; i < this.cards.length; i++) {
        const random = () => Math.floor(256 * Math.random())
        this.randomColors.push(`rgb(${random()}, ${random()}, ${random()})`)
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.dispatchEvent(new Event('resize'))
    })
  },

  created() {
    // this.getStatistcsData()
  },
}
</script>
