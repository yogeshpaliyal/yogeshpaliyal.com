---
author: Yogesh Paliyal
pubDatetime: 2021-09-02T15:22:00Z
title: "Guide to Android Data Binding"
featured: false
draft: false
tags:
  - android
  - data-binding
description: "It is a technique to connect Data with your views."
---

## Table of Contents  



## What is Data Binding?  
It is a technique to connect Data with your views.  

## How it works?  
It generates a java file that connects your views with the data.  

## Setting up project for Data Binding  
*build.gradle(:app)*  
```kotlin
plugins {
    ...
    id 'kotlin-kapt'
}

android {
   
    ...

    buildFeatures{
        dataBinding = true
    }
}
...

```

## Getting Started with the code 
To add data binding wrap your parent view/view group with the `<layout>` tag

`<layout>` tag contains 2 sections `<data>` and your parent view group.  

`<data>` tag can contain 2 more tags, `<import>` & `<variable>`, as the name shows import is used to import the dependencies like class, interface, etc. And variable used to declare variables that we can use in our layout file (later in this post).  

Our hierarchy looks like this.  
*activity_main.xml*
```xml
<layout>
     <data>

         <import name="com.sample.MyViewModel" />

         <variable 
                name="mViewModel"
                type="MyViewModel" />

     </data>

     <FrameLayout>
         ..............
     </FrameLayout>
</layout>
```  

### Setup binding in Activity  
```kotlin
class MainActivity: AppCompatActivity() {

       private lateinit var binding : ActivityMainBinding

        override fun onCreate(savedInstanceState: Bundle?) {
              super.onCreate(savedInstanceState)
              binding = ActivityMainBinding.inflate(layoutInflater)
              setContentView(binding.root)
              // start using the binding
        }

}
```
*Note: **ActivityMainBinding** is an auto-generated file, the file name will be based on your XML file, (not the activity or fragment file) *  

### Setup binding in Fragment  
```kotlin
class SampleFragment : Fragment() {
  
    private  lateinit var binding: FragmentSampleBinding
    
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = FragmentSampleBinding.inflate(inflater, container, false)
        return binding.root
    }
    
}
```  


### Assign value to XML variables  
```kotlin
binding.mViewModel = mViewModel

// adding lifecycler owner to binding to use live data inside your XML
// this refer to lifecycler owner in Activity
binding.lifecycleOwner = this

// use viewLifecycleOwner to get lifecyclerOwner for Fragment, Bottomsheet, Dialog, etc.
binding.lifecycleOwner = viewLifecycleOwner 

// this will do the pending binding things
binding.executePendingBindings()
```  

### Handle Variable inside the Data Binding
To use variables  in XML you have to wrap your value inside `@{YOUR-VALUE}`
```xml
<TextView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:text="@{mViewModel.username}" />
```


### Handle interface inside the Data Binding
```xml
<TextView
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:text="@{()->mViewModel.yourFunction()}" />
```
*Note: you can also get the reference of current view by  
`(view) -> mViewModel.yourFunction(view)`*  

### Default values and Null safety 
Default value is used to show in the preview  
```xml
 android:text="@{mViewModel.name, default =`Default Value` }"
```

Handle null variables `??`  
```xml
android:text="@{mViewModel.name ?? `Nullable Value`}"
```
If mViewModel or name is null or not assigned then TextView will show 'Nullable Value'  

### Resource Reference 
Dimen
```xml
android:padding="@{large? @dimen/largePadding : @dimen/smallPadding}"
```  

String & plurals  
```xml  
android:text="@{@string/nameFormat(firstName, etFirstName.text)}"
android:text="@{@plurals/banana(bananaCount)}"
```  
*etFirstName is an edit text in the same layout file*


### Passing variables to included layout  

#### sample_layout.xml
```xml
<layout>
               <data>
                   <variable 
                       name="customTitle"
                       type="String" />
               </data>
            ....
</layout>
```

#### main_layout.xml   
```xml
<include
       app:customTitle="@{`Test Title`}"
       ...
      />
```
*Note: You must provide value in `@{}` if you want to send the value as a variable*


Thank you, folks.  
Keep learning, Keep Sharing ❤️
