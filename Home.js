//Home.js
import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import {
  MFPaymentRequest,
  MFCustomerAddress,
  MFExecutePaymentRequest,
  Response,
  MFLanguage,
  MFMobileCountryCodeISO,
  MFCurrencyISO,
  MFInitiatePayment,


} from 'myfatoorah-reactnative';

export default function Home({ navigation }) {




  function initiatePayments() {
    let initiateRequest = new MFInitiatePayment(50, MFCurrencyISO.KUWAIT_KWD);


    MFPaymentRequest.sharedInstance.initiatePayment(initiateRequest, MFLanguage.ENGLISH, (response) => {


      if (response.getError()) {

        alert('error: ' + response.getError().error);
      }
      else {
        console.log(response.getPaymentMethods()[0]);
        console.log(response.getPaymentMethods()[0].PaymentMethodId);

      }
    });
  }
  initiatePayments();

  function executeResquestJson() {
    let request = new MFExecutePaymentRequest(parseFloat(100), 2);
    request.customerEmail = "a@b.com";
    request.customerMobile = "";
    request.customerCivilId = "";
    let address = new MFCustomerAddress("ddd", "sss", "sss", "sss", "sss");
    request.customerAddress = address;
    request.customerReference = "";
    request.language = "en";
    request.mobileCountryCode = MFMobileCountryCodeISO.KUWAIT;
    request.displayCurrencyIso = MFCurrencyISO.KUWAIT_KWD;

    return request;
  }

  function executePayment() {
    let request = executeResquestJson();

    MFPaymentRequest.sharedInstance.executePayment(navigation, request, MFLanguage.ENGLISH, (response) => {

      if (response.getError()) {
        alert('error: ' + response.getError().error);
      }
      else {
        var bodyString = response.getBodyString();
        var invoiceId = response.getInvoiceId();
        var paymentStatusResponse = response.getBodyJson().Data;
        alert('success with Invoice Id: ' + invoiceId + ', Invoice status: ' + paymentStatusResponse.InvoiceStatus);
      }
    });
  }
  onExecuteButtonClickHandler = () => {
    executePayment();
  };


  return (
    <View style={{ justifyContent: "flex-end", flex: 1 }}>
      <Button title="Pay"
        onPress={onExecuteButtonClickHandler}
      />

    </View>
  );
}
