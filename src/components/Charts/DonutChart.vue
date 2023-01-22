<template>
  <div class="chart_card">
    <!-- START:: TITLE -->
    <h4 class="chart_title mt-0">
      <slot name="chart_title"></slot>
    </h4>
    <!-- END:: TITLE -->

    <!-- START:: CHART DESCRIPTION -->
    <h4 class="chart_description">
      <slot name="chart_description"></slot>
    </h4>
    <!-- END:: CHART DESCRIPTION -->

    <!-- START:: CHART -->
    <apexchart
      type="donut"
      width="340px"
      height="400px"
      :options="donutChartOptions"
      :series="donutChartSeries"
    ></apexchart>
    <!-- END:: CHART -->
  </div>
</template>

<script>
export default {
  name: 'DonutChart',

  props: ['ChartLabels', 'ChartData'],

  data() {
    return {
      // START:: DONUT CHART DATA
      donutChartOptions: {
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            customScale: 0.8,
            donut: {
              size: '80%',
              labels: {
                show: true,
                name: {
                  show: true,
                },
                value: {
                  show: false,
                },
                total: {
                  show: true,
                  label: 'الطلبات',
                  color: '#29479A',
                  //   formatter: function (w) {
                  //     return w.globals.seriesTotals.reduce((a, b) => {
                  //       return a + b;
                  //     }, 0);
                  //   },
                },
              },
            },
            offsetY: 20,
          },
          stroke: {
            colors: undefined,
          },
        },
        colors: [
          '#4EF2A0',
          '#29479A',
          '#249AD5',
          '#FF4560',
          '#11324D',
          '#7D5A50',
          '#F76E11',
        ],
        labels: this.ChartLabels,
        legend: {
          position: 'bottom',
          offsetY: 0,
          offsetX: 0,
        },
      },

      donutChartSeries: this.ChartData,
      // END:: DONUT CHART DATA
    }
  },
}
</script>
