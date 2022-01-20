import {StyleSheet, Dimensions} from 'react-native';
// screen sizing
const {width, height} = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const RECIPE_ITEM_HEIGHT = 100;
const RECIPE_ITEM_OFFSET = 10;
const RECIPE_ITEM_MARGIN = RECIPE_ITEM_OFFSET * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    margin: RECIPE_ITEM_OFFSET,
    marginTop: 30,
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    // height: RECIPE_ITEM_HEIGHT + 60,
  },
  servingsText: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '500',
    paddingLeft: 16,
    marginVertical: 4,
  },
  ingredientsText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    margin: 4,
    paddingTop: 8,
    paddingLeft: 12,
  },
  title: {
    margin: 10,
    marginBottom: 2,
    marginLeft: 32,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  photo: {
    width:
      (SCREEN_WIDTH - RECIPE_ITEM_MARGIN) / numColumns - RECIPE_ITEM_OFFSET,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 60,
  },
});

export default styles;
