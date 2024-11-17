---
author: Yogesh Paliyal
pubDatetime: 2022-09-23T00:00:00Z
title: "Getting Started with Android Data Binding"
featured: false
draft: false
tags: 
- android
- data-binding
description: "Data binding is android’s API which connects UI and data (XML and your model)"
---

Hello friends, I am back with a new post about Android Data Binding.  
  
**Q. What is data binding?**  
**Ans:** Data binding is android’s API which connects UI and data (XML and your model).

**Q. Why to use data binding?**  
**Ans:** It reduces the boilerplate code & gives thunder lightning to your development speed.  

Now the main question of how to get started with data binding, how to use it and much more.  
In this post, we learn basics about data binding.  
1\. How to configure your project.  
2\. How to connect XML and JAVA or XML file.  
  
**Configure the project:**

Add [Kotlin](http://techpaliyal.com/getting-started-with-android-and-kotlin/) plugin **build.gradle (app)**
```groovy
apply plugin: 'kotlin-kapt'
```

Enable data binding in **build.gradle (app)**

```groovy
dataBinding {
    enabled = true     
}
```

Here we go now sync your project & your project is ready to take benefits of data binding.

Configure your **XML** to use data binding.

Add **<layout>** tag before your parent layout, your XML must look like this
```xml
<?xml version="1.0" encoding="utf-8"?>
<layout>
<androidx.constraintlayout.widget.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/constMain"
        tools:context=".activity.DashboardActivity">

</androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

Now connect your XML to Your Java Or Kotlin File to use your view directly, get rid of **findViewById**.

Your activity should look something like this:
```kotlin
    lateinit var binding : ActivityDashboardBinding
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this,R.layout.activity_dashboard)
    }
```

Note: The Class **ActivityDashboardBinding** will be automatically created by Data binding, the class name will be given based on your XML file name,  
like my XML file name **activity\_dashboard** so the binding class will be **ActivityDashboardBinding**. if you still confuse the comment below.

now the binding variable contains a reference to you XML binding, you can access any view inside your XML by simple binding.’your-view-id’ 😉
  
As my example, I can use like **binding.constMain**

More about data binding in the next post hope you enjoy it.

Comment if you want more tutorials on Android Data binding.