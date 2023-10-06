import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar"
import { LinearGradient } from "expo-linear-gradient"

import React, { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, RefreshControl, ScrollView, TouchableOpacity, TextInput, Image, Dimensions, TouchableHighlight } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { getSong, searchSong } from "../redux/slice/music.slice";
import TextTicker from "react-native-text-ticker";
const Search = ({ navigation, setList, song, setSong, setPack, setShowController, setPlaylist }) => {
    const dispatch = useDispatch()

    const search = useSelector((state) => state.music.search)
    const [refreshing, setRefreshing] = React.useState(false);
    const [temp, setTemp] = useState([])

    const [text, setText] = useState()
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (text) {
            dispatch(searchSong({ key: text }))
        }
    }, [text])

    useEffect(() => {
        const arr = search?.data?.data?.songs?.slice(0, 5)
        setTemp(arr)
    }, [search?.data?.data?.songs])

    const loadMore = () => {
        const arrTemp = search?.data?.data?.songs?.slice(temp.length, temp.length + 5)
        const concatArray = temp.concat(arrTemp);
        setTemp(concatArray)
    }

    const handleOpenPlayer = async (item) => {
        const array = search?.data?.data?.songs
        // let count = 0;
        // array.map((arrItem) => {
        //     if (arrItem.encodeId === item.encodeId)
        //         count++
        // })
        // if (count === 0) {
        //     array.push(item)
        // }
        setList(array)
        setSong(item)
        setPack('render')
        setShowController(true)
        // await dispatch(getSong({ id: item.encodeId }))
        await navigation.navigate('Player')
    }

    const handleOpenPlaylist = async (item) => {
        setPlaylist(item)

        await navigation.navigate('Playlist')
    }
    const handleOpen = async () => {
        setShowController(true)
        setPack('neverRender')
        await navigation.navigate('Player')
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#15162e', paddingBottom: song ? 54 : 0 }}>
                {song && (
                    <View style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 100 }}>

                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor="rgb(97, 97, 97)"
                            style={{ backgroundColor: 'rgb(33, 33, 33)' }}
                            onPress={handleOpen}>
                            <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, gap: 12, justifyContent: 'center', alignItems: 'center' }}>
                                {/* <View style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#cd7f32' }}>{idx + 1}</Text>
                                    </View> */}
                                <Image style={{ width: 40, height: 40, borderRadius: 20 }} src={song?.thumbnailM} />
                                <View style={{ width: Dimensions.get('window').width - 77, justifyContent: 'center' }}>
                                    {/* <Text style={{ color: 'white', fontSize: 14 }}>{item.title}</Text> */}
                                    <TextTicker
                                        style={{ fontSize: 14, color: 'white' }}
                                        duration={10000}
                                        loop
                                        bounce
                                        repeatSpacer={50}
                                        marqueeDelay={1000}
                                    >
                                        {song?.title}
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
                                        {song?.artistsNames}
                                    </TextTicker>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                )}
                <ScrollView stickyHeaderIndices={[0]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <LinearGradient
                        colors={['#343673', '#090979', '#15162e']}
                        style={styles.head}
                    >
                        <View style={styles.sticky}>
                            <View style={styles.header}>
                                <Text style={styles.textColor}>Tìm kiếm</Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <TextInput
                        style={styles.input}
                        onChangeText={setText}
                        value={text}
                        placeholderTextColor="#bdbdbd"
                        placeholder="Nhập tên bài hát, ca sĩ hoặc album,..."
                    />
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={styles.textColor}>Kết quả tìm kiếm</Text>
                        {/* <CardSong sound={sound} setSound={setSound} /> */}
                        {temp?.map((item, idx) => idx <= 5 && (
                            <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlayer(item)}>
                                <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, gap: 12 }}>
                                    {/* <View style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#cd7f32' }}>{idx + 1}</Text>
                                    </View> */}
                                    <Image style={{ width: 50, height: 50 }} src={item.thumbnailM} />
                                    <View style={{ width: Dimensions.get('window').width - 87, justifyContent: 'center' }}>
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
                        {search?.data?.data?.songs?.length > 5 && temp?.length < search?.data?.data?.songs?.length && (
                            <TouchableOpacity style={{ alignItems: 'center', paddingTop: 12 }} onPress={() => loadMore()}>
                                <View style={{ paddingHorizontal: 12, paddingVertical: 3, borderRadius: 20, borderStyle: 'solid', borderColor: 'white', borderWidth: 1 }}>
                                    <Text style={{ color: 'white', fontSize: 10 }}>Xem thêm</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    {search?.data?.data?.playlists?.length > 0 && (
                        <Text style={styles.textColor}>Playlist đề xuất</Text>
                    )}
                    <ScrollView horizontal={true} style={{ paddingLeft: 12 }}>
                        {search?.data?.data?.playlists?.map((item) => (
                            <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlaylist(item)}>
                                <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: Dimensions.get('window').width / 3, marginRight: 12 }}>
                                    <Image style={{ width: '100%', height: Dimensions.get('window').width / 3, borderRadius: 6 }} src={item.thumbnailM} />
                                    <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', width: '100%' }}>{item.title}</Text>
                                        <Text style={{ color: '#bdbdbd', fontSize: 12, textAlign: 'center', width: '100%' }}>{item.artistsNames}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </ScrollView>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        paddingHorizontal: 12,
        gap: 16
    },
    textColor: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 12
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.3)',
        color: 'white',
        borderColor: '#eeeeee'
    },
});
export default Search