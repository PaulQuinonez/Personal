import 'package:ecommerce_app/consts/consts.dart';
import 'package:ecommerce_app/views/auth_screen/login_screen.dart';
import 'package:ecommerce_app/widgets_common/applogo_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  // METODO PARA CAMBIAR DE SCREEN
  changeScreen() {
    Future.delayed(const Duration(seconds: 3), () {
      Get.to(() => const LoginScreen());
    });
  }

  @override
  void initState() {
    changeScreen();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: darkBlue,
        body: Center(
          child: Column(
            children: [
              350.heightBox,
              appLogoWidget(),
              10.heightBox,
              appname.text.fontFamily(bold).size(22).white.make(),
              5.heightBox,
              appversion.text.white.make(),
              const Spacer(),
              credits.text.white.fontFamily(semibold).make(),
              30.heightBox, //FIN DE SPLASH SCREEN
            ],
          ),
        ));
  }
}
