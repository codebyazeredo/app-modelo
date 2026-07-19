import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { emptyWrap, emptyIconWrap, emptyTitle, emptySubtext } from '../styles/common';

export default function EmptyState({ icon = 'inbox-outline', title, subtitle }) {
  return (
    <View style={emptyWrap}>
      <View style={emptyIconWrap}>
        <MaterialCommunityIcons name={icon} size={36} color={colors.primary} />
      </View>
      <Text style={emptyTitle}>{title}</Text>
      {subtitle ? <Text style={emptySubtext}>{subtitle}</Text> : null}
    </View>
  );
}
