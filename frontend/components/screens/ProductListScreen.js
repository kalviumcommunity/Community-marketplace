// /screens/Home/ProductDetailScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  // Extract product data from navigation params with fallback dummy data
  const { product } = route.params || {};
  
  // State for size and color selection
  const [selectedSize, setSelectedSize] = useState('US 7');
  const [selectedColor, setSelectedColor] = useState('#8A2BE2'); // Purple
  
  // Dummy product data for testing
  const productData = product || {
    id: 'prod123',
    name: 'VividFlow Sport Shoes',
    price: 99.99,
    imageURL: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    rating: 4.5,
    reviewCount: 128,
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    colors: [
      { name: 'Blue', value: '#007BFF' },
      { name: 'Red', value: '#FF4757' },
      { name: 'Green', value: '#2ED573' },
      { name: 'Yellow', value: '#FFA502' },
    ],
    details: [
      { title: 'Product Description', content: 'Premium sport shoes designed for comfort and performance' },
      { title: 'Material', content: 'High-quality synthetic leather with breathable mesh' },
      { title: 'Weight', content: '280g per shoe (size US 9)' },
      { title: 'Features', content: 'Anti-slip sole, shock absorption, lightweight design' },
      { title: 'Care Instructions', content: 'Clean with damp cloth, air dry only' }
    ],
    reviews: [
      {
        id: 1,
        name: 'Alex R.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        comment: 'Absolutely love these shoes! They\'re incredibly comfortable for my daily runs and look great. The cushioning is perfect for long wear. Highly recommend for anyone looking for stylish and functional footwear.'
      },
      {
        id: 2,
        name: 'Maria S.',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b372?w=40&h=40&fit=crop&crop=face',
        comment: 'Good quality for the price. They are quite comfortable, though I found the sizing a bit snug. Order half a size up if you prefer more room. The colors are vibrant and true to the pictures.'
      },
      {
        id: 3,
        name: 'John D.',
        rating: 4,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        comment: 'Solid pair of shoes. Comfortable for casual walks and light sports. The design is sleek and modern. Durability seems good so far after a month of use. Would buy again.'
      }
    ],
    similarProducts: [
      {
        id: 'sim1',
        name: 'GlideFun Pro',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=150&h=150&fit=crop',
        rating: 4.2
      },
      {
        id: 'sim2',
        name: 'UrbanStride',
        price: 72.50,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
        rating: 4.0
      }
    ]
  };

  const [expandedDetails, setExpandedDetails] = useState({});

  const toggleDetail = (index) => {
    setExpandedDetails(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i}>★</Text>);
    }
    if (hasHalfStar) {
      stars.push(<Text key="half">☆</Text>);
    }
    
    return stars;
  };

  const renderSizeOption = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.sizeButton, 
        selectedSize === item && styles.selectedSizeButton
      ]}
      onPress={() => setSelectedSize(item)}
    >
      <Text style={[
        styles.sizeText,
        selectedSize === item && styles.selectedSizeText
      ]}>{item}</Text>
    </TouchableOpacity>
  );

  const renderColorOption = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.colorButton,
        { backgroundColor: item.value },
        selectedColor === item.value && styles.selectedColorButton
      ]}
      onPress={() => setSelectedColor(item.value)}
    >
    </TouchableOpacity>
  );

  const renderDetailItem = ({ item, index }) => (
    <View style={styles.detailItem}>
      <TouchableOpacity 
        style={styles.detailHeader}
        onPress={() => toggleDetail(index)}
      >
        <Text style={styles.detailTitle}>{item.title}</Text>
        <Text style={styles.detailArrow}>{expandedDetails[index] ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expandedDetails[index] && (
        <Text style={styles.detailContent}>{item.content}</Text>
      )}
    </View>
  );

  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.avatar }} style={styles.reviewAvatar} />
        <View>
          <Text style={styles.reviewName}>{item.name}</Text>
          <View style={styles.reviewStars}>
            {renderStars(item.rating)}
          </View>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  const renderSimilarProduct = ({ item }) => (
    <View style={styles.similarProductItem}>
      <Image source={{ uri: item.image }} style={styles.similarProductImage} />
      <Text style={styles.similarProductName}>{item.name}</Text>
      <Text style={styles.similarProductPrice}>${item.price}</Text>
      <View style={styles.similarProductStars}>
        {renderStars(item.rating)}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: productData.imageURL }} 
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      {/* Product Info */}
      <View style={styles.productInfoContainer}>
        <Text style={styles.productName}>{productData.name}</Text>
        <Text style={styles.productPrice}>${productData.price}</Text>
      </View>

      {/* Size Selection */}
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Size</Text>
        <FlatList
          data={productData.sizes}
          horizontal
          renderItem={renderSizeOption}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={styles.selectionList}
        />
      </View>

      {/* Color Selection */}
      <View style={styles.selectionContainer}>
        <Text style={styles.selectionTitle}>Select Color</Text>
        <FlatList
          data={productData.colors}
          horizontal
          renderItem={renderColorOption}
          keyExtractor={(item) => item.name}
          showsHorizontalScrollIndicator={false}
          style={styles.selectionList}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Details & Specifications */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Details & Specifications</Text>
        <FlatList
          data={productData.details}
          renderItem={renderDetailItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Customer Reviews */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        <View style={styles.reviewSummary}>
          <Text style={styles.ratingNumber}>{productData.rating}</Text>
          <View style={styles.ratingStars}>
            {renderStars(productData.rating)}
          </View>
          <Text style={styles.reviewCount}>({productData.reviewCount} reviews)</Text>
        </View>
        
        <FlatList
          data={productData.reviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </View>

      {/* Similar Products */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Similar Products</Text>
        <FlatList
          data={productData.similarProducts}
          horizontal
          renderItem={renderSimilarProduct}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.similarProductsList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 250,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfoContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
  selectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  selectionList: {
    marginBottom: 5,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedSizeButton: {
    backgroundColor: '#8A2BE2',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  selectedSizeText: {
    color: '#fff',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColorButton: {
    borderColor: '#333',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  addToCartButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buyNowButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailArrow: {
    fontSize: 12,
    color: '#666',
  },
  detailContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  ratingStars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  reviewItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  similarProductsList: {
    marginTop: 5,
  },
  similarProductItem: {
    width: 120,
    marginRight: 15,
  },
  similarProductImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 4,
  },
  similarProductStars: {
    flexDirection: 'row',
  },
});

export default ProductDetailScreen;