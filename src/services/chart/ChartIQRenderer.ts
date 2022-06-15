import { CIQ } from 'chartiq/js/componentUI';
import 'chartiq/js/advanced';
import 'chartiq/js/addOns';
import 'chartiq/js/components';

// @ts-ignore
import { default as getDefaultConfig } from 'chartiq/js/defaultConfiguration';

export class ChartIQRenderer {
  static #instance: ChartIQRenderer;

  #chart!: CIQ.ChartEngine;
  #options: any;

  static getInstance() {
    if (!this.#instance) this.#instance = new ChartIQRenderer();
    return this.#instance;
  }

  static getChartConfig(chartId: string) {
    const configs = getDefaultConfig();
    configs.chartId = chartId || 'chartContainer';
    return configs;
  }

  /**
   * @description
   * - singleton
   */
  private constructor() {
    return;
  }

  setContainer($container: HTMLElement): this {
    this.#chart = new CIQ.ChartEngine({
      container: $container,
    });
    return this;
  }

  setData(history: any[], symbol = '') {
    this.#chart.loadChart(symbol, { masterData: history });
    return this;
  }

  getUiContext(config: any = {}) {
    throw new Error(`MUST Implement`);
  }
}
