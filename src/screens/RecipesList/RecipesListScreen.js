import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import {AdMobBanner} from 'react-native-admob';
import LottieView from 'lottie-react-native';

export default function RecipesListScreen(props) {
  const {navigation, route} = props;
  const [Category, setcategory] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  const [Recipes, setRecipes] = useState([]);
  const [paginateLimit, setPaginateLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isFetching, setisFetching] = useState(false);

  const item = route?.params?.category;
  const recipesArray = getRecipes(item.id);

  let User1 = () => {
    //get all ingredients
    const ingredi = [];
    let subscriber = firestore()
      .collection('ingredients')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          ingredi.push(documentSnapshot.data());
        });
        setIngredients(ingredi); //set all ingredients
        return () => subscriber();
      });
  };

  let User2 = () => {
    //get all categories
    const categori = [];
    let subscriber = firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          //get all categories
          categori.push(documentSnapshot.data()); //set all categories
        });
        setcategory(categori);
        return () => subscriber();
      });
  };
  let onRefresh = () => {
    Vibration.vibrate(1 * 300);
    setisFetching(true);
    User3();
    setisFetching(false);
  };

  let User3 = () => {
    const recipee = [];
    const subscriber = firestore()
      .collection('recipes') //get all recipes
      .orderBy('recipeId', 'asc') //order by recipeId
      // .startAfter(last.data().recipeId)
      // .limit(paginateLimit)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          //for each recipe
          recipee.push(documentSnapshot.data()); //push each recipe to the array
        });
        setRecipes(recipee); //set the array to the state
        return () => subscriber();
      });
  };

  useEffect(() => {
    User1(); //get all ingredients
    User2(); //get all categories
    User3(); //get all recipes
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        alignContent: 'center',
      },
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []); // eslint-disable-line

  const onPressRecipe = item => {
    navigation.navigate('Recipe', {item}); //navigate to recipe screen
  };

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

  function handleLoadMore() {
    setLoading(true);

    let limit = paginateLimit;
    setPaginateLimit(limit + 4); // increase page by 10
    User3();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // this.fetchUser(this.page); // method for API call
  }
  function getRecipes(categoryId) {
    const recipesArray1 = [];
    Recipes.map(data => {
      if (data.categoryId == categoryId) {
        recipesArray1.push(data);
      }
    });
    return recipesArray1;
  }

  const renderRecipes = ({item, index}) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.5}
      onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: item.photo_url}} />
        <ActivityIndicator
          style={{position: 'absolute', top: '40%', left: '40%', zIndex: -1}}
          size="large"
          color="#2cd18a"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <>
        {loading ? (
          <ActivityIndicator
            style={styles.loadMore}
            color="red"
            // style={{marginLeft: 8}}
          />
        ) : null}
      </>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipesArray}
        renderItem={renderRecipes}
        keyExtractor={item => `${item.recipeId}`}
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        onRefresh={() => onRefresh()}
        refreshing={isFetching}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingTop: 56,
        }}>
        <AdMobBanner
          adSize="smartBanner"
          adUnitID="ca-app-pub???"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      </View>
    </View>
  );
}
