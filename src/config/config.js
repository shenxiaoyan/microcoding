// 接口地址
import axios from "axios";
// 引入部分rxjs操作符
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mapTo';

// export const host = "http://www.chaoyer.com:12100";
export const host = "http://localhost:12100";

// cookie跨域
axios.defaults.withCredentials = true