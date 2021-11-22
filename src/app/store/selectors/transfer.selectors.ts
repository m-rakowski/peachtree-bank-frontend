import {AppState} from "../model/app-state";

export const selectTransfers = (state: AppState) => {
  return state.transfersFeature.transfers.map(x => x).sort(
    (a, b) =>
      new Date(b.dates.valueDate).getTime() -
      new Date(a.dates.valueDate).getTime()
  )
}
export const selectAccount = (state: AppState) => state.transfersFeature.account;

