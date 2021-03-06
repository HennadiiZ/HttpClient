
import { HttpInterceptor,HttpRequest, HttpHandler,HttpEvent, HttpEventType } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'


export class AuthInterceptor  implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
        console.log("Intercept request" , req)
 
        const cloned = req.clone({
            headers: req.headers.append('Auth', 'SOME RANDOM TOKEN')
        })

        // return next.handle(req)
        // return next.handle(cloned)
        return next.handle(cloned).pipe(
            tap(event =>{
                 if(event.type === HttpEventType.Response){
                     console.log(" Interceptor Response", event)
                 }
            })
        )
    }
}