import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { Font } from '../constants';

export const CustomAlert = (isToast = false, alertType = ALERT_TYPE.SUCCESS, title = "", body = "", buttonTitle = "Close", autoCloseMS = 2500, buttonClicked = null) => {
    return (
            isToast ? (
                Toast.show({
                    type: alertType,
                    title: title,
                    textBody: body,
                    autoClose: autoCloseMS,
                    onPress: buttonClicked
                })
            ) 
            :
            (
                Dialog.show({
                    type: alertType,
                    title: title,
                    textBody: body,
                    button: buttonTitle,
                    autoClose: autoCloseMS,
                    onPressButton: buttonClicked
                })
            )
    )
}