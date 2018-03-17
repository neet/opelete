import { connect } from 'react-redux';
import { fetchStorage } from '../actions';
import Preferences from '../components/Preferences';

const mapStateToProps = state => ({
  isLoading: state.getIn(['storage', 'is_loading']),
});

const mapDispatchToProps = dispatch => ({

  onMount() {
    dispatch(fetchStorage());
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Preferences);
