import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';

export default function IngredientScreen(props) {
  const {navigation, route} = props;

  const ingredientId = route.params?.ingredient;
  // const ingredientUrl = getIngredientUrl(ingredientId);
  const ingredientName = route.params?.name;
  const [Ingredients, setIngredients] = useState([]);
  const [Category, setcategory] = useState([]);
  const [Recipes, setRecipes] = useState([]);

  useEffect(() => {
    // console.log(ingredientId);
    User1();
    User2();
    User3();
  }, []);

  const getRecipesByIngredient = ingredientId => {
    const recipesArray = [];
    // Recipes.map(data => {
    //   data.ingredients.map(index => {
    //     if (index[0] == ingredientId) {
    //       recipesArray.push(data);
    //     }
    //   });
    // });
    return recipesArray;
  };
  let User1 = () => {
    const ingredi = [];
    let subscriber = firestore()
      .collection('ingredients')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          ingredi.push(documentSnapshot.data());
        });
        setIngredients(ingredi);
        return () => subscriber();
      });
  };
  let User2 = () => {
    const categori = [];
    let subscriber = firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          categori.push(documentSnapshot.data());
        });
        setcategory(categori);
        return () => subscriber();
      });
  };
  let User3 = () => {
    const recipee = [];
    firestore()
      .collection('recipes')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          recipee.push(documentSnapshot.data());
        });
        setRecipes(recipee);
      });
  };
  const getCategoryName = categoryId => {
    let name;
    Category.map(data => {
      if (data.id == categoryId) {
        name = data.name;
      }
    });
    return name;
  };

  const getIngredientUrl = ingredientId => {
    let name;
    Ingredients.map(data => {
      // return console.log('dataa', data, 'ingredientId', ingredientId);
      if (data.ingredientId == ingredientId) {
        name = data.name;
      }
    });
    return name;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
    });
  }, []);

  const onPressRecipe = item => {
    navigation.navigate('Recipe', {item});
  };

  const renderRecipes = ({item}) => (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPressRecipe(item)}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{uri: item.photo_url}} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>
            {getCategoryName(item.categoryId)}
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View
        style={{
          borderBottomWidth: 0.4,
          marginBottom: 10,
          borderBottomColor: 'grey',
        }}>
        {/* <Image
          style={styles.photoIngredient}
          source={{uri: '' + ingredientUrl}}
        /> */}
      </View>
      {/* <Text style={styles.ingredientInfo}>Recipes with {ingredientName}:</Text> */}
      <View>
        {/* <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          // data={getRecipesByIngredient(ingredientId)}
          renderItem={renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        /> */}
      </View>
    </ScrollView>
  );
}
