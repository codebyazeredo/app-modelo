import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { getAppTabs } from '@config/modules.config';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const tabs = getAppTabs();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarIcon: ({ color, size }) => {
          const tab = tabs.find((t) => t.name === route.name);
          return <MaterialCommunityIcons name={tab?.icon ?? 'circle'} size={size} color={color} />;
        },
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} options={{ title: tab.label }} />
      ))}
    </Tab.Navigator>
  );
}
