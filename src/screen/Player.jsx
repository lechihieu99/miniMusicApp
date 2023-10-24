import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, Button, ScrollView, RefreshControl, TouchableOpacity, TextInput, StyleSheet, Dimensions, StatusBar, Image, Animated, Easing, BackHandler } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import TextTicker from "react-native-text-ticker";
import { useDispatch, useSelector } from "react-redux";
import { getHexColor, getLyricsSong, getSong, searchRecommendSong } from "../redux/slice/music.slice";

import { useKeepAwake } from 'expo-keep-awake';
import { useIsFocused } from "@react-navigation/native";

const Player = ({ navigation, song, setSong, setPlaylist, list, setList, playSound, pauseSound, continueSound, isPlaying, setIsPlaying, sound, getStatusAudio, equal, maxValue, setValueSlider, currentValue, setCurrentValue, info, setInfo, setMaxValueSlider, setShowController, setActionPlayer, setFocusPlayer }) => {

    useKeepAwake()
    const dispatch = useDispatch()

    const isFocused = useIsFocused()
    const hexColor = useSelector((state) => state.music.hexColor)
    const lyricsSong = useSelector((state) => state.music.songLyrics);
    // const songData = useSelector((state) => state.music.song)
    // const search = useSelector((state) => state.music.searchRecommend)

    // const [refreshing, setRefreshing] = React.useState(false);
    const [index, setIndex] = useState(1)
    const [temp, setTemp] = useState([])

    const [state, setState] = useState({
        index: index,
        routes: [
            { key: 'first', title: 'First' },
            { key: 'second', title: 'Second' },
            { key: 'third', title: 'Third' }
        ],
    })

    // useEffect(() => {
    //     dispatch(searchRecommendSong({ key: song?.artistsNames }))
    // }, [song])

    // const spinValue = new Animated.Value(0);

    // First set up animation 
    // Animated.timing(
    //     spinValue,
    //   {
    //     toValue: 1,
    //     duration: 3000,
    //     easing: Easing.linear, // Easing is an additional import from react-native
    //     useNativeDriver: true  // To make use of native driver for performance
    //   }
    // ).start()
    // Animated.loop(
    //     Animated.timing(
    //         spinValue,
    //         {
    //             toValue: 1,
    //             duration: 10000,
    //             easing: Easing.linear,
    //             useNativeDriver: true
    //         }
    //     )
    // ).start();

    // const spin = spinValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['0deg', '360deg']
    // })

    // useEffect(() => {
    //     const interval = setInterval(() => getStatusAudio(), 1000)

    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [song])

    // useEffect(() => {
    //     console.log(maxValue)
    // }, [maxValue])

    useEffect(() => {
        setMaxValueSlider()
    }, [song])

    useEffect(() => {
        setFocusPlayer(isFocused)
    }, [])

    useEffect(() => {
        dispatch(getHexColor({
            thumbnailM: song?.thumbnailM
        }))
        dispatch(getLyricsSong({
            id: song?.encodeId
        }))
        dispatch(getSong({ id: song?.encodeId }))

    }, [song])

    useEffect(() => {
        let index = 0;
        list?.map((item, idx) => {
            if (item.encodeId === song?.encodeId)
                if (idx <= 10)
                    index = 10
                else
                    index = idx + 1
        })
        const arr = list?.slice(0, index)
        setTemp(arr)
    }, [list])

    useEffect(() => {

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBack,
        );

        return () => backHandler.remove();
    }, []);

    const loadMore = () => {
        const arrTemp = list?.slice(temp.length, temp.length + 10)
        const concatArray = temp.concat(arrTemp);
        setTemp(concatArray)
    }

    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 2000);
    // }, []);

    const handleChangeSong = (item) => {
        setSong(item)
    }

    const FirstRoute = () => {
        return (
            <View style={[styles.scene, { height: (Dimensions.get('screen').height - 112) * 0.7 }]}>
                <ScrollView>
                    {temp?.map((item) => (
                        <TouchableOpacity key={item.encodeId} onPress={() => handleChangeSong(item)}>
                            <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 6, paddingHorizontal: 6, paddingVertical: 6, gap: 12, backgroundColor: item.encodeId === song?.encodeId ? "rgba(0,0,0,0.5)" : "transparent" }}>

                                <Image style={{ width: 55, height: 55 }} src={item.thumbnailM} />
                                <View style={{ width: Dimensions.get('window').width - 87, justifyContent: 'center' }}>
                                    {/* <Text style={{ color: 'white', fontSize: 14 }}>{item.title}</Text> */}
                                    <TextTicker
                                        style={{ fontSize: 14, color: 'white' }}
                                        duration={5000}
                                        loop
                                        bounce
                                        repeatSpacer={50}
                                        marqueeDelay={1000}
                                    >
                                        {item.title}
                                    </TextTicker>
                                    {/* <Text style={{ color: '#bdbdbd', fontSize: 12 }}>{item.artistsNames}</Text> */}
                                    <TextTicker
                                        style={{ fontSize: 12, color: '#eeeeee' }}
                                        duration={10000}
                                        loop
                                        bounce
                                        repeatSpacer={50}
                                        marqueeDelay={1000}
                                    >
                                        {item.artistsNames}
                                    </TextTicker>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    {list?.length > 10 && temp?.length < list?.length && (
                        <TouchableOpacity style={{ alignItems: 'center', paddingTop: 12 }} onPress={() => loadMore()}>
                            <View style={{ paddingHorizontal: 12, paddingVertical: 3, borderRadius: 20, borderStyle: 'solid', borderColor: 'white', borderWidth: 1 }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>Xem thêm</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {/* <Text style={{ color: '#bdbdbd', fontWeight: '400', paddingTop: 16, paddingBottom: 6, paddingLeft: 12, fontSize: 16 }}>Các bài hát gợi ý</Text>
                {search?.data?.data?.songs?.map((item, idx) => idx < 3 && (
                    <TouchableOpacity key={item.encodeId} onPress={() => handlePlayRecommend(item)}>
                        <View style={{ display: 'flex', flexDirection: 'row', marginHorizontal: 6, paddingHorizontal: 6, paddingVertical: 6, gap: 12 }}>

                            <Image style={{ width: 55, height: 55 }} src={item.thumbnailM} />
                            <View style={{ width: Dimensions.get('window').width - 87, justifyContent: 'center' }}>
                                <TextTicker
                                    style={{ fontSize: 14, color: 'white' }}
                                    duration={5000}
                                    loop
                                    bounce
                                    repeatSpacer={50}
                                    marqueeDelay={1000}
                                >
                                    {item.title}
                                </TextTicker>
                                <TextTicker
                                    style={{ fontSize: 12, color: '#eeeeee' }}
                                    duration={10000}
                                    loop
                                    bounce
                                    repeatSpacer={50}
                                    marqueeDelay={1000}
                                >
                                    {item.artistsNames}
                                </TextTicker>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))} */}
                </ScrollView>
            </View>
        )
    };
    const SecondRoute = (song) => (
        <View style={[styles.scene]}>
            <View style={{ height: '70%', width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Image resizeMode={"cover"} src={song?.thumbnailM} style={{ width: Dimensions.get('window').width * 0.8, height: Dimensions.get('window').width * 0.8, overflow: 'hidden', borderRadius: (Dimensions.get('window').width * 0.8) / 2, resizeMode: 'cover' }} />
                <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 24 }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>{song?.title}</Text>
                    <Text style={{ color: '#bdbdbd' }}>{song?.artistsNames}</Text>
                </View>
            </View>

        </View>
    );

    const ThirdRoute = (song) => (
        <View style={[styles.scene, { height: (Dimensions.get('screen').height - 112) * 0.7 }]}>
            <ScrollView style={{ height: '100%', width: '100%' }}>
                {lyricsSong?.data?.data?.sentences ? lyricsSong?.data?.data?.sentences?.map((item, idx) => (
                    <Text key={idx} style={{ textAlign: 'center', color: '#eeeeee', fontSize: 14 }}>{
                        item.words.map((item2, idx2) => (
                            <Text key={item2.startTime + item2.data + idx2}>{item2.data} </Text>
                        ))
                    }</Text>
                )) : (
                    <View>
                        <Text style={{ textAlign: 'center', color: '#bdbdbd', fontSize: 14 }}>
                            Không có lời bài hát
                        </Text>
                    </View>
                )}
            </ScrollView>

        </View>
    );

    const handleBack = async () => {
        setShowController(false)
        setFocusPlayer(false)
        await navigation.goBack()
    }

    return (
        <>
            <LinearGradient colors={[hexColor?.data ? hexColor?.data : "black", '#15162e']} style={{ flex: 1, backgroundColor: '#15162e' }}>
                <ScrollView stickyHeaderIndices={[0]}
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
                >
                    {/* <View > */}
                    <View
                        // colors={['#343673', '#090979', '#15162e']}
                        style={styles.head}
                    >
                        <View style={styles.sticky}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={handleBack}>
                                    <FontAwesome5 name="chevron-left" color='white' size={22} />
                                </TouchableOpacity>
                                <Text style={styles.textColor}>{index === 0 ? "Danh sách phát" : index === 2 ? "Lời bài hát" : "Trình phát nhạc"}</Text>
                                <View>
                                    <FontAwesome5 name="compact-disc" color='white' size={22} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: Dimensions.get('screen').height - 112 }}>
                        <View style={{ height: '100%' }}>
                            <TabView
                                renderTabBar={() => null}
                                navigationState={state}
                                renderScene={SceneMap({
                                    first: FirstRoute,
                                    second: () => SecondRoute(song),
                                    third: ThirdRoute
                                })}
                                onIndexChange={(index) => setIndex(index)}
                                initialLayout={{ width: Dimensions.get('window').width }}
                            // style={styles.container}
                            />


                        </View>

                    </View>

                </ScrollView>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    head: {
        height: 96,
        flex: 1,
        flexDirection: 'row'
    },
    sticky: {
        height: '100%',
        paddingTop: 32,
        flex: 1,
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        height: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        gap: 16
    },
    textColor: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 12
    },
    item: {
        width: Dimensions.get('window').width,
        height: (Dimensions.get('screen').height - 112) * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbf3fa',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'rgba(33,32,32,0.6)',
        borderRadius: 6,
        borderColor: '#bdbdbd',
        color: 'white'
    },
    scene: {
        height: '100%'
    },
    container: {
        marginTop: StatusBar.currentHeight,
    }
})
export default Player