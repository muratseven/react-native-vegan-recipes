import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import styles from './styles';
import categoriesStyles from './categoriesStyles';
import {TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LottieView from 'lottie-react-native';
import {AdMobBanner} from 'react-native-admob';

export default function SearchScreen(props) {
  const {navigation} = props;

  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [Categories, setCategory] = useState([]);
  const [status, setStatus] = useState(404);
  const [loading, setLoading] = useState(false);
  const [Recipes, setRecipes] = useState([]);

  useEffect(() => {
    User2(); //get all recipes
    User(); //get all categories
  }, []);

  useLayoutEffect(() => {
    value == '' ? Keyboard.dismiss() : null;
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
      headerLeft: () => <View />,
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <Image
            style={styles.searchIcon}
            source={require('../../../assets/icons/search.png')}
          />
          <TextInput
            placeholder="Search Recipes"
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={value}
          />
          {value == '' ? (
            <Pressable onPress={() => handleSearch('')}></Pressable>
          ) : (
            <Pressable onPress={() => handleSearch('')}>
              <Image
                style={styles.searchIcon}
                source={require('../../../assets/icons/close.png')}
              />
            </Pressable>
          )}
        </View>
      ),
      headerRight: () => <View />,
    });
  }, [value]); // eslint-disable-line

  let User = () => {
    const arraycategor = [];
    setLoading(true);
    firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          arraycategor.push(documentSnapshot.data()); // <-- push the data to the array
        });
        setCategory(arraycategor);
        setStatus(200); // <-- set the status to 200
        setTimeout(() => {
          // ^-- wait for 2 seconds
          setLoading(false);
        }, 1400);
      });
    // Stop listening for updates when no longer required
  };

  const User2 = () => {
    const arrayReci = [];
    firestore()
      .collection('recipes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          arrayReci.push(documentSnapshot.data()); // push each document to the array
          setRecipes(arrayReci);
        });
        setRecipes(arrayReci); // set the array to the state
      });
  };

  const handleSearch = text => {
    setValue(text);
    var recipeArray1 = getRecipeByRecipeName(text);
    var recipeArray2 = getRecipesByCategoryName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];

    if (text == '') {
      //if the search is empty, show all the Categories
      setData([]);
    } else {
      //if the search is not empty, show the Recipes that match the search
      setData(recipeArray);
    }
  };

  const onPressRecipe = item => {
    // onPressRecipe function
    navigation.navigate('Recipe', {item}); // <-- navigate to the RecipeScreen
  };
  const getRecipeByRecipeName = recipeName => {
    const nameUpper = recipeName.toUpperCase(); // <-- convert the search to uppercase
    const recipesArray = [];
    Recipes.map(recipe => {
      if (recipe.title.toUpperCase().includes(nameUpper)) {
        // <-- if the title of the recipe contains the search
        recipesArray.push(recipe); // push the data to the array
      }
    });
    return recipesArray;
  };
  const getRecipesByCategoryName = name => {
    // get the Recipes by Category Name
    const nameUpper = name.toUpperCase();
    const recipesArray1 = [];
    Categories.map(Category => {
      if (Category.name.toUpperCase().includes(nameUpper)) {
        const recipes = getRecipes(Category.id); // return a vector of recipes
        recipes.map(item => {
          recipesArray1.push(item); // push each recipe to the array
        });
      }
    });
    return recipesArray1;
  };
  const getRecipes = categoryId => {
    // return a vector of recipes
    const recipesArray = [];
    Recipes.map(recipe => {
      if (recipe.categoryId == categoryId) {
        // if the categoryId of the recipe is the same as the categoryId of the category
        recipesArray.push(data); // push the data to the array
      }
    });
    return recipesArray;
  };
  const getCategoryName = categoryId => {
    let name;
    Categories.map(Category => {
      if (Category.id == categoryId) {
        // if the categoryId of the category is the same as the categoryId of the recipe
        name = data.name;
      }
    });
    return name;
  };
  const getNumberOfRecipes = recipesId => {
    // get the number of recipes
    let count = 0;
    Recipes.map(recipe => {
      // loop through the recipes
      if (recipe.categoryId == recipesId) {
        // if the categoryId of the recipe is the same as the categoryId of the category
        count++;
      }
    });
    return count;
  };
  const renderRecipes = ({item}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{uri: item.photo_url}} />
        <LottieView
          autoPlay
          source={require('../../../assets/path/loading.json')}
          progress={1}
          size={550}
          style={{position: 'absolute', top: '-12%', left: '5%', zIndex: -1}}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableOpacity>
  );
  const onPressCategory = item => {
    // onPressCategory function
    const title = item.name;
    const category = item;
    navigation.navigate('RecipesList', {category, title}); // <-- navigate to the RecipesListScreen
  };

  const renderCategory = ({item}) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressCategory(item)}>
      <View style={categoriesStyles.categoriesItemContainer}>
        <Image
          style={categoriesStyles.categoriesPhoto}
          source={{uri: item.photo_url}}
        />
        <LottieView
          autoPlay
          source={require('../../../assets/path/loading.json')}
          progress={1}
          size={550}
          style={{position: 'absolute', top: '-12%', left: '5%', zIndex: -1}}
        />
        <Text style={categoriesStyles.categoriesName}>{item.name}</Text>
        <Text style={categoriesStyles.categoriesInfo}>
          {getNumberOfRecipes(item.id)} recipes
        </Text>
      </View>
    </TouchableOpacity>
  );

  return value == '' ? ( // if the search is empty
    status != 400 && !loading ? ( // <-- if the status is not 400 and the loading is false
      <>
        <FlatList
          data={Categories}
          renderItem={renderCategory}
          keyExtractor={item => `${item.id}`}
        />
        <View style={{justifyContent: 'flex-end'}}>
          <AdMobBanner
            adSize="smartBanner"
            adUnitID="ca-app-pub???"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      </>
    ) : (
      <View style={{flex: 1, zIndex: 10}}>
        <LottieView
          autoPlay
          source={require('../../../assets/path/loading.json')}
          progress={1}
          style={{zIndex: 10}}
        />
        {Categories.map(none => {
          return (
            <SkeletonPlaceholder>
              <View style={styles.SkeletonPlaceholder}>
                <View style={styles.marginLeft}>
                  <View style={styles.SkeletonPlaceholderPhoto} />
                  <View style={styles.SkeletonPlaceholderTitle} />
                  <View style={styles.SkeletonPlaceholderCategory} />
                </View>
              </View>
            </SkeletonPlaceholder>
          );
        })}
      </View>
    )
  ) : (
    <View style={{flex: 1}}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={data}
        renderItem={renderRecipes}
        keyExtractor={item => `${item.recipeId}`}
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
