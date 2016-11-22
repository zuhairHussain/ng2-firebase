declare var firebase: any;
import { Component,AfterViewInit } from '@angular/core';
import { Injectable } from '@angular/core';
var provider = new firebase.auth.FacebookAuthProvider();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {

 ngAfterViewInit(){
   this.get();
   this.abc();
  }

/*-----------------------------------USER auth--------------------------------*/
register(email,pass){
  firebase.auth().createUserWithEmailAndPassword(email.value, pass.value).then(
    ok => {
        alert("Register OK" + ok);
    },
    error => {
        alert("Register error" + error);
    }
);
}

/*-----------------------------------Login--------------------------------*/
login(email,pass){
      firebase.auth().signInWithEmailAndPassword(email.value, pass.value).catch(function(error) {
           var errorCode = error.code;
          alert(error.message);
      }); 
      this.get();
}

/*-----------------------------------Logout--------------------------------*/
logout(){
  firebase.auth().signOut().then(function() {
  alert('Signed Out');
  window.location.href = "/";
}, function(error) {
  alert('Sign Out Error' + error);
});
}


/*------------------------data adding function ---------------*/
ud;
sub(newf,new2){
  
firebase.auth().onAuthStateChanged(function (user){
    var key = firebase.database().ref().child('userdata').push().key;
    /*---time----*/
    let timestamp = firebase.database.ServerValue.TIMESTAMP;
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let user1 = {
      id: key,
      name : newf.value,
      secname : new2.value,
      date: date,
      year: year,
      month: month,
      edited: false
      
    }
    
    let title = firebase.database().ref().child('userdata/' + user.uid).push(user1);
    });
    this.get();
  }



/*------------------------data geting function ---------------*/
ah:any[] = [];
get(){
     let a:any[] = [];
     this.ah = a ;

     firebase.auth().onAuthStateChanged(function (user){
     let ab = firebase.database().ref().child('userdata/' + user.uid).on("child_added", function(snapshot) {
      var newPost = snapshot.val();
      var key = snapshot.key;
      let user1 = {
          id: newPost.id,
          name : newPost.name,
          secname : newPost.secname,
          dis : newPost.dis,
          key: key,
          date: newPost.date,
          year: newPost.year,
          month: newPost.month,
          edited: newPost.edited,
       }
       a.push(user1);
       
    });
    });
    console.log(this.ah);
    
  }


/*------------------------data remove function ---------------*/
remove(a,name){
        firebase.auth().onAuthStateChanged(function (user){
          firebase.database().ref('userdata/' + user.uid).child(a).remove();
            alert("deleted");
        });
        this.get(); 
}


 /*------------------------Update data remove function ---------------*/
upkey;
update(key) {
  this.upkey = key;
}
update2(name,sec) {
  let key = this.upkey;

    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth();

firebase.auth().onAuthStateChanged(function (user){
  firebase.database().ref('userdata/' + user.uid +"/"+ key).update({
          name : name.value,
          secname : sec.value,
          date: date,
          year: year,
          month: month,
          edited: true,
  });
  alert("Data Updated");
});
this.get();
}

// public a = this.get();

/*------------------------controls ---------------*/

ab = firebase.auth().onAuthStateChanged(function (user){

    // let userval = document.getElementById('user').innerText = user.email;
    // let useremail = user.email;
  if(user){
   console.log(user);
   document.getElementById('user').innerText = user.email;

   let ab2 = firebase.storage().ref().child(user.email + "/profile").getDownloadURL().then(function(url) {
    if(user){
    document.getElementById('img')['src'] = url;
    document.getElementById('img2')['src'] = url;
    }
    });

   let fb = document.getElementById('fb');
   fb.classList.add('hide1');

   let cnt = document.getElementById('cnt');
   cnt.classList.remove('hide1');

   let userid = document.getElementById('user');
   userid.classList.remove('hide1');

  let img = document.getElementById('img');
   img.classList.remove('hide1');
  
   /*-----------------------Logout---------------------*/
   let logout = document.getElementById('logout');
   logout.classList.remove('hide1');

   /*------------------------register------------------*/
   let register = document.getElementById('register');
   register.classList.add('hide1');

   /*----------------------login----------------------*/
   let login = document.getElementById('login');
   login.classList.add('hide1');
  }

  else{

    let fb = document.getElementById('fb');
    fb.classList.remove('hide1');

    let cnt = document.getElementById('cnt');
    cnt.classList.add('hide1');

    let userid = document.getElementById('user');
   userid.classList.add('hide1');

   let img = document.getElementById('img');
   img.classList.add('hide1');

   let logout = document.getElementById('logout');
   logout.classList.add('hide1');

   let register = document.getElementById('register');
   register.classList.remove('hide1');

   let login = document.getElementById('login');
   login.classList.remove('hide1');
  }
});


signfb(){
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
});
this.get();
}


// ngAfterViewInit(){
//    this.get();
//   }

// /*------------------------ connect or disconnect mesg ---------------*/
// dis = firebase.database().ref("disconnectmessage").onDisconnect().set("I disconnected!");
// adf;
//  connectedRef = firebase.database().ref(".info/connected").on("value", function(snap) {
//   if (snap.val() === true) {
//     alert("connected");
//   } else {
//     alert("not connected");
//   }
// });
// /*------------------------ connect or disconnect mesg End---------------*/


//  /*------------------------add function---------------*/

// ud;

//   sub(newf,new2,new3){
//     this.get();
  
//       firebase.auth().onAuthStateChanged(function (user){
//          console.log(user.uid) 
     

     
//     var key = firebase.database().ref().child('text').push().key;
//     /*---time----*/
//     let timestamp = firebase.database.ServerValue.TIMESTAMP;
//     let date = new Date().getDate();
//     let year = new Date().getFullYear();
//     let month = new Date().getMonth();
//     let user1 = {
//       id: key,
//       name : newf.value,
//       secname : new2.value,
//       dis : new3.value,
//       date: date,
//       year: year,
//       month: month,
//       edited: false
      
//     }
    
//     let title = firebase.database().ref().child('text/' + user.uid).push(user1);
//     });
//   }
// /*------------------------add function end---------------*/


//   /*------------------------data geting function ---------------*/
  
//   ah:any[] = [];

// get(){
//      let a:any[] = [];
//      this.ah = a ;

//      firebase.auth().onAuthStateChanged(function (user){
//      let ab = firebase.database().ref().child('text/' + user.uid).on("child_added", function(snapshot) {
//       var newPost = snapshot.val();
//       var key = snapshot.key;
//       let user1 = {
//           id: newPost.id,
//           name : newPost.name,
//           secname : newPost.secname,
//           dis : newPost.dis,
//           key: key,
//           date: newPost.date,
//           year: newPost.year,
//           month: newPost.month,
//           edited: newPost.edited,
//        }
//        a.push(user1);
       
//     });
//     });
//     console.log(this.ah);
//   }

//   /*------------------------data geting function End---------------*/



// /*------------------------data remove function ---------------*/
// remove(a,name){
//         firebase.auth().onAuthStateChanged(function (user){
//           console.log(a)
//           firebase.database().ref('text/' + user.uid).child(a).remove();
//             alert(name + "'s profile deleted");
//         });
//         this.get(); 
// }
// /*------------------------data remove function ---------------*/


//  /*------------------------Update data remove function ---------------*/
// upkey;
// update(key) {
//   this.upkey = key;
// }
// update2(name,sec,dis) {
//   let key = this.upkey;

//     let date = new Date().getDate();
//     let year = new Date().getFullYear();
//     let month = new Date().getMonth();

//   firebase.database().ref('text/' + key).update({
//           name : name.value,
//           secname : sec.value,
//           dis : dis.value,
//           date: date,
//           year: year,
//           month: month,
//           edited: true,
//   });
//   alert("Data Updated");
// this.get();
// }

// /*------------------------Update data remove function ---------------*/







// login(email,pass){
//       this.get();
//       firebase.auth().signInWithEmailAndPassword(email.value, pass.value).catch(function(error) {
//            var errorCode = error.code;
//            var errorMessage = error.message;
//       });
//       window.location.href = "/";
//       this.get();
// }
// // usr;
// // usrloginname(){
// //   var usera = firebase.auth().currentUser;
// // if (usera != null) {
// //   let ah;
// //   usera.providerData.forEach(function (profile) {
// //     ah = profile.email;
// //     console.log("Sign-in provider: "+profile.providerId);
// //     console.log("  Provider-specific UID: "+profile.uid);
// //     console.log("  Email: "+profile.email);
// //   });
// //   this.usr = ah; 
// //   console.log(this.usr);
// // }
// // }

// logout(){
//   firebase.auth().signOut().then(function() {
//   alert('Signed Out');
// }, function(error) {
//   alert('Sign Out Error' + error);
// });
// this.get(); 
// }

blobToFile(theBlob: Blob, fileName:string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}



filebuttoni(event){
let storageref;
let storage;
let path;

let r = firebase.auth().onAuthStateChanged(function (user){
storage = firebase.storage().ref();
let files = event.srcElement.files[0];
let uploader=document.getElementById("uploader");

storageref = storage.child(user.email + '/profile');
let task=storageref.put(files);
var downloadURL = task.snapshot.downloadURL;
task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    alert('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
    if(progress === 100){window.location.href = "/";}
  }, function(error) {
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
  
}, function() {
  // Upload completed successfully, now we can get the download URL
  var downloadURL = task.snapshot.downloadURL;
});

// firebase.storage().ref().child('userdata/'+ "profile").getDownloadURL().then(function(url) {
// url;
//   // Get the download URL for 'images/stars.jpg'
//   // This can be inserted into an <img> tag
//   // This can also be downloaded directly
// }).catch(function(error) {
//   // Handle any errors
// });


});
}

 abc() {
  // TODO add service worker code here
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
}

}