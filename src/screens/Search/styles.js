import {StyleSheet} from 'react-native';
import {RecipeCard} from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  SkeletonPlaceholder: RecipeCard.SkeletonPlaceholder,
  marginLeft: RecipeCard.marginLeft,
  SkeletonPlaceholderPhoto: RecipeCard.SkeletonPlaceholderPhoto,
  SkeletonPlaceholderTitle: RecipeCard.SkeletonPlaceholderTitle,
  SkeletonPlaceholderCategory: RecipeCard.SkeletonPlaceholderCategory,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    width: 350,
    height: 40,
    justifyContent: 'space-around',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  searchInput: {
    backgroundColor: '#EDEDED',
    color: 'black',
    width: 180,
    height: 40,
    marginRight: 50,
  },
});

export default styles;
