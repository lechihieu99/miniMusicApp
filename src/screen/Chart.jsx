import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react"
import { View, Text, Button, StyleSheet, ScrollView, RefreshControl, Dimensions, Image, TouchableOpacity, TouchableHighlight } from "react-native"
// import { LineChart } from "react-native-chart-kit";
import TextTicker from "react-native-text-ticker";
import { useDispatch, useSelector } from "react-redux";

import PureChart from 'react-native-pure-chart';


const Chart = ({ navigation, setList, song, setSong, setPack, setShowController }) => {
    const dispatch = useDispatch();
    const chart = useSelector((state) => state.music.chart)

    const [refreshing, setRefreshing] = React.useState(false);
    const [check, setCheck] = useState(false)
    const [dataTop1, setDataTop1] = useState();
    const [dataTop2, setDataTop2] = useState();
    const [dataTop3, setDataTop3] = useState();

    const [sampleData, setSampleData] = useState([])

    useEffect(() => {
        if (chart) setCheck(true)
    }, [chart])

    useEffect(() => {
        let arrayTop1 = []
        let arrayTop2 = []
        let arrayTop3 = []

        chart?.data?.data?.RTChart?.chart?.items[`${chart?.data?.data?.RTChart?.items[0]?.encodeId}`]?.map((item) => {
            arrayTop1.push({
                x: `${item.hour}h`,
                y: Math.floor(item.counter)
            })
        })
        chart?.data?.data?.RTChart?.chart?.items[`${chart?.data?.data?.RTChart?.items[1]?.encodeId}`]?.map((item) => {
            arrayTop2.push({
                x: `${item.hour}h`,
                y: Math.floor(item.counter)
            })
        })
        chart?.data?.data?.RTChart?.chart?.items[`${chart?.data?.data?.RTChart?.items[2]?.encodeId}`]?.map((item) => {
            arrayTop3.push({
                x: `${item.hour}h`,
                y: Math.floor(item.counter)
            })
        })

        // console.log(arrayTop1)
        // console.log(arrayTop2)
        // console.log(arrayTop3)

        if (check === true) {
            setDataTop1(arrayTop1.slice(arrayTop1.length - 7, arrayTop1.length - 1))
            setDataTop2(arrayTop2.slice(arrayTop1.length - 7, arrayTop1.length - 1))
            setDataTop3(arrayTop3.slice(arrayTop1.length - 7, arrayTop1.length - 1))
        }

    }, [check])

    useEffect(() => {
        if (dataTop1 && dataTop2 && dataTop3) {
            const array = [
                {
                    seriesName: 'series1',
                    data: dataTop1,
                    color: 'rgb(245, 255, 64)'
                },
                {
                    seriesName: 'series2',
                    data: dataTop2,
                    color: 'rgb(40, 206, 224)'
                },
                {
                    seriesName: 'series3',
                    data: dataTop3,
                    color: 'pink'
                }
            ]
            setSampleData(array)
        }

    }, [dataTop1, dataTop2, dataTop3])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const handleOpenPlayer = async (item) => {
        const array = chart?.data?.data?.RTChart?.items
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
                                <Text style={styles.textColor}>Top Chart</Text>
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={{ marginBottom: 12 }}>
                        <PureChart data={sampleData} type='line' />
                    </View>

                    {chart?.data?.data?.RTChart?.items?.map((item, idx) => (
                        <TouchableOpacity key={item.encodeId} onPress={() => handleOpenPlayer(item)}>
                            <View key={item.encodeId} style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 6, gap: 12 }}>
                                <View style={{ width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: idx === 0 ? 20 : idx === 1 ? 18 : idx === 2 ? 16 : 13, fontWeight: 'bold', color: idx === 0 ? 'rgb(245, 255, 64)' : idx === 1 ? 'rgb(40, 206, 224)' : idx === 2 ? "pink" : '#bdbdbd' }}>{idx + 1}</Text>
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
});
export default Chart