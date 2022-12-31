import 'package:ecommerce_app/consts/lists.dart';
import 'package:ecommerce_app/views/auth_screen/signup_screen.dart';
import 'package:ecommerce_app/views/home_screen/home.dart';
import 'package:ecommerce_app/widgets_common/applogo_widget.dart';
import 'package:ecommerce_app/widgets_common/bg_widget.dart';
import 'package:ecommerce_app/consts/consts.dart';
import 'package:ecommerce_app/widgets_common/custom_textfield.dart';
import 'package:ecommerce_app/widgets_common/our_button.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return bgWidget(
        child: Scaffold(
            resizeToAvoidBottomInset: false,
            body: Center(
              child: Column(
                children: [
                  (context.screenHeight * 0.1).heightBox,
                  appLogoWidget(),
                  10.heightBox,
                  "Iniciar sesión en $appname"
                      .text
                      .fontFamily(bold)
                      .white
                      .size(18)
                      .make(),
                  15.heightBox,
                  Column(
                    children: [
                      customTextField(hint: emailHint, title: email),
                      customTextField(hint: passwordHint, title: password),
                      Align(
                          alignment: Alignment.centerRight,
                          child: TextButton(
                              onPressed: () {},
                              child: forgetPassword.text
                                  .color(darkBlueLight)
                                  .make())),
                      5.heightBox,
                      // ourButton().box.width(context.screenWidth - 50).make(),
                      ourButton(
                          color: darkBlue,
                          title: login,
                          textColor: whiteColor,
                          onPress: () {
                            Get.to(() => const Home());
                          }).box.width(context.screenWidth - 50).make(),

                      5.heightBox,
                      createNewAccount.text.color(fontGrey).make(),
                      5.heightBox,
                      ourButton(
                          color: darkBlueLight,
                          title: signup,
                          textColor: whiteColor,
                          onPress: () {
                            Get.to(() => const SignUpScreen());
                          }).box.width(context.screenWidth - 50).make(),
                      10.heightBox,
                      loginWith.text.color(fontGrey).make(),
                      5.heightBox,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: List.generate(
                            2,
                            (index) => Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CircleAvatar(
                                    backgroundColor: lightGrey,
                                    radius: 25,
                                    child: Image.asset(
                                      socialIconList[index],
                                      width: 30,
                                    ),
                                  ),
                                )),
                      )
                    ],
                  )
                      .box
                      .white
                      .rounded
                      .padding(const EdgeInsets.all(16))
                      .width(context.screenWidth - 70)
                      .shadowSm
                      .make(),
                ],
              ),
            )));
  }
}
