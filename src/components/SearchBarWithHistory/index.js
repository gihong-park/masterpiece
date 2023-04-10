import { connect } from 'react-redux';
import SearchBar from './SearchBar';

import {
    insert,
    remove,
    clear,
} from '../../redux/reducers/com.searchbar.reducer';

const mapStateToProps = state => ({
    histories: state.com_search_history.histories,
});

const mapDispatchToProps = dispatch => ({
    history_dispatch: {
        insert: data => dispatch(insert(data)),
        remove: index => dispatch(remove(index)),
        clear: () => dispatch(clear),
    },
});

const SearchBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchBar);

export default SearchBarContainer;
