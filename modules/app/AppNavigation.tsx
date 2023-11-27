import React from "react";
import { navigationRef } from "@modules/core";
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import { Screens } from "@modules/common";
import { LoginPage } from "@modules/auth";

const screenOptions: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerShadowVisible: true,
  headerShown: false,
};

const NavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const Stack = createNativeStackNavigator();

const AppNavigation = ({ initialRouteName }: any) => {
  return (
    <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
      <Stack.Navigator
        initialRouteName={Screens.LOGIN}
        screenOptions={screenOptions}
      >
        <Stack.Screen name={Screens.LOGIN} component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
