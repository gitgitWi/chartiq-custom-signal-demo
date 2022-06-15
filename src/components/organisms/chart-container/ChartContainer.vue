<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { chartContainerId } from '../../../constants';
import { ChartIQRenderer } from '../../../services/chart';
import type { ApiHistory, CiqHistory } from './interfaces';

const chartRenderer = ChartIQRenderer.getInstance();

const chartRefKey = 'chartRef';
const chartRef = ref(null);
// const chartConfigs = ChartIQRenderer.getChartConfig(chartRefKey);

onMounted(() => {
  const $chartRef = chartRef.value!;
  fetch(
    'https://xrlkcpfarp7azb3m6fse22mbbe0nuorf.lambda-url.ap-northeast-2.on.aws/prices/domestic/005930?period=day'
  )
    .then((res) => res.json())
    .then((res) => {
      chartRenderer.setContainer($chartRef).setData(res.results.map(refineApiToCiq), '삼성전자');
    });
});

const refineApiToCiq = ({
  localDate,
  openPrice,
  lowPrice,
  highPrice,
  closePrice,
  accumulatedTradingVolume,
}: ApiHistory): CiqHistory => ({
  Date: `${localDate.slice(0, 4)}-${localDate.slice(4, 6)}-${localDate.slice(6, 8)}`,
  Open: openPrice,
  High: highPrice,
  Low: lowPrice,
  Close: closePrice,
  Volume: accumulatedTradingVolume,
  Adj_Close: closePrice,
});

/**
 * For applications that have more then one chart, keep single dialog of the same type
 * and move it outside context node to be shared by all chart components
 */
function portalizeContextDialogs(container: HTMLElement) {
  container.querySelectorAll('cq-dialog').forEach((dialog) => {
    dialog.remove();
    if (!dialogPortalized(dialog)) {
      document.body.appendChild(dialog);
    }
  });
}

function dialogPortalized(el: Element) {
  if (!el.firstChild) {
    throw new Error('Element has no children');
  }

  const tag = el.firstChild.nodeName.toLowerCase();
  return Array.from(document.querySelectorAll(tag)).some((el) => !el.closest('cq-context'));
}
</script>

<template>
  <main>
    <h2>ChartContainer</h2>
    <cq-context :ref="chartRefKey">
      <div class="ciq-chart-area" role="main">
        <div class="ciq-chart">
          <cq-recent-symbols>
            <div :id="chartContainerId">
              <cq-chart-legend></cq-chart-legend>
              <!-- <cq-chart-loader></cq-chart-loader> -->
            </div>
          </cq-recent-symbols>
        </div>
      </div>
    </cq-context>
  </main>
</template>

<style lang="scss" scoped>
@import '../../../styles';

main {
  @extend .reset-box;

  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: beige;
}
</style>
