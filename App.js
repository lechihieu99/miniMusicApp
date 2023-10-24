
import { StatusBar } from 'expo-status-bar';
import { BackHandler, Dimensions, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/app/store';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from './src/screen/Home';
import Search from './src/screen/Search';
import Chart from './src/screen/Chart';
import Playlist from './src/screen/Playlist';
import Player from './src/screen/Player';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';
import { Button } from 'react-native-paper';
import Slider from 'react-native-slider';
import { getSong } from './src/redux/slice/music.slice';

import * as Updates from 'expo-updates';

import { useKeepAwake } from 'expo-keep-awake';
// import BackgroundTask from 'react-native-background-actions'

// const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time))

// BackgroundTask.on('expiration', () => {
//   console.log('iOS: I am being closed!')
// })

// const taskRandom = async taskData => {
//   if (Platform.OS === 'ios') {
//     console.warn('This is will not keep your app alive in background')
//   }
//   await new Promise(async resolve => {
//     const { delay } = taskData
//     console.log(BackgroundTask.isRunning(), delay)
//     for (let i = 0; BackgroundTask.isRunning(); i++) {
//       console.log('Runned -> ', i)
//       await BackgroundTask.updateNotification({
//         taskDesc: 'Runned -> ' + i,
//         progressBar: 2
//       })

//       await sleep(delay)
//     }
//   })
// }

// const options = {
//   taskName: 'Example',
//   taskTitle: 'ExampleTask title',
//   taskDesc: 'ExampleTask description',
//   taskIcon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   linkingURI: 'lechihieu://chat/jane', // See Deep Linking for more info
//   parameters: {
//     delay: 1000,
//   },
// };

// function handleOpenUrl(evt) {
//   console.log(evt.url)
// }

// Linking.addEventListener('url', handleOpenUrl)



const PlayerController = forwardRef((props, ref) => {
  useKeepAwake()
  const { maxValue, playSound, pauseSound, continueSound, equal, isPlaying, setIsPlaying, song, list, setSong, pack, repeat, setRepeat, setPack, actionPlayer, nextSong, previousSong, getStatusAudio, load } = props

  const hexColor = useSelector((state) => state.music.hexColor)

  const [value, setValue] = useState()


  useEffect(() => {
    async function show() {
      const result = await ref.current.getStatusAsync()
      setValue(result.positionMillis)
    }
    const interval = setInterval(async () => show(), 1000)
    const interval2 = setInterval(async () => getStatusAudio(), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [ref.current])



  const handlePlaySong = () => {
    // const result = await ref.current.getStatusAsync()
    continueSound()
  }

  const setValueSlider = async (value) => {
    setValue(value)
    setIsPlaying(true)
    await ref.current.setPositionAsync(value)
  }

  const skipNext10Seconds = async () => {
    const result = await ref.current.getStatusAsync()
    if (parseInt(result.positionMillis) + 10000 <= result.durationMillis) {
      // setValue(parseInt(result.positionMillis) + 10000)
      await ref.current.setPositionAsync(parseInt(result.positionMillis) + 10000)
    }
    else {
      // setValue(result.durationMillis)
      await ref.current.setPositionAsync(result.durationMillis)
    }
  }

  const skipPrevious10Seconds = async () => {
    const result = await ref.current.getStatusAsync()
    if (parseInt(result.positionMillis) - 10000 >= 0) {
      // setValue(parseInt(result.positionMillis) - 10000)
      await ref.current.setPositionAsync(parseInt(result.positionMillis) - 10000)
    }
    else {
      // setValue(0)
      await ref.current.setPositionAsync(0)
    }
  }

  return (
    <View style={{ height: (Dimensions.get('screen').height - 112) * 0.3, display: 'flex', justifyContent: 'space-around', position: 'absolute', width: '100%', bottom: 0 }}>
      {load ? (
        <>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="step-backward" color='rgba(255,255,255,0.5)' size={26} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="backward" color='rgba(255,255,255,0.5)' size={26} />
            </TouchableOpacity>
            {isPlaying ? (
              <TouchableOpacity onPress={() => { }}>
                <FontAwesome5 name="pause-circle" color='rgba(255,255,255,0.5)' size={60} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => { }}>
                <FontAwesome5 name="play-circle" color='rgba(255,255,255,0.5)' size={60} />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="forward" color='rgba(255,255,255,0.5)' size={26} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="step-forward" color='rgba(255,255,255,0.5)' size={26} />
            </TouchableOpacity>

          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Text style={{ color: 'rgba(255,255,255,0.5)' }}>{value === undefined ? "0" : value < 60 ? "0" : Math.floor(value / 60000)}:{value === undefined ? "00" : Math.floor(value / 1000 - (Math.floor(value / 60000) * 60)) < 10 ? "0" + Math.floor(value / 1000 - (Math.floor(value / 60000) * 60)) : Math.floor(value / 1000 - (Math.floor(value / 60000) * 60))}</Text>
            <TouchableOpacity onPress={() => { }}>
              {/* <ProgressBar progress={0.5} color='pink' /> */}
              <Slider minimumTrackTintColor={hexColor?.data ? hexColor?.data : "#343434"} thumbTintColor={hexColor?.data ? hexColor?.data : "#343434"} step={1000} style={{ width: Dimensions.get('window').width * 0.5 }} minimumValue={0} maximumValue={maxValue} value={value} onSlidingComplete={(val) => setValueSlider(val)} />
            </TouchableOpacity>
            <Text style={{ color: 'rgba(255,255,255,0.5)' }}>{maxValue < 60 || maxValue === undefined ? "0" : Math.floor(maxValue / 60000)}:{maxValue === undefined ? "00" : Math.floor(maxValue / 1000 - (Math.floor(maxValue / 60000) * 60)) < 10 ? "0" + Math.floor(maxValue / 1000 - (Math.floor(maxValue / 60000) * 60)) : Math.floor(maxValue / 1000 - (Math.floor(maxValue / 60000) * 60))}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="heart" color='rgba(255,255,255,0.5)' size={26} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="random" color='rgba(255,255,255,0.5)' size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }}>
              <MaterialCommunityIcons name={repeat ? "repeat-once" : "repeat-variant"} color='rgba(255,255,255,0.5)' size={26} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="record-vinyl" color='rgba(255,255,255,0.5)' size={26} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => previousSong(actionPlayer.previous)}>
              <FontAwesome5 name="step-backward" color='white' size={26} />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipPrevious10Seconds}>
              <FontAwesome5 name="backward" color='white' size={26} />
            </TouchableOpacity>
            {isPlaying ? (
              <TouchableOpacity onPress={() => pauseSound()}>
                <FontAwesome5 name="pause-circle" color='white' size={60} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handlePlaySong()}>
                <FontAwesome5 name="play-circle" color='white' size={60} />
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={skipNext10Seconds}>
              <FontAwesome5 name="forward" color='white' size={26} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nextSong(actionPlayer.next)}>
              <FontAwesome5 name="step-forward" color='white' size={26} />
            </TouchableOpacity>

          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>{value === undefined ? "0" : value < 60 ? "0" : Math.floor(value / 60000)}:{value === undefined ? "00" : Math.floor(value / 1000 - (Math.floor(value / 60000) * 60)) < 10 ? "0" + Math.floor(value / 1000 - (Math.floor(value / 60000) * 60)) : Math.floor(value / 1000 - (Math.floor(value / 60000) * 60))}</Text>
            <TouchableOpacity onPress={() => { }}>
              {/* <ProgressBar progress={0.5} color='pink' /> */}
              <Slider minimumTrackTintColor={hexColor?.data ? hexColor?.data : "#343434"} thumbTintColor={hexColor?.data ? hexColor?.data : "#343434"} step={1000} style={{ width: Dimensions.get('window').width * 0.5 }} minimumValue={0} maximumValue={maxValue} value={value} onSlidingComplete={(val) => setValueSlider(val)} />
            </TouchableOpacity>
            <Text style={{ color: 'white' }}>{maxValue < 60 || maxValue === undefined ? "0" : Math.floor(maxValue / 60000)}:{maxValue === undefined ? "00" : Math.floor(maxValue / 1000 - (Math.floor(maxValue / 60000) * 60)) < 10 ? "0" + Math.floor(maxValue / 1000 - (Math.floor(maxValue / 60000) * 60)) : Math.floor(maxValue / 1000 - (Math.floor(maxValue / 60000) * 60))}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="heart" color='white' size={26} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="random" color='white' size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRepeat(!repeat)}>
              <MaterialCommunityIcons name={repeat ? "repeat-once" : "repeat-variant"} color='white' size={26} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { }}>
              <FontAwesome5 name="record-vinyl" color='white' size={26} />
            </TouchableOpacity>
          </View>
        </>
      )}

    </View>)
})


const Tab = createMaterialBottomTabNavigator();

const MyTabs = ({ navigation, song, setSong, setPlaylist, setList, list, setSound, playSound, setShowController, pack, setPack }) => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f7237b"
        inactiveColor='#bdbdbd'
        labelStyle={{ fontSize: 12 }}
        style={{ backgroundColor: 'tomato' }}
        barStyle={{ backgroundColor: 'black', height: 64 }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: 'Khám phá',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" color={color} size={20} />
            ),
          }}
        >
          {(props) => <Home {...props} song={song} setSong={setSong} setPlaylist={setPlaylist} setList={setList} list={list} setSound={setSound} playSound={playSound} setShowController={setShowController} pack={pack} setPack={setPack} />}
        </Tab.Screen>
        <Tab.Screen
          name="Search"
          options={{
            tabBarLabel: 'Tìm kiếm',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="search" color={color} size={20} />
            ),
          }}
        >
          {(props) => <Search {...props} setList={setList} song={song} setSong={setSong} setPack={setPack} setShowController={setShowController} setPlaylist={setPlaylist} />}
        </Tab.Screen>
        <Tab.Screen
          name="Chart"
          options={{
            tabBarLabel: 'Bảng xếp hạng',
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="chart-pie" color={color} size={20} />
            ),
          }}
        >
          {(props) => <Chart {...props} setList={setList} song={song} setSong={setSong} setPack={setPack} setShowController={setShowController} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const Stack = createNativeStackNavigator();

function AppMusic() {
  useKeepAwake()
  const dispatch = useDispatch()

  const songData = useSelector((state) => state.music.song)

  const [song, setSong] = useState()
  const [playlist, setPlaylist] = useState()

  const [list, setList] = useState([])
  const [sound, setSound] = useState();

  const [isPlaying, setIsPlaying] = useState(false)
  const [equal, setEqual] = useState(false)
  const [play, setPlay] = useState(false)

  const [maxValue, setMaxValue] = useState()
  const [maxTemp, setMaxTemp] = useState()

  const [repeat, setRepeat] = useState(false)

  const currentValue = useRef(0)

  const [focusPlayer, setFocusPlayer] = useState(false)

  const testSound = useRef(new Audio.Sound())
  const button = useRef()

  // const [info, setInfo] = useState()
  const [load, setLoad] = useState(true)

  const [showController, setShowController] = useState(false)

  const [pack, setPack] = useState('neverRender')

  const [actionPlayer, setActionPlayer] = useState({
    previous: {},
    next: {}
  })

  // useEffect(() => {
  //   button.current = setInterval(() => setMaxValueSlider(), 1000)

  //   return () => {
  //     clearInterval(button.current)
  //   }
  // }, [info])

  // useEffect(() => {
  //   console.log(repeat)
  //   console.log(equal)
  //   console.log(!repeat)
  //   console.log("------")
  // }, [repeat, equal])

  useEffect(() => {
    list?.map((item, idx) => {
      if (item.encodeId === song?.encodeId) {
        if (idx === 0 && list?.length >= 3)
          setActionPlayer({
            previous: list[list?.length - 1],
            next: list[idx + 1]
          })

        if (idx === list?.length - 1 && list?.length >= 3)
          setActionPlayer({
            previous: list[idx - 1],
            next: list[0]
          })

        if (idx === 0 && list?.length === 2)
          setActionPlayer({
            previous: list[list?.length - 1],
            next: list[list?.length - 1]
          })

        if (idx === list?.length - 1 && list?.length === 2)
          setActionPlayer({
            previous: list[0],
            next: list[0]
          })

        if (idx === 0 && list?.length === 1)
          setActionPlayer({
            previous: list[idx],
            next: list[idx]
          })

        if (idx > 0 && idx < list?.length - 1)
          setActionPlayer({
            previous: list[idx - 1],
            next: list[idx + 1]
          })
      }
    })
  }, [song])

  useEffect(() => {
    async function repeatSong() {
      await testSound.current.setPositionAsync(0)
    }
    if (repeat && equal) {
      repeatSong()
    }

    if (!repeat && equal) {
      nextSong(actionPlayer.next)
    }
  }, [repeat, equal, actionPlayer])

  useEffect(() => {
    setMaxValue(maxTemp)
  }, [maxTemp])

  useEffect(() => {
    if (play)
      setEqual(true)
    else
      setEqual(false)
  }, [play])


  useEffect(() => {
    if (songData?.data?.data[128] && pack === 'render') {
      button.current = setTimeout(() => playSound(songData?.data?.data[128]), 300)
    }

    return () => {
      clearTimeout(button.current)
    }
    // button.current.onPress()
  }, [songData, pack])

  // useEffect(() => {
  //   console.log(focusPlayer)
  // }, [focusPlayer])

  // useEffect(() => {
  //   onFetchUpdateAsync()
  // }, [])

  const nextSong = async (next) => {
    await testSound.current.setPositionAsync(0)
    await testSound.current.pauseAsync()
    setIsPlaying(true)
    if (!focusPlayer) {
      dispatch(getSong({ id: next?.encodeId }))
    }
    setSong(next)
    setPack('render')


  }

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false
  });



  const playSound = async (url) => {
    setIsPlaying(false)
    console.log('Loading Sound');
    setLoad(true)

    await testSound.current.unloadAsync()
    await testSound.current.loadAsync({
      uri: url
    })

    setSound(testSound.current);

    console.log('Playing Sound');
    setIsPlaying(true)
    await testSound.current.playAsync();
    setLoad(false)
  }

  const setMaxValueSlider = async () => {
    const result = await testSound.current.getStatusAsync();
    setMaxTemp(result.durationMillis ? result.durationMillis : 200000)
  }

  const getStatusAudio = async () => {
    const result = await testSound.current.getStatusAsync();
    if (result.durationMillis !== undefined && result.positionMillis !== undefined) {
      if (result.durationMillis !== result.positionMillis) {
        setPlay(false)
      }
      else {
        setPlay(true)
      }
    }
    else {
      setPlay(false)
    }
  }

  const pauseSound = async () => {
    setIsPlaying(false)
    await testSound.current.pauseAsync()
  }

  const continueSound = async () => {
    setIsPlaying(true)
    await testSound.current.playAsync()
  }

  const previousSong = async (previous) => {
    await testSound.current.setPositionAsync(0)
    await testSound.current.pauseAsync()
    setIsPlaying(true)
    setSong(previous)
    setPack('render')
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Dashboard'>
          {(props) => <MyTabs {...props} song={song} setSong={setSong} setPlaylist={setPlaylist} setList={setList} list={list} playSound={playSound} setSound={setSong} setShowController={setShowController} pack={pack} setPack={setPack} />}
        </Stack.Screen>
        <Stack.Screen name='Playlist'
          options={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_right'
          }}
        >
          {(props) => <Playlist {...props}
            setPlaylist={setPlaylist}
            setSound={setSound}
            song={song}
            setSong={setSong}
            playlist={playlist}
            list={list}
            setList={setList}
            playSound={playSound}
            setShowController={setShowController}
            setPack={setPack}
          />}
        </Stack.Screen>
        <Stack.Screen name='Player'>
          {(props) => <Player {...props}
            song={song}
            setSong={setSong}
            list={list}
            setList={setList}
            playSound={playSound}
            pauseSound={pauseSound}
            continueSound={continueSound}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            sound={sound}
            getStatusAudio={getStatusAudio}
            equal={equal}
            maxValue={maxValue}
            currentValue={currentValue.current}
            setMaxValueSlider={setMaxValueSlider}
            setShowController={setShowController}
            setFocusPlayer={setFocusPlayer}
          />}
        </Stack.Screen>

      </Stack.Navigator>
      {showController && (
        <PlayerController ref={testSound}
          maxValue={maxValue}
          playSound={playSound}
          pauseSound={pauseSound}
          continueSound={continueSound}
          equal={equal}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          song={song}
          list={list}
          setSong={setSong}
          pack={pack}
          setPack={setPack}
          repeat={repeat}
          setRepeat={setRepeat}
          actionPlayer={actionPlayer}
          nextSong={nextSong}
          getStatusAudio={getStatusAudio}
          load={load}
          setActionPlayer={setActionPlayer}
          previousSong={previousSong}

        />
      )}

    </NavigationContainer>
  );
}

export default function App() {
  // const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;

  // let playing = BackgroundTask.isRunning()

  // const toggleBackground = async () => {
  //   playing = !playing
  //   if (playing) {
  //     try {
  //       console.log('Trying to start background service')
  //       await BackgroundTask.start(taskRandom, options)
  //       console.log('Successful start')
  //     } catch (error) {
  //       console.log('Error: ', error)
  //     }
  //   }
  //   else {
  //     console.log('Stop background service')
  //     await BackgroundTask.stop()
  //   }
  // }
  return (
    <Provider store={store}>
      <AppMusic />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
