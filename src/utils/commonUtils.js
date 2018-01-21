/*
  * 阻止冒泡
  * */

export default class CommonUtils{

    static stopBubble(e) {
        e.nativeEvent.stopImmediatePropagation();
    }
}
