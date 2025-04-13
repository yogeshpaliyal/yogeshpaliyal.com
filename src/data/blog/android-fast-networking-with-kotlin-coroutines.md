---
author: Yogesh Paliyal
pubDatetime: 2021-06-28T00:00:00
modDatetime: 2021-06-28T00:00:00
title: Android Fast Networking with Kotlin Coroutines
description: Adding AFN and Kotlin Coroutines to the project
slug: android-fast-networking-with-kotlin-coroutines
tags:
  - android
  - networking
  - kotlin-coroutines
draft: false
featured: true
---

Android Fast Networking is a great library for networking I am using since 2016, It has many features that are not available in similar networking libraries.

AFN provides direct support for RxJava but not for Coroutines, so we create by ourself

Adding AFN and Kotlin Coroutines to the project

```shell
// GSON
implementation 'com.google.code.gson:gson:2.8.6'

// Android Fast Networking
implementation 'com.amitshekhar.android:android-networking:1.0.2'

// Coroutines
implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.3.9'
```

In this project, we are using the State Management approach class Resource

The resource is a wrapper class that contains status (Loading, Success, Error), message, Data

```kotlin
// Resource.kt
/**
 * @author Yogesh Paliyal
 * Created Date : 15 October 2020
 */
data class Resource<out T>(val status: Status, val data: T?, val message: String?) {

    companion object {

        fun <T> success(data: T?, message: String?= ""): Resource<T> {
            return Resource(Status.SUCCESS, data, message)
        }

        fun <T> create(status: Status,data: T?, message: String?= ""): Resource<T> {
            return Resource(status, data, message)
        }


        fun <T> error(msg: String?, data: T? = null): Resource<T> {
            return Resource(Status.ERROR, data, msg)
        }

        fun <T> loading(data: T? = null): Resource<T> {
            return Resource(Status.LOADING, data, null)
        }

    }
}
```

```kotlin
//Status.kt
enum class Status {
    SUCCESS,
    ERROR,
    LOADING
}
```

Creating a BaseCaller, every API call will be going through this class, this is the class where the magic happens.

```kotlin
// AuthCaller.kt
class AuthCaller : BaseCaller(){
  fun login(email: String, password: String): Resource<BaseApiModel>{
    return hitApi(Apis.LOGIN, HashMap<String,String>().apply{
      put("email",email)
      put("password",password)
    })
  }
}
```

```kotlin
// BaseCaller.kt
open class BaseCaller {

    val params: HashMap<String, String> by lazy {
        HashMap<String, String>()
    }

    val files: HashMap<String, File?> by lazy {
        HashMap<String, File?>()
    }

    suspend fun hitApiGet(
        api: String,
        params: HashMap<String, String>? = null, checkAuthentication: Boolean = true
    ): Resource<BaseApiModel> {
        return hitApiGet(api, params, BaseApiModel::class.java,checkAuthentication)
    }

    suspend fun <T> hitApiGet(
        api: String,
        params: HashMap<String, String>? = null,
        objectType: Class<T>, checkAuthentication: Boolean = true
    ): Resource<T> {
        val request = AndroidNetworking.get(api)
            .addQueryParameter(params)
            .addHeaders(getHeader())
            .build()

        return request.fetch(objectType,checkAuthentication)
    }

    suspend fun hitApiUpload(
        api: String,
        params: HashMap<String, String>? = null,
        files: HashMap<String, File?>? = null, checkAuthentication: Boolean = true
    ): Resource<BaseApiModel> {
        return hitApiUpload(api, params, files, BaseApiModel::class.java, checkAuthentication)
    }

    suspend fun <T> hitApiUpload(
        api: String,
        params: HashMap<String, String>? = null,
        files: HashMap<String, File?>? = null,
        objectType: Class<T>, checkAuthentication: Boolean = true
    ): Resource<T> {
        val request = AndroidNetworking.upload(api)
            .addMultipartParameter(params)
            .addMultipartFile(files)
            .setOkHttpClient(OkHttpClient())
            .addHeaders(getHeader())
            .build()

        return request.fetch(objectType,checkAuthentication)
    }

    private suspend fun <T> ANRequest<*>.fetch(objectType: Class<T>,checkAuthentication: Boolean): Resource<T> = withContext(Dispatchers.IO){
        val response = executeForObject(BaseApiModel::class.java)
        try {
            if (response.isSuccess) {
                if (response.result is BaseApiModel) {
                    val baseApiModel = response.result as BaseApiModel
                    if (baseApiModel.code == 200) {
                        if (objectType.isAssignableFrom(BaseApiModel::class.java))
                            return@withContext Resource.success<T>(baseApiModel as T, baseApiModel.message)
                        val formatted = Gson().fromJson(baseApiModel.data, objectType)
                        return@withContext  Resource.success<T>(formatted, baseApiModel.message)
                    } else {
                        return@withContext  onGettingError(ANError().apply {
                            errorCode = baseApiModel.code
                            this.errorBody = Gson().toJson(baseApiModel).toString()
                        },checkAuthentication)
                    }
                } else {
                    return@withContext  Resource.error<T>("Some error occurred")
                }
            }
        }catch (e:Exception){
            e.printStackTrace()
            return@withContext  Resource.error<T>("Some error occurred")
        }
        return@withContext  onGettingError(response.error,checkAuthentication)
    }

    suspend fun hitApi(
        api: String,
        params: HashMap<String, String>? = null, checkAuthentication: Boolean = true,headers: HashMap<String, String>? = null
    ): Resource<BaseApiModel> {
        return hitApi(api, params, BaseApiModel::class.java, checkAuthentication,headers)
    }

    suspend fun <T> hitApi(
        api: String,
        params: HashMap<String, String>? = null,
        objectType: Class<T>, checkAuthentication: Boolean = true, headers: HashMap<String, String>? = null
    ): Resource<T> {

        val request = AndroidNetworking.post(api)
            .addBodyParameter(params)
            .addHeaders(getHeader())
            .addHeaders(headers)
            .build()

        return request.fetch(objectType,checkAuthentication)
    }


    private fun <T> onGettingError(anError: ANError, checkAuthentication: Boolean): Resource<T> {
         if (anError.errorCode == 401) {
             if (checkAuthentication)
                 MyApplication.getInstance().logout()
             return Resource.error<T>("User Logout")
         } else if (anError.errorCode != 0) {
            // received error from server
            // error.getErrorCode() - the error code from server
            // error.getErrorBody() - the error body from server
            // error.getErrorDetail() - just an error detail
            //Log.d(TAG, "onError errorCode : " + anError.getErrorCode());
            //Log.d(TAG, "onError errorBody : " + anError.getErrorBody());
            //Log.d(TAG, "onError errorDetail : " + anError.getErrorDetail());
            // get parsed error object (If ApiError is your class)
            try {
                LogHelper.logD("Error",anError.errorBody)
                val apiError = anError.getErrorAsObject(BaseApiModel::class.java)
                return Resource.error<T>(apiError.message)
            } catch (e: Exception) {
                return Resource.error<T>("Parsing Error")
                e.printStackTrace()
            }
        } else {
            // error.getErrorDetail() : connectionError, parseError, requestCancelledError
            //Log.d(TAG, "onError errorDetail : " + anError.getErrorDetail());
            return when (anError.errorDetail) {
                ANConstants.REQUEST_CANCELLED_ERROR -> Resource.error<T>("Request Cancelled")
                ANConstants.CONNECTION_ERROR -> Resource.error<T>("No internet connected")
                else -> Resource.error<T>("Some Error occurred")
            }
        }
    }


    protected fun getHeader(): HashMap<String, String> {
        val map = HashMap<String, String>()
        map.put("platform", "A")
        map.put("os_version", Build.VERSION.SDK_INT.toString())
       // map["device_id"] = getDeviceId()
       // map["X-localization"] = PreferenceLocaleStore(MyApplication.getInstance(), Locale(Languages.ENGLISH)).getLocale().language
        map["app_version"] = BuildConfig.VERSION_NAME
        map["time"] = System.currentTimeMillis().toString()
        map["timezone"] = TimeZone.getDefault().id
        map["Accept"] = "application/json"
        val token = MyApplication.getInstance().getLoginToken()
        if (!token.trim().isBlank())
            map["Authorization"] = "Bearer $token"
        return map
    }


}
```

BaseApiModel is an API structure that is used for all APIs like, change as per requirements

```json
{
  "status": 200,
  "message": "Api hit success",
  "data": {
    "name": "Yogesh Paliyal"
  }
}
```
