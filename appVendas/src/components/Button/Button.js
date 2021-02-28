
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ label }) {
  return (
    <TouchableOpacity activeOpacity={0.8}  >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

