import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, FlatList, Button } from 'react-native';

const FindScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = () => {
    if (searchKeyword.trim() !== '') {
      setSearchHistory([...searchHistory, searchKeyword]);
      setSearchKeyword('');
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icon/back.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.findnav}>
          <Image
            source={require('../../assets/icon/dsearch.png')}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder='Tìm kiếm'
            style={styles.inputText}
            value={searchKeyword}
            onChangeText={(text) => setSearchKeyword(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icon/qr.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Mini Apps bạn có thể tìm */}
      <View style={styles.minibar}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 20 }}>Mini Apps bạn có thể tìm</Text>
        <TouchableOpacity style={{ left: '43%', width: 30, height: 30 }}>
          <Image
            source={require('../../assets/icon/close.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.itembar}>
          <TouchableOpacity>
            <Image style={styles.item} source={require('../../assets/icon/zmelody.jpg')} />
            <Text style={styles.input}>Nhạc chờ {"\n"}Zmelody</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itembar}>
          <TouchableOpacity>
            <Image style={styles.item} source={require('../../assets/icon/zalopay.png')} />
            <Text style={styles.input}>Zalo Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Truy cập nhanh */}
      <View style={styles.minibar}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 20 }}>Truy cập nhanh</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.itembar}>
          <TouchableOpacity>
            <Image style={styles.item} source={require('../../assets/icon/zalovideo.jpg')} />
            <Text style={styles.input}>Zalo video</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Từ khóa đã tìm */}
      <View style={styles.historysearch}>
        <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 20 }}>Từ khóa đã tìm</Text>
        {searchHistory.length > 0 && (
          <View>
            <FlatList
              data={searchHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => console.log(item)}>
                  <Text style={styles.historyItem}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <TouchableOpacity style={{ flexDirection: 'row',marginTop:10  }} onPress={clearSearchHistory}>
          <Text style={{ color: '#4fabf4', marginLeft: 20, textAlign: 'center',}}>Chỉnh sửa lịch sử tìm kiếm</Text>
          <Image source={require('../../assets/icon/next_move.png')} />
        </TouchableOpacity>

       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  navbar: {
    height: 50,
    backgroundColor: '#009bf8',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  
  },
  findnav: {
    backgroundColor: '#fff',
    height: 30,
    width: '70%',
    borderRadius: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    marginTop: 10,
    flexDirection: 'row',
  },
  minibar: {
    marginTop: 20,
    flexDirection: 'row',
  },
  itembar: {
    marginLeft: 10,
    flexDirection: 'row',
    paddingLeft: 15,
  },
  item: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  historysearch: {
    height: 300,
    marginTop: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  inputText: {
    flex: 1,
    height: 30,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  input: {
    textAlign: 'center',
  },
  historyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
  },
  historyItem: {
    marginLeft: 20,
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
});

export default FindScreen;
