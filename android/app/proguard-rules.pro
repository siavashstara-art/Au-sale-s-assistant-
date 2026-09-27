# ProGuard rules for LuminaMed VIP (ClinicYar VIP)
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-dontwarn android.webkit.**
