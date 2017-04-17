import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class FundBasicInfoService {
    constructor(private http: Http) { }
    private baseUrl:string='http://localhost:3000'
    get(code: string): Observable<any> {
        return this.http.get(this.baseUrl+`/fund/get?code=${code}`)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getHistory(code:string) :Observable<any> {
        return this.http.get(this.baseUrl+`/fund/getHistory?code=${code}`)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        return res.json();
    }
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}

