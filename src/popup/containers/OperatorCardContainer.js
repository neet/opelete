import { connect } from 'react-redux';
import {
  addOperatorToBlacklist,
  removeOperatorFromBlacklist,
} from '../actions';
import OperatorCard from '../components/OperatorCard';

const mapStateToProps = (state, { operator }) => ({
  isHidden: state.getIn(['storage', 'operator_blacklist']).includes(operator.id),
});

const mapDispatchToProps = (dispatch, { operator }) => ({
  onAddToBlacklist() {
    dispatch(addOperatorToBlacklist(operator.id));
  },

  onRemoveFromBlacklist() {
    dispatch(removeOperatorFromBlacklist(operator.id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OperatorCard);
