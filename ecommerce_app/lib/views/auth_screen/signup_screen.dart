import 'package:ecommerce_app/consts/consts.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../widgets_common/applogo_widget.dart';
import '../../widgets_common/bg_widget.dart';
import '../../widgets_common/custom_textfield.dart';
import '../../widgets_common/our_button.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  bool? isCheck = false;

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
                  "Registrarse en $appname"
                      .text
                      .fontFamily(bold)
                      .white
                      .size(18)
                      .make(),
                  15.heightBox,
                  Column(
                    children: [
                      customTextField(hint: nameHint, title: name),
                      customTextField(hint: emailHint, title: email),
                      customTextField(hint: passwordHint, title: password),
                      customTextField(
                          hint: repeatPassworddHint, title: repeatPassword),
                      5.heightBox,
                      Row(
                        children: [
                          Checkbox(
                            activeColor: darkBlue,
                            checkColor: whiteColor,
                            value: isCheck,
                            onChanged: (newValue) {
                              setState(() {
                                isCheck = newValue;
                              });
                            },
                          ),
                          10.widthBox,
                          Expanded(
                            child: RichText(
                                text: const TextSpan(children: [
                              TextSpan(
                                  text: "Yo acepto los ",
                                  style: TextStyle(
                                      fontFamily: regular, color: fontGrey)),
                              TextSpan(
                                  text: termAndCond,
                                  style: TextStyle(
                                      fontFamily: bold, color: darkBlue)),
                              TextSpan(
                                  text: " & ",
                                  style: TextStyle(
                                      fontFamily: regular, color: fontGrey)),
                              TextSpan(
                                  text: privacyPolicy,
                                  style: TextStyle(
                                      fontFamily: bold, color: darkBlue))
                            ])),
                          )
                        ],
                      ),
                      5.heightBox,
                      ourButton(
                              color: isCheck == true ? darkBlue : lightGrey,
                              title: signup,
                              textColor: whiteColor,
                              onPress: () {})
                          .box
                          .width(context.screenWidth - 50)
                          .make(),
                      10.heightBox,
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          alreadyHaveAccount.text.color(fontGrey).make(),
                          login.text
                              .color(darkBlue)
                              .fontFamily(bold)
                              .make()
                              .onTap(() {
                            Get.back();
                          })
                        ],
                      ),
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
