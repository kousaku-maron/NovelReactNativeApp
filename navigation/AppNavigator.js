import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation'
import { Icon } from 'expo'
import Colors from '../constants/Colors'
import WelcomeScreen from '../containers/WelcomeScreen'
import HomeScreen from '../containers/HomeScreen'
import WriteScreen from '../containers/WriteScreen'
import NovelScreen from '../containers/NovelScreen'
import ProfileScreen from '../containers/ProfileScreen'

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Novel: {
      screen: NovelScreen
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.palette.inherit,
      },
      headerTintColor: Colors.palette.primary.main,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? `ios-home`
              : 'md-home'
          }
          size={26}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.palette.primary.dark : Colors.palette.primary.light}
        />
      ),
    }),
  }
)

const WriteStack = createStackNavigator(
  {
    Write: {
      screen: WriteScreen
    },
  },
  {
    initialRouteName: "Write",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.palette.inherit,
      },
      headerTintColor: Colors.palette.primary.main,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Write',
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? 'ios-add'
              : 'md-add'
          }
          size={26}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.palette.primary.dark : Colors.palette.primary.light}
        />
      ),
    },
  }
)

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    },
  },
  {
    initialRouteName: "Profile",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.palette.inherit,
      },
      headerTintColor: Colors.palette.primary.main,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          name={
            Platform.OS === 'ios'
              ? 'ios-person'
              : 'md-person'
          }
          size={26}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.palette.primary.dark : Colors.palette.primary.light}
        />
      ),
    },
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Write: WriteStack,
    Profile: ProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.palette.primary.dark,
      inactiveTintColor: Colors.palette.primary.light,
      activeBackgroundColor: Colors.palette.inherit,
      inactiveBackgroundColor: Colors.palette.inherit,
    }
  }
)

const AppNavigator = createSwitchNavigator({
    Welcome: {
      screen: WelcomeScreen,
    },
    Main: TabNavigator,
})

export default AppNavigator
