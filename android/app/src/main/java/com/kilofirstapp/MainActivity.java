package com.kilofirstapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here
public class MainActivity extends ReactActivity {
   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
		  protected String getMainComponentName() {
    return "KiloFirstApp";
			}
}