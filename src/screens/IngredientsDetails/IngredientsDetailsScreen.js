import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IngredientsDetailsScreen(props) {
  const {navigation, route} = props;
  const item = route.params?.item;
  const itemYield = route.params?.item.yield;

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', item.title);
    } catch (e) {
      console.warn('Failed to save the data to the storage');
    }
  };
  const readData = async () => {
    try {
      const getTitle = await AsyncStorage.getItem('@storage_Key');

      if (getTitle !== item.title) {
        Interstitial();
        console.warn('get Title', getTitle);
        console.warn('item title', item.title);
      }
    } catch (e) {
      console.warn('Failed to get the data from the storage');
    }
  };
  useEffect(() => {
    readData();
    saveData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function Interstitial() {
    AdMobInterstitial.setAdUnitID('ca-app-pub???');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderIngredient = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={{
        flexDirection: 'row',
        margin: 5,
        flex: 1,
      }}
      activeOpacity={1}
      // onPress={() => onPressIngredient(item[0])}
    >
      <View style={styles.container}>
        <Icon
          style={{
            top: 16,
            left: 4,
            position: 'absolute',
          }}
          name="ellipse"
          size={10}
          color="#2cd18a"
        />
        <Text style={styles.title}>
          <Text style={styles.title}>{item}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor: '#2C272E', flex: 1}}>
      <Text style={styles.ingredientsText}>Ingredients</Text>
      <Text style={styles.servingsText}>{itemYield} servings</Text>
      <FlatList
        showsVerticalScrollIndicator={true}
        data={item.ingredients}
        renderItem={renderIngredient}
        keyExtractor={item => `${item}`}
      />
    </View>
  );
}
