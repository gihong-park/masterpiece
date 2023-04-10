/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Animated,
	Keyboard,
	Dimensions,
} from 'react-native';

import { ColorPallete, Font } from '../../common/styles';
import PropTypes from 'prop-types';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

// 임시로 사용됨. 현재 컴포넌트가 생성한 히스토리를 컴포넌트 외부에서 가져와야 하는 경우 사용한다.
let __histories = [];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SearchBar = props => {
    // TextInput 애니메이션 관련
    const [wrapperWidth] = useState(new Animated.Value(100));
    // TextInput 편집 가능 여부, 검색 중에는 편집되지 않게 하기 위함
    const [editable, setEditable] = useState(true);

    // 실제 input의 텍스트
    const [searchText, setSearchText] = useState('');

    // 취소 버튼 애니메이션 관련
    const [clearBtnState] = useState(new Animated.Value(0));
    const [clearBtnVisibility, setClearBtnVisibility] = useState(false);

    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        __histories = props.histories;
    }, [props.histories]);

    useEffect(() => {
        console.log(
            '[COM.SearchBar] time stamp has changed : ',
            props.timeStamp,
        );
        event.onForceSearch();
    }, [props.timeStamp]);

    const _clearBtn = {
        // 애니메이션 관련 함수
        show: callback => {
            setClearBtnVisibility(true);
            Animated.timing(clearBtnState, {
                toValue: 100,
                duration: 100,
                delay: 0,
            }).start(() => {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        },
        // 애니메이션 관련 함수
        hide: callback => {
            Animated.timing(clearBtnState, {
                toValue: 0,
                duration: 100,
                delay: 0,
            }).start(() => {
                setClearBtnVisibility(false);
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        },
        styles: () => {
            return {
                opacity: clearBtnState.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0.0, 1.0],
                }),
            };
        },
        elem: () => {
            if (clearBtnVisibility) {
                return (
                    <Animated.View style={_clearBtn.styles()}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={event.onClear}>
                            <IoniconsIcon
                                name="md-close-circle-outline"
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </Animated.View>
                );
            } else {
                return null;
            }
        },
    };

    const _textInput = {
        // 애니메이션 관련 함수
        setWide: callback => {
            setEditable(true);
            Animated.timing(wrapperWidth, {
                toValue: 100,
                duration: 200,
                delay: 0,
            }).start(() => {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        },
        // 애니메이션 관련 함수
        setNarrow: callback => {
            Animated.timing(wrapperWidth, {
                toValue: 85,
                duration: 200,
                delay: 0,
            }).start(() => {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        },
        styles: {
            wrapper: () => {
                return {
                    width: wrapperWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                    }),
                };
            },
        },
    };

    const event = {
        onInit: () => {
            if (typeof props.onInit === 'function') {
                setIsSearched(false);
                props.onInit({
                    useHistory: props.histories ? true : false,
                    histories: props.histories,
                });
            }
        },
        onCancel: () => {
            setSearchText('');
            setIsSearched(false);
            _textInput.setWide(() => {
                _clearBtn.hide(() => {
                    if (typeof props.onCancel === 'function') {
                        props.onCancel();
                    }
                });
            });
            Keyboard.dismiss();
        },
        onSubmit: () => {
            _textInput.setWide(() => {
                if (searchText.trim().length > 0) {
                    if (typeof props.onSubmit === 'function') {
                        if (props.history_dispatch) {
                            props.history_dispatch.insert({
                                value: searchText,
                                date: new Date(),
                            });
                        }

                        setIsSearched(true);
                        props.onSubmit(searchText, props.histories);
                        setEditable(false);
                        _clearBtn.show(() => {});
                    }
                }
            });
        },
        onClear: () => {
            setSearchText('');
            _textInput.setWide();
            _clearBtn.hide();
            setIsSearched(false);
            if (typeof props.onClear === 'function') {
                props.onCancel();
            }
        },
        onChangeText: t => {
            setSearchText(t);
            if (typeof props.onChangeText === 'function') {
                props.onChangeText(t);
            }
        },
        onFocus: () => {
            setEditable(true);
            _textInput.setNarrow();
        },
        onForceSearch: () => {
            if (props.value !== '' && !isSearched) {
                // 공백이 아닌 경우는 모두 외부에서 검색되는 상태로 취급
                setSearchText(props.value);
                setEditable(false);
                setIsSearched(true);
                _clearBtn.show();
            }
        },
    };

    return (
        <View style={SearchBarStyles.container}>
            <Animated.View
                style={[SearchBarStyles.wrapper, _textInput.styles.wrapper()]}>
                <IoniconsIcon name="md-search" size={25} color="gray"/>
                <TextInput
                    style={SearchBarStyles.input}
                    onFocus={event.onFocus}
                    value={searchText}
                    onChangeText={event.onChangeText}
                    editable={editable}
                    returnKeyType={'search'}
					onSubmitEditing={event.onSubmit}
					placeholder={'전시회, 작가, 작품 검색'}
                />
                {_clearBtn.elem()}
            </Animated.View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={event.onCancel}
                style={SearchBarStyles.btn}>
                <Text style={SearchBarStyles.btnText}>취소</Text>
            </TouchableOpacity>
        </View>
    );
};

// 테스트용 함수
SearchBar.getHistory = () => __histories;

const SearchBarStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
		padding: 20,
		flexDirection: 'row',
		borderBottomWidth: .7,
		borderBottomColor: '#dcdce0',
		backgroundColor: 'white',
    },
    wrapper: {
		borderColor: '#f1f2f4',
        borderWidth: 1,
		paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#f1f2f4',
		marginRight: 20,
    },
    input: {
		fontSize: 18,
        height: 40,
        marginLeft: 10,
		flex: 1,
    },
    btnWrapper: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: ColorPallete.highlight,
        fontFamily: Font.Regular,
        fontSize: 17,
    },
});

SearchBar.propTypes = {
    /**
     * 검색 버튼을 눌렀을 때 실행되는 이벤트
     * @params input에 입력되어 있는 텍스트
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * 검색 상태에서 삭제 버튼을 누르는 경우 실행되는 함수
     */
    onClear: PropTypes.func,
    /**
     * 취소 버튼을 누르는 경우 실행되는 함수
     */
    onCancel: PropTypes.func,
    /**
     * 텍스트가 변경되는 경우 실행되는 함수
     * @params 이벤트가 발생한 순간에 저장된 텍스트
     */
    onChangeText: PropTypes.func,
    // textColor: PropTypes.string,
    // textFont: PropTypes.string,
    // borderColor: PropTypes.string,
    // bgColor: PropTypes.string,
    // inputBgColor: PropTypes.string,
};

export default SearchBar;
