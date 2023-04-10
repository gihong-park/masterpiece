/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import SearchMain from './SearchMain';

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

const SearchMainContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchMain);

export default SearchMainContainer;
