import { FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useRef, useState } from "react"
import { View, Text, Button, StyleSheet, Image, Dimensions, ScrollView, RefreshControl, Animated, TouchableOpacity } from "react-native"
import TextTicker from "react-native-text-ticker"
import { useDispatch, useSelector } from "react-redux"
import { getHexColor, getPlaylist, getSong } from "../redux/slice/music.slice"

const Playlist = ({ navigation, playlist, setSong, setPlaylist, list, setList, setSound, setShowController, setPack }) => {
    const dispatch = useDispatch()

    const listSong = useSelector((state) => state.music.playlist)
    const [refreshing, setRefreshing] = React.useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [isShow, setIsShow] = useState(false)

    const [temp, setTemp] = useState([])

    useEffect(() => {
        if (isShow) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
        else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [isShow])

    useEffect(() => {
        dispatch(getPlaylist({
            id: playlist?.encodeId
        }))
    }, [])

    useEffect(() => {
        const arr = listSong?.data?.song?.items?.slice(0, 10)
        setTemp(arr)
    }, [listSong?.data?.song?.items])

    const loadMore = () => {
        const arrTemp = listSong?.data?.song?.items?.slice(temp.length, temp.length + 10)
        const concatArray = temp.concat(arrTemp);
        setTemp(concatArray)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const handleScroll = (e) => {
        if (e.nativeEvent.contentOffset.y > 56) {
            setIsShow(true)
        }
        else {
            setIsShow(false)
        }
    }

    const handleOpenPlayer = async (item) => {
        setList(listSong?.data?.song?.items)
        setSong(item)
        setShowController(true)
        setPack('render')
        // dispatch(getSong({ id: item.encodeId }))
        await navigation.navigate('Player')
    }

    return (
        <>
            <ScrollView stickyHeaderIndices={[1]}
                onScroll={handleScroll}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={styles.container}>

                <View style={styles.header}>
                    <Image src={playlist?.thumbnailM} style={{ width: Dimensions.get('window').width, height: '100%' }} />

                    <LinearGradient colors={['#04060a', 'rgba(4, 6, 10, 0.2)', 'rgba(4, 6, 10, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']} style={{ position: 'absolute', width: '100%', height: '100%', top: 0 }}>
                    </LinearGradient>
                </View>
                <View style={{ justifyContent: 'center', backgroundColor: 'black', paddingTop: 36, paddingBottom: 16 }}>
                    <TouchableOpacity style={{ zIndex: 100 }} onPress={() => navigation.goBack()}>

                        <Animated.View style={[styles.backSticky, { opacity: fadeAnim }]}>
                            <FontAwesome5 name="chevron-left" color='white' size={26} />

                        </Animated.View>
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', width: '100%' }}>{playlist?.title}</Text>
                    <Text style={{ color: '#bdbdbd', fontSize: 12, textAlign: 'center', width: '100%' }}>{playlist?.artistsNames}</Text>
                </View>
                <Text style={{ color: 'white', paddingVertical: 12, paddingHorizontal: 12 }}>Các bài hát trong Album</Text>
                {temp?.map((item) => (
                    <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlayer(item)}>
                        <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, gap: 12 }}>

                            <Image style={{ width: 50, height: 50 }} src={item.thumbnailM} />
                            <View style={{ width: Dimensions.get('window').width - 92, justifyContent: 'center' }}>
                                {/* <Text style={{ color: 'white', fontSize: 14 }}>{item.title}</Text> */}
                                <TextTicker
                                    style={{ fontSize: 14, color: 'white' }}
                                    duration={10000}
                                    loop
                                    bounce
                                    repeatSpacer={50}
                                    marqueeDelay={1000}
                                >
                                    {item.title}
                                </TextTicker>
                                {/* <Text style={{ color: '#bdbdbd', fontSize: 12 }}>{item.artistsNames}</Text> */}
                                <TextTicker
                                    style={{ fontSize: 12, color: '#bdbdbd' }}
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <FontAwesome5 name="chevron-left" color='white' size={26} />
                </TouchableOpacity>
                {listSong?.data?.song?.items?.length > 10 && temp?.length < listSong?.data?.song?.items?.length && (
                    <TouchableOpacity style={{ alignItems: 'center', paddingTop: 12 }} onPress={() => loadMore()}>
                        <View style={{ paddingHorizontal: 12, paddingVertical: 3, borderRadius: 20, borderStyle: 'solid', borderColor: 'white', borderWidth: 1 }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>Xem thêm</Text>
                        </View>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative'
    },
    thumbnail: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: Dimensions.get('window').width * 0.7
    },
    back: {
        position: 'absolute',
        top: 42,
        left: 16
    },
    backSticky: {
        position: 'absolute',
        top: 8,
        left: 16
    }
});
export default Playlist