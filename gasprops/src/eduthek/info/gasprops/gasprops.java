/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package eduthek.info.gasprops;

import android.os.Bundle;
import org.apache.cordova.*;


public class gasprops extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        super.setIntegerProperty("splashscreen", R.drawable.splash);
	    String locale = java.util.Locale.getDefault().getDisplayName();
        super.setIntegerProperty("loadUrlTimeoutValue", 20000); 
        if (locale.matches("(?i).*Deutsch.*")) {
            super.loadUrl("file:///android_asset/www/index-de.html",6000);
        }
        else {
            super.loadUrl("file:///android_asset/www/index-en.html",6000);
	}
    }
}

