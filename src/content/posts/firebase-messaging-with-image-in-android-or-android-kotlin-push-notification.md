---
author: Yogesh Paliyal
pubDatetime: 2019-10-13T00:00:00Z
title: "Firebase Messaging with Image in Android | Android Kotlin push notification"
featured: false
draft: false
tags:
  - firebase
  - android-tutorial
description: "In this post, we are going to learn how to handle notifications with an image from the firebase console"
---

Hello friends, I came back with a new post.  
In this post, we are going to learn how to handle notifications with an image from the [firebase console](https://console.firebase.google.com/).

Here are a few steps I think we can skip.

- Login/Register to the firebase.
- Setup your project in the android studio.
- Create a project on the firebase console.
- [Add firebase to your project](https://firebase.google.com/docs/android/setup).

---

Add dependency (in “app/build.gradle”)

```groovy
implementation 'com.google.firebase:firebase-messaging:20.0.0'
```

---

Create a class that extends **FirebaseMessangingService** in my case it is “MyFirebaseMessangingService”

Your class look like this initially

```kotlin
class MyFirebaseMessangingService : FirebaseMessagingService(){
    override fun onNewToken(p0: String) {
        super.onNewToken(p0)

    }
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
    }
}
```

“**onNewToken**“: Function will be called when firebase creates/update a unique token for a particular user.  
This can be updated periodically, reinstall the app, clear data, etc.

“**onMessageReceived**“: This is a special function that is called when a message is received from the firebase console or by your app’s backend, in this function you have to create and show the notification.  
**Note**: This function only triggers when your app is in the foreground state.

**Q. What happens** **when the app is in the background & how to show notification in that condition?**  
Ans: Firebase will handle itself and show the notification & on click on that notification it will open the very first activity of your projects like Splash or Dashboard.

---

Add Firebase messaging service to **Manifest.xml** inside the application tag.

```xml
<service
    android:name=".java.MyFirebaseMessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

---

Show Notification (first download image to bitmap and then show notification)

```kotlin
private fun downloadImage(notification: RemoteMessage.Notification?) {
        Observable.fromCallable(object : Callable<Bitmap?> {
            override fun call(): Bitmap? {
                val future = Glide.with(applicationContext).asBitmap()
                        .load(notification?.imageUrl).submit()
                return future.get()
            }
        }).subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(object : Observer<Bitmap?> {
                    override fun onComplete() {

                    }

                    override fun onSubscribe(d: Disposable) {

                    }

                    override fun onNext(t: Bitmap) {
                        showNotification(notification,t)
                    }

                    override fun onError(e: Throwable) {
                        showNotification(notification,null)
                    }

                })

}
```

**Note:** I used RxJava here for threading, you can use any method you want.

---

Show the notification

```kotlin
private fun showNotification(notification: RemoteMessage.Notification?, image: Bitmap?) {

    val notificationManager = applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    val channelId = getString(R.string.notification_channel_id)
    val channelName = getString(R.string.notification_channel_name)
    val importance = NotificationManager.IMPORTANCE_LOW

    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
        val mChannel = NotificationChannel(channelId, channelName, importance)
        notificationManager.createNotificationChannel(mChannel)
    }

    val intent = Intent(applicationContext, MainActivity::class.java)
    val pendingIntent = PendingIntent.getService(applicationContext, 1, intent, 0)
    var builder: Notification.Builder? = null
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
        builder = Notification.Builder(applicationContext, channelId)
    } else {
        builder = Notification.Builder(applicationContext)
    }

    if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        builder.setSmallIcon(R.mipmap.ic_launcher)
    } else {
        builder.setSmallIcon(R.mipmap.ic_launcher)
    }

    val title = if (notification?.title.toString().isNullOrEmpty()) {
        getString(R.string.app_name)
    }else{
        notification?.title
    }

    val content = if (notification?.body.isNullOrEmpty()) {
        getString(R.string.app_name)
    }else{
        notification?.body
    }

    builder.setContentTitle(title)
            .setContentText(content)
            .setDeleteIntent(pendingIntent)

    if (image != null) {
        builder.setStyle(Notification.BigPictureStyle().bigPicture(image))
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
        builder.setVisibility(Notification.VISIBILITY_PUBLIC)
    }

    notificationManager.notify((0..100).random(), builder.build())
}
```

Here is the whole file code:

```kotlin
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.os.Build
import android.util.Log
import com.bumptech.glide.Glide
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.techpaliyal.uniquegallery.R
import com.techpaliyal.uniquegallery.activities.MainActivity
import io.reactivex.Observable
import io.reactivex.Observer
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import java.util.concurrent.Callable

class MyFirebaseMessangingService : FirebaseMessagingService(){
    override fun onNewToken(p0: String) {
        super.onNewToken(p0)
        Log.d("TestingNotification",""+p0)
    }
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        downloadImage(remoteMessage.notification)
    }

    private fun downloadImage(notification: RemoteMessage.Notification?) {
        Observable.fromCallable(object : Callable<Bitmap?> {
            override fun call(): Bitmap? {
                val future = Glide.with(applicationContext).asBitmap()
                        .load(notification?.imageUrl).submit()
                return future.get()
            }
        }).subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(object : Observer<Bitmap?> {
                    override fun onComplete() {

                    }

                    override fun onSubscribe(d: Disposable) {

                    }

                    override fun onNext(t: Bitmap) {
                        showNotification(notification,t)
                    }

                    override fun onError(e: Throwable) {
                        showNotification(notification,null)
                    }

                })
    }

    private fun showNotification(notification: RemoteMessage.Notification?, image: Bitmap?) {
        val notificationManager = applicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        val channelId = getString(R.string.notification_channel_id)
        val channelName = getString(R.string.notification_channel_name)
        val importance = NotificationManager.IMPORTANCE_LOW

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            val mChannel = NotificationChannel(channelId, channelName, importance)
            notificationManager.createNotificationChannel(mChannel)
        }

        val intent = Intent(applicationContext, MainActivity::class.java)
        val pendingIntent = PendingIntent.getService(applicationContext, 1, intent, 0)
        var builder: Notification.Builder? = null
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            builder = Notification.Builder(applicationContext, channelId)
        } else {
            builder = Notification.Builder(applicationContext)
        }

        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder.setSmallIcon(R.mipmap.ic_launcher)
        } else {
            builder.setSmallIcon(R.mipmap.ic_launcher)
        }

        val title = if (notification?.title.toString().isNullOrEmpty()) {
            getString(R.string.app_name)
        }else{
            notification?.title
        }

        val content = if (notification?.body.isNullOrEmpty()) {
            getString(R.string.app_name)
        }else{
            notification?.body
        }

        builder.setContentTitle(title)
                .setContentText(content)
                .setDeleteIntent(pendingIntent)

        if (image != null) {
            builder.setStyle(Notification.BigPictureStyle().bigPicture(image))
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder.setVisibility(Notification.VISIBILITY_PUBLIC)
        }

        notificationManager.notify((0..100).random(), builder.build())
    }
}
```

If having any question/doubts or feedback please comment below.
