import React from 'react';
import { Modal, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

export const SearchView = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{ fontSize: 50 }}
          onPress={() => setModalVisible(!modalVisible)}>
          Search
        </Text>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Animated.View
          style={{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'orange',
          }}>
          <Text
            style={{ fontSize: 50 }}
            onPress={() => setModalVisible(!modalVisible)}>
            Modal
          </Text>
        </Animated.View>
      </Modal>
    </>
  );
};
