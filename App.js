import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,TextInput,Alert,AsyncStorage,Slider,ScrollView,Modal,Dimensions,Picker} from 'react-native';
import {createDrawerNavigator,DrawerItemList,DrawerContentScrollView } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import  * as Location from 'expo-location';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import StarRating from 'react-native-star-rating';
import { Carousel } from 'react-native-carousel'
// var Carousel = require('react-native-carousel');

{/*This is The Home Page*/}
function Home({navigation,route}){
    const [inputfind,setInputFind] = useState(null);
    const [newJob1,setNewJob1] = useState(null);
    AsyncStorage.setItem('leloemail',route.params?.sname);
    AsyncStorage.setItem('jobnew',route.params?.company_name);
    useEffect(() => {
        AsyncStorage.getItem('leloemail').then(
            (value) =>{
                if(value==''){
                    setInputFind(null);
                }
                else
                {
                    setInputFind(value);
                }
            }
            );
        AsyncStorage.getItem('jobnew').then(
            (value) =>{
                if(value==''){
                    setNewJob1(null);
                }
                else
                {
                    setNewJob1(value);
                }
            }
            );
    }, [route.params?.sname,route.params?.company_name]);
    return(
        <View style={styles.container}>
        <View style={styles.header}>
        <View style={{flex:2,flexDirection:'row',paddingTop:10}}>
        <View style={{flex:1,paddingLeft:20,alignItems:'flex-start'}}>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
        <Icon name="align-justify" size={30} color="#000000" />
        </TouchableOpacity>
        </View>
        <View style={{flex:1.5,alignItems:'flex-start'}}><Text style={styles.input} >Toss</Text></View>
        </View>
        </View>
    {/*THis is From The main Content*/}
    <View style={styles.content}>
    <View style={styles.first}>
    <View style={{alignItems:'center',paddingBottom:10}}>
    <Text style={styles.defaultFontSize}>Browse Job</Text>
    </View>
    <View style={{paddingBottom:30}}>
    <Text style={{fontSize:20}}>Find Out the Types of</Text>
    <Text style={{fontSize:20}}>Jobs we Offer.Begin</Text>
    <Text style={{fontSize:20}}>Now</Text>
    </View>
    <View>
    <Button
    title="Find a Job"
    color="#654321"
    onPress={ ()=> {
        if(inputfind !== null){
            navigation.navigate('root',{screen:'jobo'});
        }
        else if(inputfind == null){
            navigation.navigate('root',{screen:'Findsign'});
        }
    }}
    />
    </View>
{/*This is THe first Content The End*/}
</View>
{/*This is The Second*/}
<View><Text></Text></View>

<View style={styles.second}>
<View style={{alignItems:'center',paddingBottom:10}}>
<Text style={styles.defaultFontSize}>Fill Shift</Text>
</View>
<View style={{paddingBottom:30}}>
<Text style={{fontSize:20}}>Start Hiring now and</Text>
<Text style={{fontSize:20}}>get your work done.</Text>
<Text style={{fontSize:20}}>Get Started</Text>
</View>
<View>
<Button
title="Post a Job"
color='#654321'
onPress={()=>{
    if(newJob1 !== null){
        navigation.navigate('root',{screen:'newJob'});
    }
    else if(newJob1 == null ){
        navigation.navigate('root',{screen:'Post'});
    }
} }
/>
</View>
</View>
{/*Container and Content*/}
</View>
</View>
);
}
{/* Here is The Job List */}
function joblist({navigation,route}){
    const [data,setData] = useState();
    const [joblisto,setJoblisto] = useState([]);
    useEffect(() => {
        fetch('http://tossipro.xyz/show.php',{
            method: 'GET',
        }).then((response)=>response.json())
        .then((responseJson)=>{
            setJoblisto(responseJson);
        })
        .catch((error) => {
            console.log(error)
        });
        AsyncStorage.getItem('leloemail').then(
            (value) =>{
                setData(value);
            }
            );
    }, []);

    function check(jobname,category,reciptant,worker_requi,venue,address,pin,start_time,estimate,payper,total_pay){
        navigation.navigate('root', {
            screen: 'appo',
            params: { job_name: jobname , cate:category , reci : reciptant , workerrequi:worker_requi , ven : venue , addr : address , pino : pin , starttimo: start_time, esto : estimate , payo : payper , tota : total_pay  }
        });

    }
    return(
        <View style={styles.container}>
        <ScrollView>
        {joblisto.map((val,key)=><TouchableOpacity style={{justiyContent:'center',alignItems:'center',borderWidth:2,paddingBottom:10,marginBottom:10}}  key={key} onPress={ check.bind(this,val.job_name,val.category,val.reciptant,val.worker_requi,val.venue,val.address,val.pin,val.start_time,val.estimate_job_time,val.pay_per_persion,val.total_pay)  }   >
            <View style={{flex:2,flexDirection:'row'}}>
            <View style={{flex:2,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{val.job_name}</Text>
            <Text style={{fontSize:15}}>{val.category}</Text>
            </View>
            <View style={{flex:2,alignItems:'center'}}>
            <Text>{ val.estimate_job_time }</Text>
            <Text>{val.pay_per_persion}</Text>
            </View>
            </View>
            </TouchableOpacity>)}
        </ScrollView>
        </View>
        );
}
{/*This is The Apply For The New Job */}
function apply({navigation,route}){
    const [usename,setUseName] = useState();
    const [fnamoo,setFnamoo] = useState();
    const [lnamoo,setlnamoo] = useState();
    const [contactoo,setContactoo] = useState();
    //data variable
    var jobnamo = route.params?.job_name;
    var cate = route.params?.cate;
    var recip = route.params?.reci;
    var workerr = route.params?.workerrequi;
    var venu = route.params?.ven;
    var addro = route.params?.addr;
    var pinoo = route.params?.pino;
    var starto = route.params?.starttimo;
    var estoo = route.params?.esto;
    var paayo = route.params?.payo;
    var totaa = route.params?.tota;
    useEffect(() => {

        AsyncStorage.getItem('leloemail').then(
            (value) =>{
                setUseName(value);
            }
            );

        AsyncStorage.getItem('fnamo').then(
            (value) =>{
                setFnamoo(value);
            }
            );
        AsyncStorage.getItem('lnamo').then(
            (value) =>{
                setlnamoo(value);
            }
            );
        AsyncStorage.getItem('contacto').then(
            (value) =>{
                setContactoo(value);
            }
            );

    }, []);
    function send(){
        fetch('http://tossipro.xyz/fname.php',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                jobname : jobnamo,
                fname : fnamoo,
                lname : lnamoo,
                contact : contactoo,
                email: usename,
            })
        }).then((response)=>response.json()).
        then((responseJson)=>{

            navigation.navigate('root',{screen:'Applied',params:{mess: responseJson}})

        }).
        catch((err)=>{
            console.error(err);
        });
    }

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    {/* There is The Maine Data now*/}
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}> Job Name:  </Text>
    <Text style={{fontSize:30}}>{ jobnamo  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}> Job Category: </Text>
    <Text style={{fontSize:30}}>{ cate  }</Text>
    </View>


    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}> Reciptant: </Text>
    <Text style={{fontSize:30}}>{ recip  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}>Worker Requi: </Text>
    <Text style={{fontSize:30}}>{ workerr  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}>Venue: </Text>
    <Text style={{fontSize:30}}>{ venu  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}>Address: </Text>
    <Text style={{fontSize:30}}>{ addro  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}>pin: </Text>
    <Text style={{fontSize:30}}>{ pinoo  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}>Start Time: </Text>
    <Text style={{fontSize:30}}>{ starto      }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}> Estimate: </Text>
    <Text style={{fontSize:30}}>{ estoo  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}>Pay Per Persion: </Text>
    <Text style={{fontSize:30}}>{ paayo  }</Text>
    </View>

    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
    <Text style={{fontSize:30,fontStyle:'italic'}}>Total pay: </Text>
    <Text style={{fontSize:30}}>{ totaa  }</Text>
    </View>

    <TouchableOpacity style={styles.confirm} onPress={send}>
    <Text style={styles.t1}>Apply</Text>
    </TouchableOpacity>

    </View>
    );
}

function thatsall({navigation,route}){

    var message = route.params?.mess;

    return(
        <View style={{flex:0.8,justifyContent:'center',alignItems:'center'}}>
        <Icon name="check" size={100} color="#3498db" />
        <Text style={{fontSize:25,fontWeight:'bold'}}>{ message  }</Text>

        <Text style={{fontSize:20,fontStyle:'italic',marginTop:30}}>Please wait up to 4 hrs for confirmation</Text>

        <TouchableOpacity style={{marginTop:50,backgroundColor:'#654321',paddingLeft:'20%',paddingRight:'20%',marginBottom:'4%',borderRadius:5,}} onPress={()=>{ Alert.alert("Work is Completed");  }}>
        <Text style={styles.t1}>Review this job</Text>
        </TouchableOpacity>



        </View>


        );

}

{/*sign Up for the User*/}
function findsign({navigation}){
    const [fName,setFName] = useState();
    const [lName,setlName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [contact,setContact] = useState();
    function send(){
        const Fullname = fName;
        const lastname = lName;
        const Email = email;
        const Password = password;
        const Contact = contact;
        AsyncStorage.setItem('fnamo',fName);
        AsyncStorage.setItem('lnamo',lName);
        AsyncStorage.setItem('contacto',contact);

        fetch('http://tossipro.xyz/insert.php',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                firstName  :  Fullname,
                lastname : lastname,
                email : Email,
                pass : Password,
                con : Contact,
            })
        }).then((response)=>response.json()).
        then((responseJson)=>{
            Alert.alert(responseJson);
            navigation.navigate('home', {sname: Email });
            navigation.navigate('root', {screen: 'jobo' });
        }).
        catch((err)=>{
            console.error(err);
        });
    }
    return(
        <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.sign}>
        <Text style={{fontSize:30,fontWeight:'bold', paddingBottom:10 }}>SignUp</Text>
        <TextInput
        style={styles.text}
        placeholder="First Name"
        onChangeText={(text)=>{
            setFName(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Last Name"
        onChangeText={(text)=>{
            setlName(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="E-mail"
        onChangeText={(text)=>{
            setEmail(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Password"
        onChangeText={(text)=>{
            setPassword(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Confirm Password"
        />
        <TextInput
        style={styles.text}
        placeholder="Contact Number"
        onChangeText={(text)=>{
            setContact(text);
        }}
        />
        <View>
        <TouchableOpacity style={styles.confirm} onPress={send}>
        <Text style={styles.t1}>Confirm</Text>
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAwareScrollView>
        );
}
{/*This is for new application for new Job*/}
function newJob({navigation}){
    const [compo,setCompo] = useState();
    const [job_name,setJob_name] = useState();
    const [cate,setCate] = useState();
    const [reci,SetReci] = useState();
    const [workerrequ,setWorkerRequ] = useState("1");
    const [venue,setVenue] = useState();
    const [addr,setAddr] = useState();
    const [pin,setPin] = useState();
    const [start_time,setStart_Time] = useState();
    const [duration,setDuration] = useState();
    const [persion,setPersion] = useState();
    const [totalpay,setTotalPay] = useState();
    AsyncStorage.getItem('jobnew').then(
        (value) => {
            setCompo(value);
        }
        )


    const [location,setLocation] = useState(null);
    const [erroMsg,SetErrorMsg] = useState(null);
    //This is An Modal Map
    const [m1,setM1] = useState(false);
    useEffect(()=>{
        (async ()=>{
            let { status } = await Location.requestPermissionsAsync();
            if(status !== 'granted'){
                Alert.alert("Grant Your Location First");
            }
            let realLoca = await Location.getCurrentPositionAsync({});
            setLocation(realLoca);
        })();
    });
    let text1 = 'Location is fetching...';
    var latitude;
    var longitude;
    if(erroMsg){
        text1 = erroMsg;
    }
    else if(location){
        text1 = JSON.stringify(location);
        latitude =   JSON.stringify(location.coords.latitude);
        longitude =   JSON.stringify(location.coords.longitude);
    }
    function openo(){
        var a = latitude * 1;
        var b = longitude * 1;
        openMap({latitude:a,longitude:b});
    }
    function Nano(){


        AsyncStorage.setItem('mainJobName',job_name);

        var f1 = parseInt(workerrequ);
        var f2 = parseInt(persion);
        var toto = f1 * f2;



        fetch('http://www.tossipro.xyz/joblist.php',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                jobo_name : job_name,
                cato : cate,
                reco : reci,
                worker_requi:workerrequ,
                venue_main:venue,
                address:addr,
                pin_main:pin,
                start_time_main:start_time,
                duration_main:duration,
                perper:persion,
                totalpay_main:toto,
                latitude_main:latitude,
                longitude_main : longitude,
            })
        }).then((response)=>response.json()).
        then((responsejson)=>{
            Alert.alert(responsejson);
            navigation.navigate('root',{screen:'myWork'});
        }).
        catch((error)=>{
            Alert.alert(error);
        })
    }
    return(
        <KeyboardAwareScrollView style={styles.container}>
        <ScrollView>
        <View style={styles.sign}>
        <Text style={{fontSize:30,fontWeight:'bold', paddingBottom:10 }}>New Job</Text>
        <Text style={{fontSize:20,paddingBottom:10}}>What : </Text>
        <TextInput
        onChangeText={(val)=>{ setJob_name(val);  }}
        style={styles.text}
        placeholder="Job Name"
        />
        <TextInput
        onChangeText={(val)=>{ setCate(val); }}
        style={styles.text}
        placeholder="Category"
        />
        <TextInput
        onChangeText={(val)=>{ SetReci(val);  }}
        style={styles.text}
        placeholder="Reciptant"
        />
        <Text style={{fontSize:20,}}>Worker Required</Text>
        <Picker
        selectedValue={workerrequ}
        style={{height:50, width:100}}
        onValueChange={(itemchange,itemno)=>{ setWorkerRequ(itemchange)  }}
        >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        </Picker>
        <Text style={{fontSize:20,paddingBottom:10}}>Where : </Text>
        <TextInput
        onChangeText={(val)=>{ setVenue(val);  }}
        style={styles.text}
        placeholder="Venue"
        />
        <TextInput
        onChangeText={(val)=>{ setAddr(val);  }}
        style={styles.text}
        placeholder="Address"
        />
        <TextInput
        onChangeText={(val)=>{ setPin(val);  }}
        style={styles.text}
        placeholder="Pin"
        />
        <TouchableOpacity style={styles.map} onPress={ openo }  >
        <Text style={{color:'#ff4757',fontSize:20}}>Your Location On G  Map</Text>
        </TouchableOpacity>
        <Text style={{fontSize:20,paddingBottom:10}}>{text1}</Text>
        <TextInput
        onChangeText={(val)=>{ setStart_Time(val);  }}
        style={styles.text}
        placeholder="Start Time"
        />
        <TextInput
        onChangeText={(val)=>{  setDuration(val); }}
        style={styles.text}
        placeholder="Job Duration"
        />
        <TextInput
        onChangeText = {(val) => { setPersion(val);  } }
        style={styles.text}
        placeholder="Pay Per Persion"
        />
        <View>
        <TouchableOpacity style={styles.confirm} onPress={Nano} >
        <Text style={styles.t1}>Confirm</Text>
        </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
        </KeyboardAwareScrollView>
        );
}
{/*This is For Posting a Job for Company*/}
function Postajob({navigation}){
    const [fName,setFname] = useState();
    const [lName,setLname] = useState();
    const [email,setEmail] = useState();
    const [pass,setPass] = useState();
    const [companyName,setCompanyName] = useState();
    const [veri,setVeri] = useState();
    const [mess,setMess] = useState();
    function send(){
        const Fullname = fName;
        const lastname = lName;
        const Email = email;
        const Password = pass;
        const company = companyName;
        const verification = veri;
        const message = veri;


        fetch('http://tossipro.xyz/post.php',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                firstName  :  Fullname,
                lastname : lastname,
                email : Email,
                pass : Password,
                comp : company,
                verifi : verification,
                Message : message,
            })
        }).then((response)=>response.json()).
        then((responseJson)=>{
            Alert.alert(responseJson);
            navigation.navigate('home',{company_name:company});
            navigation.navigate('root',{screen:'newJob'});
        }).
        catch((err)=>{
            console.error(err);
        });
    }
    return(
        <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.sign}>
        <Text style={{fontSize:30,fontWeight:'bold', paddingBottom:10 }}>Post A Job</Text>
        <TextInput
        style={styles.text}
        placeholder="First Name"
        onChangeText={(text)=>{
            setFname(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Last Name"
        onChangeText={(text)=>{
            setLname(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="E-mail Address"
        onChangeText={(text)=>{
            setEmail(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Password"
        onChangeText={(text)=>{
            setPass(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Confirm Password"
        />
        <TextInput
        style={styles.text}
        placeholder="Company Name"
        onChangeText={(text)=>{
            setCompanyName(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Verification Papers"
        onChangeText={(text)=>{
            setVeri(text);
        }}
        />
        <TextInput
        style={styles.text}
        placeholder="Any Message"
        onChangeText={(text)=>{
            setMess(text);
        }}
        />
        <View>
        <TouchableOpacity style={styles.confirm}   onPress={send}>
        <Text style={styles.t1}>Confirm</Text>
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAwareScrollView>
        );
}

//the work is main to be Completed

function resign({navigation}){


  const[jobber,setJobber] = useState();
  const [canlist,setCanlist] = useState([]);


  AsyncStorage.getItem('mainJobName').then((val)=>{
      setJobber(val);
  });




  fetch('http://tossipro.xyz/jobapply.php',{
      method:'POST',
      headers:{
          'Accept' : 'application/json',
          'Content-type':'application/json',
      },
      body:JSON.stringify({
          jobbero   :  jobber,
      })
  }).then((response)=>response.json()).
  then((responseJson)=>{

      setCanlist(responseJson);



  }).
  catch((err)=>{
      console.error(err);
  });

  function check(firstName,lastName,email,contact){

      alert(firstName + lastName + email + contact);
      navigation.navigate('root', {
          screen: 'last',
          params: { f_name:firstName,l_name:lastName,e_mail:email,contra:contact }
      });




  }



      //This is Deepak

      return(

          <View style={{flex:1}}>
          <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:20}}>Select Which You want desmise</Text>
          </View>

          <ScrollView>
          {canlist.map((val,key)=><TouchableOpacity key={key}  style={{justiyContent:'center',alignItems:'center',borderWidth:2,paddingBottom:10,marginBottom:10}}  onPress={ check.bind(this,val.fname,val.lname,val.email,val.contact)  }   >
              <View style={{flex:2,flexDirection:'row'}}>
              <View style={{flex:2,alignItems:'center'}}>
              <Text style={{fontSize:20,fontWeight:'bold'}}>{val.fname}</Text>
              <Text style={{fontSize:15}}>{val.lname}</Text>
              </View>
              <View style={{flex:2,alignItems:'center'}}>
              <Text>{ val.email }</Text>
              <Text>{val.contact}</Text>
              </View>
              </View>
              </TouchableOpacity>)}
          </ScrollView>

          </View>
          );

  }


  function Last({navigation,route}){

      var fname = route.params?.f_name;
      var lname = route.params?.l_name;
      var email = route.params?.e_mail;
      var contact = route.params?.contact;

  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear();

  var dato = date + "/" + month + "/" + year;


  const [jobName,setJobName] = useState();

  useEffect(()=>{

      AsyncStorage.getItem('mainJobName').then((val)=>{
          setJobName(val);
      })

  },[]);


  const [stateOfWork,setStateOfWOrk] = useState();
  const [startAt,setStartAt] = useState();
  const [completedAt,setCompletedAt] = useState();
  const [totalPay,setTotalPay] = useState();
  const [notes,setNotes] = useState();

  function save(){

    alert(jobName + stateOfWork + startAt + completedAt + totalPay + notes);

    fetch('http://tossipro.xyz/resign.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            job_name : jobName,
            namo : fname ,
            state : stateOfWork,
            start : startAt,
            completed : completedAt,
            total : totalPay,
            notes : notes,


        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        alert(responseJson);

    }).
    catch((err)=>{
        console.error(err);
    });



}


return(
  <View style={{flex:1}}>

  <View style={{flex:1,flexDirection: 'row'}}>
  <View style={{marginTop: 10,marginLeft: 10,marginRight: 90}}>
  <Text style={{fontSize:28}}>{dato}</Text>
  </View>

  <View style={{marginTop: 10,marginLeft: 10}}>
  <Text style={{fontSize:28}}>{jobName}</Text>
  </View>
  </View>
  <View style={{height:2,marginTop:15,backgroundColor:'black'}} />
{/*This is The Row Tag now*/}
<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>Worker</Text>
<Text style={{fontSize:25}}>{fname}</Text>
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>State of Work</Text>
<TextInput
style={styles.text}
placeholder="Completed/Not"
onChangeText={(text)=>{
    setStateOfWOrk(text);
}} />
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>Pressed Start at</Text>
<TextInput
style={styles.text}
placeholder="Start Working"
onChangeText={(text)=>{
    setStartAt(text);
}} />
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>Pressed Complete at</Text>
<TextInput
style={styles.text}
placeholder="End Working"
onChangeText={(text)=>{
  setCompletedAt(text);
}} />
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>Total Pay</Text>
<TextInput
style={styles.text}
placeholder="Total Pay"
onChangeText={(text)=>{
    setTotalPay(text);
}} />
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>Notes</Text>
<TextInput
style={styles.text}
placeholder="Notes"
onChangeText={(text)=>{
    setNotes(text);
}} />
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>History</Text>
<Button title="save" onPress={save} />
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>Time</Text>
<Text style={{fontSize:25}}>State</Text>
</View>

<View style={{flex:1,flexDirection:'row',marginTop:10}}>
<Text style={{fontSize:25,marginRight:10}}>{dato}</Text>
<Text style={{fontSize:25}}>Completed</Text>
</View>


</View>
)

}




//Job Profile
function jobPro({navigation}){

    const [jobName,setJobName] = useState();

    useEffect(()=>{

        AsyncStorage.getItem('mainJobName').then((val)=>{
            setJobName(val);
        })

    },[]);


    return(
        <View style={{flex:1}}>

        <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
        <Icon name="user-circle" size={80} color="#eb2f06"  />
        <Text style={{fontSize:45 }}>{jobName }</Text>

        </View>

        <View style={{flex:1,width:'50%'}}>

        <TouchableOpacity style={styles.navoTouch}>
        <Text style={styles.navo}>Home</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.navoTouch} onPress={()=>{ navigation.navigate('root',{screen:'myWork'})}}>
        <Text style={styles.navo}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navoTouch} onPress={()=> {navigation.navigate('root',{screen:'jobpopo'});
    }}>
    <Text style={styles.navo}>Applied the Job</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.navoTouch} onPress={()=> {navigation.navigate('root',{screen:'myJobo'});
}}>
<Text style={styles.navo}>My Jobs</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.navoTouch} onPress={()=> {navigation.navigate('root',{screen:'resign'});
}}>
<Text style={styles.navo}>Resignation</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.navoTouch}>
<Text style={styles.navo}>Sign In </Text>
</TouchableOpacity>

<TouchableOpacity style={styles.navoTouch}>
<Text style={styles.navo}>Sign out</Text>
</TouchableOpacity>


</View>


</View>
);


}

//empty page
function those_apply(){

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

        <View style={{flex:1,flexDirection:'row',marginTop:10}}>
        <Text style={{fontSize:25,marginRight:10}}>Job Name</Text>
        <Text style={{fontSize:25}}>Deepak Mishra</Text>

        </View>

        <View style={{flex:1,flexDirection:'row',marginTop:10}}>
        <Text style={{fontSize:25,marginRight:10}}>Inprogress</Text>
        <Text style={{fontSize:25}}>TCS</Text>

        </View>


        <View style={{flex:1,flexDirection:'row',marginTop:10}}>
        <Text style={{fontSize:25,marginRight:10}}>Toprove</Text>
        <Text style={{fontSize:25}}>TCS</Text>

        </View>


        <View style={{flex:1,flexDirection:'row',marginTop:10}}>
        <Text style={{fontSize:25,marginRight:10}}>Billing</Text>
        <Text style={{fontSize:25}}>TCS</Text>

        </View>


        <View style={{flex:1,flexDirection:'row',marginTop:10}}>
        <Text style={{fontSize:25,marginRight:10}}>Support</Text>
        <Text style={{fontSize:25}}>TCS</Text>

        </View>



        </View>
        );

}


//User Profile
function userProfile({navigation,route}){

    const [nami,setNami] = useState();

    useEffect(()=>{

        AsyncStorage.getItem('fnamo').then((val)=>{
            setNami(val);
        });

    },[]);

    return(
        <View style={{flex:1}}>

        <View style={{marginTop:20,alignItems:'center',justifyContent:'center'}}>
        <Icon name="user-circle" size={80} color="#eb2f06"  />
        <Text style={{fontSize:45 }}>Deepak mishra</Text>

        </View>

        <View style={{flex:1,width:'50%'}}>

        <TouchableOpacity style={styles.navoTouch}>
        <Text style={styles.navo}>Home</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.navoTouch} onPress={()=> {  navigation.navigate('root',{screen:'userpromain'})  } }>
        <Text style={styles.navo}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navoTouch}>
        <Text style={styles.navo}>Nearly Job</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navoTouch} onPress={()=>{navigation.navigate('root',{screen:'myJob'}); }}>
        <Text style={styles.navo}>My Jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navoTouch}>
        <Text style={styles.navo}>My Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navoTouch}>
        <Text style={styles.navo}>Share with Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navoTouch}>
        <Text style={styles.navo}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navoTouch}>
        <Text style={styles.navo}>Log out</Text>
        </TouchableOpacity>


        </View>


        </View>
        );

}

//who are apply for the job

function jobApply({navigation}){

    const[jobber,setJobber] = useState();
    const [canlist,setCanlist] = useState([]);


    AsyncStorage.getItem('mainJobName').then((val)=>{
        setJobber(val);
    });




    fetch('http://tossipro.xyz/jobapply.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            jobbero   :  jobber,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setCanlist(responseJson);

    }).
    catch((err)=>{
        console.error(err);
    });

    function check(firstName,lastName,email,contact){

        navigation.navigate('root', {
            screen: 'workerpro',
            params: { f_name:firstName,l_name:lastName,e_mail:email,contra:contact }
        });


    }


    //This is Deepak

    return(

        <View style={{flex:1}}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:20}}>{jobber}</Text>
        </View>

        <ScrollView>
        {canlist.map((val,key)=><TouchableOpacity key={key}  style={{justiyContent:'center',alignItems:'center',borderWidth:2,paddingBottom:10,marginBottom:10}}  onPress={ check.bind(this,val.fname,val.lname,val.email,val.contact)  }   >
            <View style={{flex:2,flexDirection:'row'}}>
            <View style={{flex:2,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{val.fname}</Text>
            <Text style={{fontSize:15}}>{val.lname}</Text>
            </View>
            <View style={{flex:2,alignItems:'center'}}>
            <Text>{ val.email }</Text>
            <Text>{val.contact}</Text>
            </View>
            </View>
            </TouchableOpacity>)}
        </ScrollView>

        </View>
        );

}

function workerProfile({navigation,route}){

    var fname = route.params?.f_name;
    var lname = route.params?.l_name;
    var email = route.params?.e_mail;
    var contact = route.params?.contra;
    const [jobnamo,setJobNamo] = useState();
    const [canolist,setCanolist] = useState();


    useEffect(()=>{
        AsyncStorage.getItem('mainJobName').then((val)=>{
            setJobNamo(val);
        });

    },[]);

    function work(){

        fetch('http://tossipro.xyz/jobselected.php',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                jobselected   :jobnamo,
                emailo   :  contact,

            })
        }).then((response)=>response.json()).
        then((responseJson)=>{

            alert(responseJson);

        }).
        catch((err)=>{
            console.error(err);
        });
    }


    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Fname</Text>
        <Text>{fname}</Text>
        <Text>Last name</Text>
        <Text>{lname}</Text>
        <Text>Email</Text>
        <Text>{email}</Text>
        <Text>Contact</Text>
        <Text>{contact}</Text>
        <Button title="selected"
        onPress={work}
        />
        </View>
        )
}

function userProfilo(){
    //star rating
    const [name,setName] = useState();

    //
    const [language,setLanuage] = useState();
    const [specific,setSpecific] = useState();
    const [describe,setDescribe] = useState();
    const [part,setpart] = useState();
    const [pervious,setPervious] = useState();

    const [contract,setContract] = useState();

    useEffect(()=>{

        AsyncStorage.getItem('contacto').then((val)=>{

            setContract(val);


        });

    },[]);


    function clicked(){

        fetch('http://tossipro.xyz/spicy.php',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                contacto : contract,
                lang   : language,
                specific   : specific ,
                describe : describe,
                part : part,
                pervious : pervious,

            })
        }).then((response)=>response.json()).
        then((responseJson)=>{

            alert(responseJson);

        }).
        catch((err)=>{
            console.error(err);
        });
    }



    return(
        <View style={{flex:1}}>

        <View style={{flex:0.30,justifyContent:'center',alignItems:'center'}}>
        <Text></Text>
        <Icon name="user-circle" size={60} color="#eb2f06"  />
        <Text></Text>

        <View style={{flex:0.5,flexDirection:'row'}}>
        <StarRating
        disabled={false}
        maxStars={5}
        selectedStar={(rating) => setName(rating)}

        />
        <Text style={{fontSize:20,paddingLeft:15,fontWeight:'bold'}}>{name}</Text>


        </View>
        </View>
        <View style={{height:1,marginTop:15,backgroundColor:'black'}} />

        <View style={{flex:0.9,justifyContent:'center',alignItems:'center'}}>

        <TextInput
        style={styles.text1}
        placeholder="Language Preference"
        onChangeText={(text)=>{
            setLanuage(text);
        }}
        />
        <Text></Text>
        <TextInput
        style={styles.text1}
        placeholder="Any Specific Skills"
        onChangeText={(text)=>{
            setSpecific(text);

        }}
        />
        <Text></Text>

        <TextInput
        style={styles.text1}
        placeholder="How Would You Describe Your Self"
        onChangeText={(text)=>{
            setDescribe(text);

        }}
        />
        <Text></Text>

        <TextInput
        style={styles.text1}
        placeholder="Part-Time/Full-Time"
        onChangeText={(text)=>{
            setpart(text);
        }}
        />
        <Text></Text>

        <TextInput
        style={styles.text1}
        placeholder="Perivious Exeperience"
        onChangeText={(text)=>{
            setPervious(text);
        }}
        />
        <Text></Text>
        <Text>* Optional</Text>

        <Button title="Submit" onPress={clicked}  />

        </View>



        </View>
        )
}

function myJobo(){

    const [allJobs,setAllJobs] = useState([]);
    const [jobberName,setJobberName] = useState();

    useEffect(()=>{

        AsyncStorage.getItem('jobnew').then((val)=>{

            setJobberName(val);


        });

    },[]);

    fetch('http://tossipro.xyz/allJobs.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            job_name   : jobberName,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setAllJobs(responseJson);

    }).
    catch((err)=>{
        console.error(err);
    });

    return(

        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>All Jobs : </Text>
        {allJobs.map((val,key)=><Text>{val.job_name}</Text>)}
        <Text>In Prgress : </Text>
        {allJobs.map((val,key)=><Text>{val.job_name}</Text>)}

        <Text>To Approve</Text>
        {allJobs.map((val,key)=><Text>{val.To_Approve}</Text>)}

        <Text>Billing(Card)</Text>

        <Text>Support()</Text>

        <Button title="Job Name" onPress={()=>{ alert(jobberName); }} />




        </View>
        );
}




function profile({navigation}){

    const [useremail,setUserEmail] = useState(null);

    useEffect(()=>{

        AsyncStorage.getItem('leloemail').then((val)=> {

            if( val == null){

                navigation.navigate('root',{screen:'jobpro'});

            }
            else
            {


                navigation.navigate('root',{screen:'userpro'});

            }

        })


    },[]);

    return(null);
}


function newWork({navigation}){

    const [jobName,setJobName] = useState();
    const [listo,setListo] = useState([]);


    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    var dato = date + "/" + month + "/" + year;

    useEffect(()=>{

      AsyncStorage.getItem('mainJobName').then(
          (value) =>{
              setJobName(value);
          });
  });



    fetch('http://tossipro.xyz/newWork.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            jobberName  :  jobName,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setListo(responseJson);


    }).
    catch((err)=>{
        console.error(err);
    });

    const [datalist,setDataList] = useState([]);

    fetch('http://tossipro.xyz/data2.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            jobberName  :  jobName,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setDataList(responseJson);


    }).
    catch((err)=>{
        console.error(err);
    });

    const[iName,setIName] = useState();

    const[employe,setEmploye] = useState([]);

    fetch('http://tossipro.xyz/star.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },body:JSON.stringify({
            jobberName  :  jobName,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setEmploye(responseJson);




    }).
    catch((err)=>{
        console.error(err);
    });


    function check(fname,lname,email,contact){

      alert(fname  + lname + email + contact);
      navigation.navigate('root', {
          screen: 'secondLast',
          params: { f_name: fname , l_name:lname,e_mail:email,c_ontact:contact}
      });


  }
  return(
    <View style={{flex:1}}>
    <Carousel animate={false} loop={false} indicatorOffset={50} >
    <View style={{flex:1}}>
{/* The Carousel Starts From Here */}
<Text></Text>
<View style={{marginTop:20,marginLeft:15,alignItems:'center',width:'23%',alignItems:'flex-start',borderWidth:2}}>
<TouchableOpacity  onPress={()=>{ alert(jobName); }}>
<Text style={{fontSize:20}}>New Job</Text>
</TouchableOpacity>

</View>
<Text></Text>
<View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
{/*This is The Main 1*/}
<View style={{marginLeft:10,marginRight:20}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>Start Time</Text>
</View>

<View style={{marginRight:20}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>Estimated Time</Text>
</View>

<View style={{marginRight:20}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>Job Name</Text>
</View>




</View>

<Text></Text>

<View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
{/*This is The Main 1*/}
<View style={{marginLeft:10,marginRight:40}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>{dato}</Text>
</View>

<View style={{marginRight:25}}>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].estimate_job_time} |</Text>) }
</View>

<View style={{marginRight:20}}>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].job_name}</Text>) }
</View>

</View>



<Text></Text>
{/* This line is for  hr line */}
<View style={{height:2,marginTop:15,backgroundColor:'black'}} />
{/* This line is for  hr line */}
<Text></Text>
<View style={{alignItems:'flex-end'}}>

{ datalist.map((val,key)=><Text style={{fontSize:17,fontWeight:'bold'}}>{listo[0].worker_requi * 1 - datalist[0].id} slots are left</Text>) }

</View>
<Text></Text>

<View style={{height:2,marginTop:15,backgroundColor:'black'}} />

<View style={{marginTop:20,marginLeft:15,alignItems:'center',width:'23%',alignItems:'flex-start',borderWidth:2}}>
<TouchableOpacity  onPress={()=>{ alert("This Button is for New Job"); }}>
<Text style={{fontSize:20}}>New Job</Text>
</TouchableOpacity>
</View>
<Text></Text>
<View style={{flexDirection:'row'}}>

<View style={{marginLeft:10,marginRight:'48%',alignItems:'flex-start'}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>Start</Text>
</View>

<View style={{alignItems:'flex-end'}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>During & AFTER</Text>
</View>

</View>

<Text></Text>
<Text></Text>

<View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
{/*This is The Main 1*/}
<View style={{marginLeft:10,marginRight:70}}>
{ datalist.map((val,key)=><Text style={{fontSize:20,fontWeight:'bold'}}>{val.fname} {val.lname}</Text>) }

</View>

<View style={{marginRight:80}}>
<Text style={{fontSize:20,fontWeight:'bold'}}>Completed at 15:30</Text>
</View>

</View>
<Text></Text>
<Text></Text>
<View style={{alignItems:'flex-end'}}>
<StarRating
disabled={false}
maxStars={5}


/>

</View>

</View>
{/* This is Carousel Belogs To Second */}
<View style={{flex:1}}>


<View style={{flex:1,paddingTop: 10,alignItems: 'center'}}>

<Text style={{fontSize:30,fontWeight: 'bold',marginBottom: 10}}>Job Details</Text>
{/*This was the 1 office kit */}

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 1) Job Name : </Text>
  { listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].job_name} </Text>) }
  </View>


  <View style={{flexDirection: 'row'}}>
  <Text style={{fontSize:20,marginRight: 10}}> 2) Posted Time : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].start_time} </Text>) }
</View>


<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 3) State : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].venue} </Text>) }
</View>


<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 4) Category : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].category} </Text>) }
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 5) Description : </Text>
<Text style={{fontSize:20}}> One of The Best </Text>
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 6) Person Required : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].worker_requi} </Text>) }
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 7) Venue : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].venue} </Text>) }
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 8) Address : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].address} </Text>) }
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 9) City : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].venue} </Text>) }
</View>


<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 10) Zip : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].pin} </Text>) }
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 11) Job Duration :</Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].estimate_job_time} </Text>) }
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}>12) Start Time :</Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].start_time} </Text>) }
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize:20,marginRight: 10}}> 13) Pay : </Text>
{ listo.map((val,key)=><Text  style={{fontSize:20,fontWeight:'bold'}}>{listo[0].pay_per_persion} </Text>) }
</View>
</View>
<View style={{height:2,marginTop:15,backgroundColor:'black'}} />
<View style={{alignItems: 'flex-start'}}>
<Text style={{fontSize: 28,marginLeft: 20}}>DIVORER/WORKER</Text>
</View>

<View style={{height:2,marginTop:15,backgroundColor:'black'}} />

<View style={{flex:0.5}}>

<View style={{flexDirection: 'row',justifyContent: 'center'}}>
<Text style={{fontSize: 30,marginRight: 25}}>Name</Text>

<Text style={{fontSize: 30,marginRight: 25}}>Status</Text>

<Text style={{fontSize: 30,marginRight: 25}}>Stars</Text>
</View>
{/* This goes fron show the data */}
<Carousel animate={true} delay={2000} hideIndicators={true} loop={true}>

{employe.map((val,key)=><View key={key} style={{flexDirection: 'row',justifyContent: 'center'}}>
  <TouchableOpacity onPress={check.bind(this,val.fname,val.lname,val.email,val.contact)}>

  <Text key={key}  style={{fontSize: 30,marginRight: 25}}>{val.fname}</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 30,marginRight: 25}}>Working</Text>

  <Text style={{fontSize: 30,marginRight: 25}}>Stars</Text>
  </View>)}




</Carousel>

</View>




{/* Some Thing is missing*/}




{/**/}

</View>



</Carousel>
</View>
)
}


function SecondLast({navigation,route}){

  var fname = route.params?.f_name;
  var lname = route.params?.l_name;
  var email = route.params?.e_mail;
  var contact = route.params?.c_ontact;


  return(
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

      <View style={{flexDirection: 'row'}}>

      <View style={{marginRight: 20}}>
      <Icon name="user" size={100} color='black' />
      </View>

      <View>
      <Text style={{fontSize: 30}}>{fname}</Text>
      <Text style={{fontSize: 25}}>working from 2018</Text>
      </View>


      </View>

  {/* Row was Completed */}


  <View style={{flexDirection: 'row'}}>
  <Text style={{fontSize: 20,marginRight: 20}}>Overall Rating</Text>
  <Text style={{fontSize: 20,marginRight: 20}}>Total jobs</Text>
  <Text style={{fontSize: 20,marginRight: 20}}>jobs For You</Text>
  </View>

{/* This is working on */}
<Text></Text>
<View style={{flexDirection: 'row'}}>
<View>
<Text style={{fontSize: 20,marginRight: 20}}>Police Verified</Text>
</View>

<View>
<Icon name="check" size={30} color='blue' />
</View>
</View>

<Text style={{fontSize: 20}}>Contact Information</Text>

<Icon name="phone" size={30} color='blue' />
<Text style={{fontSize: 20}}>{contact}</Text>


<Icon name="connectdevelop" size={30} color='red' />
<Text style={{fontSize: 20}}>{email}</Text>


<Text style={{fontSize: 30}}>Jobs For You</Text>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 15,marginRight: 20}}>When</Text>
<Text style={{fontSize: 15,marginRight: 20}}>Where</Text>
<Text style={{fontSize: 15,marginRight: 20}}>Status</Text>
<Text style={{fontSize: 15,marginRight: 20}}>Rating</Text>
</View>

<View style={{flexDirection: 'row'}}>
<Text style={{fontSize: 15,marginRight: 20}}>Date</Text>
<Text style={{fontSize: 15,marginRight: 20}}>Venue</Text>
<Text style={{fontSize: 15,marginRight: 20}}>Filled/empty</Text>
</View>

</View>
)
}


function Myjobs({navigation}){

    const [myemail,setMyEmail] = useState();

    const [canlisto,setCanListo] = useState([]);

    useEffect(()=>{

        AsyncStorage.getItem('contacto').then((val)=>{

            setMyEmail(val);


        });

    },[]);

    function UserProfile(){

        const [myemail,setMyEmail] = useState();

        const [canlisto,setCanListo] = useState([]);

        useEffect(()=>{

            AsyncStorage.getItem('contacto').then((val)=>{

                setMyEmail(val);


            });



        },[]);

        return(
            <View style={{flex:1,justiyContent:'center',alignItems:'center'}}>
            <Text>Hello world</Text>
            </View>

            );

    }

    fetch('http://tossipro.xyz/list.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            emailo   :  myemail,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setCanListo(responseJson);

    }).
    catch((err)=>{
        console.error(err);
    });

    const [fully,setfully] = useState();

    AsyncStorage.getItem('companyname').then((val)=>{

        setfully(val);


    });

    const [companyname,setCompanyName] = useState([]);

    fetch('http://tossipro.xyz/finaldest.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            companynamo   :  fully,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setCompanyName(responseJson);

    }).
    catch((err)=>{
        console.error(err);
    });



    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear();

    const [workero,setWorkero] = useState([]);

    fetch('https://www.tossipro.xyz/userprofilo.php',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-type':'application/json',
        },
        body:JSON.stringify({
            numbero   :  myemail,
        })
    }).then((response)=>response.json()).
    then((responseJson)=>{

        setWorkero(responseJson);

    }).
    catch((err)=>{
        console.error(err);
    });

    function check(duration,pay){

      navigation.navigate('root', {
          screen: 'comp',
          params: { deepu_king:fully,dura:duration,payo:pay}
      });
    }

    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ScrollView>
        <Text>Day</Text>
        <Text>{date}</Text>
        <Text>month</Text>
        <Text>{month}</Text>
        <Text>Year</Text>
        <Text>{year}</Text>
        <Text>You are Working With</Text>
        {canlisto.map((val,key)=>{  AsyncStorage.setItem('companyname',canlisto[0].Jobname);
    })}
        <Text>{fully}</Text>
        <Text>Pay Per Persion</Text>
        {companyname.map((val,key)=><Text>{val.pay_per_persion}</Text>)}
        <Text>Company Duration</Text>
        {companyname.map((val,key)=><Text>{val.estimate_job_time} hours</Text>)}
        <Text>Company Location</Text>
        {companyname.map((val,key)=><Text>{val.address}</Text>)}
        <Text>Company Reporting Time</Text>
        {companyname.map((val,key)=><Text>{val.start_time}</Text>)}
        <Text>Duration of Work</Text>
        {companyname.map((val,key)=><Text>{val.estimate_job_time}</Text>)}
        <Text>Payment Status</Text>
        {companyname.map((val,key)=><Text>Check</Text>)}

        <View style={{height:2,marginTop:15,backgroundColor:'black'}} />


        <Text>Language You Prefered</Text>
        {workero.map((val,key)=><Text key={key}>{val.language} : Programing Language</Text>)}

        <Text>Skill</Text>
        {workero.map((val,key)=><Text key={key}>{val.skill}</Text>)}

        <Text>About yourself</Text>
        {workero.map((val,key)=><Text key={key}>{val.yourself}</Text>)}

        <Text>Intrested</Text>
        {workero.map((val,key)=><Text key={key}>{val.intested}</Text>)}

        <Text>Perivious</Text>
        {workero.map((val,key)=><Text key={key}>{val.perivious}</Text>)}

        <View style={{height:2,marginTop:15,backgroundColor:'black'}} />

        {companyname.map((val,key)=><Button title="Completed" onPress={check.bind(this,val.estimate_job_time,val.pay_per_persion)} />)}
        


        </ScrollView>



        </View>
        );

}

function completed({navigation,route}){

    var jobnamo = route.params?.deepu_king;
    var duration = route.params?.dura;
    var payu = route.params?.payo;
    
    const[name,setName] = useState();

    return(
        <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
          
          <Text style={{fontSize: 28,fontWeight:'bold',}}>Company</Text>  
          <Text style={{fontSize: 28,fontWeight:'bold',}}>{jobnamo}</Text>
          <Text style={{fontSize: 28,fontWeight:'bold',}}>Duration</Text>    
          <Text style={{fontSize: 28,fontWeight:'bold',}}>{duration}</Text>  
          <Text style={{fontSize: 28,fontWeight:'bold',}}>Pay</Text>  
          <Text style={{fontSize: 28,fontWeight:'bold',}}>{payu}</Text>  

          <Text>How was You experience with this comppany</Text>
          <Text></Text>
        <View style={{flex:0.5,flexDirection:'row'}}>
        <StarRating
        disabled={false}
        maxStars={5}
        selectedStar={(rating) => setName(rating)}

        />
        <Text style={{fontSize:20,paddingLeft:15,fontWeight:'bold'}}>{name}</Text>
        </View>

      </View>
      );
}


function StackScreen(){
    return(
        <View style={styles.container}>
        <Text>Hello This This is Stack</Text>
        </View>
        );
}
const Drawer = createDrawerNavigator();
const Stack  = createStackNavigator();


function root({navigation}){
    return(
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}   />
        <Stack.Screen name="deepak" component={StackScreen} />
        <Stack.Screen name="Findsign" component={findsign}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"",
        }}/>
        <Stack.Screen name="Post" component={Postajob}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"",
        }}/>
        <Stack.Screen name="newJob" component={newJob}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"",
        }}/>
        <Stack.Screen name="jobo" component={joblist}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Job List",
        }}/>
        <Stack.Screen name="appo" component={apply}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Apply",
        }}/>



        <Stack.Screen name="Applied" component={thatsall}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Applied",
        }}/>


        <Stack.Screen name="userpro" component={userProfile}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"User Profile",
        }}/>


        <Stack.Screen name="jobpro" component={jobPro}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Job Profile",
        }}/>


        <Stack.Screen name="whoseare" component={those_apply}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Appled For Your Job",
        }}/>

        <Stack.Screen name="jobpopo" component={jobApply}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Job Apply",
        }}/>

        <Stack.Screen name="workerpro" component={workerProfile}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Worker Profile",
        }}/>



        <Stack.Screen name="myJob" component={Myjobs}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"My Jobs",
        }}/>

        <Stack.Screen name="userpromain" component={userProfilo}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Profile",
        }}/>

        <Stack.Screen name="myJobo" component={myJobo}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"My Job",
        }}/>

        <Stack.Screen name="myWork" component={newWork}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Work list",
        }}/>


        <Stack.Screen name="secondLast" component={SecondLast}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Details of The Worker",
        }}/>

        <Stack.Screen name="resign" component={resign}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Resignation",
        }}/>

        <Stack.Screen name="last" component={Last}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Dismiss",
        }}/>

        <Stack.Screen name="comp" component={completed}
        options={{
            headerLeft: () => (
                <TouchableOpacity style={{paddingLeft:10}}  onPress={()=>{navigation.openDrawer();}}>
                <Icon name="dedent" size={30} color="#000000" />
                </TouchableOpacity>
                ),
            title:"Completed",
        }}/>





        </Stack.Navigator>
        );
}
export default function App() {
    return (
        <NavigationContainer>
        <Drawer.Navigator intialRouteName="home">
        <Drawer.Screen name="home" component={Home} />
        <Drawer.Screen name="root" component={root} />
        <Drawer.Screen name="profiles" component={profile} />


        </Drawer.Navigator>
        </NavigationContainer>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        flex:0.07,
        paddingTop:getStatusBarHeight(),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
    },
    input:{
        fontSize:20,
    },
    content:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    defaultFontSize:{
        fontSize:30,
    },
    first:{
        flex:0.4,
        padding:20,
        borderWidth:2,
    },
    second:{
        flex:0.4,
        padding:28,
        borderWidth:2,
    },
    sign:{
        flex:1,
        alignItems:'center',
    },
    text:{
        borderWidth:2,
        padding:8,
        fontSize:20,
        width:'90%',
        marginBottom:4,
    },
    text1:{
        borderWidth:1,
        padding:8,
        fontSize:15,
        width:'90%',
        marginBottom:4,
    },

    confirm:{
        marginTop:10,
        backgroundColor:'#654321',
        paddingLeft:'20%',
        paddingRight:'20%',
        marginBottom:'4%',
        borderRadius:20,
    },
    t1:{
        color:'white',
        fontSize:25,
    },
    map:{
        marginBottom:'5%',
        marginTop:'5%',
    },
    navoTouch:{
        marginBottom:10,
        borderWidth:1,
        marginLeft:10,
        marginTop:5,

    },
    navo:{
        fontSize:20,
    }

}
);
