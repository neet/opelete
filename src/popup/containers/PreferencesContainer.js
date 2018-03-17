import { connect } from 'react-redux';
import { fetchStorage } from '../actions';
import Preferences from '../components/Preferences';

const mapDispatchToProps = dispatch => ({

  onMount() {
    dispatch(fetchStorage());
  },

});

export default connect(
  null,
  mapDispatchToProps,
)(Preferences);
