import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  label: string,
  value: string,
  icon: keyof typeof MaterialCommunityIcons.glyphMap,
}

export const DetailItem: React.FC<Props> = ({ label, value, icon }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={24} color="rgba(255,255,255,0.7)" />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
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
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  value: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
