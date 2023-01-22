<template>
  <div class="chart_card" v-if="radialChartOptions && series">
    <!-- START:: TITLE -->
    <h4 class="chart_title mt-0">
      <slot name="chart_title"></slot>
    </h4>
    <!-- END:: TITLE -->

    <!-- START:: CHART -->
    <apexchart
      type="radialBar"
      :width="ChartWidth"
      :height="ChartHeight"
      :options="radialChartOptions"
      :series="series"
    ></apexchart>
    <!-- END:: CHART -->
  </div>
</template>

<script>
export default {
  name: "RadialChart",

  props: [
    "ChartWidth",
    "ChartHeight",
    "ChartColors",
    "ChartLabels",
    "ChartData",
  ],

  data() {
    return {
      // START:: RADIAL BAR CHART DATA
      radialChartOptions: null,

      series: null,
      // END:: RADIAL BAR CHART DATA
    };
  },

  created() {
    this.radialChartOptions = {
      plotOptions: {
        radialBar: {
          size: undefined,
          inverseOrder: true,
          hollow: {
            margin: 10,
            size: "50%",
            background: "transparent",
          },
          track: {
            show: false,
          },
          startAngle: -180,
          endAngle: 180,
        },
      },
      stroke: {
        lineCap: "round",
      },
      colors: this.ChartColors,
      labels: this.ChartLabels,
      legend: {
        show: true,
        floating: true,
        position: "right",
        offsetX: -110,
        offsetY: 110,
      },
    };

    this.series = this.ChartData;
  },
};
</script>
