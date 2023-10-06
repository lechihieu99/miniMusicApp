import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, Dimensions, Image, ScrollView, RefreshControl, TouchableOpacity, TouchableHighlight } from "react-native"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { FontAwesome5 } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-x-carousel';
import TextTicker from 'react-native-text-ticker'
import { getChart, getHexColor, getHome, getSong } from "../redux/slice/music.slice"


const Home = ({ navigation, song, setSong, setPlaylist, setList, list, setSound, playSound, setShowController, pack, setPack }) => {
    const dispatch = useDispatch()

    const home = useSelector((state) => state.music.home)
    const chart = useSelector((state) => state.music.chart)
    // const hexColor = useSelector((state) => state.music.hexColor)
    const songData = useSelector((state) => state.music.song)

    const [refreshing, setRefreshing] = React.useState(false);
    const [testData, setTestData] = useState()

    useEffect(() => {
        dispatch(getHome())
    }, [refreshing])

    useEffect(() => {
        dispatch(getChart())
    }, [refreshing])

    // useEffect(() => {
    //     dispatch(getHexColor({
    //         thumbnailM: 'https://i.imgur.com/68jyjZT.jpg'
    //     }))
    // }, [refreshing])

    // useEffect(() => {
    //     console.log(hexColor?.data)
    // }, [hexColor])

    useEffect(() => {
        let array = []
        if (home?.data?.data?.items[0]?.items) {
            home?.data?.data?.items[0]?.items?.map((item, idx) => {
                array.push({
                    id: idx,
                    img: item.banner
                })
            })

            setTestData(array)
        }
    }, [home])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const renderItem2 = data => (
        <View key={data.id} style={styles.item}>
            <Image style={{ width: '100%', height: '100%' }} src={data.img} />
        </View>
    );

    const handleOpenPlayer = async (item) => {
        // const array = list
        // let count = 0;
        // array.map((arrItem) => {
        //     if (arrItem.encodeId === item.encodeId)
        //         count++
        // })
        // if (count === 0) {
        //     array.push(item)
        // }
        const array = []
        array.push(item)
        setList(array)
        setSong(item)
        setPack('render')
        setShowController(true)
        // dispatch(getSong({ id: item.encodeId }))
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
                )
                }
                {/* <Text>ABc</Text>
            <Button title="Go to Search" onPress={() => navigation.navigate('Search')} /> */}
                <ScrollView stickyHeaderIndices={[0]}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {/* <View > */}
                    <LinearGradient
                        colors={['#343673', '#090979', '#15162e']}
                        style={styles.head}
                    >
                        <View style={styles.sticky}>
                            <View style={styles.header}>
                                {/* <TouchableOpacity onPress={() => { }}>
                                    <FontAwesome5 name="chevron-left" color='white' size={22} />
                                </TouchableOpacity> */}
                                <Text style={styles.textColor}>Home</Text>
                                <View style={{ position: 'absolute', top: 'calc(50% - 11px)', right: 12 }} onPress={() => { }}>
                                    <FontAwesome5 name="compact-disc" color='white' size={22} />
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <Carousel
                        pagination={Pagination}
                        renderItem={renderItem2}
                        data={testData}
                        loop
                        autoplay
                        autoplayInterval={3000}
                    />
                    {/* <Button title="Play Song" onPress={() => navigation.navigate('Notifications')} /> */}
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={[styles.textColor, { paddingBottom: 12 }]}>Top Chart</Text>
                        {/* <CardSong sound={sound} setSound={setSound} /> */}
                        {chart?.data?.data?.RTChart?.items?.map((item, idx) => idx < 3 && (
                            <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlayer(item)}>
                                <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, gap: 12 }}>
                                    <View style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#cd7f32' }}>{idx + 1}</Text>
                                    </View>
                                    <Image style={{ width: 50, height: 50 }} src={item.thumbnailM} />
                                    <View style={{ width: Dimensions.get('window').width - 132, justifyContent: 'center' }}>
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
                        <TouchableOpacity style={{ alignItems: 'center', paddingTop: 12 }} onPress={() => navigation.navigate('Chart')}>
                            <View style={{ paddingHorizontal: 12, paddingVertical: 3, borderRadius: 20, borderStyle: 'solid', borderColor: 'white', borderWidth: 1 }}>
                                <Text style={{ color: 'white', fontSize: 10 }}>Xem thêm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={[styles.textColor, { paddingBottom: 12 }]}>Mới phát hành</Text>
                        {/* <CardSong sound={sound} setSound={setSound} /> */}
                        <ScrollView horizontal={true} style={{ paddingLeft: 12 }}>
                            {home?.data?.data?.items[2]?.items?.all?.map((item, idx) => (
                                <>
                                    <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlayer(item)}>
                                        <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: Dimensions.get('window').width / 3, marginRight: 12 }}>
                                            <Image style={{ width: '100%', height: Dimensions.get('window').width / 3, borderRadius: 6 }} src={item.thumbnailM} />
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', width: '100%' }}>{item.title}</Text>
                                                <Text style={{ color: '#bdbdbd', fontSize: 12, textAlign: 'center', width: '100%' }}>{item.artistsNames}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            ))}
                            {/* {home?.data?.data?.items[2]?.items?.all?.map((item, idx) => idx === 5 && (
                                <TouchableOpacity style={{ width: Dimensions.get('window').width / 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                                    <FontAwesome5 name="arrow-alt-circle-right" color='white' size={40} />
                                    <Text style={{ color: 'white', fontSize: 12 }}>Xem thêm</Text>
                                </TouchableOpacity>
                            ))} */}
                        </ScrollView>
                    </View>
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={[styles.textColor, { paddingBottom: 12 }]}>Album hot</Text>
                        {/* <CardSong sound={sound} setSound={setSound} /> */}
                        <ScrollView horizontal={true} style={{ paddingLeft: 12 }}>
                            {home?.data?.data?.items[13]?.items?.map((item, idx) => (
                                <>
                                    <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlaylist(item)}>
                                        <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: Dimensions.get('window').width / 3, marginRight: 12 }}>
                                            <Image style={{ width: '100%', height: Dimensions.get('window').width / 3, borderRadius: 6 }} src={item.thumbnailM} />
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', width: '100%' }}>{item.title}</Text>
                                                <Text style={{ color: '#bdbdbd', fontSize: 12, textAlign: 'center', width: '100%' }}>{item.artistsNames}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            ))}
                            {/* {home?.data?.data?.items[2]?.items?.all?.map((item, idx) => idx === 5 && (
                                <TouchableOpacity style={{ width: Dimensions.get('window').width / 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                                    <FontAwesome5 name="arrow-alt-circle-right" color='white' size={40} />
                                    <Text style={{ color: 'white', fontSize: 12 }}>Xem thêm</Text>
                                </TouchableOpacity>
                            ))} */}
                        </ScrollView>
                    </View>
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={[styles.textColor, { paddingBottom: 12 }]}>Top 100</Text>
                        {/* <CardSong sound={sound} setSound={setSound} /> */}
                        <ScrollView horizontal={true} style={{ paddingLeft: 12 }}>
                            {home?.data?.data?.items[11]?.items?.map((item, idx) => (
                                <>
                                    <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlaylist(item)}>
                                        <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: Dimensions.get('window').width / 3, marginRight: 12 }}>
                                            <Image style={{ width: '100%', height: Dimensions.get('window').width / 3, borderRadius: 6 }} src={item.thumbnailM} />
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', width: '100%' }}>{item.title}</Text>
                                                <Text style={{ color: '#bdbdbd', fontSize: 12, textAlign: 'center', width: '100%' }}>{item.artistsNames}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={[styles.textColor, { paddingBottom: 12 }]}>Chill cùng âm nhạc</Text>
                        {/* <CardSong sound={sound} setSound={setSound} /> */}
                        <View style={{ paddingLeft: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                            {home?.data?.data?.items[3]?.items?.map((item, idx) => (
                                <>
                                    <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlaylist(item)}>
                                        <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: Dimensions.get('window').width / 2 - 16 }}>
                                            <Image style={{ width: '100%', height: Dimensions.get('window').width / 2, borderRadius: 6 }} src={item.thumbnailM} />
                                            {/* <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', width: '100%' }}>{item.title}</Text>
                                            <Text style={{ color: '#bdbdbd', fontSize: 12, textAlign: 'center', width: '100%' }}>{item.artistsNames}</Text>
                                        </View> */}
                                        </View>
                                    </TouchableOpacity>
                                </>
                            ))}
                        </View>
                    </View>
                    <View style={{ paddingVertical: 12 }}>
                        <Text style={[styles.textColor, { paddingBottom: 12 }]}>Một chút yêu đời</Text>
                        {/* <CardSong sound={sound} setSound={setSound} /> */}
                        <View style={{ paddingLeft: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                            {home?.data?.data?.items[4]?.items?.map((item, idx) => idx < 4 && (
                                <>
                                    <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlaylist(item)}>
                                        <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'column', gap: 6, width: Dimensions.get('window').width / 2 - 16 }}>
                                            <Image style={{ width: '100%', height: Dimensions.get('window').width / 4, borderRadius: 6 }} src={item.thumbnailM} />
                                            <View style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                                                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center', width: '100%' }}>{item.title}</Text>
                                                <Text style={{ color: '#bdbdbd', fontSize: 12, textAlign: 'center', width: '100%' }}>{item.artistsNames}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
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
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbf3fa',
    },
})
export default Home