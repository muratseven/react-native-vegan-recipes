import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {SliderBox} from 'react-native-image-slider-box';
import BackButton from '../../components/BackButton/BackButton';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import LottieView from 'lottie-react-native';

const {width: viewportWidth} = Dimensions.get('window');

export default function RecipeScreen(props) {
  const {navigation, route} = props;

  const [Category, setcategory] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const colors = [
    '#0088FE',
    '#FF0000',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#676FA3',
    '#F14A16',
    '#FF7272',
    '#6998AB',
    '#B958A5',
    '#519259',
    '#F4BEEE',
    '#F3950D',
    '#FF0000',
    '#B4C6A6',
    '#8E05C2',
    '#2FDD92',
    '#E1578A',
    '#0088FE',
    '#FF0000',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#676FA3',
    '#F14A16',
    '#FF7272',
    '#6998AB',
    '#B958A5',
    '#519259',
    '#F4BEEE',
    '#F3950D',
    '#FF0000',
    '#B4C6A6',
    '#8E05C2',
    '#2FDD92',
    '#E1578A',
    '#0088FE',
    '#FF0000',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#676FA3',
    '#F14A16',
    '#FF7272',
    '#6998AB',
    '#B958A5',
    '#519259',
    '#F4BEEE',
    '#F3950D',
    '#FF0000',
    '#B4C6A6',
    '#8E05C2',
    '#2FDD92',
    '#E1578A',
  ];

  const slider1Ref = useRef();
  const item = route.params?.item;

  const getCategoryName = categoryId => {
    //get category name
    let name;
    Category.map(data => {
      if (data.id == categoryId) {
        //if category id is equal to the category id
        name = data.name;
      }
    });
    return name;
  };
  let User2 = () => {
    const categori = [];
    firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          categori.push(documentSnapshot.data());
          return setcategory(categori);
        });
      });
  };
  useEffect(() => {
    User2();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerTitleStyle: {
        justifyContent: 'center',
        color: '#2cd18a',
        backgroundColor: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        alignContent: 'center',
        marginTop: 12,
      },
      headerTransparent: 'true',
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []); // eslint-disable-line

  const renderImage = ({item, index}) => (
    <TouchableOpacity activeOpacity={1} key={index}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item}} />
      </View>
    </TouchableOpacity>
  );

  const renderDescription = item =>
    item.map((data, index) => {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={[
              styles.DescriptionContainer,
              {
                backgroundColor: colors[index],
              },
            ]}>
            <Text style={styles.DescriptionText}>{index + 1}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.flexDirection}>
              {data}
              {'\n'}
            </Text>
          </View>
        </View>
      );
    });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <SliderBox
            images={item.photosArray}
            sliderBoxHeight={250}
            // onCurrentImagePressed={index =>
            //   console.warn(`image ${index} pressed`)
            // }
            dotColor="rgba(0, 214, 131, 1)"
            inactiveDotColor="#90A4AE"
            // paginationBoxVerticalPadding={20}
            // autoplay={false}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={{
              position: 'absolute',
              bottom: -32,
              padding: 0,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: 'rgba(128, 128, 128, 0.92)',
            }}
            // ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
            imageLoadingColor="rgba(0, 214, 131, 1)"
          />
        </View>
      </View>
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => navigation.navigate('RecipesList', {title})}
            onPress={() => navigation.goBack()}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.category}>
                {getCategoryName(item.categoryId)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 12,
              }}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View style={{alignItems: 'center', marginRight: 12}}>
            <Image
              style={styles.infoPhoto}
              source={require('../../../assets/icons/time.png')}
            />
            <Text style={styles.infoRecipe}>{item.prepTime} min </Text>
            <Text style={{fontSize: 10, fontWeight: 'bold', marginLeft: 5}}>
              prep.{' '}
            </Text>
          </View>
          <View style={{alignItems: 'center', marginRight: 12}}>
            <Icon name="whatshot" size={24} color="black" />
            <Text style={styles.infoRecipe}>{item.cookTime} min</Text>
            <Text style={{fontSize: 10, fontWeight: 'bold', marginLeft: 5}}>
              cooking
            </Text>
          </View>
          <View style={{alignItems: 'center', marginRight: 12}}>
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={24}
              color="black"
            />
            <Text style={styles.infoRecipe}>{item.yield}</Text>
            <Text style={{fontSize: 10, fontWeight: 'bold', marginLeft: 5}}>
              servings
            </Text>
          </View>
          <View style={{alignItems: 'center', marginRight: 12}}>
            <IconIonicons name="ios-flag-sharp" size={24} color="black" />
            <Text style={styles.infoRecipe}>{item.cuisine}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              let ingredients = item.ingredients;
              let title = 'Ingredients for ' + item.title;
              navigation.navigate('IngredientsDetails', {
                ingredients,
                title,
                item,
              });
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 12,
          }}>
          {renderDescription(item.description)}
        </View>
      </View>
    </ScrollView>
  );
}
