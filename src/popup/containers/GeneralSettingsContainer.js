import { connect } from 'react-redux';
import {
  changeMaxSuggestions,
  changeDescriptionVisibility,
} from '../actions';
import GeneralSettings from '../components/GeneralSettings';

const mapStateToProps = state => ({
  isHiddenDescriptions: state.getIn(['storage', 'hide_descriptions']),
  maxSuggestions: state.getIn(['storage', 'max_suggestions']),
});

const mapDispatchToProps = dispatch => ({
  onChangeDescriptionVisibility(value) {
    dispatch(changeDescriptionVisibility(value));
  },

  onChangeMaxSuggestions(value) {
    dispatch(changeMaxSuggestions(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GeneralSettings);
