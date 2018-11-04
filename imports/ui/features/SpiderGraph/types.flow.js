/**
 * @package features/SpiderGraph Flow Types
 * @copyright Jason J. Nathan
 * @author Jason Nathan <jjnathanjr+msurvey@gmail.com>  {@link https://www.jasonnathan.com}
 * @version  1.0
 */
// @flow
export type Tick = {
  (d: number): number,
  ticks(count: number): Array<number>,
  tickFormat(count: number, fmt: ?string): (val: number) => string,
};

export type Value = { key: string, label: string };

export type DataSet = {
  key: string,
  label: string,
  isAdded?: boolean,
  isExist?: boolean,
  values: { [variableKey: string]: number },
};

export type Data = {
  keyLabels: Array<Value>,
  sets: Array<DataSet>,
};

export type Point = {
  x: number,
  y: number,
  value: number,
  setKey: string,
  variableKey: string,
  key: string,
};

export type Hovered = {
  event: MouseEvent,
  height: number,
  width: number,
  padding: number,
  radius: number,
  voronoiDiagram: any,
};
