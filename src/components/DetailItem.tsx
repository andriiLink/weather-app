import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  label: string,
  value: string,
  textColor: string,
  icon: keyof typeof MaterialCommunityIcons.glyphMap,
}

export const DetailItem: React.FC<Props> = ({ label, value, textColor, icon }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={24} color={textColor} />
      <View style={styles.textContainer}>
        <Text style={[styles.label, {color: textColor}]}>{label}</Text>
        <Text style={[styles.value, {color: textColor}]}>{value}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    minWidth: '45%',
  },
  textContainer: {
    marginLeft: 10,
  },
  label: {
    opacity: 0.6,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
