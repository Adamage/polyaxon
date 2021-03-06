import { connect, Dispatch } from "react-redux";
import {withRouter} from "react-router-dom";

import { AppState } from "../constants/types";
import ExperimentDetail from "../components/experimentDetail";
import * as actions from "../actions/experiment";


export function mapStateToProps(state: AppState, params: any)  {
  let experimentSequence = parseInt(params.match.params.experimentSequence);
  let ret;
  
  state.experiments.uuids.forEach(function (uuid: string, idx: number) {
    if (state.experiments.byUuids[uuid].sequence === experimentSequence) {
      ret = {experiment: state.experiments.byUuids[uuid]};
    }
  });

  if (!ret) {
    ret = {experiment: null};
  }
  return ret;
}

export interface DispatchProps {
  onDelete?: () => any;
  fetchData?: () => any;
}


export function mapDispatchToProps(dispatch: Dispatch<actions.ExperimentAction>, params: any): DispatchProps {
  return {
    onDelete: () => dispatch(() => {}),
    fetchData: () => dispatch(actions.fetchExperiment(params.match.params.user, params.match.params.projectName, params.match.params.experimentSequence))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExperimentDetail));
